import styled from 'styled-components'

const SubscribeNavigate = styled.button`
  background: ${({ theme }) => theme.colors.buttonDefaultColor};
  color: ${({ theme }) => theme.colors.buttonTextColor};
  border: 0;
  border-radius: 5em;
  position: absolute;
  width: 8.4em;
  top: 4.6em;
  left: 50%;
  margin-left: -4.2em;
  padding: 0.1em 0.3em;
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.fonts.extraBold};
`

export default SubscribeNavigate
