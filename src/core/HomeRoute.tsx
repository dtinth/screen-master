import React from 'react'
import { AuthenticationRequired } from './AuthenticationRequired'
import { firebase } from './firebase'
import { Link } from 'react-router-dom'

export class HomeRoute extends React.Component {
  render() {
    return (
      <div>
        <h1>screen-master</h1>
        <p>
          <strong>screen-master</strong> is a hackable live presentation
          software. Learn more on the{' '}
          <a target="_blank" href="https://github.com/dtinth/screen-master">
            project’s website
          </a>
          .
        </p>
        <AuthenticationRequired>{() => <Home />}</AuthenticationRequired>
      </div>
    )
  }
}

class Home extends React.Component {
  render() {
    const currentUser = firebase.auth().currentUser!
    return (
      <div>
        <p>
          Hello, {currentUser.displayName}! You can now enter the{' '}
          <Link to={'/screens/' + currentUser.uid + '/main?controller'}>
            screen controller
          </Link>
          .
        </p>
        <p>
          <button onClick={() => firebase.auth().signOut()}>Sign out</button>
        </p>
      </div>
    )
  }
}
