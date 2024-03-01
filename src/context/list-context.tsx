import { createContext } from 'react';
import { useListContextProvider } from '../hooks/use-list-context-provider';

export interface ListProps {
  id: string;
  content: string;
  checked: boolean;
}

interface ListContextState {
  list: ListProps[];
  handleCheckItemList: (checked: boolean, id: string) => void;
  handleRemoveItem: (id: string) => void;
  handleRemoveItemListIsCompleted: () => void;
  setNoteToList: (data: ListProps) => void;
}

const initialState: ListContextState = {
  list: [],
  setNoteToList: () => undefined,
  handleCheckItemList: () => undefined,
  handleRemoveItem: () => undefined,
  handleRemoveItemListIsCompleted: () => undefined
}

export const ListContext = createContext<ListContextState>(initialState);

interface ListContextProviderProps {
  children: React.ReactNode;
}

export function ListContextProvider({ children, ...props }: ListContextProviderProps) {
  const { list, handleCheckItemList, handleRemoveItem, handleRemoveItemListIsCompleted, setNoteToList } = useListContextProvider()
   
  return (
    <ListContext.Provider
      {...props}
      value={{
        list,
        setNoteToList,
        handleCheckItemList,
        handleRemoveItemListIsCompleted,
        handleRemoveItem,
      }}
    >
      {children}
    </ListContext.Provider>
  );
}