import React from "react";

const Comment = prop => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(prop.date);
    const formatedDate = date.toLocaleDateString("en-US", options) + ' At ' + date.toLocaleString('en-US', { hour: 'numeric', hour12: true });
    return (
        <section style={{marginLeft: `${prop.left.toString()}px`}} className="user-container">
        <div className="user-info">
            <img src="https://www.computerhope.com/jargon/g/guest-user.jpg" alt="" className="user-img" />
            <div className="user-details">
            <span className="user-name">{prop.name}</span>
            <p className="date">{formatedDate}</p>
            </div>
        </div>
        <div className="user-post">
            {prop.content}
        </div>
        <div onClick={prop.reply} className="user-response">Reply</div>
    </section>
    )
}

export default Comment;
