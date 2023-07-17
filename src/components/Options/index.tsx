import * as React from 'react';
import { ListContextValues } from '../../context/ListContext';
import styles from './Options.module.css';

export function OptionList() {
  const {
    lists,
    handleGetAllItemsList,
    handleGetActiveItems,
    handleGetCompletedItems,
    handleRemoveItemListIsCompleted,
    filteredList,
    color,
  } = ListContextValues();
  return (
    <div
      className={`${styles.optionsList} ${
        color.isSelected ? styles.optionsBlack : styles.optionsWhite
      }`}
    >
      <span>
        {filteredList.length === 0 ? lists.length : filteredList.length} items
        left
      </span>
      <div className={styles.optionsInput}>
        <div>
          <input type="radio" id="all-items" name="state-items" hidden />
          <label htmlFor="all-items" onClick={handleGetAllItemsList}>
            All
          </label>
        </div>
        <div>
          <input type="radio" id="active-items" name="state-items" hidden />
          <label htmlFor="active-items" onClick={handleGetActiveItems}>
            Active
          </label>
        </div>
        <div>
          <input type="radio" id="completed-items" name="state-items" hidden />
          <label htmlFor="completed-items" onClick={handleGetCompletedItems}>
            Completed
          </label>
        </div>
      </div>
      <button onClick={handleRemoveItemListIsCompleted}>Clear completed</button>
    </div>
  );
}

export const OptionsList = React.memo(OptionList);
