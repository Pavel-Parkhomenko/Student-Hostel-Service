import React from 'react'
import { Link } from "react-router-dom"

export function Menu({ menu }) {
  return (
    <>
      <nav className="shadow rounded mb-3 navbar navbar-expand-xl navbar-light bg-light">
        <div className="container-fluid">
          <div className="collapse navbar-collapse show" id="navbarLight">
            <ul className="navbar-nav me-auto mb-2 mb-xl-0">
              {menu.map(({name, to, icon}) => {
                return <li className="nav-item me-2" key={to}>
                  <i className={icon}></i>
                  <Link className="nav-link d-inline" aria-current="page" to={to}>{name}</Link>
                </li>
              })}
            </ul>
            <i className="bi bi-three-dots-vertical text-primary fs-3 me-3" />
            <i className="text-primary me-3 bi bi-person-fill fs-3" />
            <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Поиск" aria-label="Search" />
              <button className="btn btn-outline-dark" type="submit">Поиск</button>
            </form>
          </div>
        </div>
      </nav>
    </>
  )
}