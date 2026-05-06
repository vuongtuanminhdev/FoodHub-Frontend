function UsersTable({ users, onEdit, onDelete, onToggle }) {
  return (
    <table className="users-table">
      <thead>
        <tr>
          <th>STT</th>
          <th>Tên</th>
          <th>Email</th>
          <th>Vai trò</th>
          <th>Trạng thái</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u, index) => (
          <tr key={u.id}>
            <td>{index + 1}</td>
            <td>{u.name}</td>
            <td>{u.email}</td>
            <td>{u.role?.name}</td>
            <td>
              <button onClick={() => onToggle(u.id)}>
                {u.status}
              </button>
            </td>
            <td>
              <button onClick={() => onEdit(u)}>Edit</button>
              <button onClick={() => onDelete(u)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UsersTable;