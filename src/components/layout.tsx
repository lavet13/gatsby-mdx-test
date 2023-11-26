import React, { FC, PropsWithChildren } from 'react';
import { useSiteMetadata } from '../hooks/useSiteMetadata';
import Header from './header';
import { Container, Flex } from '@chakra-ui/react';
import ToggleColorMode from './toggleColorMode';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const siteMetadata = useSiteMetadata();

  return (
    <Container maxW='container.lg'>
      <Flex justify='space-between' align='center'>
        <Header
          siteTitle={siteMetadata?.title as string}
          marginTop={3}
          marginBottom={5}
        />
        <ToggleColorMode />
      </Flex>
      {children}
    </Container>
  );
};

export default Layout;
