import React from 'react'

export class Persist<T = any> extends React.Component<{
  stateKey: string
  defaultState: T
  children: (
    state: T,
    update: (f: (oldState: T) => T) => void
  ) => React.ReactNode
}> {
  state = {
    data: this.getInitialData()
  }
  getInitialData(): T {
    const stateKey = this.props.stateKey
    if (stateKey in localStorage) {
      try {
        return JSON.parse(localStorage[stateKey])
      } catch (e) {
        console.error('Cannot restore state:', e)
      }
    }
    return this.props.defaultState
  }
  render() {
    return this.props.children(this.state.data, f => {
      const json = JSON.stringify(f(this.state.data))
      const nextData = JSON.parse(json)
      const stateKey = this.props.stateKey
      localStorage[stateKey] = json
      this.setState({ data: nextData })
    })
  }
}
