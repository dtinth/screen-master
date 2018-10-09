import React from 'react'
import { Projector } from './Projector'

type EditorState = {
  counter: number
}

export class Editor extends React.Component<EditorProps, EditorState> {
  state = {
    counter: 0
  }
  render() {
    return (
      <div>
        Counter = {this.state.counter}
        <br />
        <button
          onClick={() => this.setState(s => ({ counter: s.counter - 1 }))}
        >
          -
        </button>
        <button
          onClick={() => this.setState(s => ({ counter: s.counter + 1 }))}
        >
          +
        </button>
        <Projector screenId="screen1" width={1280} height={720}>
          <div
            onClick={() => {}}
            style={{
              fontSize: '240px',
              position: 'absolute',
              top: '20%',
              left: 0,
              right: 0,
              textAlign: 'center',
              transition: '1s color',
              color: this.state.counter % 2 ? 'blue' : 'red'
            }}
          >
            {this.state.counter}
          </div>
        </Projector>
      </div>
    )
  }
}

const Lol = (props: any) => <div>aaaa</div>

type EditorProps = {}
