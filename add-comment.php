<?php
    header("Content-type: text/plain; charset=utf-8", true, 200); //Response body is text
    if(isset($_POST['replyingto'])) {

        file_put_contents('/var/tmp/error.log', print_r("Beginning of Script", true), FILE_APPEND);

        $post       = $_POST;
        $message    = trim($_POST['message']);
        $name       = trim($_POST['name']);
        $email      = md5(strtolower(trim( $_POST['email'])));
        $emailorig  = strtolower(trim( $_POST['email']));
        $url        = trim($_POST['url']);
        $replyingto = trim($_POST['replyingto']);
        $slug       = $_POST['slug'];

        $token       = $_POST['token'];
        $secretKey = "6Le7grwUAAAAAPpp3bSKRUfr6-iXTjhnF9_I1TbN";

        file_put_contents('/var/tmp/error.log', print_r("Init done", true), FILE_APPEND);

        // post request to server
        $recaptchaurl =  'https://www.google.com/recaptcha/api/siteverify?secret=' . urlencode($secretKey) . '&response=' . urlencode($token);
        $response = file_get_contents($recaptchaurl);
        $responseKeys = json_decode($response,true);
        // end post request

        file_put_contents('/var/tmp/error.log', print_r("reCaptcha verification done", true), FILE_APPEND);

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
        $txt = "emailorig: $emailorig\n";
        fwrite($myfile, $txt);
        $txt = "url: $url\n";
        fwrite($myfile, $txt);
        $txt = "date: $datetostring\n";
        fwrite($myfile, $txt);
        $txt = "slug: $slug\n";
        fwrite($myfile, $txt);

        file_put_contents('/var/tmp/error.log', print_r("Regular variables written", true), FILE_APPEND);

        $responseKeysSuccess = $responseKeys["success"];
        $txt = "reCaptchaSuccess: $responseKeysSuccess\n";
        fwrite($myfile, $txt);
        $responseKeysScore = $responseKeys["score"];
        $txt = "reCaptchaScore: $responseKeysScore\n";
        fwrite($myfile, $txt);
        $responseKeysAction = $responseKeys["action"];
        $txt = "reCaptchaAction: $responseKeysAction\n";
        fwrite($myfile, $txt);
        $responseKeysTS = $responseKeys["challenge_ts"];
        $txt = "reCaptchaTimestamp: $responseKeysTS\n";
        fwrite($myfile, $txt);
        $responseKeysHost = $responseKeys["hostname"];
        $txt = "reCaptchaHost: $responseKeysHost\n";
        fwrite($myfile, $txt);

        file_put_contents('/var/tmp/error.log', print_r("Response variables written", true), FILE_APPEND);

        fclose($myfile);

        file_put_contents('/var/tmp/error.log', print_r("End of Script", true), FILE_APPEND);

        exit("OK");
    }
    else
        exit("INVALID REQUEST.");
?>
