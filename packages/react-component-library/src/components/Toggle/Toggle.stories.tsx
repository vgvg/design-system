import React from 'react'
import { storiesOf } from '@storybook/react'

import Toggle from './index'

const stories = storiesOf('Toggle', module)

stories.add('Default', () => (
  <Toggle
    label="Toggle Switch"
    trueValue="100"
    falseValue="0"
    disabled={false}
    onClick={value => {
      console.log(value)
    }}
  />
))
