import React, { useState } from 'react'
import uuid from 'uuid'

interface ToggleProps {
  className?: string
  label?: string
  onClick?: (value: string | boolean) => void
  disabled?: boolean
  trueValue?: string
  falseValue?: string
  onChange?: (value: string) => void
}

const Toggle: React.FC<ToggleProps> = ({
  className = '',
  label = '',
  onClick = value => {},
  disabled = false,
  trueValue,
  falseValue,
  onChange = value => {},
}) => {
  const [checked, setChecked] = useState(false)

  const id: string = uuid()

  const classes = `
    rn-toggle
    ${checked ? 'not-checked' : 'is-checked'}
    ${disabled ? 'is-disabled' : 'is-active'}
    ${className}
  `

  return (
    <label className={classes} htmlFor={id}>
      <input
        id={id}
        className="rn-toggle__input"
        type="checkbox"
        checked={checked}
        onClick={() => {
          setChecked(!checked)

          let value: boolean | string = checked
          if (typeof trueValue !== 'undefined') {
            value = checked ? trueValue : falseValue
          }

          onClick(value)
        }}
        disabled={disabled}
      />
      <div className="rn-toggle__track">
        <div className="rn-toggle__switch" />
      </div>
      <span className="rn-toggle__label-inner">{label}</span>
    </label>
  )
}

export default Toggle
