import { useCallback, useEffect, useState } from 'react';

export interface ListProps {
  id: string;
  content: string;
  checked: boolean;
}

export interface ThemeProps {
  theme: string;
  isSelected: boolean;
}

export function useLists() {
  const [color, setColor] = useState<ThemeProps>(() => {
    const currentTheme = localStorage.getItem('theme-application');

    if (currentTheme) {
      return JSON.parse(currentTheme);
    } else {
      return { theme: 'dark', isSelected: true };
    }
  });

  const [lists, setLists] = useState<ListProps[]>(() => {
    const storage = localStorage.getItem('lists');

    if (storage) {
      return JSON.parse(storage);
    } else {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(lists));
  }, [lists]);

  useEffect(() => {
    localStorage.setItem('theme-application', JSON.stringify(color));
  }, [color]);
  // functions of my lists

  const setListsData = (data: ListProps) => {
    setLists((state) => [...state, data]);
  };

  const handleCheckItemList = useCallback(
    (checked: boolean, id: string) => {
      const findIndexItem = lists.findIndex((list) => {
        return list.id === id;
      });

      lists[findIndexItem].checked = !checked;
      setLists([...lists]);
    },
    [lists]
  );

  const handleRemoveItem = useCallback(
    (id: string) => {
      const removeItemId = lists.filter((list) => {
        return list.id !== id;
      });

      setLists(removeItemId);
    },
    [lists]
  );

  // Functions to component option

  const handleRemoveItemListIsCompleted = useCallback(() => {
    const getItemsWithIsChecked = lists.filter((list) => {
      return list.checked !== true;
    });

    setLists(getItemsWithIsChecked);
  }, [lists]);

  return {
    color,
    setColor,
    setListsData,
    handleCheckItemList,
    handleRemoveItem,
    handleRemoveItemListIsCompleted,
    lists,
  };
}
