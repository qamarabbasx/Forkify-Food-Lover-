import { elements } from "./base";
export const getInput= () => elements.searchInput.value;
export const clearInput=() => {
    elements.searchInput.value='';
};
export const clearSearchRes=()=>{
    elements.searchResList.innerHTML='';
    elements.searchResPages.innerHTML='';
};
export const highlightSelected = id =>{
    const resultArr= Array.from(document.querySelectorAll('.results__link'));
    resultArr.forEach(el => {
        el.classList.remove('results__link--active')
    });
    const highArray=Array.from(document.querySelectorAll(`.results__link[href*="#${id}"]`));
    highArray.forEach(el2 => {
        el2.classList.add('results__link--active');
    });
    // document.querySelector(`.results__link[href*="#${id}"]`).classList.add('results__link--active');
};
export const limitRecipeTitle= (title,limit=17) => {
    const newTitle=[];
    if(title.length>limit){
        title.split(' ').reduce((prev,cur) => {
            if(prev + cur.length <= limit){
                newTitle.push(cur);
            }
            return prev+cur.length;
        },0);
        return `${newTitle.join(' ')} ...`;
    }
    return title;
};
const renderRecipe=recipe => {
    const markup=`
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="Test">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;
    elements.searchResList.insertAdjacentHTML('beforeend',markup);
};
const createButton = (page,type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 :page + 1}>
        <span>Page ${type === 'prev' ? page - 1 :page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' :'right'}"></use>
        </svg>
    </button>

`;
const renderButtons = (page,numOfRes,resPerPage) => {
    let button;
    const pages = Math.ceil(numOfRes / resPerPage);
    if (page === 1 && pages > 1){
        // only display next page button
        button = createButton(page,'next');
    } else if (page < pages){
        // display both buttons
        button = `${createButton(page,'prev')}
                ${createButton(page,'next')}
        `;
    } else if (page === pages &&  pages>1){
        // only display prev page button
        button = createButton(page,'prev');
    }
    elements.searchResPages.insertAdjacentHTML('afterbegin',button)
};
export const renderResults= (recipes,page=1,resPerPage=10) =>{
    // render results of current page
    const start = (page-1)*resPerPage;
    const end = page*resPerPage;
    recipes.slice(start,end).forEach(renderRecipe);

    // render pagination buttons
    renderButtons(page,recipes.length,resPerPage);
};