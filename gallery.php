<?php

    $dir = "gallery-photos/2016";

    $result = array();
    $files = scandir($dir);


    foreach($files as $file) {

        switch(ltrim(strstr($file, '.'), '.')) {

            case "jpg": case "jpeg":case "png":case "gif":

                $result[] = $dir . "/" . $file;

        }
    }

    $resultJson = json_encode($result);
    echo($resultJson);

?>