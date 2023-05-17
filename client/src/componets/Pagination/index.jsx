import React, { useEffect, useState } from 'react'
import { CNT_ITEM } from '../../constants'

export function Pagination({ cntItems, onClick }) {
  const [cntButtons, setCntButtons] = useState(0)

  useEffect(() => {
    setCntButtons(Math.ceil(cntItems / CNT_ITEM))
  }, [cntItems])

  return (
    <div className="d-flex justify-content-center">
      <nav aria-label="Page navigation">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">«</span>
            </a>
          </li>
          {new Array(cntButtons).fill(0).map((_, ind) =>(
            <li
              className="page-item"
              key={ind}
              style={{cursor: 'pointer'}}
              onClick={() => onClick(ind + 1)}
            >
              <a className="page-link">{ind + 1}</a>
            </li>
          ))}
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">»</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}