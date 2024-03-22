import React, { useState } from "react";
import Comment from "./Comment";

function Replies(props) {
  const [replies, setReplies] = useState(props.replies || []);
  return (
    <div className="reply-section-wrapper">
      {replies.length &&
        replies.map((reply) => <Comment key={reply.id} comment={reply} />)}
    </div>
  );
}

export default Replies;
