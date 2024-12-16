
// Hardcoded navigation bar name is not great (TODO reviist)
function navAddResponsive() {
  var navbar = document.getElementById("mynavigation_bar");
  if (navbar.className === "navigation_bar") {
    navbar.className += " responsive";
  } else {
    navbar.className = "navigation_bar";
  }
}

// <!-- Loading logic for header (just header atm) -->
// <!-- TODO move CV page into separate HTML and load that -->
//  <!-- Landing page should not be CV - it should be a targeted page explaining who I am -->
function loadNavBar() {
  // index 0 should be target div, index 1 should be path to html file
  // TODO fix this doesn't work rn
  let div_data = [
    ['header_container', 'header.html'],
  ]

  for (let data_pair of div_data) {
    // Dynamically load the header - can use this same logic to load page elements on demand
    // TODO - this returns a promise and will only load one element as a result, need to validate/store and handle
    document.getElementById(data_pair[0]).innerHTML = fetch(data_pair[1])
      .then(response => response.text())
      .then(data => document.getElementById(data_pair[0]).innerHTML = data)
      .catch(error => console.error('Error loading:', data_pair));
    console.log(data_pair, " loaded")
  }
}
