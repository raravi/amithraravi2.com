<?php
    header("Content-type: text/plain; charset=utf-8", true, 200); //Response body is text
    if(isset($_POST['replyingto'])) {
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

        // post request to server
        $recaptchaurl = 'https://www.google.com/recaptcha/api/siteverify';
        $data = array('secret' => $secretKey, 'response' => $token);

        $options = array(
          'http' => array(
            'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
            'method'  => 'POST',
            'content' => http_build_query($data)
          )
        );
        $context  = stream_context_create($options);
        $response = file_get_contents($recaptchaurl, false, $context);
        $responseKeys = json_decode($response,true);
        //header('Content-type: application/json');
        // end post request

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

        /*$responseKeysSuccess = $responseKeys["success"];
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
        fwrite($myfile, $txt);*/

        fclose($myfile);

        exit("OK");
    }
    else
        exit("INVALID REQUEST.");
?>
