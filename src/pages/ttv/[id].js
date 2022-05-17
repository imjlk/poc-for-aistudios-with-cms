import { client } from 'client';
import {
  SEO,
  EntryHeader,
  Header,
  Footer,
  Main,
  SubNav,
  AuthWrapper,
} from 'components';
import { pageTitle } from 'utils';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
// import { useSelector } from 'react-redux';
import { getNextServerSideProps } from '@faustjs/next';

export default function Page() {
  const { useQuery } = client;
  const generalSettings = useQuery().generalSettings;
  const router = useRouter();
  const { id } = router.query;
  const [currentData, setCurrentData] = useState({});
  // console.log('query', id, ttv);

  // dispatch(fetchTTV())
  useEffect(() => {
    (async () => {
      const {
        data: { data },
      } = await axios.get(`/api/ttv/${id}`);
      setCurrentData(data);
      console.log(data);
    })();
    // console.log(ttv)
  }, []);
  return (
    <>
      <SEO title={`상세 조회 - ${pageTitle(generalSettings)}`} />

      <Header />
      <Main>
        <AuthWrapper>
          <SubNav />
          <EntryHeader title="상세 조회" />
          <div className="container">
            {Object.entries(currentData).map(([key, value], index) => (
              <div key={index}>
                <label>{key}</label>
                <p>{value}</p>
                {key === 'videoUrl' && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      width: '33%',
                    }}
                  >
                    <video controls>
                      {/* <source src={aistudios.video} /> */}
                      <source src={value} />
                      해당 브라우저는 video 태그를 지원하지 않습니다.
                    </video>
                  </div>
                )}
              </div>
            ))}
          </div>
        </AuthWrapper>
      </Main>

      <Footer />
    </>
  );
}

export async function getServerSideProps(context) {
  return getNextServerSideProps(context, {
    Page,
    client,
  });
}

// export async getNextServerSideProps(ctx) {
//   return getNextStaticProps(ctx, {
//     Page,
//     client,
//   });
// }
// export async function getStaticProps(context) {
//   return getNextStaticProps(context, {
//     Page,
//     client,
//   });
// }
