import * as React from 'react';
import { ListContextValues } from '../../context/ListContext';
import { useList } from '../../hooks/useList';
import { ItemList } from '../Items';
import styles from './List.module.css';
import { OptionsList } from '../Options';

export function List() {
  const { lists, color } = ListContextValues();
  const {
    handleSubmit,
    register,
    errors,
    handleAddNewItemList,
    filteredListByChecked,
    filter,
    setFilter,
  } = useList();

  return (
    <div className={styles.listContainer}>
      <form
        onSubmit={handleSubmit(handleAddNewItemList)}
        className={`${styles.addList} ${
          color.isSelected ? styles.addBlack : styles.addWhite
        }`}
      >
        <button></button>
        <div>
          <input
            type="text"
            placeholder="Create a new todo"
            {...register('newItem')}
          />
          {errors.newItem && <span>{errors.newItem.message}</span>}
        </div>
      </form>
      <div className={styles.listContent}>
        {lists.length === 0
          ? lists.map((list) => <ItemList key={list.id} list={list} />)
          : filteredListByChecked.map((list) => (
              <ItemList key={list.id} list={list} />
            ))}
        <OptionsList filter={filter} setFilter={setFilter} />
      </div>
    </div>
  );
}
