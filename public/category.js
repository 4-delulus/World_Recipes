function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

async function fetchMealsByCategory(category) {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      const data = await response.json();
      displayMeals(data.meals);
  }

  function displayMeals(meals) {
      let resultContainer = document.querySelector('#result');
      let html = '';
      for (let meal of meals) {
          html += `<button onclick="getRecipeById('${meal.idMeal}')" class="button-card">
              <p>${meal.strMeal}</p>
              <div>
                  <img src="${meal.strMealThumb}">
              </div>
          </button>`;
      }
      resultContainer.innerHTML = html;
  }

  const category = getQueryParam('category');
  if (category) {
      fetchMealsByCategory(category);
  } else {
      console.error('Category not specified.');
  }

async function getRecipeById(id) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await response.json();
  displayRecipe(data.meals[0]);
}

function displayRecipe(recipe) {
    let recipeContent = document.querySelector('.recipe-content');
    let html = `
        <h2>${recipe.strMeal}</h2>
        <h3>Ingredients</h3>
        <ul class="recipe">
    `;

    for (let i = 1; i <= 20; i++) {
        let ingredient = recipe[`strIngredient${i}`];
        let measure = recipe[`strMeasure${i}`];
        if (ingredient && measure) {
            html += `<li>${measure} ${ingredient}</li><br>`;
        }
    }

    html += `</ul>
        <h3>Instructions</h3>
        <p>${recipe.strInstructions.split('.').map(instruction => instruction.trim()).join('.<br>')}</p>
        <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
        <br>
        <br>
        <p>Click here to see Youtube Video: <a href="${recipe.strYoutube}">YouTube Link</a>
        </p>
        <p>Click here to see Recipe Source: <a href="${recipe.strSource}">Source Link</a>
        </p> 
    `;
    recipeContent.innerHTML = html;

    let modal = document.getElementById('recipeModal');
    let closeButton = document.querySelector('.close');
    modal.style.display = 'block';

    closeButton.onclick = function() {
        modal.style.display = 'none';
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
}
