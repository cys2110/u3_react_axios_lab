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
            <div>
                <h1>Films</h1>
                <ul>
                    {films.map((film) => (
                        <li key={film.title} onClick={() => showFilm(film.title)}>{film.title}</li>
                    ))}
                </ul>
            </div>
        )
    }
}