import {Link} from 'react-router-dom'

export default function Nav() {
    return (
        <div>
            <Link to="/">Home</Link>
            <Link to="/starships">Starships</Link>
            {/* <Link to="/people">People</Link>
            <Link to="/films">Films</Link>
            <Link to="/vehicles">Vehicles</Link>
            <Link to="/planets">Planets</Link>
            <Link to="/species">Species</Link> */}
        </div>
    )
}