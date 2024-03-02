import {Link} from 'react-router-dom'

export default function Nav() {
    return (
        <div>
            <ul id="nav">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/films">Films</Link></li>
                <li><Link to="/planets">Planets</Link></li>
                <li><Link to="/species">Species</Link></li>
                <li><Link to="/people">People</Link></li>
                <li><Link to="/starships">Starships</Link></li>
                <Link to="/vehicles">Vehicles</Link>
            </ul>
        </div>
    )
}