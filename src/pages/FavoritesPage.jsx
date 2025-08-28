import { Link } from "react-router-dom";
import { useFavorites } from "../store/FavoritesContext";

export default function FavoritesPage() {
  const { favorites, removeFavorite } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="text-center">
        <h1 className="mb-3">Your Favorite Recipes (0)</h1>
        <p className="text-muted">
          No favorites yet. Add some from the recipe pages!
        </p>
        <Link to="/" className="btn btn-warning mt-3">
          Browse Recipes
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-4 text-center">
        Your Favorite Recipes ({favorites.length})
      </h1>
      <div className="row">
        {favorites.map((recipe) => (
          <div className="col-md-4 mb-4" key={recipe.id}>
            <div className="card h-100 shadow-sm">
              <img
                src={recipe.image}
                alt={recipe.name}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{recipe.name}</h5>
                <p className="card-text flex-grow-1">{recipe.description}</p>

                <div className="d-flex justify-content-between mt-auto">
                  <Link to={`/recipe/${recipe.id}`} className="btn btn-warning">
                    View Recipe
                  </Link>
                  <button
                    onClick={() => removeFavorite(recipe.id)}
                    className="btn btn-outline-danger"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
