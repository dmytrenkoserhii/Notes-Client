import React from 'react';
import { Highlight } from '@mantine/core';

interface HighlightedTextProps {
  text: string;
  highlight: string;
}

export const HighlightedText: React.FC<HighlightedTextProps> = ({
  text,
  highlight,
}) => {
  return (
    <Highlight
      highlight={highlight}
      highlightStyles={(theme) => ({
        backgroundColor: theme.colors.yellow[2],
        fontWeight: 700,
      })}
    >
      {text}
    </Highlight>
  );
};
