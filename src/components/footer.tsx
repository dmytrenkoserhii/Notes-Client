import React from 'react';
import dayjs from 'dayjs';
import { Box, Divider, Group, Text } from '@mantine/core';

export const Footer: React.FC = () => {
  const currentYear = dayjs().format('YYYY');

  return (
    <Box py='xs'>
      <Divider py={4} />
      <Group justify='center'>
        <Text>Create by Serhii Dmytrenko © {currentYear}</Text>
      </Group>
    </Box>
  );
};
