import React from 'react'
import { Container } from './styled'

const Spinner = () => {
  return (
    <Container>
      <div className="small-processing-container">
        <div className="ui-processing" />
        <div className="ui-processing-text">Data is loading</div>
      </div>
    </Container>
  )
}

export default Spinner
