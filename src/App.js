import React,  { useState, useEffect } from 'react';
import './App.css';
import { Router, navigate } from '@reach/router';
import firebase from './Firebase';

import Home from './Home';
import Welcome from './Welcome';
import Navigation from './Navigation';
import Register from './Register';
import Login from './Login';
import Meetings from './Meetings';
import CheckIn from './CheckIn';
import Attendees from './Attendees';


function App() {
  const [user, setUser] = useState({})
  const [displayName, setDisplayName] = useState(null)
  const [userID, setUserID] = useState(null)
  const [meetings, setMeetings] = useState([])
  const [numberOfMeetings, setNumberOfMeetings] = useState(0)

  useEffect( () => {
    //Using snap shot to get database data
    // const ref = firebase.database().ref('user');
    // ref.on('value', snapshot => {
    //   let FBUser = snapshot.val();
    //   setUser(FBUser)
    // })

    firebase.auth().onAuthStateChanged(FBUser => {
      if(FBUser) {
        setUser(FBUser)
        setDisplayName(FBUser.displayName)
        setUserID(FBUser.uid)

        const meetingRef = firebase.database().ref('meetings/' + user.uid)
        meetingRef.on('value', snapshot => {
            let meetings = snapshot.val();
            let meetingsList = [];

            for(let item in meetings) {
              meetingsList.push({
                meetingID: item,
                meetingName: meetings[item].meetingName
              })
              setMeetings(meetingsList)
              setNumberOfMeetings(meetingsList.length)
            }
          } )
      } else {
        setUser(null)
      }
    })
  }, [user])

  function registerUser(userName) {
    firebase.auth().onAuthStateChanged(FBUser => {
      FBUser.updateProfile({
        displayName: userName
      }).then(() => {
        setUser(FBUser)
        setDisplayName(FBUser.displayName)
        setUserID(FBUser.uid)
      });
      navigate('/meetings')
    })
  }

  function addMeeting(meetingName) {
    const ref = firebase.database().ref(`meetings/${user.uid}`)
    ref.push({meetingName: meetingName})
  }

  function logoutUser(e) {
    e.preventDefault();
    setUser(null)
    setDisplayName(null)
    setUserID(null)

    firebase.auth().signOut().then( ()=> {
      navigate('/login')
    })
  }

  return (
    <>
      <Navigation user={user} logoutUser={logoutUser} />
      { user && (
        <Welcome userName={displayName} logoutUser={logoutUser}/>
      )}
      <Router>
        <Login path="/login" />
        <Register path="/register" registerUser={registerUser} />
        <Meetings path="/meetings" addMeeting={addMeeting} meetings={meetings} userID={userID}/>
        <Attendees path="/attendees/:userID/:meetingID" adminUser={userID} />
        <CheckIn path="/checkin/:userID/:meetingID" />
        <Home path="/" user={user}/>
      </Router>
    </>
  );
}

export default App;
