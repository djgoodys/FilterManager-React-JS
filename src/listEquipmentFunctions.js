
export function toggleNavigation(table)
{

switch(table) { 
  case "tblNavigation":
    if(document.getElementById('tblNavigation') != null){document.getElementById('tblNavigation').style.display = "inline-block";}

    if(document.getElementById('tblTools') != null){document.getElementById('tblTools').style.display = "none";}

    if(document.getElementById('menuNavigation') != null){document.getElementById('menuNavigation').style.display = "inline-block";}
    break;
  case "tblTools":
    if(document.getElementById('tblNavigation') != null){document.getElementById('tblNavigation').style.display = "none";}

    if(document.getElementById('tblTools') != null){document.getElementById('tblTools').style.display = "inline-block";}

    if(document.getElementById('menuTools') != null){document.getElementById('menuTools').style.display = "inline-block";}
    break;
  }
}

export function resetElements(element){
    isMobileDevice();
       switch(element){
          case "ckoverdue":
             if(document.getElementById("divCkLate").className == "divCkLate-red")
              {
                document.getElementById("myInput").value = "";
              }
    
             break;
    
          case "bydate":
            var myvalue;
             var Selected = document.getElementById("txtByDate").value;
             if(Selected == "today"){myvalue = "&nbsp;&nbsp;Today&nbsp;&nbsp;";}
             if(Selected == "oldest"){myvalue = "&nbsp;&nbsp;Oldest to Newest&nbsp;&nbsp;";}
             if(Selected == "newest"){myvalue = "&nbsp;&nbsp;Newest to Oldest&nbsp;&nbsp;";}
             if(Selected == "off")
                {
                    document.getElementById("txtByDate").innerHTML="&nbsp;&nbsp;Sort by...&nbsp;&nbsp;";
                }
              document.getElementById("divCkLate").className = "divCkLate-black"
              document.getElementById("myInput").value = "";
            break;
             
          case "search":
             if(document.getElementById("myInput").value != "")
              {
    
              }
              break;
       }
    }

    export function isMobileDevice()
    {
      const userAgent = navigator.userAgent.toLowerCase();
      var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      return isMobile;
    }

    export function setLastQuery(element)
    {
        var SearchWords;
       let exdate = new Date(Date.now() + 86400e3);
       exdate = exdate.toUTCString();
       var Selected = document.getElementById("txtByDate").value;
       setCookie("cookie_bydate="+Selected);
    
       switch(element) 
        {
          case "overdue":
          var cklate = document.getElementById("divCkLate");
          if(document.getElementById("divCkLate").className =="divCkLate-red")
            {
              setCookie("cookie_lastquery=OVERDUE"); 
              setCookie("cookie_ckoverdue=true");
            }
            else
            {
            setJavaCookie("cookie_lastquery", "SELECT", 1); 
            deletecookie("cookie_ckoverdue");
            }
            // parent.document.getElementById("iframe2").src="ListEquipment.php";
            break;
    
            case "bydate":
            var text = document.getElementById('txtByDate').value;
            var currentdate = new Date();
            var date = currentdate.getDay() + "-" + currentdate.getMonth() + "-" + currentdate.getFullYear();
            var sql="";
            if(text=="newest")
              {
                sql="DESC";
              }
            if(text=="oldest")
              {
                sql="ASC";
              }
            if(text=="today")
              {
                sql="today";
              }
            if(text=="normal")
              {
                sql="NORMAL";
              }
            console.log("text="+ text+" cookie_lastquery="+sql+"; expires="+exdate+"; path=/");
            setCookie("cookie_lastquery="+sql);
            // parent.document.getElementById("iframe2").src="ListEquipment.php";
            break;
    
            case "search":      
            SearchWords=document.getElementById("myInput").value.trim();
            setCookie("SearchWords="+SearchWords);
            if(SearchWords.length > 0)
              {
                sql= "SELECT  _id,unit_name,location,area_served,filter_size,filters_due,filter_type,belts,notes,filter_rotation,filters_last_changed, assigned_to, image FROM equipment WHERE location LIKE '%"+SearchWords+"%' OR unit_name LIKE '%"+SearchWords+"%' OR area_served LIKE '%"+SearchWords+"%' OR filter_size LIKE '%"+SearchWords+"%' OR notes LIKE '%"+SearchWords+"%' OR filters_due LIKE '%"+SearchWords+"%' OR belts LIKE '%"+SearchWords+"%' OR assigned_to LIKE '%"+SearchWords+"%' OR filter_type LIKE '%"+SearchWords+"%' OR filters_last_changed LIKE '%"+SearchWords+"%'";
                let encoded = encodeURIComponent(sql);
                setCookie("cookie_lastquery="+encoded);
               
                // parent.document.getElementById("iframe2").src="ListEquipment.php";
              }
          }
    }

    export function setCookie(cookie_string){
        const d = new Date();
        d.setTime(d.getTime() + (1*24*60*60*1000));
        let expires = "expires="+ d.toUTCString();
        document.cookie = cookie_string + ";" + expires + ";path=/";
      }

      export function setJavaCookie(name,value,days) {
        if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
        }
        else var expires = "";
        document.cookie = name+"="+value+expires+"; path=/";
       }
       
       export function deletecookie(cname){
        document.cookie = cname+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        document.cookie = cname+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC;"
     }

     export function ckifloggedin($gotoLocation){
        var username = getCookie("cookie_username");
         if($gotoLocation == "nowhere" || $gotoLocation == "")
                 {
                 window.parent.document.getElementById('iframe2').src = "start.php";
                 }
         if (username.length > 0)
           {
             window.parent.document.getElementById('iframe2').src = $gotoLocation;
           }
           else
           {
             logout();
           }
     }

     export function getCookie(cname) {
        let name = cname + "=";
       let decodedCookie = decodeURIComponent(document.cookie);
       let ca = decodedCookie.split(';');
       for(let i = 0; i <ca.length; i++) {
         let c = ca[i];
         while (c.charAt(0) == ' ') {
           c = c.substring(1);
         }
         if (c.indexOf(name) == 0) {
           return c.substring(name.length, c.length);
         }
       }
       return "";
      }
      
      export function openNav() {
        // document.getElementById("myNav").style.width = "100%";
      }
      
      export function closeNav() {
        // document.getElementById("myNav").style.width = "0%";
      }

      export function logout(){
        deletecookie("cookie_username");
        // document.getElementById('tblNavigation').style.display = 'none';
        // document.getElementById('tblTools').style.display = 'none';
        // document.getElementById('txtUserName').value= "";
        // parent.document.getElementById('iframe2').src  = "start.php";
        // parent.document.getElementById('iframe1').src = "<?php echo $_SERVER
        // ['SCRIPT_NAME'] ?>?action=logout'>";
  
     }

     export function ckOverLay(){
        if(isMobileDevice() == true){
          document.getElementById("divOverLayContent").className = "overlay-mobile";
          }
        }