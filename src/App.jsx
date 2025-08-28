import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RecipeDetail from "./pages/RecipeDetail";
import FavoritesPage from "./pages/FavoritesPage";
import { useFavorites } from "./store/FavoritesContext";

export default function App() {
  const { favorites } = useFavorites();

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-warning">
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold" to="/">
            Pinoy Recipes
          </Link>
          <div>
            <Link className="nav-link text-dark fw-semibold" to="/favorites">
              Favorites{" "}
              <span className="badge bg-dark ms-1">{favorites.length}</span>
            </Link>
          </div>
        </div>
      </nav>

      <main className="container my-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </main>
    </div>
  );
}
