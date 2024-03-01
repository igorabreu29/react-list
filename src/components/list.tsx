import { Options } from './options';
import { ItemList } from './items';
import { useList } from '../hooks/use-list';
import { useListContext } from '../hooks/use-list-context';

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTheme } from '../hooks/use-theme';

const newItemSchema = z.object({
  newItem: z.string().min(1, 'The field cannot be empty!'),
});

export type NewItemSchema = z.infer<typeof newItemSchema>;

export function List() {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<NewItemSchema>({
    resolver: zodResolver(newItemSchema),
  });

  const { list } = useListContext();

  const {
    handleAddNewItemList,
    filteredListByState,
  } = useList(reset);

  return (
    <div className='h-[32rem] w-full flex items-center justify-start flex-col gap-8'>
      <form
        className='w-full flex items-start flex-col rounded'
        onSubmit={handleSubmit(handleAddNewItemList)}
      >
          <input
            type="text"
            placeholder="Create a new todo"
            {...register('newItem')}
            className='w-full p-4 bg-transparent placeholder:text-zinc-600 border-2 border-slate-500 rounded outline-none'
          />
          {errors.newItem && <span className='text-red-500 text-sm'>{errors.newItem.message}</span>}
      </form>
      <div className='w-full flex flex-col overflow-auto'>
        {list.length === 0
          ? list.map((item) => <ItemList key={item.id} list={item} />)
          : filteredListByState.map((list) => (
              <ItemList key={list.id} list={list} />
            ))}
        <Options list={filteredListByState} />
      </div>
    </div>
  );
}
