$(document).ready(function () {

    loadImages();

    function loadImages() {
                console.log("loading images...");
        var dir = "gallery-photos/2016";
        var fileextension = ".jpg";
        $.ajax({
            url: dir,
            success: function (data) {
                $(data).find("a:contains(" + fileextension + ")").each(function () {

                    var filename = this.href.replace(window.location.host, "").replace("http://", "");
                    console.log(filename);
                    $("#images").append("<a href='" + filename + "'><img src='" + filename + "'></a>");
                });
            }
        });

    }
});

