import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import {BASE_URL} from '../../globals'
import axios from 'axios'

export default function Starship () {
    const [starship, setStarship] = useState()
    const [films, setFilms] = useState()
    const [pilots, setPilots] = useState()

    let {name} = useParams()

    useEffect(() => {
        const getStarship = async() => {
            const response = await axios.get(`${BASE_URL}starships/?search=${name}`)
            setStarship(response.data.results[0])
        }
        getStarship()
    }, [])

    useEffect(() => {
        const getFilms = async() => {
            if (starship) {
                const requests = []
            for (let i=0; i<starship.films.length; i++) {
                requests.push(axios.get(starship.films[i]))
            }
            const responses = await Promise.all(requests)
            const allFilms = responses.map((response) => response.data);
          setFilms(allFilms)
            }
        }
        getFilms()
    }, [starship])

    useEffect(() => {
        const getPilots = async() => {
            if (starship) {
                const requests = []
            for (let i=0; i<starship.pilots.length; i++) {
                requests.push(axios.get(starship.pilots[i]))
            }
            const responses = await Promise.all(requests)
            const allPilots = responses.map((response) => response.data)
            setPilots(allPilots)
            }
        }
        getPilots()
    }, [starship])

    if (!starship || !films || !pilots) {
        return <h1>Retrieving from a galaxy far far away</h1>
    } else {
        return (
            <div>
                <Link to='/starships'>Return to list of starships</Link>
                <h1>{starship.name}</h1>
    
                <details>
                    <summary>Manufacturing</summary>
                    <dl>
                        <dt>Model</dt>
                        <dd>{starship.model}</dd>
    
                        <dt>Starship class</dt>
                        <dd>{starship.starship_class}</dd>
    
                        <dt>Manufacturer</dt>
                        <dd>{starship.manufacturer}</dd>
                        
                    </dl>
                </details>
    
                <details>
                    <summary>History</summary>
                    <dl>
                        <dt>Pilots</dt>
                        {pilots.length === 0 ? 'Data unavailable' : pilots.map(pilot => (
                            <dd key={pilot.name}><Link to={`/people/${pilot.name}`}>{pilot.name}</Link></dd>
                        ))}
                        
                        <dt>Films</dt>
                        {films.map((film) => (
                            <dd key={film.title}><Link to={`/films/${film.title}`}>{film.title}</Link></dd>
                        ))}
                    </dl>
                </details>
    
                <details>
                    <summary>Specs</summary>
                    <dl>
                        <dt>Length</dt>
                        <dd>{starship.length}</dd>
    
                        <dt>Max Atmosphering Speed</dt>
                        <dd>{starship.max_atmosphering_speed === 'unknown' ? 'Data unavailable' : starship.max_atmosphering_speed}</dd>
    
                        <dt>Hyperdrive Rating</dt>
                        <dd>{starship.hyperdrive_rating === 'unknown' ? 'Data unavailable' : starship.hyperdrive_rating}</dd>
    
                        <dt>MGLT</dt>
                        <dd>{starship.MGLT === 'unknown' ? 'Data unavailable' : starship.MGLT}</dd>
                    </dl>
                </details>
    
                <details>
                    <summary>Consumer information</summary>
                    <dl>
                        <dt>Cost</dt>
                        <dd>{starship.cost_in_credits === 'unknown' ? 'Data unavailable' : `${starship.cost_in_credits} credits`}</dd>
    
                        <dt>Crew</dt>
                        <dd>{starship.crew === 'unknown' ? 'Data unavailable' : starship.crew}</dd>
    
                        <dt>Passengers</dt>
                        <dd>{starship.passengers}</dd>
    
                        <dt>Cargo capacity</dt>
                        <dd>{starship.cargo_capacity === 'unknown' ? 'Data unavailable' : starship.cargo_capacity}</dd>
    
                        <dt>Consumables</dt>
                        <dd>{starship.consumables === 'unknown' ? 'Data unavailable' : starship.consumables}</dd>
                    </dl>
                </details>
            </div>
        )
    }
    
}