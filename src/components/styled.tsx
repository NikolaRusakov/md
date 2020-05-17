/** @jsx jsx */
import { jsx } from '@emotion/core';
import { space, color, fontSize, width, fontWeight, lineHeight, variant, border, padding, layout } from 'styled-system';
import styled from '@emotion/styled';
import { flexbox } from 'styled-system';

export const Flex = styled('div')(
  {
    display: 'flex',
  },
  flexbox,
  padding,
);

export const Span = styled('span')(color, fontSize, flexbox);

export const Text = styled('div')`
  ${space}
  ${fontSize}
  ${fontWeight}
  ${lineHeight}
  ${color}
`;

export const Heading = Text.withComponent('h1');

Heading.defaultProps = {
  fontSize: 5,
  lineHeight: 1.5,
  m: 0,
};

export const TopBadge = styled(Flex)`
  ${space}
  ${width}
  ${fontSize}
  ${color}
  ${border}
  ${layout}
  ${flexbox}
  ${padding}
`;

export const Badge: React.FC = ({ children, ...etc }) => (
  <TopBadge
    css={theme => ({
      borderRadius: theme.sizes[2],
      padding: theme.sizes[2],
      margin: `0 ${theme.sizes[1]}`,
      background: theme.colors.gray[8],
      color: theme.colors.teal[1],
    })}
    {...etc}>
    {children}
  </TopBadge>
);

export const Pill = styled(Badge)`
  ${fontSize}
  ${space}
`;
