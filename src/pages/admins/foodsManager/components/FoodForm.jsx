import { useEffect, useState } from "react";
import { getCategories } from "../services/foodService";

function FoodForm({ onSubmit, editingFood, onCancel, loading }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    categoryId: "",
  });
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (editingFood) {
      setForm({
        name: editingFood.name || "",
        price: editingFood.price || "",
        description: editingFood.description || "",
        categoryId: editingFood.category?.id || "",
      });
    }
  }, [editingFood]);

  const fetchCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res || []);
    } catch (err) {
      console.error("Lỗi load category:", err);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Tên món ăn không được để trống";
    if (!form.price) newErrors.price = "Giá không được để trống";
    else if (form.price <= 0) newErrors.price = "Giá phải lớn hơn 0";
    if (!form.categoryId) newErrors.categoryId = "Vui lòng chọn danh mục";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    
    onSubmit(
      {
        ...form,
        price: Number(form.price),
        categoryId: Number(form.categoryId),
      },
      resetForm
    );
  };

  const resetForm = () => {
    setForm({
      name: "",
      price: "",
      description: "",
      categoryId: "",
    });
    setErrors({});
  };

  const handleCancel = () => {
    resetForm();
    if (onCancel) onCancel();
  };

  return (
    <div className="food-form">
      <div className="form-group">
        <label>
          Tên món ăn <span>*</span>
        </label>
        <input
          placeholder="VD: Phở bò Hà Nội"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className={errors.name ? "error" : ""}
        />
        {errors.name && <small className="error-message">{errors.name}</small>}
      </div>

      <div className="form-group">
        <label>
          Giá <span>*</span>
        </label>
        <div className="price-input-wrapper">
          <span className="price-currency">₫</span>
          <input
            type="number"
            placeholder="Nhập giá"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className={errors.price ? "error" : ""}
          />
        </div>
        {errors.price && <small className="error-message">{errors.price}</small>}
      </div>

      <div className="form-group">
        <label>Mô tả</label>
        <textarea
          placeholder="Mô tả chi tiết về món ăn..."
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows="3"
        />
      </div>

      <div className="form-group">
        <label>
          Danh mục <span>*</span>
        </label>
        <select
          value={form.categoryId}
          onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
          className={errors.categoryId ? "error" : ""}
        >
          <option value="">-- Chọn danh mục --</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        {errors.categoryId && <small className="error-message">{errors.categoryId}</small>}
      </div>

      <div className="form-actions">
        <button
          type="button"
          className="clear-btn"
          onClick={handleCancel}
          disabled={loading}
        >
          {editingFood ? "Hủy" : "Làm mới"}
        </button>
        <button
          type="button"
          className="submit-btn"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading
            ? "Đang xử lý..."
            : editingFood
            ? "Cập nhật"
            : "Thêm mới"}
        </button>
      </div>
    </div>
  );
}

export default FoodForm;