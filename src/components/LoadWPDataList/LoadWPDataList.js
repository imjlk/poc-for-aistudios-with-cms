import { client } from 'client';
import LoadMore from 'components/LoadMore';
import useNodePagination, {
  POST_NODES_PREPASS_FIELDS,
} from 'hooks/useNodePagination';
import React, { useState } from 'react';

import styles from './LoadWPDataList.module.scss';

export default function LoadWPDataList({ queryPostType = 'blog' }) {
  const [selectedItemSlug, setSelectedItemSlug] = useState('');
  const { data, fetchMore, isLoading } =
    queryPostType === 'en'
      ? // eslint-disable-next-line react-hooks/rules-of-hooks
        useNodePagination(
          (query, queryArgs) => query.projects(queryArgs),
          POST_NODES_PREPASS_FIELDS
        )
      : queryPostType === 'ko'
      ? // eslint-disable-next-line react-hooks/rules-of-hooks
        useNodePagination(
          (query, queryArgs) => query.koreanArticles(queryArgs),
          POST_NODES_PREPASS_FIELDS
        )
      : // eslint-disable-next-line react-hooks/rules-of-hooks
        useNodePagination(
          (query, queryArgs) => query.posts(queryArgs),
          POST_NODES_PREPASS_FIELDS
        );

  return (
    <div className={styles.wrapper}>
      <ul>
        {data?.nodes.map((node, i) => (
          <li key={i}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setSelectedItemSlug(node?.slug);
              }}
            >
              {node?.title()}
            </a>
          </li>
        ))}
      </ul>
      <LoadMore
        className="text-center"
        hasNextPage={data?.hasNextPage}
        endCursor={data?.endCursor}
        isLoading={isLoading}
        fetchMore={fetchMore}
      />

      {selectedItemSlug && (
        <SelectedItem queryPostType={queryPostType} slug={selectedItemSlug} />
      )}
    </div>
  );
}

function SelectedItem({ slug, queryPostType }) {
  const { useQuery } = client;
  // console.log(queryPostType);
  const selectedPost =
    queryPostType === 'en'
      ? // eslint-disable-next-line react-hooks/rules-of-hooks
        useQuery().project({
          id: slug,
          idType: 'SLUG',
        })
      : queryPostType === 'ko'
      ? // eslint-disable-next-line react-hooks/rules-of-hooks
        useQuery().koreanArticle({
          id: slug,
          idType: 'SLUG',
        })
      : // eslint-disable-next-line react-hooks/rules-of-hooks
        useQuery().post({
          id: slug,
          idType: 'SLUG',
        });

  // console.log(selectedPost);

  return (
    <>
      <div>Selected Title: {selectedPost?.title()}</div>
      <div>
        <label htmlFor="">Preview:</label>
        <div
          className={styles.reset}
          dangerouslySetInnerHTML={{ __html: selectedPost?.contentArea }}
        ></div>
      </div>
      <div>
        Contents:
        <textarea
          className={styles['origin-text']}
          rows="10"
          value={selectedPost.contentArea}
        ></textarea>
      </div>
    </>
  );
}
