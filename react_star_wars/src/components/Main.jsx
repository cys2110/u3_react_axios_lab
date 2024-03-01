import {Route, Routes} from 'react-router-dom'
import Home from './Home'
import StarshipList from './StarshipList'

export default function Main (props) {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/starships" element={<StarshipList apiCall={props.apiCall} />} />
            </Routes>
        </div>
    )
}