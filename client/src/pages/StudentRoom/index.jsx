import React from 'react'
import { Container } from '../../componets/Container'
import './styles.css'
import {Menu} from "../../componets/Menu";
import {Avatar} from "../../componets/Avatar";
export function StudentRoom() {
  return (
    <div className="container pt-3">
      <div className="header__container">
        <Avatar />
        <div className="w-100">
          <div className="shadow bg-white rounded w-100 header">
            header
          </div>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="#">Home</a></li>
              <li className="breadcrumb-item"><a href="#">Library</a></li>
              <li className="breadcrumb-item active" aria-current="page">Data</li>
            </ol>
          </nav>
          <div className="h-100 shadow bg-white rounded w-100">
            content
          </div>
        </div>
      </div>
    </div>
  )
}