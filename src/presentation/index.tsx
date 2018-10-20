import React from 'react'
import { Screen } from '../core'

export function display(state: any) {
  return (
    <Screen background="#222">
      <div
        style={{
          font: '500px Cousine, Menlo, Monaco, monospace',
          paddingTop: '200px',
          textAlign: 'center'
        }}
      >
        <Countdown endTime={state && state.endTime} />
      </div>
    </Screen>
  )
}

export function controller(state: any, update: any) {
  const target = (state && state.endTime) || 0
  return (
    <div>
      <h1>Presentation control panel</h1>
      <p>Use this panel to control the presentation.</p>
      <p>
        Edit your presentation at <code>src/presentation/index.tsx</code>
      </p>
      <h2>Countdown timer</h2>
      <p>Target: {target ? new Date(target).toString() : '(none)'}</p>
      <p>
        <button
          onClick={() => {
            const minutes = +prompt('How many minutes', '15')!
            if (!minutes) return
            update((state: any) => {
              if (!state) state = {}
              state.endTime = Date.now() + minutes * 60e3
              return state
            })
          }}
        >
          Set timer
        </button>{' '}
        <button
          disabled={!target}
          onClick={() => {
            update((state: any) => {
              if (!state) state = {}
              state.endTime = 0
              return state
            })
          }}
        >
          Clear timer
        </button>
      </p>
    </div>
  )
}

class Countdown extends React.Component<
  { endTime?: number },
  { text: string }
> {
  interval?: ReturnType<typeof setInterval>
  constructor(props: any) {
    super(props)
    this.state = {
      text: '--:--'
    }
  }
  componentDidMount() {
    this.interval = setInterval(this.update, 100)
  }
  update = () => {
    var timeLeft = (this.props.endTime || 0) - Date.now()
    if (timeLeft < 0) {
      this.setText('--:--')
    } else {
      var minutes = Math.floor(timeLeft / 60e3)
      var seconds = Math.floor(timeLeft / 1e3) % 60
      this.setText(`${minutes}:${seconds.toString(10).padStart(2, '0')}`)
    }
  }
  setText(text: string) {
    if (this.state.text !== text) this.setState({ text })
  }
  render() {
    return <div>{this.state.text}</div>
  }
}
