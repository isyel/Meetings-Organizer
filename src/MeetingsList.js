import React from 'react';
import firebase from './Firebase';
import { navigate } from '@reach/router'

import { GoTrashcan, GoListUnordered } from 'react-icons/go';
import { FaLink } from 'react-icons/fa';


function MeetingsList(props) {
    const meetings = props.meetings;

    function deleteMeeting(e, whichMeeting) {
        e.preventDefault()
        const ref = firebase.database().ref(`meetings/${props.userID}/${whichMeeting}`)
        console.log("ref: ", ref);
        ref.remove()
        console.log("Meetings: ", props.meetings);
    }

    const myMeetings = meetings.map(item => {
        return(
            <div className="list-group-item d-flex" key={item.meetingID}>
                <section className="btn-group align-self-center" role="group" aria-label="Meetings Options">
                    <button className="btn btn-sm btn-outline-secondary"
                        title="Delete Meeting"
                        onClick={e => deleteMeeting(e, item.meetingID)} >
                        <GoTrashcan />
                    </button>
                    <button className="btn btn-sm btn-outline-secondary"
                        title="Check In"
                        onClick={ () => navigate(`/checkin/${props.userID}/${item.meetingID}`)} >
                        <FaLink />
                    </button>
                    <button className="btn btn-sm btn-outline-secondary"
                        title="Attendees List"
                        onClick={ () => navigate(`/attendees/${props.userID}/${item.meetingID}`)} >
                        <GoListUnordered />
                    </button>

                </section>
                <section className="pl-3 text-left align-self-center">
                    {item.meetingName}
                </section>
            </div>
        ) 
    })

    return(
        <div>
            {myMeetings}
        </div>
    ) 
}

export default MeetingsList;