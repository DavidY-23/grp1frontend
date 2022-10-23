import { React} from 'react';
import data from "./JSON files/recipelistAll.json"
import { Link } from 'react-router-dom';
import './styles/SearchResults.css';

function List(props) {
    //create a new array by filtering the original array
    const filteredData = data.filter((el) => {
        // if no input the return the original
        if (props.input === '') {
            //return el;
            return '';
        }
        //return the item which contains the user input
        else {
            return el.name.toLowerCase().includes(props.input)
        }
    })
    return (
        <ul className="SearchWrapper">
            <div >
                {filteredData.map((item) => (
                    <div key={item.name}>
                        <Link to={'/home/recipesearch/RecipeDetails/' + item.name.replaceAll(" ", "-")} state={{name: item.name, yt: item.youtube, image: item.image, instructions: item.instructions, ingredients: item.ingredients, measurements: item.measurements}}>
                            <button className="searchResults">{item.name}</button>
                            {/* <hr className="borderBottom"/> */}
                        </Link><br/>
                    </div>
                ))}
            </div>
        </ul>
    )
}

export default List