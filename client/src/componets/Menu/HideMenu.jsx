import React from 'react'
import './style.css'
import { Link } from "react-router-dom"

export function HideMenu({ links, visibleLink }) {
  console.log(visibleLink)
  return (
    <div className={visibleLink}>
      <nav className="nav flex-column bg-light dropdown rounded">
        {links.map(({to, name, icon}) => {
          return <div>
            <div className="py-2">
              <i className={icon}></i>
              <Link className="nav-link d-inline" aria-current="page" key={to} to={to}>{name}</Link>
            </div>
          </div>
        })}
      </nav>
    </div>
  )
}
