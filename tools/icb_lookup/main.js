function focusOnLoad() {
    document.getElementById("postcode").focus()
}

async function lookupCCGICB() {
    resultsDiv.innerHTML = "";

    if (!postcode) {
        resultsDiv.textContent = "Please enter a postcode.";
        return;
    }

    let is_valid = false
    let fetch_string = 'https://api.postcodes.io/postcodes/'+encodeURIComponent(postcode.value)
    let lookup = await fetch(fetch_string+'/validate')
        .then(response => response.json())
        .then(data => is_valid = data.result)
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

        let icb_data;
        await fetch('./ccg_to_icb.json')
        .then(response => response.json())
        .then(data => {
            icb_data = data;
        });

        if (ccg_code in icb_data){
            let icb_code = icb_data[ccg_code]['ICB Code']
            let icb_name = icb_data[ccg_code]['ICB Name']
            results_output += "<br>"+"<b>ICB Name</b>: "+icb_name
            results_output += "<br>"+"<b>ICB Code</b>: "+icb_code
            } else {
            results_output += "<br>"+"missing ICB data - tell the developer to fix the database!"
            }

    } else {
    results_output = "Invalid postcode"
    }
    resultsDiv.innerHTML = results_output
}

window.onload = focusOnLoad()
document.getElementById("postcode").addEventListener("keypress", function(event){
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("searchButton").click()
    }
    })
