// Load the data file and look up the CCG for a given postcode
async function lookupCCG() {
    // Get the postcode entered by the user
    const postcode = document.getElementById("postcode").value.trim().toUpperCase();
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = ""; // Clear any previous results

    if (!postcode) {
        resultsDiv.textContent = "Please enter a postcode.";
        return;
    }
    resultsDiv.textContent = `The CCG for postcode is... unknown! Dev hasn't implemented this function yet!`;
}
