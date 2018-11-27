<?php
    header("Content-type: text/plain; charset=utf-8", true, 200); //Response body is text
    if(isset($_POST['replyingto'])) {
        $post       = $_POST;
        $message    = trim($_POST['message']);
        $name       = trim($_POST['name']);
        $email      = md5(strtolower(trim( $_POST['email'])));
        $url        = trim($_POST['url']);
        $replyingto = trim($_POST['replyingto']);
        $slug       = $_POST['slug'];

        $date = new DateTime();
        $datetostring = $date->getTimestamp();
        $myfilename = "entry$datetostring.yml";
        $myfile = fopen($myfilename, "w") or die("Unable to open file!");
        $txt = "_id: $datetostring\n";
        fwrite($myfile, $txt);
        $txt = "replying_to: '$replyingto'\n";
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
