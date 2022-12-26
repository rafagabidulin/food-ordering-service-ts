import React from 'react';
import { Header } from '../Header/Header';
import styles from './styles.module.css';

export const Layout = ({ children }) => (
  <div className={styles.root}>
    <Header />
    <div className={styles.content}>{children}</div>
    <footer>footer</footer>
  </div>
);
