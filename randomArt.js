function getRandomArticle() {
  // Wikipedia API endpoint for fetching a random article with images
  const apiUrl = 'https://en.wikipedia.org/w/api.php?action=query&generator=random&grnnamespace=0&prop=extracts|pageimages&format=json&origin=*';
  document.getElementById('imageContainer').innerHTML = ''
  console.log("1")
  // Make a GET request to the Wikipedia API
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      console.log('2.2')
      // Extract the first page from the API response
      const pageId = Object.keys(data.query.pages)[0];
      const articleContent = data.query.pages[pageId].extract;
      const articleTitle = data.query.pages[pageId].title;
      // console.log(articleTitle)
      console.log("3")  
      // Set the content to the HTML span with the ID 'articleContent'
      document.getElementById('articleContent').innerHTML = articleContent;
      document.getElementById('artTitle').innerHTML = articleTitle;
      console.log("4")
      setTimeout(loadClient, 500);
      console.log("5")


    })
    .catch(error => {
      console.error('Error fetching random article:', error);
    });
}

function getOtherArticle(category) {
  const categoryUrl = `https://en.wikipedia.org/w/api.php?action=query&list=categorymembers&cmtitle=${category}&cmnamespace=0&cmlimit=500&format=json&origin=*`;

  document.getElementById('imageContainer').innerHTML = '';
  console.log("1");

  let articleTitle;

  fetch(categoryUrl)
    .then(response => response.json())
    .then(data => {
      console.log('2.2');

      if (!data.query || !data.query.categorymembers || data.query.categorymembers.length === 0) {
        throw new Error('No articles found.');
      }

      const randomIndex = Math.floor(Math.random() * data.query.categorymembers.length);
      const randomArticle = data.query.categorymembers[randomIndex];

      const articleId = randomArticle.pageid;
      articleTitle = randomArticle.title;

      console.log("3");
      const contentApiUrl = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts|pageimages&pageids=${articleId}&format=json&origin=*`;
      return fetch(contentApiUrl);
    })
    .then(response => response.json())
    .then(data => {
      console.log("4");

      if (!data.query || !data.query.pages) {
        throw new Error('No content found for the random article.');
      }

      const pageId = Object.keys(data.query.pages)[0];
      const articleContent = data.query.pages[pageId].extract;

      document.getElementById('articleContent').innerHTML = articleContent;
      document.getElementById('artTitle').innerHTML = articleTitle;
      console.log("5");

      setTimeout(loadClient, 500);
    })
    .catch(error => {
      console.error('Error fetching random article:', error.message);
    });
}