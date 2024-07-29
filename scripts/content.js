
console.log("content.js")


const observer = new MutationObserver((mutationsList, observer) => {

    for(let mutation of mutationsList) {// 遍历变化
        if(mutation.type == "childList") {// 如果是新增子元素
            
            // console.log('@',mutation.type)

            if(ifBtnExist()) {
            }else {
                const submitBtn = getSubmitButton()
                // 挂载btn
                const parent = document.querySelector('.md\\:pt-0.dark\\:border-white\\/20.md\\:border-transparent.md\\:dark\\:border-transparent.w-full');
                const firstChild = parent.firstChild
                parent.insertBefore(submitBtn, firstChild)
            }

            // 遍历回答和问题
            const elements = document.querySelectorAll('div.w-full.text-token-text-primary');
            // console.log('change...')
            // 检查checkbox
            // 新增input
            if(elements.length!==0) {
                elements.forEach((element, index) => {
                    const secondChild = element.firstChild.firstChild;
                    const thirdChild = secondChild.firstChild
                    if(thirdChild.tagName=="INPUT") {
                        return;
                    }
                    const checkbox = getCheckBox(index)
                    secondChild.insertBefore(checkbox, thirdChild)
                });
            }
        }
    }
});

function getCheckBox(index) {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox'
    checkbox.checked = true
    checkbox.style.position = "relative";
    checkbox.style.top = "8px"; // Move the new element down by 100px
    checkbox.style.left = "10px"
    if(index % 2 === 0) {
        console.log('index =', index)
        checkbox.style.left = "780px"
        checkbox.style.top = "13px"; // Move the new element down by 100px
    }
    return checkbox
}

observer.observe(document.body, { 
    childList: true, 
    subtree: true,
    attributes: true,
    characterData: true 
});

function getSubmitButton() {
    let submitBtn = document.createElement('button')
    submitBtn.textContent = "Transform to PDF"
    
    submitBtn.style.all = 'unset';
    submitBtn.style.display = 'inline-block';
    submitBtn.style.padding = '2px 6px';
    submitBtn.style.border = '1px solid black';
    submitBtn.style.backgroundColor = 'white';
    submitBtn.style.cursor = 'pointer';
    submitBtn.style.fontFamily = 'inherit';
    submitBtn.style.fontSize = 'inherit';
    submitBtn.style.lineHeight = 'inherit';
    submitBtn.style.position = 'relative'
    submitBtn.style.marginLeft = '200px'
    
    submitBtn.addEventListener('click', ()=> {
        output()
    })

    return submitBtn
}

function output() {
    const div = collect()
    div.style.pageBreakInside = "avoid"; /* 避免元素内部分页 */

    let opt = {
        margin:       1,
        filename:     'my-document.pdf',
        image:        { type: 'jpeg', quality: 1 },
        // html2canvas:  { scale: 2 , backgroundColor: '#000', width: "1920px", height: "1080px"},
        html2canvas:  { scale: 2 , backgroundColor: '#000'},
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' },
        pagebreak:    { mode: ['avoid-all'] }
      };
      // 调用html2pdf.js生成PDF
    html2pdf().from(div).set(opt).save();
}

function collect() {
    const DIV = document.createElement("div")
    // 遍历回答和问题
    const elements = document.querySelectorAll('div.w-full.text-token-text-primary');
    if(elements.length!==0) {
        elements.forEach((element, index) => {
            const secondChild = element.firstChild.firstChild;
            const thirdChild = secondChild.firstChild
            if(thirdChild.tagName=="INPUT") {
                if (thirdChild.checked == true) {
                    const newNode = element.cloneNode(true)
                    DIV.appendChild(newNode)
                }
            }
        });
    }
    return DIV
}

function ifBtnExist() {
    const parent = document.querySelector('.md\\:pt-0.dark\\:border-white\\/20.md\\:border-transparent.md\\:dark\\:border-transparent.w-full');
    const firstChild = parent.firstChild
    if(firstChild.tagName == 'BUTTON') {
        return true
    }else {
        return false
    }
}

// let opt = {
//     margin:       1,
//     filename:     'my-document.pdf',
//     image:        { type: 'jpeg', quality: 0.98 },
//     html2canvas:  { scale: 2 },
//     jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
//   };
//   // 调用html2pdf.js生成PDF
// html2pdf().from(buttom).set(opt).save();