import "./styles/WelcomePage.css";
import WelcomeNav from "./WelcomeNav";
import bg1 from "../images/Welcome_BG1.jpeg";
import bg2 from "../images/Welcome_BG2.jpeg";
import middle from "../images/Welcome_Middle.png";
import bowl1 from "../images/Welcome_Bowl1.png";
import bowl2 from "../images/Welcome_Bowl2.png";
import bowl3 from "../images/Welcome_Bowl3.png";

function WelcomePage(props) {
  return (
    <div className="Welcome">
      <WelcomeNav exercises={props.exercises} setexercises={props.setexercises} part_checks={props.part_checks} setpart_checks={props.setpart_checks} exercise_data={props.exercise_data} setexercise_data={props.setexercise_data} data={props.data} setdata={props.setdata} filter_check={props.filter_check} setfilter_check={props.setfilter_check} allergy_check={props.allergy_check} set_allergycheck={props.set_allergycheck} ingredients_to_avoid={props.ingredients_to_avoid} set_ingredients_to_avoid={props.set_ingredients_to_avoid} ingredient_names={props.ingredient_names} set_ingredient_names={props.set_ingredient_names} filters={props.filters} setFilter={props.setFilter} firstName={props.firstName} setFirstName={props.setFirstName} lastName={props.lastName} setLastName={props.setLastName} age={props.age} setAge={props.setAge} gender={props.gender} setGender={props.setGender} weight={props.weight} setWeight={props.setWeight} height={props.height} setHeight={props.setHeight} allergies={props.allergies} setAllergies={props.setAllergies} injury={props.injury} setInjury={props.setInjury} userID={props.userID} setUserID={props.setUserID} id="Welcomenav" />
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

export default WelcomePage;
