import { ChakraProvider, ChakraProviderProps } from '@chakra-ui/react';

import React, { FC } from 'react';
import theme from './theme';

export const ChakraWrapper: FC<ChakraProviderProps> = ({
  children,
  resetCSS = true,
  portalZIndex,
}) => {
  console.log({ theme });

  return (
    <ChakraProvider
      theme={theme}
      resetCSS={resetCSS}
      portalZIndex={portalZIndex}
    >
      {children}
    </ChakraProvider>
  );
};
