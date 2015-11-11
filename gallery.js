

function load() {
    
    callForImages();
    dragndrop();
    
    
    
    document.getElementById("progress_fore").style.width = "calc(100% - 20px)";
    document.getElementById("admin_drop").style.display = 'none';
}

function loadImages(images) {
    
    var imageContainer = document.getElementById("images");
    
    console.log("loading images...");
    
    for (var i = images.length - 1; i >= 0; i--) {        
        
        var newImageLink = document.createElement("a");
        newImageLink.setAttribute("href", images[i].replace("_thumb", ""));
        
        var newImage = document.createElement("img");
        newImage.setAttribute("src", images[i]);

        
        newImageLink.appendChild(newImage);
        imageContainer.appendChild(newImageLink);
        
        console.log(imageContainer);

    }

}

function callForImages() {

    console.log("calling for images");
    var httpReq = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

    httpReq.onload = function () {

        var result = JSON.parse(httpReq.responseText);

        loadImages(result);
    };

    try {
        httpReq.open("GET", "gallery.php", true);
        httpReq.send(null);
    } catch (e) {
        console.log(e);
    }

}


// Drag 'n Drop
function dragndrop() {
    
    var dropArea = document.getElementById("droparea");
    console.log("Drop area is: " + dropArea);

    dropArea.addEventListener("dragleave", function (evt) {
        var target = evt.target;
        evt.preventDefault();
        evt.stopPropagation();
    }, false);

    dropArea.addEventListener("dragenter", function (evt) {
        evt.preventDefault();
        evt.stopPropagation();
    }, false);

    dropArea.addEventListener("dragover", function (evt) {
        evt.preventDefault();
        evt.stopPropagation();
    }, false);

    dropArea.addEventListener("drop", function (evt) {
        evt.preventDefault();
        evt.stopPropagation();

        processFileUpload(evt.dataTransfer.files);
    }, false);	
}
      


function processFormFileUpload() {
    
    var file_input = document.getElementById('file_input');
    
    console.log("Processing form file upload. No. files: " + file_input.files.length);
                
    if (file_input.files.length != 0) {
           processFileUpload(file_input.files);
    }
}

function processFileUpload(droppedFiles) {
    console.log("Process file upload: " + droppedFiles[0].name)
    
    for (var i = 0; i < droppedFiles.length; i++) {
        uploadFile(droppedFiles[i]);
    } 
}

function uploadFile(file) {
    
    console.log("trying to upload: " + file.name);
    
    var xhr = new XMLHttpRequest();
    
    xhr.upload.onprogress = function(e) {
        console.log(e.loaded / e.total * 100 + "% uploaded");  
        var percent = e.loaded / e.total * 100
        document.getElementById("progress_fore").style.width = "calc(" + percent + "% - 20px)";
        document.getElementById("progress_fore").innerHTML = "Please wait...";
    }
    
    xhr.upload.onload = function(e) {
        console.log("Uploaded successfully!");
        document.getElementById("progress_fore").innerHTML = "Upload successful!";
    }
    
    xhr.upload.onerror = function(e) {
        console.log("Error uploading file");   
        document.getElementById("progress_fore").innerHTML = "Upload failure";
    }
    
    var fd = new FormData();
    fd.append('image', file);
    
    xhr.open("post", "upload.php", true);
    xhr.send(fd);
    
    console.log("Sent " + file.name + " to upload.php");
}

onload = load;