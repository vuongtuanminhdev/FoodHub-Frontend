import { useEffect, useState } from "react";
import { getCategories } from "../services/foodService";

function FoodForm({ onSubmit, editingFood }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    categoryId: "",
  });

  const [categories, setCategories] = useState([]);

  // 🔥 load categories
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res.data);
    } catch (err) {
      console.error("Lỗi load category:", err);
    }
  };

  // 🔥 fill khi edit
  useEffect(() => {
    if (editingFood) {
      setForm({
        name: editingFood.name,
        price: editingFood.price,
        description: editingFood.description,
        categoryId: editingFood.category?.id || "",
      });
    }
  }, [editingFood]);

  const handleSubmit = () => {
    onSubmit({
      ...form,
      categoryId: Number(form.categoryId),
    });

    setForm({
      name: "",
      price: "",
      description: "",
      categoryId: "",
    });
  };

  return (
    <div>
      <input
        placeholder="Tên"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <input
        placeholder="Giá"
        value={form.price}
        onChange={(e) =>
          setForm({ ...form, price: e.target.value })
        }
      />

      <input
        placeholder="Mô tả"
        value={form.description}
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
      />

      {/* 🔥 dropdown */}
      <select
        value={form.categoryId}
        onChange={(e) =>
          setForm({ ...form, categoryId: e.target.value })
        }
      >
        <option value="">-- Chọn danh mục --</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <button onClick={handleSubmit}>
        {editingFood ? "Update" : "Create"}
      </button>
    </div>
  );
}

export default FoodForm;