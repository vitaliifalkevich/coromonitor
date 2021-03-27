import styled from 'styled-components'

const Title = styled.h3`
  position: absolute;
  font-size: 0.7em;
  text-align: center;
  width: 100%;
  height: 3em;
  padding-top: 1.5em;
  z-index: 100;
  margin-top: 0;
  background: ${({ theme }) => theme.colors.title};
`

export default Title
