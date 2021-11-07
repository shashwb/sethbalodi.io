import React from 'react';
import { PageProps, Link, graphql } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { rhythm } from '../utils/typography';

/** stylesheets */
import '../components/navbar.css';

type PageContext = {
  // nothing for now...
};

type Data = {
  // will build eventually
};

const Homepage = ({ data, pageContext, location }: PageProps<Data, PageContext>) => {
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMarkdownRemark.edges;

  console.group();
  console.log('<HomePage />, values');
  console.log('...data', data);
  console.log('...pageContext', pageContext);
  console.groupEnd();

  return (
    <Layout location={location} title={siteTitle}>
      <div>testing new homepage.tsx</div>
    </Layout>
  );
};

export default Homepage;

export const pageQuery = graphql`
  query homepageQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            categories
          }
        }
      }
    }
  }
`;
