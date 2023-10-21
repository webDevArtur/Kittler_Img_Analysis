import React from 'react';
import styles from'./Layout.module.css';
import Header from '../Header/Header.jsx';

function Layout({ children }) {
    return (
        <div className={styles.App}>
            <Header />
            {children}
        </div>
    );
}

export default Layout;
