consoleg('content.js')

let element_length = 0

const observer = new MutationObserver((mutationsList, observer) => {

    for(let mutation of mutationsList) {// 遍历变化
        if(mutation.type == "childList") {// 如果是新增子元素
            
            // 遍历回答和问题
            const elements = document.querySelectorAll('div.w-full.text-token-text-primary');

            // 如果是新增回答或问题
            if (elements.length!=element_length && elements.length > 0) {
                console.log('change...')
                // 重设长度
                element_length = elements.length
                // 新增input
                elements.forEach((element, index) => {
                    const checkbox = document.createElement('input');
                    checkbox.type = 'checkbox'
                    checkbox.checked = true
                    element.parentNode.insertBefore(checkbox, element);
                });
            }
        }
    }


    
});

observer.observe(document.body, { 
    childList: true, 
    subtree: true,
    attributes: true,
    characterData: true 
});