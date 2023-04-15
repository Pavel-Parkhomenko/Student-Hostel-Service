import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { HideMenu } from './HideMenu'

export function Menu({ menu }) {
  const [visibleLinks, setVisibleLinks] = useState([])
  console.log(visibleLinks)
  function handleLink(id) {
    const tempArr = visibleLinks
    const tempItem = tempArr[id] === "hidde" ? "visible" : "hidde"
    tempArr.fill("hidde")
    tempArr[id] = tempItem
    setVisibleLinks([...tempArr])
  }

  useEffect(() => {
    setVisibleLinks(new Array(menu.length).fill("hidde"))
  }, [])

  return (
    <>
      <nav className="shadow rounded mb-3 navbar navbar-expand-xl navbar-light bg-light">
        <div className="container-fluid">
          <div className="collapse navbar-collapse show" id="navbarLight">
            <ul className="navbar-nav me-auto mb-2 mb-xl-0">
              {menu.map(({id, name, to, icon, dropdown}) => {
                if(!dropdown) {
                  return <li className="nav-item me-2" key={id}>
                    <i className={icon}></i>
                    <Link className="nav-link d-inline" aria-current="page" to={to}>{name}</Link>
                  </li>
                } else {
                  return <li
                    className="nav-item me-2"
                    onClick={() => handleLink(id)}
                    style={{position: "relative"}}
                    key={id}
                  >
                    <i className={icon}></i>
                    <span className="nav-link d-inline">{name}</span>
                    <HideMenu
                      links={dropdown}
                      visibleLink={visibleLinks[id]}
                    />
                  </li>
                }
              })}
            </ul>
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