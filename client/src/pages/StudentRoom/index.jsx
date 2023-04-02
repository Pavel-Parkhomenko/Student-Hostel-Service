import React from 'react'
import './styles.css'
import {Avatar} from "../../componets/Layout/Avatar";
import { Outlet } from 'react-router-dom'
import { Header } from '../../componets/Layout/Header'
import { Menu } from '../../componets/Menu'
import { Footer } from '../../componets/Layout/Footer'
import { MENU_STUDENT, ROUTES_STUDENT } from "../../mocks"
import { BreadCrumbs } from "../../componets/BreadCrumbs"
export function StudentRoom() {
  return (
    <div>
      <div className="container pt-3 st-room__container">
        <Avatar />
        <div className="w-100">
          <Header>
            <Menu menu={MENU_STUDENT} />
          </Header>
          <BreadCrumbs routes={ROUTES_STUDENT} />
          <div className="shadow rounded w-100">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}