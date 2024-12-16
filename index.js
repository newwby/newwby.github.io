
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
    let doc_div_element = document.getElementById(arg_div)
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
