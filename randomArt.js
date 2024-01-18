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
  
        // Set the content to the HTML span with the ID 'articleContent'
        document.getElementById('articleContent').innerHTML = articleContent;
  
        // Check if there is an image for the article
        if (data.query.pages[pageId].hasOwnProperty('thumbnail')) {
          const imageUrl = data.query.pages[pageId].thumbnail.source;
          // Create an image element and set its source
          const imgElement = document.createElement('img');
          imgElement.src = imageUrl;
  
          // Append the image element to the HTML div with the ID 'imageContainer'
          document.getElementById('imageContainer').appendChild(imgElement);
        }
      })
      .catch(error => {
        console.error('Error fetching random article:', error);
      });
  }
  
  // Call the function to get the full content and image from a random Wikipedia article