import React, { useEffect, useState } from 'react';
import { PageProps, Link, graphql } from 'gatsby';
import Layout from '../../components/layout';
import SEO from '../../components/seo';

/** components */
import CategoryFilter from './CategoryFilter';

/** utility helper functions */
import { renderPostsByCategory } from '../../utils/helper-functions';

/** css */
import '../../components/navbar.css';
import './archive.css';

/** TODO: look up this typescript BS.... */
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

const AllContentIndex = ({ data, location, pageContext }: PageProps<Data, PageContext>) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  /** helper functions */
  const onHandle___selectedCategory = (category: String) => setSelectedCategory(category);

  const siteTitle = 'Seth Balodi';
  const posts = data.allMarkdownRemark.edges;

  const getValidCategories = (posts) => {
    // get all the categories that exist across all posts
    const nonUniqueCategories = posts.map((post) =>
      post.node.frontmatter.categories
        ? post.node.frontmatter.categories.map((cat: String) => cat.toLowerCase())
        : null
    );
    return ['all', ...new Set([].concat(...nonUniqueCategories))]; //create unique categories
  };

  const uniqueCategories = getValidCategories(posts);

  const filterBy = (
    <div>
      <span>Filter by category: </span>
      <span>{`[${selectedCategory}]`}</span>
    </div>
  );

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Archive" />
      <h3 className="nirvana-font-lg">Archive</h3>{' '}
      <CategoryFilter
        categories={uniqueCategories}
        handleChange={onHandle___selectedCategory}
        selected={selectedCategory}
      />
      <div>{renderPostsByCategory(posts, selectedCategory, filterBy)}</div>
    </Layout>
  );
};

export default AllContentIndex;

/** make a GraphQL request for this page's data */
// filter: { frontmatter: { categories: { in: ["essay", "programming"] } } }
export const pageQuery = graphql`
  query contentQuery {
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
