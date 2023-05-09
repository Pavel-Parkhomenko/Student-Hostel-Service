import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { URL } from "../../../constants"

export function NewsItem (
  {
    id,
    header,
    content,
    img,
    date,
    author
  }) {
  const [url, setUrl] = useState([])

  useEffect(() => {
    async function fetchGetNewsImg() {
      fetch(URL + `/news/load?img=${img}`)
        .then(response => response.blob())
        .then(blob => {
          const url = window.URL.createObjectURL(new Blob([blob]));
          setUrl(url)
        });
    }
    fetchGetNewsImg()
  }, [img])

  return (
    <div className="card mb-3">
      <div className="m-3 d-flex justify-content-center">
        <img src={url}
             className="card-img-top"
             alt="card-img-top"
             style={{width: '300px'}}
        />
      </div>
      <div className="card-body">
        <h5 className="card-title">{header}</h5>
        <p className="card-text d-inline">{content}</p>
        <Link className="ms-2 text-decoration-underline" to={`${id}`}>Прочитать новость полностью</Link>
        <div className="d-flex justify-content-between mt-3">
          <p className="card-text">
            <i className="bi bi-calendar-event text-primary"></i>
            <small className="text-muted ms-1">{date}</small>
          </p>
          <p className="card-text">
            <i className="bi bi-person-circle text-primary"></i>
            <small className="text-muted ms-1">
              {author.firstName} {author.secondName}
            </small>
          </p>
        </div>
      </div>
    </div>
  )
}