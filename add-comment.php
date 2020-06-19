<?php
    $config = include('../config.php');
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

        $token      = $_POST['token'];
        $secretKey  = $config['secretKey'];

        // post request to server
        $recaptchaurl =  'https://www.google.com/recaptcha/api/siteverify?secret=' . urlencode($secretKey) . '&response=' . urlencode($token);
        $response = file_get_contents($recaptchaurl);
        $responseKeys = json_decode($response,true);
        // end post request

        //check if the test was done OK, if the action name is correct
        if ($responseKeys["success"] && $responseKeys["action"] == 'addcomment') {
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

          fclose($myfile);

          exit("OK");
        }
        else {
          exit("The only true wisdom is in knowing you know nothing.");
        }
    }
    else {
        exit("INVALID REQUEST.");
    }
?>
