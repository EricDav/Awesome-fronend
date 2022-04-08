import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "./posts.css"
import AddPostModal from './addPostModal'
import { fetchPosts } from '../features/posts/postSlice';
import axios from 'axios';
import { useHistory } from "react-router-dom";

export const PostsList = () => {
  useEffect(() => {
    fetchPost(1);
  }, []);
  const posts = useSelector(state => state.posts)
  const [show, setShow] = useState(false);
  const instance = axios.create({
    baseURL: 'http://localhost:4000',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
  });
  const limit = 6;
  const history = useHistory();
  const fetchPost = async (pageNumber) => {
    try {
      const response = await instance.get(`/posts?limit=${limit}&pageNumber=${pageNumber}`);
      dispatch(fetchPosts(response.data))
    } catch (err) {
      console.log(err);
    }
  }
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [successMessage, setSuccessMessage] = useState('');

  const onTitleChanged = e => setTitle(e.target.value);
  const onContentChanged = e => setContent(e.target.value);
  const dispatch = useDispatch();

  const savePost = async () => {
    try {
      if (content && title) {
        const user = JSON.parse(localStorage.getItem('currentUser'))
        const response = await instance.post('/posts', {content, title, name: user.name});
        if (response.data.success) {
          setErrorMessage('');
          setSuccessMessage('Post added successfully');
          setTimeout(() => {
            setContent('');
            setTitle('');
            setSuccessMessage('');
            setShow(false);
          }, 2000);
          await fetchPost(currentPage);
        } else {
          setErrorMessage(response.data.message);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  const goToSinglePost = (postId) => {
    history.push(`/posts/${postId}`);
  }

  const paginations = [];
  let initalTotal = posts.total;
  let count = 0;
  while (initalTotal > 0) {
    count +=1;
    paginations.push(count);
    initalTotal = initalTotal - limit;
  }

  console.log(paginations, 'Paginations.....')

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const renderedPosts = posts.data.map(post => (
        <div  
          className="card" 
          key={post.id}
          onClick={() => {
            goToSinglePost(post.id)
          }}
        >
            <h2>{post.title}</h2>
            <h5>{new Date(post.createdAt).toLocaleDateString("en-US", options)} | {post.name}</h5>
            <p>{post.content.substring(0, 100)}</p>
        </div>
  ))

  return (
    <section className="posts-list">
      <h2>All Posts</h2>
      <div className="align-left"><a className="add" onClick={() => setShow(true)}>Add post</a></div>
      <AddPostModal title="Add Post" onClose={() => setShow(false)} show={show} onSave={() => savePost()}>
      <p style={{color: '#f44336'}}>{errorMessage}</p>
      <p style={{color: '#4CAF50'}}>{successMessage}</p>
      <input 
          className="in"
          placeholder="Enter post title"
          value={title}
          onChange={onTitleChanged}
          ></input>
        <textarea 
          style={{height: 100}}
          placeholder="Enter post content"
          value={content}
          onChange={onContentChanged}
        >
        </textarea>
      </AddPostModal>
      <div className="leftcolumn">
        {renderedPosts}
      </div>
      <div className="pagination">
        <a 
          onClick={() => {
            if (currentPage > 1) {
              setCurrentPage(currentPage - 1);
              fetchPost(currentPage - 1);
            }
          }}
        >&laquo;
        </a>
        {paginations.map(num => (
          <a className={num === currentPage ? 'active': ''}
          key={num} 
          onClick={async () => {
             setCurrentPage(num);
             fetchPost(num)
          }}>{num}</a>
         ))}
        <a
          onClick={() => {
            if (currentPage < paginations.length) {
              setCurrentPage(currentPage + 1);
              fetchPost(currentPage + 1)
            }
          }}
        >
          &raquo;
          </a>
      </div>
    </section>
  )
}