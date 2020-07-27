import React from 'react';
import { Link } from '@reach/router'


function Welcome(props) {
    const user = props.userName;

    return(
        <div className="text-center mt-5">
            <span className="text-secondary font-weight-bold pl-1">
                Welcome {user}
            </span>, 
            <Link to="/" className="text-primary font-weight-bold pl-1"
            onClick={e => props.logoutUser(e)}>
                log out
            </Link> 
        </div>
    ) 
}

export default Welcome;