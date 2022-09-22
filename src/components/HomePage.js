import "./styles/HomePage.css";
import HomeNav from "./HomeNav";
import bg1 from "../images/Home_BG1.jpeg";
import bg2 from "../images/Home_BG2.jpeg";
import middle from "../images/Home_Middle.png";
import bowl1 from "../images/Home_Bowl1.png";
import bowl2 from "../images/Home_Bowl2.png";
import bowl3 from "../images/Home_Bowl3.png";

function HomePage() {
  return (
    <div className="Home">
      <HomeNav id="Homenav" />
      <img className="BG" src={bg1} />
      <img className="BGBottom" src={bg2} />
      <img className="middle" src={middle} />
      <img className="bowl" id="bowl" src={bowl1} />
      <img className="bowl" id="bowl2" src={bowl2} />
      <img className="bowl" id="bowl3" src={bowl3} />
      <div className="msg">
        <span className="msgHeader">Welcome to Diet Unquiet</span>
        <h2>Start your health journey today</h2>
      </div>
    </div>
  );
}

export default HomePage;
