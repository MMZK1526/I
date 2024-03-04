function decodeColour(colour) {
    if (colour === "transparent") {
        return [0, 0, 0, 0];
    }

    if (colour[0] === "#") {
        colour = colour.substr(1);

        if (colour.length === 3) {
            colour = colour[0] + colour[0] + colour[1] + colour[1] + colour[2] + colour[2];
        }

        var r = parseInt(colour.substr(0, 2), 16);
        var g = parseInt(colour.substr(2, 2), 16);
        var b = parseInt(colour.substr(4, 2), 16);

        return [r, g, b, 1.0];
    }

    if (colour.substr(0, 4) === "rgb(") {
        colour = colour.substr(4).split(",");

        var r = parseInt(colour[0]);
        var g = parseInt(colour[1]);
        var b = parseInt(colour[2]);

        return [r, g, b, 1.0];
    }

    if (colour.substr(0, 5) === "rgba(") {
        colour = colour.substr(5).split(",");

        var r = parseInt(colour[0]);
        var g = parseInt(colour[1]);
        var b = parseInt(colour[2]);
        var a = parseFloat(colour[3]);

        return [r, g, b, a];
    }

    return [0, 0, 0, 0];
}

// Update favicon
function I_favicon() {
    const links = document.querySelectorAll("link[rel~='icon']");
    if (links.length == 0) {
        let link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
        links.push(link);
    }

    for (let i = 0; i < links.length; i++) {
        links[i].type = 'image/png';
        links[i].href = chrome.runtime.getURL("I.png");
    }
}

// Replace official website logo
function I_logo() {
    // Remove all usage of the class ".navigation--rebranded"
    const elements = document.body.querySelectorAll('.navigation--rebranded');
    for (let i = 0; i < elements.length; i++) {
        elements[i].classList.remove('navigation--rebranded');
    }

    // Replace official website logo
    // Find <a> with class "brand" and title containing "Imperial College London"
    // Replace its <svg> child with the old <svg> logo
    const a = document.querySelector('a.brand[title*="Imperial College London"]');
    if (a && a.querySelector('g[fill="#0000CD"]')) {
        a.innerHTML = `
     <span class="sr-only">Imperial College London</span>
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 361 95" class="header-logo" role="img"><title>Imperial College London</title><g fill="#FFFFFF"><path d="M.034 39.882V1.941h7.44v37.941H.034zM18.391 15.978h.105c1.794-2.439 5.222-3.848 8.337-3.848 3.32 0 6.168 1.355 7.754 3.848 2.219-2.166 5.646-3.793 8.762-3.848 5.955-.055 9.074 3.688 9.18 9.918v17.779h-7.021V23.351c0-3.143-1.055-6.395-4.533-6.395-3.377 0-5.486 2.057-5.486 6.771v16.154h-7.02v-16.53c0-3.793-1.635-6.395-4.643-6.395-3.326 0-5.38 2.328-5.38 6.936v15.99h-7.02V12.781h6.965v3.197zM70.176 16.468c4.006 0 6.012 4.662 6.012 9.322 0 4.77-1.58 10.406-6.273 10.406-3.801 0-6.492-3.848-6.492-9.539-.001-6.234 2.321-10.189 6.753-10.189zm-6.754-3.687h-7.014v40.654h7.014V36.521c1.955 2.389 4.693 4.01 7.91 4.01 7.547 0 12.295-7.639 12.295-14.795 0-5.963-3.374-13.605-11.657-13.605-3.166 0-6.594 1.627-8.443 4.389h-.105v-3.739zM93.682 23.078c-.053-3.625 1.738-6.936 5.75-6.936 3.48 0 4.906 2.818 4.641 6.936H93.682zm16.993 3.902c.521-8.074-2.908-14.85-11.137-14.85-7.545 0-13.453 5.312-13.453 13.66 0 8.945 5.959 14.74 13.928 14.74 3.006 0 6.752-.867 10.34-3.033l-2.006-3.793c-1.738 1.244-4.486 2.17-7.068 2.17-4.379 0-7.859-3.797-7.699-8.895l17.095.001zM121.023 17.55h.105l1.422-2.113c.844-1.141 2.375-3.307 4.537-3.307 1.584 0 3.27.869 4.75 2.438l-2.637 4.99c-1.16-.598-1.9-.924-3.324-.924-2.426 0-4.803 2.006-4.803 7.859v13.389h-7.018V12.781h6.967l.001 4.769zM141.1 12.781v27.102h-7.014V12.781h7.014zm-7.699-8.127c0-2.064 1.688-4.174 4.062-4.174 2.426 0 4.326 2.059 4.326 4.174 0 2.328-1.639 4.549-4.225 4.549-2.475 0-4.163-2.221-4.163-4.549zM160.157 24.164c.527 7.965-3.109 11.545-5.906 11.545-1.688 0-3.17-1.625-3.17-4.012 0-3.088 1.744-5.146 5.172-6.234l3.904-1.299zm-.103 11.761c0 1.463.156 3.035.682 3.957h7.441c-.846-1.898-1.109-4.445-1.109-6.613V22.214c0-8.457-5.959-10.084-10.814-10.084-3.639 0-6.855.922-10.131 3.688l2.268 3.414c1.85-1.627 3.961-2.764 6.971-2.764 2.268 0 4.428 1.572 4.797 4.064l-6.227 1.896c-6.121 1.787-9.76 4.715-9.76 9.867 0 4.982 3.428 8.234 7.543 8.234 2.428 0 4.807-1.678 6.758-3.252l1.581-1.352zM171.448 39.882V.043h7.013v39.84l-7.013-.001zM224.767 8.824c-1.799-.977-4.803-2.113-7.655-2.113-7.595 0-13.078 5.475-13.078 14.094 0 8.998 6.067 14.309 13.291 14.309 2.852 0 5.487-.814 7.442-1.898l2.058 4.717c-2.269 1.355-6.226 2.6-9.814 2.6-12.824 0-20.895-8.672-20.895-19.834 0-10.354 8.022-19.406 20.996-19.406 3.854 0 7.444 1.41 9.973 2.928l-2.318 4.603z"></path><path d="M240.744 36.521c-5.014 0-6.383-5.744-6.383-10.514 0-4.498 1.58-9.865 6.383-9.865 4.906 0 6.435 5.367 6.435 9.865 0 4.77-1.316 10.514-6.435 10.514zm0 4.01c8.287 0 13.871-6.121 13.871-14.523 0-8.781-6.748-13.877-13.871-13.877-7.071 0-13.821 5.096-13.821 13.877 0 8.402 5.592 14.523 13.821 14.523zM257.642 39.882V.043h7.021v39.84l-7.021-.001zM269.084 39.882V.043h7.015v39.84l-7.015-.001zM286.617 23.078c-.06-3.625 1.735-6.936 5.744-6.936 3.485 0 4.907 2.818 4.646 6.936h-10.39zm16.984 3.902c.529-8.074-2.899-14.85-11.131-14.85-7.543 0-13.459 5.312-13.459 13.66 0 8.945 5.963 14.74 13.935 14.74 3.004 0 6.75-.867 10.342-3.033l-2.006-3.793c-1.738 1.244-4.486 2.17-7.07 2.17-4.377 0-7.863-3.797-7.703-8.895l17.092.001zM343.916 23.078c-.051-3.625 1.74-6.936 5.752-6.936 3.479 0 4.908 2.818 4.644 6.936h-10.396zm16.99 3.902c.524-8.074-2.9-14.85-11.132-14.85-7.547 0-13.454 5.312-13.454 13.66 0 8.945 5.959 14.74 13.93 14.74 3.008 0 6.754-.867 10.34-3.033l-2.004-3.793c-1.742 1.244-4.484 2.17-7.07 2.17-4.381 0-7.857-3.797-7.703-8.895l17.093.001zM320.002 16.468c4.224 0 6.384 4.391 6.384 9.105 0 5.42-2.007 10.623-6.703 10.623-4.062 0-6.062-5.096-6.062-10.354-.002-5.255 1.845-9.374 6.381-9.374zm13.402-3.687h-7.019v3.307h-.104c-1.477-2.439-4.645-3.957-7.863-3.957-7.176 0-12.239 6.83-12.239 13.877 0 8.672 4.592 14.523 11.608 14.523 4.013 0 6.752-2.275 8.494-4.553h.104v3.578c0 6.287-3.586 9.215-8.231 9.215-3.586 0-6.595-.705-9.177-2.331l-1.375 4.443c3.115 1.625 7.127 2.552 11.08 2.552 7.863 0 14.722-3.959 14.722-15.991V12.781zM.034 56.146h7.494v32.841h15.771v5.096H.034V56.146zM64.469 70.18c2.503-2.602 5.995-3.85 9.495-3.85 6.496 0 9.607 3.471 9.607 10.299v17.453H76.52V77.443c0-3.791-1.722-6.284-5.554-6.284-3.613 0-6.442 2.327-6.442 6.771v16.152h-7.052V66.984h6.998l-.001 3.196zM101.831 70.672c4.444 0 6.719 4.391 6.719 9.102 0 5.424-2.106 10.623-7.053 10.623-4.273 0-6.383-5.094-6.383-10.352 0-5.257 1.945-9.373 6.717-9.373zm6.719 23.411h7.053V54.249h-7.053V70.13h-.112c-1.665-2.389-4.883-3.799-8.492-3.799-7.444 0-12.662 6.831-12.662 13.877 0 8.67 4.829 14.522 12.105 14.522 4.331 0 7.218-2.274 9.049-4.553h.111l.001 3.906zM133.927 90.719c-5.271 0-6.721-5.742-6.721-10.512 0-4.497 1.664-9.863 6.721-9.863 5.167 0 6.773 5.366 6.773 9.863 0 4.77-1.384 10.512-6.773 10.512zm0 4.011c8.717 0 14.601-6.125 14.601-14.522 0-8.776-7.104-13.877-14.601-13.877-7.441 0-14.549 5.101-14.549 13.877 0 8.397 5.887 14.522 14.549 14.522zM159.358 70.18c2.5-2.602 5.997-3.85 9.493-3.85 6.497 0 9.608 3.471 9.608 10.299v17.453h-7.051V77.443c0-3.791-1.722-6.284-5.556-6.284-3.606 0-6.44 2.327-6.44 6.771v16.152h-7.052V66.984h6.997l.001 3.196zM38.917 90.719c-5.28 0-6.72-5.742-6.72-10.512 0-4.497 1.664-9.863 6.72-9.863 5.164 0 6.774 5.366 6.774 9.863.001 4.77-1.391 10.512-6.774 10.512zm0 4.011c8.716 0 14.602-6.125 14.602-14.522 0-8.776-7.108-13.877-14.602-13.877-7.442 0-14.549 5.101-14.549 13.877.001 8.397 5.884 14.522 14.549 14.522z"></path></g></svg>
     `;
    }
}

// Replace all icons
function I_icon() {
    // Get all <img> under <a> with id containing "customerLogo" or "TenantLogo"
    // Replace the src of each <img> with the old icon
    const imgs = document.querySelectorAll('a[id*="customerLogo"] img, a[id*="TenantLogo"] img');
    for (let i = 0; i < imgs.length; i++) {
        imgs[i].src = chrome.runtime.getURL("ICL.png");
    }

    // Get all <img> with class containing "header-logo" or equals to "logo"
    // Replace the src of each <img> with the old icon
    const imgs2 = document.querySelectorAll('img[class*="header-logo"], img[class="logo"]');
    for (let i = 0; i < imgs2.length; i++) {
        imgs2[i].src = chrome.runtime.getURL("ICL.png");
    }
}

// Replace all Imperial Blue with #163A6F
function I_colour() {
    const elements = document.body.querySelectorAll('*');
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        const style = window.getComputedStyle(element);

        const colour = decodeColour(style.backgroundColor);
        if (colour[0] === 0 && colour[1] === 0 && colour[2] === 205) {
            console.log(colour);
            element.style.setProperty('background-color', '#163A6F', 'important');
        }

        const borderColour = decodeColour(style.borderColor);
        if (borderColour[0] === 0 && borderColour[1] === 0 && borderColour[2] === 205) {
            console.log(borderColour);
            element.style.setProperty('border-color', '#163A6F', 'important');
            continue;
        }

        const borderLeftColour = decodeColour(style.borderLeftColor);
        if (borderLeftColour[0] === 0 && borderLeftColour[1] === 0 && borderLeftColour[2] === 205) {
            console.log(borderLeftColour);
            element.style.setProperty('border-left-color', '#163A6F', 'important');
        }

        const borderRightColour = decodeColour(style.borderRightColor);
        if (borderRightColour[0] === 0 && borderRightColour[1] === 0 && borderRightColour[2] === 205) {
            console.log(borderRightColour);
            element.style.setProperty('border-right-color', '#163A6F', 'important');
        }

        const borderTopColour = decodeColour(style.borderTopColor);
        if (borderTopColour[0] === 0 && borderTopColour[1] === 0 && borderTopColour[2] === 205) {
            console.log(borderTopColour);
            element.style.setProperty('border-top-color', '#163A6F', 'important');
        }

        const borderBottomColour = decodeColour(style.borderBottomColor);
        if (borderBottomColour[0] === 0 && borderBottomColour[1] === 0 && borderBottomColour[2] === 205) {
            console.log(borderBottomColour);
            element.style.setProperty('border-bottom-color', '#163A6F', 'important');
        }
    }
}

function I() {
    console.log('I');

    I_favicon();
    I_logo();
    I_icon();
    I_colour();
}

// Create a new instance of MutationObserver
const observer = new MutationObserver(function (mutationsList, observer) {
    for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            for (let node of mutation.addedNodes) {
                if (node instanceof HTMLElement && typeof node.onclick === 'object') {
                    I(); // TODO: Fine-grain this
                    break;
                }
            }
        }
    }
});

// Configuration for the observer
const config = { attributes: true, attributeFilter: ['onclick'], childList: true, subtree: true };

// Start observing the document
observer.observe(document, config);
