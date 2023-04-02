import React, {useContext} from 'react'
import {NewsItem} from '../NewsItem'
import {NEWS} from '../../../mocks'
import {Context} from '../../../context'
import {CreateNewsPanel} from "../CreateNewsPanel"

export function NewsPanel() {
  const {role} = useContext(Context)
  return (
    <div>
      {role === "mentor" ? <CreateNewsPanel/> : null}
      {NEWS.map(item => <NewsItem
        key={item.header}
        header={item.header}
        content={item.content}
        imgs={item.imgs}
        date={item.date}
        author={item.author}
      />)}
    </div>
  )
}