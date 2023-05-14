import React from 'react'
import { Header } from "../../componets/Layout/Header"
import { Menu } from "../../componets/Menu"
import { Outlet } from "react-router-dom"
import { Footer } from "../../componets/Layout/Footer"
import { BreadCrumbs } from "../../componets/BreadCrumbs"
import { MENU_ADMIN, ROUTES_ADMIN } from '../../mocks'

export function AdminRoom() {
  return (
    <div>
      <div className="container pt-3 st-room__container">
        <div className="w-100">
          <Header>
            <Menu menu={MENU_ADMIN} role='Комендант' />
          </Header>
          <BreadCrumbs routes={ROUTES_ADMIN} />
          <div className="rounded w-100">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}