
export function setJavaCookie(name,value,days) {
    if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
   }

export function isMobileDevice()
{
  const userAgent = navigator.userAgent.toLowerCase();
  var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  return isMobile;
}
export function adjustIframe(xframe, xtop, xheight) 
  {
    const parentWindow = window.parent;
    parentWindow.postMessage({ action: 'resize', id: xframe, height: xheight, top: xtop}, "*");
  } 

export function ckifloggedin(gotoLocation){
    var username = getCookie("cookie_username");
     if(gotoLocation == "nowhere" || gotoLocation == "")
             {
             window.parent.document.getElementById('iframe2').src = "start.php";
             }
     if (username.length > 0)
       {
         window.parent.document.getElementById('iframe2').src = gotoLocation;
       }
       else
       {
        //  logout();
       }
 }

export function addMenuButton() {
  const theCell = document.getElementById("tdMenu");
  //const image = document.createElement("img");
  const image = document.createElement("div");
   image.id ="menuNavigation"; 
   image.classList.add('menu');
   image.setAttribute("onclick", "toggleNavigation('tblTools');");
  //image.src = 'images/menu.png'; 
  theCell.appendChild(image);
}


export function changeImage(){
var divCkLate = document.getElementById("divCkLate");
//var imgCkLate = document.getElementById("imgCkLate");
var imgBorder = document.getElementById("divImgBorder");
var divfont = document.getElementById("divcklatefont");


  if (divCkLate.className==
"divCkLate-red") 
    {
      divCkLate.className="divCkLate-black";
    } 
      else 
    {
      divCkLate.className="divCkLate-red";
    }

resetElements('ckoverdue');
setLastQuery('overdue');
}


/* Open when someone clicks on the span element */
export function openNav() {
  document.getElementById("myNav").style.width = "100%";
}

/* Close when someone clicks on the "x" symbol inside the overlay */
export function closeNav() {
  document.getElementById("myNav").style.width = "0%";
  resetElements('bydate');
  document.getElementById('txtByDate').value='normal';document.getElementById('btnSortBy').innerHTML='Sort by ...';
  setLastQuery('bydate');
}

export function autocomplete(inp, arr) {
var currentFocus;
inp.addEventListener("input", function(e) 
{
    var a, b, i, val = this.value;
    closeAllLists();
    if (!val) 
        { 
            return false;
        }
    currentFocus = -1;
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    a.setAttribute("onclick", "if(document.getElementById('divCkLate').className=='divCkLate-red'){changeImage();};setLastQuery('search');isMobileDevice();");
    this.parentNode.appendChild(a);
    for (i = 0; i < arr.length; i++) 
        {
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) 
                {
                    adjustIframe("iframe1", "0", "800px");
                    b = document.createElement("DIV");
                    b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                    b.innerHTML += arr[i].substr(val.length);
                    b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                    b.addEventListener("click", function(e)
                          {
                        inp.value = this.getElementsByTagName("input")[0].value;
                        closeAllLists();
                        //setFrame2();
                        setLastQuery('search');
                        isMobileDevice();
                        });
                    a.appendChild(b);
                }
        }
  });
  inp.addEventListener("focusout", function(e)
  {
    adjustIframe("iframe1", "0", "125px");
  });

  inp.addEventListener("keydown",  function(e) {                                
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        currentFocus++;
        addActive(x);
      } else if (e.keyCode == 38) { //up
        currentFocus--;
        addActive(x);
      } else if (e.keyCode == 13) {
        e.preventDefault();
        if (currentFocus > -1) {
          if (x) x[currentFocus].click();
        }
      }
  });

  function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    x[currentFocus].classList.add("autocomplete-active");
  }
  
  function removeActive(x) {
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
      x[i].parentNode.removeChild(x[i]);
    }
  }
}

document.addEventListener("click", function (e) {
    closeAllLists(e.target);
var Top =getCookie('cookie_iframe2.top') 
    //window.parent.document.getElementById('iframe1').style.height = "124";
});
}


   export function enterKeyPressed(event) {
    alert("you pressed a key");
      if (event.keyCode == 13) {
         resetElements('search');
          setLastQuery('search');
         return true;
      } else {
         return false;
      }
   }

export function setLastQuery(element, txtByDate, divOverdue, myInput)
{
   let exdate = new Date(Date.now() + 86400e3);
   exdate = exdate.toUTCString();
   var Selected = txtByDate;
   setCookie("cookie_bydate="+Selected);

   switch(element) 
    {
      case "overdue":
      var cklate = divOverdue;
      if(divOverdue =="divCkLate-red")
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
        var text = txtByDate;
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
        var SearchWords = myInput;
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


export function resetElements(element, divOverdue, setMyInput){
isMobileDevice();
   switch(element){
      case "ckoverdue":
         if(divOverdue == "divOverChecked")
          {
            setMyInput("");
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
            //   innerHTML="&nbsp;&nbsp;Sort by...&nbsp;&nbsp;";
            }
          divOverdue = "divCkLate-black"
          document.getElementById("myInput").value = "";
        break;
         
      case "search":
         if(document.getElementById("myInput").value != "")
          {

          }
          break;
   }
}

export function deletecookie(cname){
   document.cookie = cname+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
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

export function setCookie(cookie_string){
   const d = new Date();
               d.setTime(d.getTime() + (1*24*60*60*1000));
               let expires = "expires="+ d.toUTCString();
               document.cookie = cookie_string + ";" + expires + ";path=/";
}




export function DoOnLoadStuff()
  { 
    //LOGGED IN OR NOT
    var LoggedIn = false;
    if(document.getElementById("txtLoggedIn").value == "true"){
     LoggedIn = true;
    }

    var orient = "landscape";
    // if(screen.availHeight > screen.availWidth)
    //   {
    //     orient = "portrait";
    //   }
    
    if(LoggedIn == true)
      {
        setJavaCookie("cookie_username",  document.getElementById("UserName").value);
        // window.parent.document.getElementById("iframe2").src = "welcome1.php?backupfolder=<?php echo $_SESSION["backup_folder"] ?>";
      }

      var mTable;
      mTable=document.getElementById("tblNavigation");
      var mButtons = mTable.getElementsByTagName("button");
      if(isMobileDevice() == true)
          {
            document.getElementById("btnBugReport").classList.replace("myButton", "myButtonMobile");
            document.getElementById("btnHelp").classList.replace("myButton", "myButtonMobile");
            document.getElementById("btnLogOut").classList.replace("myButton", "myButtonMobile");
            document.getElementById("btnFilters").classList.replace("myButton", "myButtonMobile");
            mButtons = document.getElementById("trButtons").getElementsByClassName('myButton');
            for(let i=0; i < mButtons.length; i++)
              {
                mButtons[i].classList.replace("myButton", "myButtonMobile");
              }
          }

      if(LoggedIn == true && orient == "portrait" && isMobileDevice() == true)
        {
             console.log("orient = "+orient+" mobile = "+isMobileDevice()+ " logged in= "+LoggedIn);
            adjustIframe("iframe1", "0", "100px");
            adjustIframe("iframe2", "0", "2300px");
            //addMenuButton();
            document.getElementById("tblNavigation").style.display="table";
            if(document.getElementById("menuNavigation") != null){document.getElementById("menuNavigation").style.display="none";}
        }

        
      if(LoggedIn == true && isMobileDevice() == false)
        {
          console.log("isMobileDevice == false");
          document.getElementById("tblTools").style.display="inline-block";
        }

      if(LoggedIn == true && isMobileDevice() == true)
      {
        //addMenuButton("myTable", "menu.jpg");
        document.getElementById("tblNavigation").style.display="none";
        document.getElementById("btnApp").className="myButtonMobile";
        mButtons = document.getElementsByClassName('myButton');
        for(let i=0; i < mButtons.length; i++)
            {
              mButtons.item(i).style.fontSize="1em";
              mButtons.item(i).className="myButtonMobile";
            }
      }
     //PUT HERE SO WOULD HAPPEN ON BODY LOAD-SETS CKLATE CHECKBOX
    
     if (getCookie("cookie_ckoverdue") == "true")
     {
          //console.log("cookie ckoverdue="+getCookie("cookie_ckoverdue"));
         document.getElementById("ckoverdue").checked = true;
     }
     else
     {
          document.getElementById("ckoverdue").checked = false;
     }
     
      //PUTS LAST SEARCH WORDS IN SEARCH BOX and shows clear search X SO A RETURN TO WEB PAGE SHOWS WORDS
         document.getElementById("myInput").value = getCookie("SearchWords");
  }
