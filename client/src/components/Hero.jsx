import hero1 from "../assets/images/marcela-laskoski-YrtFlrLo2DQ-unsplash.jpg";
import hero2 from "../assets/images/mohammad-metri-1oKxSKSOowE-unsplash.jpg";
import logo from "../assets/images/logo.png";

function Hero() {
  return (
    <div className="container py-5 hero-section">
      <div
        style={{ marginTop: "60px" }}
        id="heroSlider"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">

          {/* Slide 1 */}
          <div className="carousel-item active">
            <div className="hero">
              <img src={hero1} className="hero-img" alt="" />

              <div className="overlay"></div>

              <div className="hero-content">

                <div className="top-buttons">
                  <button className="btn btn-light rounded-pill px-4">
                    Sign In
                  </button>

                  <button className="btn btn-dark rounded-pill px-4">
                    Create Account
                  </button>
                </div>

                <div className="left-content">
                  <h1>
                    IT ALL STARTS WITH
                    <br />
                    AN UPLOAD.
                  </h1>

                  <p>
                    SoundCloud is where you define what's next in music.
                    Just hit upload.
                  </p>

                  <div className="mt-4">
                    <button className="btn btn-light rounded-pill px-4 me-3">
                      Upload
                    </button>

                    <button className="btn btn-outline-light rounded-pill px-4">
                      Explore Artist Pro
                    </button>
                  </div>
                </div>

                {/* <div className="artist">
                  <img
                    src={logo}
                    className="img-fluid"
                    style={{ height: "50px" }}
                    alt=""
                  />
                </div> */}

              </div>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="carousel-item">
            <div className="hero">
              <img src={hero2} className="hero-img" alt="" />

              <div className="overlay"></div>

              <div className="hero-content">

                <div className="top-buttons">
                  <button className="btn btn-light rounded-pill px-4">
                    Sign In
                  </button>

                  <button className="btn btn-dark rounded-pill px-4">
                    Create Account
                  </button>
                </div>

                <div className="left-content">
                  <h1>
                    DISCOVER NEW
                    <br />
                    MUSIC
                  </h1>

                  <p>Upload and share your music with the world.</p>

                  <div className="mt-4">
                    <button className="btn btn-light rounded-pill px-4 me-3">
                      Upload
                    </button>

                    <button className="btn btn-outline-light rounded-pill px-4">
                      Explore
                    </button>
                  </div>
                </div>

                <div className="artist">
                  <img
                    src={logo}
                    className="img-fluid"
                    style={{ height: "50px" }}
                    alt=""
                  />
                </div>

              </div>
            </div>
          </div>

        </div>

        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#heroSlider"
            data-bs-slide-to="0"
            className="active"
          ></button>

          <button
            type="button"
            data-bs-target="#heroSlider"
            data-bs-slide-to="1"
          ></button>
        </div>
      </div>
    </div>
  );
}

export default Hero;