import { useParams, Link } from "react-router-dom";
import recipes from "../../recipes.json";
import { useFavorites } from "../store/FavoritesContext";

export default function RecipeDetail() {
  const { id } = useParams();
  const recipe = recipes.find((r) => r.id === parseInt(id));
  const { toggleFavorite, isFavorite } = useFavorites();

  if (!recipe) return <h2 className="text-danger">Recipe not found</h2>;

  const favorite = isFavorite(recipe.id);

  return (
    <div>
      <Link to="/" className="go-back-wa">
        &larr; <span className="go-back-line">Go Back</span>
      </Link>

      <h1 className="mb-3">{recipe.name}</h1>
      <img
        src={recipe.image}
        alt={recipe.name}
        className="img-fluid rounded mb-4"
        style={{ height: "700px", width: "900px", objectFit: " " }}
      />
      <p className="lead">{recipe.description}</p>

      <h3>Ingredients</h3>
      <ul className="list-group mb-4">
        {recipe.ingredients.map((item, i) => (
          <li key={i} className="list-group-item">
            {item}
          </li>
        ))}
      </ul>

      <h3>Instructions</h3>
      <ol className="list-group list-group-numbered">
        {recipe.instructions.map((step, i) => (
          <li key={i} className="list-group-item">
            {step}
          </li>
        ))}
      </ol>

      <button
        className={`add-to-favorite-btn ${favorite ? "active" : ""}`}
        onClick={() => toggleFavorite(recipe)}
      >
        {favorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
    </div>
  );
}
