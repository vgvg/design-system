import React from 'react'

import { TimelineProvider } from './context'

import {
  TimelineSide,
  TimelineDays,
  TimelineWeeks,
  TimelineMonths,
  TimelineTodayMarker,
  TimelineRowsProps,
} from '.'

import { TimelineOptions } from './context/types'
import { DEFAULTS } from './constants'

export interface TimelineProps extends ComponentWithClass {
  children: React.ReactElement<TimelineRowsProps>
  dayWidth?: number
  renderMonths?: (
    index: number,
    dayWidth: number,
    daysTotal: number,
    startDate: Date
  ) => React.ReactNode
  renderWeeks?: () => React.ReactNode
  renderDays?: () => React.ReactNode
  renderTodayMarker?: () => React.ReactNode
  startDate?: Date
  today?: Date
}

export const Timeline: React.FC<TimelineProps> = ({
  children,
  dayWidth = DEFAULTS.DAY_WIDTH,
  renderTodayMarker,
  renderMonths,
  renderWeeks,
  renderDays,
  startDate,
  today,
}) => {
  const options: TimelineOptions = {
    dayWidth,
    rangeInMonths: DEFAULTS.RANGE_IN_MONTHS,
  }

  return (
    <TimelineProvider startDate={startDate} today={today} options={options}>
      <article className="timeline">
        <TimelineSide>{children}</TimelineSide>
        <div className="timeline__inner">
          <TimelineTodayMarker />
          <TimelineMonths />
          <TimelineWeeks />
          <TimelineDays />
          <main className="timeline__main">{children}</main>
        </div>
      </article>
    </TimelineProvider>
  )
}

Timeline.displayName = 'Timeline'
