import { client } from 'client';
import {
  SEO,
  EntryHeader,
  Header,
  Footer,
  Main,
  SubNav,
  LoadWPDataList,
} from 'components';
import { pageTitle } from 'utils';
import { getNextStaticProps } from '@faustjs/next';

export default function Page() {
  const { useQuery } = client;
  const generalSettings = useQuery().generalSettings;

  return (
    <>
      <SEO
        title={`한글 글 목록에서 TTV 모델 생성하기 - ${pageTitle(
          generalSettings
        )}`}
      />

      <Header />
      <Main>
        <SubNav />
        <EntryHeader title="한글 글 목록에서 TTV 모델 생성하기" />
        <div className="container">
          <LoadWPDataList queryPostType="ko" />
        </div>
      </Main>

      <Footer />
    </>
  );
}

export async function getStaticProps(context) {
  return getNextStaticProps(context, {
    Page,
    client,
  });
}
