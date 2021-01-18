import React, {useEffect, useState} from "react";
import Recipe from './Recipe.js';
import './App.css';

function App() {

  const APP_ID = '7762e2bc';
  const APP_KEY = '0dc48968ed28c8bc6bbe0014a7bdc4e4';

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search)
    setSearch('')
  }

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  return (
    <div className="App">
      <form  onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" placeholder="Enter Food Name" value={search}
        onChange={updateSearch}
        >

        </input>
        <button className="search-button" type="submit">search</button>
      </form>
      <div className='recipes'>
      {recipes.map(recipe =>(
        <Recipe title={recipe.recipe.label} calories={recipe.recipe.calories}
        image={recipe.recipe.image} key={recipe.recipe.label} ingredients={recipe.recipe.ingredients}
        />
      ))};
      </div>
    </div>
  );
};

export default App;
