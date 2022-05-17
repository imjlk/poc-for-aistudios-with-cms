import { client } from 'client';
import LoadMore from 'components/LoadMore';
import useNodePagination, {
  POST_NODES_PREPASS_FIELDS,
} from 'hooks/useNodePagination';
import React, { useState } from 'react';

import styles from './LoadWPBlogDataList.module.scss';

export default function LoadWPBlogDataList() {
  const [selectedItemSlug, setSelectedItemSlug] = useState('');
  const { data, fetchMore, isLoading } = useNodePagination(
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

      {selectedItemSlug && <SelectedItem slug={selectedItemSlug} />}
    </div>
  );
}

function SelectedItem({ slug }) {
  const { useQuery } = client;
  // console.log(queryPostType);
  const selectedPost = useQuery().post({
    id: slug,
    idType: 'SLUG',
  });

  return (
    <>
      <div>Selected Title: {selectedPost?.title()}</div>
      <div>
        <label htmlFor="">Preview:</label>
        <div
          className={styles.reset}
          dangerouslySetInnerHTML={{ __html: selectedPost?.content() }}
        ></div>
      </div>
      <div>
        Contents:
        <textarea
          className={styles['origin-text']}
          rows="10"
          value={selectedPost.content()}
        ></textarea>
      </div>
    </>
  );
}
