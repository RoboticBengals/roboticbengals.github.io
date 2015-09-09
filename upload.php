<?php 
include 'ChromePhp.php';

ini_set("open_basedir", "");

$file_name = $_FILES['image']['name'];
$file_size =$_FILES['image']['size'];
$file_tmp =$_FILES['image']['tmp_name'];
$file_type=$_FILES['image']['type'];
$file_ext=strtolower(end(explode('.',$_FILES['image']['name'])));

if (isset($_FILES['image'])) {
    $dir = "gallery-photos/2016";
    $files = scandir($dir);
    $file_count = 0;

    foreach($files as $file) {
        switch(ltrim(strstr($file, '.'), '.')) {
            case "jpg": case "jpeg":case "png":case "gif":
                $file_count++;
        }
    }
    
    
    
    $file_name = "IMG_" . str_pad($file_count, 4, '0', STR_PAD_LEFT);
    
    ChromePhp::log(str_pad($file_count, 4, '0', STR_PAD_LEFT));
        
    rename($file_tmp, "gallery-photos/2016/" . $file_name . ".jpg");
    
//    if (!move_uploaded_file($file_tmp, "/gallery-photos/2016/" . $file_name . ".jpg")) {
//        ChromePhp::log("ERROR MOVING FILE");   
//    }
    
    
}
?>