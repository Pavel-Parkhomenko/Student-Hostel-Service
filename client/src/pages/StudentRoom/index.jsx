import React from 'react'
import './styles.css'
import {Avatar} from "../../componets/Layout/Avatar";
import { Outlet } from 'react-router-dom'
import { Header } from '../../componets/Layout/Header'
import {Menu} from './Menu'
import { Footer } from '../../componets/Layout/Footer'
export function StudentRoom() {
  return (
    <div>
      <div className="container pt-3 st-room__container">
        <Avatar />
        <div className="w-100">
          <Header>
            <Menu />
          </Header>
          <div className="shadow rounded w-100">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}