    import logo from "../assets/images/logor.png";

function Footer() {
  return (
    <div className="footer d-flex justify-content-center mb-3">
      <div
        className="container border border-warning border-5 rounded-4 p-4"
        style={{ backgroundColor: "black" }}
      >
        <div className="row align-items-center">

          <div className="col-lg-4 col-md-4 col-12 text-center">
            <img src={logo} className="img-fluid" alt="Logo" />
          </div>

          <div className="col-lg-8 col-md-8 col-12">
            <h2
              style={{
                fontFamily: "Lucida Handwriting, cursive",
                color: "gold",
              }}
            >
              We Create Music Because Your Smile Is Everything.
            </h2>

            <p style={{ color: "white" }}>
              Beats is your destination for discovering amazing music.
              Explore trending songs, popular artists, and curated playlists,
              all designed to give you the best listening experience in one place. 🎵
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Footer;