import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import React from 'react'

import { Dialog } from './index'

const stories = storiesOf('Dialog', module)
const examples = storiesOf('Dialog/Examples', module)

stories.add('Default', () => {
  return (
    <Dialog
      title="Dialog Title"
      description="Dialog description."
      onConfirm={action('onConfirm')}
      onCancel={action('onCancel')}
      isOpen
    />
  )
})

examples.add('Danger', () => {
  return (
    <Dialog
      title="Dialog Title"
      description="Dialog description."
      onConfirm={action('onConfirm')}
      onCancel={action('onCancel')}
      isDanger
      isOpen
    />
  )
})
