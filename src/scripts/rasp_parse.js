var classes = $.map($(".class_tab"), function (n, i) {
    return n.id;
});

const pasteNode = document.getElementById('rasp');
classes.forEach(element => {
    const node = document.createElement('img');
    node.src = `${window.location.href}/images/rasp/${element}.png`;
    node.classList.add('rasp_img');
    node.id = `rasp_img_${element}`
    node.style.display = 'none';
    pasteNode.appendChild(node);
});