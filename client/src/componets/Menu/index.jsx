import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { HideMenu } from './HideMenu'

export function Menu({ menu }) {
  const [visibleLinks, setVisibleLinks] = useState([])
  const [visiblePerson, setVisiblePerson] = useState('hidde')
  function handleVisibleOver(id) {
    handleLink(id)
  }
  function handleVisibleOut(id) {
    handleLink(id)
  }
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

  function handlePersonIcon() {

  }

  return (
    <>
      <nav
        className="shadow rounded mb-3 navbar navbar-expand-md navbar-light bg-light"
      >
        <div className="container-fluid">
          <ul className="navbar-nav me-auto mb-2">
            {menu.map(({id, name, to, icon, dropdown}) => {
              if(!dropdown) {
                return <li className="nav-item me-2" key={id}>
                  <i className={icon}></i>
                  <Link className="nav-link d-inline" aria-current="page" to={to}>{name}</Link>
                </li>
              } else {
                return <li
                  className="nav-item me-2"
                  // onClick={() => handleLink(id)}
                  onMouseOver={() => handleVisibleOver(id)}
                  onMouseOut={() => handleVisibleOut(id)}
                  style={{position: "relative", cursor: "pointer"}}
                  key={id}
                >
                  {/*<i className={icon}></i>*/}
                  <i className="bi bi-arrow-down-right-circle text-success"></i>
                  <span className="nav-link d-inline">{name}</span>
                  <HideMenu
                    links={dropdown}
                    visibleLink={visibleLinks[id]}
                  />
                </li>
              }
            })}
          </ul>
          <div
            style={{position: "relative", cursor: "pointer"}}
            onClick={() => setVisiblePerson(visiblePerson === 'hidde' ? 'visible' : 'hidde')}
          >
            <i className="text-primary me-3 bi bi-person-fill fs-3" />
            <HideMenu
              onClickLink={() => localStorage.clear()}
              links={[{to: '/', name: 'Выход', icon: 'bi bi-arrow-down-right-circle' }]}
              visibleLink={visiblePerson}
            />
          </div>
        </div>
      </nav>
    </>
  )
}