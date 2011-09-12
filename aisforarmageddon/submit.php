<?php

function remove_headers($string) { 
  $headers = array(
    "/to\:/i",
    "/from\:/i",
    "/bcc\:/i",
    "/cc\:/i",
    "/Content\-Transfer\-Encoding\:/i",
    "/Content\-Type\:/i",
    "/Mime\-Version\:/i" 
  ); 
  return preg_replace($headers, '', $string); 
}

$redirectUrl = "http://www.aisforarmageddon.com/Thanks.htm";
$originalUrl = "http://www.aisforarmageddon.com/Prophets_6.html";
$name = remove_headers($_POST["name"]);
$rating = remove_headers($_POST["rating"]);
$worldEnd = remove_headers($_POST["end"]);

if (empty($name) || empty($rating)) {
	header("Location: $originalUrl");
}

// Email details
$to = "aisforarmageddon@gmail.com";
$subject = "My Doom Rating";
$message = <<<EOT

Hello, my name is $name.

I have been classed as a ... $rating.

I believe the world will end ... $worldEnd.

EOT;

$headers = "From: aisforarmageddon@gmail.com";

// Send message
mail($to, $subject, $message, $headers);

header("Location: $redirectUrl");

?>