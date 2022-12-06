import "./styles/About.css";
import WelcomeNav from "./WelcomeNav";
import bg from "../images/About_BG.webp";

function AboutPage() {
  return (
    <div className="About">
      <WelcomeNav id="Welcomenav" />
      <img className="BG" src={bg} />
      <h1 className="aboutheader">About Page</h1>
      <h2 className="aboutheader2">General Description</h2>
      <p>The purpose of Diet Unquiet is to be a dieting app that offers<br/>the user a creative, and efficient way to lose weight.<br/>The app is constructed to offer the users a variety of options and<br/>approaches when it comes to losing weight, and staying healthy.
      </p>
      <h3>Recipe Search</h3>
      <p>Our recipe search tools is capable of finding the perfect food for anyones needs.<br/> It is capable of narrowing down the search results accurately and quickly.<br/>
      It also is capable of finding over 100 unique and fun recipes for everyones needs.
      </p>
      <h3>Adding Your Own Recipes</h3>
      <p>Ontop of the already amazing recipes which we have hand selected, we also have<br/> decided on letting the users experiment, and add their own recipes.<br/>
      Doing this will not only grow our already diverse food network,<br/> but will also allow users to share their own ideas<br/> and help further grow our community.
      </p>
      <h3>Exercise Search</h3>
      <p>Our exercise search was hand crafted for our users best experience.<br/> It comes  with all the information required for somebody<br/> to start learning the exercises
      and have fun doing so.
      </p>
      <h3>Adding Your Own Exercises</h3>
      <p>Just like with recipe search, we are also giving the users the capability<br/> of adding their own custom workouts as well.
      With this method,<br/> not only will users be able to learn new exercises all the time,<br/> but they will also inspire people to get creative<br/> and enjoy the unique experience much more.
      </p>
      <h3>BMI Calculator</h3>
      <p>With our BMI calculator, we will be able to let the user know exactly where they stand,<br/> which will then allow them to decide what they
      would like to do going forward,<br/> whether that be exercising more and bulking up, or going on a diet to lose weight.<br/> Thanks to our BMI calculator, that
      decision will become way easier to make
      </p>
      <h3>Fitness Locator Tool</h3>
      <p>One of our most exciting features would be this custom made fitness locator tool.<br/> People will be able to easily tell exactly where they need to go,<br/> without
      the hassle of using extra applications. Our quick and easy locator tool<br/> will help the users find the absolute best gyms and parks near them.
      </p>
      <h3>Extra Links</h3>
      <p>Link to our recipe search API:</p>
      <a href="https://www.themealdb.com/">Recipe Search API</a>
      <p>Link to our custom exercise search API:</p>
      <a href="https://vast-teal-ostrich-ring.cyclic.app/">Exercise Search API</a>
    </div>
  );
}

export default AboutPage;
