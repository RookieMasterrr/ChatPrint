
console.log("content.js")


const observer = new MutationObserver((mutationsList, observer) => {

    for(let mutation of mutationsList) {// iterate the mutation
        if(mutation.type == "childList") {// focus on childList event
            

            if(ifBtnExist()) {
            }else {
                const submitBtn = getSubmitButton()
                // mount the button
                const parent = document.querySelector('.md\\:pt-0.dark\\:border-white\\/20.md\\:border-transparent.md\\:dark\\:border-transparent.w-full')
                const firstChild = parent.firstChild
                parent.insertBefore(submitBtn, firstChild)
            }

            // iterate the Q and A
            const elements = document.querySelectorAll('div.w-full.text-token-text-primary')

            if(elements.length!==0) {
                elements.forEach((element, index) => {
                    const secondChild = element.firstChild.firstChild
                    const thirdChild = secondChild.firstChild
                    // check if exist the checkbox
                    if(thirdChild.tagName=="INPUT") {
                        return
                    }
                    const checkbox = getCheckBox(index)
                    // mount the checkbox
                    secondChild.insertBefore(checkbox, thirdChild)
                })
            }
        }
    }
})

observer.observe(document.body, { 
    childList: true, 
    subtree: true,
    attributes: true,
    characterData: true 
})

/**
 * create the checkbox
 */
function getCheckBox(index) {
    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.checked = true
    checkbox.style.position = "relative"
    checkbox.style.top = "8px"
    checkbox.style.left = "10px"
    if(index % 2 === 0) {
        console.log('index =', index)
        checkbox.style.left = "780px"
        checkbox.style.top = "13px" 
    }
    return checkbox
}


/**
 * create the submit button
 */
function getSubmitButton() {
    let submitBtn = document.createElement('button')
    submitBtn.textContent = "Transform to PDF"
    
    submitBtn.style.all = 'unset'
    submitBtn.style.display = 'inline-block'
    submitBtn.style.padding = '2px 6px'
    submitBtn.style.border = '1px solid black'
    submitBtn.style.backgroundColor = 'white'
    submitBtn.style.cursor = 'pointer'
    submitBtn.style.fontFamily = 'inherit'
    submitBtn.style.fontSize = 'inherit'
    submitBtn.style.lineHeight = 'inherit'
    submitBtn.style.position = 'relative'
    submitBtn.style.marginLeft = '200px'
    
    submitBtn.addEventListener('click', ()=> {
        output()
    })

    return submitBtn
}

/**
 * transform the div element to PDF
 */
function output() {
    const div = collect()
    div.style.pageBreakInside = "avoid" /* avoid paging inside the element */

    let opt = {
        margin:       [0.5, -0.3, 0, 0],
        filename:     'my-document.pdf',
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' },
        pagebreak:    { mode: ['avoid-all'] }
      }

    html2pdf().from(div).set(opt).save()
}

/**
 * iterte the Q and A then collect to a div element
 */
function collect() {
    const DIV = document.createElement("div")
    // 遍历回答和问题
    const elements = document.querySelectorAll('div.w-full.text-token-text-primary')
    if(elements.length!==0) {
        elements.forEach((element, index) => {
            const secondChild = element.firstChild.firstChild
            const thirdChild = secondChild.firstChild
            if(thirdChild.tagName=="INPUT") {
                if (thirdChild.checked == true) {
                    // 收集整个元素?
                    // const newNode = element.cloneNode(true)
                    // DIV.appendChild(newNode)

                    // 只收集有效元素?
                    // const newNode = element.firstChild.firstChild.cloneNode(true)
                    // DIV.appendChild(newNode)

                    // 收集整个元素后清除input
                    const newNode = element.cloneNode(true)
                    newNode.firstChild.firstChild.firstChild.style.display='none'
                    DIV.appendChild(newNode)
                }
            }
        })
    }
    return DIV
}

/**
 * check if the button exist
 */
function ifBtnExist() {
    const parent = document.querySelector('.md\\:pt-0.dark\\:border-white\\/20.md\\:border-transparent.md\\:dark\\:border-transparent.w-full')
    const firstChild = parent.firstChild
    if(firstChild.tagName == 'BUTTON') {
        return true
    }else {
        return false
    }
}