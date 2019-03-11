/* Exercise:

So we want to implement my favorite list of the movies(titles). And you want to use localStorage for this. Also make sure you dont add the same title twice.

partial code for this:
localStorage.getItem('favList')!=null
{
  'myFavs':['movie title 1','movie title 2]
}
localStorage.setItem('favList',valueofmovies);


*/

const xhr=new XMLHttpRequest();

const iconsImg={
    'title':'movie_title.png',
    'director':'movie_director.png',
    'actors':'movie_actor.png',
    'revenue':'movie_revenue.jpg',
    'plot':'movie_plot.png'

}



function searchMovie(){
    let movieTitle=document.getElementById('movie_title').value;
    let movieYear=document.getElementById('movie_year').value;

    let fullUrl=apiUrl+'apikey='+apiKey+'&t='+movieTitle+'&y='+movieYear;

    console.log(fullUrl);
    
    
    //const xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
      if(this.readyState==4 && this.status==200){
        //console.log(xhr.responseText);
        //let myData=xhr.responseText;
        formatMovieData(xhr.responseText);
      }
    }
    xhr.open('GET',fullUrl,true);
    xhr.send();
}

/*
name: "Linda Hamilton"
popularity: 4.073
profile_path: "/fcRpgjonpH3WmPs0V63g7iP7Dbm.jpg"
*/

function formatActorDetails(data){
  data=JSON.parse(data);
  //console.log(data);
  //console.log(data.results[0]);
  let result=data.results[0];
  let htmlResp=`
     <img src="${actorProfilePath+result.profile_path}" /><br/>
     Name: ${result.name}`;
 
  document.getElementById('actorDetails').innerHTML=htmlResp;
}

function getActorData(actorValue){
  console.log('get actor data');
  //https://api.themoviedb.org/3/search/person?api_key=1f7a50047ea818a76ef3ffff755426c1&query=al%20pacino
  let fullUrl=actorUrl+'api_key='+actorApiKey+'&query='+actorValue;
  console.log(actorUrl);
  console.log('full actor url',fullUrl);
  
  //const xhr=new XMLHttpRequest();
  xhr.onreadystatechange=function(){
    if(this.readyState==4 && this.status==200){
      //formatMovieData(xhr.responseText);
      formatActorDetails(xhr.responseText)
    }
  }
  xhr.open('GET',fullUrl,true);
  xhr.send();
}


function formatActorsData(actorsData){
  //al pacino, michele pfifer, villain guy
   let arr=actorsData.split(',');
   let output='';
   arr.forEach(
      (item)=>{
         item=item.trim();
         output +=`<a href='#' onclick="getActorData('${item}')">${item}</a> `;
      }
   );
   return output;
}

//localStorage.clear();

function addToMyFavList(title){
   if(localStorage.getItem('favList')){
       //favList already exists in localstorage
       //console.log(localStorage.getItem('favList'));
       let myFavList=JSON.parse(localStorage.getItem('favList'));
       if(!myFavList["my_list"].includes(title)){
        myFavList["my_list"].push(title);
       }
       
       localStorage.setItem('favList',JSON.stringify(myFavList));

       console.log(localStorage.getItem('favList'));
       
   }
   else{
     //favList doesn't exist in local storage
     let myFavList={};
     myFavList["my_list"]=[title];
     localStorage.setItem('favList',JSON.stringify(myFavList));

     console.log(localStorage.getItem('favList'));
    }

}
function deleteFav(item){
       let myFavList=JSON.parse(localStorage.getItem('favList'));
       if(myFavList["my_list"].includes(item)){
          myFavList["my_list"].splice(myFavList["my_list"].indexOf(item),1);
       }
       localStorage.setItem('favList',JSON.stringify(myFavList));
       showMyFavList();
}
//localStorage.clear();
function showMyFavList(){
  if(localStorage.getItem('favList')){
    let myFavList=JSON.parse(localStorage.getItem('favList'));
    let favOutput='<ul class="favList">';
    for(let item of myFavList["my_list"]){
      favOutput += `<li>${item} <img src="images/delete.png" onclick="deleteFav('${item}')"/></li>`;
    }
    favOutput +='</ul>';
    document.getElementById('modalContent').innerHTML=favOutput;
  }
  else{
    //console.log('show my fav empty list');
    document.getElementById('modalContent').innerHTML='You Dont Have Any Favorites!';
  }
  document.getElementById('modalHolder').style.display='block';

}

function formatMovieData(data){
     data=JSON.parse(data);
     //console.log(data);
     console.log(data.Actors);

     let htmlResp=`<div id="poster" class="poster"><img src="${data.Poster}"/></div>
     <div>
     <button onclick="addToMyFavList('${data.Title}')">Add to My Fav</button>
     <button onclick="showMyFavList()">Show My Fav List</button>
     </div>
     <ul class='ulMovieDetails'>
     <li><span class='icon'><img src="images/${iconsImg["title"]}"/></span> <span class='title'>${data.Title}</span></li>
     <li><span class='icon'>Year: </span>${data.Year}</li>
     <li><span class='icon'>Rated: </span>${data.Rated}</li>
     <li><span class='icon'><img src="images/${iconsImg["director"]}"/></span> ${data.Director}</li>
     <li><span class='icon'><img src="images/${iconsImg["actors"]}"/></span> ${formatActorsData(data.Actors)}</li>
     <li><div id="actorDetails" class="actorDetails"></div></li>
     <li><span class='icon'><img src="images/${iconsImg["revenue"]}"/></span> <span class="money">${data.BoxOffice}</span></li>
     <li><span class='icon'><img src="images/${iconsImg["plot"]}"/></span> ${data.Plot}</li>
     </ul>`;
     
     console.log(htmlResp);

     document.getElementById('results').innerHTML=htmlResp;

}

function closeModal(){
  document.getElementById('modalContent').innerHTML='';
  document.getElementById('modalHolder').style.display='none';
}