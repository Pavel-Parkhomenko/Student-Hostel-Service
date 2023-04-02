import React from 'react'
import {Link} from 'react-router-dom'

export function CreateNewsPanel() {
  return (
    <div className="my-3 bg-info p-2 rounded">
      <Link to="create">
        <i className="bi bi-file-earmark-plus text-light fs-5 me-2"/>
        <span className="text-muted">Создать <span className="mark rounded">новую</span> новость</span>
      </Link>
    </div>
  )
}