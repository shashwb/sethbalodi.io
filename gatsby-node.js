const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  /** obtain a blog post template */
  const blogPost = path.resolve(`./src/templates/blog-post.js`);

  /** retreive all post slugs and titles */
  const result = await graphql(
    `
      {
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 1000) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  );

  if (result.errors) {
    throw result.errors;
  }

  // Create blog posts pages.
  const posts = result.data.allMarkdownRemark.edges;

  /** create a new page for each blog post using the BlogPost component as a template */
  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node;
    const next = index === 0 ? null : posts[index - 1].node;

    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    });
  });

  /** HOME page vs CONTENT page
   *
   *  home page can change, have announcements, and then show content
   *
   * content page is all about content. Like an archive. This will show all posts, projects and content based on year!
   *
   */

  /** create MixedContent, or Timeline page for holding Essays, Programming and Projects (for now) */
  /** create a Content page for holding Essays, Programming */

  /** homepage holds all general content...
   * > HOMEPAGE - section of essays / programming / projects
   *      > read more -> CONTENT page
   *          :: CONTENT page has the ability to be filtered in real time
   *          :; you can filter between all the different categories
   */
  createPage({
    path: `/`,
    component: path.resolve('./src/pages/homepage.tsx'),
    context: {
      limit: 100,
      skip: 0,
      numPages: 1,
      currentPage: 1,
    },
  });

  /** CONTENT PAGE */
  createPage({
    path: `/archive`,
    component: path.resolve('./src/pages/archive'),
    context: {
      limit: 100,
      skip: 0,
      numPages: 1,
      currentPage: 1,
    },
  });

  /** TOP THREES */
  createPage({
    path: `/top-threes`,
    component: path.resolve('./src/pages/top-threes.tsx'),
    context: {
      limit: 100,
      skip: 0,
      numPages: 1,
      currentPage: 1,
    },
  });

  /** BOOK CLUB */
  createPage({
    path: `/book-club`,
    component: path.resolve('./src/pages/book-club.tsx'),
    context: {
      limit: 100,
      skip: 0,
      numPages: 1,
      currentPage: 1,
    },
  });

  /** MIXEDCONTENTTIMELINE */
  // createPage({
  //   path: `/all-essays-list`,
  //   component: path.resolve('./src/pages/homepage_list.tsx'),
  //   context: {
  //     limit: 100,
  //     skip: 0,
  //     numPages: 1,
  //     currentPage: 1,
  //   },
  // });

  /** CREATE A NEW HOMEPAGE */
  // createPage({
  //   path: `/`,
  //   component: path.resolve('./src/pages/homepage.tsx'),
  //   context: {
  //     testing: 'yoooo',
  //   },
  // });
  /** CREATE A NEW HOMEPAGE */

  /** Create a list of all blog posts */
  const postsPerPage = 10;
  const numPages = Math.ceil(posts.length / postsPerPage);

  /** this creates any number of pages necessary to create a full blog list (this should be what is done for "list pages") */
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/` : `/${i + 1}`,
      component: path.resolve('./src/templates/blog-list.tsx'),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    });
    createPage({
      path: i === 0 ? `/` : `/${i + 1}`,
      component: path.resolve('./src/pages/all-essays-list.tsx'),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};
