import { X } from 'phosphor-react';
import * as React from 'react';
import { ListContextValues } from '../../context/ListContext';
import styles from './Items.module.css';

interface ItemListProps {
  list: {
    id: string;
    content: string;
    checked: boolean;
  };
}

function ItemListMemo({ list }: ItemListProps) {
  const { color, handleCheckItemList, handleRemoveItem } = ListContextValues();

  function checkItemList() {
    handleCheckItemList(list.checked, list.id);
  }

  function handleChangeState(e: React.ChangeEvent<HTMLInputElement>) {
    e.target.checked = list.checked;
  }

  function removeItem() {
    handleRemoveItem(list.id);
  }
  return (
    <>
      <div
        className={`${styles.itemList} ${
          color.isSelected ? styles.itemBlack : styles.itemWhite
        }`}
      >
        <input
          type="checkbox"
          checked={list.checked}
          onChange={handleChangeState}
        />
        <p
          className={`${list.checked ? styles.active : ''}`}
          onClick={checkItemList}
        >
          {list.content}
        </p>
        <button onClick={removeItem}>
          <X size={20} />
        </button>
      </div>
    </>
  );
}

export const ItemList = React.memo(ItemListMemo);
