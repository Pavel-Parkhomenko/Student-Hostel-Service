import React, { useMemo, useState, useEffect } from 'react'
import formEducationImg from '../../../assets/formEducation.png'
import { PAY_HOSTEL_FORM } from "../../../mocks"
import { SimpleForm } from "../../SimpleForm"
import { useHttp } from '../../../hooks'
import { SERVER } from '../../../constants'
import { toastMess, dateFormat, getDaysDifference, paymentHelp, sumHostelStudent } from "../../../helpers"

export function PayHostel() {
  const user = useMemo(() => JSON.parse(localStorage.getItem('user')), [])
  const [payments, setPayments] = useState(user.pay || [])
  const [paysState, setPaysState] = useState({})

  const [form, setForm] = useState({
    receipt: '',
    payment: ''
  })

  const { request } = useHttp()

  useEffect(() => {
    const fetchData = async () => {
      console.log('fetchData')
      const { data } = await request(SERVER + '/student/get-pay', 'POST', {
        numberTest: user.numberTest
      })
      setPaysState(data) //pays/ sumHostel/ curPay
      setPayments(data.pays.reverse())
    }
    fetchData()
  }, [])

  function handleInput(event) {
    setForm({...form, [event.target.name]: event.target.value})
  }

  async function handleClick(event) {
    event.preventDefault()
    const { message, status } = await request(SERVER + '/student/pay-hostel', 'POST', {
      numberTest: user.numberTest,
      receipt: form.receipt,
      payment: form.payment
    })
    toastMess(status, message)
    if(status) {
      setPayments([{
        date: String(new Date()),
        receipt: form.receipt,
        payment: Number(form.payment)
      }, ...payments])
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
        {Object.keys(paysState).length !== 0
          ?
          <div>
            <p>{paymentHelp(user.dateInHostel, paysState.sumHostel, sumHostelStudent(payments))}</p>
            <p>Оплаченно всего: {sumHostelStudent(payments)} (BYN)</p>
          </div>
          :
          <p>Загрузка...</p>
        }
      </div>
      <div className="mt-3">
        <p>Текущая стоимость проживания: <span>{paysState?.curPay} (BYN)</span></p>
        <p>История оплаты</p>
        {payments.map((item, ind) => (
          <div key={ind}>
            <span>{ind + 1}.</span>
            <span className="mx-3">{item.payment} (BYN)</span>
            <span className="text-primary">{dateFormat(new Date(item.date))}</span>
            { ind === 0 ? <span className="mx-2 text-warning">Последняя оплата</span> : null}
          </div>
        ))}
      </div>
    </div>
  )
}