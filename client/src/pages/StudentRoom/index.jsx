import React, { useEffect, useState } from 'react'
import './styles.css'
import { Avatar } from "../../componets/Layout/Avatar";
import { Outlet } from 'react-router-dom'
import { Header } from '../../componets/Layout/Header'
import { Menu } from '../../componets/Menu'
import { Footer } from '../../componets/Layout/Footer'
import { MENU_STUDENT, ROUTES_STUDENT } from "../../mocks"
import { BreadCrumbs } from "../../componets/BreadCrumbs"
export function StudentRoom() {
  const [student, setStudent] = useState({})

  useEffect(() => {
    setStudent(JSON.parse(localStorage.getItem("user")))
  }, [])

  return (
    <div>
      <div className="container pt-3 st-room__container">
        <Avatar data={student} />
        <div className="w-100">
          <Header>
            <Menu menu={MENU_STUDENT} role="Студент"/>
          </Header>
          <BreadCrumbs routes={ROUTES_STUDENT} />
          <div className="rounded w-100">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}