import path from 'path';
import type { GatsbyNode } from 'gatsby';
import { createFilePath } from 'gatsby-source-filesystem';

export const onCreateNode: GatsbyNode['onCreateNode'] = ({
  node,
  actions,
  getNode,
}) => {
  const { createNodeField } = actions;
  if (node.internal.type === 'Mdx') {
    const value = createFilePath({ node, getNode });
    console.log({ value });

    createNodeField({
      name: 'slug',
      node,
      value,
    });
  }
};

const postTemplate = path.resolve('./src/templates/post.tsx');

export const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions,
  reporter,
}) => {
  const { createPage } = actions;

  const result = await graphql<Queries.PostsQuery>(`
    query Posts {
      allMdx(
        sort: { frontmatter: { date: DESC } }
        filter: { frontmatter: { published: { eq: true } } }
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
            internal {
              contentFilePath
            }
          }

          previous {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }

          next {
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
  `);

  if (result.errors) {
    reporter.panicOnBuild('Error loading MDX result', result.errors);
  }

  // Create blog post pages.
  const posts = result.data?.allMdx.edges;

  // you'll call `createPage` for each result
  posts?.forEach(({ node: post, previous, next }) => {
    console.log({ post });

    createPage({
      // As mentioned above you could also query something else like frontmatter.title above and use a helper function
      // like slugify to create a slug
      path: post.fields?.slug as string,
      // Provide the path to the MDX content file so webpack can pick it up and transform it into JSX
      component: `${postTemplate}?__contentFilePath=${post.internal.contentFilePath}`,
      // You can use the values in this context in
      // our page layout component
      context: { id: post.id, previous, next },
    });
  });
};

export type PostContextType = {
  previous: {
    readonly fields: {
      readonly slug: string | null;
    } | null;
    readonly frontmatter: {
      readonly title: string | null;
    } | null;
  } | null;
  next: {
    readonly fields: {
      readonly slug: string | null;
    } | null;
    readonly frontmatter: {
      readonly title: string | null;
    } | null;
  } | null;
};
