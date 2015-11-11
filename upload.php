<?php 
include 'ChromePhp.php';

ini_set("open_basedir", "");

$image_name = $_FILES['image']['name'];
$file_size =$_FILES['image']['size'];
$image_tmp =$_FILES['image']['tmp_name'];
$image_type=$_FILES['image']['type'];
$file_ext=strtolower(end(explode('.',$_FILES['image']['name'])));

if (isset($_FILES['image'])) {
    $dir = "gallery-photos/2016";
    $files = scandir($dir);
    $file_count = 0;

    foreach($files as $file) {
        if (strpos($file, '_thumb.jpg') !== false) {
                $file_count++;
        }
    }
    
    
    
    $image_dest = "gallery-photos/2016/IMG_" . str_pad($file_count, 4, '0', STR_PAD_LEFT) . ".jpg";
    $thumb_dest = "gallery-photos/2016/IMG_" . str_pad($file_count, 4, '0', STR_PAD_LEFT) . "_thumb.jpg";
    
    //ChromePhp::log(str_pad($file_count, 4, '0', STR_PAD_LEFT));
    
    make_thumb($image_tmp, $thumb_dest, 400);
    //move_uploaded_file($image_tmp, $image_dest)
    rename($image_tmp, $image_dest);
    chmod($image_dest, 0755);
    
//    if(preg_match('/[.](jpg)$/', $filename)) {
//        $im = imagecreatefromjpeg($path_to_image_directory . $filename);
//    } else if (preg_match('/[.](gif)$/', $filename)) {
//        $im = imagecreatefromgif($path_to_image_directory . $filename);
//    } else if (preg_match('/[.](png)$/', $filename)) {
//        $im = imagecreatefrompng($path_to_image_directory . $filename);
//    }
//     
//    $ox = imagesx($im);
//    $oy = imagesy($im);
//     
//    $nx = $final_width_of_image;
//    $ny = floor($oy * ($final_width_of_image / $ox));
//     
//    $nm = imagecreatetruecolor($nx, $ny);
//     
//    imagecopyresized($nm, $im, 0,0,0,0,$nx,$ny,$ox,$oy);
//     
//    if(!file_exists($path_to_thumbs_directory)) {
//      if(!mkdir($path_to_thumbs_directory)) {
//           die("There was a problem. Please try again!");
//      } 
//       }
// 
//    imagejpeg($nm, $path_to_thumbs_directory . $filename);
    
    
//    if (!move_uploaded_file($file_tmp, "/gallery-photos/2016/" . $file_name . ".jpg")) {
//        ChromePhp::log("ERROR MOVING FILE");   
//    }
}

function make_thumb($src, $dest, $desired_width) {
	$source_image = imagecreatefromjpeg($src);
	$width = imagesx($source_image);
	$height = imagesy($source_image);
	$desired_height = floor($height * ($desired_width / $width));
	$virtual_image = imagecreatetruecolor($desired_width, $desired_height);
	imagecopyresampled($virtual_image, $source_image, 0, 0, 0, 0, $desired_width, $desired_height, $width, $height);
	imagejpeg($virtual_image, $dest);
}

?>