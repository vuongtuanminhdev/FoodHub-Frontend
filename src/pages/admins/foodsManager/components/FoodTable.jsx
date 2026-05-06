function FoodTable({ foods, onEdit, onDelete }) {
  return (
    <table className="food-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Tên món</th>
          <th>Giá</th>
          <th>Mô tả</th>
          <th>Danh mục</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        {foods.length === 0 ? (
          <tr>
            <td colSpan="6" className="no-data">Không có dữ liệu</td>
          </tr>
        ) : (
          foods.map((food) => (
            <tr key={food.id}>
              <td>{food.id}</td>
              <td>{food.name}</td>
              <td>
                {new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND'
                }).format(food.price)}
              </td>
              <td>{food.description || "---"}</td>
              <td>{food.category?.name || "Chưa phân loại"}</td>
              <td>
                <button onClick={() => onEdit(food)}>✏️</button>
                <button onClick={() => onDelete(food.id, food.name)}>🗑️</button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default FoodTable;