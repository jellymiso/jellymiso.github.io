var indexPage = {
	init: function () {
		var ip = indexPage;
		ip.portfolio.init(function () {});
	},
	portfolio: {
		init: function (onComplete) {
			var ip = indexPage;
			//
			ip.portfolio.biography.init();
			// indexPage.portfolio.jellyfish.init();
			if (onComplete) { onComplete() }
		},
				biography:{
					init:function(){
						var message = document.querySelector('.message');
						var tempDiv = document.createElement("div");
						tempDiv.classList.add('msg1')
						message.appendChild(tempDiv)
						new Typewriter(tempDiv, {
							loop: false,
							delay: 100,
							cursor: "",
							skipAddStyles: true
						}).typeString("WELCOME")
							// .pauseFor(1000)
							// .deleteChars(7)
							// .callFunction(function(){
							// 	tempDiv.remove();
							// 	tempDiv = document.createElement("div");
							// 	tempDiv.classList.add('msg2')
							// 	message.appendChild(tempDiv)
							// 	new Typewriter(tempDiv, {
							// 		loop: false,
							// 		delay: 100,
							// 		cursor: "",
							// 		skipAddStyles: true
							// 	}).callFunction(function(){
							// 		tempSpan = document.createElement("span");
							// 		tempSpan.classList.add('markup-tag')
							// 		tempDiv.prepend(tempSpan)
							// 		new Typewriter(tempSpan, {
							// 			loop: false,
							// 			delay: 100,
							// 			cursor: "",
							// 			skipAddStyles: true
							// 		}).typeString("<")
							// 			.typeString("h1>").start()
							// 	}).pauseFor('500')
							// 		.typeString(' Hi, I am <span class="data-tag">Jeremy Soh</span>, a multidisciplinary software developer based in <span class="data-tag">Singapore</span>, who is passionate about <span class="data-tag">all things tech</span>, and <span class="data-tag">crafting innovative solutions</span> that solve complex problems')
							// 		.callFunction(function(){
							// 			tempSpan = document.createElement("span");	
							// 			tempSpan.classList.add('markup-tag')
							// 			tempDiv.append(tempSpan)
							// 			new Typewriter(tempSpan, {
							// 				loop: false,
							// 				delay: 100,
							// 				cursor: "",
							// 				skipAddStyles: true
							// 			}).typeString("<")
							// 				.typeString("/h1>")
							// 				.callFunction(function(){
							// 					// indexPage.portfolio.jellyfish.init();
							// 					var video1 =  document.querySelector('video.sequence1');
							// 					var video2 =  document.querySelector('video.sequence2');
							// 					video2.querySelector('source').setAttribute('src', 'https://cdn.pixabay.com/video/2022/01/22/105322-670051114_large.mp4')
							// 					video2.querySelector('source').setAttribute('type', 'video/mp4')
							// 					video2.load()
							// 					anime({
							// 						targets: video1,
							// 						opacity: 0,
							// 						easing: 'linear',
							// 						duration: 3000,
							// 						complete:function(anim){
							// 							if(anim.completed) video1.querySelector('source').removeAttribute('src')
							// 						}
							// 					})
							// 					video2.play()
							// 					anime({
							// 						targets: video2,
							// 						opacity: 1,
							// 						easing: 'linear',
							// 						duration: 3000,
							// 					})
							// 				}).start()
							// 		}).start()
							// })
							.start()
					}
				},
        jellyfish: {
					containerBox: null,
					originPoint:null,
					movementSpeed: 1,
					stopThreshold: 1,
					lastMouseX: window.innerWidth / 2,
					lastMouseY: window.innerHeight / 2,
					hasMouseEntered: false,
					isJellyfishReady: false,
					init:function(){
						var ip = indexPage;
						var splashArea = document.querySelector("#splash");
						var is = false;
						//
						ip.portfolio.jellyfish.containerBox = document.querySelector('.jellyfish-box');
						ip.portfolio.jellyfish.originPoint = document.querySelector('.jellyfish-origin');

            // Set initial position
						ip.portfolio.jellyfish.containerBox.style.right = '20px';
						ip.portfolio.jellyfish.containerBox.style.bottom = '105px';

						// Start tracking movement only when mouse enters the splash container
						splashArea.addEventListener("mouseenter", function(){
						if(ip.portfolio.jellyfish.isJellyfishReady){
								ip.portfolio.jellyfish.hasMouseEntered = true;
							}
						}) 
						splashArea.addEventListener("mouseover", function(){
						if(ip.portfolio.jellyfish.isJellyfishReady){
								ip.portfolio.jellyfish.hasMouseEntered = true;
							}
						}) 
						ip.portfolio.jellyfish.show(function(){
							ip.portfolio.jellyfish.isJellyfishReady = true;
							

							splashArea.onmouseleave = function(){
								ip.portfolio.jellyfish.hasMouseEntered = false;
							}

							splashArea.onmousemove = function(event){
								var jellyfishRect =  ip.portfolio.jellyfish.containerBox.getBoundingClientRect();
								// Check if the mouse is inside the jellyfish
								var isMouseInsideJellyfish = event.clientX >= jellyfishRect.left &&
																							event.clientX <= jellyfishRect.right &&
																							event.clientY >= jellyfishRect.top &&
																							event.clientY <= jellyfishRect.bottom;

								if (ip.portfolio.jellyfish.hasMouseEntered && !isMouseInsideJellyfish) {
									ip.portfolio.jellyfish.lastMouseX = event.clientX;
									ip.portfolio.jellyfish.lastMouseY = event.clientY;
								}
							};


							setInterval(function(){
            	// Update position continuously
								ip.portfolio.jellyfish.updatePosition();
							}, 16); //around 60fps
						});

            
					},
					show:function(onComplete){
						var ip = indexPage;
						anime({
							targets: ip.portfolio.jellyfish.containerBox,
							opacity: 1,
							easing: 'linear',
							duration: 5000,
							complete:function(anim){
							 if(anim.completed && onComplete){onComplete()}
							}
						});
					},
					hide:function(onComplete){
						var ip = indexPage;
						anime({
							targets: ip.portfolio.jellyfish.containerBox,
							opacity: 0,
							easing: 'easeInSine',
							duration: 3000,
							complete:function(anim){
							 if(anim.completed && onComplete){onComplete()}
							}
						});
					},
					// Function to update jellyfish position
        	updatePosition: function () {
						var ip = indexPage;
						//
						if (!ip.portfolio.jellyfish.hasMouseEntered) return;
						//
            var boxRect = ip.portfolio.jellyfish.containerBox.getBoundingClientRect();
            var originRect = ip.portfolio.jellyfish.originPoint.getBoundingClientRect();
            
            // Calculate the center of the jellyfish box
            var boxCenterX = boxRect.right - (boxRect.width / 2);
            var boxCenterY = boxRect.bottom - (boxRect.height / 2);

            // Check if the mouse is inside the origin
            var isMouseInsideOrigin = ip.portfolio.jellyfish.lastMouseX >= originRect.left &&
                                      ip.portfolio.jellyfish.lastMouseX <= originRect.right &&
                                      ip.portfolio.jellyfish.lastMouseY >= originRect.top &&
                                      ip.portfolio.jellyfish.lastMouseY <= originRect.bottom;

            if (isMouseInsideOrigin) {
                return;
            }

            // Calculate the angle for rotation
            var angle = Math.atan2(ip.portfolio.jellyfish.lastMouseY - boxCenterY, ip.portfolio.jellyfish.lastMouseX - boxCenterX) * 180 / Math.PI;

            // Calculate the distance and direction to move
            var deltaX = ip.portfolio.jellyfish.lastMouseX - boxCenterX;
            var deltaY = ip.portfolio.jellyfish.lastMouseY - boxCenterY;
            var currentRight = parseFloat(getComputedStyle(ip.portfolio.jellyfish.containerBox).right) || 0;
            var currentBottom = parseFloat(getComputedStyle(ip.portfolio.jellyfish.containerBox).bottom) || 0;
            var distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            var originCenterX = originRect.left + (originRect.width / 2);
            var originCenterY = originRect.top + (originRect.height / 2);
            var originToMouseX = ip.portfolio.jellyfish.lastMouseX - originCenterX;
            var originToMouseY = ip.portfolio.jellyfish.lastMouseY - originCenterY;
            var distanceToMouse = Math.sqrt(originToMouseX * originToMouseX + originToMouseY * originToMouseY);

            if (distanceToMouse > ip.portfolio.jellyfish.stopThreshold) {
                // Normalize the movement vector
                var moveX = (deltaX / distance) * ip.portfolio.jellyfish.movementSpeed;
                var moveY = (deltaY / distance) * ip.portfolio.jellyfish.movementSpeed;

                // Update the position based on bottom-right alignment
                var newRight = parseFloat(ip.portfolio.jellyfish.containerBox.style.right) - moveX;
                var newBottom = parseFloat(ip.portfolio.jellyfish.containerBox.style.bottom) - moveY;

                // Apply new position and rotation
                ip.portfolio.jellyfish.containerBox.style.right = newRight + 'px';
                ip.portfolio.jellyfish.containerBox.style.bottom = newBottom + 'px';
                ip.portfolio.jellyfish.containerBox.style.transform = 'rotate(' + (angle + 90) + 'deg)';

            } else {
                ip.portfolio.jellyfish.containerBox.style.right = (currentRight - (distanceToMouse / 2)) + 'px';
                ip.portfolio.jellyfish.containerBox.style.bottom = (currentBottom - (distanceToMouse / 2)) + 'px';
                ip.portfolio.jellyfish.containerBox.style.transform = 'rotate(' + (angle + 90) + 'deg)';
            }
					}
				}
    }
}

//---- document ready -------------------------
document.addEventListener("DOMContentLoaded", function (event) {
    indexPage.init();
});
