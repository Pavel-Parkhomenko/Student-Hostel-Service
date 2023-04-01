import React from 'react'
import {Avatar} from "../../componets/Layout/Avatar";
import {Header} from "../../componets/Layout/Header";
import {Menu} from "../StudentRoom/Menu";
import {Outlet} from "react-router-dom";
import {Footer} from "../../componets/Layout/Footer";

export function MentorRoom() {
  return(
    <div>
      <div className="container pt-3 st-room__container">
        <Avatar />
        <div className="w-100">
          <Header>
            <Menu />
          </Header>
          <div className="rounded w-100">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}