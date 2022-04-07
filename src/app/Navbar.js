import React from 'react'

export const Navbar = () => {
  return (
    <div className="header">
        <a href="#default" className="logo">Awesome Blog</a>
        <div className="header-right">
            <a className="active">Home</a>
            <a>Blogs</a>
        </div>
    </div>
  )
}
