import React from 'react'
import './style.css'
import { Link } from "react-router-dom"

export function HideMenu({ links, visibleLink, onClickLink = () => {} }) {
  return (
    <div className={visibleLink}>
      <nav className="nav flex-column bg-light dropdown rounded">
        {links.map(({to, name, icon}) => {
          return <div key={name}>
            <div className="py-2" onClick={onClickLink}>
              <i className={`${icon} text-primary`}></i>
              <Link className="nav-link d-inline" aria-current="page" key={to} to={to}>{name}</Link>
            </div>
          </div>
        })}
      </nav>
    </div>
  )
}
