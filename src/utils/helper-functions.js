import React from 'react';
import { Link } from 'gatsby';
import { rhythm } from './typography';

export const renderPostsByCategory = (collection = [], category = 'all', name = 'default') => {
  console.log('((renderPostsByCateogry)) category', category);
  const HEADER = (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      {
        <>
          <h3>{name != 'default' ? name : category.charAt(0).toUpperCase() + category.slice(1)}</h3>
          <h6 className="clickElement">Read More</h6>
        </>
      }
    </div>
  );

  const POSTS = collection.map(({ node }) => {
    if (
      (node.frontmatter.categories && node.frontmatter.categories.includes(category)) ||
      category === 'all'
    ) {
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

  return (
    <>
      {HEADER}
      {POSTS}
    </>
  );
};
