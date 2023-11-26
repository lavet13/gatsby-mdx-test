import React, { FC } from 'react';
import Code from '../components/code';
import Link from '../components/link';

import { graphql, Link as GatsbyLink } from 'gatsby';

import type { PageProps } from 'gatsby';

import { GatsbyImage, IGatsbyImageData, getImage } from 'gatsby-plugin-image';

import { MDXProvider } from '@mdx-js/react';

import {
  Box,
  Button,
  Code as ChakraCode,
  Container,
  Flex,
  HStack,
  Heading,
  Icon,
  Text,
} from '@chakra-ui/react';

import Dump from '../components/dump';
import { PostContextType } from '../../gatsby-node';

const components = {
  h2: ({ children }: { children?: any }) => (
    <Heading as='h2' size={'md'}>
      {children}
    </Heading>
  ),

  'p.inlineCode': (props: any) => <ChakraCode {...props} />,

  pre: (props: any) => {
    console.log('=====================');
    console.log(props);
    console.log('=====================');

    return (
      <Code
        codeString={props.children.props.children.trim()}
        language={props.children.props.className?.replace('language-', '')}
        {...props}
      />
    );
  },
  Link,
};

const PostTemplate: FC<PageProps<Queries.PostByIdQuery, PostContextType>> = ({
  data,
  children,
  pageContext,
}) => {
  const { previous, next } = pageContext;
  const cover = getImage(
    data.mdx?.frontmatter?.cover?.childImageSharp?.gatsbyImageData!
  );

  console.log({ tableOfContents: data.mdx?.tableOfContents });

  return (
    <>
      {/* <Dump previous={previous} />
      <Dump next={next} /> */}

      <Heading as='h1'>{data.mdx?.frontmatter?.title}</Heading>
      <Text>{data.mdx?.frontmatter?.date}</Text>
      {cover && <GatsbyImage image={cover} alt='Hero image' />}
      <MDXProvider components={components}>{children}</MDXProvider>

      <HStack
        mt={5}
        justify={
          previous && next
            ? 'space-between'
            : !previous && next
            ? 'flex-end'
            : 'flex-start'
        }
      >
        {previous && (
          <Flex gap={2}>
            <Button
              variant='ghost'
              as={GatsbyLink}
              colorScheme='blue'
              display={'flex'}
              alignItems='center'
              gap={1}
              to={previous.fields?.slug as string}
              _hover={{
                '& svg': {
                  transform: `translateX(-5px)`,
                },
              }}
            >
              <Icon
                xmlns='http://www.w3.org/2000/svg'
                width={6}
                height={6}
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                transitionDuration='0.2s'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18'
                />
              </Icon>

              {previous.frontmatter?.title}
            </Button>
          </Flex>
        )}

        {next && (
          <Flex gap={2}>
            <Button
              variant='ghost'
              as={GatsbyLink}
              colorScheme='blue'
              display={'flex'}
              alignItems='center'
              gap={1}
              to={next.fields?.slug as string}
              _hover={{
                '& svg': {
                  transform: `translateX(5px)`,
                },
              }}
            >
              {next.frontmatter?.title}
              <Icon
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                width={6}
                height={6}
                strokeWidth={1.5}
                stroke='currentColor'
                transitionDuration='0.2s'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3'
                />
              </Icon>
            </Button>
          </Flex>
        )}
      </HStack>
    </>
  );
};

export default PostTemplate;

export const query = graphql`
  query PostById($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        date(formatString: "YYYY MMMM Do")
        cover {
          publicURL
          childImageSharp {
            gatsbyImageData
          }
        }
      }
      tableOfContents
    }
  }
`;
