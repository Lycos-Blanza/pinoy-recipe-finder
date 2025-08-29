import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import recipes from "../data/recipes.json";

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % recipes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const featured = recipes[currentIndex];

  return (
    <section
      className="d-flex flex-column flex-md-row align-items-center justify-content-between"
      style={{
        paddingTop: "8rem",
        paddingBottom: "8rem",
        minHeight: "100vh",
        gap: "3rem",
        background: "linear-gradient(to bottom, #c2c2c2ff 20%, #ffffff)",
        color: "#232323",
        marginLeft: "-410px",
        marginRight: "-410px",
        paddingLeft: "410px",
        paddingRight: "300px",
      }}
    >
      {/* Left: Image crossfade */}
      <div
        className="col-md-6 text-center position-relative overflow-hidden"
        style={{ height: "420px", width: "50%" }}
      >
        {recipes.map((recipe, index) => (
          <div
            key={recipe.id}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "100%",
              height: "100%",
              transition: "opacity 1s ease-in-out",
              opacity: index === currentIndex ? 1 : 0,
            }}
          >
            <img
              src={recipe.image}
              alt={recipe.name}
              className="img-fluid rounded-4 shadow"
              style={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        ))}
      </div>

      {/* Right: Text and buttons */}
      <div className="col-md-6 text-center text-md-start container">
        <h1 className="fw-bold display-4">
          Discover <span className="text-primary">Delicious</span> Recipes
        </h1>
        <p className="my-3" style={{ maxWidth: "500px", color: "#6c757d" }}>
          Enjoy authentic Filipino dishes like <strong>{featured.name}</strong>.
          Scroll down to explore all the recipes made just for you.
        </p>

        <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-md-start mt-4">
          <a
            href="#recipes"
            className="btn btn-lg rounded-pill px-4 shadow btn-primary"
            onClick={(e) => {
              e.preventDefault();
              const section = document.getElementById("recipes");
              window.scrollTo({
                top: section.offsetTop - 40,
                behavior: "smooth",
              });
            }}
          >
            Explore Recipes →
          </a>
          <Link
            to="/favorites"
            className="btn btn-lg rounded-pill px-4 shadow btn-outline-primary"
          >
            View Favorites
          </Link>
        </div>
      </div>
    </section>
  );
}
