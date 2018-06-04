	window.onload=function(){
		canv = document.getElementById("snakec");
		ctx = canv.getContext("2d");
		//console.log(ctx);
		document.addEventListener('keydown',hc);
		setInterval(render,1000/15);
	}
	//x velocity and y velocity
	xv=yv=0
	//head position of the snake
	px=py=30
	//past saves the old states of the snake
	past=[]
	tail = 5
	//goodies
	ax=ay=15
	//blocksize
	bs=30
	tc=30

	function render(){
		a=document.getElementById('sb')
		a.innerHTML = String.concat("Score ",String(tail-5))
		//console.log(xv,yv)
		//console.log(px,py)
		px+=xv
		py+=yv
		//console.log(px,py)
		//handle_overflows
		if(px<0){
			px=tc-1
		}
		if(py<0){
			py=tc-1
		}
		if(py>tc-1){
			py=0
		}
		if(px>tc-1){
			px=0
		}
		//paint the canvas black
		ctx.fillStyle = "black"
		//console.log(canv.width,canv.height)
		ctx.fillRect(0,0,canv.width,canv.height)

		//mark the snake
		ctx.fillStyle="lime"
		for(var i=0;i<past.length;i++){
			ctx.fillRect(past[i].x*bs,past[i].y*bs,bs-2,bs-2)
			if(past[i].x==px && past[i].y==py){
				//game over buddy
				tail = 5
			}
		}
		//add the new position to  past
		past.push({x:px,y:py})
		//sweep the snaked body when moved
		while(past.length>tail){
			past.shift()
		}
		if(ax==px && ay==py){
			//voilla we ate an apple
			tail++
			ax = Math.floor(Math.random()*tc)
			ay = Math.floor(Math.random()*tc)
		}
		//mark the new apples in the market
		ctx.fillStyle="red"
		ctx.fillRect(ax*bs,ay*bs,bs-2,bs-2)
		//console.log(past[0])

	}
	function hc(e){
		console.log(px,py,ax,ay,past.length)
    switch(e.keyCode) {
        case 37:
            xv=-1;yv=0;
            break;
        case 38:
            xv=0;yv=-1;
            break;
        case 39:
            xv=1;yv=0;
            break;
        case 40:
            xv=0;yv=1;
            break;
    }

	}