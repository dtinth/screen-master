import React from 'react'
import { Box } from './Box'
import * as NProgress from 'nprogress'

export class LoadingIndicator extends React.Component<{ title: string }> {
  componentDidMount() {
    NProgress.start()
  }
  componentWillUnmount() {
    NProgress.done()
  }
  render() {
    return <Box borderColor="#678">{this.props.title}</Box>
  }
}
