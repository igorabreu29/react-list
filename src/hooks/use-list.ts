import { v4 as uuidv4 } from 'uuid';

import { ListProps } from '../context/list-context';
import { useListContext } from './use-list-context';
import { NewItemSchema } from '../components/list';

import { useSearchParams } from 'react-router-dom'

export function useList(reset: () => void) {
  const [searchParams] = useSearchParams()
  const urlFilter = searchParams.get('filter') ?? 'all'

  const { list, setNoteToList } = useListContext();

  const handleAddNewItemList = ({ newItem }: NewItemSchema) => {
    const newItemList: ListProps = {
      id: uuidv4(),
      content: newItem,
      checked: false,
    };

    setNoteToList(newItemList);
    reset()
  };

  // filter === 'all' ? true : filter === 'active' ? !item.checked : item.checked
  const filteredListByState = list.filter((item) => {
    if (urlFilter === 'all') return true
    if (urlFilter === 'active') return !item.checked
    return item.checked
  });

  return {
    handleAddNewItemList,
    filteredListByState,
  };
}