import React, { useState, useEffect }  from 'react'
import { useHistory } from 'react-router-dom';

export const Navbar = () => {
  const history = useHistory();
  const [homeClass, setHomeClass] = useState('');
  const [blogClass, setBlogClass] = useState('');

  useEffect(() => {
    if (window.location.pathname.includes('posts')) {
      setBlogClass('active');
    } else {
      setHomeClass('active');
    }
  }, []);

  const moveTo = (to) => {
    if (to.includes('posts')) {
      setBlogClass('active');
      setHomeClass('');
    } else {
      setHomeClass('active');
      setBlogClass('');
    }
    history.push(to)
  }

  return (
    <div className="header">
        <a href="#default" className="logo">Awesome Blog</a>
        <div className="header-right">
            <a style={{cursor: 'pointer'}} onClick={() => moveTo('/')} className={homeClass}>Home</a>
            <a style={{cursor: 'pointer'}} onClick={() => moveTo('/posts')}  className={blogClass}>Posts</a>
        </div>
    </div>
  )
}
