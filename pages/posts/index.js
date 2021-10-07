import Head from "next/head";
import { Fragment } from "react";

import AllPosts from "../../components/posts/all-posts";
import { getAllPosts } from "../../lib/posts-util";

function AllPostsPage(props) {
  const { allPosts } = props;
  return (
    <Fragment>
      <Head>
        <title>All Posts</title>
        <meta name="description" content=" A list of Progrramming" />
      </Head>
      <AllPosts posts={allPosts} />;
    </Fragment>
  );
}
export function getStaticProps() {
  const allPosts = getAllPosts();
  return {
    props: {
      allPosts: allPosts,
    },
  };
}

export default AllPostsPage;
