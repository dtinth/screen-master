import React from 'react'

export class ErrorBox extends React.Component<{
  retry?: () => void
  error?: Error
}> {
  render() {
    return (
      <div
        style={{
          border: '1px solid #c77',
          background: '#fee',
          padding: '1em',
          color: '#c22'
        }}
      >
        <strong>Error!</strong> {this.props.children}{' '}
        {!!this.props.retry && (
          <button onClick={this.props.retry}>Retry</button>
        )}
      </div>
    )
  }
}
