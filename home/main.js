weatherApiKey='4fbd7e056ad5fba4b7cdcd73ff8a1c12'
lat=''
lon=''



function id(u){
  return document.getElementById(u)
}
homeSection=id('home')
popupSection=id('popup')
shortcutNameIn=id('name-in')
shortcutUrlIn=id('url-in')

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
  
  
  apiLink=`http://api.openweathermap.org/data/2.5/weather?q=mumbai&appid=${weatherApiKey}`
  
   if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
       lon = position.coords.longitude;
      lat = position.coords.latitude;
   apiLink=`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&` +
`lon=${lon}&appid=${weatherApiKey}`
    })
  }
  
  fetch(apiLink).then((response)=>{
   return response.json()
  }).then((data)=>{
    console.log(data)
    id('temp').innerHTML=Math.floor(data.main.temp-273)+'⁰C'
    id('forcast').innerHTML=data.weather[0].description})
  
  
}
shortcuts=[]







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


``
