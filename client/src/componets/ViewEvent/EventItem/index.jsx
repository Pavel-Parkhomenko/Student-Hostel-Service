import React, { useEffect, useState } from 'react'
import { useHttp } from '../../../hooks'
import { URL } from '../../../constants'

export function EventItem(
  {
    header,
    description,
    img,
    dateEvent,
    placeEvent,
  }
) {
  const [url, setUrl] = useState(null)
  const {loading, request} = useHttp()

  console.log('img')
  console.log(img)

  useEffect(() => {
    async function fetchGetEventImg() {
      fetch(URL + `/event/load?img=${img}`)
        .then(response => response.blob())
        .then(blob => {
          const url = window.URL.createObjectURL(new Blob([blob]));
          setUrl(url)
        });
    }
    fetchGetEventImg()
  }, [img])

  return(
    <div className="card mb-3">
      <div className="card-header bg-transparent text-muted">
        <i className="bi bi-calendar-check text-primary fs-5 pe-2" />
        <span>Дата проведения: </span><span className="text-primary">{dateEvent}</span>
      </div>
      <div className="card-body">
        <h5 className="card-title">{header}</h5>
        <img src={url}
             className="img-thumbnail card-img-top"
             alt="card-img-top"
             style={{width: '300px'}}
        />
        <p className="card-text">{description}</p>
      </div>
      <div className="card-footer d-flex justify-content-between">
        <div className="text-muted">
          <i className="bi bi-houses-fill text-primary fs-5 pe-2" />
          <span>{placeEvent}</span>
        </div>
      </div>
    </div>
  )
}