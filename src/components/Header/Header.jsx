import React from 'react';
import styles from './Header.module.css';

function Header() {
    return (
        <header>
                    <nav>


                        <div className={styles.label}>KITTLERSKINTECH</div>


                        <ul>
                            <li><a href="">Главная</a></li>
                            <li><a href="">Информация</a></li>
                            <li><a href="">Классификатор</a></li>
                            <li><a href="">Контакты</a></li>
                        </ul>
                    </nav>
        </header>
    );
}

export default Header;
