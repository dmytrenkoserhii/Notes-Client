import { Box, Select } from '@mantine/core';
import React from 'react';
import { SORT_OPTIONS } from '../constants';

interface SortProps {
  value: string;
  onSortChange: (value: string) => void;
}

export const Sort: React.FC<SortProps> = ({ value, onSortChange }) => {
  return (
    <Box w="10rem">
      <Select
        placeholder="Newest"
        data={SORT_OPTIONS}
        value={value}
        onChange={(newValue) => onSortChange(newValue || '')}
      />
    </Box>
  );
};
