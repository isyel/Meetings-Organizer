import React from 'react';
import firebase from './Firebase';
import { GoTrashcan, GoStar, GoMail } from 'react-icons/go';


function AttendeesList(props) {
    const admin = props.adminUser === props.userID ? true : false

    const attendees = props.attendees

    function deleteAttendee(e, whichMeeting, whichAttendee) {
        e.preventDefault()
        const adminUser = props.adminUser
        const ref = firebase.database().ref(`meetings/${adminUser}/${whichMeeting}/attendees/${whichAttendee}`)
        ref.remove()
    }

    function toggleStar(e, star, whichMeeting, whichAttendee) {
        e.preventDefault()
        const adminUser = props.adminUser
        const ref = firebase.database().ref(`meetings/${adminUser}/${whichMeeting}/attendees/${whichAttendee}/stars`)
        if (star === undefined) {
            ref.set(true)
        } else {
            ref.set(!star)
        }
    }

    const myAttendees = attendees.map( item => {
        //console.log("Item: ",item);
        return(
            <div className="col-8 col-sm-6 col-md-4 col-lg-3 mb-2 p-0 px-1" key={item.attendeeID}>
                <div className="card ">
                    <div className={
                        'card-body px-3 d-flex align-items-center' +
                        (admin ? '' : ' justify-content-center')
                    }>
                        {admin && (
                            <div className="btn-group pr-2" role="group" aria-label="Attendees Options">
                                <button className="btn btn-sm btn-outline-secondary"
                                    title="Delete Attendee"
                                    onClick={e => deleteAttendee(e, props.meetingID, item.attendeeID )} >
                                    <GoTrashcan />
                                </button>
                                <a href={`mailto:${item.attendeeEmail}`}
                                    className="btn btn-sm btn-outline-secondary" title="Mail Attendee">
                                    <GoMail />
                                </a>
                                <button className={
                                        'btn btn-sm ' +
                                        (item.star ? 'btn-info' : 'btn-outline-secondary')
                                    }
                                    title="Give user a Star"
                                    onClick={e => toggleStar(e, item.star, props.meetingID, item.attendeeID )} >
                                    <GoStar />
                                </button>            
                            </div>
                        )}
                        <div>{item.attendeeName}</div>
                    </div>
                </div>
            </div>
        )
    })    

    return(
        <div className="row justify-content-center">
            {myAttendees}
        </div>
    ) 
}

export default AttendeesList;