import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { BASE_URL } from "../../globals"

export default function Species () {
    const [species, setSpecies] = useState()
    const [people, setPeople] = useState()
    const [films, setFilms] = useState()

    let {name} = useParams()

    useEffect(() => {
        const getSpecies = async() => {
            const response = await axios.get(`${BASE_URL}species/?search=${name}`)
            setSpecies(response.data.results[0])
        }
        getSpecies()
    }, [])

    useEffect(() => {
        const getFilms = async() => {
            if (species) {
                const requests = []
            for (let i=0; i<species.films.length; i++) {
                requests.push(axios.get(species.films[i]))
            }
            const responses = await Promise.all(requests)
            const allFilms = responses.map((response) => response.data);
          setFilms(allFilms)
            }
        }
        getFilms()
    }, [species])

    useEffect(() => {
        const getPeople = async() => {
            if (species) {
                const requests = []
            for (let i=0; i<species.people.length; i++) {
                requests.push(axios.get(species.people[i]))
            }
            const responses = await Promise.all(requests)
            const allPeople = responses.map((response) => response.data)
            setPeople(allPeople)
            }
        }
        getPeople()
    }, [species])

    if (!species || !films || !people) {
        return <h1>Retrieving from a galaxy far far away</h1>
    } else {
        return (
            <div>
                <Link to='/species'>Return to list of species</Link>
                <h1>{species.name}</h1>

                <details>
                    <summary>About</summary>
                    <dl>
                        <dt>Classification</dt>
                        <dd>{species.classification === 'unknown' ? 'Data unavailable' : species.classification}</dd>

                        <dt>Designation</dt>
                        <dd>{species.designation === 'unknown' ? 'Data unavailable' : species.designation}</dd>

                        <dt>Average height</dt>
                        <dd>{species.average_height === 'unknown' ? 'Data unavailable' : species.average_height}</dd>

                        <dt>Skin colours</dt>
                        <dd>{species.skin_colors === 'unknown' ? 'Data unavailable' : species.skin_colors}</dd>

                        <dt>Hair colours</dt>
                        <dd>{species.hair_colors === 'unknown' ? 'Data unavailable' : species.hair_colors}</dd>

                        <dt>Eye colours</dt>
                        <dd>{species.eye_colors === 'unknown' ? 'Data unavailable' : species.eye_colors}</dd>

                        <dt>Average lifespan</dt>
                        <dd>{species.average_lifespan === 'unknown' ? 'Data unavailable' : species.average_lifespan}</dd>
                    </dl>
                </details>

                <details>
                    <summary>History</summary>
                    <dl>
                        <dt>Homeworld</dt>
                        <dd>{species.homeworld === 'unknown' ? 'Data unavailable' : species.homeworld}</dd>

                        <dt>Language</dt>
                        <dd>{species.language === 'unknown' ? 'Data unavailable' : species.language}</dd>

                        <dt>People</dt>
                        {people.length === 0 ? 'Data unavailable' : people.map(person => (
                            <dd key={person.name}><Link to={`/people/${person.name}`}>{person.name}</Link></dd>
                        ))}

                        <dt>Films</dt>
                        {films.map((film) => (
                            <dd key={film.title}><Link to={`/films/${film.title}`}>{film.title}</Link></dd>
                        ))}
                    </dl>
                </details>
            </div>
        )
    }
}