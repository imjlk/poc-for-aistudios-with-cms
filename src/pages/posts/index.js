import React from 'react';
import { getNextStaticProps } from '@faustjs/next';
import { client } from 'client';
import {
  Posts,
  Header,
  LoadMore,
  EntryHeader,
  Footer,
  Main,
  SEO,
} from 'components';
import { pageTitle } from 'utils';
import useNodePagination, { POST_NODES_PREPASS_FIELDS } from 'hooks/useNodePagination';

/**
 * Prepass fields for post nodes. This lists all the pieces of data we need
 * for each project node. Running the following through `prepass` ensures that
 * all of the data is there when we need it, and no cascading requests happen.
 *
 * @see https://gqty.dev/docs/client/helper-functions#prepass
 */

export default function Page() {
  const { useQuery } = client;
  const generalSettings = useQuery().generalSettings;
  const { data, fetchMore, isLoading } = useNodePagination(
    (query, queryArgs) => query.posts(queryArgs),
    POST_NODES_PREPASS_FIELDS
  );

  return (
    <>
      <SEO title={pageTitle(generalSettings)} />

      <Header />

      <Main>
        <EntryHeader title="Latest Posts" />
        <div className="container">
          <Posts posts={data?.nodes} id="posts-list" />
          <LoadMore
            className="text-center"
            hasNextPage={data?.hasNextPage}
            endCursor={data?.endCursor}
            isLoading={isLoading}
            fetchMore={fetchMore}
          />
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
