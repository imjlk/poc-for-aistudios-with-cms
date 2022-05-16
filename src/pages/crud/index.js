import { getNextStaticProps, is404 } from '@faustjs/next';
import { useDispatch } from 'react-redux';
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
import { addTTV, setSelectedTTV, updateTTV } from 'modules';
const models = [
  {
    id: 'jonadan_ces',
    label: {
      en: 'Jonathan',
      ko: '조나단',
      zh: '乔纳森',
    },
    expertise: {
      en: 'Announcer',
      ko: '아나운서',
      zh: '主持人',
    },
    imgPath:
      'https://ai-platform-prd.s3.ap-northeast-2.amazonaws.com/modelAssets/clothes/thumbnail/jonadan_ces.jpg',
    clothes: [
      {
        id: '1',
        label: {
          en: 'Navy',
          ko: '남색',
          zh: '红色的',
        },
        imgPath:
          'https://ai-platform-prd.s3.ap-northeast-2.amazonaws.com/modelAssets/clothes/new_thumbnail/jonadan_ces/1.png',
        intro:
          'https://ai-platform-prd.s3.ap-northeast-2.amazonaws.com/modelAssets/modelIntro/ysy_2_intro.webm',
      },
    ],
    language: ['en'],
    gpuType: 'auto',
  },
  {
    id: 'mizuki',
    label: {
      en: '水木',
      ko: '미즈키',
      zh: '助羅端',
    },
    expertise: {
      en: 'Announcer',
      ko: '아나운서',
      zh: '主持人',
    },
    imgPath:
      'https://ai-platform-prd.s3.ap-northeast-2.amazonaws.com/modelAssets/clothes/thumbnail/mizuki.png',
    clothes: [
      {
        id: '1',
        label: {
          en: 'Gray',
          ko: '회색',
          zh: '灰色的',
        },
        imgPath:
          'https://ai-platform-prd.s3.ap-northeast-2.amazonaws.com/modelAssets/clothes/new_thumbnail/mizuki/1.png',
        intro:
          'https://ai-platform-prd.s3.ap-northeast-2.amazonaws.com/modelAssets/modelIntro/ysy_2_intro.webm',
      },
      {
        id: '2',
        label: {
          en: 'White',
          ko: '흰색',
          zh: '白色的',
        },
        imgPath:
          'https://ai-platform-prd.s3.ap-northeast-2.amazonaws.com/modelAssets/clothes/new_thumbnail/mizuki/2.png',
        intro:
          'https://ai-platform-prd.s3.ap-northeast-2.amazonaws.com/modelAssets/modelIntro/ysy_2_intro.webm',
      },
      {
        id: '3',
        label: {
          en: 'Blue',
          ko: '파란색',
          zh: '蓝色的',
        },
        imgPath:
          'https://ai-platform-prd.s3.ap-northeast-2.amazonaws.com/modelAssets/clothes/new_thumbnail/mizuki/3.png',
        intro:
          'https://ai-platform-prd.s3.ap-northeast-2.amazonaws.com/modelAssets/modelIntro/ysy_2_intro.webm',
      },
      {
        id: '4',
        label: {
          en: 'Pink',
          ko: '분홍색',
          zh: '粉色的',
        },
        imgPath:
          'https://ai-platform-prd.s3.ap-northeast-2.amazonaws.com/modelAssets/clothes/new_thumbnail/mizuki/5.png',
        intro:
          'https://ai-platform-prd.s3.ap-northeast-2.amazonaws.com/modelAssets/modelIntro/ysy_2_intro.webm',
      },
    ],
    language: ['jp'],
    gpuType: 'auto',
  },
  {
    id: 'ysy',
    label: {
      en: 'yoon sung young',
      ko: '윤선영',
      zh: '尹善英',
    },
    expertise: {
      en: 'Home Shopping Host',
      ko: '쇼호스트',
      zh: '主持人',
    },
    imgPath:
      'https://ai-platform-prd.s3.ap-northeast-2.amazonaws.com/modelAssets/clothes/thumbnail/ysy.jpg',
    clothes: [
      {
        id: '2',
        label: {
          en: 'Red',
          ko: '빨강',
          zh: '红色的',
        },
        imgPath:
          'https://ai-platform-prd.s3.ap-northeast-2.amazonaws.com/modelAssets/clothes/new_thumbnail/ysy/2.png',
        intro:
          'https://ai-platform-prd.s3.ap-northeast-2.amazonaws.com/modelAssets/modelIntro/ysy_2_intro.webm',
      },
    ],
    language: ['ko'],
    gpuType: '2.0',
  },
  {
    id: 'shaosuki',
    label: {
      en: 'Shaosuki',
      ko: '샤오치',
      zh: '小琪',
    },
    expertise: {
      en: 'Announcer',
      ko: '아나운서',
      zh: '播音员',
    },
    imgPath:
      'https://ai-platform-prd.s3.ap-northeast-2.amazonaws.com/modelAssets/clothes/thumbnail/shaosuki.jpg',
    clothes: [
      {
        id: '1',
        label: {
          en: 'Red',
          ko: '빨강',
          zh: '红色的',
        },
        imgPath:
          'https://ai-platform-prd.s3.ap-northeast-2.amazonaws.com/modelAssets/clothes/new_thumbnail/shaosuki/1.png',
        intro:
          'https://ai-platform-prd.s3.ap-northeast-2.amazonaws.com/modelAssets/modelIntro/leesm_intro.mp4',
        aiName: 'shaosuki',
        costumeId: '61ec165cb72aec40a4238a2d',
      },
    ],
    language: ['zh'],
    gpuType: '2.0',
  },
];

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
  } = useForm({ mode: onChange });
  // const userState = useSelector((state) => state);
  const dispatch = useDispatch();
  const [selectedModel, setSelectedModel] = useState(() => models[2]);
  const onValid = (data) => {
    console.log('data', data);
    dispatch(addTTV(data));
  };
  const { useQuery } = client;
  const generalSettings = useQuery().generalSettings;
  const onModelChange = (event) => {
    const modelIndex = getModelIndex(event.target.value);
    setSelectedModel(models[modelIndex]);
  };
  useEffect(() => {
    setValue('language', selectedModel.language);
    setValue('model', selectedModel.id);
    setValue('clothes', undefined);
  }, [selectedModel]);
  return (
    <>
      {/* <SEO
                title={pageTitle(
                    generalSettings,
                    post?.title(),
                    generalSettings?.title
                )}
                imageUrl={post?.featuredImage?.node?.sourceUrl?.()}
            /> */}
      <Header />

      <Main>
        {/* <EntryHeader
                    title={post}
                    date={post?.date}
                    author={post?.author?.node?.name}
                    image={post?.featuredImage?.node}
                /> */}
        {/* "language": "ko",
                "text": "안녕하세요",
                "model": "ysy",
                "clothes": "2" */}
        <div className="container">
          <form onSubmit={handleSubmit(onValid)}>
            <select
              {...register('language', { required: true })}
              value={selectedModel?.language}
              onChange={onModelChange}
            >
              {models?.map((model) => {
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
              {models?.map((model) => {
                return (
                  <>
                    <option key={model.id} value={model.id}>
                      {model.label.ko}
                    </option>
                  </>
                );
              })}
            </select>
            <select {...register('clothes', { required: true })}>
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

            <div>
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
          </form>
          {/* <ContentWrapper content={post?.content()}>
                        <TaxonomyTerms post={post} taxonomy={'categories'} />
                        <TaxonomyTerms post={post} taxonomy={'tags'} />
                    </ContentWrapper> */}
        </div>
      </Main>

      <Footer />
      <style jsx>{`
        button {
          border-radius: 15px;
          padding: 30px 0;
          transition: 0.2s;
        }
        button:hover {
          background-color: orange;
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
          padding-top: 100px;
        }
        .container div {
          background-color: aqua;
        }
        textarea {
          width: 80rem;
          padding: 10px;
          border-radius: 16px;
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
