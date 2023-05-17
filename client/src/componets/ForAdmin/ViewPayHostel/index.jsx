import React, { useEffect, useState } from 'react'
import { useHttp } from '../../../hooks'
import { SERVER } from '../../../constants'
import { Loading } from "../../Loading"
import { dateFormat, paymentHelp, fullSumHostel } from '../../../helpers'

export function ViewPayHostel() {
  const { loading, request } = useHttp()
  const [payments, setPayments] = useState([])
  const [sumHostel, setSumHostel] = useState([])
  useEffect(() => {
    async function fetchPayments() {
      const { data } = await request(SERVER + '/admin/get-payments')
      setPayments(data.studentsNew)
      setSumHostel(data.sumHostel)
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
          <th scope="col">Статус</th>
        </tr>
        </thead>
        <tbody>
        {payments.map(({ firstName, middleName, secondName, numberTest, pay, dateInHostel, sum}, ind) => (
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
                </td>
                <td>
                  {paymentHelp(dateInHostel, sumHostel, sum)}
                </td>
              </>
              :
              <>
                <td>Оплаты еще не было</td>
                <td>
                  <span className="text-danger">Задолженность {fullSumHostel(sumHostel)} BYN</span>
                </td>
              </>
            }
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}