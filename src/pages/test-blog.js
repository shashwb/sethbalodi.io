import React from 'react';
import Layout from '../components/layout';

/** graphql */
import { graphql } from 'gatsby';

const BlogPageTest = ({ data }) => {
  console.log('(BlogPageTest) => data?', data);
  return (
    <Layout location={'test-blog'} title={'Seth Balodi'}>
      <div>test (test-blog.js)</div>
      <span>
        <h3>File Names:</h3>
      </span>
      <div>
        {data.allFile.nodes.map((file, i) => {
          return <div key={`${file.name}-${i}`}>{file.name}</div>;
        })}
      </div>
    </Layout>
  );
};

export const query = graphql`
  query {
    allFile {
      nodes {
        name
      }
    }
  }
`;

export default BlogPageTest;
