import React from 'react'
import { AuthenticationRequired } from './AuthenticationRequired'
import { Editor } from './Editor'

export class EditorRoute extends React.Component {
  render() {
    return (
      <div>
        <h1>Screen editor</h1>
        <p>Please edit Editor.tsx to change the it to suit your needs.</p>
        <AuthenticationRequired>{user => <Editor />}</AuthenticationRequired>
      </div>
    )
  }
}
