import { PresentationContext, IPresentation } from './core'
import React from 'react'

let instance: PresentationContextProvider

export class PresentationContextProvider extends React.Component<
  {},
  { presentation: IPresentation }
> {
  constructor(props: any) {
    super(props)
    this.state = { presentation: require('./presentation').presentation }
  }
  componentDidMount() {
    instance = this
  }
  render() {
    return (
      <PresentationContext.Provider value={this.state.presentation}>
        {this.props.children}
      </PresentationContext.Provider>
    )
  }
}

const hot = (module as any).hot

if (hot) {
  hot.accept(() => {
    if (hot.data.instance) {
      instance = hot.data.instance
    }
    if (instance) {
      const nextModule = require('./presentation').presentation
      instance.setState({ presentation: nextModule })
    }
  })
  hot.dispose((data: any) => {
    data.instance = instance
  })
}
