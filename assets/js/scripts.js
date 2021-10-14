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
	paragraphShare();
	paragraphObserver();
	swipeCheck();
	fontSizeSliderSet();
	lineHeightSliderSet();
	wordSpaceSliderSet();
	bookmarkActions();
	bookmarksArrayGet();
}
window.onresize = function(){
  pageCounter();
}


// Light mode settings
const lightModeToggle = document.getElementById('light_mode_switch');
const lightModeReset = document.getElementById('light_mode_reset');
var osLightMode = getComputedStyle(document.documentElement).getPropertyValue('--osLightMode').trim();

lightModeToggle.addEventListener('click', function(e) {
	e.preventDefault();
	if (osLightMode == 'dark') {
		// set a cookie to expire the setting
		console.log('check: '+osLightMode);
		document.cookie = "lightMode=light; max-age=31536000; path=/; samesite=strict";
		document.getElementsByTagName("html")[0].classList.remove('dark');
		document.getElementsByTagName("html")[0].classList.add('light');
	} else if (document.getElementsByTagName("html")[0].classList.contains('dark')) {
		// set a cookie to save the setting
		document.cookie = "lightMode=light; max-age=31536000; path=/; samesite=strict";
		document.getElementsByTagName("html")[0].classList.remove('dark');
		document.getElementsByTagName("html")[0].classList.add('light');
	} else {
		// set a cookie to save the setting
		document.cookie = "lightMode=dark; max-age=31536000; path=/; samesite=strict";
		document.getElementsByTagName("html")[0].classList.remove('light');
		document.getElementsByTagName("html")[0].classList.add('dark');
	}
	e.blur();
});
lightModeReset.addEventListener('click', function(e) {
	e.preventDefault();
	document.cookie = "lightMode=auto; max-age=31536000; path=/; samesite=strict";
	document.getElementsByTagName("html")[0].classList.remove('dark');
	document.getElementsByTagName("html")[0].classList.remove('light');
	e.blur();
});

// Font size settings 
const fontSizeSlider = document.getElementById('font_size_modifier');
var currentFontSizeModifier = getComputedStyle(document.documentElement).getPropertyValue('--fontSizeModifier');

fontSizeSlider.addEventListener('change', handleFontSizeSliderUpdate);

function handleFontSizeSliderUpdate(e) {
	document.documentElement.style.setProperty(`--fontSizeModifier`, this.value);
	document.cookie = "fontSizeModifier="+this.value+"; max-age=31536000; path=/; samesite=strict";
}

function fontSizeSliderSet() {
	let fontSizeModifier = getComputedStyle(document.documentElement).getPropertyValue('--fontSizeModifier');
	document.getElementById('font_size_modifier').setAttribute('value',fontSizeModifier.trim());

}

// Line-height settings 
const lineHeightSlider = document.getElementById('line_height_modifier');
var currentlineHeightModifier = getComputedStyle(document.documentElement).getPropertyValue('--lineHeightModifier');

lineHeightSlider.addEventListener('change', handleLineHeightSliderUpdate);

function handleLineHeightSliderUpdate(e) {
	document.documentElement.style.setProperty(`--lineHeightModifier`, this.value);
	document.cookie = "lineHeightModifier="+this.value+"; max-age=31536000; path=/; samesite=strict";
}

function lineHeightSliderSet() {
	let lineHeightModifier = getComputedStyle(document.documentElement).getPropertyValue('--lineHeightModifier');
	document.getElementById('line_height_modifier').setAttribute('value',lineHeightModifier.trim());

}

// Word space settings 
const wordSpaceSlider = document.getElementById('word_space_modifier');
var currentWordSpaceModifier = getComputedStyle(document.documentElement).getPropertyValue('--wordSpaceModifier');

wordSpaceSlider.addEventListener('change', handleWordSpaceSliderUpdate);

function handleWordSpaceSliderUpdate(e) {
	document.documentElement.style.setProperty(`--wordSpaceModifier`, this.value);
	document.cookie = "wordSpaceModifier="+this.value+"; max-age=31536000; path=/; samesite=strict";
}

function wordSpaceSliderSet() {
	let wordSpaceModifier = getComputedStyle(document.documentElement).getPropertyValue('--wordSpaceModifier');
	document.getElementById('word_space_modifier').setAttribute('value',wordSpaceModifier.trim());

}

// Menus
const menus = [].slice.call(document.querySelectorAll('.dd-menu'));
const settingsMenuToggle = document.getElementById('settings_trigger');
const tocMenuToggle = document.getElementById('toc_trigger');

const pageMask = document.createElement("div");
let divContent = document.createTextNode(" "); 
pageMask.appendChild(divContent);
pageMask.id = 'page_mask';
pageMask.classList.add('page-mask');
document.getElementsByTagName("body")[0].appendChild(pageMask);

if (pageMask) {
	document.getElementsByTagName("html")[0].classList.add('touch-nav');

	pageMask.addEventListener('click', function(e) {
		e.preventDefault();
		pageMask.classList.remove('active');
		for (let i = 0; i < menus.length; i++) {
			menus[i].classList.remove('open');
		}
	});
}



const ddMenuTriggers = [].slice.call(document.querySelectorAll('.dd-menu-trigger'));
ddMenuTriggers.forEach(ddMenuTrigger => ddMenuTrigger.addEventListener('click', function(e) {
	e.preventDefault();
	if (ddMenuTrigger.parentElement.classList.contains('open')) {
		ddMenuTrigger.parentElement.classList.remove('open');
		pageMask.classList.remove('active');
	} else {
		// reset open menus
		for (let i = 0; i < menus.length; i++) {
			menus[i].classList.remove('open');
		}
		ddMenuTrigger.parentElement.classList.add('open');
		pageMask.classList.add('active');
	}
}));


const toggles = [].slice.call(document.querySelectorAll('.toggle-swipe'));
toggles.forEach(toggle => toggle.addEventListener('click', function(e) {
	e.preventDefault();
	if (document.getElementsByTagName("html")[0].classList.contains('swipe')) {
		// set a cookie to expire the setting
		document.cookie = "swipe=on; max-age=0; path=/; samesite=strict";
		document.getElementsByTagName("html")[0].classList.remove('swipe');
		swipeCheck();
	} else {
		// set a cookie to save the setting
		document.cookie = "swipe=on; max-age=31536000; path=/; samesite=strict";
		document.getElementsByTagName("html")[0].classList.add('swipe');
		swipeCheck();
	}
	document.getElementsByClassName('toggle-swipe')[0].blur();
	document.getElementById('settings_trigger').blur();
	document.getElementById('settings_trigger').parentElement.blur();
	// reset open menus
	for (let i = 0; i < menus.length; i++) {
		menus[i].classList.remove('open');
	}
	pageMask.classList.remove('active');
}));

function swipeCheck() {

	var toggleArray = document.getElementsByClassName('toggle-swipe');

	if (document.getElementsByTagName("html")[0].classList.contains('swipe')) {
		for (let i = 0; i < toggleArray.length; i++) {
			toggleArray[i].classList.add('on');
			toggleArray[i].classList.remove('off');
		}
		// set a cookie to save the setting
		document.cookie = "swipe=on;max-age=31536000;path=/;samesite=strict";
		pageCounter();
	} else {
		for (let i = 0; i < toggleArray.length; i++) {
			toggleArray[i].classList.remove('on');
			toggleArray[i].classList.add('off');
		}
		document.cookie = "swipe=on;max-age=0;path='/';samesite=strict";
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

// useful for adding paging buttons in the future
function offset(el) {
    var rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

function bookmarkActions() {
	
}

function bookmarksArrayGet() {
	let bookmarksArray = localStorage.getItem("bookmarksArray");
	if (bookmarksArray.length < 1) {
		//array.
		bookmarksArray = [
			["Location", "URL"],
			["Chapter 1", "http://localhost:8080/chapter/001"] 
		];
		//bookmarksArray.add
	}
	let bookmarksJSON = JSON.parse(bookmarksArray);
	console.log(bookmarksJSON);
	print("<pre>" + bookmarksJSON + "</pre>");
	return bookmarksJSON;
	
}

//javascript create JSON object from two dimensional Array
function bookmarksArrayToJSONObject (arr){
	//header
	var keys = arr[0];

	//vacate keys from main array
	var newArr = arr.slice(1, arr.length);

	var formatted = [],
	data = newArr,
	cols = keys,
	l = cols.length;
	for (var i=0; i<data.length; i++) {
					var d = data[i],
									o = {};
					for (var j=0; j<l; j++)
									o[cols[j]] = d[j];
					formatted.push(o);
	}
	return formatted;
}

function bookmarkSave(e,t) {
	let bookmarksArray = bookmarksArrayGet();
	bookmarksArray.push({ Location: t, URL: e });
	localStorage.setItem("bookmarksArray", JSON.stringify(bookmarksArray));

	console.log(bookmarksArray);
}

function bookmarkLink(e) {
	let bookmark_href = document.createElement("a");
	bookmark_href.setAttribute('href', e); 
	let bookmark_href_content = document.createTextNode("Go to bookmark"); 
	bookmark_href.appendChild(bookmark_href_content);
	let bookmark_link = document.getElementById('bookmarks_trigger');
	bookmark_link.innerHTML = '';
	bookmark_link.appendChild(bookmark_href);
}

function getAnchor() {
	var currentUrl = document.URL,
	urlParts   = currentUrl.split('#');
	return (urlParts.length > 1) ? urlParts[1] : null;
}

function paragraphShare() {

	let p_share = document.createElement("div");
	p_share.classList.add('location-actions');

	let p_share_button = document.createElement("button");
	let p_share_button_content = document.createTextNode("Share this location"); 
	p_share_button.appendChild(p_share_button_content);
	p_share_button.id = 'p_share';
	p_share_button.classList.add('btn');

	let p_bookmark_button = document.getElementById("p_bookmark");
	let p_share_url = document.getElementById("p_location");
	let location_base = location.href.split('#');
	let location_str = location_base[0];
	let p_share_url_content = location_str; 

	p_share_url.setAttribute('value', location_str);
	p_share_url.setAttribute('data-location-url', p_share_url_content);
	p_bookmark_button.setAttribute('data-bookmark', p_share_url_content);

	var clipboard = new ClipboardJS('.share-location-button');
	clipboard.on('success', function(e) {

    e.clearSelection();
	});

	clipboard.on('error', function(e) {
			//console.log(e);
	});

	const bookmarkButton = document.getElementById('p_bookmark');
	bookmarkButton.addEventListener('click', function(e) {
		e.preventDefault();
		let bookmarkLocation = bookmarkButton.getAttribute('data-bookmark');
		let chapterTitle = document.querySelector("meta[property='og:title']").getAttribute("content");
		let chapterP = bookmarkButton.getAttribute('data-bookmark-p');
		let bookmarkLocationTitle = chapterTitle;
		if (chapterP.length > 0) {
			bookmarkLocationTitle = chapterTitle + ' (' + chapterP + ')';
		}
		bookmarkSave(bookmarkLocation,bookmarkLocationTitle);
	});

}

function paragraphObserver() {

	if(!!window.IntersectionObserver){
		let location_base = location.href.split('#');
		let location_str = location_base[0];

		let shareButton = document.getElementById('p_share');
		let locationInput = document.getElementById('p_location');
		locationUrl = locationInput.getAttribute('data-location-url');
		let bookmarkButton = document.getElementById('p_bookmark');
		let observer = new IntersectionObserver((entries, observer) => { 
			entries.forEach(entry => {
				if(entry.isIntersecting){
					console.log(entry.target.id);
					let paragraphId = entry.target.id;
					//shareButton.setAttribute('data-clipboard-target', paragraphId);
					let paragraphUrl = locationUrl + '#' + paragraphId;
					locationInput.setAttribute('value', paragraphUrl);
					bookmarkButton.setAttribute('data-bookmark', locationUrl + '#' + paragraphId);
					bookmarkButton.setAttribute('data-bookmark-p', paragraphId);
				}
			});
		}, {rootMargin: "0px 0px -200px 0px"});

		document.querySelectorAll('.chapter > p').forEach(p => { observer.observe(p) });
	
	}

	else console.log('not supported');

}
