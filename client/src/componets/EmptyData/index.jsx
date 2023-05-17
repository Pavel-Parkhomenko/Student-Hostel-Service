import React from 'react'
import emptyData from "../../assets/emptyData.svg";

const style = {
  minHeight: '500px',
  background: `url(${emptyData})`,
  backgroundSize: '50%',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
}

export function EmptyData({ message }) {
  return(
    <div className="bg-light p-3 rounded mt-3" style={style}>
      <p className="text-muted">{message}</p>
    </div>
  )
}