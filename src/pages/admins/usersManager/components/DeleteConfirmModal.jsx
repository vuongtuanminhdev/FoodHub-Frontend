function DeleteModal({
  deleteConfirm,
  setDeleteConfirm,
}) {
  return (
    <div className="modal-overlay">
      <div className="modal-container">

        <h3>Xóa người dùng</h3>

        <p>
          Bạn có chắc muốn xóa:
          <strong>{deleteConfirm.name}</strong>
        </p>

        <button onClick={() => setDeleteConfirm(null)}>
          Hủy
        </button>

      </div>
    </div>
  );
}

export default DeleteModal;