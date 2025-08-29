import { Link, useNavigate } from "react-router-dom";
import { useFavorites } from "../contexts/FavoritesContext";

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites();
  const navigate = useNavigate();
  const NAVBAR_HEIGHT = 30;

  const goToRecipesSection = () => {
    navigate("/");
    setTimeout(() => {
      const section = document.getElementById("recipes");
      if (section) {
        const top = section.offsetTop - NAVBAR_HEIGHT;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, 50);
  };

  if (favorites.length === 0) {
    return (
      <div className="text-center py-5">
        <h1 className="mb-3">Your Favorite Recipes (0)</h1>
        <p className="text-muted">No favorites yet. Add some from recipes!</p>
        <button
          className="btn btn-primary rounded-pill mt-3 px-4"
          onClick={goToRecipesSection}
        >
          Browse Recipes
        </button>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h1 className="mb-4 text-center">
        Your Favorite Recipes ({favorites.length})
      </h1>
      <div className="row g-4">
        {favorites.map((recipe) => (
          <div className="col-md-4" key={recipe.id}>
            <div className="card h-100 shadow-lg border-0 rounded-4 bg-body text-body">
              <img
                src={recipe.image}
                alt={recipe.name}
                className="card-img-top rounded-top-4"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column p-4">
                <h5 className="card-title fw-bold">{recipe.name}</h5>
                <p className="card-text text-muted flex-grow-1 small mb-3">
                  {recipe.description}
                </p>
                <div className="d-flex justify-content-between mt-auto">
                  <Link
                    to={`/recipe/${recipe.id}`}
                    className="btn btn-primary rounded-pill px-3 fw-semibold"
                  >
                    View →
                  </Link>
                  <button
                    className="btn btn-outline-danger rounded-pill px-3 fw-semibold"
                    onClick={() => toggleFavorite(recipe)}
                  >
                    ❌ Remove
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
