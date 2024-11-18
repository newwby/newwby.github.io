// func to take given postcode and return the associated CCG/ICB pair; fires on clicking button (onclick event)
async function lookupCCGICB() {
    // results div is the block where the text content appears after entering postcode
    resultsDiv.innerHTML = ""; // Clear any previous results
    
    // if no postcode prompt user to enter one
    if (!postcode) {
        resultsDiv.textContent = "Please enter a postcode.";
        return;
    }
    
    // otherwise do nothing because haven't sorted the lookup yet :')
    // resultsDiv.textContent = `The CCG for postcode is... unknown! Dev hasn't implemented this function yet!`;
    var is_valid = false
    // await so the promise resolves before trying to populate resultsDiv text
    var fetch_string = 'https://api.postcodes.io/postcodes/'+encodeURIComponent(postcode.value)
    var lookup = await fetch(fetch_string+'/validate')
        .then(response => response.json())
        .then(data => is_valid = data.result) // true or false
        .catch(error => console.error('Error:', error));
    
    if (is_valid == true) {
        var ccg_data
        var ccg_fetch = await fetch(fetch_string)
            .then(response => response.json())
            .then(data => ccg_data = data.result)
            .catch(error => console.error('Error:', error))
        resultsDiv.innerHTML = "<b>CCG</b>: "+ccg_data.ccg+"<br>"
        resultsDiv.innerHTML += "<b>Code</b>: "+ccg_data.codes.ccg_id
        // console.log(ccg_data.ccg, ccg_data.codes.ccg_id)
    }

    // resultsDiv.textContent = is_valid
    console.log(is_valid, " ", fetch_string)
}
