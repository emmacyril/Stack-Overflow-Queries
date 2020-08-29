import React from 'react';
import './Posts.css';

const posts = (props) => (
    <div className="posts" onClick={props.popup}>
        <h4>Title: {props.title}</h4>
        <p>Author: {props.author} | Created on: {props.createDate}</p>
    </div>
);

export default posts;