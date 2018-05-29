import React from 'react';
import {Link} from 'react-router-dom';


const Nav = (props) => {
    return (
        <ul className="navbar">
            <li key="home"><Link to="/" className="button button-lg button-primary">Home</Link></li>
            {props.links.map(linkText => 
                <li key={linkText}><Link to={`/${linkText}`} className="button button-primary button-lg">{linkText}</Link></li>
            )}
        </ul>
    );
};

export default Nav;