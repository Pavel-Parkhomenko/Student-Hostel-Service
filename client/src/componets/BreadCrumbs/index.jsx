import React from 'react'
import useBreadcrumbs from "use-react-router-breadcrumbs"
import { NavLink } from 'react-router-dom'

export function BreadCrumbs({ routes }) {
  const breadcrumbs = useBreadcrumbs(routes);
  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          {breadcrumbs.map(({match, breadcrumb}, ind) => (
            <NavLink
              key={match.pathname}
              className="breadcrumb-item text-decoration-none"
              style={match.pathname === '/' ? {
                pointerEvents: "none", color: "gray"
              } : {fontWeight: 'bold'}}
              to={match.pathname}>
              {breadcrumb}
            </NavLink>
          ))}
        </ol>
      </nav>
    </>
  )
}