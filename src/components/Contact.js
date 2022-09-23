import "./styles/Contact.css";
import WelcomeNav from "./WelcomeNav";
import bg from "../images/Contact_BG.jpeg";

function ContactPage() {
  return (
    <div className="Contact">
      <WelcomeNav id="Welcomenav" />
      <img className="BG" src={bg} />
    </div>
  );
}

export default ContactPage;
