function displayTime(){
	var currentTime = new Date();
	var currentHour = currentTime.getHours();
	var currentMinute = currentTime.getMinutes();
	var currentSecond = currentTime.getSeconds();
    var currentMillisecond =  currentTime.getMilliseconds();
	var canvas = document.querySelector("#clock");
	var context = canvas.getContext("2d");
	var hourRadius = 200; //handling the clock radius. Handle canvas size accordingly
	var minuteRadius = 250;
	//defining TAU which is basically 2PI.
	Math.TAU = 2 * Math.PI;
	//ensure that clock is at the center of the canvas
	var clockX = canvas.width/2; 
	var clockY = canvas.height/2;
	//drawing the hour hand
	    
    function drawArm(radianDivision,armLength,lineWidth,strokeStyle){
    	var armRadians = (Math.TAU * radianDivision) - Math.TAU/4;
    	var targetX = clockX + Math.cos(armRadians) * armLength;
    	var targetY = clockY + Math.sin(armRadians) * armLength;
        var beginX = clockX - Math.cos(armRadians + Math.TAU) * 30;
        var beginY = clockY - Math.sin(armRadians + Math.TAU) * 30;
    	context.lineWidth = lineWidth;
    	context.strokeStyle = strokeStyle;
    	context.beginPath();
    	context.moveTo(beginX,beginY);
    	context.lineTo(targetX,targetY);
    	context.stroke();
    }
    //clear the canvas of any previous drawings of clock hands
    context.clearRect(0, 0, canvas.width, canvas.height);
    //draw the clock spokes
    createClock();
    //draw the second hand
    drawArm((currentSecond + (currentMillisecond / 1000))/(60),270,2,"#DD0000");
    //draw the minute hand
    var minute = currentMinute + (currentSecond/60);
    drawArm(minute/60,220,5,"#000000");
    //draw the hour hand
    var hour = currentHour + (currentMinute/60) + (currentSecond/3600);
    drawArm(hour/12,170,10,"#000000");
}


function createHourSpokes(lineWidth,startX,startY,targetX,targetY){
    var canvas = document.querySelector("#clock");
    var context = canvas.getContext("2d");
    context.lineWidth = lineWidth;
    context.strokeStyle = "#000000";
    context.beginPath();
    context.moveTo(startX,startY);
    context.lineTo(targetX,targetY);
    context.stroke();
}

function createClock(){
    var canvas = document.querySelector("#clock");
    //12 o clock spoke
    createHourSpokes(10,canvas.width/2,0,canvas.width/2,canvas.height/8);
    //3 o clock spoke
    createHourSpokes(10,(7*canvas.width)/8,canvas.height/2,canvas.width,canvas.height/2);
    //6 o clock spoke
    createHourSpokes(10,canvas.width/2,(7*canvas.height)/8,canvas.width/2,canvas.height);
    // 9 o clock spoke
    createHourSpokes(10,0,canvas.height/2,canvas.width/8,canvas.height/2);
}

function setAnalogClock(){
	setInterval(displayTime,10);
	displayTime();
}

function onClickReplaceWithChallengePage(){
    $('body').load("html/QuestionTemplate.html");
    // location.replace("html/QuestionTemplate.html");
}