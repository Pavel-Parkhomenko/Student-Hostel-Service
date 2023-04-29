import React from 'react'
import { Header } from "../../componets/Layout/Header"
import { Menu } from "../../componets/Menu"
import { Outlet } from "react-router-dom"
import { Footer } from "../../componets/Layout/Footer"
import { BreadCrumbs } from "../../componets/BreadCrumbs"
import { MENU_MENTOR, ROUTES_MENTOR } from '../../mocks'

export function MentorRoom() {
  return (
    <div>
      <div className="container pt-3 st-room__container">
        <div className="w-100">
          <Header>
            <Menu menu={MENU_MENTOR} />
          </Header>
          <BreadCrumbs routes={ROUTES_MENTOR} />
          <div className="rounded w-100">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}