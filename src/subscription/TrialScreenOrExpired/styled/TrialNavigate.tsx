import styled from 'styled-components'

const TrialNavigate = styled.button`
  background: ${({ theme }) => theme.colors.buttonDefaultColor};
  color: ${({ theme }) => theme.colors.buttonTextColor};
  border: 0;
  border-radius: 5em;
  position: absolute;
  width: 11.4em;
  font-size: 0.6em;
  top: 11.3em;
  left: 50%;
  margin-left: -5.7em;
  padding: 0.1em 0.3em;
`

export default TrialNavigate
