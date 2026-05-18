import { Edit2, Trash2 } from "lucide-react";

const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

function FoodTable({ foods, onEdit, onDelete, loading }) {
  if (loading && !foods.length) {
    return (
      <div className="table-loading">
        <div className="loading-spinner"></div>
        <p>Đang tải dữ liệu...</p>
      </div>
    );
  }

  if (!foods.length) {
    return (
      <div className="no-data">
        <div className="no-data-icon">🍽️</div>
        <p>Chưa có món ăn nào</p>
        <small>Hãy thêm món ăn đầu tiên của bạn</small>
      </div>
    );
  }

  return (
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
          {foods.map(food => (
            <tr key={food.id}>
              <td>{food.id}</td>
              <td className="food-name">{food.name}</td>
              <td className="price-cell">{formatPrice(food.price)}</td>
              <td className="description-cell" title={food.description}>
                {food.description || "---"}
              </td>
              <td>
                <span className="category-badge">
                  {food.category?.name || "Chưa phân loại"}
                </span>
              </td>
              <td>
                <div className="action-buttons-group">
                  <button
                    className="icon-btn edit-btn"
                    onClick={() => onEdit(food)}
                    title="Sửa"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    className="icon-btn delete-btn"
                    onClick={() => onDelete(food.id, food.name)}
                    title="Xóa"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FoodTable;