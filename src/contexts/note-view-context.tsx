import React, { PropsWithChildren } from 'react';

export const NoteViewContext = React.createContext({
  isGridView: true,
  setIsGridView: () => {},
});

export const NoteViewContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [isGridView, setIsGridView] = React.useState(true);

  const changeGridView = () => {
    setIsGridView((view) => !view);
  };

  return (
    <NoteViewContext.Provider
      value={{
        isGridView,
        setIsGridView: changeGridView,
      }}
    >
      {children}
    </NoteViewContext.Provider>
  );
};
