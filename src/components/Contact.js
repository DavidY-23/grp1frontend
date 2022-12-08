import "./styles/Contact.css";
import WelcomeNav from "./WelcomeNav";
import bg from "../images/background5.jpg";

function ContactPage() {
  return (
    <div className="aboutbc">
      <WelcomeNav id="Welcomenav" />
      <img className="BG" src={bg} />
      <h1 className="aboutheaderc">Contact Page</h1>
      <h2 className="aboutheader2c">Github Links</h2>
      <h3 className="aboutheader3c">Website Github:</h3>
      <a className="aboutac" href="https://github.com/DavidY-23/grp1frontend">https://github.com/DavidY-23/grp1frontend</a>
      <h3 className="aboutheader3c">Restful API Github:</h3>
      <a className="aboutac" href="https://github.com/AConstantinou325/exercise-api">https://github.com/AConstantinou325/exercise-api</a>
      <h2 className="aboutheader2c">Contact Information</h2>
      <p className="aboutpc">If you have any issues, please try contacting us<br/> through our email services using the following emails:</p>
      <h3 className="aboutheader3c">Questions about recipes go to:</h3>
      <p className="aboutpc">Diet123@dmail.com</p>
      <h3 className="aboutheader3c">Questions about exercises go to:</h3>
      <p className="aboutpc">Exercise321@zmail.com</p>
      <h2 className="aboutheader2c">Contact Phone Number</h2>
      <p className="aboutpc">348-552-4242</p>
    </div>
  );
}

export default ContactPage;
