import React, { useEffect, useState } from 'react'
import { useHttp } from '../../../hooks'
import { CNT_ITEM, SERVER } from '../../../constants'
import { EventItem } from "../EventItem"
import { Loading } from '../../Loading'
import { Pagination } from "../../Pagination";

export function EventPanel() {
  const [events, setEvents] = useState([])
  const { request, loading } = useHttp()
  const [eventSlicePage, setEventSlicePage] = useState([])

  useEffect(() => {
    const getEvents = async () => {
      const { data } = await request(SERVER + '/event/get-events')
      setEvents([...data.reverse()])
      setEventSlicePage([...data.slice(0, CNT_ITEM)])
    }
    getEvents()
  }, [])

  function handlePagination(num) {
    const eventsSlice = events.slice(((num - 1) * CNT_ITEM), ((num - 1) * CNT_ITEM) + CNT_ITEM)
    setEventSlicePage([...eventsSlice])
  }

  if(loading) return <Loading />

  return(
    <>
      <div className="d-flex flex-wrap">
        {events.map((item) => <EventItem
          key={item._id}
          header={item.header}
          description={item.description}
          img={item.img}
          dateEvent={item.dateEvent}
          placeEvent={item.placeEvent}
        />)}
      </div>
      <Pagination onClick={handlePagination} cntItems={events.length}/>
    </>
  )
}