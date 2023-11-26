import { Box } from '@chakra-ui/react';
import React, { FC } from 'react';

const Dump: FC<any> = props => (
  <Box fontSize={20} border={'1px solid #efefef'} p={10} bg={'white'}>
    {Object.entries(props).map(([key, val]) => (
      <pre key={key}>
        <strong style={{ color: 'white', background: 'red' }}>{key} 💩</strong>
        {JSON.stringify(val, '', ' ')}
      </pre>
    ))}
  </Box>
);

export default Dump;
