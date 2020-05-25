/* Widow fix */

/* chapter paragraphs */
wt.fix({
	elements: '.chapter > p',
	chars: 15,
	method: 'padding-right',
	event: 'resize'
});

/* paragraphs within blockquotes */
wt.fix({
	elements: 'blockquote > p',
	chars: 10,
	method: 'nbsp',
	event: 'resize'
});

window.onload = function(){
	pageCounter();
	swipeCheck();
}
window.onresize = function(){
  pageCounter();
}

document.getElementById('toggle-swipe').addEventListener('click', function(e) {
	e.preventDefault();
	if (document.getElementsByTagName("html")[0].classList.contains('swipe')) {
		// set a cookie to save the setting
		document.cookie = "swipe=off;max-age=31536000;path='/'";
	} else {
		// set a cookie to save the setting
		document.cookie = "swipe=on;max-age=31536000;path='/'";
	}
	swipeCheck();
	document.getElementById('toggle-swipe').blur();
});

function swipeCheck() {
	if (document.cookie.split(';').some((item) => item.includes('swipe=on'))) {
		document.getElementsByTagName("html")[0].classList.add('swipe');
		document.getElementById('toggle-swipe').classList.add('on');
		document.getElementById('toggle-swipe').classList.remove('off');
		// set a cookie to save the setting
		document.cookie = "swipe=on;max-age=31536000;path='/'";
		pageCounter();
	} else {
		document.getElementsByTagName("html")[0].classList.remove('swipe');
		document.getElementById('toggle-swipe').classList.remove('on');
		document.getElementById('toggle-swipe').classList.add('off');
	}
}

function pageCounter() {
  var contentContainerWidth = document.getElementById("main_content").scrollWidth;
  var windowWidth = window.innerWidth;
  var pageCount = Math.floor(contentContainerWidth / windowWidth);
  document.body.style.setProperty('--page-count', pageCount);

	var currentDiv = document.getElementById("pager_wrapper"); 
	// clear out existing child 'page' divs
	currentDiv.innerHTML = "";

  // add the newly created element and its content into the DOM 
  for (let i = 0; i < pageCount; i++) {
    // create a new div element 
    var pageDiv = document.createElement("div"); 
    // and give it some content 
    var newContent = document.createTextNode(" "); 
    // add the text node to the newly created div
    pageDiv.appendChild(newContent);
    pageDiv.classList.add('pager-wrapper--page');
    // set margin-left to keep divs in place
    currentDiv.appendChild(pageDiv);
  }
}

function offset(el) {
    var rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}
