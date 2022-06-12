import React, { useEffect, useState } from 'react';
import Tmdb from './Tmdb';
import './App.css';
import MovieRow from './components/MovieRow';
import FeatureMovie from './components/FeatureMovie';


export default () => {

    const [movieList, setMovieList] = useState([]);
    const [featuredData, setFeaturedData] = useState(null); //mostrar o destaque apenas quando tiver filme carregado

    //Ao carregar a página será exibido
    useEffect(() => {
        const loadAll = async () => {
            //Pegando a lista total
            let list = await Tmdb.getHomeList();
            setMovieList(list);

            //Pegando filme em destaque Featured
            let originals = list.filter(i => i.slug === 'originals');
            let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
            let chosen = originals[0].items.results[randomChosen];
            let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
            setFeaturedData(chosenInfo);
        }
        //executando a função
        loadAll();
    }, [])

    return (
        <div className="page">

            {featuredData &&
                <FeatureMovie item={featuredData} />
            }

            <section className="lists">
                {movieList.map((item, key) => (
                    <MovieRow key={key} title={item.title} items={item.items} />
                ))}
            </section>
        </div>
    )
}