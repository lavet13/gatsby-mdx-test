import React from 'react';
import type { GatsbySSR } from 'gatsby';

import theme from './src/@chakra-ui/gatsby-plugin/theme';

import { ChakraWrapper } from './src/@chakra-ui/gatsby-plugin/chakra-root-wrapper';
import Layout from './src/components/layout';

import { ColorModeScript } from '@chakra-ui/react';

export const onRenderBody = ({ setPreBodyComponents, setHeadComponents }) => {
  setPreBodyComponents([
    <ColorModeScript
      initialColorMode={theme.config.initialColorMode}
      key='chakra-ui-no-flash'
    />,
  ]);
};

export const wrapRootElement: GatsbySSR['wrapRootElement'] = (
  { element },
  pluginOptions
) => <ChakraWrapper {...pluginOptions}>{element}</ChakraWrapper>;

export const wrapPageElement: GatsbySSR['wrapPageElement'] = ({ element }) => (
  <Layout>{element}</Layout>
);
