//REFACTORING NEEDS TO BE DONE


var sessionTimeInSeconds; 
var breakTimeInSeconds; 
var numSessions; 
var favicon = new Image("favicon.png");



String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
}


function getTime() {
    //Retrieving session time values from html input
    var hCon = false, mCon = false, sCon = false; 
    var bhCon = false, bmCon = false, bsCon = false;
    var sesCon = false;  

    var sessionHrs = document.getElementById("sessionHours").value;
    if (sessionHrs < 0) {
        alert("Session Hours must be at least 0");
        sessionHrs = document.getElementById("sessionHours").value;
    }
    else if (sessionHrs === "") {
        document.getElementById("sessionHours").value = 0; 
        sessionHrs = 0; 
        hCon = true; 
    }
    else
        hCon = true; 
        

    var sessionMins = document.getElementById("sessionMins").value; 
    if (sessionMins < 0 || sessionMins > 59) {
        alert("Session Minutes must be at least 0 and less than 60 (use hours if greater than 60)"); 
        sessionMins = document.getElementById("sessionMins").value;
    }
    else if (sessionMins === "") {
        document.getElementById("sessionMins").value = 0; 
        sessionMins = 0; 
        mCon = true; 
    }
    else    
        mCon = true; 
    
    
    var sessionSecs = document.getElementById("sessionSecs").value;
    if (sessionSecs < 0 || sessionSecs > 59) {
        alert("Session Seconds must be at least 0 and less than 60 (use minutes if greater than 60)"); 
        sessionSecs = document.getElementById("sessionSecs").value;
    } 
    else if (sessionSecs === "") {
        document.getElementById("sessionSecs").value = 0; 
        sessionSecs = 0; 
        sCon = true; 
    }
    else
        sCon = true; 

    //Retrieving break time values from html input
    var breakHrs = document.getElementById("breakHours").value;
    if (breakHrs > 59) {
        alert("Break Hours must be at least than 0"); 
        breakHrs = document.getElementById("breakHours").value;
    }
    else if (breakHrs === "") {
        document.getElementById("breakHours").value = 0; 
        breakHrs = 0; 
        bhCon = true; 
    }
    else
        bhCon = true; 
    

    var breakMins = document.getElementById("breakMins").value; 
    if (breakMins < 0 || breakMins > 59) {
        alert("Break Minutes must be at least 0 and less than 60 (use minutes if greater than 60)"); 
        breakMins = document.getElementById("breakMins").value;
    } 
    else if (breakMins === "") {
        document.getElementById("breakMins").value = 0; 
        breakMins = 0; 
        bmCon = true; 
    }
    else
        bmCon = true; 


    var breakSecs = document.getElementById("breakSecs").value; 
    if (breakSecs < 0 || breakSecs > 59) {
        alert("Break Seconds must be at least 0 and less than 60 (use minutes if greater than 60)"); 
        breakSecs = document.getElementById("breakSecs").value;
    } 
    else if (breakSecs === "") {
        document.getElementById("breakSecs").value = 0; 
        breakSecs = 0; 
        bsCon = true; 
    }
    else
        bsCon = true; 
     
    sessionTimeInSeconds = parseInt((sessionHrs * 3600)) + parseInt((sessionMins * 60)) + parseInt(sessionSecs); 
    

    breakTimeInSeconds = parseInt((breakHrs * 3600)) + parseInt((breakMins * 60)) + parseInt(breakSecs); 
     

    numSessions = document.getElementById("numSessions").value;
    if (numSessions < 1) {
        alert("Number of sessions must be at least 1");
        numSessions = document.getElementById("numSessions").value; 
    }
    else if (numSessions === "") {
        document.getElementById("numSessions").value = 0; 
        numSessions = 0; 
        sesCon = true; 
    }
    else   
        sesCon = true;  
     

    if (hCon && mCon && sCon && bhCon && bhCon && bsCon && sesCon)
        startSession();
}


var finish_horn = new Audio('finish_horn.mp3');
var ding = new Audio('ding.mp3');
var start_horn = new Audio('start_horn.mp3');

function startSession() {
    
    document.getElementById("start_button").style.display = "none"; 

    document.getElementById("pause_button").style.display = "inline";  
    
    

    var s1 = sessionTimeInSeconds; 
    var st = setInterval(function() {
        
        
        document.getElementById("pause_button").onclick = function() {
            alert("Click OK To Unpause"); 
        }

        document.getElementById("reset_button").onclick = function() {
            var reset = confirm("Are you sure you want to reset the timer?"); 
            if (reset) {
                resetForm(); 
                clearInterval(st); 
                document.getElementById("start_button").style.display = "inline";
                return;
            }
        }

        if (s1 >= 1) {
            document.getElementById("session").innerHTML = "Sessions Remaining: " + numSessions;
            s1 -= 1;
            document.getElementById("time").innerHTML = s1.toString().toHHMMSS();
        }
        else {
            
            
            if (numSessions >= 1) 
                numSessions -= 1;

            document.getElementById("session").innerHTML = "Sessions Remaining: " + numSessions;

            if (numSessions === 0) { 
                if (!isMobileDevice())
                    desktopNotification("You're Done!!");
                else
                    alert("Mobile Device!");
                document.getElementById("status").innerHTML = "YOU MADE IT!!!";
                document.getElementById("pause_button").style.display = "none";
                document.getElementById("start_button").style.display = "inline";
                finish_horn.play();
                clearInterval(st);
                return; 
            }
            else {
                clearInterval(st); 
                if (!isMobileDevice())
                    desktopNotification("Time To Take a Break!");
                else
                    alert("Mobile Device");
                document.getElementById("status").innerHTML = "Time to Take a Break!!!"; 
                ding.play();
                startBreak();   
            }
            
        }
    }, 1000); 

}

function startBreak() {
    var b1 = breakTimeInSeconds;
    var bt = setInterval(function() {
        
        document.getElementById("pause_button").onclick = function() {
            alert("Click OK To Unpause"); 
        }

        document.getElementById("reset_button").onclick = function() {
            var reset = confirm("Are you sure you want to reset the timer?"); 
            if (reset) {
                resetForm(); 
                clearInterval(bt); 
                document.getElementById("start_button").style.display = "inline";
                return;
            }
        }

        if (b1 >= 1) {
            b1 -= 1;
            document.getElementById("time").innerHTML = b1.toString().toHHMMSS();
        }
        else {
            clearInterval(bt);
            if (!isMobileDevice())
                desktopNotification("Time To Resume Productivity!");
            else    
                alert("Mobile Device");
            document.getElementById("status").innerHTML = "Time to Start Back!!!";
            start_horn.play();
            startSession();    
        }
    }, 1000); 
}

function resetForm() {
    document.getElementById("sessionHours").value = "0";
    document.getElementById("sessionMins").value = "25";
    document.getElementById("sessionSecs").value = "0";
    document.getElementById("breakHours").value = "0";
    document.getElementById("breakMins").value = "5";
    document.getElementById("breakSecs").value = "0";
    document.getElementById("numSessions").value = "2";
    document.getElementById("time").innerHTML = ""; 
    document.getElementById("session").innerHTML = "";
    document.getElementById("status").innerHTML = "";
    document.getElementById("pause_button").style.display = "none"; 
}

var wnCount = 1; 
var white_noise = new Audio('white_noise.mp3');
white_noise.loop = true;

function toggleWhiteNoise() {
     
    if (wnCount % 2 === 1) {
        white_noise.play(); 
        console.log("Audio Playing"); 
    }
    else {
        white_noise.pause(); 
        console.log("Paused Audio"); 
    }
    wnCount += 1; 

}

//Notifications 
if ("Notification" in window) {
    console.log("Congrats! You support Notifications"); 
    requestDesktopNotificationPermission();
}

function requestDesktopNotificationPermission() {
    if (Notification && Notification.permission === "default") {
        Notification.requestPermission(function(permission) {
            if (!("permission" in Notification)) {
                Notification.permission = permission; 
            }
        });
    }
}

function desktopNotification(message) {
    if (Notification.permission === "granted") { 
        this.sendDesktopNotification(message);
    }
}

function sendDesktopNotification (message) {
    
    console.log("Nope");
    let notification = new Notification("Pomodoro Timer", {
        icon : "favicon.png", 
        body : message, 
        tag : "Notification"
    });

    notification.onclick = function() {
        parent.focus(); 
        window.focus(); 
        this.close(); 
    }; 
    setTimeout(notification.close.bind(notification), 5000);
}

function isMobileDevice() {
    return(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) 

};
  



