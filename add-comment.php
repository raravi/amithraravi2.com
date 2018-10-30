<?php
    header("Content-type: text/plain; charset=utf-8", true, 200); //Response body is text
    if(isset($_POST)) {
        $post       = $_POST;
        $message    = $_POST['message'];
        $name       = $_POST['name'];
        $email      = $_POST['email'];
        $url        = $_POST['url'];
        $slug       = $_POST['slug'];

        $date = new DateTime();
        $datetostring = $date->getTimestamp();
        $myfilename = "entry$datetostring.yml";
        $myfile = fopen($myfilename, "w") or die("Unable to open file!");
        $txt = "_id: $datetostring\n";
        fwrite($myfile, $txt);
        $txt = "message: \"$message\"\n";
        fwrite($myfile, $txt);
        $txt = "name: $name\n";
        fwrite($myfile, $txt);
        $txt = "email: $email\n";
        fwrite($myfile, $txt);
        $txt = "url: $url\n";
        fwrite($myfile, $txt);
        $txt = "date: $datetostring\n";
        fwrite($myfile, $txt);
        $txt = "slug: $slug\n";
        fwrite($myfile, $txt);
        fclose($myfile);

        exit("OK");
    }
    else
        exit("INVALID REQUEST.");
?>
