import { useState, useEffect } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

export default function SpeciesList (props) {

    const [species, setSpecies] = useState([])

    useEffect(() => {
        const getSpecies = async () => {
            const requests = []
            let allSpecies = []

            for (let i=1; i<5; i++) {
                requests.push(axios.get(`${props.apiCall}species/?page=${i}`))
            }

            const responses = await Promise.all(requests)
            responses.forEach(response => {
                allSpecies = allSpecies.concat(response.data.results)
            })

            const sortedSpecies = allSpecies.toSorted((a, b) =>
                a.name.localeCompare(b.name))
            setSpecies(sortedSpecies)
        }
        getSpecies()
    }, [])

    let navigate = useNavigate()

    const showSpecies = (name) => {
        navigate(`${name}`)
    }

    if (species.length === 0) {
        return <h1>Retrieving from a galaxy far far away</h1>
    } else {
        return (
            <div>
                <h1>Species</h1>
                <ul>
                    {species.map((species) => (
                        <li key={species.name} onClick={()=>showSpecies(species.name)}>{species.name}</li>
                    ))}
                </ul>
            </div>
        )
    }
}