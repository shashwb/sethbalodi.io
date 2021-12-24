// Gatsby supports TypeScript natively!
import React from 'react';
import { PageProps, Link, graphql } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { rhythm } from '../utils/typography';

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

const renderPostsByCategory = (collection = [], category, name=false) => {

  const HEADER = (
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <h3>{name ? name : category.charAt(0).toUpperCase() + category.slice(1)}</h3>
    <h6 className="clickElement">Read More</h6>
  </div>
  );

  const POSTS = collection.map(({ node }) => {
    if (node.frontmatter.categories && node.frontmatter.categories.includes(category)) {
      const title = node.frontmatter.title || node.fields.slug;
      return (
        <>
          
          <div
            style={{
              marginLeft: '10px',
            }}
            className="breakdown-posts-container"
          >
          <article key={node.fields.slug}>
            <header>
              <h3
                style={{
                  marginTop: '5px',
                  marginBottom: rhythm(1 / 8),
                }}
              >
                <Link style={{ boxShadow: `none`, fontSize: '0.85rem' }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <small>{node.frontmatter.date}</small>
            </header>
            <section>
              <p
                style={{
                  fontSize: '0.80rem',
                }}
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </section>
          </article>
        </div>
        </>
      );
    }
  });

  const POSTS_CONTAINER = (
    <>
      {HEADER}
      {POSTS}
    </>
  )

  return POSTS_CONTAINER;
};

/** this renders the entire blog... */
const BlogIndex = ({ data, location, pageContext }: PageProps<Data, PageContext>) => {
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMarkdownRemark.edges;

  /** if multiple pages */
  // const { currentPage, numPages } = pageContext;
  // const isFirst = currentPage === 1;
  // const isLast = currentPage === numPages;
  // const prevPage = currentPage - 1 === 1 ? '/' : `/${currentPage - 1}`;
  // const nextPage = `/${currentPage + 1}`;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />

      {/* eventually, we can move this into it's own component */}
      
      {renderPostsByCategory(posts, 'essay')}
      
      {renderPostsByCategory(posts, 'programming')}

      {/* {renderPostsByCategory(posts, 'projects', "Projects")} */}

      {/* relevant for multiple pages */}
      {/* <nav>
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
      </nav> */}
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query testQuery($skip: Int!, $limit: Int!) {
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
