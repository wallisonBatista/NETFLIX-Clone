import React, { useEffect, useState } from 'react';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import './App.css';

export default () => {

    const [movieList, setMovieList] = useState([]);

    //Ao carregar a página será exibido
    useEffect(() => {
        const loadAll = async () => {
            //Pegando a lista total
            let list = await Tmdb.getHomeList();
            setMovieList(list);
        }
        //executando a função
        loadAll();
    }, [])

    return (
        <div className="page">
            <section className="lists">
                {movieList.map((item, key) => (
                    <MovieRow key={key} title={item.title} items={item.items} />
                ))}
            </section>
        </div>
    )
}