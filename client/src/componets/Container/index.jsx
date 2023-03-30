import React from 'react'
import './style.css'

export function Container(props) {
  console.log(props.styleClass)
  return (
    <div className={`shadow bg-white rounded ${props.styleClass}`}>
      {props.children}
    </div>
  )
}