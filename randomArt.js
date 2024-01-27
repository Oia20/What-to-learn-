function getRandomArticle() {
    // Wikipedia API endpoint for fetching a random article with images
    const apiUrl = 'https://en.wikipedia.org/w/api.php?action=query&generator=random&grnnamespace=0&prop=extracts|pageimages&format=json&origin=*';
    document.getElementById('imageContainer').innerHTML = '';
    // Make a GET request to the Wikipedia API
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // Extract the first page from the API response
        const pageId = Object.keys(data.query.pages)[0];
        const articleContent = data.query.pages[pageId].extract;
        const articleTitle = data.query.pages[pageId].title;
        console.log(articleTitle)

  
        // Set the content to the HTML span with the ID 'articleContent'
        document.getElementById('articleContent').innerHTML = articleContent;
        document.getElementById('artTitle').innerHTML = articleTitle;
  
      })
      .catch(error => {
        console.error('Error fetching random article:', error);
      });
  }
  
  // Call the function to get the full content and image from a random Wikipedia article