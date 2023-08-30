

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

function updateInfo(){
  
  //shortcuts spawning 
 shortcutSaves= JSON.parse(localStorage.getItem('shortcuts')) || []
  shortcutSaves.forEach((shortcut)=>{
    shortcutCreate(shortcut.label,shortcut.image)
  })
  
  //adding external css
  id('customStyle').innerHTML=localStorage.getItem('externalCSS')||''
  
  //weather & background 
  
  cityName=localStorage.getItem('city')||'mumbai'
  weatherin.value=cityName
  updateWeather()
  
  url=localStorage.getItem('bgimg')||`https://images.unsplash.com/photo-1681823853101-9a0d7e8be47b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80`
  mainSection.style.background=`url('${url}')`
  bgalign()
  
  //browser preferences
  titletxt=localStorage.getItem('browserName')||'brogser'
  title.innerHTML=titletxt
  titleIn.value=titletxt
  
  searchPreferences=JSON.parse(localStorage.getItem('searchEngine'))||[null]
  
  searchLink=searchPreferences[0] || 'https://www.google.com/search'
  
  searchEngineInput.value=searchPreferences[1]
    id('search-inp').setAttribute('placeholder','search '+searchPreferences[1]+'...')
    
  //quicksearch
  searchCommands=JSON.parse(localStorage.getItem('commands'))||{'!g':'https://github.com/search',
'!yt':'https://m.youtube.com/results',
'!pin':'https://pinterest.com/search/pins/',
'!r':'https://www.reddit.com/search',
'!tw':'https://www.twitter.com/search',
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
      window.open(searchCommandLinks[i].replace('search','')+val.slice(key.length),windowMode)
    }else{
 window.open(searchCommandLinks[i]+'?q='+val.slice(key.length),windowMode)
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
  eval(e.target.value)
  e.target.value=''
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

externalCSS=''
function customStyle(sstr){
  externalCSS=sstr
  id('customStyle').innerHTML=externalCSS
  localStorage.setItem('externalCSS',externalCSS)
}
function addCustomStyle(sstr){
  externalCSS+=sstr
  localStorage.setItem('externalCSS',externalCSS)
}

function addCustomCommand(key,link){
  searchCommands[key]=link
  localStorage.setItem(commands,JSPN.stringify(searchCommands))
}

function help(){
  
  window.open('https://github.com/atoms19/brogser/blob/main/README.md','_self')
}