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

    try {
        // Fetch the data from the local JSON file
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error("Failed to load data");
        }
        const data = await response.json();

        resultsDiv.textContent = `The CCG for postcode is... unknown! Dev hasn't implemented this function yet!`;
      <!--   
        // Search for the matching CCG by postcode
        const match = data.find(entry => entry.postcode === postcode);

        // Display the result
        if (match) {
            resultsDiv.textContent = `The CCG for postcode ${postcode} is: ${match.ccg}`;
        } else {
            resultsDiv.textContent = "No CCG found for that postcode.";
        }
      -->
    } catch (error) {
        console.error("Error:", error);
        resultsDiv.textContent = "An error occurred while looking up the CCG. Please try again later.";
    }
}
