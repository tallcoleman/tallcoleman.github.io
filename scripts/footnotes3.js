// Footnotes Script Version 3

/*  ARRANGING THE CONTENT
    ---------------------
*/

const fnSups = document.querySelectorAll('sup[role=doc-noteref]');

for (const fnSup of fnSups) {
  // prepare the footnote content to insert
  var contentID = fnSup.querySelector('a').getAttribute("href").substring(1);
  var content = document.querySelector('[id="' + contentID + '"]').innerHTML;
  var insertContent = '<div class="annotation" fnid="' + contentID + '">' + content + '</div>';

  // insert the footnote content inline (at anchor or just after fn link)
  let anchorPoint = document.querySelector('[anchorid="' + contentID + '"]');
  if (anchorPoint !== null) {
    anchorPoint.insertAdjacentHTML('afterbegin', insertContent);
  } else {
    fnSup.insertAdjacentHTML('afterend', insertContent);
  }
}

for (const fnSup of fnSups) {
  // add annotation wrapper divs (can't wrap a <div> in an unbroken <p>)
  if (fnSup.closest('.annotation-wrapper') === null 
      && fnSup.closest('p') !== null) {
      var containingPar = fnSup.closest('p');
      var wrappedPar = document.createElement('div');
      // maintain existing classes - e.g. for image captions
      wrappedPar.classList.add(...containingPar.classList);
      wrappedPar.classList.add('annotation-wrapper');
      wrappedPar.insertAdjacentHTML('afterbegin', containingPar.innerHTML);
      containingPar.replaceWith(wrappedPar);
  }
}

// hide original footnotes for screen media
var sheet = (function() {
	var style = document.createElement("style");
    style.setAttribute("media", "screen");
	style.appendChild(document.createTextNode("")); // WebKit hack :(
	document.head.appendChild(style);
	return style.sheet;
})();

// delete backlinks in annotations
const anBacklink = document.querySelectorAll('div.annotation a.reversefootnote');
anBacklink.forEach(link => link.remove());

sheet.insertRule('div.footnotes {display: none;}', 0);

/*  FOOTNOTE FUNCTIONALITY
    ----------------------
*/

const anLinks = document.querySelectorAll('.footnote, .annotation-link');
const anContents = document.querySelectorAll('.annotation');

for (let i=0; i < anLinks.length; i++) {
    let anInteract = function(e) {
        e.preventDefault();
        anContents[i].classList.toggle('annotation-expanded');
        anContents[i].classList.toggle('annotation-displayed');
        anLinks[i].classList.toggle('annotation-link-selected');
    }

    anLinks[i].addEventListener('click', anInteract);
}


/*  OPEN/CLOSE ALL
    --------------
*/

// not efficiently coded - not very DRY - but it works
const fnButton = document.querySelectorAll('.annotation-button');
var optionOpenText = 'Open all Footnotes';
var optionCloseText = 'Close all Footnotes';

// ensures button values matches starting state
for (let i = 0; i < fnButton.length; i++) {
  fnButton[i].textContent = optionOpenText;
}

// builds the event listeners for the buttons
for (let i = 0; i < fnButton.length; i++) {
  footnoteOpenClose = function() {
    if (fnButton[i].textContent == optionOpenText) {
      for (let j = 0; j < anContents.length; j++) {
        anContents[j].classList.add('annotation-expanded', 'annotation-displayed');
        anLinks[j].classList.add('annotation-link-selected');
      }
      for (let i = 0; i < fnButton.length; i++) {
        fnButton[i].textContent = optionCloseText;
      }
    } else if (fnButton[i].textContent == optionCloseText) {
      for (let j = 0; j < anContents.length; j++) {
        anContents[j].classList.remove('annotation-expanded', 'annotation-displayed');
        anLinks[j].classList.remove('annotation-link-selected');
      }
      for (let i = 0; i < fnButton.length; i++) {
        fnButton[i].textContent = optionOpenText;
      }
    }
  }

  fnButton[i].addEventListener('click', footnoteOpenClose);
}
