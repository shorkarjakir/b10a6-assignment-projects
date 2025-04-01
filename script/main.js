const fetchapi = async (url) => {
    try {
        const res = await fetch(url);
        const data = await res.json();
        return data;
    }
    catch (error) {
        console.log(`Error Fetching ${url}`, error);
    }
};

const getCatagories = async () => {
    const catrgories = await fetchapi('https://openapi.programming-hero.com/api/peddy/categories');
    const eachCategories = catrgories.categories;
    const categoriesContainer = document.getElementById('categories-container');
    eachCategories.forEach((item) => {
        // console.log(item);
        const div = document.createElement('div');
        div.innerHTML = `
        <button class="btn md:text-xl lg:text-xl"><img class="w-4 md:w-8 lg:w-8" src="${item.category_icon}" alt="">${item.category}</button>
        `
        categoriesContainer.append(div);
    })
};

const getPets = async () => {
    const pets = await fetchapi('https://openapi.programming-hero.com/api/peddy/pets');
    const eachPets = pets.pets;
    console.log(eachPets);
    const petsContainer = document.getElementById('pets-container');
    eachPets.forEach((item) => {
        const div = document.createElement('div');
        console.log(item);
        div.innerHTML = `
      <div class="card bg-base-100 shadow-sm">
         <figure class="">
         <img class="w-full rounded-lg"
         src="${item.image}"
             alt="Shoes" />
         </figure>
         <div class="card-body">
           <h2 class="card-title">
             ${item.pet_name}
           </h2>
           <ul class="">
                <li class="flex gap-1 items-center"> <img class="w-7" src="./images/icons8-bulldog-30.png" >Breed: ${item.breed}</li>
                <li class="flex gap-1 items-center"> <img class="w-7" src="./images/icons8-age-24.png" alt=""> Birth: ${item.date_of_birth}</li>
                <li class="flex gap-1 items-center"> <img class="w-7" src="./images/icons8-gender-48.png" alt=""> Gender: ${item.gender}</li>
                <li class="flex gap-1 items-center"> <img  class="w-7"src="./images/icons8-price-50.png" alt=""> Price: ${item.price}</li>
           </ul>
           <div class="card-actions justify-end">
             <div class="badge badge-outline">Fashion</div>
             <div class="badge badge-outline">Products</div>
           </div>
        </div>
        `
        petsContainer.append(div);
    });

};

getPets();
getCatagories();