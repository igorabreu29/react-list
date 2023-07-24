import * as React from 'react';
import { ListContextValues } from '../../context/ListContext';
import { useList } from '../../hooks/useList';
import { ItemList } from '../Items';
import styles from './List.module.css';
import { OptionsList } from '../Options';

export function List() {
  const { lists, color } = ListContextValues();
  const {
    handleAddNewItemList,
    newItem,
    setNewItem,
    filteredListByChecked,
    filter,
    setFilter,
  } = useList();

  return (
    <div className={styles.listContainer}>
      <form
        onSubmit={handleAddNewItemList}
        className={`${styles.addList} ${
          color.isSelected ? styles.addBlack : styles.addWhite
        }`}
      >
        <button></button>
        <input
          type="text"
          placeholder="Create a new todo"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
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
