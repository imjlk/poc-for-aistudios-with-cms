import axios from 'axios';
import { AuthWrapper } from 'components';
import { useEffect, useState } from 'react';

import styles from './TTVList.module.scss';

export default function TTVList() {
  const [list, setList] = useState([]);

  useEffect(() => {
    (async () => {
      const {
        data: { data },
      } = await axios.get('/api/ttv');
      setList(data);
    })();
  }, []);
  return (
    <AuthWrapper enableRedirect={false}>
      <h3>전체 TTV 목록</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            {/* <th>ID</th> */}
            <th>언어</th>
            <th>모델</th>
            <th>의상</th>
            <th>영상 전환 상태</th>
            <th>생성일</th>
            <th>수정일</th>
            <th>작업</th>
          </tr>
        </thead>
        <tbody>
          {list.length !== 0 &&
            list.map((ttv) => (
              <tr key={ttv._id}>
                {/* <td>{ttv._id}</td> */}
                <td>{ttv.language}</td>
                <td>{ttv.model}</td>
                <td>{ttv.clothes}</td>
                <td>{ttv.isCompleted}</td>
                <td>{ttv.createdAt}</td>
                <td>{ttv.modifiedAt}</td>
                <td className={styles['btn-actions-wrapper']}>
                  <button>영상제작</button>
                  <button>조회/수정</button>
                  <button>업로드</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {/* 
ID | 언어 | 모델 | 옷 | 영상 전환 상태(isCompleted) | 영상 URL | 생성일 | 수정일 | 액션
---------|----------|---------
 A1 | B1 | C1
 A2 | B2 | C2
 A3 | B3 | C3
 ...
    */}
      {/* 액션 컬럼에서 리스트 항목별로 영상 제작 상태 확인, 제작 요청 수행  */}
    </AuthWrapper>
  );
}
