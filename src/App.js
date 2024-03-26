import "./App.css";
import data from "./assets/data.json";
import { useState } from "react";
import CommentBox from "./components/CommentBox";
import Comment from "components/Comment";
import {
  getLocalComments,
  setLocalComments,
  getCurrentUser,
} from "./model/Comments";

function App() {
  data.comments = data.comments.sort((b, a) => a.score - b.score);

  const localComments = getLocalComments();
  const currentUser = getCurrentUser();

  const [comments, setComments] = useState(localComments);

  const updateCommentPosition = (comment) => {
    comments.forEach((item, index) => {
      if (item.id === comment.id) {
        comments.splice(index, 1, comment);
      }
    });
    let sortedComments = comments.sort((a, b) => b.score - a.score);
    setComments([...sortedComments]);
    setLocalComments(comments);
  };

  const addComment = (newComment) => {
    comments.push(newComment);
    setComments([...comments]);
    setLocalComments(comments);
  };

  const updateComment = (comment) => {
    comments.forEach((item, index) => {
      if (item.id === comment.id) {
        comments.splice(index, 1, comment);
      }
    });
    setComments([...comments]);
    setLocalComments(comments);
  };

  const deleteComment = (comment) => {
    let tempComments = comments.filter((item) => item.id !== comment.id);
    setComments([...tempComments]);
    setLocalComments(tempComments);
    window.alert(`Deleted:${comment.content} by @${comment.user.username}`);
  };

  const deleteReply = (comments, reply) => {
    console.log(comments);
    for (let item of comments) {
      if (!item.replies || !item.replies.length) continue;
      for (let i = 0; i < item.replies.length; i++) {
        let tempReply = item.replies[i];
        if (tempReply.id === reply.id) {
          item.replies.splice(i, 1);
          return true;
        }
      }
      if (deleteReply(item.replies, reply)) return true;
    }
    return false;
  };

  const handleDeleteReply = (reply) => {
    if (!deleteReply(comments, reply)) {
      alert("Failed to delete the reply");
      return;
    }
    setComments([...comments]);
    setLocalComments(comments);
    alert(`Reply is deleted: ${reply.content} by @${reply.user.username}`);
  };

  return (
    <div className="App container h-screen w-screen mx-auto flex flex-col py-4 items-center justify-center">
      <div
        id="comment-section-wrapper"
        className="w-[90%] h-max-[560px] flex flex-col overflow-y-scroll mx-auto items-end"
      >
        {comments.map((comment, index) => (
          <Comment
            key={comment.id}
            comment={comment}
            position={index}
            updateCommentPosition={updateCommentPosition}
            updateComment={updateComment}
            deleteComment={deleteComment}
            deleteReply={handleDeleteReply}
            currentUser={currentUser}
          />
        ))}
      </div>
      <div id="comment-box-wrapper" className="w-[90%] mt-3">
        <CommentBox
          comments={comments}
          currentUser={currentUser}
          submitHandler={addComment}
        />
      </div>
    </div>
  );
}

export default App;
