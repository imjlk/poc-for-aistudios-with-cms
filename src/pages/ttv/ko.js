import { client } from 'client';
import {
  SEO,
  EntryHeader,
  Header,
  Footer,
  Main,
  SubNav,
  LoadWPDataList,
  TTVCreateTemp,
  AuthWrapper,
} from 'components';
import { pageTitle } from 'utils';

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
        <AuthWrapper>
          <SubNav />
          <EntryHeader title="한글 글 목록에서 TTV 모델 생성하기" />
          <div className="container">
            <LoadWPDataList queryPostType="ko" />
            <TTVCreateTemp />
          </div>
        </AuthWrapper>
      </Main>

      <Footer />
    </>
  );
}
