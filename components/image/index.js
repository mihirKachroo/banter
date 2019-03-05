import React, { useState, useEffect, useRef } from 'react';
import { Box } from 'blockstack-ui';
import styled from 'styled-components';

const ImageWrapper = styled(Box)`
  img.lazyloaded {
    opacity: 1 !important;
  }
`;

const PreviewImage = ({ ...rest }) => <Box width={1} is="img" display="block" maxWidth="100%" {...rest} />;
const HighResImage = ({ ...rest }) => (
  <Box
    transition="0.5s all ease-in-out"
    opacity={0}
    position="absolute"
    left={0}
    top={0}
    width={1}
    is="img"
    display="block"
    maxWidth="100%"
    {...rest}
  />
);

const Image = ({ src, ...rest }) => {
  const isImgix = src.includes('imgix');
  if (!isImgix) {
    return (
      <Box width={1}>
        <Box is="img" width={1} display="block" src={src} {...rest} />
      </Box>
    );
  }

  const highRes = src + '?auto=format&fit=max&w=800';
  const preview = src + '?auto=format&w=100&blur=100';

  return (
    <ImageWrapper width={1} position="relative">
      <HighResImage className="lazyload" data-src={highRes} />
      <PreviewImage src={preview} />
    </ImageWrapper>
  );
};

export { Image };