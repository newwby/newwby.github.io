// make sure the postcode entry field is focused on page load
function focusOnLoad() {
    // postcode.focus()
    document.getElementById("postcode").focus()
}

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
    let is_valid = false
    // await so the promise resolves before trying to populate resultsDiv text
    let fetch_string = 'https://api.postcodes.io/postcodes/'+encodeURIComponent(postcode.value)
    let lookup = await fetch(fetch_string+'/validate')
        .then(response => response.json())
        .then(data => is_valid = data.result) // true or false
        .catch(error => console.error('Error:', error));
    
    let results_output = ""
    if (is_valid == true) {
        let ccg_data
        let ccg_fetch = await fetch(fetch_string)
            .then(response => response.json())
            .then(data => ccg_data = data.result)
            .catch(error => console.error('Error:', error))
        
        let ccg_code = ccg_data.codes.ccg_id
        results_output += "<b>CCG Name</b>: "+ccg_data.ccg
        results_output += "<br>"+"<b>CCG Code</b>: "+ccg_code
        // console.log(ccg_data.ccg, ccg_data.codes.ccg_id)

        // todo add is-valid check
        let icb_data;
        await fetch('./ccg_to_icb.json')
        .then(response => response.json())
        .then(data => {
            icb_data = data;
        });
        
        //if ccg_code in icb_data:
        //let obj = JSON.parse({})
        if (ccg_code in icb_data){
            let icb_code = icb_data[ccg_code]['ICB Code']
            let icb_name = icb_data[ccg_code]['ICB Name']
            results_output += "<br>"+"<b>ICB Name</b>: "+icb_name
            results_output += "<br>"+"<b>ICB Code</b>: "+icb_code
            } else {
            results_output += "<br>"+"missing ICB data - tell the developer to fix the database!"
            }
    
    // outputting all at once results in no delay in displaying icb text (ccg waits for icb fetch)
    
    } else {
    results_output = "Invalid postcode"
    }
    resultsDiv.innerHTML = results_output
}

window.onload = focusOnLoad()
document.getElementById("postcode").addEventListener("keypress", function(event){
    if (event.key === "Enter") {
        // prevent any other behaviour from input event then click the lookup button
        event.preventDefault();
        document.getElementById("searchButton").click()
    }
    })
