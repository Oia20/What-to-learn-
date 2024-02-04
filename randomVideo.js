// Use this key in your application by passing it with the key=API_KEY parameter.

// Your API key
// src="https://apis.google.com/js/api.js"
function authenticate() {
  return gapi.auth2.getAuthInstance()
      .signIn({scope: "https://www.googleapis.com/auth/youtube.force-ssl"})
      .then(function() { console.log("Sign-in successful"); },
            function(err) { console.error("Error signing in", err); });
}
function loadClient() {
  console.log("6")
  gapi.client.setApiKey(GKEY);
  console.log("7")
  return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
      .then(function() { console.log("GAPI client loaded for API"); },
      function(err) { console.error("Error loading GAPI client for API", err); }, setTimeout(execute, 500));
      
}
// Make sure the client is loaded and sign-in is complete before calling this method.
function execute() {
  console.log("8")
  var articleTitle = document.getElementById('artTitle').innerHTML
  console.log("9", articleTitle)
  return gapi.client.youtube.search.list({
    "part": "snippet",
    "maxResults": 3,
    "q": String(articleTitle)
  })
      .then(function(response) {
              // Handle the results here (response.result has the parsed body).
              console.log("Response", response);
              id1 = response.result.items[0].id.videoId
              id2 = response.result.items[1].id.videoId
              id3 = response.result.items[2].id.videoId
              var url1 = ('https://www.youtube.com/embed/' + String(id1))
              var url2 = ('https://www.youtube.com/embed/' + String(id2))
              var url3 = ('https://www.youtube.com/embed/' + String(id3))
              document.getElementById('video1').src = url1;
              document.getElementById('video2').src = url2;
              document.getElementById('video3').src = url3;

              
              console.log(url)
            },
            function(err) { console.error("Execute error", err); });
}
gapi.load("client:auth2", function() {
});


