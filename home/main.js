weatherApiKey='4fbd7e056ad5fba4b7cdcd73ff8a1c12'




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



window.onload=()=>{
 shortcutSaves= JSON.parse(localStorage.getItem('shortcuts')) || []
  shortcutSaves.forEach((shortcut)=>{
    shortcutCreate(shortcut.label,shortcut.image)
  })
  
  cityName=localStorage.getItem('city')||'mumbai'
  weatherin.value=cityName
  
  updateWeather()
  
  url=localStorage.getItem('bgimg')||`https://images.unsplash.com/photo-1681823853101-9a0d7e8be47b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80`
  
  mainSection.style.background=`url('${url}')`
  bgalign()
}
shortcuts=[]

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
  mainSection.style.backgroundRepeat='no-repeat'
 
}




//http://logo.clearbit.com/discord.com

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

function search(s){
  s.submit()
}

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

//weather changer
weatherin.addEventListener('change',()=>{
  cityName=weatherin.value
  localStorage.setItem('city',cityName)
updateWeather()
  
})
