import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'

export default function FilmList (props) {

    const [films, setFilms] = useState([])

    useEffect(() => {
        const getFilms = async () => {
            const response = await axios.get(`${props.apiCall}films/`)

            const sortedFilms = response.data.results.toSorted((a, b) =>
                a.episode_id - b.episode_id)
            setFilms(sortedFilms)
        }
        getFilms()
    }, [])

    let navigate = useNavigate()

    const showFilm = (title) => {
        navigate(`${title}`)
    }

    if (films.length === 0) {
        return <h1>Retrieving from a galaxy far far away</h1>
    } else {
        return (
            <div className="container">
                <h1>Films</h1>

                <div className="cards">
                    {films.map((film) => (
                        <figure key={film.title}>
                            <img className="poster" src={
                                film.episode_id === 1 ? 'https://upload.wikimedia.org/wikipedia/en/4/40/Star_Wars_Phantom_Menace_poster.jpg' :
                                film.episode_id === 2 ?  'https://upload.wikimedia.org/wikipedia/en/3/32/Star_Wars_-_Episode_II_Attack_of_the_Clones_%28movie_poster%29.jpg' :
                                film.episode_id === 3 ? 'https://upload.wikimedia.org/wikipedia/en/9/93/Star_Wars_Episode_III_Revenge_of_the_Sith_poster.jpg' :
                                film.episode_id === 4 ? 'https://upload.wikimedia.org/wikipedia/en/8/87/StarWarsMoviePoster1977.jpg' :
                                film.episode_id === 5 ? 'https://upload.wikimedia.org/wikipedia/en/3/3f/The_Empire_Strikes_Back_%281980_film%29.jpg' :
                                film.episode_id === 6 ? 'https://upload.wikimedia.org/wikipedia/en/b/b2/ReturnOfTheJediPoster1983.jpg' :
                                null
                            } onClick={() => showFilm(film.title)}/>
                            <figcaption>{film.title}</figcaption>
                        </figure>
                        
                    ))}
                </div>

            </div>
        )
    }
}