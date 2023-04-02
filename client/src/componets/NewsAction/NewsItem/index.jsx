import React from 'react'
import {useParams} from 'react-router-dom'

export function NewsItem({
                           header,
                           content,
                           imgs,
                           date,
                           author
                         }) {
  const params = useParams();

  return (
    <div className="card mb-3">
      <img src={imgs[0]} className="img-thumbnail card-img-top" alt="card-img-top"/>
      <div className="card-body">
        <h5 className="card-title">{header}</h5>
        <p className="card-text d-inline">{content[0]}</p>
        <span className="ms-2 text-decoration-underline">Прочитать новость полностью</span>
        <div className="d-flex justify-content-between">
          <p className="card-text">
            <i className="bi bi-calendar-event"></i>
            <small className="text-muted ms-1">{date}</small>
          </p>
          <p className="card-text">
            <i className="bi bi-person-circle"></i>
            <small className="text-muted ms-1">{author}</small>
          </p>
        </div>
      </div>
    </div>
  )
}