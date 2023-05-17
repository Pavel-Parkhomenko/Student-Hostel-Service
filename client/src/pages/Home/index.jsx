import React from 'react'
import home1 from '../../assets/home/home1.jpg'
import home2 from '../../assets/home/home4.jpg'
import home3 from '../../assets/home/home3.jpg'
import { Link } from 'react-router-dom'
import './style.css'

export function Home() {
  return (
    <div className="home__container">
      <div>
        <div className="home__img-container">
          <img alt="img1" className="home__img1" src={home1} />
          <img alt="img2" className="home__img2" src={home3} />
        </div>
      </div>
      <div className="home__container-text">
        <h1>Добро пожаловать</h1>
        <p>
          Данная ситема предназначеня для управлением общежитием.
          Она включает в себя три роли, для которых реализованы все необходимые функции.
          Всё, что Вам необходимо, данное приложение вам предоставит.
        </p>
        <div className="home__container-links">
          <button className="btn btn-primary">
            <Link className="home__link link1" to='/login'>Войти</Link>
          </button>
          <button className="btn btn-light">
            <Link className="home__link link2" to='/reg'>Регистрация</Link>
          </button>
        </div>
      </div>
    </div>
  )
}