import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from './SubNav.module.scss';

export default function SubNav() {
  const router = useRouter();
  const subNavItems = [
    { pathname: '/ttv', label: 'List all TTV' },
    { pathname: '/ttv/blog', label: '블로그 글 목록에서 TTV 추가' },
    { pathname: '/ttv/ko', label: '한글 글 목록에서 TTV 추가' },
    { pathname: '/ttv/en', label: '영어 글 목록에서 TTV 추가' },
  ];
  const activeNav = (pathname) =>
    router.pathname === pathname ? styles.active : '';

  return (
    <ul className={styles.navigation}>
      {subNavItems.map((e, i) => (
        <Link key={e.pathname + i} href={e.pathname}>
          <a className={activeNav(e.pathname)}>{e.label}</a>
        </Link>
      ))}
    </ul>
  );
}
