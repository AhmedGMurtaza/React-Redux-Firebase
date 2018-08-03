import React from 'react';
import {Link} from 'react-router-dom';
import { Button } from 'reactstrap';

const Nav = (props) => {
    return (
        <div className="container">
            <ul className="navbar">
                <li key="home"><Link to="/"><Button color="danger">Home</Button></Link></li>
                {props.links.map(linkText => 
                    <li key={linkText}>
                        <Link to={`/${linkText}`}><Button color="danger">{linkText}</Button></Link>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default Nav;