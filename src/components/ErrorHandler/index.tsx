import React from 'react'
import { Container } from './styled'

interface ErrorHandlerProps {
  errorMsg?: string | null
  error: {
    message: string
  }
}
const ErrorHandler: React.FC<ErrorHandlerProps> = ({ errorMsg, error }) => {
  return (
    <Container>
      {errorMsg}. <br /> {error.message}
    </Container>
  )
}

export default ErrorHandler
