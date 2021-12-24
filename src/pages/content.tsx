// Gatsby supports TypeScript natively!
import React from 'react';
import { PageProps, Link, graphql } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { rhythm } from '../utils/typography';

/** css */
import '../components/navbar.css';

/** THIS PAGE SHOULD RENDER ALL CONTENT
 * TODO:
 * > implement a tag selector at the top of the screen
 */


/**
 * TODO: look up this typescript BS....
 */
type PageContext = {
    currentPage: number,
    numPages: number;
}
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


/** IDEAS
 * >> maybe make this infinite scroll?
 */
const AllContentIndex = ({ data, location, pageContext }: PageProps<Data, PageContext>) => {
    console.log('All content holder, data', data, "location", location);
    console.log('.....what is the pageContext?', pageContext);
    const siteTitle = "Seth Balodi";
    return (
        <Layout location={location} title={siteTitle}>
            <SEO title="All Content" />
            <div>
                CONTENT PAGE!
            </div>
        </Layout>
    )
}

export default AllContentIndex;


/** make a GraphQL request for this page's data */

export const pageQuery = graphql`
query contentQuery($skip: Int!, $limit: Int!) {
  site {
    siteMetadata {
      title
    }
  }
  allMarkdownRemark(
    filter: { frontmatter: { categories: { in: ["essay", "programming"] } } }
    sort: { fields: [frontmatter___date], order: DESC }
    limit: $limit
    skip: $skip
  ) {
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