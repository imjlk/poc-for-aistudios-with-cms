import { getNextStaticProps, is404 } from '@faustjs/next';
import { useDispatch, useSelector } from 'react-redux';
import { client } from 'client';
import { useForm } from 'react-hook-form';
import {
  ContentWrapper,
  Footer,
  Header,
  EntryHeader,
  Main,
  SEO,
  TaxonomyTerms,
} from 'components';
import { pageTitle } from 'utils';
import { useEffect, useState } from 'react';
import {
  addTTV,
  generateClientToken,
  getModelList,
  makeVideo,
  setSelectedTTV,
  updateTTV,
} from 'modules';

const getModelIndex = (data) => {
  switch (data) {
    case 'jonadan_ces':
    case 'en':
      return 0;
      break;
    case 'mizuki':
    case 'jp':
      return 1;
      break;
    case 'ysy':
    case 'ko':
      return 2;
      break;
    case 'shaosuki':
    case 'zh':
      return 3;
      break;
  }
};

export function CRUDComponent({ post }) {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ mode: 'onChange' });
  // const userState = useSelector((state) => state);
  const dispatch = useDispatch();
  const { aistudios, ttv } = useSelector((state) => {
    return state;
  });
  const [selectedModel, setSelectedModel] = useState(() => {});
  const onValid = (data) => {
    console.log('data', data);
    dispatch(addTTV(data));
  };
  const { useQuery } = client;
  const generalSettings = useQuery().generalSettings;
  const onModelChange = (event) => {
    const modelIndex = getModelIndex(event.target.value);
    setSelectedModel(aistudios?.models[modelIndex]);
  };
  const onMakeVideo = () => {
    dispatch(makeVideo(ttv.model, ttv.text, ttv.language));
  };
  useEffect(() => {
    dispatch(getModelList());
  }, []);
  useEffect(() => {
    if (!aistudios?.models) return;
    // 첫 화면 로딩 selectedModel 초기값, api에서 가져온 models의 index 2 (ysy : 윤선영)
    setSelectedModel(aistudios?.models[2]);
  }, [aistudios?.models]);
  useEffect(() => {
    setValue('language', selectedModel?.language[0]);
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
                  value={selectedModel?.language[0]}
                  onChange={onModelChange}
                >
                  {aistudios?.models?.map((model) => {
                    return (
                      <>
                        <option
                          key={model.language[0]}
                          value={model.language[0]}
                        >
                          {model.language[0]}
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
                <div style={{ float: 'right', width: '380px' }}>
                  {aistudios['key'] ? `key : ${aistudios['key']}` : ''}/
                  {ttv['_id'] ? `id : ${ttv['_id']}` : ''}
                </div>
                <textarea
                  {...register('text', { required: true })}
                  id=""
                  rows="10"
                ></textarea>
                <div className="btns">
                  <button>추가 / 수정</button>
                  <button
                    type="button"
                    disabled={ttv['_id'] === undefined}
                    onClick={onMakeVideo}
                  >
                    비디오 등록
                  </button>
                </div>
              </div>
              <div className="video">
                {1 ? (
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
                      {aistudios?.progress ? `... ${aistudios?.progress}` : ''}
                    </div>
                  </>
                )}
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
        button:disabled {
          background-color: rgba(255, 255, 255, 0.3);
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
  const { usePost } = client;
  // const post = usePost();
  const post = {};
  return <CRUDComponent post={post} />;
}

// export async function getStaticProps(context) {
//     return getNextStaticProps(context, {
//         Page,
//         client,
//         notFound: await is404(context, { client }),
//     });
// }

// export function getStaticPaths() {
//     return {
//         paths: ['/crud'],
//         fallback: 'blocking',
//     };
// }
