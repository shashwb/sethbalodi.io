// Gatsby supports TypeScript natively!
import React from 'react';
import { PageProps, Link, graphql } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { rhythm } from '../utils/typography';

/** helper functions */
import { renderPostsByCategory } from '../utils/helper-functions';

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

/** this renders the entire blog... */
const Homepage = ({ data, location, pageContext }: PageProps<Data, PageContext>) => {
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Homepage" />
      <div>THIS IS A MAIN LAYOUT</div>
      {renderPostsByCategory(posts, 'essay', 'Essays')}
      {renderPostsByCategory(posts, 'programming')}
      <div>testing</div>
    </Layout>
  );
};

export default Homepage;

export const pageQuery = graphql`
  query testQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: { categories: { in: ["essay", "programming"] } } }
      sort: { fields: [frontmatter___date], order: DESC }
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

/** old code for handling multiple pages */
{
  /* relevant for multiple pages */
}
{
  /* const { currentPage, numPages } = pageContext;
const isFirst = currentPage === 1;
const isLast = currentPage === numPages;
const prevPage = currentPage - 1 === 1 ? '/' : `/${currentPage - 1}`;
const nextPage = `/${currentPage + 1}`;
<nav>
  <ul
    style={{
      display: `flex`,
      flexWrap: `wrap`,
      justifyContent: `space-between`,
      listStyle: `none`,
      padding: 0,
    }}
  >
    <li>
      {!isFirst && (
        <Link to={prevPage} rel="prev">
          ← Previous Page
        </Link>
      )}
    </li>
    <li>
      {!isLast && (
        <Link to={nextPage} rel="next">
          Next Page →
        </Link>
      )}
    </li>
  </ul>
</nav> */
}
