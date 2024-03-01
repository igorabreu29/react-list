import { useCallback, useEffect, useState } from "react";
import { ListProps } from "../context/list-context";

export function useListContextProvider() {
  const [list, setList] = useState<ListProps[]>(() => {
    const storage = localStorage.getItem('list');

    if (storage) return JSON.parse(storage);
    return []
  });

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

  // functions of my list
  const setNoteToList = (data: ListProps) => {
    setList((state) => [...state, data]);
  }

  const handleCheckItemList = useCallback(
    (checked: boolean, id: string) => {
      const findIndexItem = list.findIndex((list) => {
        return list.id === id;
      });

      list[findIndexItem].checked = !checked;
      setList([...list]);
    },
    [list]
  );

  const handleRemoveItem = useCallback(
    (id: string) => {
      const removeItemId = list.filter((list) => {
        return list.id !== id;
      });

      setList(removeItemId);
    },
    [list]
  );

  // Functions to component option

  const handleRemoveItemListIsCompleted = useCallback(() => {
    const getItemsWithIsChecked = list.filter((list) => {
      return list.checked !== true;
    });

    setList(getItemsWithIsChecked);
  }, [list]);

  return {
    list,
    setNoteToList,
    handleCheckItemList,
    handleRemoveItem,
    handleRemoveItemListIsCompleted
  }
}