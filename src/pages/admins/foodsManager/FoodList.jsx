import { useEffect, useState } from "react";
import axios from "axios";
import { getAuthHeader } from "../../../utils/auth";
import "../../../styles/admin/foods/FoodList.css";

function FoodList() {
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentFood, setCurrentFood] = useState({
    id: null,
    name: "",
    price: "",
    description: "",
    categoryId: ""
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchFoods();
    fetchCategories();
  }, []);

  const fetchFoods = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8080/api/admin/foods", {
        headers: getAuthHeader(),
      });
      setFoods(res.data);
      setError("");
    } catch (error) {
      console.error("Lỗi fetch foods:", error);
      setError("Không thể tải danh sách món ăn");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/admin/categories", {
        headers: getAuthHeader(),
      });
      setCategories(res.data);
    } catch (error) {
      console.error("Lỗi fetch categories:", error);
    }
  };

  const handleAdd = () => {
    setIsEditing(false);
    setCurrentFood({
      id: null,
      name: "",
      price: "",
      description: "",
      categoryId: ""
    });
    setIsModalOpen(true);
  };

  const handleEdit = (food) => {
    setIsEditing(true);
    setCurrentFood({
      id: food.id,
      name: food.name,
      price: food.price,
      description: food.description,
      categoryId: food.category?.id || ""
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa món ăn "${name}"?`)) {
      try {
        await axios.delete(`http://localhost:8080/api/admin/foods/${id}`, {
          headers: getAuthHeader(),
        });
        await fetchFoods();
        alert("Xóa món ăn thành công!");
      } catch (error) {
        console.error("Lỗi xóa food:", error);
        alert("Có lỗi xảy ra khi xóa món ăn");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isEditing) {
        await axios.put(
          `http://localhost:8080/api/admin/foods/${currentFood.id}`,
          currentFood,
          { headers: getAuthHeader() }
        );
        alert("Cập nhật món ăn thành công!");
      } else {
        await axios.post(
          "http://localhost:8080/api/admin/foods",
          currentFood,
          { headers: getAuthHeader() }
        );
        alert("Thêm món ăn thành công!");
      }
      
      setIsModalOpen(false);
      await fetchFoods();
    } catch (error) {
      console.error("Lỗi submit food:", error);
      alert("Có lỗi xảy ra khi lưu món ăn");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentFood(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const filteredFoods = foods.filter(food =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    food.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="food-list-container">
      <div className="header">
        <h2>🍽️ Quản lý món ăn</h2>
        <div className="actions">
          <div className="search-box">
            <input
              type="text"
              placeholder="🔍 Tìm kiếm món ăn..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <button onClick={handleAdd} className="btn-add">
            + Thêm món ăn
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Đang tải dữ liệu...</div>
      ) : (
        <div className="table-responsive">
          <table className="food-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên món ăn</th>
                <th>Giá</th>
                <th>Mô tả</th>
                <th>Danh mục</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredFoods.length === 0 ? (
                <tr>
                  <td colSpan="6" className="no-data">
                    Không có dữ liệu
                  </td>
                </tr>
              ) : (
                filteredFoods.map((food) => (
                  <tr key={food.id}>
                    <td>{food.id}</td>
                    <td className="food-name">{food.name}</td>
                    <td className="price">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(food.price)}
                    </td>
                    <td className="description">{food.description || "---"}</td>
                    <td>
                      <span className="category-badge">
                        {food.category?.name || "Chưa phân loại"}
                      </span>
                    </td>
                    <td className="actions-cell">
                      <button
                        onClick={() => handleEdit(food)}
                        className="btn-edit"
                      >
                        ✏️ Sửa
                      </button>
                      <button
                        onClick={() => handleDelete(food.id, food.name)}
                        className="btn-delete"
                      >
                        🗑️ Xóa
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Form */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{isEditing ? "✏️ Chỉnh sửa món ăn" : "➕ Thêm món ăn mới"}</h3>
              <button className="modal-close" onClick={() => setIsModalOpen(false)}>
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit} className="food-form">
              <div className="form-group">
                <label>Tên món ăn *</label>
                <input
                  type="text"
                  name="name"
                  value={currentFood.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Nhập tên món ăn"
                />
              </div>
              
              <div className="form-group">
                <label>Giá *</label>
                <input
                  type="number"
                  name="price"
                  value={currentFood.price}
                  onChange={handleInputChange}
                  required
                  placeholder="Nhập giá"
                  min="0"
                  step="1000"
                />
              </div>
              
              <div className="form-group">
                <label>Mô tả</label>
                <textarea
                  name="description"
                  value={currentFood.description}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Nhập mô tả món ăn"
                />
              </div>
              
              <div className="form-group">
                <label>Danh mục</label>
                <select
                  name="categoryId"
                  value={currentFood.categoryId}
                  onChange={handleInputChange}
                >
                  <option value="">Chọn danh mục</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="form-actions">
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-cancel">
                  Hủy
                </button>
                <button type="submit" className="btn-submit" disabled={loading}>
                  {loading ? "Đang xử lý..." : isEditing ? "Cập nhật" : "Thêm mới"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default FoodList; 