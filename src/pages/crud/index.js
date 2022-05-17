import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Footer, Header, Main } from 'components';
import { useEffect, useState } from 'react';
import { addTTV, generateClientToken, getModelList } from 'modules';

const getModelIndex = (data) => {
  switch (data) {
    case 'jonadan_ces':
    case 'en':
      return 0;
    case 'mizuki':
    case 'jp':
      return 1;
    case 'ysy':
    case 'ko':
      return 2;
    case 'shaosuki':
    case 'zh':
      return 3;
  }
};

export function CRUDComponent() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ mode: 'onChange' });
  // const userState = useSelector((state) => state);
  const dispatch = useDispatch();
  const { aistudios } = useSelector((state) => {
    return state;
  });
  console.log('aistudios state >>', aistudios);
  const [selectedModel, setSelectedModel] = useState(() => {});
  const onValid = (data) => {
    console.log('data', data);
    dispatch(addTTV(data));
  };
  const onModelChange = (event) => {
    const modelIndex = getModelIndex(event.target.value);
    setSelectedModel(aistudios?.models[modelIndex]);
  };
  useEffect(() => {
    dispatch(getModelList());
    dispatch(generateClientToken());
  }, [dispatch]);
  useEffect(() => {
    if (!aistudios?.models) return;
    // 첫 화면 로딩 selectedModel 초기값, api에서 가져온 models의 index 2 (ysy : 윤선영)
    setSelectedModel(aistudios?.models[2]);
  }, [aistudios?.models]);
  useEffect(() => {
    setValue('language', selectedModel?.language);
    setValue('model', selectedModel?.id);
    setValue('clothes', selectedModel?.clothes[0].id);
  }, [selectedModel]);
  return (
    <>
      <Header />
      <Main>
        <div className="container">
          <form onSubmit={handleSubmit(onValid)}>
            <div className="with-video">
              <div>
                <select
                  {...register('language', { required: true })}
                  value={selectedModel?.language}
                  onChange={onModelChange}
                >
                  {aistudios?.models?.map((model) => {
                    return (
                      <>
                        <option key={model.language} value={model.language}>
                          {model.language}
                        </option>
                      </>
                    );
                  })}
                </select>
                <select
                  {...register('model', { required: true })}
                  value={selectedModel?.id}
                  onChange={onModelChange}
                >
                  {aistudios?.models?.map((model) => {
                    return (
                      <>
                        <option key={model.id} value={model.id}>
                          {model.label.ko}
                        </option>
                      </>
                    );
                  })}
                </select>
                <select
                  style={{ width: '80px' }}
                  {...register('clothes', { required: true })}
                >
                  {selectedModel?.clothes?.map((cloth) => {
                    return (
                      <>
                        <option key={cloth.id} value={cloth.id}>
                          {cloth.label.ko}
                        </option>
                      </>
                    );
                  })}
                </select>
                {errors?.clothes}

                <textarea
                  {...register('text', { required: true })}
                  id=""
                  rows="10"
                ></textarea>
                <div className="btns">
                  <button>추가 / 수정</button>
                  <button type="button">비디오 등록</button>
                </div>
              </div>
              <div className="video">
                {
                  // eslint-disable-next-line no-constant-condition
                  1 ? (
                    <>
                      <video controls autoPlay>
                        {/* <source src={aistudios.video} /> */}
                        <source
                          src={
                            'https://ai-platform-public.s3.ap-northeast-2.amazonaws.com/shaosuki_1_20b287c90e1d504cfbc579de525654ec.mp4'
                          }
                        />
                        해당 브라우저는 video 태그를 지원하지 않습니다.
                      </video>
                    </>
                  ) : (
                    <>
                      <div style={{ textAlign: 'center' }}>
                        {aistudios?.progress
                          ? `... ${aistudios?.progress}`
                          : ''}
                      </div>
                    </>
                  )
                }
              </div>
            </div>
          </form>
          {/* <ContentWrapper content={post?.content()}>
                        <TaxonomyTerms post={post} taxonomy={'categories'} />
                        <TaxonomyTerms post={post} taxonomy={'tags'} />
                    </ContentWrapper> */}
        </div>
      </Main>

      <Footer />
      <style jsx>{`
        .with-video {
          display: flex;
          flex-direction: row;
        }
        select {
          font-size: 18px;
          border-radius: 3px;
          transition: 0.3s;
        }
        .with-video {
          border-radius: 16px;
          padding: 0 30px;
          height: 60rem;
        }
        .video {
          margin-left: 30px;
          width: 30rem !important;
          height: 30rem !important;
        }
        button {
          font-weight: 600;
          font-size: 18px;
          background-color: aliceblue;
          border-radius: 15px;
          padding: 30px 0;
          transition: 0.2s;
        }
        button:hover {
          background-color: #ffcd70;
        }
        button:active {
          background-color: yellow;
        }
        .btns {
          display: flex;
          flex-direction: column;
        }
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .container {
          height: 100%;
          padding-top: 60px;
        }
        .container div {
          background-color: #8cffff;
        }
        textarea {
          width: 100%;
          height: 30rem;
          padding: 10px;
          border-radius: 16px;
          margin-bottom: 30px;
        }
      `}</style>
    </>
  );
}

export default function CRUDPage() {
  const post = {};
  return <CRUDComponent post={post} />;
}
