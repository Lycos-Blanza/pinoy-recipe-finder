import { useState } from "react";
import recipes from "../data/recipes.json";
import RecipeCard from "../components/RecipeCard";

export default function HomePage() {
  const [search, setSearch] = useState("");

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container py-4">
      {/* Header (not sticky) */}
      <div className="row text-center mb-3">
        <div className="col-12">
          <h4 className="fw-bold mt-3">
            🍴 Discover Delicious Filipino Recipes
          </h4>
          <p className="text-muted mb-0">
            Search and explore your favorite dishes below
          </p>
        </div>
      </div>

      {/* Sticky Search Bar */}
      <div
        className="row mb-4 sticky-top bg-white pt-3 pb-3 shadow-sm"
        style={{ top: "56px", zIndex: 1020 }}
      >
        <div className="col-md-6 offset-md-3">
          <input
            type="text"
            className="form-control rounded-pill shadow-sm"
            placeholder="🔍 Search for a recipe name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Recipe Grid */}
      <div className="row" style={{ minHeight: "40vh" }}>
        {filteredRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}

        {filteredRecipes.length === 0 && (
          <p className="text-center text-muted mt-5">No recipes found.</p>
        )}
      </div>
    </div>
  );
}
