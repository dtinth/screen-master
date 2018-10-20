import React from 'react'

export { App } from './App'
export * from './types'
export * from './context'

export class Screen extends React.Component<{ background: string }> {
  render() {
    return (
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          background: this.props.background
        }}
      >
        {this.props.children}
      </div>
    )
  }
}
