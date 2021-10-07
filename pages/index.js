import { Fragment } from "react";
import Head from "next/head";
import FeaturedPosts from "../components/home-page/featured-posts";
import Hero from "../components/home-page/hero";
import { getFeaturedPosts } from "../lib/posts-util";

function HomePage(props) {
  const { posts } = props;
  return (
    <Fragment>
      <Head>
        <title>Welcome to My Blog</title>
        <meta name="description" content="I post about programming" />
      </Head>
      <Hero />
      <FeaturedPosts posts={posts} />
    </Fragment>
  );
}

export function getStaticProps() {
  const featuredPosts = getFeaturedPosts();
  return {
    props: {
      posts: featuredPosts,
    },
  };
}

export default HomePage;
//1) Hero => Present ourselves
//
