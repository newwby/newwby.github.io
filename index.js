
// Hardcoded navigation bar name is not great (TODO revise)
function navAddResponsive() {
  var navbar = document.getElementById("mynavigation_bar");
  if (navbar.className === "navigation_bar") {
    navbar.className += " responsive";
  } else {
    navbar.className = "navigation_bar";
  }
}

function loadDiv(arg_div, arg_page) {
    // TODO add validation for page existing and both arguments being strings
    const doc_div_element = document.getElementById(arg_div)
    // check div element is found
    if (doc_div_element !== null) {
        doc_div_element.innerHTML = fetch(arg_page)
            .then(response => response.text())
            .then(data => doc_div_element.innerHTML = data)
            .catch(error => console.error(`Error loading ${arg_div} & ${arg_page}`))
    }
    else {
        console.log('Null error on loadDiv arg_div')
        }
    }

// arguments should be strings
function addContentBlock(arg_background_url, arg_title, arg_text) {
  [arg_background_url, arg_title, arg_text].forEach((argument) => {
    if (typeof(argument) !== "string") {
      console.log("invalid argument type passed to addContentBlock, no content block created"+
      `arguments passed: ${arg_background_url}, ${arg_title}, ${arg_text}`)
      return
    }
  })
  
  const root_flex = document.querySelector("#flex_container")
  if (root_flex === null) {
    console.log("addContentBlock cannot locate root flex object, no content block created")
  }
  
  // Create content block root and set background image
  const new_div = document.createElement("div")
  new_div.classList.add("content_block")
  fetch(arg_background_url).then(response => {
    if (!response.ok) {
      console.log("Cannot locate background url passed as argument, no content block created; "+
        `invalid url is ${arg_background_url}`
      )
    }
  })
  new_div.style.backgroundImage = `url('${arg_background_url}')`
  
  // Add content block text
  const new_header = document.createElement("h1")
  new_header.innerText = arg_title
  const new_subtext = document.createElement("p")
  new_subtext.innerText = arg_text
  
  // add to DOM
  root_flex.appendChild(new_div)
  new_div.appendChild(new_header)
  new_div.appendChild(new_subtext)
}

// when user tries to view site on mobile a warning that the site is designed for desktop is shown
function toggleMobileWarning() {
  let flex_root = document.getElementById("flex_container")
  let mobile_banner = document.getElementById("mobile_banner")
  if ((flex_root != null) && (mobile_banner != null)) {
    let is_small = (window.innerWidth < 768)
    if (is_small === true) {
      flex_root.style.display = "none";
      mobile_banner.style.display = "block";
    } else {
      flex_root.style.display = "block";
      mobile_banner.style.display = "none";
    }
  }
}