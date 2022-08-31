import React from 'react';
import { PageProps, graphql } from 'gatsby';
import Layout from '../../components/layout';
import SEO from '../../components/seo';

/** styles */
// import '../../components/global.css';
// import TopThrees from '../top-threes';

const List_BookAndOtherStuff = ({ data, location, pageContext }) => {
  console.log('<List_GetToEventually />, data', data);

  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Book and other stuff club" />
      <div>Book (...and Other Stuff) Club</div>
    </Layout>
  );
};

export default List_BookAndOtherStuff;

export const pageQuery = graphql`
  query booksAndOtherStuffQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
