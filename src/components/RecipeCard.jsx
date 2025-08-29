import { Link } from "react-router-dom";
import { useFavorites } from "../contexts/FavoritesContext";

export default function RecipeCard({ recipe }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(recipe.id);

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow border-0 rounded-4 overflow-hidden position-relative">
        {/* Favorite Toggle Button */}
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

        {/* Recipe Image */}
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

        {/* Recipe Info */}
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
}
