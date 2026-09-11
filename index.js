function navAddResponsive() {
  var navbar = document.getElementById("mynavigation_bar");
  if (navbar.className === "navigation_bar") {
    navbar.className += " responsive";
  } else {
    navbar.className = "navigation_bar";
  }
}

function loadDiv(arg_div, arg_page) {
    const doc_div_element = document.getElementById(arg_div)
    if (doc_div_element !== null) {
        doc_div_element.innerHTML = fetch(arg_page)
            .then(response => response.text())
            .then(data => doc_div_element.innerHTML = data)
            .catch(error => console.error(`Error loading ${arg_div} & ${arg_page}`))
    }
    else {
        console.log('Null error on loadDiv arg_div')
        }
    }

function addContentBlock(arg_background_url, arg_title, arg_text) {
  [arg_background_url, arg_title, arg_text].forEach((argument) => {
    if (typeof(argument) !== "string") {
      console.log("invalid argument type passed to addContentBlock, no content block created"+
      `arguments passed: ${arg_background_url}, ${arg_title}, ${arg_text}`)
      return
    }
  })

  const content_grid = document.querySelector("#content_grid")
  if (content_grid === null) {
    console.log("addContentBlock cannot locate content grid, no content block created")
    return
  }

  const new_div = document.createElement("div")
  new_div.classList.add("content_block")

  const new_media = document.createElement("div")
  new_media.classList.add("content_block_media")
  new_media.setAttribute("role", "img")
  new_media.setAttribute("aria-label", `${arg_title} illustration`)
  fetch(arg_background_url).then(response => {
    if (!response.ok) {
      console.log("Cannot locate background url passed as argument, no content block created; "+
        `invalid url is ${arg_background_url}`
      )
    }
  })
  new_media.style.backgroundImage = `url('${arg_background_url}')`

  const new_body = document.createElement("div")
  new_body.classList.add("content_block_body")
  const new_header = document.createElement("h3")
  new_header.innerText = arg_title
  const new_subtext = document.createElement("p")
  new_subtext.innerText = arg_text

  content_grid.appendChild(new_div)
  new_div.appendChild(new_media)
  new_div.appendChild(new_body)
  new_body.appendChild(new_header)
  new_body.appendChild(new_subtext)
}

function initNavDropdowns() {
  function closeDropdown(dropdown) {
    dropdown.classList.remove("open")
    const button = dropdown.querySelector(".dropbtn")
    if (button !== null) {
      button.setAttribute("aria-expanded", "false")
    }
  }

  document.addEventListener("click", (event) => {
    const clicked_button = event.target.closest(".dropbtn")
    const open_dropdown = document.querySelector(".dropdown.open")

    if (clicked_button !== null) {
      const dropdown = clicked_button.closest(".dropdown")
      const is_already_open = dropdown.classList.contains("open")

      if (open_dropdown !== null && open_dropdown !== dropdown) {
        closeDropdown(open_dropdown)
      }

      if (is_already_open) {
        closeDropdown(dropdown)
      } else {
        dropdown.classList.add("open")
        clicked_button.setAttribute("aria-expanded", "true")
      }
      event.preventDefault()
      return
    }

    if (open_dropdown !== null && event.target.closest(".dropdown") === null) {
      closeDropdown(open_dropdown)
    }
  })

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      const open_dropdown = document.querySelector(".dropdown.open")
      if (open_dropdown !== null) {
        closeDropdown(open_dropdown)
      }
    }
  })
}
