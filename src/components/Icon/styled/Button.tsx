import styled, { css } from 'styled-components'
import settingsIcon from 'assets/img/icons/settings.png'
import statisticIcon from 'assets/img/icons/stat.png'
import trashIcon from 'assets/img/icons/trash.png'
import backIcon from 'assets/img/icons/back.png'

const settings = css`
  background: url(${settingsIcon}) no-repeat;
  width: 1.3em;
  height: 1.3em;
  margin-left: -0.65em;
  margin-top: 7.6em;
  left: 50%;
`

const statistic = css`
  background: url(${statisticIcon}) no-repeat;
  width: 1.3em;
  height: 1.3em;
  margin-left: -2.7em;
  margin-top: 7.6em;
  left: 50%;
`

const trash = css`
  background: url(${trashIcon}) no-repeat;
  width: 1.3em;
  height: 1.3em;
  margin-left: 1.5em;
  margin-top: 7.6em;
  left: 50%;
`

const back = css`
  background: url(${backIcon}) no-repeat;
  width: 1em;
  height: 1.1em;
  margin-left: 1.5em;
  margin-top: 3.15em;
`

const Button = styled.button<{ typeIcon: string }>`
  outline: none;
  border: 0;
  display: block;
  position: absolute;
  ${({ typeIcon }) => {
    switch (typeIcon) {
      case 'settings':
        return settings
      case 'statistic':
        return statistic
      case 'trash':
        return trash
      case 'back':
        return back
    }
  }}
`

export default Button
