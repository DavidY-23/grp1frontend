import "./styles/About.css";
import WelcomeNav from "./WelcomeNav";
import bg from "../images/About_BG.webp";

function AboutPage() {
  return (
    <div className="About">
      <WelcomeNav id="Welcomenav" />
      <img className="BG" src={bg} />
    </div>
  );
}

export default AboutPage;
