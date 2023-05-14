import React, { useEffect, useState } from 'react'
import { useHttp } from '../../../hooks'
import { SERVER } from '../../../constants'
import { Loading } from "../../Loading";
import { getDaysDifference, dateFormat } from '../../../helpers'

export function ViewPayHostel() {
  const { loading, request } = useHttp()
  const [payments, setPayments] = useState([])
  useEffect(() => {
    async function fetchPayments() {
      const { data } = await request(SERVER + '/admin/get-payments')
      setPayments(data)
    }
    fetchPayments()
  }, [])

  if(loading) return <Loading />

  return (
    <div className="bg-white rounded p-3">
      <table className="table table-striped bg-light rounded">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">ФИО</th>
          <th scope="col">Последняя оплата</th>
          <th scope="col">Прошло кол-во дней</th>
        </tr>
        </thead>
        <tbody>
        {payments.map(({ firstName, middleName, secondName, numberTest, pay}, ind) => (
          <tr key={numberTest}>
            <th scope="row">{ind + 1}</th>
            <td className="d-flex flex-column">
              <span>{secondName}</span>
              <span>{firstName}</span>
              <span>{middleName}</span>
            </td>
            {pay.length
              ?
              <>
                <td>
                  <span className="text-primary">{dateFormat(new Date(pay.at(-1).date))}</span><br/>
                  <span>{pay[0].receipt}</span>
                </td>
                {getDaysDifference(new Date(pay.at(-1).date), new Date()) > 30
                  ?
                  <td className="text-danger">
                    { getDaysDifference(new Date(pay.at(-1).date), new Date()) }
                    <i className="bi bi-exclamation-circle ms-2" /><br/>
                    <span>Задолженность</span>
                  </td>
                  :
                  <td className="text-success">
                    { getDaysDifference(new Date(pay.at(-1).date), new Date()) }
                    <i className="bi bi-check-circle ms-2"/><br/>
                    <span>Вовремя</span>
                  </td>
                }
              </>
              :
              <>
                <td>Оплаты еще не было</td>
                <td> - </td>
              </>
            }
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}