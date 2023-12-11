counter = 2;
alert('news work')

function fetchNews(page = 1) {
  try{
  query = localStorage.newsCountry ||'in'
category =localStorage.newsCategory ||``;
 url = `https://newsapi.org/v2/top-headlines?country=${query}&category=${category}&apikey=`;
const apiKey = '0a85f86406434f209f174bf1cfc9353f';

  fetch(url + apiKey + '&page=' + page).then((r) => {
    return r.json();
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
  }catch(err){
    alert(err)
  });

  window.onscroll = function () {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      fetchNews(counter);
      counter++;
    }
  };
}
id('newsfeedbtn').onclick=()=>{
  fetchNews()
}
//fetchNews();

