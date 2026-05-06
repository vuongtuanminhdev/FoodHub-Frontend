function FoodSearch({ searchTerm, setSearchTerm }) {
  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="🔍 Tìm kiếm món ăn..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
    </div>
  );
}

export default FoodSearch;