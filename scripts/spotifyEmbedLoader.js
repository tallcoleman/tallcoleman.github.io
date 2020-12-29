// make an object `const varName = { title: key } that has the iframes and then an event handler that puts them into divs with the right IDs or something`

const spotifyEmbedButton = document.querySelector('.spotify-embed-button');

loadSpotifyEmbeds = function() {
  const spotifyEmbeds = document.querySelectorAll('.spotify-embed');
  const spotifyLinks = document.querySelectorAll('a[href^="https://open.spotify.com"]');

  for (let i = 0; i < spotifyEmbeds.length; i++) {
    let uncommentedEmbed = spotifyEmbeds[i].innerHTML;
    uncommentedEmbed = uncommentedEmbed.replace('<!--','');
    uncommentedEmbed = uncommentedEmbed.replace('-->','');
    spotifyEmbeds[i].innerHTML = uncommentedEmbed.trim();
  }

  for (let i = 0; i < spotifyLinks.length; i++) {
    spotifyLinks[i].style.display="none";
  }
}

spotifyEmbedButton.addEventListener('click', loadSpotifyEmbeds);
