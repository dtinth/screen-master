import React, { ReactNode } from 'react'
import * as fiery from 'fiery'
import { firebase } from './firebase'
import { ErrorBox } from './ErrorBox'
import { LoadingIndicator } from './LoadingIndicator'
import { Box } from './Box'

export class AuthenticationRequired extends React.Component<{
  children: (user: firebase.User) => ReactNode
}> {
  render() {
    return (
      <fiery.Auth>
        {authState =>
          fiery.unwrap(authState, {
            loading: () => (
              <LoadingIndicator title="Checking authentication state..." />
            ),
            error: (error, retry) => <ErrorBox error={error} retry={retry} />,
            completed: user => {
              if (user) {
                return this.props.children(user)
              } else {
                return (
                  <Box borderColor="#a95">
                    You must sign in to continue…{' '}
                    <button onClick={authenticateWithGitHub}>
                      Sign in with GitHub
                    </button>
                  </Box>
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
