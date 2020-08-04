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
	fontSizeSliderSet();
	lineHeightSliderSet();
	wordSpaceSliderSet();
}
window.onresize = function(){
  pageCounter();
}

// Light mode settings
const lightModeToggle = document.getElementById('light_mode_switch');
const lightModeReset = document.getElementById('light_mode_reset');
var osLightMode = getComputedStyle(document.documentElement).getPropertyValue('--osLightMode').trim();
console.log(osLightMode);

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
