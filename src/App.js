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
import Modal from "components/ui/Modal";

function App() {
  data.comments = data.comments.sort((b, a) => a.score - b.score);

  const localComments = getLocalComments();
  const currentUser = getCurrentUser();

  const [comments, setComments] = useState(localComments);
  const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);

  const updateComment = (comment) => {
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

  const deleteReply = (comments, reply) => {
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

  const deleteItem = () => {
    if (commentToDelete.replyingTo) {
      if (!deleteReply(comments, commentToDelete)) {
        setShowModal(false);
        alert("Failed to delete the reply");
        return;
      }
      setComments([...comments]);
      setLocalComments(comments);
      alert("Reply deleted");
    } else {
      for (let i = 0; i < comments.length; i++) {
        if (comments[i].id === commentToDelete.id) {
          comments.splice(i, 1);
          setComments([...comments]);
          setLocalComments(comments);
          setShowModal(false);
          alert("Comment deleted");
          return;
        }
      }
      alert("failed to delete the comment");
    }
    setShowModal(false);
  };

  const handleDeleteComment = (comment) => {
    setCommentToDelete(comment);
    setShowModal(true);
  };

  return (
    <div className="App container h-screen w-screen mx-auto flex flex-col py-4 items-center justify-center">
      <Modal
        showModal={showModal}
        onConfirm={deleteItem}
        onCancel={() => {
          setShowModal(false);
          setCommentToDelete(null);
        }}
      />
      <div className="comment-section-wrapper w-[95%] h-max-[560px] flex flex-col mx-auto px-2 py-2 items-end">
        {comments.map((comment, index) => (
          <Comment
            key={comment.id}
            comment={comment}
            position={index}
            updateCommentPosition={updateComment}
            updateComment={updateComment}
            handleDelete={handleDeleteComment}
            currentUser={currentUser}
          />
        ))}
      </div>
      <div id="comment-box-wrapper" className="w-[95%] mt-3 px-2">
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
