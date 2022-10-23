import React, {useState} from "react";
import { useLocation } from "react-router-dom";
import data from "./JSON files/recipelistAll.json"
import { Link } from 'react-router-dom';
import './styles/SearchResultsPage.css'
import { fontSize, sizeHeight } from "@mui/system";

const SearchResults = (props) => {
    const { state } = useLocation();
    const { searchName } = state;
    const [newSearch, setNewSearch] = useState(searchName);

    let handleInput = (e) => {
        setNewSearch(e.target.value);
    };

    const filteredData = data.filter((el) => {
        // if no input the return the original
        if (newSearch === '') {
            //return el;
            return '';
        }
        //return the item which contains the user input
        else {
            return el.name.toLowerCase().includes(newSearch);
        }
    })

    console.log(filteredData);

    return(
        <div className="SearchResultsPage">
            <div className="SearchBarSRP">
                <input type="Text" className="SearchBarTextSRP" value={newSearch} onChange={handleInput}/>
                { (newSearch !== "") ? 
                    (<div className="WrapperSRP">
                        {filteredData.map((item) => (
                            <div key={item.name}>
                                <img src={item.image} alt="" className="PreviewSRP"/>
                                <div className="TextWrapperSRP">
                                    <div className="NameWrapperSRP"> 
                                        <Link style={{ textDecoration: 'none' }} to={'/home/recipesearch/RecipeDetails/' + item.name.replaceAll(" ", "-")} state={{name: item.name, yt: item.youtube, image: item.image, instructions: item.instructions, ingredients: item.ingredients, measurements: item.measurements}}>
                                            <span className="NameSRP" id="NameSRP">{item.name}</span>
                                        </Link>
                                    </div> <br/>
                                    <div className="IngredientWrapperSRP">
                                        {
                                            item.ingredients.map((ingr) => (
                                                <span className="IngredientSRP">{ingr.toUpperCase()}</span>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>) : (<h2/>)
                }
            </div>
        </div>
    );
};

export default SearchResults;