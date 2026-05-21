import { Edit2, Trash2 } from "lucide-react";

function FoodCard({ food, onEdit, onDelete }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <div className="food-card">
      <div className="card-image">
        <img src={food.imageUrl || "/api/placeholder/400/300"} alt={food.name} />
      </div>
      <div className="card-content">
        <div className="card-header">
          <h3>{food.name}</h3>
          <span className="category-badge">{food.category?.name || "Chưa phân loại"}</span>
        </div>
        <p className="description">{food.description || "Không có mô tả"}</p>
        <div className="card-footer">
          <span className="price">{formatPrice(food.price)}</span>
          <div className="card-actions">
            <button className="icon-btn edit" onClick={() => onEdit(food)}>
              <Edit2 size={16} />
            </button>
            <button className="icon-btn delete" onClick={() => onDelete(food.id, food.name)}>
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}