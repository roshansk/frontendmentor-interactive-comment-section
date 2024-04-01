function Modal({
  showModal = false,
  header = "Delete Comment",
  text = "Are you sure you want to delete this comment? this will remove the comment and can't be undone.",
  onConfirm = () => {},
  onCancel = () => {},
  cancelText = "NO, CANCEL",
  confirmText = "YES, DELETE",
}) {
  const handleCancel = () => {
    onCancel();
  };

  const handleConfirm = () => {
    onConfirm();
  };

  if (!showModal) return null;

  return (
    <>
      <div className="backdrop"></div>
      <dialog
        className="modal p-6 ring ring-1 ring-gray-200 rounded-md shadow-md max-w-[360px]"
        open={showModal}
      >
        <div>
          <h1 className="text-xl font-medium text-gray-800 mb-4">{header}</h1>
          <p className="mb-5 text-gray-500">{text}</p>
        </div>
        <div className="mt-5 flex text-white flex-row justify-evenly">
          <button
            className="px-4 py-2 bg-gray-500 rounded-md w-[45%]"
            onClick={handleCancel}
          >
            {cancelText}
          </button>
          <button
            className="px-4 py-2 btn-bg-light-red rounded-md w-[45%]"
            onClick={handleConfirm}
          >
            {confirmText}
          </button>
        </div>
      </dialog>
    </>
  );
}

export default Modal;
