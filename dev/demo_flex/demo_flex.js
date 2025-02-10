function changeFlexDirection() {
    // let container = document.querySelector("#flex_root_container")
    let container = document.getElementById("flex_root_container")
    if (container.style.flexDirection  === 'column') {
        container.style.flexDirection  = 'row'
        console.log("changed to row alignment")
    } else {
        container.style.flexDirection  = 'column'
        console.log("changed to column alignment")
    }
}