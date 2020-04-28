export interface TimelineRootComponent {
  type: {
    name: 'TimelineSide'
  }
}

export interface TimelineHeadComponent {
  type: {
    name:
      | 'TimelineTodayMarker'
      | 'TimelineMonths'
      | 'TimelineWeeks'
      | 'TimelineDays'
  }
}

export interface TimelineBodyComponent {
  type: {
    name: 'TimelineRows'
  }
}
