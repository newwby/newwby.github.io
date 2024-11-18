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
    resultsDiv.textContent = `The CCG for postcode is... unknown! Dev hasn't implemented this function yet!`;
}
