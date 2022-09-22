import "./styles/About.css";
import HomeNav from "./HomeNav";
import bg from "../images/About_BG.webp";

function AboutPage() {
  return (
    <div className="About">
      <HomeNav id="Homenav" />
      <img className="BG" src={bg} />
    </div>
  );
}

export default AboutPage;
