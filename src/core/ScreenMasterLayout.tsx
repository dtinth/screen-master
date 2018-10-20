import React, { ReactNode } from 'react'

type Props = {
  data: any
  controlling: boolean
  controller: ReactNode
  screen: ReactNode
  setControllingFlag: (controlling: boolean) => void
}

type State = {
  displayWidth: number
  displayHeight: number
}

export class ScreenMasterLayout extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      displayWidth: window.innerWidth,
      displayHeight: window.innerHeight
    }
  }
  render() {
    return (
      <div>
        <div style={{ position: 'relative' }}>{this.props.controller}</div>
        <div
          style={{
            position: 'fixed',
            background: 'black',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            opacity: this.props.controlling ? 0 : 1,
            transition: '0.3s opacity',
            pointerEvents: 'none'
          }}
        />
        {this.renderScreen()}
      </div>
    )
  }
  componentDidMount() {
    addEventListener('resize', this.onResize)
  }
  componentWillUnmount() {
    removeEventListener('resize', this.onResize)
  }
  onResize = () => {
    this.setState({
      displayWidth: window.innerWidth,
      displayHeight: window.innerHeight
    })
  }
  getViewScale() {
    return Math.min(
      this.state.displayWidth / 1920,
      this.state.displayHeight / 1080
    )
  }
  renderScreen() {
    const transform = this.props.controlling
      ? `translate(100vw,100vh) translate(-20px,-20px) scale(0.2) translate(-100%,-100%)`
      : `translate(50vw,50vh) scale(${this.getViewScale()}) translate(-50%,-50%)`
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 1920,
          height: 1080,
          background: 'green',
          transform: transform,
          transformOrigin: 'top left',
          transition: '0.3s transform',
          cursor: 'none'
        }}
        onClick={() => {
          this.props.setControllingFlag(!this.props.controlling)
        }}
      >
        {this.props.screen}
      </div>
    )
  }
}
