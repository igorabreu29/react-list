import { FormEvent, useState } from 'react';
import { ListProps } from './useListContext';
import { ListContextValues } from '../context/ListContext';
import { v4 as uuidv4 } from 'uuid';

export function useList() {
  const [newItem, setNewItem] = useState('');
  const [filter, setFilter] = useState('All');

  const { lists, setListsData } = ListContextValues();

  const handleAddNewItemList = (e: FormEvent) => {
    e.preventDefault();

    if (newItem === '') {
      return alert('Adicione algo!');
    }

    const newItemList: ListProps = {
      id: uuidv4(),
      content: newItem,
      checked: false,
    };

    setListsData(newItemList);
    setNewItem('');
  };

  const filteredListByChecked = lists.filter((list) =>
    filter === 'All' ? true : filter === 'Active' ? !list.checked : list.checked
  );

  return {
    handleAddNewItemList,
    filteredListByChecked,
    filter,
    setFilter,
    newItem,
    setNewItem,
  };
}
