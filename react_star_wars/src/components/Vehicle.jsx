import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BASE_URL } from "../../globals";
import axios from "axios";

export default function Vehicle () {
    const [vehicle, setVehicle] = useState()
    const [films, setFilms] = useState()
    const [pilots, setPilots] = useState()

    let {name} = useParams()

    useEffect(() => {
        const getVehicle = async() => {
            const response = await axios.get(`${BASE_URL}vehicles/?search=${name}`)
            setVehicle(response.data.results[0])
        }
        getVehicle()
    }, [])

    useEffect(() => {
        const getFilms = async() => {
            if (vehicle) {
                const requests = []
            for (let i=0; i<vehicle.films.length; i++) {
                requests.push(axios.get(vehicle.films[i]))
            }
            const responses = await Promise.all(requests)
            const allFilms = responses.map((response) => response.data);
          setFilms(allFilms)
            }
        }
        getFilms()
    }, [vehicle])

    useEffect(() => {
        const getPilots = async() => {
            if (vehicle) {
                const requests = []
            for (let i=0; i<vehicle.pilots.length; i++) {
                requests.push(axios.get(vehicle.pilots[i]))
            }
            const responses = await Promise.all(requests)
            const allPilots = responses.map((response) => response.data)
            setPilots(allPilots)
            }
        }
        getPilots()
    }, [vehicle])

    if (!vehicle || !films || !pilots) {
        return <h1>Retrieving from a galaxy far far away</h1>
    } else {
        return (
            <div>
                <Link to='/vehicles'>Return to list of vehicles</Link>
                <h1>{vehicle.name}</h1>

                <details>
                    <summary>Manufacturing</summary>
                    <dl>
                        <dt>Model</dt>
                        <dd>{vehicle.model}</dd>
                        <dt>Vehicle class</dt>
                        <dd>{vehicle.vehicle_class}</dd>
                        <dt>Manufacturer</dt>
                        <dd>{vehicle.manufacturer === 'unknown' ? 'Data unavailable' : vehicle.manufacturer}</dd>
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
                        <dd>{vehicle.length === 'unknown' ? 'Data unavailable' : vehicle.length}</dd>
                        <dt>Max atmosphering speed</dt>
                        <dd>{vehicle.max_atmosphering_speed === 'unknown' ? 'Data unavailable' : vehicle.max_atmosphering_speed}</dd>
                    </dl>
                </details>

                <details>
                    <summary>Customer information</summary>
                    <dl>
                        <dt>Cost</dt>
                        <dd>{vehicle.cost === 'unknown' ? 'Data unavailable' : `${vehicle.cost} credits`}</dd>
                        <dt>Crew</dt>
                        <dd>{vehicle.crew === 'unknown' ? 'Data unavailable' : vehicle.crew}</dd>
                        <dt>Passengers</dt>
                        <dd>{vehicle.passengers === 'unknown' ? 'Data unavailable' : vehicle.passengers}</dd>
                        <dt>Cargo capacity</dt>
                        <dd>{vehicle.cargo_capacity === 'unknown' ? 'Data unavailable' : vehicle.cargo_capacity}</dd>
                        <dt>Consumables</dt>
                        <dd>{vehicle.consumables === 'unknown' ? 'Data unavailable' : vehicle.consumables}</dd>
                    </dl>
                </details>
            </div>
        )
    }
}