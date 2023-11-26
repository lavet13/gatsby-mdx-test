import React, { FC } from 'react';

import { Link as GatsbyLink } from 'gatsby';
import type { GatsbyLinkProps } from 'gatsby';

import { Link as ChakraLink } from '@chakra-ui/react';
import type { LinkProps } from '@chakra-ui/react';

const Link: FC<LinkProps & GatsbyLinkProps<any>> = ({ to, ...props }) => (
  <ChakraLink as={GatsbyLink} to={to} {...props} />
);

export default Link;
