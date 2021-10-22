window.onload = function() {
		loggedInName()
		var texts = document.getElementsByClassName('iconTexts')
		var loggedText = document.getElementById('logged-text')
		addTextsToNavBar(texts)
		if(loggedText){
			addTextToLoggedBar(loggedText)
		}
		


		addEventListener('resize', function(e){
			
			changeBgColor(`rgb(${Math.random()*100}, ${Math.random()*100}, ${Math.random()*100}, 0.3)`)
				
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
			

	})


}

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

function changeBgColor(color){
  document.body.style.backgroundColor = color;
}

function changeLinksColor(links, color){
  for(let l of links){
    if(l.className != 'selected'){
      l.style.color = color
      l.addEventListener('mouseover', function(){
        this.style.color = '#ECEDDC'
      })
      l.addEventListener('mouseout', function(){
        this.style.color = document.body.style.backgroundColor
      })
    }
  }
}
function colorBtnFunctionality(){
	var red = document.getElementById('red')
	var blue = document.getElementById('blue')
	var green = document.getElementById('green')
	var rand = document.getElementById('rand')
  


  red.style.backgroundColor = 'rgb(249, 57, 57)'
  blue.style.backgroundColor = 'rgb(152, 157, 193)'
  green.style.backgroundColor = 'rgb(153, 193, 152)'


	red.onclick = function(){
    changeBgColor('rgb(227, 73, 73, 0.5)')
    if(this.style.width == '40px'){
      this.style.width = '30px'
      setTimeout(function () {
        red.style.width = '40px'
	}, 300);
    }
    else{
      this.style.width = '40px'
      blue.style.width = '30px'
      green.style.width = '30px'
      rand.style.width = '30px'
    }
   }

	blue.onclick = function(){
    changeBgColor('rgb(152, 157, 193, 0.5)')
    if(this.style.width == '40px'){
      this.style.width = '30px'
      setTimeout(function () {
        blue.style.width = '40px'
      }, 300);
    }
    else{
      this.style.width = '40px';
      red.style.width = '30px'
      green.style.width = '30px'
      rand.style.width = '30px'
    } }
	green.onclick = function(){
    changeBgColor('rgb(120, 204, 118, 0.5)')
    if(this.style.width == '40px'){
      this.style.width = '30px'
      setTimeout(function () {
        green.style.width = '40px'
      }, 300);
    }
    else{
      this.style.width = '40px';
      red.style.width = '30px'
      blue.style.width = '30px'
      rand.style.width = '30px'
    } }
  rand.onclick = function functionName() {
    changeBgColor(`rgb(${Math.floor(Math.random() * 150)}, ${Math.floor(Math.random() * 150)}, ${Math.floor(Math.random() * 150)}, 0.5)`)
    if(this.style.width == '40px'){
      this.style.width = '30px'
      setTimeout(function () {
        rand.style.width = '40px'
      }, 300);
    }
    else{
      this.style.width = '40px';
      red.style.width = '30px'
      blue.style.width = '30px'
      green.style.width = '30px'
    }
  }

}
function clockFunctionality(){
	var hr = document.getElementsByClassName('hr')
	var min = document.getElementsByClassName('min')
	var sec = document.getElementsByClassName('sec')
	var colon = document.getElementsByClassName('colon')
	updateTime(hr[0], min[0], sec[0])
	setInterval(function(){
		updateTime(hr[0], min[0], sec[0])
		blinkingColon(colon[0])
	}, 500)
}
function updateTime(hours, mins, secs){
	var currTime = new Date()
	hours.innerText = `${('0'+currTime.getHours()).slice(-2)}`
	mins.innerText = `${('0'+currTime.getMinutes()).slice(-2)}`
	secs.innerText = `:${('0'+currTime.getSeconds()).slice(-2)}`
}
function blinkingColon(colon){
	if(colon.innerText == ':'){
		colon.innerText = '  '
	}
	else(colon.innerText = ':')

}
function clockFloating(){
	var clicked = false
	var offset = []
	var clock = document.getElementsByClassName('clock')

	clock[0].addEventListener('mousedown', function(event) {
    clicked = true
    offset = [
        this.offsetLeft - event.clientX,
        this.offsetTop - event.clientY
    ];
	}, true)


	clock[0].addEventListener('mousemove', function(event){
		event.preventDefault()
		if (clicked) {
        mousePosition = {
            x : event.clientX,
            y : event.clientY
        };
        this.style.left = (mousePosition.x + offset[0]) + 'px'
        this.style.top  = (mousePosition.y + offset[1]) + 'px'
    }
	}, true)

	document.addEventListener('mouseup', function() {
    clicked = false;
	}, true);
}
function welcomeFunctionality(){
	var name = window.prompt('Please, enter your name: ')
	var text = document.querySelector('.welcome-container')
	 if(name == ''){
		name = "Anonymous"
	}
	if(name){
		text.innerHTML = `Welcome, ${name}!`
		window.localStorage.setItem('name', name)
	}
	else{text.innerHTML = 'Welcome!'}

	text.innerHTML = text.textContent.replace(/\S/g, "<span class='letter'>$&</span>")

	anime.timeline({loop: true})
	  .add({
	    targets: '.welcome-container .letter',
	    scale: [4,1],
	    opacity: [0,1],
	    translateZ: 0,
	    easing: "easeOutExpo",
	    duration: 5000,
	    delay: (el, i) => 70*i
	  }).add({
	    targets: '.welcome-container',
	    opacity: 0,
	    duration: 1000,
	    easing: "easeOutExpo",
	    delay: 1000
	  });

}


function sliderFunctionality(){
	var imgs = document.getElementsByClassName('thumbnail')
	var imgPreview = document.getElementsByClassName('imgPreview')
	var selected = imgs[0]
	for(let i of imgs){
		i.onclick = function(){
			imgPreview[0].src = i.src
			selected = this
			this.classList.add('selected')
			imgPreview[0].classList.add('fader')

	}
		i.onmouseover = function (){
			imgPreview[0].src = i.src

		}

		i.onmouseout = function(){
			imgPreview[0].src = selected.src
			imgPreview[0].classList.remove('fader')
			currentThumbnail(imgs, selected)
		}

}
}

function currentThumbnail(imgs, i, imgPreview){
	for(let img of imgs){
		img.classList.remove('selected')
		if(img == i){
			img.classList.add('selected')
		}
	}
}
function loggedInName(){
	var name = document.getElementsByClassName('logged-name')
	if(name[0]){name[0].innerHTML = window.localStorage.getItem('name')}
}
function bgColorStoring(){
	var bgColor = document.body.style.backgroundColor
	window.localStorage.setItem('bgcolor', bgColor)
}
function passwordConfirmation(){
	var password = document.getElementById("password")
  	var confirmPassword = document.getElementById("confirm-password");

	function validatePassword(){
	  if(password.value != confirmPassword.value) {
	    confirmPassword.setCustomValidity("Passwords Don't Match");
	  } else {
	    confirmPassword.setCustomValidity('');
	  }
	}

	password.onchange = validatePassword;
	confirmPassword.onkeyup = validatePassword;
}

