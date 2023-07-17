import * as React from 'react';
import { ListContextValues, ListProps } from '../context/ListContext';
import { ItemList } from './Items';
import styles from './List.module.css';
import { OptionsList } from './Options';

import { v4 as uuidv4 } from 'uuid';

export function List() {
  const [newItem, setNewItem] = React.useState('');

  const { filteredList, lists, color, setListsData } = ListContextValues();

  const handleAddNewItemList = (e: React.FormEvent) => {
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
        {filteredList.length === 0
          ? lists.map((list) => <ItemList key={list.id} list={list} />)
          : filteredList.map((list) => <ItemList key={list.id} list={list} />)}
        <OptionsList />
      </div>
    </div>
  );
}
