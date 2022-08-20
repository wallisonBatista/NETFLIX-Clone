import React from 'react';
import './Header.css';

export default function components({ black }) {
    return (
        <header className={black ? 'black' : ''}>
            <div className="header--logo">
                <a href="/">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png" alt="logo netflix" />
                </a>
            </div>

            <div className="header--user">
                <a href="/"></a>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQthwzqUXU2f5Ag0iSmCo3aPwQopMP_wqzcEg&usqp=CAU" alt="usuário" />
            </div>
        </header>
    );
}