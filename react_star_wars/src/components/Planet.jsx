import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BASE_URL } from "../../globals";

export default function Planet() {
    const [planet, setPlanet] = useState()
    const [films, setFilms] = useState()
    const [residents, setResidents] = useState()

    let {name} = useParams()

    useEffect(() => {
        const getPlanet = async() => {
            const response = await axios.get(`${BASE_URL}planets/?search=${name}`)
            setPlanet(response.data.results[0])
        }
        getPlanet()
    }, [])

    useEffect(() => {
        const getFilms = async() => {
            if (planet) {
                const requests = []
            for (let i=0; i<planet.films.length; i++) {
                requests.push(axios.get(planet.films[i]))
            }
            const responses = await Promise.all(requests)
            const allFilms = responses.map((response) => response.data);
          setFilms(allFilms)
            }
        }
        getFilms()
    }, [planet])

    useEffect(() => {
        const getResidents = async() => {
            if (planet) {
                const requests = []
            for (let i=0; i<planet.residents.length; i++) {
                requests.push(axios.get(planet.residents[i]))
            }
            const responses = await Promise.all(requests)
            const allResidents = responses.map((response) => response.data)
            setResidents(allResidents)
            }
        }
        getResidents()
    }, [planet])

    if (!planet || !films || !residents) {
        return <h1>Retrieving from a galaxy far far away</h1>
    } else {
        return (
            <div>
                <Link to='/planets'>Return to list of planets</Link>
                <h1>{planet.name}</h1>

                <details>
                    <summary>Profile</summary>
                    <dl>
                        <dt>Population</dt>
                        <dd>{planet.population === 'unknown' ? 'Data unknown' : planet.population}</dd>

                        <dt>Residents</dt>
                        {residents.length === 0 ? 'Data unavailable' : residents.map(resident => (
                            <dd key={resident.name}><Link to={`/people/${resident.name}`}>{resident.name}</Link></dd>
                        ))}

                        <dt>Films</dt>
                        {films.map((film) => (
                            <dd key={film.title}><Link to={`/films/${film.title}`}>{film.title}</Link></dd>
                        ))}
                    </dl>
                </details>

                <details>
                    <summary>Geology</summary>
                    <dl>
                        <dt>Rotation period</dt>
                        <dd>{planet.rotation_period === 'unknown' ? 'Data unknown' : planet.rotation_period}</dd>

                        <dt>Orbital period</dt>
                        <dd>{planet.orbital_period === 'unknown' ? 'Data unknown' : planet.orbita_period}</dd>

                        <dt>Diameter</dt>
                        <dd>{planet.diameter === 'unknown' ? 'Data unknown' : planet.diameter}</dd>

                        <dt>Climate</dt>
                        <dd>{planet.climate === 'unknown' ? 'Data unknown' : planet.climate}</dd>

                        <dt>Gravity</dt>
                        <dd>{planet.gravity === 'unknown' ? 'Data unknown' : planet.gravity}</dd>

                        <dt>Terrain</dt>
                        <dd>{planet.terrain === 'unknown' ? 'Data unknown' : planet.terrain}</dd>

                        <dt>Surface water</dt>
                        <dd>{planet.surface_water === 'unknown' ? 'Data unknown' : planet.surface_water}</dd>
                    </dl>
                </details>
            </div>
        )
    }
}