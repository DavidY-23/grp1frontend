import "./styles/Contact.css";
import HomeNav from "./HomeNav";
import bg from "../images/Contact_BG.jpeg";

function ContactPage() {
  return (
    <div className="Contact">
      <HomeNav id="Homenav" />
      <img className="BG" src={bg} />
    </div>
  );
}

export default ContactPage;
