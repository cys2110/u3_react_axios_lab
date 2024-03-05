import { useState, useEffect } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

export default function PeopleList (props) {

    const [people, setPeople] = useState([])

    useEffect(() => {
        const getPeople = async () => {

            const requests = []
            let allPeople = []

            for (let i=1; i<10; i++) {
                requests.push(axios.get(`${props.apiCall}people/?page=${i}`))
            }

            const responses = await Promise.all(requests)
            responses.forEach(response => {
                allPeople = allPeople.concat(response.data.results)
            })

            const sortedPeople = allPeople.toSorted((a, b) =>
                a.name.localeCompare(b.name))
            setPeople(sortedPeople)
        }
        getPeople()
    }, [])

    let navigate = useNavigate()

    const showPerson = (name) => {
        navigate(`${name}`)
    }

    if (people.length === 0) {
        return <h1>Retrieving from a galaxy far far away</h1>
    } else {
        return (
            <div className="container">
                <h1>People</h1>
                <div className="list">
                    {people.map(person =>
                        <p className="link" key={person.name} onClick={()=>showPerson(person.name)}>{person.name}</p>
                    )}
                </div>
            </div>
        )
    }
}