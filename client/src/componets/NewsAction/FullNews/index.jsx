import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useHttp } from "../../../hooks";
import { URL } from "../../../constants";

export function FullNews() {

  const [news, setNews] = useState({})
  const {loading, request} = useHttp();
  const { id } = useParams();

  useEffect(() => {
    async function fetchGetNews() {
      const {data, message } = await request(URL + `/news/get-news-id?id=${id}`, 'GET')
      const requests = data.body.map(item => fetch(URL + `/news/load?img=${item.img}`))
      const responses = await Promise.all(requests);
      const blobs = responses.map(item => item.blob())
      const imgs = await Promise.all(blobs);
      imgs.forEach((img, ind) => {
        data.body[ind].img = window.URL.createObjectURL(new Blob([img]))
      })
      setNews({...data})
    }
    fetchGetNews()
  }, [])

  return (
    <div className="card mb-3">
      {news?.body?.map(({ header, description, img }) => (
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{header}</h5>
          <img src={img} className="img-thumbnail card-img-top w-50" alt="card-img-top" />
          <p className="card-text d-inline">{description}</p>
        </div>
      ))}
    </div>
  )
}