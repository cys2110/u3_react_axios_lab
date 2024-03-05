import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import {BASE_URL} from '../../globals'
import axios from 'axios'

export default function Film () {
    const [film, setFilm] = useState()
    const [characters, setCharacters] = useState()
    const [planets, setPlanets] = useState()
    const [starships, setStarships] = useState()
    const [species, setSpecies] = useState()
    const [vehicles, setVehicles] = useState()

    let {title} = useParams()

    useEffect(() => {
        const getFilm = async() => {
            const response = await axios.get(`${BASE_URL}films/?search=${title}`)
            setFilm(response.data.results[0])
        }
        getFilm()
    }, [])

    useEffect(() => {
        const getCharacters = async() => {
            if (film) {
                const requests = []
            for (let i=0; i<film.characters.length; i++) {
                requests.push(axios.get(film.characters[i]))
            }
            const responses = await Promise.all(requests)
            const allCharacters = responses.map((response) => response.data);
            setCharacters(allCharacters)
            }
        }
        getCharacters()
    }, [film])

    useEffect(() => {
        const getPlanets = async() => {
            if (film) {
                const requests = []
            for (let i=0; i<film.planets.length; i++) {
                requests.push(axios.get(film.planets[i]))
            }
            const responses = await Promise.all(requests)
            const allPlanets = responses.map((response) => response.data);
          setPlanets(allPlanets)
            }
        }
        getPlanets()
    }, [film])

    useEffect(() => {
        const getStarships = async() => {
            if (film) {
                const requests = []
                for (let i=0; i<film.starships.length; i++) {
                    requests.push(axios.get(film.starships[i]))
                }
                const responses = await Promise.all(requests)
                const allStarships = responses.map((response) => response.data);
                setStarships(allStarships)
            }
        }
        getStarships()
    }, [film])

    useEffect(() => {
        const getVehicles = async() => {
            if (film) {
                const requests = []
            for (let i=0; i<film.vehicles.length; i++) {
                requests.push(axios.get(film.vehicles[i]))
            }
            const responses = await Promise.all(requests)
            const allVehicles = responses.map((response) => response.data);
          setVehicles(allVehicles)
            }
        }
        getVehicles()
    }, [film])

    useEffect(() => {
        const getSpecies = async() => {
            if (film) {
                const requests = []
            for (let i=0; i<film.species.length; i++) {
                requests.push(axios.get(film.species[i]))
            }
            const responses = await Promise.all(requests)
            const allSpecies = responses.map((response) => response.data);
          setSpecies(allSpecies)
            }
        }
        getSpecies()
    }, [film])

    if (!film || !characters || !planets || !species || !starships || !vehicles) {
        return <h1>Retrieving from a galaxy far far away</h1>
    } else {
        return (
            <div>
                <Link to='/films'>Return to list of films</Link>
                <h1>{film.title}</h1>
                <h3>Episode {film.episode_id}</h3>

                <img className="poster" src={
                    film.episode_id === 1 ? 'https://upload.wikimedia.org/wikipedia/en/4/40/Star_Wars_Phantom_Menace_poster.jpg' :
                    film.episode_id === 2 ?  'https://upload.wikimedia.org/wikipedia/en/3/32/Star_Wars_-_Episode_II_Attack_of_the_Clones_%28movie_poster%29.jpg' :
                    film.episode_id === 3 ? 'https://upload.wikimedia.org/wikipedia/en/9/93/Star_Wars_Episode_III_Revenge_of_the_Sith_poster.jpg' :
                    film.episode_id === 4 ? 'https://upload.wikimedia.org/wikipedia/en/8/87/StarWarsMoviePoster1977.jpg' :
                    film.episode_id === 5 ? 'https://upload.wikimedia.org/wikipedia/en/3/3f/The_Empire_Strikes_Back_%281980_film%29.jpg' :
                    film.episode_id === 6 ? 'https://upload.wikimedia.org/wikipedia/en/b/b2/ReturnOfTheJediPoster1983.jpg' :
                    null
                } />

                <p>{film.opening_crawl}</p>

                <dl>
                    <dt>Director</dt>
                    <dd>{film.director}</dd>

                    <dt>Producer(s)</dt>
                    <dd>{film.producer}</dd>

                    <dt>Release date</dt>
                    <dd>{film.release_date}</dd>

                    <dt>Characters</dt>
                    {characters.map((character) => (
                            <dd key={character.name}><Link to={`/people/${character.name}`}>{character.name}</Link></dd>
                        ))}

                    <dt>Planets</dt>
                    {planets.map((planet) => (
                            <dd key={planet.name}><Link to={`/planets/${planet.name}`}>{planet.name}</Link></dd>
                        ))}

                    <dt>Starships</dt>
                    {starships.map((starship) => (
                            <dd key={starship.name}><Link to={`/starships/${starship.name}`}>{starship.name}</Link></dd>
                        ))}

                    <dt>Vehicles</dt>
                    {vehicles.map((vehicle) => (
                            <dd key={vehicle.name}><Link to={`/vehicles/${vehicle.name}`}>{vehicle.name}</Link></dd>
                        ))}

                    <dt>Species</dt>
                    {species.map((species) => (
                            <dd key={species.name}><Link to={`/species/${species.name}`}>{species.name}</Link></dd>
                        ))}
                </dl>
            </div>
        )
    }
}