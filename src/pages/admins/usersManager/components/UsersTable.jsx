import {
  Pencil,
  Trash2,
} from "lucide-react";

function UsersTable({
  users,
  currentPage,
  itemsPerPage,
  openEdit,
  setDeleteConfirm,
}) {
  return (
    <div className="table-container">
      <table className="users-table">

        <thead>
          <tr>
            <th>STT</th>
            <th>Tên</th>
            <th>Email</th>
            <th>Thao tác</th>
          </tr>
        </thead>

        <tbody>

          {users.map((u, index) => (
            <tr key={u.id}>
              <td>
                {(currentPage - 1) * itemsPerPage + index + 1}
              </td>

              <td>{u.name}</td>

              <td>{u.email}</td>

              <td>
                <button onClick={() => openEdit(u)}>
                  <Pencil size={16} />
                </button>

                <button
                  onClick={() =>
                    setDeleteConfirm({
                      id: u.id,
                      name: u.name,
                    })
                  }
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}

        </tbody>
      </table>
    </div>
  );
}

export default UsersTable;