import React from 'react'

const privateTechs = [{
  model: "Test",
  number: "12RT124",
  type: "Холодильник",
},{
  model: "Test",
  number: "12RT124",
  type: "Холодильник",
}]

export function ContainerTech() {
  return (
    <div className="w-100 px-3 py-3 bg-white rounded">
      <div className="d-flex flex-column w-100">
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
            <tr>
              <th scope="row">{ind + 1}</th>
              <td>{type}</td>
              <td>{model}</td>
              <td>{number}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}