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
                if (isMobileDevice() === false)
                    desktopNotification("You're Done!!");
                else
                    confirm("Mobile Device");
                document.getElementById("status").innerHTML = "YOU MADE IT!!!";
                document.getElementById("pause_button").style.display = "none";
                document.getElementById("start_button").style.display = "inline";
                finish_horn.play();
                clearInterval(st);
                return; 
            }
            else {
                clearInterval(st); 
                if (isMobileDevice() === false)
                    desktopNotification("Time To Take a Break!");
                else
                    confirm("Mobile Device");
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
            if (isMobileDevice() === false)
                desktopNotification("Time To Resume Productivity!");
            else    
                confirm("Mobile Device");
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
    return (typeof window.orientation !== 'undefined'); 
};
  



