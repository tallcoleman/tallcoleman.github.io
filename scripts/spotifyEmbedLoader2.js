// replace placeholder link from spotifyembed.html include with proper spotify embed
loadSpotifyEmbeds = function() {
  const spotifyEmbeds = document.querySelectorAll('.spotify-embed');
  const spotifyLinks = document.querySelectorAll('.spotify-no-embed-link');

  for (let spotifyEmbed of spotifyEmbeds) {
    let embedHTML = `<iframe id="iframe" src="https://open.spotify.com/embed/${spotifyEmbed.dataset.spotifytype}/${spotifyEmbed.dataset.spotifyuri}" width="100%" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`;
    spotifyEmbed.innerHTML = embedHTML;
  }

  for (let spotifyLink of spotifyLinks) {
    spotifyLink.style.display="none";
  }
}

// add event listener for embed loading function
const spotifyEmbedButton = document.querySelector('.spotify-embed-button');
spotifyEmbedButton.addEventListener('click', loadSpotifyEmbeds);