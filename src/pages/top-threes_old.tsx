// Gatsby supports TypeScript natively!
import React from 'react';
import { PageProps, graphql } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';

/** css */
import '../components/navbar.css';

type PageContext = {
  currentPage: number;
  numPages: number;
};

type Data = {
  site: {
    siteMetadata: {
      title: string;
    };
  };
  allMarkdownRemark: {
    edges: {
      node: {
        excerpt: string;
        frontmatter: {
          title: string;
          date: string;
          description: string;
        };
        fields: {
          slug: string;
        };
      };
    }[];
  };
};

const TopThreesOld = ({ data, location, pageContext }: PageProps<Data, PageContext>) => {
  const siteTitle = data.site.siteMetadata.title;

  /** TODO: eventually fetch the top threes using graphQL using the API */
  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Top Threes" />
      <div>top threes?</div>
    </Layout>
  );
};

export default TopThreesOld;

export const pageQuery = graphql`
  query topThreesOldQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
