
// make sure the postcode entry field is focused on page load
function focusOnLoad() {
    // postcode.focus()
    document.getElementById("postcode").focus()
}

// func to take given postcode and return the associated CCG/ICB pair; fires on clicking button (onclick event)
async function lookupPCC() {
    // results div is the block where the text content appears after entering postcode
    resultsDiv.innerHTML = ""; // Clear any previous results
    
    // if no postcode prompt user to enter one
    if (!postcode.value) {
        resultsDiv.textContent = "Please enter a postcode.";
        return;
    }
    
    let pcc_output = ""
    // await so the promise resolves before trying to populate resultsDiv text
    let fetch_string = 'https://pcc-lookup.vercel.app/?postcode='+encodeURIComponent(postcode.value)
    let lookup = await fetch(fetch_string)
        .then(response => response.text())
        .then(data => pcc_output = data)
        .catch(error => console.error('Error:', error));
    if (pcc_output="") {
        resultsDiv.innerHTML = ""
    } else {
        resultsDiv.innerHTML = `<b>Prescribing Cost Centre Code</b>: ${pcc_output}`
    }
    
}

// Bottom of file
window.onload = focusOnLoad()
document.getElementById("postcode").addEventListener("keypress", function(event){
    if (event.key === "Enter") {
        // prevent any other behaviour from input event then click the lookup button
        event.preventDefault();
        document.getElementById("searchButton").click()
    }
    })
