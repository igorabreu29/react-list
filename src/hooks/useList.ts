import { FormEvent, useState } from 'react';
import { ListProps } from './useListContext';
import { ListContextValues } from '../context/ListContext';
import { v4 as uuidv4 } from 'uuid';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const newItemSchema = z.object({
  newItem: z.string().nonempty('The field cannot be empty!'),
});

type NewItemData = z.infer<typeof newItemSchema>;

export function useList() {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<NewItemData>({
    resolver: zodResolver(newItemSchema),
  });

  const [filter, setFilter] = useState('All');
  const { lists, setListsData } = ListContextValues();

  const handleAddNewItemList = ({ newItem }: NewItemData) => {
    const newItemList: ListProps = {
      id: uuidv4(),
      content: newItem,
      checked: false,
    };

    setListsData(newItemList);
    reset();
  };

  const filteredListByChecked = lists.filter((list) =>
    filter === 'All' ? true : filter === 'Active' ? !list.checked : list.checked
  );

  return {
    handleSubmit,
    register,
    errors,
    handleAddNewItemList,
    filteredListByChecked,
    filter,
    setFilter,
  };
}
