<?php

    $dir = "gallery-photos/2016";

    $result = array();
    $files = scandir($dir);


    foreach($files as $file) {
        if (strpos($file, '_thumb.jpg') !== false) {
                $result[] = $dir . "/" . $file;
        }
    }


    $resultJson = json_encode($result);
    echo($resultJson);

?>