import { useState, useEffect } from "react"
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

export default function StarshipList (props) {

    const [starships, setStarships] = useState([])

    useEffect(() => {
        const getStarships = async () => {

            const requests = []
            let allStarships = []

            for (let i=1; i<5; i++) {
                requests.push(axios.get(`${props.apiCall}starships/?page=${i}`))
            }

            const responses = await Promise.all(requests)
            responses.forEach(response => {
                allStarships = allStarships.concat(response.data.results)
            })

            const sortedStarships = allStarships.toSorted((a, b) =>
                a.name.localeCompare(b.name))
            setStarships(sortedStarships)
        }
        getStarships()
    }, [])

    let navigate = useNavigate()

    const showShip = (name) => {
        navigate(`${name}`)
    }

    if (starships.length === 0) {
        return <h1>Retrieving from a galaxy far far away</h1>
    } else {
        return (
                <div>
                    <h1>Starships</h1>
                    <ul>
                        {starships.map((starship) => (
                            <li key={starship.name} onClick={()=>showShip(starship.name)}>{starship.name}</li>
                        ))}
                    </ul>
                </div>
        )
    }
}