//we will be using useEffect and so we will add it here after React, as well as useState
import React, { useEffect, useState } from "react";
import Recipe from "./Recipe";
import "./App.css";

const App = () => {
  const APP_ID = "f0efdf04";
  const APP_KEY = "25435fd52adc40c0223c1dca3ea2a0e4";

  //everything is stored in here - all the API request
  const [recipes, setRecipes] = useState([]);

  //this is for our search bar
  const [search, setSearch] = useState("");

  //to ensure that it will only fetch request when search/submit button is clicked - next is we change the const response fetch into ${query} instead of chicken
  const [query, setQuery] = useState("chicken");

  //example API GET request - the q after search? means query, so whatever is next to q is what you are searching for - appID is same with the id we got above, same with appKey -  we deleted everything that is after the appkey - and then we remove the "" that means string and we replace it with backslash - ``
  //const exampleReq = `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`;

  //const [counter, setCounter] = useState(0);

  //but the problem with this first version of useEffect is that everytime we click the button the request will add and add and add, and we dont want that, we want it to just send request once.
  // useEffect(() => {
  //   console.log("Effect has been run");
  // });

  //so here's a better one - if we add a comma and an array, it will just going to request only once.
  useEffect(() => {
    getRecipes();
    // console.log("Effect has been run");
  }, [query]);

  //separate function - so we can get request
  const getRecipes = async () => {
    //now we can make asynchronous calls
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );

    //but this is an easier way
    const data = await response.json();
    setRecipes(data.hits);

    //and once the request comes back, we can say - again, this can take some time because we are requesting everything from an external API - so we dont know when this information comes back - make sure to add await everytime you have a promise.
    //   Another thing is to make request is:

    //   fetch(same value with const response https://api...)
    //   .then(response => {
    //     response.json
    //   })
    // }
    //  <h1 onClick={() => setCounter(counter + 1)}>{counter}</h1>
  };

  //this will be the function for our seachbar onchange.
  //events (e) means everytime we run an unchange click then we're going to get this events - basically you can access the target from this events.
  const updateSearch = e => {
    //this is getting the value inserted/written by the user on the searchbar - and then this updateSearch function we can add it inside onChange - then add onSubmit on the form
    setSearch(e.target.value);
    //console.log("search");
  };

  //another function to fix our get request only after we hit search button - rather than getting everything when typing, it will only get what is in the input after hitting search
  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  //we make sure to return our const - what this do is to output everything
  return (
    <div className="App">
      <h1 className="title">Find your Recipe</h1>
      <h4 className="desc">By Ann Adaya</h4>
      <form onSubmit={getSearch} className="search-form">
        {/* we can add onChange - means everytime the input changes, like adding a value to it, its gonna run. so we add onChange with an emptry {}, and then we can add a function, so let's create a function and then we can add it here. */}

        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={updateSearch}
        />
        <button className="search-button" type="submit">
          Search
        </button>
        {/* <h1>Ann's Recipe App</h1> */}
      </form>
      {/* we add reciper.map because remember we have a bracker, and e just want to map everything out, then we say recipe meaning that each individual recipe in here, then rather adding {} we use () because we want to return some html/jsx */}
      <div className="recipes">
        {recipes.map(recipe => (
          //this is how we access the api - Recipe title
          <Recipe
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
