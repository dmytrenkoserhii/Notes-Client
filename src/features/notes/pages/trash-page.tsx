import { Box } from '@mantine/core';
import React from 'react';
import { NoteCardsList } from '../components';
import { NoteItemsList } from '../components';
import { NoteViewContext } from '../../../contexts';
import { useSearchParams } from 'react-router-dom';
import { getCurrentQueryParams } from '../../../utils';
import { NotesService } from '../services';
import { useQuery } from '@tanstack/react-query';
import { NotesQueryParams } from '../types';
import { SORT_OPTIONS } from '../constants';

export const TrashPage: React.FC = () => {
  const { isGridView } = React.useContext(NoteViewContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const queryParams = React.useMemo(() => {
    return getCurrentQueryParams(searchParams);
  }, [searchParams]);

  const requestQueryParams: NotesQueryParams = {
    limit: queryParams.limit,
    page: queryParams.page,
    sort: SORT_OPTIONS[0].value,
    isDeleted: true,
  };

  const { data: notesData, isLoading } = useQuery({
    queryKey: ['notes', requestQueryParams],
    queryFn: () => {
      if (
        !requestQueryParams.limit ||
        !requestQueryParams.page ||
        !requestQueryParams.sort
      )
        return;

      return NotesService.getAllNotes(requestQueryParams);
    },
  });

  console.log(notesData);

  React.useEffect(() => {
    if (!queryParams.limit && !queryParams.page) {
      setSearchParams(
        {
          ...queryParams,
          limit: queryParams.limit || '16',
          page: queryParams.page || '1',
          sort: queryParams.sort || SORT_OPTIONS[0].value,
        },
        {
          replace: true,
        }
      );

      return;
    }
  }, []);

  return (
    <Box>
      {isGridView
        ? notesData && (
            <NoteCardsList notes={notesData?.items} isLoading={isLoading} />
          )
        : notesData && (
            <NoteItemsList notes={notesData?.items} isLoading={isLoading} />
          )}
    </Box>
  );
};
