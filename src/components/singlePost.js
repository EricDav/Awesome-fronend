import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./singlePost.css";
import Comment  from './comment';

export const SinglePost = () => {
    const instance = axios.create({
        baseURL: 'https://awesome-blog1.herokuapp.com',
        timeout: 10000,
    });

    const { postId } = useParams();

    const [post, setPost] = useState({});
    const [content, setContent] = useState('');
    const [name, setName] = useState('');
    const [commentId, setCommentId] = useState('');

    const onContentChanged = e => setContent(e.target.value);
    const onNameChanged = e => setName(e.target.value);

    const fetchPost = async () => {
        try {
          const response = await instance.get(`/posts/${postId}`);
          const flat = []

          response.data.data.comments.forEach((comment) => {
            flattenComment(comment, flat, 1);
          })

          response.data.data.flattenedComments = flat;
          setPost(response.data.data);
        } catch (err) {
          console.log(err);
        }
    }

    const replyComment = (commentId) => {
        setCommentId(commentId);
        window.scrollTo(20, 0);
    }

    const saveComment = async () => {
        try {
            if (content && name) {
                const data = {content, name, postId};

                if (commentId) {
                    data.commentId = commentId;
                }
                const response = await instance.post(`/comments`, data);
                if (response.data.success) {
                    setContent('')
                    setName('');
                    fetchPost();
                    alert('Comment added successfully');
                }
            }
        } catch (err) {
            alert(err.message);
        }
    }

    const flattenComment = (comment, flattenedComments, stage) => {
        comment.stage = stage;
        flattenedComments.push(comment);

        if (!comment.replies) return

        comment.replies.forEach((comm) => {
            flattenComment(comm, flattenedComments, stage + 1);
        });
    }
    useEffect(() => {
        fetchPost();
    }, []);

    return (
        <section className="posts-list list">
            <h2>{post.title}</h2>
            <p className="blog-content">{post && post.content}</p>
            <div className="comment">
                <h3>Add a Comment</h3>
                <input value={name} onChange={onNameChanged} placeholder="Name" type="text"></input>
                <textarea value={content} onChange={onContentChanged} placeholder="Comment"></textarea>
                <button onClick={saveComment}>Submit</button>
            </div>
            {post.flattenedComments && post.flattenedComments.map((comment, index) => (
                <Comment
                    key = {index}
                    name={comment.name}
                    content={comment.content}
                    left={(comment.stage - 1) * 40}
                    date={comment.createdAt}
                    reply={() => replyComment(comment.id)}
                ></Comment>
            ))}
        </section>
        
    )
}