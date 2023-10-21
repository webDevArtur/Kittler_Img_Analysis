import React from 'react';
import styles from './Header.module.css';

function Header() {
    return (
        <header>
                    <nav>

                        <a href="/">
                            <img src="/images/icon.png" alt="НИЯУ МИФИ" className={styles.label}/>
                        </a>

                        <ul>
                            <li><a href="/">Главная</a></li>
                            <li><a href="/about">Информация</a></li>
                            <li><a href="/classifier">Классификатор</a></li>
                            <li><a href="/contact">Контакты</a></li>
                        </ul>
                    </nav>
        </header>
    );
}

export default Header;
