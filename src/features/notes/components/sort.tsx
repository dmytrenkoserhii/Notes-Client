import { Box, Select } from '@mantine/core';
import React from 'react';
import { SORT_OPTIONS } from '../constants';

export const Sort: React.FC = () => {
  return (
    <Box w="10rem">
      <Select placeholder={SORT_OPTIONS[0]} data={SORT_OPTIONS} />
    </Box>
  );
};
