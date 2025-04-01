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

const categoriesBtn = async (data) => {
    const pets = await fetchapi(`https://openapi.programming-hero.com/api/peddy/category/${data}`)
    const petsData = pets.data;
    displayPets(petsData);
    activeBtn(data);
};

const activeBtn = (data) => {
   const btn = document.getElementById(`btn-${data}`);
    const btns = document.getElementsByClassName('btn-id');
    for (let b of btns) {
        b.classList.remove('btn-info')
    }
    btn.classList.add('btn-info')
};

const getPets = async (category) => {
    const pets = await fetchapi('https://openapi.programming-hero.com/api/peddy/pets');
    const eachPets = pets.pets;
    displayPets(eachPets);
};

const getCatagories = async () => {
    const catrgories = await fetchapi('https://openapi.programming-hero.com/api/peddy/categories');
    const eachCategories = catrgories.categories;
    const categoriesContainer = document.getElementById('categories-container');
    eachCategories.forEach((item) => {
        // console.log(item);
        const div = document.createElement('div');
        div.innerHTML = `
        <button id="btn-${item.category}" onclick="categoriesBtn('${item.category}')" class="btn btn-id md:text-xl lg:text-xl"><img class="w-4 md:w-8 lg:w-8" src="${item.category_icon}" alt="">${item.category}</button>
        `
        categoriesContainer.append(div);
    })
};

const displayPets = (pets) => {
    const petsContainer = document.getElementById('pets-container');
    petsContainer.innerHTML = '';
    // console.log(pets);
    if (pets.length === 0) {
        petsContainer.classList.remove('grid');
        petsContainer.innerHTML = `
        <div class="flex text-center justify-center bg-base-100 shadow-sm">
          <div class="flex flex-col items-center justify-center">
            <img class="w-20 md:full lg:w-full" src="./images/error.webp" alt="">
            <h2 class="text-xl mt-5 md:text-2xl lg:text-3xl">NO Data here</h2>
            <p class="mt-3 mb-5 text-base">Sorry, we don't have any data here</p>
          </div>
        </div>
        `
    }
    else{
        petsContainer.classList.add('grid');
    }
    pets.forEach((item) => {
        const div = document.createElement('div');
        // console.log(item);
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
                <li class="flex gap-1 items-center"> <img class="w-7" src="./images/icons8-bulldog-30.png" >Breed: ${item.breed === undefined || item.breed === null ? 'No Name Available' : item.breed}</li>
                <li class="flex gap-1 items-center"> <img class="w-7" src="./images/icons8-age-24.png" alt=""> Birth: ${item.date_of_birth === null || item.date_of_birth === undefined ? 'No Date of Birth Available' : item.date_of_birth}</li>
                <li class="flex gap-1 items-center"> <img class="w-7" src="./images/icons8-gender-48.png" alt=""> Gender: ${item.gender === undefined || item.gender === null ? 'No Gender Available' : item.gender}</li>
                <li class="flex gap-1 items-center"> <img  class="w-7"src="./images/icons8-price-50.png" alt=""> Price: ${item.price === undefined || item.price === null ? 'NO Price available' : item.price}</li>
           </ul>
           <div class="card-actions mt-4">
             <button class="btn">
             <label class="swap swap-flip">
                <!-- this hidden checkbox controls the state -->
                <input type="checkbox" />
                <div class="swap-off"><img class="w-7" src="./images/icons8-facebook-like-24.png" alt=""></div>
                <div class="swap-on"><img class="w-7" src="./images/icons8-facebook-like-24 (1).png" alt=""></div>
            </label>
            </button>
             <button class="btn text-green-600 text-bold">Adopt</button>
             <button onclick="detailsData(${item.petId})" class="btn text-green-600 text-bold">Details</button>
           </div>
        </div>
        `
        petsContainer.append(div);
    });

};

const detailsData = async (id) => {
    const details = await fetchapi(`https://openapi.programming-hero.com/api/peddy/pet/${id}`);
    const detailsData = details.petData;
    console.log(detailsData);
    const detailsContainer = document.getElementById('modal-content')
    detailsContainer.innerHTML = `
    <div class="card w-full shadow-sm">
  <figure>
    <img
     class="w-full" src="${detailsData.image}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">
             ${detailsData.pet_name}
           </h2>
     <ul class="">
                <li class="flex gap-1 items-center"> <img class="w-7" src="./images/icons8-bulldog-30.png" >Breed: ${detailsData.breed === undefined || detailsData.breed === null ? 'No Name Available' : detailsData.breed}</li>
                <li class="flex gap-1 items-center"> <img class="w-7" src="./images/icons8-age-24.png" alt=""> Birth: ${detailsData.date_of_birth === null || detailsData.date_of_birth === undefined ? 'No Date of Birth Available' : detailsData.date_of_birth}</li>
                <li class="flex gap-1 items-center"> <img class="w-7" src="./images/icons8-gender-48.png" alt=""> Gender: ${detailsData.gender === undefined || detailsData.gender === null ? 'No Gender Available' : detailsData.gender}</li>
                <li class="flex gap-1 items-center"> <img  class="w-7"src="./images/icons8-price-50.png" alt=""> Price: ${detailsData.price === undefined || detailsData.price === null ? 'NO Price available' : detailsData.price}</li>
           </ul>
    </div>
     <div class="modal-action flex justify-center mb-5">
        <form method="dialog">
          <button class="btn btn-primary">Close</button>
        </form>
    </div>
  </div>
    
    `
    document.getElementById('my_modal_1').showModal();

};

getPets();
getCatagories();