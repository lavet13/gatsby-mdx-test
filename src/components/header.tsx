import React, { FC } from 'react';

import { Button, ButtonProps, Icon, Link } from '@chakra-ui/react';

import { Link as GatsbyLink } from 'gatsby';

const Header: FC<ButtonProps & { siteTitle: string }> = ({
  siteTitle,
  ...props
}) => (
  <Button
    maxW={150}
    display='flex'
    alignItems='center'
    gap={2}
    as={GatsbyLink}
    to='/'
    _hover={{
      '& svg': {
        transform: `scale(1.1)`,
      },
    }}
    {...props}
  >
    <Icon
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      width={'1.2rem'}
      height={'1.2rem'}
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      transitionDuration={'0.2s'}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
      />
    </Icon>
    <h1>{siteTitle}</h1>
  </Button>
);

export default Header;
