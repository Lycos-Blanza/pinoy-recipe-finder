import { Link } from "react-router-dom";
import { useFavorites } from "../contexts/FavoritesContext";

export default function Navbar() {
  const { favorites } = useFavorites();

  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary shadow-sm sticky-top rounded-bottom-4 px-3"
      style={{ marginBottom: "-30px" }}
    >
      <div className="container-fluid">
        {/* Brand with hover effect */}
        <a
          className="navbar-brand fw-bold d-flex align-items-center"
          href="/"
          style={{
            transition: "transform 0.2s ease, color 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.color = "var(--bs-primary)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.color = "";
          }}
        >
          🍳 Pinoy Recipes
        </a>

        <div className="d-flex align-items-center">
          {/* Favorites link with hover animation */}
          <Link
            className="nav-link fw-semibold me-3 position-relative"
            to="/favorites"
            style={{
              transition: "transform 0.2s ease, color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.color = "var(--bs-primary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.color = "";
            }}
          >
            Favorites{" "}
            {favorites.length > 0 && (
              <span className="badge bg-primary ms-1">{favorites.length}</span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
