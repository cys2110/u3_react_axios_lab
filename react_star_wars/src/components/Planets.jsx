import { useState, useEffect } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

export default function PlanetList (props) {

    const [planets, setPlanets] = useState([])

    useEffect(() => {
        const getPlanets = async () => {

            const requests = []
            let allPlanets = []

            for(let i=1; i<7; i++) {
                requests.push(axios.get(`${props.apiCall}planets/?page=${i}`))
            }

            const responses = await Promise.all(requests)
            responses.forEach(response => {
                allPlanets = allPlanets.concat(response.data.results)
            })

            const sortedPlanets = allPlanets.toSorted((a, b) =>
                a.name.localeCompare(b.name))
            setPlanets(sortedPlanets)
        }
        getPlanets()
    }, [])

    let navigate = useNavigate()

    const showPlanet = (name) => {
        navigate(`${name}`)
    }

    if (planets.length === 0) {
        return <h1>Retrieving from a galaxy far far away</h1>
    } else {
        return (
            <div>
                <h1>Planets</h1>
                <ul>
                    {planets.map((planet) => (
                        <li key={planet.name} onClick={() => showPlanet(planet.name)}>{planet.name}</li>
                    ))}
                </ul>
            </div>
        )
    }
}