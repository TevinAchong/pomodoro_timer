//REFACTORING NEEDS TO BE DONE


var sessionTimeInSeconds; 
var breakTimeInSeconds; 
var numSessions; 


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
    if (sessionHrs < 0 || sessionHrs === "") {
        sessionHrs = document.getElementById("sessionHours").value;
        alert("Session Hours must be greater than 0");
    }
    else
        hCon = true; 
        
    var sessionMins = document.getElementById("sessionMins").value; 
    if (sessionMins < 0 || sessionMins > 59 || sessionMins === "") {
        alert("Session Minutes must be greater than 0 and less than 59 (use hours if greater than 60)"); 
        sessionMins = document.getElementById("sessionMins").value;
    }
    else    
        mCon = true; 
    
    
    var sessionSecs = document.getElementById("sessionSecs").value;
    if (sessionSecs < 0 || sessionSecs > 59 || sessionSecs === "") {
        alert("Session Seconds must be greater than 0 and less than 59 (use minutes if greater than 60)"); 
        sessionSecs = document.getElementById("sessionSecs").value;
    } 
    else
        sCon = true; 

    //Retrieving break time values from html input
    var breakHrs = document.getElementById("breakHours").value;
    if (breakHrs > 59 || breakHrs === "") {
        alert("Break Hours must be greater than 0"); 
        breakHrs = document.getElementById("breakHours").value;
    } 
    else
        bhCon = true; 
    

    var breakMins = document.getElementById("breakMins").value; 
    if (breakMins < 0 || breakMins > 59) {
        alert("Break Minutes must be greater than 0 and less than 59 (use minutes if greater than 60)"); 
        breakMins = document.getElementById("breakMins").value;
    } 
    else
        bmCon = true; 


    var breakSecs = document.getElementById("breakSecs").value; 
    if (breakSecs < 0 || breakSecs > 59 || breakSecs === "") {
        alert("Break Seconds must be greater than 0 and less than 59 (use minutes if greater than 60)"); 
        breakSecs = document.getElementById("breakSecs").value;
    } 
    else
        bsCon = true; 
     
    sessionTimeInSeconds = parseInt((sessionHrs * 3600)) + parseInt((sessionMins * 60)) + parseInt(sessionSecs); 
    console.log(sessionTimeInSeconds);

    breakTimeInSeconds = parseInt((breakHrs * 3600)) + parseInt((breakMins * 60)) + parseInt(breakSecs); 
    console.log(breakTimeInSeconds); 

    numSessions = document.getElementById("numSessions").value;
    if (numSessions === "" || numSessions < 1) {
        alert("Number of sessions must be greater than 0");
        numSessions = document.getElementById("numSessions").value; 
    }
    else   
        sesCon = true;  
    console.log(numSessions); 

    if (hCon && mCon && sCon && bhCon && bhCon && bsCon && sesCon)
        startSession();
}


function startSession() {
    
    document.getElementById("start_button").style.display = "none"; 

    document.getElementById("pause_button").style.display = "inline";  
    
    

    var s1 = sessionTimeInSeconds; 
    var st = setInterval(function() {
        console.log(s1);
        
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
            
            console.log("NS: " + numSessions);
            if (numSessions >= 1) 
                numSessions -= 1;

            document.getElementById("session").innerHTML = "Sessions Remaining: " + numSessions;

            if (numSessions === 0) { 
                document.getElementById("status").innerHTML = "YOU MADE IT!!!";
                document.getElementById("start_button").style.display = "inline"; 
                var finish_horn = new Audio('finish_horn.mp3');
                finish_horn.play();
                clearInterval(st);
                return; 
            }
            else {
                clearInterval(st); 
                document.getElementById("status").innerHTML = "Time to Take a Break!!!"; 
                var ding = new Audio('ding.mp3');
                ding.play();
                startBreak();   
            }
            
        }
    }, 1000); 

}

function startBreak() {
    var b1 = breakTimeInSeconds;
    var bt = setInterval(function() {
        console.log(b1);
        if (b1 >= 1) {
            b1 -= 1;
            document.getElementById("time").innerHTML = b1.toString().toHHMMSS();
        }
        else {
            clearInterval(bt);
            document.getElementById("status").innerHTML = "Time to Start Back!!!";
            var start_horn = new Audio('start_horn.mp3');
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
    document.getElementById("pause_button").style.display = "none"; 
}
