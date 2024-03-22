import "./App.css";
import data from "./assets/data.json";
import { useState } from "react";
import CommentBox from "./components/CommentBox";
import Comment from "components/Comment";
import { getLocalComments, setLocalComments } from './model/Comments.js';

function App() {
  data.comments = data.comments.sort((b, a) => a.score - b.score);

  const localComments = getLocalComments();

  const [comments, setComments] = useState(localComments.comments);
  const { currentUser } = localComments;

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

  return (
    <div className="App container h-screen w-screen mx-auto flex flex-col py-4 items-center justify-center">
      <div
        id="comment-section-wrapper"
        className="w-[90%] h-max-[560px] flex flex-col overflow-y-scroll mx-auto"
      >
        {comments.map((comment, index) => (
          <Comment
            key={comment.id}
            comment={comment}
            position={index}
            updateCommentPosition={updateCommentPosition}
            updateComment={updateComment}
            currentUser={currentUser}
          />
        ))}
      </div>
      <CommentBox
        comments={comments}
        currentUser={currentUser}
        addComment={addComment}
      />
    </div>
  );
}

export default App;
