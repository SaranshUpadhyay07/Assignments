var start = new Date().getTime();
        function move(){
            var left;
            var top;
            left = Math.random()*300;
            top = Math.random()*300;
            document.getElementById("tester").style.left = left+"px"; ;
            document.getElementById("tester").style.top = top +"px"; ;
            document.getElementById("tester").style.display = "block";
            start = new Date().getTime();
        }
        move();
        document.getElementById("tester").onclick = function(){
            document.getElementById("tester").style.display = "none";
            var end = new Date().getTime();
            var timeTake = (end - start)/1000;
            if(timeTake < 0.5){
                alert("You are too fast");
            }
            else{
                alert("Your reaction time is " + timeTake.toFixed(2) + " seconds");
            }
            move();
        }
        
