import {
  Search,
  RefreshCcw,
  Plus,
  X,
} from "lucide-react";

function UsersActionBar({
  keyword,
  setKeyword,
  fetchUsers,
  openAdd,
}) {
  return (
    <div className="users-action-bar">

      <div className="search-wrapper">
        <Search size={20} className="search-icon" />

        <input
          type="text"
          placeholder="Tìm kiếm..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="search-input"
        />

        {keyword && (
          <button
            className="clear-search"
            onClick={() => setKeyword("")}
          >
            <X size={16} />
          </button>
        )}
      </div>

      <div className="action-buttons">

        <button
          className="btn-refresh"
          onClick={fetchUsers}
        >
          <RefreshCcw size={18} />
          Làm mới
        </button>

        <button
          className="btn-primary"
          onClick={openAdd}
        >
          <Plus size={18} />
          Thêm người dùng
        </button>

      </div>
    </div>
  );
}

export default UsersActionBar;