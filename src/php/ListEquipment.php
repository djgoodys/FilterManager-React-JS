<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');
include 'phpfunctions.php';
$Action = "";
$BackUpFolder="";
//print_r($_GET);
if(isset($_GET["action"])){$Action = $_GET["action"];}
if(isset($_POST["action"])){$Action = $_POST["action"];}
if(!isset($_COOKIE["backup_folder"])) {
   // echo "no back up folder";
}
else if(isset($_GET["backup_folder"])){
   $BackUpFolder = $_GET["backup_folder"];
}

if(isset($_GET["search_input"])){
   //echo "searchinput=". $_GET["search_input"];
}

//print_r($_GET);

if(isset($_GET["backup_folder"]))
   {
      $jsonString = file_get_contents('../src/sites/' . $_GET["backup_folder"] . '/data.json');
      $BackUpFolder = $_GET["backup_folder"];
   }
   else{
      $jsonString = file_get_contents('../src/sites/' . $_COOKIE["backup_folder"] . '/data.json');
      $BackUpFolder = $_COOKIE["backup_folder"];
   }


   $data = json_decode($jsonString, true);

//SEARCH QUERY
if(isset($_GET["search_input"])){
   $equipment = [];
   foreach ($data["equipment"] as $obj)
   {
      if (strcmp(strtolower($obj["unit_name"]), strtolower($_GET["search_input"])) == 0)
      {
         //echo strtolower($obj["unit_name"]). "=" . strtolower($_GET["search_input"])."    ";
         $equipmentArray[] = $obj;
      }
   }

}

if(strcmp($Action, "overdue") == 0){
   $today = date("Y-m-d");
   $equipment = [];
   foreach ($data["equipment"] as $obj) 
   {
      $filterDueDateObject = new DateTime($obj["filters_due"]);
      $todayObject = new DateTime($today);
      if ($filterDueDateObject < $todayObject) 
      {
         $equipmentArray[] = $obj;
      }
   }
}
   //NO SEARCH QUERY
  
   if(strcmp($Action, "getallunits") == 0){
   $equipmentArray = [];
   foreach ($data['equipment'] as $object) {
      $equipmentArray[] = $object;
   }
}

//--------BY DATE-------------------
if(isset($_GET["sort"])){
switch ($_GET["sort"]) 
{
  case "OVERDUE":
   $today = date("Y-m-d");
   $equipment = [];
   foreach ($data["equipment"] as $obj) 
   {
      $filterDueDateObject = new DateTime($obj["filters_due"]);
      $todayObject = new DateTime($today);
      if ($filterDueDateObject < $todayObject) 
      {
         $equipment[] = $obj;
      }
   }
   break;

    case "NORMAL":
   {
    $equipmentArray = $data['equipment'];
   }
   break;

   case "SELECT":
   {
   //echo "the lastquery=".strpos($LastQuery,"NORMAL")."<br>";
    $equipment = $data['equipment'];
    //print_r($equipment);
   }
   break;

   case "ASC":
   {
      usort($data['equipment'], function($a, $b) 
         {
      return strtotime($a['filters_due']) - strtotime($b['filters_due']);
         });
         $equipmentArray = $data["equipment"]; 
   }
   break;

   case "DESC":
   {
      usort($data['equipment'], function($a, $b) 
      {
         return strtotime($b['filters_due']) - strtotime($a['filters_due']);
      });
      $equipmentArray = $data["equipment"];
      break;
   }

   case "today":
   {
      $today = date('Y-m-d');
      //echo "today=".$today;
      $equipmentArray = [];
         foreach($data["equipment"] as $obj)
            {
               //echo $obj["filters_due"] ."==". $today."<br>";
            if($obj["filters_due"] == $today)
               {
                  $equipmentArray[]=$obj;
                  if(count($equipmentArray) <= 0){echo "nothing here";}
               }
            }
   }
   //print_r($equipment);
   break;
}
}

if($Action == "getallusers"){
//CREATE ARRAY OF ALL USERS 
$jsonString = file_get_contents('../src/table_users.json');
$data = json_decode($jsonString, true);
$equipmentArray = [];
if(is_array($data)){

foreach ($data as $obj) {
   if($obj["backup_folder"] == $BackUpFolder){
      $equipmentArray[] = $obj["user_name"];
}
}
}
}
//action=assigned_too&assigned_too="+ user + "&unit_id="+unit_id
if($Action == "assigned_too"){
   $equipmentArray = [];
   foreach ($data["equipment"] as &$obj)
   {
      if ($obj["_id"] == $_GET["unit_id"]) {
         $obj["assigned_to"] = $_GET["assigned_too"];
         ;
         $equipmentArray[] = "'". $obj["_id"] . "':'updated',' _id:':'". $_GET["unit_id"]."','new user':'".$_GET["assigned_too"]."'";
      }
   }
   unset($obj); 
    $newJsonString = json_encode($data, JSON_PRETTY_PRINT);
    file_put_contents('../src/sites/' . $_COOKIE["backup_folder"] . '/data.json', $newJsonString);   
}

if($Action == "getfiltertypes"){
   $equipmentArray[] = $data["filter_types"];
  }


try {
    if ($Action == "filtersdone") {
        $equipmentArray = [];
        if(isset($_GET['rotation'])){$Rotation = $_GET['rotation'];}
        $effectiveDate = getNextDueDate($Rotation);

        foreach ($data["equipment"] as &$obj) {
            if ($obj["_id"] == $_GET["unit_id"]) {
                $obj["assigned_to"] = "";
                $obj["filters_due"] = $effectiveDate;
                $obj["filter_type"] = $_GET["filter_type"];
                $obj["filters_last_changed"] = date('Y-m-d') . "[dj]";
                $equipmentArray[] = "filters_due: " . $effectiveDate ;
            }
        }
        unset($obj);
        $newJsonString = json_encode($data, JSON_PRETTY_PRINT);
        if ($newJsonString === false) {
            throw new Exception('JSON encoding error: ' . json_last_error_msg());
        }
        $result = file_put_contents('../src/sites/' . $BackUpFolder . '/data.json', $newJsonString);
        if ($result === false) {
            throw new Exception('Failed to write to file');
        }
    }
} catch (Exception $e) {
    echo 'Error: ' . $e->getMessage();
}

if($Action == "updatenotes")
{
   $unit_id=$_GET["unit_id"];
   $notes=$_GET["notes"];
   try 
      {
         $equipmentArray = [];
         foreach ($data["equipment"] as &$obj)
            {
               if ($obj["_id"] == $unit_id) 
                  {
                     $obj["notes"] = $notes;
                     $equipmentArray[] = "'notes':'updated'" ;
                  }
            }
            unset($obj);
            $newJsonString = json_encode($data, JSON_PRETTY_PRINT);
            if ($newJsonString === false) 
               {
                  throw new Exception('JSON encoding error: ' . json_last_error_msg());
               }
             $result = file_put_contents('../src/sites/' . $BackUpFolder . '/data.json', $newJsonString);
            if ($result === false) 
               {
                  throw new Exception('Failed to write to file');
               }
         }
       catch (Exception $e) {
      echo 'Error: ' . $e->getMessage();
      }
}
echo json_encode($equipmentArray);

