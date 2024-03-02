import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BASE_URL } from "../../globals";
import axios from "axios";

export default function Person () {
    const [person, setPerson] = useState()
    const [films, setFilms] = useState()
    const [vehicles, setVehicles] = useState()
    const [starships, setStarships] = useState()
    const [species, setSpecies] = useState()
    const [homeworld, setHomeworld] = useState()

    let {name} = useParams()

    useEffect(() => {
        const getPerson = async() => {
            const response = await axios.get(`${BASE_URL}people/?search=${name}`)
            setPerson(response.data.results[0])
        }
        getPerson()
    }, [])

    useEffect(() => {
        const getFilms = async() => {
            if (person) {
                const requests = []
            for (let i=0; i<person.films.length; i++) {
                requests.push(axios.get(person.films[i]))
            }
            const responses = await Promise.all(requests)
            const allFilms = responses.map((response) => response.data);
          setFilms(allFilms)
            }
        }
        getFilms()
    }, [person])

    useEffect(() => {
        const getVehicles = async() => {
            if (person) {
                const requests = []
            for (let i=0; i<person.vehicles.length; i++) {
                requests.push(axios.get(person.vehicles[i]))
            }
            const responses = await Promise.all(requests)
            const allVehicles = responses.map((response) => response.data);
          setVehicles(allVehicles)
            }
        }
        getVehicles()
    }, [person])

    useEffect(() => {
        const getStarships = async() => {
            if (person) {
                const requests = []
            for (let i=0; i<person.starships.length; i++) {
                requests.push(axios.get(person.starships[i]))
            }
            const responses = await Promise.all(requests)
            const allStarships = responses.map((response) => response.data);
          setStarships(allStarships)
            }
        }
        getStarships()
    }, [person])

    useEffect(() => {
        const getSpecies = async() => {
            const response = await axios.get(person.species[0])
            setSpecies(response.data)
        }
        if (person && person.species.length > 0) {
            getSpecies()
        }
    }, [person])

    useEffect(() => {
        const getHomeworld = async() => {
            if (person) {
                const response = await axios.get(person.homeworld)
                setHomeworld(response.data)
            }
        }
        getHomeworld()
    }, [person])



    if (!person || !species || !films || !homeworld || !vehicles || !starships) {
        return <h1>Retrieving from a galaxy far far away</h1>
    } else {
        return (
            <div>
                <Link to='/people'>Return to list of people</Link>
                <h1>{person.name}</h1>

                <details>
                    <summary>About</summary>
                    <dl>
                        <dt>Species</dt>
                        {person.species.length === 0 ? 'Data unavailable' : <dd>{species.name}</dd>
                        }

                        <dt>Birth year</dt>
                        <dd>{person.birth_year === 'unknown' ? 'Data unavailable' : person.birth_year}</dd>

                        <dt>Gender</dt>
                        <dd>{person.gender === 'unknown' ? 'Data unavailable' : person.gender}</dd>

                        <dt>Height</dt>
                        <dd>{person.height === 'unknown' ? 'Data unavailable' : `${person.height} cm`}</dd>

                        <dt>Weight</dt>
                        <dd>{person.mass === 'unknown' ? 'Data unavailable' : `${person.mass} kg`}</dd>

                        <dt>Hair colour</dt>
                        <dd>{person.hair_color === 'unknown' ? 'Data unavailable' : person.hair_color}</dd>

                        <dt>Skin colour</dt>
                        <dd>{person.skin_color === 'unknown' ? 'Data unavailable' : person.skin_color}</dd>
                    </dl>
                </details>

                <details>
                    <summary>History</summary>
                    <dt>Homeworld</dt>
                    <dd><Link to={`/planets/${homeworld.name}`}>{homeworld.name}</Link></dd>

                    <dt>Films</dt>
                    {films.map((film) => (
                            <dd key={film.title}><Link to={`/films/${film.title}`}>{film.title}</Link></dd>
                        ))}

                    <dt>Vehicles</dt>
                    {vehicles.length === 0 ? 'Data unavailable' : vehicles.map(vehicle => (
                            <dd key={vehicle.name}><Link to={`/vehicles/${vehicle.name}`}>{vehicle.name}</Link></dd>
                        ))}

                    <dt>Starships</dt>
                    {starships.length === 0 ? 'Data unavailable' : starships.map(starship => (
                            <dd key={starship.name}><Link to={`/starhips/${starship.name}`}>{starship.name}</Link></dd>
                        ))}
                </details>
            </div>
        )
    }
}