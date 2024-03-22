import React, { useState } from "react";

function CommentBox(props) {
  const { currentUser, addComment, isReply = false } = props;

  const [submitting, setSubmitting] = useState(false);

  const clearValidityError = (event) => {
    const textArea = event.target;
    textArea.setCustomValidity("");
  };

  const handleAddComment = (event) => {
    event.preventDefault();

    const textArea = event.target[0];
    let commentText = textArea.value || "";

    if (commentText && commentText.length < 3) {
      console.log("Reporting");
      textArea.setCustomValidity(
        "Hey there! your comment is too short, try adding few more words :)"
      );
      textArea.reportValidity();
      return;
    }

    const newComment = {
      id: Math.floor(100000 + Math.random() * 900000),
      content: commentText,
      createdAt: new Date().toISOString(),
      score: 0,
      user: currentUser,
      replies: [],
    };

    addComment(newComment);
  };

  return (
    <form
      className="comment-box mx-4 mt-3 w-[90%] p-6 bg-white rounded-md shadow-md grid grid-cols-2 gap-3 justify-center items-center"
      onSubmit={handleAddComment}
    >
      <textarea
        name="inp-comment"
        className="min-h-[90px] w-full rounded-md mx-auto p-4 ring ring-1 ring-gray-300 col-span-2"
        placeholder="Add a comment..."
        onInput={clearValidityError}
        required
      ></textarea>
      <div className="col-span-1 mr-auto">
        <img className="h-[40px] w-[40px]" src={currentUser.image.png}></img>
      </div>
      <button
        type="submit"
        className="m-1 p-2 w-[90px] rounded-md text-white blue-accent-bg col-span-1 ml-auto"
      >
        {isReply ? "REPLY" : "SEND"}
      </button>
    </form>
  );
}

export default CommentBox;
