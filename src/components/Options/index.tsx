import * as React from 'react';
import { ListContextValues } from '../../context/ListContext';
import styles from './Options.module.css';

interface OptionListProps {
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}

export function OptionList({ filter, setFilter }: OptionListProps) {
  const { lists, handleRemoveItemListIsCompleted, color } = ListContextValues();
  return (
    <div
      className={`${styles.optionsList} ${
        color.isSelected ? styles.optionsBlack : styles.optionsWhite
      }`}
    >
      <span>{lists.length} items left</span>
      <div className={styles.optionsInput}>
        <div>
          <input type="radio" id="all-items" name="state-items" hidden />
          <label htmlFor="all-items" onClick={() => setFilter('All')}>
            All
          </label>
        </div>
        <div>
          <input type="radio" id="active-items" name="state-items" hidden />
          <label htmlFor="active-items" onClick={() => setFilter('Active')}>
            Active
          </label>
        </div>
        <div>
          <input type="radio" id="completed-items" name="state-items" hidden />
          <label
            htmlFor="completed-items"
            onClick={() => setFilter('Completed')}
          >
            Completed
          </label>
        </div>
      </div>
      <button onClick={handleRemoveItemListIsCompleted}>Clear completed</button>
    </div>
  );
}

export const OptionsList = React.memo(OptionList);
