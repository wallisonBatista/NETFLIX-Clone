import React, { useEffect, useState } from 'react';
import Tmdb from './Tmdb';
import './App.css';
import MovieRow from './components/MovieRow';
import FeatureMovie from './components/FeatureMovie';
import Header from './components/Header';


export default () => {

    const [movieList, setMovieList] = useState([]);
    const [featuredData, setFeaturedData] = useState(null); //mostrar o destaque apenas quando tiver filme carregado
    const [blackHeader, setBlackHeader] = useState(false);

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

    useEffect(() => {
        const scrollListener = () => {
            if (window.scrollY > 10) {
                setBlackHeader(true);
            } else {
                setBlackHeader(false);
            }
        }

        window.addEventListener('scroll', scrollListener);

        return () => {
            window.removeEventListener('sroll', scrollListener);
        }
    }, []);

    return (
        <div className="page">

            <Header black={blackHeader} />

            {featuredData &&
                <FeatureMovie item={featuredData} />
            }

            <section className="lists">
                {movieList.map((item, key) => (
                    <MovieRow key={key} title={item.title} items={item.items} />
                ))}
            </section>

            <footer>
                Feito com <span role="img" aria-label="coração">❤️</span>
                Direitos de imagem para Netflix
                Dados pegos do site ThemovieDB.com
            </footer>

            {/* <div className="loading">
                <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt="carregando" />
            </div> */}
        </div>
    )
}