var sessionTimeInSeconds; 
var breakTimeInSeconds; 
var numSessions; 

function getTime() {
    //Retrieving session time values from html input
    var sessionHrs = document.getElementById("sessionHours").value; 
    var sessionMins = document.getElementById("sessionMins").value; 
    var sessionSecs = document.getElementById("sessionSecs").value; 

    //Retrieving break time values from html input
    var breakHrs = document.getElementById("breakHours").value; 
    var breakMins = document.getElementById("breakMins").value; 
    var breakSecs = document.getElementById("breakSecs").value; 
     
    sessionTimeInSeconds = (sessionHrs * 3600) + (sessionMins * 60) + sessionSecs; 
    console.log(sessionTimeInSeconds);

    breakTimeInSeconds = (breakHrs * 3600) + (breakMins * 60) + breakSecs; 
    console.log(breakTimeInSeconds); 

    numSessions = document.getElementById("numSessions").value; 
    console.log(numSessions); 

    startSession();
}


function startSession() {
 
    var s1 = sessionTimeInSeconds; 
    var st = setInterval(function() {
        console.log(s1);
         
        if (s1 >= 1) {
            s1 -= 1;
        }
        else {
            console.log("NS: " + numSessions);
            if (numSessions >= 1) 
                numSessions -= 1;

            if (numSessions === 0) { 
                document.getElementById("status").innerHTML = "YOU MADE IT!!!";
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
