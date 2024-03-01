import { X } from 'lucide-react'
import { useListContext } from '../hooks/use-list-context';

interface ItemListProps {
  list: {
    id: string;
    content: string;
    checked: boolean;
  };
}

export function ItemList({ list }: ItemListProps) {
  const { handleCheckItemList, handleRemoveItem } = useListContext();

  return (
      <div
        className='flex items-center gap-4 px-4 rounded w-full shadow-lg'
      >
        <input
          type="checkbox"
          checked={list.checked}
        />
        <p
          data-checked={list.checked}
          className='flex items-center flex-wrap py-4 w-[22rem] data-[checked=true]:line-through text-zinc-600'
          onClick={() => handleCheckItemList(list.checked, list.id)}
        >
          {list.content}
        </p>
        <button onClick={() => handleRemoveItem(list.id)} className='bg-transparent flex items-center justify-center text-zinc-600'>
          <X size={20} />
        </button>
      </div>
  );
}