
<?php
header("Access-Control-Allow-Origin: *");
function numberOfUsers($filename) {
   // Read the JSON file
   $json = file_get_contents($filename);

   // Check if the file was read successfully
   if ($json === false) {
       die('Error reading the JSON file');
   }

   // Decode the JSON file
   $array = json_decode($json, true);

   // Check if the JSON was decoded successfully
   if ($array === null) {
       die('Error decoding the JSON file');
   }

   // Return the count of objects in the array
   return count($array);
}

if($_GET['action'] == "countusers"){
$filename = '..\src\table_users.json';
echo numberOfUsers($filename);
}


