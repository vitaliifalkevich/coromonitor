import React from 'react'
import { LastCheck, CasesContainer, Case } from './styled'
import { format } from 'date-fns'
import { iconTypes } from 'app_constants'
import Icon from 'components/Icon'
import ComponentThemeProvider from 'styles/theme/ComponentThemeProvider'
import themes from './themes'

interface InfoCasesProps {
  statisticDate?: string
  totalCases?: string
  totalRecovered?: string
  totalDeaths?: string
  countryName?: string
}
const InfoCases: React.FC<InfoCasesProps> = ({
  statisticDate,
  totalCases,
  totalRecovered,
  totalDeaths,
  countryName,
}) => {
  return (
    <ComponentThemeProvider themes={themes}>
      <>
        <h2>
          {countryName ? `${countryName} ` : 'Globally '}
          {statisticDate && (
            <LastCheck>{format(new Date(statisticDate), 'hh:mm:ss')}</LastCheck>
          )}
        </h2>
        <CasesContainer>
          <Case type="confirmed">
            <span>
              {totalCases && totalCases.length < 8 ? 'Confirmed: ' : 'Conf: '}
              <b>{totalCases}</b>
            </span>
          </Case>
          <Case type="recovered">
            <span>
              {totalCases && totalCases.length < 8 ? 'Recovered: ' : 'Rec: '}
              <b>{totalRecovered}</b>
            </span>
          </Case>
          <Case type="deaths">
            <span>Deaths: {totalDeaths && <b>{totalDeaths}</b>}</span>
          </Case>
        </CasesContainer>
        <Icon iconType={iconTypes.settings} />
        {countryName && (
          <Icon iconType={iconTypes.trash} countryName={countryName} />
        )}
      </>
    </ComponentThemeProvider>
  )
}

export default InfoCases
