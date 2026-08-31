import img1 from "../assets/images/marcela-laskoski-YrtFlrLo2DQ-unsplash.jpg";
import img2 from "../assets/images/mohammad-metri-1oKxSKSOowE-unsplash.jpg";
import img3 from "../assets/images/nainoa-shizuru-NcdG9mK3PBY-unsplash.jpg";
import img4 from "../assets/images/v2osk-1Z2niiBPg5A-unsplash.jpg";
import img5 from "../assets/images/austin-neill-hgO1wFPXl3I-unsplash.jpg";

function Trending() {
  return (
    <>
      <div
        className="trending-title col-12 text-center"
      >
        <h1
    style={{
      fontFamily: "Lucida Handwriting, cursive",
      color: "gold"
    }}
  >
    Trending Music
  </h1>
      </div>

      <section className="py-5 bg-dark">
        <div className="slider-track">

          <div className="card-box">
            <img src={img1} alt="" />
            <h5>Arijit Singh</h5>
            <p style={{color:"gold"}}>INDIA</p>
          </div>

          <div className="card-box">
            <img src={img2} alt="" />
            <h5>Ali Zafar</h5>
            <p style={{color:"gold"}}>PAKISTAN</p>
          </div>

          <div className="card-box">
            <img src={img3} alt="" />
            <h5>Jubin</h5>
            <p style={{color:"gold"}}>INDIA</p>
          </div>

          <div className="card-box">
            <img src={img4} alt="" />
            <h5>Zoya</h5>
            <p style={{color:"gold"}}>PAKISTAN</p>
          </div>

          <div className="card-box">
            <img src={img3} alt="" />
            <h5>Justin Berber</h5>
            <p style={{color:"gold"}}>AMERICA</p>
          </div>

          <div className="card-box">
            <img src={img5} alt="" />
            <h5>Talha</h5>
            <p style={{color:"gold"}}>PAKISTAN</p>
          </div>

          <div className="card-box">
            <img src={img1} alt="" />
            <h5>Guru Randhawa</h5>
            <p style={{color:"gold"}}>INDIA</p>
          </div>

          <div className="card-box">
            <img src={img2} alt="" />
            <h5>Honey Singh</h5>
            <p style={{color:"gold"}}>INDIA</p>
          </div>

        </div>
      </section>
    </>
  );
}

export default Trending;