import React, { useEffect, useState } from 'react'
import { NewsItem } from '../NewsItem'
import { useHttp } from "../../../hooks"
import { SERVER, CNT_ITEM } from "../../../constants"
import { Loading } from "../../Loading";
import { Pagination } from "../../Pagination";

export function NewsPanel() {
  const [news, setNews] = useState([])
  const [newsSlicePage, setNewsSlicePage] = useState([])
  const {loading, request} = useHttp();

  useEffect(() => {
    async function fetchGetNews() {
      const { data } = await request(SERVER + '/news/get-news', 'GET')
      setNews([...data.reverse()])
      setNewsSlicePage([...data.slice(0, CNT_ITEM)])
    }
    fetchGetNews()
  }, [])

  function handlePagination(num) {
    const newsSlice = news.slice(((num - 1) * CNT_ITEM), ((num - 1) * CNT_ITEM) + CNT_ITEM)
    setNewsSlicePage([...newsSlice])
  }

  if(loading) return <Loading />

  return (
    <>
      <div className="d-flex flex-wrap">
        {newsSlicePage.map((item) => <NewsItem
          id={item._id}
          key={item._id}
          header={item.body[0].header}
          content={item.body[0].description}
          img={item.body[0].img}
          date={item.dateCreate}
          author={item.mentor}
        />)}
      </div>
      <Pagination onClick={handlePagination} cntItems={news.length}/>
    </>
  )
}