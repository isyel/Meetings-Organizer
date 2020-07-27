import React, { useState } from 'react';


function Meetings(props) {
    const [meetingName, setMeetingName] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)

    function handleSubmit(e) {
        e.preventDefault();
        props.addMeeting(meetingName)
        setMeetingName('')
    }

    return(
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-8 text-center">
                <h1 className="font-weight-light">Add a Meeting</h1>
                <div className="card bg-light">
                    <div className="card-body text-center">
                    <form
                        className="formgroup" onSubmit={e => handleSubmit(e) }>
                        <div className="input-group input-group-lg">
                        <input
                            type="text"
                            className="form-control"
                            name="meetingName"
                            placeholder="Meeting name"
                            aria-describedby="buttonAdd"
                            value={meetingName}
                            onChange={e => setMeetingName(e.target.value)}
                        />
                        <div className="input-group-append">
                            <button
                            type="submit"
                            className="btn btn-sm btn-info"
                            id="buttonAdd"
                            >
                            +
                            </button>
                        </div>
                        </div>
                    </form>
                    </div>
                </div>
                </div>
            </div>
        </div>
    ) 
}

export default Meetings;