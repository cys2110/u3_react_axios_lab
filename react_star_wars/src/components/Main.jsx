import {Route, Routes} from 'react-router-dom'
import Home from './Home'
import StarshipList from './StarshipList'
import FilmList from './Films'
import SpeciesList from './Species'
import PlanetList from './Planets'
import VehicleList from './Vehicles'
import PeopleList from './People'
import Starship from './Starship'
import Film from './Film'
import Planet from './Planet'
import Species from './SpeciesDetails'
import Vehicle from './Vehicle'
import Person from './Person'

export default function Main (props) {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path='/films' element={<FilmList apiCall={props.apiCall} />} />
                <Route path='/films/:title' element={<Film />} />
                <Route path='/planets' element={<PlanetList apiCall={props.apiCall} />} />
                <Route path='/planets/:name' element={<Planet />} />
                <Route path='/species' element={<SpeciesList apiCall={props.apiCall} />} />
                <Route path='/species/:name' element={<Species />} />
                <Route path='/people' element={<PeopleList apiCall={props.apiCall} />} />
                <Route path='/people/:name' element={<Person />} />
                <Route path="/starships/" element={<StarshipList apiCall={props.apiCall} />} />
                <Route path='/starships/:name' element={<Starship />} />
                <Route path="/vehicles" element={<VehicleList apiCall={props.apiCall} />} />
                <Route path="/vehicles/:name" element={<Vehicle />} />
            </Routes>
        </div>
    )
}