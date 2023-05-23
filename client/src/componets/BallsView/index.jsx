import React from 'react'
import { dateFormat } from "../../helpers";
import { BALLS } from '../../mocks'

export function BallsView({ onClick }) {
  return (
    <table className="table table-striped bg-light rounded">
      <thead>
      <tr>
        <th scope="col"><strong>п/п</strong></th>
        <th scope="col"></th>
        <th scope="col"><strong>Деятельность, повышающая и понижающая рейтинг</strong></th>
        <th scope="col"><strong>Кол-во баллов</strong></th>
      </tr>
      </thead>
      <tbody>
      { BALLS.map((item, ind) => (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>
            <input
            className="form-check-input"
            type="radio"
            name="category"
            value={ind}
            onChange={onClick}
            id={item.id}/>
          </td>
          <td>{item.summary}</td>
          <td>{item.num}</td>
        </tr>
      )) }
      </tbody>
    </table>
  )
}