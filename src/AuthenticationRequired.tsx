import React, { ReactNode } from 'react'
import * as fiery from 'fiery'
import { firebase } from './firebase'
import { ErrorBox } from './ErrorBox'

export class AuthenticationRequired extends React.Component<{
  children: (user: firebase.User) => ReactNode
}> {
  render() {
    return (
      <fiery.Auth>
        {authState =>
          fiery.unwrap(authState, {
            loading: () => <div>Loading authentication state...</div>,
            error: (error, retry) => <ErrorBox error={error} retry={retry} />,
            completed: user => {
              if (user) {
                return this.props.children(user)
              } else {
                return (
                  <div>
                    You must sign in to continue:{' '}
                    <button onClick={authenticateWithGitHub}>
                      Sign in with GitHub
                    </button>
                  </div>
                )
              }
            }
          })
        }
      </fiery.Auth>
    )
  }
}

function authenticateWithGitHub() {
  firebase.auth().signInWithPopup(new firebase.auth.GithubAuthProvider())
}
