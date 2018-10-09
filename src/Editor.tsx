import React from 'react'
import { Projector } from './Projector'
import { Persist } from './Persist'

export class Editor extends React.Component {
  render() {
    return (
      <Persist stateKey="counter" defaultState={0}>
        {(counter, update) => (
          <div>
            Counter = {counter}
            <br />
            <button onClick={() => update((c: number) => c - 1)}>-</button>
            <button onClick={() => update((c: number) => c + 1)}>+</button>
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
                  color: counter % 2 ? 'blue' : 'red'
                }}
              >
                {counter}
              </div>
            </Projector>
          </div>
        )}
      </Persist>
    )
  }
}
