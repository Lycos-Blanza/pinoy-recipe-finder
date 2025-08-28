import { useState } from "react";
import { Link } from "react-router-dom";
import recipes from "../../recipes.json";

export default function HomePage() {
  const [search, setSearch] = useState("");

  const filteredRecipes = recipes.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        className="form-control mb-4"
        placeholder="Search recipes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="row">
        {filteredRecipes.map((recipe) => (
          <div className="col-md-4 mb-4" key={recipe.id}>
            <div className="card h-100 shadow-sm">
              <img
                src={recipe.image}
                alt={recipe.name}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{recipe.name}</h5>
                <p className="card-text">{recipe.description}</p>
                <Link
                  to={`/recipe/${recipe.id}`}
                  className="btn btn-warning custom-btn"
                >
                  View Recipe
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
