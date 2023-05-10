import React, { useEffect, useState } from 'react'
import { NewsItem } from '../NewsItem'
import { useHttp } from "../../../hooks"
import { URL } from "../../../constants"
import { Loading } from "../../Loading";

export function NewsPanel() {
  const [news, setNews] = useState([])
  const {loading, request} = useHttp();

  useEffect(() => {
    async function fetchGetNews() {
      const {data } = await request(URL + '/news/get-news', 'GET')
      setNews([...data])
    }
    fetchGetNews()
  }, [])

  if(loading) return <Loading />

  return (
    <div>
      {news.map((item) => <NewsItem
        id={item._id}
        key={item._id}
        header={item.body[0].header}
        content={item.body[0].description}
        img={item.body[0].img}
        date={item.dateCreate}
        author={item.mentor}
      />)}
    </div>
  )
}