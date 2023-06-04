
const image_container = document.getElementById("current-image-container");

const submitBtn = document.getElementById("submit");

const search_history = document.getElementById("search-history");

// api key for the retrive data from nasa
const API_key = "TSFEXcYckeUl9iOdfH7GZXhvnjQF8TUQ8bbcMgeF";


// current date
const current_date = new Date().toISOString().split("T")[0];

//  localStorage.removeItem("savedDates");


//create a space in localstorage to save the dates in form list
if(localStorage.getItem("savedDates")==null){
    localStorage.setItem("savedDates",JSON.stringify([]));
}




//the function is display the data in ui in the web browser
function displayImageOfTheDay(data,date){
    if(current_date == date){
        image_container.children[0].innerText ="NASA Picture of the Day";
    }
    else{
        image_container.children[0].innerText =`Picture On ${date}`;
    }
    image_container.children[1].src = data.url;
    image_container.children[2].innerText = data.title;
    image_container.children[3].innerText = data.explanation;
}


// the function is used to get the data from nasa based on date
async function getCurrentImageOfTheDay(date){
   const url =`https://api.nasa.gov/planetary/apod?date=${date}&api_key=${API_key}`;
    
   const response = await fetch(url);

   const data = await response.json();


   displayImageOfTheDay(data,date);

}

 getCurrentImageOfTheDay(current_date);

function getImageOfTheDay(date){
      getCurrentImageOfTheDay(date);
      checkDateAlreadyExistsInHistory(date);
      saveSearch(date);
}

function saveSearch(date){
    //retrive the saved dates from the localstorage
 const savedDates = JSON.parse(localStorage.getItem("savedDates"));
  if(!savedDates.includes(date))
   savedDates.push(date);
   localStorage.setItem("savedDates",JSON.stringify(savedDates));
}
 
function checkDateAlreadyExistsInHistory(date){
    const savedDates =  JSON.parse( localStorage.getItem("savedDates"));
    if(!savedDates.includes(date)){
        addSearchToHistory(date); 
    }
     
}

function addSearchToHistory(date){
      //retrive the saved dates from the localstorage
     
        const li = document.createElement("li");
        li.innerText = date;
        search_history.appendChild(li);
        li.addEventListener("click",()=>{
            getCurrentImageOfTheDay(li.innerText);
        })
}


function displayHistory(){

     const savedDates =  JSON.parse( localStorage.getItem("savedDates"));
      
     savedDates.forEach((date)=> addSearchToHistory(date));

}

displayHistory();

submitBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    const inputDate = document.getElementById("search-input");
    const dis_error = document.getElementById("error");
    if(!inputDate.value)
    {
        error.style.display = "flex";
        error.innerText = "Select the date";
        return;
    }
    error.style.display = "none";
    getImageOfTheDay(inputDate.value);
    

})