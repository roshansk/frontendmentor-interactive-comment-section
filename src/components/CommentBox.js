import React, { useState } from "react";

function CommentBox(props) {
  const {
    currentUser,
    submitHandler,
    isReply = null,
    currentComment = "",
  } = props;

  const [commentValue, setCommentValue] = useState(
    isReply ? "" : currentComment
  );

  const clearValidityError = (event) => {
    const textArea = event.target;
    textArea.setCustomValidity("");
  };

  const handleAddComment = (event) => {
    event.preventDefault();
    const textArea = event.target[0];

    if (commentValue && commentValue.length < 3) {
      textArea.setCustomValidity(
        "Hey there! your comment/reply is too short, try adding few more words :)"
      );
      textArea.reportValidity();
      return;
    }

    //editing comment
    if (isReply === false) {
      submitHandler(commentValue);
      setCommentValue("");
      return;
    }

    const newComment = {
      id: Math.floor(100000 + Math.random() * 900000),
      content: commentValue.trim(),
      createdAt: new Date().toISOString(),
      score: 0,
      user: currentUser,
      replies: [],
    };

    submitHandler(newComment);
    setCommentValue("");
  };

  const handleCommentValueUpdate = (event) => {
    clearValidityError(event);
    setCommentValue(event.target.value || "");
  };

  return (
    <form
      className="comment-box w-full p-6 bg-white rounded-md ring ring-1 ring-gray-100 grid grid-cols-2 gap-3 items-center md:flex md:flex-row  md:gap-0"
      onSubmit={handleAddComment}
    >
      <textarea
        name="inp-comment"
        className="min-h-[90px] w-full text-gray-600 rounded-md mx-auto p-4 ring ring-1 ring-gray-300 col-span-2 focus:outline-none focus:ring-gray-500 md:flex-auto md:order-2"
        placeholder="Add a comment..."
        value={commentValue}
        onInput={handleCommentValueUpdate}
        required
      ></textarea>
      <div className="col-span-1 mr-auto md:order-1 md:mr-3 md:mb-auto md:flex-auto md:mt-0">
        <img
          className="h-[45px] w-[45px] md:min-h-[45px] md:min-w-[45px]"
          alt="user profile"
          src={currentUser.image.png}
        ></img>
      </div>
      <button
        type="submit"
        className="m-1 p-2 w-[90px] rounded-md text-white hover:opacity-[0.65] blue-accent-bg col-span-1 ml-auto md:order-3 md:flex-auto md:mb-auto md:mt-0 md:ml-3"
      >
        {isReply ? "REPLY" : isReply === null ? "SEND" : "UPDATE"}
      </button>
    </form>
  );
}

export default CommentBox;
