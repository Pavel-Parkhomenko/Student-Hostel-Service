import React, { useEffect, useState } from 'react'
import { SERVER } from '../../../constants'
import { useHttp } from '../../../hooks'
import { toastMess } from "../../../helpers";
import { Loading } from "../../Loading";
import { BallsView } from "../../BallsView";
import { BALLS } from "../../../mocks";

export function BallsInfo() {
  const { loading, request } = useHttp()
  const [res, setRes] = useState({
    balls: 0,
    ballsInfo: []
  })

  useEffect(() => {
    async function fetchData() {
      const numberTest = JSON.parse(localStorage.getItem('user')).numberTest
      const { data, message, status } = await request(SERVER + '/student/get-balls', 'POST', {
        numberTest
      })
      setRes(data)
      toastMess(status, message)
    }
    fetchData()
  }, [])

  if(loading) return <Loading/>

  return (
    <div>
      <div className="bg-light rounded p-3">
        <p>Количество баллов: <span>{res.balls}</span></p>
        <span>История начисления баллов:</span>
        <table className="table table-striped bg-light rounded">
          <thead>
          <tr>
            <th scope="col"><strong>№</strong></th>
            <th scope="col"><strong>Деятельность</strong></th>
            <th scope="col"><strong>Кол-во баллов</strong></th>
          </tr>
          </thead>
          <tbody>
          {res.ballsInfo?.map((item, ind) => (
            <tr key={item.id}>
              <td>{ind + 1}</td>
              <td>{item.summary}</td>
              <td>{item.num}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
      <div className="bg-light rounded mt-3 p-3">
        <p>Рейтинговая система для определения приоритетности заселения в общежитие университета</p>
        <table className="table table-striped">
          <thead>
          <tr>
            <th scope="col"><strong>п/п</strong></th>
            <th scope="col"><strong>Деятельность, повышающая и понижающая рейтинг</strong></th>
            <th scope="col"><strong>Кол-во баллов</strong></th>
          </tr>
          </thead>
          <tbody>
          { BALLS.map((item, ind) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.summary}</td>
              <td>{item.num}</td>
            </tr>
          )) }
          </tbody>
        </table>
      </div>
    </div>
  )
}