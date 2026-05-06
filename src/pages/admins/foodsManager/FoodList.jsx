import { useEffect, useState } from "react";
import {
  getFoods,
  createFood,
  updateFood,
  deleteFood,
} from "./services/foodService";

import FoodTable from "./components/FoodTable";
import FoodForm from "./components/FoodForm";

function FoodList() {
  const [foods, setFoods] = useState([]);
  const [editingFood, setEditingFood] = useState(null);

  const fetchFoods = async () => {
    const res = await getFoods();
    setFoods(res.data);
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const handleSubmit = async (form) => {
    if (editingFood) {
      await updateFood(editingFood.id, form);
    } else {
      await createFood(form);
    }
    setEditingFood(null);
    fetchFoods();
  };

  const handleDelete = async (id) => {
    await deleteFood(id);
    fetchFoods();
  };

  return (
    <div>
      <h2>Food Manager</h2>

      <FoodForm
        onSubmit={handleSubmit}
        editingFood={editingFood}
      />

      <FoodTable
        foods={foods}
        onEdit={setEditingFood}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default FoodList;