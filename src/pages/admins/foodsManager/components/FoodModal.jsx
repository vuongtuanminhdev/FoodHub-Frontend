import { useEffect, useState } from "react";
import { getCategories } from "../services/foodService";

function FoodModal({ isOpen, onClose, onSubmit, editingFood, loading }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    categoryId: "",
  });
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);

  useEffect(() => {
    if (editingFood) {
      setForm({
        name: editingFood.name || "",
        price: editingFood.price || "",
        description: editingFood.description || "",
        categoryId: editingFood.category?.id || "",
      });
    } else {
      setForm({
        name: "",
        price: "",
        description: "",
        categoryId: "",
      });
    }
    setErrors({});
  }, [editingFood, isOpen]);

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

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      await onSubmit(
        {
          ...form,
          price: Number(form.price),
          categoryId: Number(form.categoryId),
        },
        resetForm
      );
    } catch (error) {
      // Error is handled in parent
    } finally {
      setSubmitting(false);
    }
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

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>
            {editingFood ? (
              <>
                ✏️ Chỉnh sửa món ăn
              </>
            ) : (
              <>
                ➕ Thêm món ăn mới
              </>
            )}
          </h2>
          <button className="modal-close" onClick={handleClose}>
            ×
          </button>
        </div>

        <div className="food-form">
          <div className="form-group">
            <label>
              Tên món ăn <span>*</span>
            </label>
            <input
              type="text"
              placeholder="VD: Phở bò Hà Nội"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={errors.name ? "error" : ""}
              disabled={submitting || loading}
            />
            {errors.name && (
              <small className="error-message">{errors.name}</small>
            )}
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
                disabled={submitting || loading}
              />
            </div>
            {errors.price && (
              <small className="error-message">{errors.price}</small>
            )}
          </div>

          <div className="form-group">
            <label>Mô tả</label>
            <textarea
              placeholder="Mô tả chi tiết về món ăn..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows="4"
              disabled={submitting || loading}
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
              disabled={submitting || loading}
            >
              <option value="">-- Chọn danh mục --</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <small className="error-message">{errors.categoryId}</small>
            )}
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn-cancel"
              onClick={handleClose}
              disabled={submitting || loading}
            >
              Hủy bỏ
            </button>
            <button
              type="button"
              className="btn-submit"
              onClick={handleSubmit}
              disabled={submitting || loading}
            >
              {submitting || loading
                ? "Đang xử lý..."
                : editingFood
                ? "Cập nhật"
                : "Thêm mới"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodModal;