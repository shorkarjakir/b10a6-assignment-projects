const fetchapi = async(url) =>{
    try{
        const res = await fetch(url);
        const data = await res.json();
        return data;
    }
    catch (error){
        console.log(`Error Fetching ${url}`, error);
    }
};

const getCatagories = async() => {
    const catrgories = await fetchapi('https://openapi.programming-hero.com/api/peddy/categories');
    const eachCategories = catrgories.categories;
    const categoriesContainer = document.getElementById('categories-container');
    eachCategories.forEach((item)=>{
        console.log(item);
        const div = document.createElement('div');
        div.innerHTML = `
        <button class="btn text-xl"><img class="w-8" src="${item.category_icon}" alt="">${item.category}</button>
        `
        categoriesContainer.append(div);
    })
};


getCatagories();