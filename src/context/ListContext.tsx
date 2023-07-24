import * as React from 'react';
import { ListProps, ThemeProps, useLists } from '../hooks/useListContext';

interface ListContextProps {
  lists: ListProps[];
  handleCheckItemList: (checked: boolean, id: string) => void;
  handleRemoveItem: (id: string) => void;
  handleRemoveItemListIsCompleted: () => void;
  color: ThemeProps;
  setColor: React.Dispatch<React.SetStateAction<ThemeProps>>;
  setListsData: (data: ListProps) => void;
}

const ListContext = React.createContext({} as ListContextProps);

interface ListContextProviderProps {
  children: React.ReactNode;
}

export function ListContextProvider({ children }: ListContextProviderProps) {
  const {
    lists,
    setListsData,
    handleCheckItemList,
    handleRemoveItemListIsCompleted,
    handleRemoveItem,
    color,
    setColor,
  } = useLists();

  return (
    <ListContext.Provider
      value={{
        lists,
        setListsData,
        handleCheckItemList,
        handleRemoveItemListIsCompleted,
        handleRemoveItem,
        color,
        setColor,
      }}
    >
      {children}
    </ListContext.Provider>
  );
}

export const ListContextValues = () => React.useContext(ListContext);
