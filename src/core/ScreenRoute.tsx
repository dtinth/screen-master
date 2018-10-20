import React, { ReactNode } from 'react'
import * as fiery from 'fiery'
import { firebase } from './firebase'
import { match } from 'react-router'
import { ErrorBox } from './ErrorBox'
import { LoadingIndicator } from './LoadingIndicator'
import { ScreenMasterLayout } from './ScreenMasterLayout'
import { Location, History } from 'history'
import { PresentationContext } from './context'
import { AuthenticationRequired } from './AuthenticationRequired'
import * as NProgress from 'nprogress'

export class ScreenRoute extends React.Component<{
  match: match<{ userId: string; screenId: string }>
  location: Location
  history: History
}> {
  render() {
    const controlling = this.isControlling()
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
              loading: () => (
                <LoadingIndicator title="Loading screen data..." />
              ),
              completed: screenData => (
                <ScreenMasterLayout
                  data={screenData}
                  controlling={controlling}
                  setControllingFlag={this.setControllingFlag}
                  screen={
                    <ErrorBoundary>
                      {() => (
                        <PresentationContext.Consumer>
                          {m => m.display(screenData && screenData.state)}
                        </PresentationContext.Consumer>
                      )}
                    </ErrorBoundary>
                  }
                  controller={
                    <AuthenticationRequired>
                      {user => (
                        <ErrorBoundary>
                          {() => (
                            <PresentationContext.Consumer>
                              {m =>
                                m.controller(
                                  screenData && screenData.state,
                                  this.update
                                )
                              }
                            </PresentationContext.Consumer>
                          )}
                        </ErrorBoundary>
                      )}
                    </AuthenticationRequired>
                  }
                />
              )
            })
          }
        </fiery.Data>
      </div>
    )
  }
  update = async (f: (state: any) => any) => {
    try {
      NProgress.start()
      return await firebase
        .database()
        .ref('screens')
        .child(this.props.match.params.userId)
        .child(this.props.match.params.screenId)
        .child('state')
        .transaction(f)
    } finally {
      NProgress.done()
    }
  }
  setControllingFlag = (controlling: boolean) => {
    if (controlling) {
      this.props.history.push(this.props.location.pathname + '?controller')
    } else {
      this.props.history.push(this.props.location.pathname)
    }
  }
  isControlling() {
    return this.props.location.search === '?controller'
  }
}

class ErrorBoundary extends React.Component<
  {
    children: () => ReactNode
  },
  { error: any }
> {
  constructor(props: any) {
    super(props)
    this.state = { error: null }
  }

  componentDidCatch(error: any) {
    this.setState({ error: error })
  }

  render() {
    if (this.state.error) {
      return (
        <ErrorBox
          error={this.state.error}
          retry={() => {
            this.setState({ error: null })
          }}
        >
          There is an error while rendering.
        </ErrorBox>
      )
    }
    return this.props.children()
  }
}
