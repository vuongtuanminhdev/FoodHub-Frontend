function FoodTable({ foods, onEdit, onDelete }) {
  return (
    <table border="1" cellPadding="10">
      <thead>
        <tr>
          <th>ID</th>
          <th>Tên</th>
          <th>Giá</th>
          <th>Mô tả</th>
          <th>Category</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {foods.map((food) => (
          <tr key={food.id}>
            <td>{food.id}</td>
            <td>{food.name}</td>
            <td>{food.price}</td>
            <td>{food.description}</td>
            <td>{food.category?.name}</td>
            <td>
              <button onClick={() => onEdit(food)}>
                Edit
              </button>
              <button onClick={() => onDelete(food.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default FoodTable;