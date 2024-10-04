import {
  ActionIcon,
  Center,
  Group,
  TextInput,
  Title,
  useMantineColorScheme,
} from '@mantine/core';
import { BsGrid, BsList, BsPerson, BsSearch } from 'react-icons/bs';
import React from 'react';
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import styles from './header.module.css';
import { Link } from 'react-router-dom';
import { NoteViewContext } from '../../contexts';

export const Header: React.FC = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { isGridView, setIsGridView } = React.useContext(NoteViewContext);

  return (
    <Center>
      <Group justify="space-between" p="md" w="80rem" wrap="nowrap">
        <Group>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Title order={1}>Notes</Title>
          </Link>
        </Group>
        <TextInput
          placeholder="Search notes..."
          leftSection={<BsSearch size={14} />}
          className={styles.searchInput}
        />
        <Group>
          <ActionIcon onClick={setIsGridView}>
            {isGridView ? <BsGrid size={20} /> : <BsList size={20} />}
          </ActionIcon>
          <ActionIcon>
            <BsPerson size={20} />
          </ActionIcon>
          <ActionIcon onClick={() => toggleColorScheme()}>
            {colorScheme === 'dark' ? (
              <MdLightMode size={20} />
            ) : (
              <MdDarkMode size={20} />
            )}
          </ActionIcon>
        </Group>
      </Group>
    </Center>
  );
};
