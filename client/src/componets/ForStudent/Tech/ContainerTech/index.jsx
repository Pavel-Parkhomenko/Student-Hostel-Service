import React from 'react'
import { TableTech } from "../TableTech";

const user = JSON.parse(localStorage.getItem('user'))

export function ContainerTech() {
  return (
    <div className="w-100 px-3 py-3 bg-white rounded">
      <TableTech privateTechs={user.privateTechs}/>
    </div>
  )
}