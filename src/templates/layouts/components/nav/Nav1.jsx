import React from 'react'
import { Link } from 'react-router-dom'
// import './nav.css'

const items = [
  {
    name: "home",
    path: "/",
  },
  {
    name: "about",
    path: "/",
  },
  {
    name: "cursos",
    path: "/",
  },
  {
    name: "blog",
    path: "/",
  }, 
  {
    name: "contactos",
    path: "/",
  },
];

export const Nav1 = () => {
    return (
        <div className="_nav1">
        <input type="checkbox"/>
          <span></span>
          <span></span>
          <div className="_nv1_menu">
            {
              items.map((item) =><li><Link to={item.path}>{item.name}</Link></li>)
            }
          </div>
      </div>
    )
}
