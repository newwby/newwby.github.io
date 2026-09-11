function focusOnLoad() {
    document.getElementById("postcode").focus()
}

async function lookupPCC() {
    resultsDiv.innerHTML = "";

    if (!postcode.value) {
        resultsDiv.textContent = "Please enter a postcode.";
        return;
    }

    let pcc_output = ""
    const webapp_target = 'https://pcc-look.up.railway.app/?postcode='
    let fetch_string = webapp_target+encodeURIComponent(postcode.value)
    let lookup = await fetch(fetch_string)
        .then(response => response.text())
        .then(data => pcc_output = data)
        .catch(error => console.error('Error:', error));
    if (pcc_output=="") {
        resultsDiv.innerHTML = ""
    } else {
        resultsDiv.innerHTML = `<b>Prescribing Cost Centre Code</b>: ${pcc_output}`
    }

}

window.onload = focusOnLoad()
document.getElementById("postcode").addEventListener("keypress", function(event){
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("searchButton").click()
    }
    })
