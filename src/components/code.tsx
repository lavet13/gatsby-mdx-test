import { Box, Button } from '@chakra-ui/react';
import { Highlight, themes } from 'prism-react-renderer';
import React, { FC } from 'react';

import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';

import { copyToClipboard } from '../utils/copy-to-clipboard';

const Code: FC<{
  [key: string]: any;
  codeString: string;
  language: string;
}> = ({ codeString, language, ...props }) => {
  console.log({ props });

  if (props['react-live']) {
    return (
      <LiveProvider code={codeString} noInline={true} theme={themes.github}>
        <LiveEditor />
        <LiveError />
        <LivePreview />
      </LiveProvider>
    );
  }
  const handleClipboard = () => {
    copyToClipboard(codeString);
  };

  return (
    <Highlight theme={themes.github} code={codeString} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Box
          position='relative'
          as='pre'
          textAlign='left'
          margin='1em 0'
          p='0.5em'
          overflowX='auto'
          borderRadius='3px'
          sx={{
            '&.token-line': {
              lineHeight: '1.3em',
              height: '1.3em',
            },
          }}
          className={className}
          style={style}
        >
          <Button
            position='absolute'
            right='0.25rem'
            border={0}
            borderRadius='3px'
            margin='0.25em'
            opacity={0.7}
            _hover={{ opacity: 1 }}
            colorScheme='purple'
            onClick={handleClipboard}
          >
            Copy
          </Button>

          {tokens.map((line, i) => (
            <Box key={i} {...getLineProps({ line, key: i })}>
              <Box
                as='span'
                userSelect='none'
                width='2em'
                display='inline-block'
                opacity='0.3'
              >
                {i + 1}
              </Box>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </Box>
          ))}
        </Box>
      )}
    </Highlight>
  );
};

export default Code;
