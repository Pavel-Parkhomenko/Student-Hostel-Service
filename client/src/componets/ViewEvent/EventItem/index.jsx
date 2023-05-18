import React, { useEffect, useState } from 'react'
import { useHttp } from '../../../hooks'
import { SERVER } from '../../../constants'

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

  useEffect(() => {
    async function fetchGetEventImg() {
      fetch(SERVER + `/event/load?img=${img}`)
        .then(response => response.blob())
        .then(blob => {
          const url = window.URL.createObjectURL(new Blob([blob]));
          setUrl(url)
        });
    }
    fetchGetEventImg()
  }, [img])

  return(
    <div className="card mb-3 me-3" style={{width: '47%'}}>
      <div className="card-header bg-transparent text-muted">
        <i className="bi bi-calendar-check text-primary fs-5 pe-2" />
        <span>Дата проведения: </span><span className="text-primary">{dateEvent}</span>
      </div>
      <div className="card-body">
        <h5 className="card-title">{header}</h5>
        <div className="m-4 d-flex justify-content-center">
          <img src={url}
               className="card-img-top"
               alt="card-img-top"
               style={{maxWidth: '400px'}}
          />
        </div>
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