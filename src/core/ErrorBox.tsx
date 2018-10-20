import React from 'react'
import { Box } from './Box'

export class ErrorBox extends React.Component<{
  retry?: () => void
  error?: Error
}> {
  render() {
    const error = this.props.error
    const retry = this.props.retry
    return (
      <Box borderColor="#c77">
        {!!error && <pre>{error.stack}</pre>}
        {retry && <button onClick={retry}>Retry</button>}
      </Box>
    )
  }
}
