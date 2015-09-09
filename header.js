function insertHeader(content) {
    var html = document.getElementById("html").innerHTML;
    document.getElementById("html").innerHTML = content;
    document.getElementById("html").innerHTML += html;
}

function insertFooter(content) {
    document.getElementById("html").innerHTML += content;   
}

$.ajax({
    type: 'GET',
    url: 'header.html',
    success: function (file_html) {
        insertHeader(file_html);   
    }
});

$.ajax({
    type: 'GET',
    url: 'footer.html',
    success: function (file_html) {
        insertFooter(file_html);   
    }
});