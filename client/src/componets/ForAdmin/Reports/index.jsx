import React from 'react'
import { toastMess, reportDownload } from '../../../helpers'

export function Reports() {
  async function handleReportBalls() {
    const response = await fetch('http://localhost:5000/admin/report-balls')
    if(response.ok) {
      toastMess(true, 'Отчет успешно создан')
      reportDownload(response, 'balls')
    }
    else toastMess(false, 'Ошибка при создании отчета')
  }

  return (
    <div className='p-3 bg-white rounded'>
      <div>
        <p>Отчет по количеству баллов</p>
        <button
          className="btn btn-primary mt-3"
          onClick={handleReportBalls}
        >
          Получить
        </button>
      </div>
    </div>
  )
}