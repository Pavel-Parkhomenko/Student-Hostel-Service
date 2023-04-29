import React from 'react'

export function Header(props) {
  return(
    <div className="rounded w-100 sticky-top">
      {props.children}
    </div>
  )
}