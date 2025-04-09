import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import styles from './header.module.css';
import {
  ActionIcon,
  Center,
  Group,
  Menu,
  rem,
  TextInput,
  Title,
  useMantineColorScheme,
} from '@mantine/core';
import {
  BsBoxArrowRight,
  BsGrid,
  BsList,
  BsPerson,
  BsSearch,
} from 'react-icons/bs';
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import { NoteViewContext } from '../../contexts';
import { AuthService } from '../../features/authentication';

export const Header: React.FC = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { isGridView, setIsGridView } = React.useContext(NoteViewContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { searchQuery, setSearchQuery } = React.useContext(NoteViewContext);

  const { mutate: logOut } = useMutation({
    mutationFn: () => AuthService.logoutUser(),
    onSuccess: () => {
      queryClient.setQueryData(['user'], null);
      queryClient.invalidateQueries({ queryKey: ['user'] });
      navigate('/');
    },
    onError: (error: Error) => {
      console.error('Logout failed:', error);
    },
  });

  return (
    <Center>
      <Group justify='space-between' p='md' w='80rem' wrap='nowrap'>
        <Group>
          <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
            <Title order={1}>Notes</Title>
          </Link>
        </Group>
        <TextInput
          placeholder='Search notes...'
          leftSection={<BsSearch size={14} />}
          className={styles.searchInput}
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.currentTarget.value)}
        />
        <Group>
          <ActionIcon onClick={setIsGridView}>
            {isGridView ? <BsList size={20} /> : <BsGrid size={20} />}
          </ActionIcon>
          <Menu>
            <Menu.Target>
              <ActionIcon>
                <BsPerson size={20} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                leftSection={
                  <BsPerson style={{ width: rem(14), height: rem(14) }} />
                }
                component={Link}
                to='/user'
              >
                Profile
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <BsBoxArrowRight
                    style={{ width: rem(14), height: rem(14) }}
                  />
                }
                onClick={() => logOut()}
              >
                Log out
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
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
