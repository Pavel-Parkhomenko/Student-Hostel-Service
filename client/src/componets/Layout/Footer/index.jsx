import React from 'react'

export function Footer() {
  return (
    <footer className="text-center text-lg-start bg-white text-muted mt-3">
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span>Разработано специально для Гомельского Государственного Университета имени П.О.Сухого</span>
        </div>
      </section>
      <section className="">
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                Автоматизированная система
              </h6>
              <p>
                Данная ситема предназначена для управления студенческим общежитием
              </p>
            </div>
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Совмещает</h6>
              <p>Воспитателей</p>
              <p>Студентов</p>
              <p>Коменданта</p>
            </div>
            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Ссылки</h6>
              <p><a href="#" className="text-reset">Сайт ГГТУ</a></p>
              <p><a href="#" className="text-reset">Личный кабинет</a></p>
              <p><a href="#" className="text-reset">Нужен сайт?</a></p>
            </div>
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Контакты</h6>
              <p>Гомель</p>
              <p>info@example.com</p>
              <p>+375 29 5722974</p>
            </div>
          </div>
        </div>
      </section>
      <div className="text-center p-4" style={{backgroundColor: "rgba(0, 0, 0, 0.025)"}}>
        Все права защищены. Распространение только по лицензии
      </div>
    </footer>
  )
}