import { useState } from "react";
import { Link } from "react-router-dom";
import recipes from "../data/recipes.json";
import { useFavorites } from "../store/FavoritesContext";
import Hero from "../components/Hero";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const { isFavorite, toggleFavorite } = useFavorites();

  const filteredRecipes = recipes.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* HERO SECTION */}
      <Hero />

      {/* RECIPES SECTION */}
      <section
        id="recipes"
        className="container py-5"
        style={{ minHeight: "70vh" }}
      >
        <div
          className="sticky-top bg-body pt-3 pb-3 mb-4"
          style={{ zIndex: 10, top: "-30px" }}
        >
          <div className="text-center mb-3">
            <h2 className="fw-bold">✨ Recipes</h2>
            <p className="text-body-secondary">
              Browse and enjoy delicious home-style meals.
            </p>
            <div className="d-flex justify-content-center mt-3">
              <input
                type="text"
                className="form-control w-50 shadow-sm rounded-pill px-3 bg-body text-body border"
                placeholder="🔍 Search recipes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Recipe cards */}
        <div className="row" style={{ minHeight: "40vh" }}>
          {filteredRecipes.map((recipe) => {
            const favorite = isFavorite(recipe.id);

            return (
              <div className="col-md-4 mb-4" key={recipe.id}>
                <div className="card h-100 shadow border-0 rounded-4 overflow-hidden position-relative">
                  <button
                    className="btn position-absolute top-0 end-0 m-2 p-2 border-0 bg-transparent"
                    style={{ zIndex: 5 }}
                    onClick={() => toggleFavorite(recipe)}
                  >
                    <i
                      className="bi bi-heart-fill"
                      style={{
                        fontSize: "1.3rem",
                        color: favorite ? "red" : "white",
                        textShadow: "0 0 4px rgba(0,0,0,0.3)",
                      }}
                    ></i>
                  </button>

                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="card-img-top"
                    style={{
                      height: "220px",
                      objectFit: "cover",
                      transition: "transform 0.3s ease",
                    }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold">{recipe.name}</h5>
                    <p className="card-text text-muted flex-grow-1">
                      {recipe.description}
                    </p>
                    <Link
                      to={`/recipe/${recipe.id}`}
                      className="btn btn-outline-primary rounded-pill mt-auto"
                    >
                      View Recipe →
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}

          {filteredRecipes.length === 0 && (
            <p className="text-center text-muted mt-5">No recipes found.</p>
          )}
        </div>
      </section>
    </div>
  );
}
