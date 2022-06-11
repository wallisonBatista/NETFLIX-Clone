import React, { useEffect, useState } from 'react';
import Tmdb from './Tmdb';

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
                    <div>
                        {item.title}
                    </div>
                ))}
            </section>
        </div>
    )
}