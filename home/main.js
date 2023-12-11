

weatherApiKey='4fbd7e056ad5fba4b7cdcd73ff8a1c12'
windowMode='_self'
//console help
console.log(`a brief overview of console functions to customise further

-removeShortcut('shortcutname')
-reorderShortcut('shortcutname',position)
-customStyle('body{
--variablename:vale;
}')
.         variables that can be changed

--font(use @import to import font)
  --round
  --bgmode
  
  --searchbarround
  --searchbarbg
  --searchbarborder
  --searchbartext
  --searchbarprompttext
  
  
  --shortcutbg
  --shortcutround
  --shortcutsize
  --shortcuttext
  --shortcutseperation
  --shortcuthovereffect
  --shortcuttransform
  
  
  --shortcutboxbg
  --shortcutboxround
  --shortcutboxsize
  --shortcutboxtransform

  
  --iconbg
  --iconround
  --iconsize
  
  --btnbg
  --btntext
  
  addCustomStyle() ->adds
  
  addCustomCommand(key ,link)-> searchbar shortcuts
`)



//basics and getting elements 
function id(u){
  return document.getElementById(u)
}

homeSection=id('home')
mainSection=document.querySelector('.main')
popupSection=id('popup')
shortcutNameIn=id('name-in')
shortcutUrlIn=id('url-in')
configMenuBtn=id('config-menu-btn')
configMenuBtnClose=id('menu-close-btn')
configMenu=id('config-menu')
bgin=id('bg-input')
weatherin=id('weather-input')
searchEngineInput=id('search-engine-in')
weatherLink=id('weather-link')
title=id('title')
titleIn=id('title-in')
newsLocationInput=id('country-codes-in')
newsCategoryInput=id('category-in')
//add shortcut function
id('shortcut-add-btn').addEventListener('click',()=>{
  homeSection.classList.add('hide')
  popupSection.classList.remove('hide')
})
id('popup-exit-btn').addEventListener('click',()=>{
homeSection.classList.remove('hide')
  popupSection.classList.add('hide')
})

id('shortcut-create').addEventListener('click',()=>{
  if(shortcutUrlIn.value!='' && shortcutNameIn.value!=''){
  shortcutCreate(shortcutNameIn.value,shortcutUrlIn.value)
  
  shortcutUrlIn.value=''
  shortcutNameIn.value=''
  }
})


//preloading
window.onload=updateInfo
function timeUpdate(){
  
  
  console.log(100)

}


function updateInfo(){
  //newscountry input update
  newsLocationInput.value=localStorage.newsCountry||'in'
  newsCategoryInput.value=localStorage.newsCategory||''
  
  //shortcuts spawning 
 shortcutSaves= JSON.parse(localStorage.getItem('shortcuts')) || []
  shortcutSaves.forEach((shortcut)=>{
    shortcutCreate(shortcut.label,shortcut.image)
  })
  
  //adding external css
  externalCSS=localStorage.getItem('externalCSS')||''
  id('customStyle').innerHTML=externalCSS
  
  //weather & background 
  
  cityName=localStorage.getItem('city')||'mumbai'
  weatherin.value=cityName
  updateWeather()
  
  url=localStorage.getItem('bgimg')||`https://images.unsplash.com/photo-1681823853101-9a0d7e8be47b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80`
  mainSection.style.background=`url('${url}')`
  bgalign()
  
  //browser preferences
  titletxt=localStorage.getItem('browserName')||'brogser'
  if(titletxt!='za warudo'){
  title.innerHTML=titletxt
  titleIn.value=titletxt
  }else{
  currentDate = new Date();
  options = { hour: 'numeric', minute: '2-digit', hour12: true };
  twelveHourTime = currentDate.toLocaleTimeString('en-US', options);
  
  
  title.innerHTML=twelveHourTime
  setInterval(()=>{
    currentDate = new Date();
  options = { hour: 'numeric', minute: '2-digit', hour12: true };
  twelveHourTime = currentDate.toLocaleTimeString('en-US', options);
  
  
  title.innerHTML=twelveHourTime
    }, 1000);
  titleIn.value=titletxt
  }
  searchPreferences=JSON.parse(localStorage.getItem('searchEngine'))||[null]
  
  searchLink=searchPreferences[0] || 'https://www.google.com/search'
  searchPreferenceName=searchPreferences[1]||'google'
  searchEngineInput.value=searchPreferenceName
  
    id('search-inp').setAttribute('placeholder','search '+searchPreferenceName+'...')
    
  //quicksearch
  searchCommands=JSON.parse(localStorage.getItem('commands'))||{'!g':['https://github.com/search','?q='],
'!yt':['https://m.youtube.com/results','?q='],
'!pin':['https://pinterest.com/search/pins/','?q='],
'!r':['https://www.reddit.com/search','?q=','r/'],
'!tw':['https://www.twitter.com/search','?q='],
}
  
}


function updateWeather(){
  apiLink=`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${weatherApiKey}`
  
  fetch(apiLink).then((response)=>{
   return response.json()
  }).then((data)=>{
    console.log(data)
    id('temp').innerHTML=Math.floor(data.main.temp-273)+'⁰C'
    id('forcast').innerHTML=data.weather[0].description})
}



function bgalign(){
  mainSection.style.backgroundSize='cover'
  mainSection.style.backgroundPosition='center'
  mainSection.style.backgroundRepeat='no-repeat'
 
}

weatherLink.onclick=()=>{
  id('search-inp').value='weather'
  search()
}



//http://logo.clearbit.com/discord.com

//shortcut creation
shortcuts=[]
function shortcutCreate(name,img){
  
  shortcutNode=id('shortcut-template').content.cloneNode(true)
 
 if(img.includes('https://')){
   img.replace('https://','')
 }
 shortcutNode.querySelector('a').setAttribute('href','https://'+img)
  shortcutImg=shortcutNode.querySelector('img')
  shortcutImg.setAttribute('src','http://logo.clearbit.com/'+img)
  
  shortcutNode.querySelector('label').innerText=name
  
  shortcutDisplay=id('shortcut-list')
  
  shortcutDisplay.insertBefore(shortcutNode,shortcutDisplay.querySelector('#shortcut-add-btn'))
  id('popup-exit-btn').click()
  
  shortcuts.push({
  label:name
  ,image:img
})
localStorage.setItem('shortcuts',JSON.stringify(shortcuts))
}


//search commands & search----------


id('search-inp').addEventListener('keypress',(e)=>{
  if(e.key=='Enter'){
  search()
  }
})



function search(){
  val=id('search-inp').value
  
if(val.startsWith('!')){
  searchCommandLinks=Object.values(searchCommands)
  
  
Object.keys(searchCommands).forEach((key,i)=>{
  
  if(val.startsWith(key)){
    if(val.slice(key.length).startsWith('/')){
      window.open(searchCommandLinks[i][0].replace('search',searchCommandLinks[i][2]||'')+val.slice(key.length),windowMode)
    }else{
 window.open(searchCommandLinks[i][0]+searchCommandLinks[i][1]+val.slice(key.length),windowMode)
    }
  }
})
}else{

window.open(searchLink+'?q='+id('search-inp').value,'_self')
}
}


//comfigure menu-----
configMenuBtn.addEventListener('click',()=>{
 
    configMenu.classList.remove('hide')
    homeSection.classList.add('hide')
})
configMenuBtnClose.addEventListener('click',()=>{
 
    configMenu.classList.add('hide')
    homeSection.classList.remove('hide')
})

//background changer
bgin.addEventListener('change',()=>{
  filer=new FileReader()
  url=filer.readAsDataURL(bgin.files[0])

  
  filer.onload=(e)=>{
  document.querySelector('.main').style.background=`url('${e.target.result}')`
  localStorage.setItem('bgimg',e.target.result)
    bgalign()
  }
  
  
  console.log(url)
})

//weather location changer
weatherin.addEventListener('change',()=>{
  cityName=weatherin.value
  localStorage.setItem('city',cityName)
updateWeather()
  
})
searchbar=document.querySelector('#search-inp')
showh=()=>{
  if(searchbar.value==''){
    document.querySelector('#clearbtn').classList.add('noshow')
  }else{
    document.querySelector('#clearbtn').classList.remove('noshow')
  }
}
id('clearbtn').addEventListener('click',()=>{
  clearinp()
})
searchbar.oninput=()=>{if(searchbar.value!=''){showh()}}

function clearinp(){
  
searchbar.value=''
showh()
} 

newsLocationInput.addEventListener('change',()=>{
  localStorage.setItem('newsCountry',newsLocationInput.value)
})

newsCategoryInput.addEventListener('change',()=>{
localStorage.setItem('newsCategory',newsCategoryInput.value)
})

//search engine changer
searchEngineInput.addEventListener('change',(e)=>{
  console.log(e.target.value)
  if(e.target.value=='google'){
    searchLink='https://google.com/search'
  }else if(e.target.value=='brave'){
    searchLink='https://search.brave.com/search'
  }else if(e.target.value=='bing'){
    searchLink='https://www.bing.com/search'
  }else if(e.target.value=='duckduckgo'){
    searchLink='https://duckduckgo.com/'
  }else if(e.target.value=='ecosia'){
    searchLink='https://www.ecosia.org/search'
  }
  
  id('search-inp').setAttribute('placeholder','search '+e.target.value+'...')
  localStorage.setItem('searchEngine',JSON.stringify([searchLink,e.target.value]))
})

//restore
function clearLocal(){
  localStorage.clear()
  updateInfo()
}
id('restore-btn').addEventListener('click',()=>{
  opt=prompt('doing so will clear all data including your shortcuts type 1 to confirm')
  if(opt==1){
  clearLocal()
  }
})
//title change
titleIn.addEventListener('change',()=>{
  title.innerHTML=titleIn.value
  localStorage.setItem('browserName',titleIn.value)
})

//new window mode
/*id('new-window-toggle').addEventListener('change',(e)=>{
 if(e.target.checked){
   windowMode='_blank'
   console.log('changed')
 }else{
   windowMode='_self'
 }
})*/

//custom commands management
id('console').addEventListener('change',(e)=>{
try{
  eval(e.target.value)
  e.target.value=''
}catch{
  e.target.value='this feature is incompatible in your browser please inspect this webpage and type the commands on the console (type help() to see all commands there)'
}
})



function removeShortcut(shortcutname){
  shortcutS=shortcutSaves.filter((shortcut)=>{
    if(shortcut.label!==shortcutname){
      return shortcut
    }
  })
  localStorage.setItem('shortcuts',JSON.stringify(shortcutS))
}
function reorderShortcut(shortcutname,newposition){
 shortcutSaves.forEach((sh,i)=>{
   if(sh.label==shortcutname){
     shortcutSaves.splice(newposition-1, 0, shortcutSaves.splice(i, 1)[0])
   }
   localStorage.setItem('shortcuts',JSON.stringify(shortcutSaves))
 })
 
}


function customStyle(sstr){
  externalCSS=sstr
  id('customStyle').innerHTML=externalCSS
  localStorage.setItem('externalCSS',externalCSS)
}
function addCustomStyle(sstr){
 
  localStorage.setItem('externalCSS',externalCSS+sstr)
}

function addCustomCommand(key,link){
  searchCommands[key]=link
  localStorage.setItem(searchCommands,JSON.stringify(searchCommands))
}

function help(){
  
  window.open('https://github.com/atoms19/brogser/blob/main/README.md','_self')
}

//0a85f86406434f209f174bf1cfc9353f newsfeed api

let counter = 2;


function fetchNews(page = 1) {
  alert('fun')
  query = localStorage.newsCountry ||'in'
category =localStorage.newsCategory ||``;
 url = `https://newsapi.org/v2/top-headlines?country=${query}&category=${category}&apikey=`;
const apiKey = '0a85f86406434f209f174bf1cfc9353f';

  fetch(url + apiKey + '&page=' + page).then((r) => {
    return r.json();
    alert('yes')
  }).then((data) => {
    articleTemplate = document.querySelector('#article-template');
    if (data.articles == undefined) {
      return '';
    }
    data.articles.forEach((article) => {
      articleElem = articleTemplate.content.cloneNode(true);
      articleElem.querySelector('a').href = article.url;
      articleElem.querySelector('.article-heading').innerText = article.title;
      articleElem.querySelector('.article-img').src = article.urlToImage || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmGCFS-RSaOE_anrePyn-O3dzdFmrvuLvYIQ&usqp=CAU';
      articleElem.querySelector('.article-publisher').innerText = article.source.name;
      articleTime = articleElem.querySelector('.article-time');

      const now = new Date();
      const isoDate = new Date(article.publishedAt);
      const timeDifferenceMs = now - isoDate;

      if (timeDifferenceMs < 24 * 60 * 60 * 1000 && timeDifferenceMs >= 60 * 60 * 1000) {
        const hours = Math.floor(timeDifferenceMs / (1000 * 60 * 60));
        articleTime.innerText = hours + ' hours ago';
      } else if (timeDifferenceMs < 60 * 60 * 1000) {
        const minutes = Math.floor(timeDifferenceMs / (1000 * 60));
        articleTime.innerText = minutes + ' mins ago';
      } else {
        const days = Math.floor(timeDifferenceMs / (1000 * 60 * 60 * 24));
        articleTime.innerText = days + ' day ago';
      }

      document.querySelector('#article-container').appendChild(articleElem);
    });
}).catch(err=>{
    alert('response error'+err)})
         

  window.onscroll = function () {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      fetchNews(counter);
      counter++;
    }
  };
}
id('newsfeedbtn').onclick=()=>{
  alert('feature broken')
  fetchNews()
}
//fetchNews();


