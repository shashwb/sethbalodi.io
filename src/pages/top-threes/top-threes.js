// Gatsby supports TypeScript natively!
import React from 'react';
import { PageProps, graphql } from 'gatsby';
import Layout from '../../components/layout';
import SEO from '../../components/seo';

/** css */
import '../../components/navbar.css';

const TopThrees = ({ data, location, pageContext }) => {
  const siteTitle = data.site.siteMetadata.title;

  /** TODO: eventually fetch the top threes using graphQL using the API */
  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Top Threes" />
      <div>top threes?</div>
    </Layout>
  );
};

export default TopThrees;

export const pageQuery = graphql`
  query topThreesQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
