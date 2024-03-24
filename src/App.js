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
