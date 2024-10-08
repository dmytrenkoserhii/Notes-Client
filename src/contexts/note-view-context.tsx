import React, { PropsWithChildren } from 'react';

export const NoteViewContext = React.createContext({
  isGridView: true,
  setIsGridView: () => {},
  searchQuery: '',
  setSearchQuery: (query: string) => {},
});

export const NoteViewContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [isGridView, setIsGridView] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState('');

  const changeGridView = () => {
    setIsGridView((view) => !view);
  };

  return (
    <NoteViewContext.Provider
      value={{
        isGridView,
        setIsGridView: changeGridView,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </NoteViewContext.Provider>
  );
};
