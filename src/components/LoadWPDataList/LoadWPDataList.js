import { client } from 'client';
import LoadMore from 'components/LoadMore';
import useNodePagination, { POST_NODES_PREPASS_FIELDS } from 'hooks/useNodePagination';
import React, { useState } from 'react';

import styles from './LoadWPDataList.module.scss';



function SelectedItem({ slug }) {
  const { useQuery } = client
  const selectedPost = useQuery().post({
    id: slug,
    idType: 'SLUG',
  })

  return <>
    <div>Selected Title: {selectedPost?.title()}</div>
    <div>Contents:
      <textarea name="" id="" cols="30" rows="10" value={selectedPost.content()}></textarea>
    </div>
  </>;
}

export default function LoadWPDataList() {
  const [selectedItemSlug, setSelectedItemSlug] = useState('')
  const { data, fetchMore, isLoading } = useNodePagination(
    (query, queryArgs) => query.posts(queryArgs),
    POST_NODES_PREPASS_FIELDS
  );

  return <div className={styles.wrapper}>
    <ul>
      {data?.nodes.map((node, i) => (
        <li key={i}>
          <a href="#" onClick={(e) => {
            e.preventDefault();
            setSelectedItemSlug(node?.slug)
          }}>

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
}
