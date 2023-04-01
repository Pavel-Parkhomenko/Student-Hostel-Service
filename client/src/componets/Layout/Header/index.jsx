import React from 'react'
import {Link} from "react-router-dom";

export function Header(props) {
  return(
    <div className="rounded w-100 sticky-top">
      {props.children}
    </div>
  )
}