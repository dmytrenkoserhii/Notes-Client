import { NavLink, Stack } from '@mantine/core';
import React from 'react';
import { MdDelete, MdFolder, MdNote } from 'react-icons/md';

export const Navbar: React.FC = () => {
  return (
    <Stack>
      <NavLink label="Folders" leftSection={<MdFolder size="1rem" />} />
      <NavLink label="Notes" leftSection={<MdNote size="1rem" />} />
      <NavLink label="Trash" leftSection={<MdDelete size="1rem" />} />
    </Stack>
  );
};
