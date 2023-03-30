import React from 'react'
import { Container } from '../../componets/Container'
import './styles.css'
import {Menu} from "../../componets/Menu";
import {Avatar} from "../../componets/Avatar";
import { Outlet, Link } from 'react-router-dom'
export function StudentRoom() {
  return (
    <div className="container pt-3">
      <div className="header__container">
        <Avatar />
        <div className="w-100">
          <div className="rounded w-100 sticky-top">
            <nav className="shadow rounded navbar navbar-expand-xl navbar-light bg-light">
              <div className="container-fluid">
                <div className="collapse navbar-collapse show" id="navbarLight">
                  <ul className="navbar-nav me-auto mb-2 mb-xl-0">
                    <li className="nav-item">
                      <Link className="nav-link active" aria-current="page" to="#">Дом</Link>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link active" aria-current="page" href="#">Новости</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link active" aria-current="page" href="#">Мероприятия</a>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link active" aria-current="page" to="news">News</Link>
                    </li>
                  </ul>
                  <form className="d-flex">
                    <input className="form-control me-2" type="search" placeholder="Поиск" aria-label="Search"/>
                      <button className="btn btn-outline-dark" type="submit">Поиск</button>
                  </form>
                </div>
              </div>
            </nav>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item"><a href="#">Library</a></li>
                <li className="breadcrumb-item active" aria-current="page">Data</li>
              </ol>
            </nav>
          </div>
          <div className="h-100 shadow bg-white rounded w-100">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}