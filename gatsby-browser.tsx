import React from 'react';
import type { GatsbyBrowser } from 'gatsby';

import { ChakraWrapper } from './src/@chakra-ui/gatsby-plugin/chakra-root-wrapper';
import Layout from './src/components/layout';

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = (
  { element },
  pluginOptions
) => <ChakraWrapper {...pluginOptions}>{element}</ChakraWrapper>;

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({
  element,
}) => <Layout>{element}</Layout>;
