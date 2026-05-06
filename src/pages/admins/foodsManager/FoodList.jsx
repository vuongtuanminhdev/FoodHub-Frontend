import { useEffect, useState } from "react";
import {
  getFoods,
  getCategories,
  createFood,
  updateFood,
  deleteFood
} from "./services/foodService";

import FoodTable from "./components/FoodTable";
import FoodFormModal from "./components/FoodFormModal";
import FoodSearch from "./components/FoodSearch";

function FoodList() {
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentFood, setCurrentFood] = useState({
    id: null,
    name: "",
    price: "",
    description: "",
    categoryId: ""
  });

  const fetchData = async () => {
    const [foodsRes, cateRes] = await Promise.all([
      getFoods(),
      getCategories()
    ]);
    setFoods(foodsRes.data);
    setCategories(cateRes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditing) {
      await updateFood(currentFood.id, currentFood);
    } else {
      await createFood(currentFood);
    }

    setIsModalOpen(false);
    fetchData();
  };

  const handleDeleteFood = async (id) => {
    await deleteFood(id);
    fetchData();
  };

  const filteredFoods = foods.filter(f =>
    f.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Quản lý món ăn</h2>

      <FoodSearch
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <button onClick={() => {
        setIsEditing(false);
        setCurrentFood({});
        setIsModalOpen(true);
      }}>
        + Thêm
      </button>

      <FoodTable
        foods={filteredFoods}
        onEdit={(food) => {
          setIsEditing(true);
          setCurrentFood(food);
          setIsModalOpen(true);
        }}
        onDelete={handleDeleteFood}
      />

      <FoodFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        isEditing={isEditing}
        currentFood={currentFood}
        setCurrentFood={setCurrentFood}
        categories={categories}
      />
    </div>
  );
}

export default FoodList;