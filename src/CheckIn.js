import React, { useState }  from 'react';
import firebase from './Firebase'
import { navigate } from '@reach/router'


function CheckIn(props) {
    const [displayName, setDisplayName] = useState('')
    const [email, setEmail] = useState('')


    function handleSubmit(e) {
        e.preventDefault();
        
        const ref =  firebase.database().ref(`meetings/${props.userID}/${props.meetingID}/attendees`)
        ref.push({
            attendeeName: displayName,
            attendeeEmail: email,
            star: false
        })
        navigate(`/attendees/${props.userID}/${props.meetingID}`)
    }

    return(
        <form className="mt-3" onSubmit={e => handleSubmit(e)} >
            <div className="container">
                <div className="row justify-content-center">
                <div className="col-lg-6">
                    <div className="card bg-light">
                    <div className="card-body">
                        <h3 className="font-weight-light mb-3">Check in</h3>
                        <section className="form-group">
                        <label
                            className="form-control-label sr-only"
                            htmlFor="displayName"
                        >
                            Name
                        </label>
                        <input
                            required
                            className="form-control"
                            type="text"
                            id="displayName"
                            name="displayName"
                            placeholder="Name"
                            value={displayName}
                            onChange={e => setDisplayName(e.target.value)}
                        />
                        </section>
                        <section className="form-group">
                        <label
                            className="form-control-label sr-only"
                            htmlFor="Email"
                        >
                            Email
                        </label>
                        <input
                            required
                            className="form-control"
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        </section>
                        <div className="form-group text-right mb-0">
                        <button className="btn btn-primary" type="submit">
                            Check in
                        </button>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </form>
    ) 
}

export default CheckIn;