import { useSearchParams } from 'react-router-dom'
import { useListContext } from '../hooks/use-list-context';
import { ListProps } from '../context/list-context';

interface OptionsListProps {
  list: ListProps[]
}

export function Options({ list }: OptionsListProps) {
  const [, setSearchParams] = useSearchParams()
  const { handleRemoveItemListIsCompleted } = useListContext();

  const handleFilter = (filter: string) => {
    setSearchParams(params => {
      params.set('filter', filter)
      return params
    })
  }
  
  return (
    <div
      className='p-4 rounded w-full flex items-center justify-between'
    >
      <span className='text-xs'>{list.length} items left</span>
      <div className='flex gap-2'>
        <div>
          <input type="radio" id="all-items" name="state-items" hidden />
          <label 
            htmlFor="all-items" 
            onClick={() => handleFilter('all')} 
            className='text-sm cursor-pointer'
          >
            All
          </label>
        </div>
        <div>
          <input type="radio" id="active-items" name="state-items" hidden />
          <label 
            htmlFor="active-items" 
            onClick={() => handleFilter('active')} 
            className='text-sm cursor-pointer'
          >
            Active
          </label>
        </div>
        <div>
          <input type="radio" id="completed-items" name="state-items" hidden />
          <label
            htmlFor="completed-items"
            onClick={() => handleFilter('completed')}
            className='text-sm cursor-pointer'
          >
            Completed
          </label>
        </div>
      </div>
      <button 
        className='bg-transparent text-zinc-500 text-xs' 
        onClick={handleRemoveItemListIsCompleted}
      >
        Clear completed
      </button>
    </div>
  );
}