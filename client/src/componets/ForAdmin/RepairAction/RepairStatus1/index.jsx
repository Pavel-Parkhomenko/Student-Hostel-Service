import React from 'react'
import { useHttp } from '../../../../hooks'
import { SERVER } from '../../../../constants'
import { toastMess } from '../../../../helpers'

export function RepairStatus1({ idRepair, run = {} }) {
  const { request } = useHttp()
  async function handleSubmit() {
    const { message, status } = await request(SERVER + '/repair/change-status-to-2', 'POST', {
      id: idRepair
    })
    toastMess(status, message)
  }

  return (
    <div>
      <div>
        <div>
          <span className="text-muted">Mастер</span>
          <span className="mx-3">{run?.master || ''}</span>
        </div>
        <div>
          <span className="text-muted">Дата и время</span>
          <span className="mx-3">{run?.date || ''}</span>
        </div>
      </div>
      <button className="btn btn-primary mt-3"
              onClick={handleSubmit}
      >Завершить</button>
    </div>
  )
}