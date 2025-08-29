import { useParams, useNavigate, Link } from "react-router-dom";
import recipes from "../data/recipes.json";
import { useFavorites } from "../contexts/FavoritesContext";

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipe = recipes.find((r) => r.id === parseInt(id));
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = recipe ? isFavorite(recipe.id) : false;

  const NAVBAR_HEIGHT = 30;

  const scrollToRecipes = () => {
    navigate("/");
    setTimeout(() => {
      const section = document.getElementById("recipes");
      if (section) {
        const top = section.offsetTop - NAVBAR_HEIGHT;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, 50);
  };

  if (!recipe) {
    return (
      <div className="text-center py-5" style={{ minHeight: "100vh" }}>
        <h2>Recipe not found</h2>
        <button className="btn btn-primary mt-3" onClick={scrollToRecipes}>
          Back to Recipes
        </button>
      </div>
    );
  }

  return (
    <div className="container py-4">
      {/* Go Back */}
      <Link
        to="/"
        onClick={(e) => {
          e.preventDefault();
          scrollToRecipes();
        }}
        className="d-inline-block mb-3 text-decoration-none fw-semibold"
      >
        &larr; Back to Recipes
      </Link>

      {/* Main Recipe Card */}
      <div className="card shadow-lg border-0 rounded-4 p-4">
        {/* Favorite Button */}
        <button
          className={`btn btn-sm fw-bold shadow-sm rounded-pill px-3 py-1 position-absolute top-0 end-0 m-3 ${
            favorite ? "btn-danger text-white" : "btn-outline-secondary"
          }`}
          onClick={() => toggleFavorite(recipe)}
        >
          {favorite ? "♥ Remove from Favorites" : "♡ Add to Favorites"}
        </button>

        <div className="row g-4 align-items-start">
          {/* Left: Image */}
          <div className="col-md-5">
            <img
              src={recipe.image}
              alt={recipe.name}
              className="img-fluid rounded-4 shadow-sm w-100"
              style={{
                height: "330px",
                objectFit: "cover",
              }} 
            />
          </div>

          {/* Right: Info */}
          <div className="col-md-7 d-flex flex-column">
            <h2 className="fw-bold mb-2">{recipe.name}</h2>
            <p className="text-muted mb-3">{recipe.description}</p>

            {/* Metadata */}
            <div className="d-flex flex-wrap gap-2 mb-4">
              {recipe.prepTime && (
                <span className="badge bg-secondary px-3 py-2 rounded-pill shadow-sm">
                  ⏱ Prep: {recipe.prepTime}
                </span>
              )}
              {recipe.cookTime && (
                <span className="badge bg-secondary px-3 py-2 rounded-pill shadow-sm">
                  🍳 Cook: {recipe.cookTime}
                </span>
              )}
              {recipe.servings && (
                <span className="badge bg-secondary px-3 py-2 rounded-pill shadow-sm">
                  🍽 Servings: {recipe.servings}
                </span>
              )}
            </div>

            {/* Instructions */}
            <div className="card border-0 shadow rounded-4 p-4 flex-grow-1">
              <h5 className="fw-bold mb-3">👩‍🍳 Instructions</h5>
              <div className="list-group list-group-flush">
                {recipe.instructions.map((step, index) => (
                  <div
                    key={index}
                    className="list-group-item border-0 d-flex align-items-start bg-transparent px-0 py-2"
                  >
                    <span className="badge bg-primary rounded-pill me-3 px-3 py-2 fw-semibold">
                      {index + 1}
                    </span>
                    <span className="fw-medium">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Ingredients */}
        {recipe.ingredients && (
          <div className="mt-5">
            <div className="card border-0 shadow rounded-4 p-4 flex-grow-1">
              <h5 className="fw-bold mb-3">🛒 Ingredients</h5>

              <div className="row row-cols-1 row-cols-md-2 g-3">
                {recipe.ingredients.map((ingredient, index) => (
                  <div key={index} className="col">
                    <div className="d-flex align-items-center p-2 rounded-3 bg-light shadow-sm small fw-medium">
                      <span>{ingredient}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
