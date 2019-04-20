import React from "react";
import style from "./recipe.module.css";

//This will the the Recipe UI
const Recipe = ({ title, calories, image, ingredients }) => {
  return (
    //everything here were set up from App.js with setting up all the API
    <div className={style.recipe}>
      <h1>{title}</h1>
      <ul>
        {ingredients.map(ingredient => (
          <li>{ingredient.text}</li>
        ))}
      </ul>
      <p>{calories}</p>
      <img className={style.image} src={image} />
    </div>
  );
};

export default Recipe;
