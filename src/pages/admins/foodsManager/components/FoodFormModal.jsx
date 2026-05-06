function FoodFormModal({
  isOpen,
  onClose,
  onSubmit,
  isEditing,
  currentFood,
  setCurrentFood,
  categories,
  loading
}) {
  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentFood(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>{isEditing ? "Sửa" : "Thêm"} món ăn</h3>

        <form onSubmit={onSubmit}>
          <input
            name="name"
            value={currentFood.name}
            onChange={handleChange}
            placeholder="Tên món"
            required
          />

          <input
            type="number"
            name="price"
            value={currentFood.price}
            onChange={handleChange}
            placeholder="Giá"
            required
          />

          <textarea
            name="description"
            value={currentFood.description}
            onChange={handleChange}
          />

          <select
            name="categoryId"
            value={currentFood.categoryId}
            onChange={handleChange}
          >
            <option value="">Chọn danh mục</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default FoodFormModal;