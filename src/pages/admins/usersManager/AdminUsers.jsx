// AdminUsers.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  RefreshCcw,
  Plus,
  Pencil,
  Trash2,
  ShieldCheck,
  ShieldX,
  X,
  User,
  Mail,
  Lock,
  Users,
  AlertCircle,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { getToken, logout } from "../../../utils/auth";
import "../../../styles/admin/users/AdminUsers.css";

function AdminUsers() {
  const navigate = useNavigate();

  const emptyForm = {
    id: null,
    name: "",
    email: "",
    password: "",
    role: "ROLE_USER",
  };

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [keyword, setKeyword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // State cho việc hiển thị mật khẩu
  const [showPassword, setShowPassword] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState("");

  // State cho phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate("/login");
      return;
    }
    fetchUsers();
  }, []);

  useEffect(() => {
    const result = users.filter(
      (u) =>
        u.name?.toLowerCase().includes(keyword.toLowerCase()) ||
        u.email?.toLowerCase().includes(keyword.toLowerCase())
    );
    setFilteredUsers(result);
    setCurrentPage(1); // Reset về trang đầu khi tìm kiếm
  }, [keyword, users]);

  // Tính toán phân trang
  useEffect(() => {
    const total = Math.ceil(filteredUsers.length / itemsPerPage);
    setTotalPages(total > 0 ? total : 1);
    if (currentPage > total && total > 0) {
      setCurrentPage(total);
    }
  }, [filteredUsers, itemsPerPage, currentPage]);

  // Lấy dữ liệu cho trang hiện tại
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredUsers.slice(startIndex, endIndex);
  };

  const authHeader = () => ({
    Authorization: `Bearer ${getToken()}`,
    "Content-Type": "application/json",
  });

  const fetchUsers = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:8080/api/admin/users", {
        headers: authHeader(),
      });

      if (res.status === 401 || res.status === 403) {
        logout();
        navigate("/login");
        return;
      }

      const data = await res.json();
      setUsers(data);
      setFilteredUsers(data);
    } catch {
      setError("Không thể tải dữ liệu người dùng");
    } finally {
      setLoading(false);
    }
  };

  // Hàm tạo mật khẩu ngẫu nhiên
  const generateRandomPassword = () => {
    const length = 12;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    setGeneratedPassword(password);
    setForm({ ...form, password: password });
    setShowPassword(true);
  };

  const openAdd = () => {
    setEditing(false);
    setForm(emptyForm);
    setGeneratedPassword("");
    setShowPassword(false);
    setShowModal(true);
  };

  const openEdit = (user) => {
    setEditing(true);
    setForm({
      id: user.id,
      name: user.name,
      email: user.email,
      password: "",
      role: user.role?.name || "ROLE_USER",
    });
    setGeneratedPassword("");
    setShowPassword(false);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setForm(emptyForm);
    setShowPassword(false);
    setGeneratedPassword("");
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      email: form.email,
      password: form.password,
      role: {
        name: form.role,
      },
    };

    const url = editing
      ? `http://localhost:8080/api/admin/users/${form.id}`
      : "http://localhost:8080/api/admin/users";

    const method = editing ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: authHeader(),
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Lỗi xử lý");
        return;
      }

      if (!editing && generatedPassword) {
        alert(`Tạo tài khoản thành công!\nMật khẩu: ${generatedPassword}\nVui lòng lưu lại mật khẩu này.`);
      } else {
        alert(editing ? "Cập nhật thành công!" : "Tạo tài khoản thành công!");
      }

      closeModal();
      fetchUsers();
    } catch {
      alert("Lỗi kết nối server");
    }
  };

  const confirmDelete = (id, name) => {
    setDeleteConfirm({ id, name });
  };

  const deleteUser = async () => {
    if (!deleteConfirm) return;

    await fetch(`http://localhost:8080/api/admin/users/${deleteConfirm.id}`, {
      method: "DELETE",
      headers: authHeader(),
    });

    setDeleteConfirm(null);
    fetchUsers();
  };

  const toggleStatus = async (id) => {
    try {
      await fetch(`http://localhost:8080/api/admin/users/${id}/status`, {
        method: "PATCH",
        headers: authHeader(),
      });
      fetchUsers();
    } catch (error) {
      alert("Không thể cập nhật trạng thái");
    }
  };

  const getRoleBadgeClass = (role) => {
    return role === "ROLE_ADMIN" ? "role-admin" : "role-user";
  };

  const getRoleLabel = (role) => {
    return role === "ROLE_ADMIN" ? "Admin" : "Người dùng";
  };

  const getPasswordStrength = (password) => {
    if (!password) return { score: 0, text: "Chưa nhập", color: "#e5e7eb" };

    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[!@#$%^&*]/.test(password)) score++;

    if (score <= 2) return { score, text: "Yếu", color: "#ef4444" };
    if (score <= 4) return { score, text: "Trung bình", color: "#f59e0b" };
    return { score, text: "Mạnh", color: "#10b981" };
  };

  // Hàm phân trang
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i);
      }
    }

    range.forEach((i) => {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i;
    });

    return rangeWithDots;
  };

  const currentData = getCurrentPageData();
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, filteredUsers.length);

  return (
    <div className="admin-users">
      {/* Header Section */}
      <div className="users-header">
        <div className="header-left">
          <div className="header-icon">
            <Users size={28} />
          </div>
          <div className="header-info">
            <h1>Quản lý người dùng</h1>
            <p>Quản lý tài khoản, phân quyền và theo dõi hoạt động</p>
          </div>
        </div>

        <div className="header-stats">
          <div className="stat-card">
            <div className="stat-value">{users.length}</div>
            <div className="stat-label">Tổng người dùng</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">
              {users.filter(u => u.status === "ACTIVE").length}
            </div>
            <div className="stat-label">Đang hoạt động</div>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="users-action-bar">
        <div className="search-wrapper">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên hoặc email..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="search-input"
          />
          {keyword && (
            <button className="clear-search" onClick={() => setKeyword("")}>
              <X size={16} />
            </button>
          )}
        </div>

        <div className="action-buttons">
          <button className="btn-refresh" onClick={fetchUsers}>
            <RefreshCcw size={18} />
            <span>Làm mới</span>
          </button>

          <button className="btn-primary" onClick={openAdd}>
            <Plus size={18} />
            <span>Thêm người dùng</span>
          </button>
        </div>
      </div>

      {/* Loading & Error States */}
      {loading && (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Đang tải dữ liệu...</p>
        </div>
      )}

      {error && (
        <div className="error-state">
          <AlertCircle size={20} />
          <p>{error}</p>
          <button onClick={fetchUsers} className="retry-btn">
            Thử lại
          </button>
        </div>
      )}

      {/* Users Table */}
      {!loading && !error && (
        <>
          <div className="table-container">
            <div className="table-wrapper">
              <table className="users-table">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Tên</th>
                    <th>Email</th>
                    <th>Vai trò</th>
                    <th>Trạng thái</th>
                    <th>Ngày tạo</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.length > 0 ? (
                    currentData.map((u, index) => (
                      <tr key={u.id} className="user-row">
                        <td className="text-center">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                        <td>
                          <div className="user-info">
                            {/* <div className="user-avatar">
                              {u.name?.charAt(0).toUpperCase()}
                            </div> */}
                            <div className="user-details">
                              <div className="user-name">{u.name}</div>
                              <div className="user-email-mobile">{u.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="user-email">{u.email}</td>
                        <td>
                          <span className={`role-badge ${getRoleBadgeClass(u.role?.name)}`}>
                            {getRoleLabel(u.role?.name)}
                          </span>
                        </td>
                        <td>
                          <button
                            className={`status-badge ${u.status === "ACTIVE" ? "status-active" : "status-blocked"}`}
                            onClick={() => toggleStatus(u.id)}
                          >
                            {u.status === "ACTIVE" ? (
                              <>
                                <ShieldCheck size={14} />
                                <span>Active</span>
                              </>
                            ) : (
                              <>
                                <ShieldX size={14} />
                                <span>Blocked</span>
                              </>
                            )}
                          </button>
                        </td>
                        <td>
                          <div className="date-cell">
                            {u.createdAt
                              ? new Date(u.createdAt).toLocaleDateString("vi-VN")
                              : "--/--/----"}
                          </div>
                        </td>
                        <td>
                          <div className="action-buttons-group">
                            <button
                              className="icon-btn edit-btn"
                              onClick={() => openEdit(u)}
                              title="Chỉnh sửa"
                            >
                              <Pencil size={16} />
                            </button>
                            <button
                              className="icon-btn delete-btn"
                              onClick={() => confirmDelete(u.id, u.name)}
                              title="Xóa"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="empty-state">
                        <div className="empty-content">
                          <Users size={48} strokeWidth={1.5} />
                          <p>Không tìm thấy người dùng nào</p>
                          {keyword && (
                            <button onClick={() => setKeyword("")} className="clear-filter-btn">
                              Xóa bộ lọc
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {filteredUsers.length > 0 && (
            <div className="pagination-container">
              <div className="pagination-info">
                Hiển thị <strong>{startIndex}</strong> - <strong>{endIndex}</strong> trên tổng số{" "}
                <strong>{filteredUsers.length}</strong> người dùng
              </div>

              <div className="pagination-controls">
                <div className="items-per-page">
                  <span>Hiển thị:</span>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                </div>

                <div className="pagination-buttons">
                  <button
                    onClick={() => goToPage(1)}
                    disabled={currentPage === 1}
                    className="pagination-btn"
                  >
                    <ChevronsLeft size={18} />
                  </button>
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="pagination-btn"
                  >
                    <ChevronLeft size={18} />
                  </button>

                  <div className="page-numbers">
                    {getVisiblePages().map((page, index) => (
                      page === "..." ? (
                        <span key={`dots-${index}`} className="page-dots">...</span>
                      ) : (
                        <button
                          key={page}
                          onClick={() => goToPage(page)}
                          className={`page-number ${currentPage === page ? "active" : ""}`}
                        >
                          {page}
                        </button>
                      )
                    ))}
                  </div>

                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="pagination-btn"
                  >
                    <ChevronRight size={18} />
                  </button>
                  <button
                    onClick={() => goToPage(totalPages)}
                    disabled={currentPage === totalPages}
                    className="pagination-btn"
                  >
                    <ChevronsRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Modal Form */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editing ? "Chỉnh sửa người dùng" : "Thêm người dùng mới"}</h3>
              <button className="modal-close" onClick={closeModal}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={submitForm} className="modal-form">
              <div className="form-group">
                <label>
                  <User size={18} />
                  <span>Họ và tên</span>
                </label>
                <input
                  type="text"
                  placeholder="Nhập họ và tên"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  autoFocus
                />
              </div>

              <div className="form-group">
                <label>
                  <Mail size={18} />
                  <span>Địa chỉ email</span>
                </label>
                <input
                  type="email"
                  placeholder="example@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  <Lock size={18} />
                  <span>{editing ? "Mật khẩu mới" : "Mật khẩu"}</span>
                </label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder={editing ? "Để trống nếu không đổi" : "Nhập mật khẩu"}
                    value={form.password}
                    onChange={(e) => {
                      setForm({ ...form, password: e.target.value });
                      setGeneratedPassword("");
                    }}
                    required={!editing}
                  />
                  <button
                    type="button"
                    className="toggle-password-btn"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {form.password && (
                  <div className="password-strength">
                    <div className="strength-bar">
                      <div
                        className="strength-fill"
                        style={{
                          width: `${(getPasswordStrength(form.password).score / 5) * 100}%`,
                          backgroundColor: getPasswordStrength(form.password).color
                        }}
                      />
                    </div>
                    <span style={{ color: getPasswordStrength(form.password).color }}>
                      Độ mạnh: {getPasswordStrength(form.password).text}
                    </span>
                  </div>
                )}

                {!editing && (
                  <button
                    type="button"
                    className="generate-password-btn"
                    onClick={generateRandomPassword}
                  >
                    Tạo mật khẩu ngẫu nhiên
                  </button>
                )}

                {editing && (
                  <small className="form-hint">Để trống nếu muốn giữ nguyên mật khẩu cũ</small>
                )}
              </div>

              <div className="form-group">
                <label>Vai trò</label>
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="role-select"
                >
                  <option value="ROLE_USER">👤 Người dùng thường</option>
                  <option value="ROLE_ADMIN">👑 Quản trị viên</option>
                </select>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={closeModal}>
                  Hủy bỏ
                </button>
                <button type="submit" className="btn-submit">
                  {editing ? "Cập nhật" : "Thêm mới"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="modal-container delete-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Xác nhận xóa</h3>
              <button className="modal-close" onClick={() => setDeleteConfirm(null)}>
                <X size={20} />
              </button>
            </div>
            <div className="delete-content">
              <AlertCircle size={48} className="delete-icon" />
              <p>Bạn có chắc chắn muốn xóa người dùng <strong>"{deleteConfirm.name}"</strong>?</p>
              <p className="delete-warning">Hành động này không thể hoàn tác.</p>
            </div>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setDeleteConfirm(null)}>
                Hủy
              </button>
              <button className="btn-danger" onClick={deleteUser}>
                Xóa người dùng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminUsers;