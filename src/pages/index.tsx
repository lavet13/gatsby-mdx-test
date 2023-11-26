import * as React from 'react';
import {
  Box,
  Grid,
  Heading,
  LinkBox,
  LinkOverlay,
  Text,
} from '@chakra-ui/react';

import { graphql, Link as GatsbyLink } from 'gatsby';
import type { HeadFC, PageProps } from 'gatsby';
import { GatsbyImage, IGatsbyImageData, getImage } from 'gatsby-plugin-image';

import Dump from '../components/dump';

const IndexPage: React.FC<PageProps<Queries.SiteIndexQueryQuery>> = ({
  data,
}) => {
  return (
    <Box as='main'>
      {/* <Dump data={data} /> */}

      <Grid
        gridTemplateColumns={'repeat(auto-fit, minmax(14rem, 1fr))'}
        gridAutoRows={'minmax(15rem, 1fr)'}
        gap={3}
      >
        {data.allMdx.nodes.map(node => {
          const heroImage = getImage(
            node.frontmatter?.cover?.childImageSharp?.gatsbyImageData!
          );

          return (
            <LinkBox
              as='article'
              key={node.id}
              maxW={'sm'}
              p={5}
              rounded='md'
              borderWidth='1px'
            >
              <Heading as='h1'>
                <LinkOverlay as={GatsbyLink} to={node.fields?.slug as string}>
                  {node.frontmatter?.title}
                </LinkOverlay>
              </Heading>
              <Box as={GatsbyLink} to={node.fields?.slug as string}>
                {heroImage && (
                  <GatsbyImage
                    image={heroImage}
                    style={{ borderRadius: '0.375rem' }}
                    alt='Hero Image'
                  />
                )}
              </Box>
              <Text>{node.frontmatter?.date}</Text>
              <Text fontSize={'0.8rem'} fontWeight={900}>
                {node.excerpt}
              </Text>
            </LinkBox>
          );
        })}
      </Grid>
    </Box>
  );
};

export const query = graphql`
  query SiteIndexQuery {
    allMdx(
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { published: { eq: true } } }
    ) {
      nodes {
        id
        excerpt(pruneLength: 65)

        frontmatter {
          title
          date(formatString: "YYYY MMMM Do")
          cover {
            publicURL
            childImageSharp {
              gatsbyImageData(width: 250)
            }
          }
        }

        fields {
          slug
        }
      }
    }
  }
`;

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
