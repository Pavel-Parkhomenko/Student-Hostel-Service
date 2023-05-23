import React, { useState } from 'react'
import { useHttp } from "../../../hooks";
import { SERVER } from "../../../constants";
import { useParams } from 'react-router-dom'
import { dateFormat, toastMess } from '../../../helpers'
import { BallsView } from "../../BallsView";
import { BALLS } from '../../../mocks'

export function ChangeBalls() {
  const { request } = useHttp();
  const { id } = useParams()
  const [category, setCategory] = useState(null)
  const [balls, setBalls] = useState('')

  function handleTable(event) {
    setCategory({ ...BALLS[event.target.value] })
  }

  async function handleChangeBalls() {
    const { message, status } = await request(SERVER + '/mentor//update-balls-v2', "POST", {
      numberTest: id,
      num: balls,
      summary: category.summary
    })
    toastMess(status, message)
  }

  return(
    <div>
      <div className="bg-light rounded mb-3 p-3">
        {
          category
          ?
            <div>
              <p>
                <span>{category.summary}</span><br/>
                <span>{category.num} баллов</span>
              </p>
              <input
                type="string"
                className="form-control w-25"
                id="formControlInputBalls"
                placeholder={category.num}
                value={balls}
                onChange={(event) => setBalls(event.target.value)}
              />
              <button type="button" className="btn btn-primary mt-3" onClick={handleChangeBalls}>
                Сохранить
              </button>
            </div>
          :
          <p>Выберите категорию</p>
        }
      </div>
      <BallsView onClick={handleTable}/>
    </div>
  )
}