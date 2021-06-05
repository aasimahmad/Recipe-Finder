import './App.css';
import { useEffect, useState, useRef } from 'react';

function App() {
  const [ingredientList, updateIngredientList] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const API_KEY = process.env.REACT_APP_API_KEY;
  const APP_ID = process.env.REACT_APP_ID;

  const search = () => {
    searchForRecipe(inputRef.current.value);
    inputRef.current.value = '';
  };
  const searchForRecipe = (query) => {
    setLoading(true);
    let url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${API_KEY}`;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        updateIngredientList(res.hits);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const keyHandler = (e) => {
    if (e.key === 'Enter') {
      search();
    }
  };

  useEffect(() => {
    searchForRecipe('paneer');
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div className="Title">RECIPE FINDER</div>
        <div className="InputWrapper">
          <input
            ref={inputRef}
            placeholder="Search for Recipe"
            onKeyDown={(e) => keyHandler(e)}
          />
          <button onClick={search}>Search</button>
        </div>

        {loading && <p>Loading...</p>}

        <div className="Wrapper">
          {ingredientList.map(({ recipe }) => {
            const { label, image, ingredientLines } = recipe;
            return (
              <div key={label} className="Ingredient">
                <span>{label}</span>
                <img src={image} alt="Recipe" />
                <div className="Steps">
                  {ingredientLines.map((step, index) => {
                    return <p key={index}> {step} </p>;
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </header>
    </div>
  );
}

export default App;
