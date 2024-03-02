import { useState, useEffect } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

export default function VehicleList (props) {

    const [vehicles, setVehicles] = useState([])

    useEffect(() => {
        const getVehicles = async () => {
            const requests = []
            let allVehicles = []

            for(let i=1; i<5; i++) {
                requests.push(axios.get(`${props.apiCall}vehicles/?page=${i}`))
            }

            const responses = await Promise.all(requests)
            console.log(responses)
            responses.forEach(response => {
                allVehicles = allVehicles.concat(response.data.results)
            })

            const sortedVehicles = allVehicles.toSorted((a, b) =>
                a.name.localeCompare(b.name))
            setVehicles(sortedVehicles)
        }
        getVehicles()
    }, [])

    let navigate = useNavigate()

    const showVehicle = (name) => {
        navigate(`${name}`)
    }

    if (vehicles.length === 0) {
        return <h1>Retrieving from a galaxy far far away</h1>
    } else {
        return (
            <div>
                <h1>Vehicles</h1>
                <ul>
                    {vehicles.map((vehicle) => (
                        <li key={vehicle.name} onClick={()=>showVehicle(vehicle.name)}>{vehicle.name}</li>
                    ))}
                </ul>
            </div>
        )
    }
}