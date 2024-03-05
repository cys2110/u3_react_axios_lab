import {Link} from 'react-router-dom'

export default function Nav() {
    return (
        <div id='nav'>
            <Link className='nav' to="/">Home</Link>
            <Link className='nav' to="/films">Films</Link>
            <Link className='nav' to="/planets">Planets</Link>
            <Link className='nav' to="/species">Species</Link>
            <Link className='nav' to="/people">People</Link>
            <Link className='nav' to="/starships">Starships</Link>
            <Link className='nav' to="/vehicles">Vehicles</Link>
        </div>
    )
}