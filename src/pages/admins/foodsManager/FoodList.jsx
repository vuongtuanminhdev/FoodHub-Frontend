import { useEffect, useState, useCallback } from "react";
import {
  UtensilsCrossed,
  Plus,
  Pizza,
  Tags,
  Coins,
  Star,
  Search,
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
  X,
  RefreshCcw,
  AlertCircle
} from "lucide-react";
import {
  getFoods,
  createFood,
  updateFood,
  deleteFood,
} from "./services/foodService";
import FoodTable from "./components/FoodTable";
import FoodModal from "./components/FoodModal";
import "../../../styles/admin/foods/FoodList.css";

function FoodList() {
  const [foods, setFoods] = useState([]);
  const [editingFood, setEditingFood] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Number of items per page

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchFoods = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getFoods();
      setFoods(res || []);
    } catch (err) {
      console.error("Lỗi fetch foods:", err);
      setError("Không thể tải danh sách món ăn. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFoods();
  }, [fetchFoods]);

  const handleAdd = () => {
    setEditingFood(null);
    setIsModalOpen(true);
  };

  const handleEdit = (food) => {
    setEditingFood(food);
    setIsModalOpen(true);
  };

  const handleSubmit = async (form, resetForm) => {
    setLoading(true);
    try {
      if (editingFood) {
        await updateFood(editingFood.id, form);
        showToast("Cập nhật món ăn thành công!", "success");
      } else {
        await createFood(form);
        showToast("Thêm món ăn thành công!", "success");
      }
      setIsModalOpen(false);
      setEditingFood(null);
      resetForm();
      await fetchFoods();
    } catch (error) {
      console.error("Lỗi submit:", error);
      showToast(
        error.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại",
        "error"
      );
      throw error; // Ném lỗi để component con xử lý
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa món ăn "${name}"?`)) {
      setLoading(true);
      try {
        await deleteFood(id);
        showToast("Xóa món ăn thành công!", "success");
        await fetchFoods();
      } catch (error) {
        console.error("Lỗi xóa:", error);
        showToast("Có lỗi xảy ra khi xóa món ăn", "error");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingFood(null);
  };

  const filteredFoods = foods.filter(
    (food) =>
      food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      food.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      food.category?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination Logic
  const totalPages = Math.ceil(filteredFoods.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentFoods = filteredFoods.slice(startIndex, startIndex + itemsPerPage);

  const stats = {
    total: foods.length,
    categories: new Set(foods.map((f) => f.category?.id)).size,
    avgPrice: foods.length
      ? foods.reduce((sum, f) => sum + f.price, 0) / foods.length
      : 0,
  };

  return (
    <div className="food-management">
      <div className="header-section">
        <div>
          <h1 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <UtensilsCrossed size={32} /> Quản lý món ăn
          </h1>
          <p>Quản lý danh sách món ăn, thêm, sửa, xóa và tìm kiếm dễ dàng</p>
        </div>
        <div className="stats-container">
        <div className="stat-card">
          <div className="stat-icon"><Pizza size={36} color="#4f46e5" /></div>
          <div className="stat-number">{stats.total}</div>
          <div className="stat-label">Tổng số món</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><Tags size={36} color="#7c3aed" /></div>
          <div className="stat-number">{stats.categories}</div>
          <div className="stat-label">Danh mục</div>
        </div>
      </div>
      </div>

      <div className="table-section">
        {/* Action Bar */}
        <div className="action-bar">
          <div className="search-wrapper">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Tìm kiếm món ăn..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {searchTerm && (
              <button className="clear-search" onClick={() => setSearchTerm("")}>
                <X size={16} />
              </button>
            )}
          </div>

          <div className="action-buttons">
            <button className="btn-refresh" onClick={fetchFoods}>
              <RefreshCcw size={18} />
              <span>Làm mới</span>
            </button>

            <button className="btn-primary" onClick={handleAdd}>
              <Plus size={18} />
              <span>Thêm món ăn</span>
            </button>
          </div>
        </div>

        {/* Loading & Error States */}
        {loading && foods.length === 0 && !error && (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Đang tải dữ liệu...</p>
          </div>
        )}

        {error && (
          <div className="error-state">
            <AlertCircle size={32} />
            <p>{error}</p>
            <button onClick={fetchFoods} className="retry-btn">
              Thử lại
            </button>
          </div>
        )}

        {/* Food Table & Pagination */}
        {!error && (foods.length > 0 || !loading) && (
          <>
            <FoodTable
              foods={currentFoods}
              onEdit={handleEdit}
              onDelete={handleDelete}
              loading={loading && foods.length > 0}
            />

            {/* Always render pagination wrapper so user knows it exists, even if 1 page */}
            {totalPages > 0 && (
              <div className="pagination">
                <button
                  className="page-btn"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                >
                  <ChevronLeft size={18} />
                </button>
                <span className="page-info">
                  Trang {currentPage} / {totalPages}
                </span>
                <button
                  className="page-btn"
                  disabled={currentPage === totalPages || totalPages === 1}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal Form */}
      <FoodModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        editingFood={editingFood}
        loading={loading}
      />

      {/* Full screen overlay strictly for mutation actions (submit/delete) */}
      {loading && foods.length > 0 && !isModalOpen && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}

      {toast && (
        <div className={`toast ${toast.type}`}>
          <span className="toast-icon">
            {toast.type === "success" ? <CheckCircle size={20} color="#10b981" /> : <XCircle size={20} color="#ef4444" />}
          </span>
          <span className="toast-message">{toast.message}</span>
        </div>
      )}
    </div>
  );
}

export default FoodList;