import React, { useState, useRef } from 'react'
import classNames from 'classnames'
import TetherComponent from 'react-tether'

import {
  POPOVER_CLOSE_DELAY,
  POPOVER_PLACEMENT,
  POPOVER_PLACEMENTS,
} from './constants'

import {
  FloatingBox,
  FloatingBoxProps,
  FLOATING_BOX_SCHEME,
} from '../../primitives/FloatingBox'

interface PopoverProps
  extends Omit<FloatingBoxProps, 'onMouseEnter' | 'onMouseLeave'> {
  children: React.ReactElement
  popoverJSX: React.ReactElement
  scheme?: FLOATING_BOX_SCHEME.LIGHT | FLOATING_BOX_SCHEME.DARK
  placement:
    | POPOVER_PLACEMENT.ABOVE
    | POPOVER_PLACEMENT.BELOW
    | POPOVER_PLACEMENT.LEFT
    | POPOVER_PLACEMENT.RIGHT
}

export const Popover: React.FC<PopoverProps> = ({
  className,
  children,
  popoverJSX,
  scheme = FLOATING_BOX_SCHEME.LIGHT,
  placement = POPOVER_PLACEMENT.BELOW,
  ...rest
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const timerRef = useRef(null)
  const PLACEMENTS = POPOVER_PLACEMENTS[placement]

  const classes = classNames('rn-popover', className, {
    'is-visible': isVisible,
  })

  function handleOnMouseEnter(e: React.MouseEvent) {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current)
    }

    setIsVisible(true)
  }

  function handleOnMouseLeave(_: React.MouseEvent) {
    timerRef.current = setTimeout(() => {
      timerRef.current = null
      setIsVisible(false)
    }, POPOVER_CLOSE_DELAY)
  }

  function renderTarget(ref: React.Ref<any>) {
    return React.Children.map(children, (item: React.ReactElement) =>
      React.cloneElement(item, {
        onMouseEnter: handleOnMouseEnter,
        onMouseLeave: handleOnMouseLeave,
        ref,
      })
    )[0]
  }

  return (
    <TetherComponent
      offset={PLACEMENTS.OFFSET}
      attachment={PLACEMENTS.ATTACHMENT}
      targetAttachment={PLACEMENTS.TARGET_ATTACHMENT}
      renderTarget={ref => renderTarget(ref)}
      renderElement={ref => (
        <FloatingBox
          ref={ref}
          className={classes}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
          position={PLACEMENTS.ARROW_POSITION}
          scheme={scheme}
          {...rest}
        >
          {popoverJSX}
        </FloatingBox>
      )}
    />
  )
}

Popover.displayName = 'Popover'
