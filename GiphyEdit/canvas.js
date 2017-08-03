canvas = document.querySelector("canvas");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	ctx = canvas.getContext('2d');

	console.log("running");

	//color pickers:

	var barCount = 20;
	var colorBar = [];

	window.addEventListener("resize",function(){
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		colorBar = [];
		createBars();
	})
	
	function bars(barX){
		this.barX = barX;
		this.timer = 0;
		this.update = function(){
			ctx.fillStyle = 'hsl('+Math.abs(Math.sin(this.timer) * 255)+', 40%, 50%)';
			ctx.fillRect(this.barX,0,canvas.width/barCount,canvas.height);
			this.timer += Math.random()*0.03;
		}
	}

	function createBars(){
		var barWidth = canvas.width/barCount;
		var barPosition = 0;
		for(var i = 0; i < barCount; i++){
			colorBar.push(new bars(barPosition));
			barPosition += barWidth;
		}
	}

	createBars();



	function animate(){

		ctx.clearRect(0,0,canvas.width,canvas.height);
		requestAnimationFrame(animate);
		for(var i = 0; i < colorBar.length; i++){
			colorBar[i].update();
		}
	}

	animate();
