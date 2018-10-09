import React from 'react'
import * as fiery from 'fiery'
import { firebase } from './firebase'
import { match } from 'react-router'
import { ErrorBox } from './ErrorBox'
import { toElement } from './toElement'

export class ScreenRoute extends React.Component<{
  match: match<{ userId: string; screenId: string }>
}> {
  render() {
    return (
      <div>
        <fiery.Data
          dataRef={firebase
            .database()
            .ref('screens')
            .child(this.props.match.params.userId)
            .child(this.props.match.params.screenId)}
        >
          {dataState =>
            fiery.unwrap(dataState, {
              error: (e, retry) => (
                <ErrorBox error={e} retry={retry}>
                  Cannot load screen data!
                </ErrorBox>
              ),
              loading: () => <div>(Loading screen data, please wait...)</div>,
              completed: screenData => {
                try {
                  const contents = JSON.parse(screenData.contents || 'null')
                  return toElement(contents)
                } catch (e) {
                  return (
                    <ErrorBox error={e}>
                      Cannot render screen: {String(e)}
                    </ErrorBox>
                  )
                }
              }
            })
          }
        </fiery.Data>
      </div>
    )
  }
}
