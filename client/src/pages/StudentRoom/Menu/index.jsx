import React from 'react'
import {Link} from "react-router-dom"
import { MENU_STUDENT } from '../../../mocks'

export function Menu() {
  return(
    <>
      <nav className="shadow rounded mb-3 navbar navbar-expand-xl navbar-light bg-light">
        <div className="container-fluid">
          <div className="collapse navbar-collapse show" id="navbarLight">
            <ul className="navbar-nav me-auto mb-2 mb-xl-0">
              {MENU_STUDENT.map(({name, to, icon}) => {
                return <li className="nav-item me-2" key={to}>
                  <i className={icon}></i>
                  <Link className="nav-link d-inline" aria-current="page" to={to}>{name}</Link>
                </li>
              })}
            </ul>

            <i style={{fontSize: "30px"}} className="text-primary me-3 bi bi-person-fill"></i>
            <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Поиск" aria-label="Search"/>
              <button className="btn btn-outline-dark" type="submit">Поиск</button>
            </form>
          </div>
        </div>
      </nav>
    </>
  )
}