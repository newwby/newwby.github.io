
// make sure the postcode entry field is focused on page load
function focusOnLoad() {
    // postcode.focus()
    document.getElementById("postcode").focus()
}

// Add PCCLookup functionality here

// Bottom of file
window.onload = focusOnLoad()
document.getElementById("postcode").addEventListener("keypress", function(event){
    if (event.key === "Enter") {
        // prevent any other behaviour from input event then click the lookup button
        event.preventDefault();
        document.getElementById("searchButton").click()
    }
    })
