import img1 from "../assets/images/marcela-laskoski-YrtFlrLo2DQ-unsplash.jpg";
import img2 from "../assets/images/mohammad-metri-1oKxSKSOowE-unsplash.jpg";
import img3 from "../assets/images/nainoa-shizuru-NcdG9mK3PBY-unsplash.jpg";
import img4 from "../assets/images/austin-neill-hgO1wFPXl3I-unsplash.jpg";

function AlbumSection() {
  return (
    <>
      <div
        className="col-12 text-center"
      >
       
        <h1 style={{ fontFamily: "Lucida Handwriting, cursive",color:"gold"}}>Top Singers Albums</h1>
      </div>

      <div className="container py-5">
        <div className="row g-3">

          <div className="col-6 col-md-4 col-lg-3">
            <div className="category-card">
              <img src={img1} alt="Album" />
              <div className="overlay">
                <h3>ATIF ASLAM</h3>
                <p>TOP SONGS</p>
              </div>
            </div>
          </div>

          <div className="col-6 col-md-4 col-lg-3">
            <div className="category-card">
              <img src={img2} alt="Album" />
              <div className="overlay">
                <h3>YOUNG STUNNERS</h3>
                <p>ENERGY FOR YOUTH</p>
              </div>
            </div>
          </div>

          <div className="col-6 col-md-4 col-lg-3">
            <div className="category-card">
              <img src={img3} alt="Album" />
              <div className="overlay">
                <h3>LIVE</h3>
                <p>LIVE CONCERTS</p>
              </div>
            </div>
          </div>

          <div className="col-6 col-md-4 col-lg-3">
            <div className="category-card">
              <img src={img4} alt="Album" />
              <div className="overlay">
                <h3>ARIJIT SINGH</h3>
                <p>YOUR PAIN IS VOICE</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default AlbumSection;