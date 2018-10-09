import React from 'react'
import TestRenderer from 'react-test-renderer'
import { toElement } from './toElement'
import { firebase } from './firebase'
export class Projector extends React.Component<
  {
    screenId: string
    width: number
    height: number
  },
  {
    json: any
  }
> {
  static getDerivedStateFromProps(props: any) {
    const element = (
      <div
        style={{
          width: props.width,
          height: props.height,
          position: 'relative',
          background: '#000',
          color: '#fff'
        }}
      >
        {props.children}
      </div>
    )
    const testRenderer = TestRenderer.create(element)
    const json = testRenderer.toJSON()
    testRenderer.unmount()
    return {
      json: JSON.stringify(json)
    }
  }
  componentDidUpdate() {
    this.updateOnFirebase()
  }
  componentDidMount() {
    this.updateOnFirebase()
  }
  private updateOnFirebase() {
    firebase
      .database()
      .ref('screens')
      .child(firebase.auth().currentUser!.uid)
      .child(this.props.screenId)
      .child('contents')
      .set(this.state.json)
  }
  render() {
    const url = [
      location.protocol,
      '//',
      location.host,
      location.pathname,
      '#/screens/',
      firebase.auth().currentUser!.uid,
      '/',
      this.props.screenId
    ].join('')
    return (
      <div style={{ background: '#333' }}>
        Preview:
        <div
          style={{
            zoom: 0.25,
            border: '8px solid #333'
          }}
        >
          {toElement(JSON.parse(this.state.json))}
        </div>
        <br />
        {url}
      </div>
    )
  }
}
