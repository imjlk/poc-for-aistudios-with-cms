import { client } from 'client';
import {
  SEO,
  EntryHeader,
  Header,
  Footer,
  Main,
  TTVList,
  SubNav,
} from 'components';
import { pageTitle } from 'utils';
// import { getNextStaticProps } from '@faustjs/next';
import { useDispatch, useSelector } from 'react-redux';
import { generateClientToken } from 'modules';
import { useEffect } from 'react';

export default function Page() {
  const { useQuery } = client;
  const generalSettings = useQuery().generalSettings;
  const dispatch = useDispatch();
  const { aistudios } = useSelector((state) => {
    return state;
  });
  console.log('aistudios state >>', aistudios);
  useEffect(() => {
    dispatch(generateClientToken());
  }, [dispatch]);

  return (
    <>
      <SEO title={`Text To Video - ${pageTitle(generalSettings)}`} />

      <Header />
      <Main>
        <SubNav />
        <EntryHeader title="Text To Video" />
        <div className="container">
          <TTVList />
          {/* 여유가 된다면 사이트 업로드 추가(모델 스키마에 추가) */}
        </div>
      </Main>

      <Footer />
    </>
  );
}

// export async function getStaticProps(context) {
//   return getNextStaticProps(context, {
//     Page,
//     client,
//   });
// }
