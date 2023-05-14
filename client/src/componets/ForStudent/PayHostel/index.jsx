import React, { useMemo, useState } from 'react'
import formEducationImg from '../../../assets/formEducation.png'
import { PAY_HOSTEL_FORM } from "../../../mocks"
import { SimpleForm } from "../../SimpleForm"
import { useHttp } from '../../../hooks'
import { SERVER } from '../../../constants'
import { toastMess, dateFormat, getDaysDifference } from "../../../helpers"

export function PayHostel() {
  const user = useMemo(() => JSON.parse(localStorage.getItem('user')), [])
  const [payments, setPayments] = useState(user.pay || [])

  const [form, setForm] = useState({
    receipt: '',
  })

  const { request } = useHttp()

  function handleInput(event) {
    setForm({...form, [event.target.name]: event.target.value})
  }

  async function handleClick(event) {
    event.preventDefault()
    const { message, status } = await request(SERVER + '/student/pay-hostel', 'POST', {
      numberTest: user.numberTest,
      receipt: form.receipt,
    })
    toastMess(status, message)
    if(status) {
      setPayments([...payments, {
        date: new Date(),
        receipt: form.receipt,
      }])
    }
  }

  if(user.formEducation === 'бесплатное') {
    return (
      <div className="bg-light p-3 rounded min-vh-100">
        <p className="text-muted">Отчет о обплате за проживание в общежитии доступен только для студентов,
          которые обучаются на платной основе</p>
        <img alt="edu-img" src={formEducationImg} />
      </div>
    )
  }

  return(
    <div className="bg-light p-3 rounded min-vh-100">
      <p>
        <span className="text-muted">Дата и время</span> {dateFormat()}
      </p>
      <SimpleForm
        fields={PAY_HOSTEL_FORM}
        onChange={handleInput}
        onClick={(event) => handleClick(event)}
        buttonName="Сохранить"
        errors={null}
        messFromServer={''}
      />
      <div className="mt-3">
        {
          payments[0]?.date
            ?
            getDaysDifference(new Date(payments.at(-1).date), new Date()) > 30
              ?
              <p className="text-danger">У вас имеется задолженность</p>
              :
              <p className="text-success">Задолженность отсутсвует</p>
            :
            <p className="text-warning">Вы еще не производили оплату</p>
        }
      </div>
      <div className="mt-3">
        <p>История оплаты</p>
        {payments.map((item, ind) => (
          <div key={ind}>
            <span>{ind + 1}.</span>
            <span className="mx-3">{item.receipt}</span>
            <span className="text-primary">{dateFormat(new Date(item.date))}</span>
            { ind === payments.length - 1 ? <span className="mx-2 text-warning">Последняя оплата</span> : null}
          </div>
        ))}
      </div>
    </div>
  )
}