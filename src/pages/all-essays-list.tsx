// import React from 'react';
// import { PageProps, Link, graphql } from 'gatsby';
// import Layout from '../components/layout';
// import SEO from '../components/seo';
// import { rhythm } from '../utils/typography';

// /** TODO :: what exactly is happening here?
//  *  Look into typescript and how it involves GraphQL Queries
//  */
// type PageContext = {
//   currentPage: number;
//   numPages: number;
// };
// type Data = {
//   site: {
//     siteMetadata: {
//       title: string;
//     };
//   };
//   allMarkdownRemark: {
//     edges: {
//       node: {
//         excerpt: string;
//         frontmatter: {
//           title: string;
//           date: string;
//           description: string;
//         };
//         fields: {
//           slug: string;
//         };
//       };
//     }[];
//   };
// };

// /** component */
// const EssaysIndex = ({ data, location, pageContext }) => {
//   console.log('<AllEssays /> data', data, 'location', location, 'pageContext', pageContext);
//   return <div>All Essays</div>;
// };

// export default EssaysIndex;

// export const pageQuery = graphql`
//   query essaysPageQuery($skip: Int!) {
//     site {
//       siteMetadata {
//         title
//       }
//     }
//     allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, skip: $skip) {
//       edges {
//         node {
//           excerpt
//           fields {
//             slug
//           }
//           frontmatter {
//             date(formatString: "MMMM DD, YYYY")
//             title
//             description
//           }
//         }
//       }
//     }
//   }
// `;

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

/** this renders the entire blog... */
const BlogIndex = ({ data, location, pageContext }: PageProps<Data, PageContext>) => {
  console.log(
    '<BlogIndex /> :: what is data? (because this doesnt run through gatsby-node, it is not set up with data',
    data
  );
  console.log('<BlogIndex /> :: what is posts?', posts);
  console.log('<BlogIndex /> :: PageContext', pageContext);

  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMarkdownRemark.edges;
  const { currentPage, numPages } = pageContext;

  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage = currentPage - 1 === 1 ? '/' : `/${currentPage - 1}`;
  const nextPage = `/${currentPage + 1}`;

  return (
    <Layout location={location} title={siteTitle}>
      <div>all-essays-list.tsx</div>
      <SEO title="All posts" />

      {/* eventually, we can move this into it's own component */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h3>Essays</h3>
        <h6 className="clickElement">Read More</h6>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h3>Programming</h3>
        <h6 className="clickElement">Read More</h6>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h3>Projects</h3>
        <h6 className="clickElement">Learn More</h6>
      </div>

      {/* this lists ALL posts */}
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug;
        return (
          <article key={node.fields.slug}>
            <header>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <small>{node.frontmatter.date}</small>
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </section>
          </article>
        );
      })}

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
      </nav>
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
          }
        }
      }
    }
  }
`;
