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
  //console.log('test onload');
  pageCounter();
}

window.onresize = function(){
  //console.log("test onresize");
  //var style = getComputedStyle(document.body);
  //var style_value = style.getPropertyValue('--p-vf-wdth-temp');
  //console.log(style_value);  
  pageCounter();
}

function pageCounter() {
  var contentContainerWidth = document.getElementById("main_content").scrollWidth;
  var windowWidth = window.innerWidth;
  var pageCount = Math.floor(contentContainerWidth / windowWidth);
  document.body.style.setProperty('--page-count', pageCount);

	var currentDiv = document.getElementById("pager_wrapper"); 
	var children = currentDiv.getElementsByTagName('div');
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
    //pageDiv.style.marginLeft = 'calc( 101vw * '+ i + ' )';
    currentDiv.appendChild(pageDiv);
  }
}

function offset(el) {
    var rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}
