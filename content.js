(()=>{
    console.log("Script loaded 101");
    let highlightpopup = null;
    let timer = null
    
    const addHighlightedText = (text) => {
        console.log(" Sending message", text)
        chrome.runtime.sendMessage({
            action: "saveHighlight",
            text: text
        }, (response) => {
            console.log("Response from background", response)
            if(response?.success) {
                alert("Highlight saved")
            }
        })
        hideHighlightPopup()
    }

    const hideHighlightPopup=()=> {
        document.body.removeChild(highlightpopup)
        highlightpopup=null
        if (timer){
            clearTimeout(timer)
            timer = null
        }
    }

    const showHighlightPopup=(text, x, y) => {
        if(highlightpopup) {
            return
        }
        highlightpopup = document.createElement("div")
        highlightpopup.className = "highlight-popup"
        highlightpopup.innerHTML  = `
        <div class="highlight-popup-content">
            <p class="selectedtext"> ${text}  </p>
            <button id="highlighter-save-button">Save</button>
        </div>`

        highlightpopup.style.left = `${x}px`
        highlightpopup.style.top = `${y}px`
        document.body.appendChild(highlightpopup)

        document.getElementById("highlighter-save-button").addEventListener("click", (e)=> {
            console.log("Clicked")
            addHighlightedText(text)
            // e.stopPropagation()
        })

        timer = setTimeout(hideHighlightPopup, 6000);

    }

    document.addEventListener('mouseup', (e)=> {
        const selection = document.getSelection()

        const selectedText  = selection.toString().trim()
        const x = e.clientX
        const y = e.clientY

        if(selectedText){

            showHighlightPopup(selectedText, x, y)
        }
        else{
            hideHighlightPopup()
        }


    })

})();