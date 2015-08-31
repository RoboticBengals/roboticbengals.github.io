function insertHeader(content) {
    document.getElementById("header").innerHTML = content;
}

$.ajax({
    type: 'GET',
    url: 'header.html',
    success: function (file_html) {
        insertHeader(file_html);   
    }
});