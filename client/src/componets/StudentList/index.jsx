import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { toastMess } from "../../helpers";

const FILTER_STUDENT = {
  firstName: 'Имя',
  middleName: 'Отчество',
  secondName: 'Фамилия',
  formEducation: 'Форма образования',
  faculty: 'Факультет',
  group: 'Группа',
  balls: 'Баллы',
  numberTest: 'Номер зачетки',
  floor: 'Этаж',
  block: 'Блок',
  apartament: 'Комната'
}

export function StudentList({ res, children }) {
  const [filter, setFilter] = useState('');
  const [input, setInput] = useState('');
  const [resFilter, setResFilter] = useState(res)


  if(res.length === 0) {
    return children
  }

  function handleFilter(event) {
    setFilter(event.target.value);
  }

  function handleFilterInput() {
    if(!filter || !input){
      toastMess(false, 'Фильтер или поля для поиска не заполнено')
      return
    }
    if(filter === 'floor' || filter === 'block' || filter === 'apartament') {
      const numInput = Number(input)
      if(Number.isNaN(numInput)) {
        toastMess(false, 'Неверный формат поиска')
        return
      }
      const data = res.filter(item => {
        return item.room[filter] === numInput;
      })
      setResFilter([...data])
    } else {
      const data = res.filter(item => {
        return String(item[filter]).indexOf(input) !== -1;
      })
      setResFilter([...data])
    }
  }

  return (
    <div>
      <form className="bg-light rounded p-3 mb-3">
        <div className="d-flex flex-wrap">
          {Object.keys(FILTER_STUDENT).map(item => (
            <div className="form-check me-2" key={item}>
              <input
                className="form-check-input"
                type="radio"
                name="filter" id={item}
                value={item}
                onChange={handleFilter}
              />
              <label className="form-check-label" htmlFor={item}>{FILTER_STUDENT[item]}</label>
            </div>
          ))}
        </div>
        <div className="d-flex justify-content-between my-3">
          <input
            className="form-control me-2 w-75"
            type="search"
            placeholder="Поиск"
            aria-label="Search"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <button
            className="btn btn-outline-success"
            type="button"
            onClick={handleFilterInput}
          >
            Поиск
          </button>
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => setResFilter([...res])}
          >
            Показать всех
          </button>
        </div>
      </form>
      <table className="table table-striped bg-light rounded">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Фамилия</th>
          <th scope="col">Имя</th>
          <th scope="col">Отчество</th>
          <th scope="col">Факультет/Группа</th>
          <th scope="col">Комната</th>
          <th scope="col"></th>
        </tr>
        </thead>
        <tbody>
        {resFilter.map(({ firstName, middleName, secondName, numberTest, room, faculty, group}, ind) => (
          <tr key={numberTest}>
            <th scope="row">{ind + 1}</th>
            <td>{secondName}</td>
            <td>{firstName}</td>
            <td>{middleName}</td>
            <td>{faculty} / {group}</td>
            <td>{room.floor}-{room.block}-{room.apartament}</td>
            <td><Link to={`${numberTest}`}>
              <i className="bi bi-file-text"></i>
            </Link></td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}