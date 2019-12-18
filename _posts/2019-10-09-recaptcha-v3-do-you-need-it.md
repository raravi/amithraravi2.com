---
layout: article
title: "reCaptcha v3: Do You Need It?"
author: amith_raravi
excerpt: "For greater control over bots/spam handling, use reCaptcha v3!"
date: 2019-10-09 16:06:00 +0530
modified:
categories: [articles, tech]
image: images/recaptcha.jpg
teaser: recaptcha-400x250.jpg
---

Google introduced version 3 of its reCaptcha in late 2018, announcing the adaptive risk analysis spam handler for websites. And the question on everyone’s mind was: Should I upgrade from version 2 to version 3?

![image]({{ site.imagekiturl }}{{ site.images }}recaptcha.jpg)
<figcaption>Photo by <a href="https://unsplash.com/@paucasals">Pau Casals</a> on <a href="https://unsplash.com">Unsplash</a>.</figcaption>

I think that’s the wrong way to go about it. As it’s not an upgrade in the regular sense. Version 3 is a different way of doing spam protection, with the website owner having more control over deciding who they think is a spammer/bot and what to do about it. That’s what version 3 offers, the platform for deciding. The website owner will still have to implement the actual mechanism of handling spam.

If you want a fine-tuned way of looking at spam, study the realtime data and continuously calibrate your spam meter, then version 3 is what you want.

## A Simple Setup

Implementing reCaptcha version 3 is quite easy. Just follow the below steps:
Go to the [reCaptcha](https://www.google.com/recaptcha/intro/v3.html) website, and get your site registered. You will get a Public/Private key.

Add the below line to your HTML file (frontend) where you need reCaptcha. Replace **YOUR-PUBLIC-KEY** with your public key from the previous step.
```html
<script src="https://www.google.com/recaptcha/api.js?render=YOUR-PUBLIC-KEY"></script>
```

If you are running reCaptcha against a form, then create a new hidden input in the form:
```html
<input type="hidden" id="comment-token" name="token" value="" />
```

Now, for a bit of javascript magic. You will usually have a `submit` function to send the form to the server, to be processed by a script. In the submit function, you have to run `grecaptcha.execute` to get the token from Google. Again, replace **YOUR-PUBLIC-KEY** with your public key. Once you get the token, it has to be sent to your server along with the form data. I’ll explain why in the next step.
```js
$("#comment-form").submit(function() {
    event.preventDefault();
    grecaptcha.ready(function() {
      grecaptcha
        .execute("YOUR-PUBLIC-KEY", {action: "addcomment"})
        .then(function(token) {
          $("#comment-token").attr("value", token);
          $.ajax({
            type: $("#comment-form").attr("method"),
            url: $("#comment-form").attr("action"),
            data: $("#comment-form").serialize(),
            contentType: "application/x-www-form-urlencoded"
          })
            .done(function() {
              $("#comment-form-submit").html("Submitted");
            })
            .fail(function(/*err*/) {
              $("#comment-form-submit").html("Submit Comment");
            });
        });
    });

    return false;
  });
```

Don’t get overwhelmed by the above piece of code. It’s easy to understand once you break it down:

1. The `submit` function is called once the user hits the send/submit button on the form.
2. We need to call `grecaptcha.execute` to get the token.
3. Save the token in a hidden input field on the form (it will be picked up automatically to be sent to the server!)
4. I send the form data (with the token) using an Ajax call. Any other way will also work, the form data will get sent.

Now that you have received the form data on your server, the token sent has to be verified. This is done by sending the token to Google and checking the response (I have used a PHP script here). Don't forget to replace **YOUR-PRIVATE-KEY** with your private key.
```php
        $token        = $_POST['token'];
        $secretKey    = 'YOUR-PRIVATE-KEY';

        // post request to server
        $recaptchaurl =  'https://www.google.com/recaptcha/api/siteverify?secret=' . urlencode($secretKey) . '&response=' . urlencode($token);
        $response     = file_get_contents($recaptchaurl);
        $responseKeys = json_decode($response,true);
        // end post request
```

The response received will be in JSON format:
```js
{
  "success": true|false,      // whether this request was a valid reCAPTCHA token for your site
  "score": number,            // the score for this request (0.0 - 1.0)
  "action": string,           // the action name for this request (important to verify)
  "challenge_ts": timestamp,  // timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
  "hostname": string,         // the hostname of the site where the reCAPTCHA was solved
  "error-codes": [...]        // optional
}
```
<figcaption>From the <a href="https://developers.google.com/recaptcha/docs/v3">Google reCaptcha v3</a> docs.</figcaption>

Once you have the response, there are several things to evaluate.

* The `success` parameter will tell you if the reCaptcha token is valid.
* The `score` will tell you if it’s considered spam(0.0) or human(1.0). The `score` will not be `0.0` or `1.0` but in the range of `0.0 - 1.0` to indicate the probability of spam. Values towards `0.0` have a higher probability of being spam, while values towards `1.0` are considered more genuine.
* The `action` parameter will tell you the action against which this request was performed. Always verify this to match with the action on your frontend where the token got generated!
* The `hostname` will tell you where the request originated, this should be from your web server!
* In case of errors, the `error-codes` will give you the relevant codes to check.

The above parameters are meant to help you decide on the best course of action to take for each form submission. You can

* Set a threshold value for letting the user in.
* Send the riskier ones to a manual submission process.
* Ask the user to more authentication (two-factor, mobile, email, etc).
* Use the reCaptcha score as input for you machine-learning algorithms to determine how to handle it.

The [Google Admin Console](https://www.google.com/recaptcha/admin) on the reCaptcha v3 site gives you great insights on the kind of traffic hitting your site, and which parts are being targeted by bots. Use this to better calibrate spam protection in realtime!

## Control vs Convenience

The reason to use reCaptcha v3 will be about how much control of the decision-making process you want to take up. Do you need to handle it on your own? Or are you okay with Google deciding for you? And how much money and resources are you willing to spend on handling the process yourself?

Here, I’ve left out another key piece of the puzzle. And that is how much spam/bots hit your site, and how sophisticated are they?! For extremely determined attacks, you will need a greater level of control of the decision-making process.

So, make your choice by weighing all these!

---

The introductory blog post from the [Google Security Blog](https://security.googleblog.com/2018/10/introducing-recaptcha-v3-new-way-to.html) had this simple overview of the reCaptcha v3, and I think it pretty much says it all:

> “reCAPTCHA v3 runs adaptive risk analysis in the background to alert you of suspicious traffic while letting your human users enjoy a frictionless experience on your site.”
