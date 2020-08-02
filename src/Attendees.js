import React, { useState, useEffect } from 'react';
import firebase from './Firebase';
import AttendeesList from './AttendeesList';
import { FaUndo, FaRandom } from 'react-icons/fa';


function Attendees(props) {
    const [displayAttendees, setDisplayAttendees] = useState([])
    const [allAttendees, setAllAttendees] = useState([])
    const [searchQuery, setSearchQuery] = useState("")

    useEffect( () => {
        const ref = firebase.database().ref(`meetings/${props.userID}/${props.meetingID}/attendees`)
        ref.on('value', snapshot => {
            let attendees = snapshot.val()
            let attendeesList = []
            for(let item in attendees) {
                attendeesList.push({
                    attendeeID: item,
                    attendeeName: attendees[item].attendeeName,
                    attendeeEmail: attendees[item].attendeeEmail,
                    star: attendees[item].stars
                })
            }
            setDisplayAttendees(attendeesList)
            setAllAttendees(attendeesList)
        })
    }, [])

    const dataFilter = item => item.attendeeName.toLowerCase().match(searchQuery.toLowerCase()) && true
    const filteredAttendees = displayAttendees.filter(dataFilter)

    function chooseRandom() {
        const randomAttendee = Math.floor(Math.random() * allAttendees.length)
        resetQuery()
        setDisplayAttendees([allAttendees[randomAttendee]])
    }

    function resetQuery() {
        setSearchQuery('')
        setDisplayAttendees(allAttendees)
    }
    

    return(
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <h1 className="font-weight-light text-center">
                        Attendees
                    </h1>
                    <div className="card bg-light mb-3">
                        <div className="card-body text-center">
                            <div className="input-group input-group-lg">
                                <input type="text" name="searchQuery" value={searchQuery} className="form-control"
                                onChange={e => setSearchQuery(e.target.value)} />
                                <div className="input-group-append">
                                    <button className="btn btn-sm btn-outline-info"
                                        title="Reset Search"
                                        onClick={() => resetQuery()} >

                                        <FaUndo />
                                    </button>
                                    
                                    <button className="btn btn-sm btn-outline-info"
                                        title="Pick Random Attendee"
                                        onClick={() => chooseRandom()} >
                                            
                                        <FaRandom />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AttendeesList userID={props.userID} attendees={filteredAttendees} adminUser={props.adminUser}
                meetingID={props.meetingID}/>
        </div>
    ) 
}

export default Attendees;