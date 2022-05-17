import axios from 'axios';
import { AuthWrapper } from 'components';
// import { makeVideo } from 'modules';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  // useDispatch,
  useSelector,
} from 'react-redux';

import styles from './TTVList.module.scss';

export default function TTVList() {
  const [list, setList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const {
        data: { data },
      } = await axios.get('/api/ttv');
      setList(data);
      console.log(data);
    })();
  }, []);

  // const dispatch = useDispatch()

  const { aistudios } = useSelector((state) => state);

  const handleMakeVideo = async (id, text, model, language, index) => {
    // dispatch(makeVideo(aistudios.rToken, model, text, language))
    const res = await axios.post('/api/aistudios/make-video', {
      token: aistudios.rToken,
      model,
      text,
      language,
    });
    const { data } = await axios.put(`/api/ttv/${id}`, {
      _id: id,
      modifiedAt: new Date().toISOString(),
      isVideoRequested: true,
      key: res.data.data.key,
    });

    list[index] = {
      ...list[index],
      ...data.data,
    };
    setList([...list]);
  };
  const handleViewTTV = (id) => {
    router.push(`/ttv/${id}`);
  };
  const handleRefresh = async (key, id, index) => {
    const { data } = await axios.post('/api/aistudios/find-project', {
      token: aistudios.rToken,
      key,
    });
    console.log(data);
    if (+data.progress === 100) {
      const { data } = await axios.put(`/api/ttv/${id}`, {
        _id: id,
        modifiedAt: new Date().toISOString(),
        isCompleted: true,
      });

      list[index] = {
        ...list[index],
        ...data.data,
      };
      setList([...list]);
    }

    list[index] = {
      ...list[index],
      tempStatus: data.data.progress,
    };
    setList([...list]);
  };

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
            <th>영상 전환 완료</th>
            <th>영상 요청 상태</th>
            <th>생성일</th>
            <th>수정일</th>
            <th>작업</th>
          </tr>
        </thead>
        <tbody>
          {list.length !== 0 &&
            list.map((ttv, index) => (
              <tr key={ttv._id}>
                {/* <td>{ttv._id}</td> */}
                <td>{ttv.language}</td>
                <td>{ttv.model}</td>
                <td>{ttv.clothes}</td>
                <td className={styles.align}>
                  {ttv.isCompleted ? '⭕' : '❌'}
                </td>
                <td className={styles.align}>
                  {ttv.isVideoRequested ? '✅' : '❌'}
                </td>
                <td>{ttv.createdAt}</td>
                <td>{ttv.modifiedAt}</td>
                <td className={styles['btn-actions-wrapper']}>
                  {!ttv.isVideoRequested && (
                    <button
                      onClick={() =>
                        handleMakeVideo(
                          ttv._id,
                          ttv.text,
                          ttv.model,
                          ttv.language,
                          index
                        )
                      }
                    >
                      영상제작
                    </button>
                  )}
                  {ttv.isVideoRequested && !ttv.isCompleted && (
                    <button
                      onClick={() => handleRefresh(ttv.key, ttv._id, index)}
                    >
                      요청상태 새로고침{ttv.tempStatus}
                    </button>
                  )}
                  <button onClick={() => handleViewTTV(ttv._id)}>
                    조회/수정
                  </button>
                  <button disabled={!ttv.isCompleted}>업로드</button>
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
