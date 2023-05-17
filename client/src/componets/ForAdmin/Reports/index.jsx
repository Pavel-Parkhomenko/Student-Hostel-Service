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

  async function handleReportPays() {
    const response = await fetch('http://localhost:5000/admin/report-pays')
    if(response.ok) {
      toastMess(true, 'Отчет успешно создан')
      reportDownload(response, 'pays')
    }
    else toastMess(false, 'Ошибка при создании отчета')
  }

  return (
    <div className='p-3 bg-white rounded min-vh-100'>
      <div>
        <p>1. Отчет по количеству баллов</p>
        <p className="text-muted">Отчет представлет собой файл формата Excel</p>
        <button
          className="btn btn-primary mt-2"
          onClick={handleReportBalls}
        >
          Получить
        </button>
      </div>
      <div className="mt-3">
        <p>2. Отчет по оплате</p>
        <p className="text-muted">Отчет представлет собой файл формата Excel</p>
        <button
          className="btn btn-primary mt-2"
          onClick={handleReportPays}
        >
          Получить
        </button>
      </div>
    </div>
  )
}