const loadPhone = async(searchText,isShowAll) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones,isShowAll);
} 

const displayPhones = (phones,isShowAll) =>{
    console.log(phones)
    const phoneContainer = document.getElementById('phone-container');
// clear phone container cards  before adding new cards 
phoneContainer.textContent = '';
const showAllContainer = document.getElementById('show-all-container');
if(phones.length > 12 && !isShowAll){
    showAllContainer.classList.remove('hidden');
}
else{
    showAllContainer.classList.add('hidden');
}
console.log('is show all',isShowAll)
// display only first 12 phones
if(!isShowAll){
    phones = phones.slice(0,12);
}


    phones.forEach(phone => {
        console.log(phone);
        // 2 create a phone
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-100 p-4 shadow-xl`;
        // 3 set innerText HTML
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
    <div class="card-body">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions justify-center">
        <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
        </div>
        </div>
        `;

        // 4 append child
        phoneContainer.appendChild(phoneCard);
    });

    toggleLoadingSpinner(false);
}

const handleShowDetail = async (id) =>{
    console.log('click', id);
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    console.log(data);
}
const handleSearch = (isShowAll) =>{
    toggleLoadingSpinner(true);
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  console.log(searchText);
  loadPhone(searchText,isShowAll);
}

// const handleSearch2 = () =>{
//     toggleLoadingSpinner(true);
//     const searchField = document.getElementById('search-field2');
//     const searchText = searchField.value;
//     loadPhone(searchText);
// }
const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }
    else{
        loadingSpinner.classList.add('hidden');
    }
}

// handel show all
const handleShowAll = () =>{
    handleSearch(true);
}
// loadPhone()