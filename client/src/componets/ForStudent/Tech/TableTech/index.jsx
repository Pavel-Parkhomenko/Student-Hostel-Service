import React from 'react'

export function TableTech({ privateTechs = [] }) {
  return (
    <>
      <p className="text-muted">Личная техника</p>
      <table className="table">
        <thead>
        <tr>
          <th scope="col">№</th>
          <th scope="col">Тип</th>
          <th scope="col">Модель</th>
          <th scope="col">Заводской номер</th>
        </tr>
        </thead>
        <tbody>
        {privateTechs.map(({ model, number, type }, ind) => (
          <tr key={ind}>
            <th scope="row">{ind + 1}</th>
            <td>{type}</td>
            <td>{model}</td>
            <td>{number}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </>
  )
}