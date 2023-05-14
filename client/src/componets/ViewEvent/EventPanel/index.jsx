import React, { useEffect, useState } from 'react'
import { useHttp } from '../../../hooks'
import { SERVER } from '../../../constants'
import { EventItem } from "../EventItem"
import { Loading } from '../../Loading'

export function EventPanel() {
  const [events, setEvents] = useState([])
  const { request, loading } = useHttp()

  useEffect(() => {
    const getEvents = async () => {
      const { data } = await request(SERVER + '/event/get-events')
      setEvents([...data])
    }
    getEvents()
  }, [])

  if(loading) return <Loading />

  return(
    <div>
      {events.map((item) => <EventItem
        key={item._id}
        header={item.header}
        description={item.description}
        img={item.img}
        dateEvent={item.dateEvent}
        placeEvent={item.placeEvent}
      />)}
    </div>
  )
}