import React from 'react'

import { TimelineProvider } from './context'

import {
  TimelineRootComponent,
  TimelineHeadComponent,
  TimelineBodyComponent,
} from './types'

import {
  TimelineSide,
  TimelineDays,
  TimelineWeeks,
  TimelineMonths,
  TimelineTodayMarker,
  TimelineRows,
} from '.'

import { TimelineOptions } from './context/types'
import { DEFAULTS } from './constants'

export interface TimelineProps extends ComponentWithClass {
  children: React.ReactElement | React.ReactElement[]
  dayWidth?: number
  startDate?: Date
  today?: Date
}

function isRootComponent(item: React.ReactNode): item is TimelineRootComponent {
  const type = (item as TimelineRootComponent)?.type?.name ?? ''

  return type === TimelineSide.name
}

function isHeadComponent(item: React.ReactNode): item is TimelineHeadComponent {
  const type = (item as TimelineHeadComponent)?.type?.name ?? ''

  return [
    TimelineDays.name,
    TimelineWeeks.name,
    TimelineMonths.name,
    TimelineTodayMarker.name,
  ].includes(type)
}

function isBodyComponent(item: React.ReactNode): item is TimelineBodyComponent {
  const type = (item as TimelineBodyComponent)?.type?.name ?? ''

  return type === TimelineRows.name
}

function extractChildren(
  children: React.ReactElement | React.ReactElement[],
  typeGuard: (item: React.ReactNode) => boolean,
  props?: { [key: string]: any }
) {
  return React.Children.map(children, (child: React.ReactElement) => {
    if (typeGuard(child)) {
      return React.cloneElement(child as React.ReactElement, props)
    }

    return null
  })
}

export const Timeline: React.FC<TimelineProps> = ({
  children,
  dayWidth = DEFAULTS.DAY_WIDTH,
  startDate,
  today,
}) => {
  const options: TimelineOptions = {
    dayWidth,
    rangeInMonths: DEFAULTS.RANGE_IN_MONTHS,
  }

  const rootChildren = extractChildren(children, isRootComponent)
  const headerChildren = extractChildren(children, isHeadComponent)
  const bodyChildren = extractChildren(children, isBodyComponent)

  return (
    <TimelineProvider startDate={startDate} today={today} options={options}>
      <article className="timeline">
        {rootChildren}
        <div className="timeline__inner">
          <header className="timeline__header">{headerChildren}</header>
          <main className="timeline__main">{bodyChildren}</main>
        </div>
      </article>
    </TimelineProvider>
  )
}

Timeline.displayName = 'Timeline'
