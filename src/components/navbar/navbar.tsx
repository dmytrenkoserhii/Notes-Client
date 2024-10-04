import { NavLink, Stack } from '@mantine/core';
import React from 'react';
import { BsPerson } from 'react-icons/bs';
import { MdDelete, MdNote } from 'react-icons/md';
import { Link } from 'react-router-dom';

import { useLocation } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <Stack>
      <NavLink
        label="Notes"
        leftSection={<MdNote size="1rem" />}
        active={location.pathname === '/notes'}
        component={Link}
        to="/notes"
      />
      <NavLink
        label="Trash"
        leftSection={<MdDelete size="1rem" />}
        active={location.pathname === '/trash'}
        component={Link}
        to="/trash"
      />
      <NavLink
        label="User"
        leftSection={<BsPerson size="1rem" />}
        active={location.pathname === '/user'}
        component={Link}
        to="/user"
      />
    </Stack>
  );
};
