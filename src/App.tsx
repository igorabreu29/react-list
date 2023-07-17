import { Moon, Sun } from 'phosphor-react';
import * as React from 'react';
import styles from './App.module.css';
import { List } from './components/List';
import { ListContextValues } from './context/ListContext';

export default function App() {
  const { color, setColor } = ListContextValues();

  function toggleTheme() {
    setColor(
      color.theme === 'dark'
        ? {
            theme: 'light',
            isSelected: false,
          }
        : {
            theme: 'dark',
            isSelected: true,
          }
    );
  }

  return (
    <div
      className={`${styles.container} ${
        color.isSelected ? styles.black : styles.white
      }`}
    >
      <div className={styles.content}>
        <div className={styles.contentTitle}>
          <h1>TODO</h1>
          <span onClick={toggleTheme}>
            {color.isSelected && <Sun size={24} />}
            {!color.isSelected && <Moon size={24} />}
          </span>
        </div>
        <List />
      </div>
    </div>
  );
}
