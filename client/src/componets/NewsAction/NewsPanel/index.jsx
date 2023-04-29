import React, { useEffect, useState } from 'react'
import { NewsItem } from '../NewsItem'
import { NEWS } from '../../../mocks'
import { useHttp } from "../../../hooks"
import { URL } from "../../../constants"

export function NewsPanel() {
  const [news, setNews] = useState([])
  const {loading, request} = useHttp();

  useEffect(() => {
    async function fetchGetNews() {
      const {data, message } = await request(URL + '/news/get-news', 'GET')
      setNews([...data])
      console.log(data)
    }
    fetchGetNews()
  }, [])

  return (
    <div>
      {news.map((item) => <NewsItem
        id={item._id}
        key={item.body[0].header}
        header={item.body[0].header}
        content={item.body[0].description}
        img={item.body[0].img}
        date={item.dateCreate}
        author={item.mentor}
      />)}
    </div>
  )
}