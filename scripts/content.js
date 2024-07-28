console.log('content.js')

const observer = new MutationObserver((mutationsList, observer) => {
    const elements = document.querySelectorAll('div.w-full.text-token-text-primary');

    if (elements.length > 0) {
        console.log('length of elements', elements.length);
        elements.forEach((element, index) => {
            console.log("element =", element);
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox'
            checkbox.checked = true
            element.parentNode.insertBefore(checkbox, element);
        });
        observer.disconnect(); // 完成后停止观察
    }
});

observer.observe(document.body, { childList: true, subtree: true });