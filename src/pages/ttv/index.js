import { client } from 'client';
import { SEO, EntryHeader, Header, Footer, Main } from 'components';
import { pageTitle } from 'utils';
import Link from 'next/link';
import { useRouter } from 'next/router';

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
          All TTV List
          {/* 
ID | 언어 | 모델 | 옷 | 영상 전환 상태(isCompleted) | 영상 URL | 생성일 | 수정일 | 액션
---------|----------|---------
 A1 | B1 | C1
 A2 | B2 | C2
 A3 | B3 | C3
 ...
    */}
          {/* 액션 컬럼에서 리스트 항목별로 영상 제작 상태 확인, 제작 요청 수행  */}
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
