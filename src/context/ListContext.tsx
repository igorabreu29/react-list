import * as React from 'react';

export interface ListProps {
  id: string;
  content: string;
  checked: boolean;
}

interface ThemeProps {
  theme: string;
  isSelected: boolean;
}

interface ListContextProps {
  lists: ListProps[];
  filteredList: ListProps[];
  handleCheckItemList: (checked: boolean, id: string) => void;
  handleRemoveItem: (id: string) => void;
  handleRemoveItemListIsCompleted: () => void;
  handleGetAllItemsList: () => void;
  handleGetActiveItems: () => void;
  handleGetCompletedItems: () => void;
  color: ThemeProps;
  setColor: React.Dispatch<React.SetStateAction<ThemeProps>>;
  setListsData: (data: ListProps) => void;
}

const ListContext = React.createContext({} as ListContextProps);

interface ListContextProviderProps {
  children: React.ReactNode;
}

export function ListContextProvider({ children }: ListContextProviderProps) {
  const [color, setColor] = React.useState(() => {
    const currentTheme = localStorage.getItem('theme-application');

    if (currentTheme) {
      return JSON.parse(currentTheme);
    } else {
      return { theme: 'dark', isSelected: true };
    }
  });

  const [lists, setLists] = React.useState<ListProps[]>(() => {
    const storage = localStorage.getItem('lists');

    if (storage) {
      return JSON.parse(storage);
    } else {
      return [];
    }
  });
  const [filteredList, setFilteredList] = React.useState<ListProps[]>([]);

  React.useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(lists));
  }, [lists]);

  React.useEffect(() => {
    localStorage.setItem('theme-application', JSON.stringify(color));
  }, [color]);
  // functions of my lists

  const setListsData = (data: ListProps) => {
    setLists((state) => [...state, data]);
  };

  const handleCheckItemList = React.useCallback(
    (checked: boolean, id: string) => {
      const findIndexItem = lists.findIndex((list) => {
        return list.id === id;
      });

      lists[findIndexItem].checked = !checked;
      setLists([...lists]);
    },
    [lists]
  );

  const handleRemoveItem = React.useCallback(
    (id: string) => {
      const removeItemId = lists.filter((list) => {
        return list.id !== id;
      });

      setLists(removeItemId);
    },
    [lists]
  );

  // Functions to component option

  const handleRemoveItemListIsCompleted = React.useCallback(() => {
    const getItemsWithIsChecked = lists.filter((list) => {
      return list.checked !== true;
    });

    const getItemsFilteredChecked = filteredList.filter((list) => {
      return list.checked !== true;
    });

    setLists(getItemsWithIsChecked);
    setFilteredList(getItemsFilteredChecked);
  }, [lists, filteredList]);

  const handleGetAllItemsList = React.useCallback(() => {
    setFilteredList([]);
  }, []);

  const handleGetActiveItems = React.useCallback(() => {
    const getActiveItems = lists.filter((list) => {
      return list.checked === false;
    });

    setFilteredList([...getActiveItems]);
  }, [lists]);

  const handleGetCompletedItems = React.useCallback(() => {
    const getCompletedItems = lists.filter((list) => {
      return list.checked === true;
    });

    setFilteredList([...getCompletedItems]);
  }, [lists]);

  return (
    <ListContext.Provider
      value={{
        lists,
        setListsData,
        filteredList,
        handleCheckItemList,
        handleGetActiveItems,
        handleGetAllItemsList,
        handleGetCompletedItems,
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
