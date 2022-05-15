import { client } from 'client';
import { SEO, EntryHeader, Header, Footer, Main, TTVList } from 'components';
import { pageTitle } from 'utils';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getNextStaticProps } from '@faustjs/next';

export default function Page() {
  const { useQuery } = client;
  const generalSettings = useQuery().generalSettings;

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

function SubNav() {
  const router = useRouter();
  console.log(router.pathname);
  return (
    <ul
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        margin: '0 auto',
        maxWidth: 1160,
      }}
    >
      <Link href="/ttv">
        <a>List all TTV</a>
      </Link>
      <Link href="/ttv/blog">
        <a>블로그 글 목록에서 TTV 추가</a>
      </Link>
      <Link href="/ttv/ko">
        <a>한글 글 목록에서 TTV 추가</a>
      </Link>
      <Link href="/ttv/en">
        <a>영어 글 목록에서 TTV 추가</a>
      </Link>
    </ul>
  );
}

export async function getStaticProps(context) {
  return getNextStaticProps(context, {
    Page,
    client,
  });
}
