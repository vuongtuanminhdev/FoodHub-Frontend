function UserFormModal({ open, onClose, onSubmit, form, setForm }) {
  if (!open) return null;

  return (
    <div className="modal">
      <form onSubmit={onSubmit}>
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UserFormModal;