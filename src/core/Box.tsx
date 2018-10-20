import React from 'react'

export class Box extends React.Component<{
  borderColor: string
}> {
  render() {
    return (
      <div
        style={{
          padding: 8,
          borderStyle: 'solid',
          borderColor: this.props.borderColor,
          borderWidth: '1px 1px 1px 8px'
        }}
      >
        {this.props.children}
      </div>
    )
  }
}
