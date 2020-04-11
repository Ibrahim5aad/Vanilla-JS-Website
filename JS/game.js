var index = 3000001

window.onload = function(){
	loggedInName()
	var texts = document.getElementsByClassName('iconTexts')
	var canvas = document.getElementById('canvas')
	var context = canvas.getContext('2d')
	var score = document.getElementById('score')
	var health = document.getElementById('health')
	var loggedText = document.getElementById('logged-text')
	addTextsToNavBar(texts)
	if(loggedText){
		addTextToLoggedBar(loggedText)
	}

	canvas.width = 0.6*innerWidth

	function changeBgColor(color){
		document.body.style.backgroundColor = color;
	  }
	

	addEventListener('resize', function(e){
			
		changeBgColor(`rgb(${Math.random()*100}, ${Math.random()*100}, ${Math.random()*100}, 0.3)`)
		canvas.width = 0.6*innerWidth
			
		if(parseInt(window.innerWidth) > 1000){ 
			addTextsToNavBar(texts)
			if(loggedText){
			addTextToLoggedBar(loggedText)
		}
		}

		if(parseInt(window.innerWidth) < 1000){
			for(let i=0; i<texts.length; i++){
				texts[i].innerText = " "
				if(loggedText){
					loggedText.innerText = " "
				}
			}
		}
		gameMenu(index)
	})

	function addTextToLoggedBar(loggedText){
		if(parseInt(window.innerWidth) > 1000){
			var logged = 'You are logged in as '
			loggedText.innerText = logged
		}
	}

	function addTextsToNavBar(texts){
		if(parseInt(window.innerWidth) > 1000){
			var iconTexts = ['Home', 'Gallery', 'About', 'Register', 'Game']
			for(let i=0; i<texts.length; i++){
				texts[i].innerText = iconTexts[i]
			}
	}
	}


	var mouse = {
		x: 10,
		x: 10
	}

	addEventListener('mousemove', function(e){
		mouse.x = e.clientX  - 50
		mouse.y = e.clientY  - 50
	})

	function gameOver(){
		context.clearRect(0,0,canvas.width, canvas.height)
		context.font = `${canvas.width/15}px Georgia`
		context.fillStyle = '#353131'
		context.fillText("Game Over", canvas.width/3, canvas.height/2)
		context.font = `${canvas.width/50}px Georgia`
		context.fillText("Press Enter to Restart", canvas.width/2.4, canvas.height/1.8)
		balls = []
	}

	function winnerGame(){
		context.clearRect(0,0,canvas.width, canvas.height)
		context.font = `${canvas.width/15}px Georgia`
		context.fillStyle = '#353131'
		context.fillText("You Won!", canvas.width/3, canvas.height/2)
		context.font = `30px Georgia`
		context.fillText(`Score = ${score.innerHTML}`, canvas.width*0.4, canvas.height*0.6)
		balls = []
	}


	function gameMenu(index){
		var a = index%3==0?22:(index%3 +1)*22
		var start = 'Choose the difficulty level:'
		context.clearRect(0,0,canvas.width, canvas.height)
		context.font = `${canvas.width/30}px Georgia`
		context.fillStyle = '#353131'
		context.fillText(start, canvas.width/3.2, canvas.height/3)
		context.font = `10px Georgia`
		context.fillText('Easy', (canvas.width/2)-15,(canvas.height/3)+38)
		context.fillText('Medium', (canvas.width/2)-15,(canvas.height/3)+60)
		context.fillText('Hard', (canvas.width/2)-15,(canvas.height/3)+80)

		context.beginPath()
		context.lineWidth = "2"
		context.strokeStyle = "#353131"
		context.rect((canvas.width/2)-20,a+(canvas.height/3 +5),50,15)
		context.stroke()
	}

	function gameTimer(startTime){
		var timer = document.getElementById('timer')
		var interval = setInterval(function(){
			if(startTime <= 1){
				clearInterval(interval)
			}
			startTime--
			timer.innerText = startTime}, 1000)
		return startTime
	}


	function getDistance(x1, y1, x2, y2){
		let xDistance = x1 - x2
		let yDistance = y1 - y2

		return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2))
	}
	function randomIntFromRange(min,max){
		return Math.floor(Math.random()*(max-min+1)+min)
	}
	function randomColor(){
		if(Math.random()<0.65){
			return '#353131'
		}
		else{
			return '#ECEDDC'
		}
	}
	function rotate(velocity, angle) {
	    const rotatedVelocities = {
	        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
	        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
	    }

	    return rotatedVelocities
	}
	function resolveCollision(ball, otherBall) {
    const xVelocityDiff = ball.velocity.x - otherBall.velocity.x
    const yVelocityDiff = ball.velocity.y - otherBall.velocity.y

    const xDist = otherBall.x - ball.x;
    const yDist = otherBall.y - ball.y;

    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

        const angle = -Math.atan2(otherBall.y - ball.y, otherBall.x - ball.x)

        const m1 = ball.mass
        const m2 = otherBall.mass

        const u1 = rotate(ball.velocity, angle);
        const u2 = rotate(otherBall.velocity, angle);

        const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y }
        const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y }

        const vFinal1 = rotate(v1, -angle)
        const vFinal2 = rotate(v2, -angle)

        ball.velocity.x = vFinal1.x
        ball.velocity.y = vFinal1.y

        otherBall.velocity.x = vFinal2.x
        otherBall.velocity.y = vFinal2.y
    }
}

	function Player(x,y,legnth, diff) {

		this.health = 100
		this.color= `rgb(70, 86, 175,${this.health/100})`
		this.x= x
		this.y= y
		this.l= legnth
		this.velocity = {
			x: 0,
			y: 0
		}
		this.mass = 0.1
		this.difficulty = diff


		this.update= balls => {
			this.draw()
			if(parseInt(timer.innerHTML) <= 0){
				gameOver()
			}
			if(this.health <= 0){
				balls.forEach((el)=> {
					el.erase()
				})
				gameOver()
			}

			if(parseInt(score.innerHTML) >= this.difficulty){
				balls.forEach((el)=> {
					el.erase()
				})
				winnerGame()
			}
			for(let i = 0; i < balls.length; i++){
				if (getDistance(this.x, this.y, balls[i].x, balls[i].y) - this.l*2 < 0){
					if(balls[i].color == '#353131' )
					{

						this.health-=1
						health.innerHTML -= 1
						this.color = this.health <= 50 ? `rgb(178, 30, 30,${this.health/100<=0.2? 0.2:this.health/100})`:`rgb(70, 86, 175,${this.health/100<=0.2? 0.2:this.health/100})`

						resolveCollision(this, balls[i])
					}
					if(balls[i].color == '#ECEDDC' ){
						this.health = this.health>=100? 100:this.health+1
						health.innerHTML = health.innerHTML>=100?100:parseInt(health.innerHTML)+1
						score.innerHTML = score.innerHTML<9 ? ('0'+(parseInt(score.innerHTML)+1)).split(-1) : parseInt(score.innerHTML)+1
						this.color = this.health <= 50 ? `rgb(178, 30, 30,${this.health/100<=0.2? 0.2:this.health/100})`:`rgb(70, 86, 175,${this.health/100<=0.2? 0.2:this.health/100})`
						balls[i].erase()
					}
				}
			}

			if(this.x < this.l){
				this.x += 20
			}
			if(this.x + this.l >= canvas.width){
				this.x -= 20
			}
			if(this.y < this.l){
				this.y += 20
			}
			if(this.y + this.l >= canvas.height){
				this.y -= 20
			}
		}

		this.draw= function(){
			context.beginPath()
			context.arc(this.x, this.y, this.l, 0, Math.PI * 2, false)
			context.closePath()
			context.fillStyle = this.color;
			context.fill();
		}
	}


	function Ball(x,y,radius,color) {

		this.color= color
		this.x= x
		this.y= y
		this.r= radius
		this.velocity = {
			x: (Math.random() - 0.5)*2,
			y: (Math.random() - 0.5)*2
		}
		this.mass = 1

		this.update= balls => {
			this.draw()
			for(let i = 0; i < balls.length; i++){
				if(this == balls[i]) continue
				if (getDistance(this.x, this.y, balls[i].x, balls[i].y) - this.r*2 < 0){
					resolveCollision(this, balls[i])
				}
			}

			if(this.x < this.r || this.x + this.r >= canvas.width){
				this.velocity.x = -this.velocity.x
			}
			if(this.y < this.r || this.y + this.r >= canvas.height){
				this.velocity.y = -this.velocity.y
			}

			this.x += this.velocity.x
			this.y += this.velocity.y
		}
		this.draw= function(){
			context.beginPath()
			context.arc(this.x, this.y, this.r, 0, Math.PI * 2, false)
			context.closePath()
			context.fillStyle = this.color
			context.fill()
		}

		this.erase = function(){
			this.r = 0
			this.m = 0
			this.x = 10000
			this.y = 10000
			this.velocity = 0
		}
	}

	let balls;
	var player;

	function init(number, diff){
		balls = []
		player = new Player(20, canvas.height - 20, 15, diff)
		for(let i = 0; i < number; i++){
			const radius = 10
			let x = randomIntFromRange(radius, canvas.width - radius)
			let y = randomIntFromRange(radius, canvas.height - radius)
			const color = randomColor()

			if(i !== 0){
				for( let j = 0; j < balls.length; j++){
					if(getDistance(x,y,balls[j].x,balls[j].y)-2*radius < 0){
						x = randomIntFromRange(radius, canvas.width - radius)
						y = randomIntFromRange(radius, canvas.height - radius)

						j = -1
					}
				}
			}

			balls.push(new Ball(x,y,radius,color))
			gameTimer(60)

		}
	}

	function animate(){
		context.clearRect(0,0,canvas.width, canvas.height)
		balls.forEach(ball => ball.update(balls))
		player.update(balls)
		requestAnimationFrame(animate)

	}
	gameMenu(index)


	window.onkeydown = function() {


		if(player){
		switch(event.key){
			case 'ArrowUp':
				player.y -= 15
				break
			case 'ArrowDown':
				player.y += 15
				break
			case 'ArrowLeft':
				player.x -= 15
				break
			case 'ArrowRight':
				player.x += 15
				break
			case 'Enter':
				location.reload(false);
				break

		}
	}
		else{

			switch(event.key){
				case 'Enter':
					switch(index%3){
						case 0:
							init(50, 15)
							break
						case 1:
							init(70, 25)
							break
						case 2:
							init(80, 30)
							break
					}
					animate()
					break
				case 'ArrowUp':
					index--
					gameMenu(index)
					break
				case 'ArrowDown':
					index++
					gameMenu(index)
					break
				case 'ArrowLeft':
					index--
					gameMenu(index)
					break
				case 'ArrowRight':
					index++
					gameMenu(index)
					break

			}

		}

	}



function loggedInName(){
	var name = document.getElementsByClassName('logged-name')
	name[0].innerHTML = window.localStorage.getItem('name')
	return window.localStorage.getItem('name')
}
}
