
var indexPage = {
	isDebugMode: true,
	init: function () {

		;(function logToggle() {
			// assume `indexPage.isDebugMode` is your debug toggle
			if (!indexPage.isDebugMode) {
				//warn and error excluded
				var methods = [
					'log', 'info',
					'debug', 'trace', 'group', 'groupCollapsed',
					'groupEnd', 'time', 'timeEnd'
				];

				methods.forEach(function(name) {
					if (console[name]) {
						console[name] = function() {};
					}
				});
			}
		})();


		indexPage.utilities.init(function(){
			//no custom cursor for mobile
			if (!indexPage.utilities.system.isMobile()) {
				indexPage.customCursor.init();
			} 
			indexPage.siteFeatures.init();
			indexPage.menu.init();
			indexPage.sectionSplash.init();
			indexPage.sectionAbout.init();
			indexPage.sectionSkills.init();
			indexPage.sectionTechSpeciality.init();
			indexPage.sectionLocation.init();
		});

		

	},
	menu:{
		init:function(){
			//
			var mn = indexPage.menu;
			//
			mn.mobileMenuColor();
			mn.menuButtonToggle();
			mn.menuLinkClick();
		},
		menuLinkClick: function(){
			var ip = indexPage;
			var mn = ip.menu;
			//
			var menu = document.querySelector('#splash .topbar .menu');
			var menuTrigger = document.querySelector('#menu-trigger');
			var navLinks = menu.querySelectorAll("li a");
			for (var i = 0; i < navLinks.length; i++) {
				navLinks[i].addEventListener('click', function (e) {
					e.preventDefault();
					var targetId = this.getAttribute('href').slice(1);
					var target = document.getElementById(targetId);
					var sections = document.querySelectorAll('.section');

					var scrollY = 0;
					for (var i = 0; i < sections.length; i++) {
						if (sections[i] === target) break;
						scrollY += sections[i].offsetHeight;
					}
					ip.utilities.scroll.smoothScrollTo(scrollY, 500);
					mn.lightsOn();
					menuTrigger.checked = false;
				});
			}
		},
		mobileMenuColor: function(){
			var menu = document.querySelector('.menu-button');
			var menuRect = menu.getBoundingClientRect();
			var sections = document.querySelectorAll('.section');
			var lastActiveClass = ""; // Store the last applied class

			function areIntersecting(bounds1, bounds2) { 
				return bounds1.top < bounds2.bottom && bounds1.bottom > bounds2.top;
			}

			document.addEventListener('scroll', function () {
				var activeSectionId = null;

				for (var i = 0; i < sections.length; i++) {
					var sectionRect = sections[i].getBoundingClientRect();
					
					if (areIntersecting(sectionRect, menuRect)) {
						activeSectionId = sections[i].id;
						break; // Stop at the first intersecting section
					}
				}

				if (activeSectionId !== lastActiveClass) {
					menu.className = 'menu-button'; // Reset class
					if (activeSectionId) {
						menu.classList.add(activeSectionId); // Add new class
					}
					lastActiveClass = activeSectionId; // Update last active class
				}
			});
		},
		menuButtonToggle: function(){
			//
			var mn = indexPage.menu;
			//
			var menuTrigger = document.querySelector('#menu-trigger');
			if (menuTrigger) {
				menuTrigger.addEventListener('change', function () {
					if (menuTrigger.checked) {
						mn.lightsOff(); // Elements to stay visible
					} else {
						mn.lightsOn(); // Undim everything
					}
				});
			}
		},
		lightsOff: function() {
			var lightsOverlay = document.querySelector(".lightsOverlay");
			var topBar = document.querySelector(".topbar");
			if (!lightsOverlay) {
				var lightsOverlay = document.createElement("div");
				lightsOverlay.classList.add("lightsOverlay");
				topBar.appendChild(lightsOverlay);
			}
			lightsOverlay.classList.add("active");
		},
		lightsOn: function(){
			var lightsOverlay = document.querySelector(".lightsOverlay");
			lightsOverlay.classList.remove("active");
		}
	},
	// For storing site features elements, data, and behavior
	siteFeatures: {
		init: function () {
			//
			var sf = indexPage.siteFeatures;
			//
			sf.emailCopy.init(); 
			sf.sectionScrollNext.init();
		},

		// Email copy functionality
		emailCopy: {
			emailCopyButtons: null,
			init: function () {
				var sf = indexPage.siteFeatures;
				var ec = sf.emailCopy;

				// Select all elements with class "email"
				ec.emailCopyButtons = document.querySelectorAll('.email');

				// Bind utility copy behavior to each button
				ec.emailCopyButtons.forEach(function (button) {
					indexPage.utilities.clipboard.bindCopyElement(button);
				});
			}
		},
		sectionScrollNext: {
			init: function(){
				var ip = indexPage;
				var triggers = document.querySelectorAll('.scroll');
				for (var i = 0; i < triggers.length; i++) {
						triggers[i].addEventListener('click', function (e) {
							e.preventDefault();
							// Find the nearest parent with class "section"
							var el = this;
							while (el && !el.classList.contains('section')) {
								el = el.parentNode;
							}

							if (el) {
								var offset = el.offsetTop + el.offsetHeight;
								ip.utilities.scroll.smoothScrollTo(offset, 500);
							}
						});
					}
			}
		}
	},
	//
	// For storing custom cursor elements, data, and behavior
	customCursor: {
		cursorGroup: null,      // Container that follows the native cursor
		cursorTips: null,       // Displays hover text (curved if CircleType is used)
		cursorPointer: null,    // Container for visual pointer + optional reveal content
		cursorReveal: null,     // Injected content or animation triggered by hover
		hoveredTag: null,       // Tracks the current hovered element with data-hover
		cursorPos: { x: 0, y: 0 },  // Live pointer position
		scrollPos: { x: 0, y: 0 },  // Scroll offset (used for syncing cursor position)
		target: null,              // Current target of pointerover event
		//
		// Main initializer function — sets up DOM and listeners
		init: function () {
			var cc = indexPage.customCursor;

			// Create DOM elements
			cc.cursorGroup = document.createElement('div');
			cc.cursorTips = document.createElement('div');
			cc.cursorPointer = document.createElement('div');
			cc.cursorReveal = document.createElement('div');

			// Assign base classes
			cc.cursorGroup.className = 'custom-cursor';
			cc.cursorTips.className = 'cursor-tips';
			cc.cursorPointer.className = 'cursor-pointer';
			cc.cursorReveal.className = 'cursor-reveal';

			// Append to DOM
			document.body.appendChild(cc.cursorGroup);
			cc.cursorGroup.insertBefore(cc.cursorTips, cc.cursorGroup.firstChild);
			cc.cursorGroup.appendChild(cc.cursorPointer);

			// Attach movement + scroll listeners
			cc.onPointerMove();
			cc.onWindowScroll();
			cc.onPointerOver();
		},
		//
		// Tracks and updates cursorPos in real-time as user moves the pointer
		onPointerMove: function () {
			var cc = indexPage.customCursor;

			document.addEventListener("pointermove", function (e) {
				cc.cursorPos.x = e.clientX;
				cc.cursorPos.y = e.clientY;
				requestAnimationFrame(function () {
					cc.updateCursorPosition();
				});
			});
		},
		//
		// Updates scrollPos and syncs cursorGroup when user scrolls
		onWindowScroll: function () {
			var cc = indexPage.customCursor;

			window.addEventListener("scroll", function () {
				cc.scrollPos.y = document.documentElement.scrollTop;
				requestAnimationFrame(function () {
					cc.updateCursorPosition();
				});
			});
		},
		//
		// Listens for any hover interactions, then delegates to main logic
		onPointerOver: function () {
			var cc = indexPage.customCursor;

			document.addEventListener("pointerover", function (e) {
				cc.target = e.target;
				cc.resetCursor();
				cc.processHover(cc.target);
			});
		},
		//
		// Handles cursor reaction when hovering a valid `data-hover="true"` target
		processHover: function (target) {
			var cc = indexPage.customCursor;

			if (target.getAttribute('data-hover') === 'true') {
				// Apply extra hover class to the entire cursorGroup
				var hoverClass = target.getAttribute('data-hover-class');
				if (hoverClass) {
					var classes = hoverClass.trim().split(/\s+/);
					for (var i = 0; i < classes.length; i++) {
						if (classes[i]) {
							cc.cursorGroup.classList.add(classes[i]);
						}
					}
				}

				// Set and stylize tooltip text
				var hoverText = target.getAttribute('data-hover-text') || "";
				cc.cursorTips.textContent = hoverText.toUpperCase();

				// Optional: apply CircleType curve effect if available
				if (typeof CircleType !== "undefined") {
					new CircleType(cc.cursorTips).radius(65);
				}

				// Insert inner HTML animation or image into the cursorReveal
				var hoverReveal = target.getAttribute('data-hover-reveal');
				if (hoverReveal !== null) {
					cc.cursorReveal.innerHTML = hoverReveal;
					cc.cursorPointer.insertBefore(cc.cursorReveal, cc.cursorPointer.firstChild);
					cc.hoveredTag = target; // Used for syncing its transform later
				}
			}
		},
		//
		// Repositions cursorGroup and cursorReveal every frame
		updateCursorPosition: function () {
			var cc = indexPage.customCursor;

			// Position the cursorGroup to follow the real pointer + scroll offset
			cc.cursorGroup.style.top = (cc.cursorPos.y + cc.scrollPos.y) + "px";
			cc.cursorGroup.style.left = Math.min(
				Math.max(0, cc.cursorPos.x),
				document.documentElement.clientWidth - cc.cursorGroup.offsetWidth / 2
			) + "px";

			// If a tag is being hovered, adjust cursorReveal to align to it
			if (cc.hoveredTag) {
				var hoveredRect = cc.hoveredTag.getBoundingClientRect();
				var pointerRect = cc.cursorPointer.getBoundingClientRect();

				var xTranslate = hoveredRect.left - pointerRect.left +
					(window.scrollX !== undefined ? window.scrollX : window.pageXOffset);
				var yTranslate = hoveredRect.top - pointerRect.top - 2;

				cc.cursorReveal.style.transform = "translate(" + xTranslate + "px, " + yTranslate + "px)";
			}
		},
		//
		// Clears all cursor classes and resets its visual state
		resetCursor: function () {
			var cc = indexPage.customCursor;
			cc.cursorGroup.className = "custom-cursor";
			cc.cursorTips.innerHTML = "";
			cc.cursorReveal.innerHTML = "";
		}
	},
	//
	// For storing splash section elements, data, and behavior
	sectionSplash: {
		init: function() {
			//
			var ss = indexPage.sectionSplash;
			var splashLogo = document.querySelector('.logo-content');
			splashLogo.classList.add('active');

			var logoInit = splashLogo.querySelector('.init-logo');
			var started = false;

			function startSplashOnce() {
				if (started) return;
				started = true;
				ss.splashStart.init();
			}
 
			logoInit.addEventListener('animationend', function (event) {
				if (event.animationName.toLowerCase() === 'load2') {
					console.log('✅ started naturally');
					startSplashOnce(); 
				}
			});

			// fallback if animationend doesn't fire
			setTimeout(function () {
				if (!started) {
					console.log('⚠️ started via fallback');
					startSplashOnce();
				}
			}, 1500);

		},
		splashStart: {
			messageDiv: null,
			topBar: null,
			splashLogo: null,
			splashOverlay: null,
			init: function() {
				//
				var ss = indexPage.sectionSplash;
				var sm = ss.splashStart;
				//
				// Cache DOM elements for splashStart usage
				sm.messageDiv = document.querySelector('.message');
				sm.topBar = document.querySelector('.topbar');
				sm.splashLogo = document.querySelector('.logo-content');
				sm.splashOverlay = document.querySelector('#splash .overlay');
				//
				// Start welcome message animation
				sm.welcome();

				// Start logo spin unless on IE (skip IE)
				if (!indexPage.utilities.system.isIE()) {
					ss.logoSpin();
				}
			},
			welcome: function() {
				//
				var ss = indexPage.sectionSplash;
				var sm = ss.splashStart;
				//
				// Create container div for welcome message
				var tempDiv = document.createElement('div');
				tempDiv.classList.add('msg1');
				sm.messageDiv.appendChild(tempDiv);
				//
				// Typewriter effect for "WELCOME" message
				new Typewriter(tempDiv, {
					onCreateTextNode: function(char) {
						// Example of creating a custom span element (Uncomment if needed)
						if (char === "W") {
							var tempSpan = document.createElement("span");
							tempSpan.textContent = char;
							return tempSpan;
						}
						return document.createTextNode(char);
					},
					loop: false,
					delay: 200,
					cursor: "",
					skipAddStyles: true
				})
				.pauseFor(750)
				.typeString("WELCOME")
				.callFunction(function() {
					// Show splash overlay when WELCOME is typed
					sm.splashOverlay.classList.add("show");
				})
				.pauseFor(3000)
				.deleteChars(7)
				.callFunction(function() {
					// Hide splash logo and show top bar after welcome message
					sm.splashLogo.classList.add("hide");
				})
				.pauseFor(2000)
				.callFunction(function() {
					// Activate splash overlay and proceed to introduction
					sm.splashOverlay.classList.add("active");
					tempDiv.parentNode.removeChild(tempDiv);
					sm.introduction();
				})
				.start();
			},
			introduction: function() {
				//
				var ss = indexPage.sectionSplash;
				var sm = ss.splashStart;
				//
				// Create container for introduction messages
				var tempDiv = document.createElement('div');
				tempDiv.classList.add('msg2');
				sm.messageDiv.appendChild(tempDiv);
				//
				// Create and append div for name
				var tempNameDiv = document.createElement('div');
				tempNameDiv.classList.add('name');
				tempDiv.appendChild(tempNameDiv);
				//
				// Typewriter effect for the name "Jeremy Soh"
				new Typewriter(tempNameDiv, {
					loop: false,
					delay: 50, // 50 ms delay per character
					cursor: "",
					skipAddStyles: true
				})
				.typeString("Jeremy Soh")
				.callFunction(function() {
					//
					// Create bio container and append it
					var tempBioDiv = document.createElement("div");
					tempBioDiv.classList.add('bio');
					tempDiv.appendChild(tempBioDiv);
					//
					// Define interactive spans with hover attributes for bio text
					var multidisciplinary = '<em ' +
						'data-hover="true" data-hover-class="hover-multi fields" ' +
						'data-hover-reveal=\'<div class="hexagon"><div class="top"></div><div class="bot"></div></div>\'' +
						'>multidisciplinary</em>';

					var variousAngles = '<em ' +
						'data-hover="true" data-hover-class="hover-multi angles" ' +
						'data-hover-reveal=\'<div class="hexagon"><div class="top"></div><div class="bot"></div></div>\'' +
						'>various\u202F\u202F\u202Fangles</em>';

					var developer = '<b ' +
						'data-hover="true" data-hover-class="hover-build dev" ' +
						'data-hover-reveal=\'<div class="lego"><div class="block-one"></div><div class="block-two"></div><div class="block-three"></div></div>\'' +
						'>developer</b>';

					var creativeSolutions = '<b ' +
						'data-hover="true" data-hover-class="hover-build solution" ' +
						'data-hover-reveal=\'<div class="lego"><div class="block-one"></div><div class="block-two"></div><div class="block-three"></div></div>\'' +
						'>creative\u202F\u202F\u202Fsolutions</b> ';

					var complexChallenges = '<b ' +
						'data-hover="true" data-hover-class="hover-build challenge" ' +
						'data-hover-reveal=\'<div class="lego"><div class="block-one"></div><div class="block-two"></div><div class="block-three"></div></div>\'' +
						'>complex\u202F\u202F\u202Fchallenges</b>';

					//
					// Typewriter effect for full bio with embedded hover elements
					new Typewriter(tempBioDiv, {
						loop: false,
						delay: 50,
						cursor: "",
						skipAddStyles: true
					})
					.typeString(
						'As a ' + multidisciplinary + '\xA0' + developer + ', I craft ' + creativeSolutions + ' that are designed to tackle ' + complexChallenges +
						' from ' + variousAngles + '.'
					)
					.pauseFor(1000)
					.callFunction(function() {
						// Add spinning effect to topbar logo on intro start
						sm.topBar.classList.add("show");
						document.querySelector('#splash .scroll').classList.add("active");
						document.querySelector('.topbar .logo').classList.add("spin");
						ss.logoSpin();
					})
					.pauseFor(2500)
					.callFunction(function() {
						// Enable vertical scrolling on body and activate scroll element
						document.documentElement.style.overflowY = '';
						document.body.style.overflowY = "auto";
					})
					.start();
				})
				.pauseFor(1000)
				.start();
			},
		},
		logoSpin: function() {
			var logo = document.querySelector('.topbar .logo');
			var rotation = 0;
			var speed = 0;
			var interval = null;

			// Starts the continuous spinning animation
			function startSpin() {
				if (interval) {
					clearInterval(interval);
					interval = null;
				}
				if (logo.classList.contains("spin")) {
					speed = 4;
					interval = setInterval(function() {
						rotation += speed;
						// Reset rotation after a full cycle (360deg)
						if (rotation >= 360) {
							rotation = 0;
						}
						logo.style.transform = 'rotate(' + rotation + 'deg)';
					}, 16);
				}
			}

			// Stops spinning smoothly by continuing rotation until full circle
			function stopSpin() {
				if (logo.classList.contains("spin")) {
					clearInterval(interval);
					interval = setInterval(function() {
						rotation += speed;
						logo.style.transform = 'rotate(' + rotation + 'deg)';
						if (rotation % 360 === 0) {
							clearInterval(interval);
							interval = null;
						}
					}, 16);
				}
			}

			// Bind mouse events to start and stop spinning on hover
			logo.addEventListener('mouseenter', startSpin);
			logo.addEventListener('mouseleave', stopSpin);

			// If logo has spin class and is hovered on page load, start spinning immediately
			if (logo.classList.contains('spin') && logo.matches(':hover')) {
				startSpin();
			}
		}
	},
	// For storing about section elements, data, and behavior
	sectionAbout:{
		init:function(){
			indexPage.sectionAbout.parallaxScroll.init();
		},
		parallaxScroll: {
			aboutSect: null,
			init:function(){
				//
				var ps = indexPage.sectionAbout.parallaxScroll;
				//
				ps.aboutSect = document.querySelector('#about');
				//
				ps.onWindowScroll();
			},
			onWindowScroll: function(){
				var ps = indexPage.sectionAbout.parallaxScroll;
				//
				var timeout;
				var debounceTime = 100;
				//
				window.addEventListener('scroll', function() {
					if (!indexPage.utilities.system.isIE()) {
						ps.updateOpacity();
						ps.updateLayers();
					}
					else{
						clearTimeout(timeout);
						timeout = setTimeout(ps.updateOpacity, debounceTime);
					}
				});
			},
			updateOpacity: function(){
				var ps = indexPage.sectionAbout.parallaxScroll
				//
				var progress = 1 - Math.pow(1 - ps.aboutSect.getBoundingClientRect().bottom / window.innerHeight, 4);
				var opacity = Math.min(Math.max(progress, 0), 1);
				document.documentElement.style.setProperty("--scroll-opacity", opacity);
			},
			updateLayers: function(){
				var ps = indexPage.sectionAbout.parallaxScroll
				//
				var backgroundLayer = document.querySelector('.background');
				var middlegroundLayer = document.querySelector('.middleground');
				//
				var borderTopWidth = parseInt(window.getComputedStyle(ps.aboutSect).borderTopWidth, 10);
				var innerBorderTopWidth = parseInt(window.getComputedStyle(ps.aboutSect.querySelector('.main-content')).borderTopWidth);
				//
				var aboutSectTop = ps.aboutSect.offsetTop;
				var scrollY = window.pageYOffset || document.documentElement.scrollTop;
				var scrollPos = scrollY - aboutSectTop - borderTopWidth - innerBorderTopWidth;
				//
				// Parallax effect: Adjust the Y position of the layers based on scroll position
				var backgroundPos = scrollPos * 0.5; // Slowest
				var middlegroundPos = scrollPos * 0.75; // Faster
				if (backgroundLayer.style.top !== (backgroundPos + "px")) {
					backgroundLayer.style.top = backgroundPos + "px";
				}
				if (middlegroundLayer.style.top !== (middlegroundPos + "px")) {
					middlegroundLayer.style.top = middlegroundPos + "px";
				}
			}
		}
	},
	// For storing skills section elements, data, and behavior
	sectionSkills: {
		init: function() {
			if (!indexPage.utilities.system.isIE()) {
				indexPage.sectionSkills.skillAccordionObserver();
			}
		},
		// This just handles watching for accordion size changes and triggers updates
		skillAccordionObserver: function() {
			var accs = document.querySelectorAll(".skill-tree .accordion");

			var update = function() {
				var sections = document.querySelectorAll('.section');
				var viewportHeight = window.innerHeight;

				for (var i = 0; i < sections.length; i++) {
					var section = sections[i];
					var sectionHeight = section.getBoundingClientRect().height;

					if (sectionHeight > viewportHeight) {
						section.style.bottom = "-" + (sectionHeight - viewportHeight) + "px";
					} else {
						section.style.bottom = "";
					}
				}
			};

			if (window.ResizeObserver) {
				var resizeObserver = new ResizeObserver(function() {
					update();
				});
				accs.forEach(function(el) {
					resizeObserver.observe(el);
				});
			} else {
				var observer = new MutationObserver(update);
				accs.forEach(function(el) {
					observer.observe(el, { childList: true, subtree: true });
				});

				setInterval(update, 500);
			}
		}
	},
	//
	// For storing techspeciality section elements, data, and behavior
	sectionTechSpeciality:{
		init:function(){
			//
			var sts = indexPage.sectionTechSpeciality;
			//
			sts.techSpecialityEntry.init();
			sts.tags.init(function(){
				sts.projects.init();
				sts.teckStack.init();
			});
		},
		techSpecialityEntry: {
			techSpecialitySection: null,
			techSidebar: null,
			specialitySect: null,
			skillsSection: null,
			init: function(){
				var sts = indexPage.sectionTechSpeciality;
				var tse = sts.techSpecialityEntry;
				//
				tse.techSpecialitySection = document.querySelector("#tech_speciality");
				tse.techSidebar = document.querySelector("#tech");
				tse.specialitySect = document.querySelector('#speciality');
				tse.skillsSection = document.querySelector("#skills"); 
				//
				tse.onWindowScroll();
			},
			onWindowScroll: function(){
				var tse = indexPage.sectionTechSpeciality.techSpecialityEntry;
				//
				window.addEventListener("scroll", function(){
					var scrollY = window.scrollY !== undefined ? window.scrollY : window.pageYOffset;

					var skillsSectionBottom = tse.skillsSection.offsetTop + tse.skillsSection.offsetHeight; // Bottom of #skills section
					//
					// Determine sidebar movement distance (uses actual sidebar width on desktop, and a fixed virtual width on < 960px)
					var sidebarWidth = window.innerWidth <= 960 ? 500 : tse.techSidebar.offsetWidth; 
					var specialityHeight = tse.techSpecialitySection.offsetHeight; // Total height of the speciality section

				// Calculate progress based on the scroll position
					var scrollProgress = tse.calculateScrollProgress(specialityHeight, skillsSectionBottom, scrollY);
					var translateX = tse.calculateSidebarTranslate(sidebarWidth, skillsSectionBottom, scrollY, scrollProgress);
					var opacity = tse.calculateSectionOpacity(translateX, sidebarWidth);

					tse.applyStyles(tse.techSidebar, tse.specialitySect, translateX, opacity);
				});
			},
			calculateScrollProgress: function(sectionHeight, sectionStartY, scrollY ){
				var scrollProgress = (scrollY + sectionStartY) / sectionHeight;
				return Math.min(1, Math.max(0, scrollProgress)); // Clamp between 0 and 1
			},
			calculateSidebarTranslate: function(sidebarWidth, sectionStartY, scrollY, progress){
				// Calculate the initial offset (initial position) of the sidebar when the previous section leaves the viewport
				var initialOffset = scrollY - sectionStartY;
				// Calculate the starting position for the sidebar movement
				var startPosition = initialOffset - sidebarWidth;
				// Apply the translation based on the progress
				var translateX = startPosition + (progress * sidebarWidth);
				return Math.min(translateX, 0);
			},
			calculateSectionOpacity: function(translateX, sidebarWidth){
				// Start opacity change when translateX reaches -400px, and it reaches 1 when translateX becomes 0
				var opacityProgress = (translateX + sidebarWidth) / sidebarWidth;
				return Math.min(1, Math.max(0, opacityProgress));  // Clamp between 0 and 1
			},
			applyStyles: function(techSidebar, specialityContent, translateX, opacity){
				// Apply the styles
				techSidebar.style.transform = "translateX(" + translateX + "px)";
				specialityContent.style.opacity = opacity;// Set opacity based on progress
			}
		},
		teckStack: { 
			techSpecialtySect: null,
			techSect: null,
			tagContent: null,
			tagGroups: null,
			tagSpans: null,
			triggers: null,
			dropdownCheckbox: null,
			dropdownCheckboxLabel: null,
			resetSelection: null,
			init: function(onComplete){
				//
				var sts = indexPage.sectionTechSpeciality;
				var ts = sts.teckStack;
				//
				ts.techSpecialtySect = document.querySelector("#tech_speciality");
				ts.techSect = ts.techSpecialtySect.querySelector("#tech");
				ts.dropdownCheckbox = ts.techSpecialtySect.querySelector(".tag-dropdown");
				ts.tagContent = ts.techSpecialtySect.querySelectorAll(".tag-content .tag-group");
				ts.tagGroups = ts.techSpecialtySect.querySelectorAll(".tag-group .tags");
				ts.tagSpans = ts.techSpecialtySect.querySelectorAll(".tag-group .tags span");
				ts.triggers = ts.techSpecialtySect.querySelectorAll(".tab-trigger");
				ts.dropdownCheckboxLabel = ts.techSpecialtySect.querySelector('label[for="dropdown"]');
				ts.resetSelection = ts.techSpecialtySect.querySelector('.tag-content .reset');
				//
				ts.selectL1();
				ts.selectL2();
				ts.selectL3();
				//
				ts.mobileDock();
				ts.reset();
				if(onComplete){onComplete();}
			},
			mobileDock:function(){
				var ts = indexPage.sectionTechSpeciality.teckStack;
				//
				window.addEventListener("scroll", function () {
					var rect = ts.techSpecialtySect.getBoundingClientRect();
					var techRect = ts.techSect.getBoundingClientRect();
					var techTop = techRect.top; 
					var techHeight = techRect.height; 
					var offset = techTop + techHeight;
					//
					if (rect.bottom <= offset) {
						ts.techSect.classList.add("hidden");
					} else {
						ts.techSect.classList.remove("hidden");
					}
				});
				//
				ts.techSect.addEventListener("click", function () {
					ts.techSect.classList.add("active");
					ts.dropdownCheckbox.checked = false;
				})
				document.addEventListener("click", function (event) {
					if (!ts.techSect.contains(event.target)) {
						ts.techSect.classList.remove("active");
					}
				});
				
			},
			selectL1: function() {
				var ts = indexPage.sectionTechSpeciality.teckStack;
				//
				for (var i = 0; i < ts.triggers.length; i++) {

					(function(trigger, index) {
						trigger.addEventListener("change", function(event) {
							console.log("changed")
							event.stopPropagation();
							// Clear active class from all tag-groups
							for (var j = 0; j < ts.tagContent.length; j++) {
								ts.tagContent[j].classList.remove("active");
							}

							// Add active class to the corresponding tag-group based on the index
							ts.tagContent[index].classList.add("active");

							if (window.innerWidth <= 769) {
								ts.dropdownCheckboxLabel.innerHTML = "Filtered by " + "<em><strong>" + trigger.nextElementSibling.textContent +"</strong></em>";
								ts.resetSelection.classList.add("show")
							}

						});
					})(ts.triggers[i], i); // Using IIFE to capture the correct `trigger` and `index`
				}
			},
			selectL2: function() {
				var ts = indexPage.sectionTechSpeciality.teckStack;
				//
				for (var i = 0; i < ts.tagGroups.length; i++) {
					(function(tagGroup) {
						tagGroup.addEventListener("click", function(event) {
							event.stopPropagation();
							if (event.pointerType !== "mouse" || event.button === 0) {
								// Remove active class from current L2 and L3 tags
								for (var j = 0; j < ts.tagGroups.length; j++) {
									ts.tagGroups[j].classList.remove("active");
									
									// Remove active class from all L3 tags not under the current L2
									var relatedL3Spans = ts.tagGroups[j].querySelectorAll(".tags span");
									for (var k = 0; k < relatedL3Spans.length; k++) {
										relatedL3Spans[k].classList.remove("active");
									}
								}

								// Add active class to the clicked L2 tag
								tagGroup.classList.add("active");

								// Check if the clicked L2 tag has active L3 tags, otherwise clear all L3
								var activeL3Spans = tagGroup.querySelectorAll(".tags span.active");
								if (activeL3Spans.length === 0) {
									for (var l = 0; l < ts.tagSpans.length; l++) {
										ts.tagSpans[l].classList.remove("active");
									}
								}

	
							}
						});
					})(ts.tagGroups[i]); // Using IIFE to maintain the correct reference for `tagGroup`
				}
			},
			selectL3: function() {
				var ts = indexPage.sectionTechSpeciality.teckStack;
				var pj = indexPage.sectionTechSpeciality.projects;
				//
				for (var i = 0; i < ts.tagSpans.length; i++) {
					(function(tag) {
						tag.addEventListener("click", function(event) {
							event.stopPropagation();
							if (event.pointerType !== "mouse" || event.button === 0) {
								// Remove active class from all spans
								for (var j = 0; j < ts.tagSpans.length; j++) {
									ts.tagSpans[j].classList.remove("active");
								}

								// If the clicked span has the 'close' class, remove active from all tag groups
								if (tag.classList.contains('close')) {
									for (var k = 0; k < ts.tagGroups.length; k++) {
										ts.tagGroups[k].classList.remove("active");
									}
									// Also show all projects when "close" is clicked
									pj.filterProjectsByTagName(null);
									//
								} else {
									tag.classList.add("active");
									ts.dropdownCheckbox.checked = false;
									//
									pj.filterProjectsByTagName(tag.textContent);
								}

								if (window.innerWidth <= 769) {
									ts.dropdownCheckboxLabel.innerHTML = "Filtered by " + "<em>" + tag.textContent + "</em>";
									ts.resetSelection.classList.add("show")
								}
							}
						});
					})(ts.tagSpans[i]); // Using IIFE to maintain the correct reference for `tag`
				}
			},
			reset: function(){
				var ts = indexPage.sectionTechSpeciality.teckStack;
				var pj = indexPage.sectionTechSpeciality.projects;
				//
				ts.resetSelection.addEventListener("click", function(event) {
					console.log("reset")
					ts.resetSelection.classList.remove("show")
					ts.dropdownCheckbox.checked = false;
					ts.dropdownCheckboxLabel.innerHTML = "Pick a tech to filter";
					//reset level 1s
					for (var j = 0; j < ts.tagContent.length; j++) {
						ts.tagContent[j].classList.add("active");
					}
					for (var k = 0; k < ts.triggers.length; k++) {
						ts.triggers[k].checked = false;
					}
					//reset level 3s
					for (var i = 0; i < ts.tagSpans.length; i++) {
						ts.tagSpans[i].classList.remove("active");
						pj.filterProjectsByTagName(null);
					}
				});
			}
		},
		projects: {
			projectContainer: null,
			projectListDataPath: "assets/projects.json",
			projectImageRoot: "assets/images/sections/tech-speciality/projects/",
			projectListData: null,
			init: function(){
				var ip = indexPage;
				var pj = ip.sectionTechSpeciality.projects;
				pj.projectContainer = document.querySelector("#speciality .projects");
				pj.loadProjects(function(){
					pj.projectPhotoLightbox.init();
					pj.projectKeyTakeawayPopupModal.init();
					pj.projectRemarksPopupModal.init();
				});
			},
			loadProjects: function(onComplete){
				var ip = indexPage;
				var pj = ip.sectionTechSpeciality.projects;
				//
				ip.utilities.network.xmlHttpRequest.sendRequest('GET', pj.projectListDataPath, 
					function(responseText, _xhr){
						console.log('Successfully requested for projectList data');
						try {
							pj.projectListData = ip.utilities.data.json.parseSanitized(responseText);
							for (var i = 1; i <= pj.projectListData[0].projects.length; i++) {
								var projectData = pj.getProjectDataByIndex(pj.projectListData[0], i);
								if (!ip.utilities.data.object.isEmpty(projectData)) {
									var projectContent = pj.createProject(
										pj.projectImageRoot + projectData.cover_image_filename, 
										projectData.name, 
										projectData.description, 
										{
											"website": projectData.url || null, 
											"source": projectData.source || null,
											"gallery": projectData.detailed_info.project_gallery || null,
											"takeaways": projectData.detailed_info.key_takeaways || null,
											"remarks": projectData.detailed_info.remarks || null,
										}, 
										projectData.tech_stack
									);
									pj.projectContainer.appendChild(projectContent);
									if(onComplete){onComplete();}
								}
								else{
									console.warn('Project #' + i + " do not exist.");
									if(onComplete){onComplete();}
								}
							}
						} catch (e) {
							console.error('Invalid JSON:', e);
							pj.projectContainer.innerHTML = ''
							pj.loadEmptyProjectsTemplate();
							if(onComplete){onComplete();}
							return;
						}
					},
					function(status, statusText, _xhr){
						console.error('Error:', status, statusText);
						pj.loadEmptyProjectsTemplate();
						if(onComplete){onComplete();}
					}
				);
			},
			getProjectDataByIndex: function(jsonData, index){
				var zeroBasedIndex = index - 1;
				//
				if(
					jsonData 
						&& jsonData.projects 
						&& jsonData.projects.length > zeroBasedIndex
				)
				{
					var projectObj = jsonData.projects[zeroBasedIndex];
					var projectDataList = projectObj.data;
					
					if(projectDataList && projectDataList.length > 0) {
						var projectData = projectDataList[0];
						return {
							name: projectObj.project,
							cover_image_filename: projectData.cover_image_filename,
							description: projectData.desc,
							url: projectData.url,
							source: projectData.source,
							tech_stack: projectData.tech_stack,
							detailed_info: projectData.detailed_info,
						};
					}
				}
				
				return {};
			},
			createProject: function(project_cover_img_src, project_title, project_desc, project_meta, project_tags){
				var pj = indexPage.sectionTechSpeciality.projects;
				//
				// Banner div with image
				var projectCover = document.createElement('div');
				projectCover.className = 'project-banner';
				var projectCoverImage = document.createElement('img');
				projectCoverImage.src = project_cover_img_src;
				projectCover.appendChild(projectCoverImage);

				// meta container
				var projectMeta = document.createElement('div');
				projectMeta.className = 'project-meta';
				//Meta icons
				console.log(project_meta)
				if(project_meta.website){
					var websiteLink = document.createElement('a');
					websiteLink.href = project_meta.website;
					websiteLink.target = "_blank";
					var websiteIcon = document.createElement('span');
					websiteIcon.className = 'meta-icons website';
					websiteIcon.setAttribute("title", "Visit " + project_title);
					websiteIcon.setAttribute("data-hover", "true");
					websiteIcon.setAttribute("data-hover-class", "hover-copy");
					websiteLink.appendChild(websiteIcon);
					projectMeta.appendChild(websiteLink);
				}
				if(project_meta.source){
					var githubLink = document.createElement('a');
					githubLink.href = project_meta.source;
					githubLink.target = "_blank";
					var githubIcon = document.createElement('span');
					githubIcon.className = 'meta-icons github';
					githubIcon.setAttribute("title", "View Code on GitHub");
					githubIcon.setAttribute("data-hover", "true");
					githubIcon.setAttribute("data-hover-class", "hover-copy");
					githubLink.appendChild(githubIcon);
					projectMeta.appendChild(githubLink);
				}
				if(project_meta.gallery){
					var lightboxTrigger = document.createElement('div');
					lightboxTrigger.className = 'lightbox-trigger';
					for (var i = 0; i < project_meta.gallery.length; i++) {
						project_meta.gallery[i].src = pj.projectImageRoot + project_meta.gallery[i].src;
					}
					lightboxTrigger.setAttribute("data-images", JSON.stringify(project_meta.gallery));
					var mediaIcon = document.createElement('span');
					mediaIcon.className = 'meta-icons media';
					mediaIcon.setAttribute("title", "View Project Images");
					mediaIcon.setAttribute("data-hover", "true");
					mediaIcon.setAttribute("data-hover-class", "hover-copy");
					lightboxTrigger.appendChild(mediaIcon);
					projectMeta.appendChild(lightboxTrigger);
				}
				if(project_meta.takeaways){
					var keyTakeawaysIcon = document.createElement('span');
					keyTakeawaysIcon.className = 'meta-icons keys';
					keyTakeawaysIcon.setAttribute("title", "View Key Takeaways");
					keyTakeawaysIcon.setAttribute("data-hover", "true");
					keyTakeawaysIcon.setAttribute("data-hover-class", "hover-copy");
					keyTakeawaysIcon.setAttribute("data-takeaways", JSON.stringify(project_meta.takeaways));
					projectMeta.appendChild(keyTakeawaysIcon);
				}
				if(project_meta.remarks){
					var keyRemarksIcon = document.createElement('span');
					keyRemarksIcon.className = 'meta-icons remarks';
					keyRemarksIcon.setAttribute("title", "Check Remarks");
					keyRemarksIcon.setAttribute("data-hover", "true");
					keyRemarksIcon.setAttribute("data-hover-class", "hover-copy");
					keyRemarksIcon.setAttribute("data-remarks", JSON.stringify(project_meta.remarks));
					projectMeta.appendChild(keyRemarksIcon);
				}

				// Description container
				var projectDesc = document.createElement('div');
				projectDesc.className = 'project-desc';
				var projectTitle = document.createElement('h4');
				projectTitle.textContent = project_title;
				var projectText = document.createElement('p');
				projectText.textContent = project_desc;
				projectDesc.appendChild(projectTitle);
				projectDesc.appendChild(projectText);

				// Tags container
				var projectTags = document.createElement('div');
				projectTags.className = 'project-tags';
				if (project_tags && Array.isArray(project_tags)) {
					for (var i = 0; i < project_tags.length; i++) {
						(function(tagID){
							var tagSpan = document.createElement('span');
							tagSpan.className = 'project-tag';

							if(/^tag_\d{3}$/.test(tagID)){
								indexPage.sectionTechSpeciality.tags.getTagByTagID(tagID, function(retrievedTag){
									tagSpan.textContent = retrievedTag;
								});
							} else {
									tagSpan.textContent = tagID;
							}
							projectTags.appendChild(tagSpan);
						})(project_tags[i]);
					}
				}

				// Details container
				var projectDetails = document.createElement('div');
				projectDetails.className = 'project-details';
				projectDetails.appendChild(projectDesc);
				projectDetails.appendChild(projectMeta);
				projectDetails.appendChild(projectTags);

				//Project div
				var projectDiv = document.createElement('div');
				projectDiv.className = 'project';
				projectDiv.appendChild(projectCover);
				projectDiv.appendChild(projectDetails);

				return projectDiv;
			},
			filterProjectsByTagName: function(tagName){
				var ip = indexPage;
				var pj = ip.sectionTechSpeciality.projects;
				var tse = ip.sectionTechSpeciality.techSpecialityEntry;
				//
				var projects = pj.projectContainer.querySelectorAll('.project');
				for (var i = 0; i < projects.length; i++) {
					var project = projects[i];

					// If tagName is null, show all projects
					if (!tagName) {
						project.style.display = '';
						continue; //jump to next project in loop
					}
					var projectTags = project.querySelectorAll('.project-tag');
					var hasTag = false;

					for (var j = 0; j < projectTags.length; j++) {
						if (projectTags[j].textContent === tagName) {
							hasTag = true;
							break;
						}
					}

					project.style.display = hasTag ? '' : 'none';
				}

				indexPage.utilities.layout.updateStickySectionBottom();

				// scroll into view after filtering
				if (tse.specialitySect) {
					// Traverse up until we find the nearest parent with class "section"
					var currentSection = tse.specialitySect;
					while (currentSection && !currentSection.classList.contains('section')) {
						currentSection = currentSection.parentNode;
					}

					// Now find the previous .section sibling
					var prevSection = currentSection ? currentSection.previousElementSibling : null;
					while (prevSection && !prevSection.classList.contains('section')) {
						prevSection = prevSection.previousElementSibling;
					}

					// Scroll to the bottom of the previous section
					if (prevSection) {
						var targetY = prevSection.offsetTop + prevSection.offsetHeight;
						indexPage.utilities.scroll.smoothScrollTo(targetY, 500);
					}
				}
			},
			loadEmptyProjectsTemplate: function(){
				var ip = indexPage;
				var pj = ip.sectionTechSpeciality.projects;
				//
				if (pj.projectContainer.querySelector('.error-img')) return;
				var img = document.createElement('img');
				img.className = 'error-img';
				img.src = 'assets/images/sections/tech-speciality/projects/error-load.png';
				img.alt = 'Error loading projects';
				pj.projectContainer.appendChild(img);
			},
			projectPhotoLightbox:{
				init: function(){
					var ip = indexPage;
					var pj = ip.sectionTechSpeciality.projects;
					pj.projectPhotoLightbox.openLightbox();
				},
				openLightbox: function(){
					var ip = indexPage;
					var pj = ip.sectionTechSpeciality.projects;
					var photoLightboxTriggers = document.querySelectorAll('.lightbox-trigger');
					for (var i = 0; i < photoLightboxTriggers.length; i++) {
						photoLightboxTriggers[i].addEventListener('click', function(e) {
							console.log("clicked")
							e.stopPropagation();
							var images;
							try {
								images = JSON.parse(this.getAttribute('data-images') || '[]');
							} catch(e) {
								images = [];
								console.log("error")
							}
							if (!images || !images.length) return;
							pj.projectPhotoLightbox.makeLightbox(images);
						});
					}
				},
				makeLightbox: function(images) {
					// Remove existing lightbox
					var lightbox = document.querySelector('.lightbox');
					if (lightbox) {
						lightbox.parentNode.removeChild(lightbox);
					}

					// Create new lightbox
					lightbox = document.createElement('div');
					lightbox.className = 'lightbox';
					lightbox.innerHTML = 
						'<div class="lightbox-content">' +
							'<img class="lightbox-img" src="" alt="">' +
							'<div class="lightbox-caption"></div>' +
						'</div>' +
						'<button class="nav prev" data-hover="true" data-hover-class="hover-none">&#10094;</button>' +
						'<button class="nav next" data-hover="true" data-hover-class="hover-none">&#10095;</button>' +
						'<button class="close" data-hover="true" data-hover-class="hover-none">&times;</button>';
					document.body.appendChild(lightbox);

					var imgEl = lightbox.querySelector('.lightbox-img');
					var captionEl = lightbox.querySelector('.lightbox-caption');
					var prevBtn = lightbox.querySelector('.prev');
					var nextBtn = lightbox.querySelector('.next');
					var closeBtn = lightbox.querySelector('.close');
					var currentIndex = 0;

					// Update arrows (disable at ends)
					function updateArrows() {
						prevBtn.disabled = currentIndex === 0;
						nextBtn.disabled = currentIndex === images.length - 1;

						prevBtn.style.opacity = prevBtn.disabled ? 0.3 : 1;
						nextBtn.style.opacity = nextBtn.disabled ? 0.3 : 1;
						prevBtn.style.cursor = prevBtn.disabled ? 'default' : 'pointer';
						nextBtn.style.cursor = nextBtn.disabled ? 'default' : 'pointer';
					}

					function showImage(index) {
						if (!images || !images.length) return;
						// Clamp index to valid range (non-looping)
						currentIndex = Math.max(0, Math.min(index, images.length - 1));
						imgEl.src = images[currentIndex].src;
						captionEl.textContent = images[currentIndex].caption || '';
						updateArrows();
					}

					prevBtn.addEventListener('click', function(e) {
						e.stopPropagation();
						if (currentIndex > 0) showImage(currentIndex - 1);
					});

					nextBtn.addEventListener('click', function(e) {
						e.stopPropagation();
						if (currentIndex < images.length - 1) showImage(currentIndex + 1);
					});

					// Close btn
					closeBtn.addEventListener('click', function(e) {
						e.stopPropagation();
						lightbox.parentNode.removeChild(lightbox);
					});

					showImage(0);
				}
			},
			projectKeyTakeawayPopupModal:{
				init: function() {
					var ip = indexPage;
					var pj = ip.sectionTechSpeciality.projects;
					var projectList = pj.projectContainer.querySelectorAll('.project');

					for (var i = 0; i < projectList.length; i++) {
							this.makePopupModal(projectList[i]);
					}
				},
				makePopupModal: function(project_parent) {
					// Check if modal already exists
					if (project_parent.querySelector('.pop-modal')) return;

					var popModalTrigger = project_parent.querySelector('.meta-icons.keys');

					if (!popModalTrigger) return;

					// Create popup modal
					var popupModal = document.createElement('div');
					popupModal.className = 'pop-modal';
					popupModal.innerHTML = `
							<h3 class="modal-title">Key Takeaways</h3>
							<ul class="modal-keys"></ul>
							<div class="modal-close">&times;</div>
					`;
					project_parent.appendChild(popupModal);

					// Populate key takeaways
					var takeaways;
					try {
							takeaways = JSON.parse(popModalTrigger.getAttribute('data-takeaways') || '[]');
					} catch (e) {
							takeaways = [];
					}

					var modalKeysList = popupModal.querySelector('.modal-keys');
					takeaways.forEach(function(tk) {
							var li = document.createElement('li');
							li.innerText = tk;
							modalKeysList.appendChild(li);
					});

					// Open modal on trigger click
					popModalTrigger.addEventListener('click', function(e) {
							e.stopPropagation();
							popupModal.classList.add('open');
					});

					// Close modal on close button click
					var closeBtn = popupModal.querySelector('.modal-close');
					closeBtn.addEventListener('click', function() {
							popupModal.classList.remove('open');
					});
				}				
			},
			projectRemarksPopupModal:{
				init: function() {
					var ip = indexPage;
					var pj = ip.sectionTechSpeciality.projects;
					var projectList = pj.projectContainer.querySelectorAll('.project');
					for (var i = 0; i < projectList.length; i++) {
						this.makeRemarksModal(projectList[i]);
					}
				},
				makeRemarksModal: function(project_parent) {
					// Check if modal already exists
					if (project_parent.querySelector('.remarks-modal')) return;

					var remarksModalTrigger = project_parent.querySelector('.meta-icons.remarks');

					if (!remarksModalTrigger) return;

					// Create popup modal
					var remarksModal = document.createElement('div');
					remarksModal.className = 'remarks-modal';
					remarksModal.innerHTML = `
							<h3 class="modal-title">Project Remarks</h3>
							<div class="remarks"></div>
							<div class="modal-close">&times;</div>
					`;
					project_parent.appendChild(remarksModal);

					// Populate remarks
					var remarks;
					try {
							remarks = JSON.parse(remarksModalTrigger.getAttribute('data-remarks') || '[]');
					} catch (e) {
							remarks = [];
					}

					var modalKeysList = remarksModal.querySelector('.remarks');
					remarks.forEach(function(remark) {
							var p = document.createElement('p');
							p.innerHTML = remark;
							modalKeysList.appendChild(p);
					});

					// Open modal on trigger click
					remarksModalTrigger.addEventListener('click', function(e) {
							e.stopPropagation();
							remarksModal.classList.add('open');
					});

					// Close modal on close button click
					var closeBtn = remarksModal.querySelector('.modal-close');
					closeBtn.addEventListener('click', function() {
							remarksModal.classList.remove('open');
					});
				}				
			}
			

		},
		tags:{
			tagListDataPath:  "assets/tags.json",
			tagListData: null,
			tagContent: null,
			init:function(onComplete){
				var ip = indexPage;
				var tg = ip.sectionTechSpeciality.tags;
				tg.tagContent = document.querySelector("#speciality .tag-content");
				tg.loadTags(function(){
					if(onComplete){onComplete();}
				});
			},
			loadTags: function(onComplete){
				var ip = indexPage;
				var tg = ip.sectionTechSpeciality.tags;
				//
				ip.utilities.network.xmlHttpRequest.sendRequest('GET', tg.tagListDataPath,
					function(responseText, _xhr){
						console.log('Successfully requested for tagList data');
						try {
							tg.tagListData = ip.utilities.data.json.parseSanitized(responseText);
							for (var i = 0; i <= tg.tagListData.length - 1; i++) {
                var tagData = tg.tagListData[i];
								tg.createTag(tagData, i+1);
							}
						} catch (e) {
							console.error('Invalid JSON:', e);
							return;
						}
					},
					function(status, statusText, _xhr){
						console.error('Error:', status, statusText);
					},
					function(){
						if(onComplete){onComplete();}
					}
				)
			},
			createTag: function(tagData, tagIndex){
				var ip = indexPage;
				var tg = ip.sectionTechSpeciality.tags;
				var sidebar = document.querySelector("#tech .sidebar .sidebar-wrapper");
				var tabButtons = sidebar.getElementsByClassName('tab-button');
				var tagGroup = null;
				//
				//check if tabButton already added
				for (var i = 0; i < tabButtons.length; i++) {
					var tabLabel = tabButtons[i].getElementsByTagName('label')[0];
					//if added, get tag group at same order position of tab button
					if (tabLabel && tabLabel.textContent === tagData.category) {
						tagGroup = tg.tagContent.getElementsByClassName('tag-group')[i];
						break;
					}
				}
				
				//create new tab button if tag group is empty (empty = current tab button not created yet)
				if (!tagGroup) {
					//
					var tabButton = document.createElement('div');
					tabButton.className = 'tab-button';

					// --- LEVEL 1 ---
					//tab trigger
					var tabTrigger = document.createElement('input');
					tabTrigger.type = 'radio';
					tabTrigger.className = 'tab-trigger';
					tabTrigger.id = 'trigger'+ tagIndex; //
					tabTrigger.name = 'techstack';
					tabTrigger.value = tagIndex; //

					//tab name
					var tabName = document.createElement('label');
					tabName.htmlFor = 'trigger' + tagIndex;     //
					tabName.className = 'tab-name';
					tabName.setAttribute('data-hover', 'true');
					tabName.setAttribute('data-hover-class', 'hover-filter');
					tabName.textContent = tagData.category;

					tabButton.appendChild(tabTrigger);
					tabButton.appendChild(tabName);
					sidebar.appendChild(tabButton);

					//tagGroup
					tagGroup = document.createElement('div');
					tagGroup.className = 'tag-group active';
					tg.tagContent.appendChild(tagGroup);
				}

				// --- LEVEL 2 ---
				//
				var tagsDiv = null;
				var closeBtn = null;
				var tagsDivs = tagGroup.getElementsByClassName('tags');
				//
				//check if tags div already added
				for (var j = 0; j < tagsDivs.length; j++) {
					var tagGroupName = tagsDivs[j].getElementsByTagName('h4')[0];
					//if added, get tagGroupName at same order position of tagsDiv
					if (tagGroupName && tagGroupName.textContent === tagData.subcategory) {
						tagsDiv = tagsDivs[j];
						break;
					}
				}

				//create new tag group base content if it isnt added yet
				if (!tagsDiv) {
					//tag group name
					var tagGroupName = document.createElement('h4');
					tagGroupName.setAttribute('tabindex', '0');
					tagGroupName.textContent = tagData.subcategory;
					//
					//close btn
					closeBtn = document.createElement('span');
					closeBtn.className = 'close';
					closeBtn.innerHTML = '&times;';
					//
					//tags div
					tagsDiv = document.createElement('div');
					tagsDiv.className = 'tags';
					tagsDiv.appendChild(tagGroupName);
					tagsDiv.appendChild(closeBtn);
					//
					tagGroup.appendChild(tagsDiv);
				}

				// --- LEVEL 3 ---
				//tagName
				var tagName = document.createElement('span');
				tagName.textContent = tagData.name;
				//
				if (!closeBtn) {
					closeBtn = tagsDiv.querySelector("#speciality .tags span.close");
				}
				tagsDiv.insertBefore(tagName, closeBtn);
				//
			},
			getTagByTagID: function(tagID, tagRetrieval){
				var ip = indexPage;
				var ut = ip.utilities;
				var tg = ip.sectionTechSpeciality.tags;
				//
				var tg = indexPage.sectionTechSpeciality.tags;
				if (tg.tagListData) {
						var tag = null;
						for (var i = 0; i < tg.tagListData.length; i++) {
								if (tg.tagListData[i].id === tagID) {
										tag = tg.tagListData[i].name;
										break;
								}
						}
						tagRetrieval(tag);
						return;
				}
				//
				ut.network.xmlHttpRequest.sendRequest("GET", tg.tagListDataPath, 
					function(responseText, _xhr){
						var tag = null;
						console.log('Successfully requested for tagList data');
						try {
							 var tagListData = JSON.parse(responseText);

							for (var i = 0; i < tagListData.length; i++) {
									if (tagListData[i].id === tagID) {
											tag = tagListData[i].name;
											break;
									}
							}
						} catch (e) {
							console.error('Invalid JSON:', e);
						}
						tagRetrieval(tag);
					},
					function(status, statusText, _xhr){
						console.error('Error:', status, statusText);
						tagRetrieval(null);
					}
				);
			}
		}
	},
	//
	// For storing location section elements, data, and behavior
	sectionLocation: {
		init: function () {
			var ip = indexPage;
			var sl = ip.sectionLocation;
			//
			sl.openingSlateEffect.init();
			sl.clockInfo.init();
			sl.scrollFadeColor.init();
			sl.travelPhoto.init();
		},
		openingSlateEffect: {
			globalPresence: null,
			bgStart: '#BCDCFF',
			init: function(){
				var ip = indexPage;
				var os = ip.sectionLocation.openingSlateEffect;
				//
				// Setup DOM refs 
				os.globalPresence = document.querySelector('.global-presence');
				os.openingSlate = document.querySelector('.opening-slate');
				//
				// Setup event listeners 
				os.onSlateLoad();
				os.onWindowScroll();
				if (!ip.utilities.system.isMobile()) {
					os.onWindowResize();
				}
			},
			//
			// Attach scroll event to update slate visuals
			onWindowScroll: function(){
				var os = indexPage.sectionLocation.openingSlateEffect;
				window.addEventListener("scroll", function () {
					os.updateSlateVisuals();
				});
			},
			//
			// Attach resize event to reset slate style and bg color
			onWindowResize: function(){
				var os = indexPage.sectionLocation.openingSlateEffect;
				window.addEventListener('resize', function () {
					os.updateSlateVisuals();
				});
			},
			//
			// Initial slate style setup on load
			onSlateLoad: function(){
				var os = indexPage.sectionLocation.openingSlateEffect;
				os.setSlateStyle(0, 1);
				os.globalPresence.style.backgroundColor = os.bgStart;
			},
			//
			// Apply border-radius and scale styles to slate and image background
			setSlateStyle: function(radius, scale){
				var os = indexPage.sectionLocation.openingSlateEffect;
				var imageBg = os.openingSlate.querySelector('.image-bg');
				os.openingSlate.style.borderRadius = radius + 'px';
				os.openingSlate.style.transform = 'scale(' + scale + ')';
				imageBg.style.transform = 'scale(' + (1 / scale) + ')';
			},
			//
			// Update slate border-radius, scale, and bg color based on scroll
			updateSlateVisuals: function(){
				var ip = indexPage;
				var os = ip.sectionLocation.openingSlateEffect;
				//
				var maxRadius = 40;
				var borderRadiusDuration = 300;
				var scaleDuration = 600;
				var minScale = (window.innerWidth - 160) / window.innerWidth;
				var globalPresenceTop = os.globalPresence.getBoundingClientRect().top;
				//
				if (globalPresenceTop > 0) {
					os.setSlateStyle(0, 1);
					os.globalPresence.style.backgroundColor = os.bgStart;
					return;
				}
				//
				var delta = Math.abs(globalPresenceTop);
				var totalDuration = borderRadiusDuration + scaleDuration;
				var progress = Math.min(delta / totalDuration, 1);
				var bgColor = ip.utilities.colors.lerpColor(os.bgStart, '#424242', progress);
				os.globalPresence.style.backgroundColor = bgColor;
				//
				if (delta <= borderRadiusDuration) {
					var radius = (delta / borderRadiusDuration) * maxRadius;
					os.setSlateStyle(radius, 1);
				} else if (delta <= totalDuration) {
					var scaleProgress = (delta - borderRadiusDuration) / scaleDuration;
					var scale = 1 - scaleProgress * (1 - minScale);
					os.setSlateStyle(maxRadius, scale);
				} else {
					os.setSlateStyle(maxRadius, minScale);
				}
			}
		},
		clockInfo: {
			init: function(){
				var sl = indexPage.sectionLocation;
				sl.clockInfo.makeTick();
				sl.clockInfo.makeDate();
			},
			//
			// Update clock every second showing GMT+8 time
			makeTick: function(){
				function updateGMT8Clock() {
					var now = new Date();
					var utc = now.getTime() + now.getTimezoneOffset() * 60000;
					var gmt8 = new Date(utc + 8 * 3600000);
					//
					function pad(num) {
						return (num < 10 ? '0' : '') + num;
					}

					var hours = pad(gmt8.getHours());
					var minutes = pad(gmt8.getMinutes());
					var seconds = pad(gmt8.getSeconds());

					var timeElem = document.querySelector(".time-data");
					if (timeElem) {
						timeElem.textContent = hours + " : " + minutes + " : " + seconds;
					}
				}
				//
				updateGMT8Clock();
				setInterval(updateGMT8Clock, 1000);
			},
			//
			// Show current date in Singapore timezone as "Weekday Day Month"
			makeDate: function(){
				var nowInSG = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Singapore' }));

				var weekday = nowInSG.toLocaleDateString('en-GB', { weekday: 'long' });
				var day = nowInSG.getDate();
				var month = nowInSG.toLocaleDateString('en-GB', { month: 'long' });

				var dateElem = document.querySelector(".date-data");
				if (dateElem) {
					dateElem.textContent = weekday + " " + day + " " + month;
				}
			}
		},
		scrollFadeColor: {
			init: function(){
				var sfc = indexPage.sectionLocation.scrollFadeColor;
				//
				sfc.fadeFromColor(".home-location .imagery", "#BCDCFF");
				sfc.fadeFromColor(".relocatable-location .imagery", "#ffbebe");
			},
			//
			// Setup fade effect from startHex to #424242 based on scroll progress
			fadeFromColor: function(elem, startHex) {
				var ip = indexPage;
				var sfc = ip.sectionLocation.scrollFadeColor;

				var section = document.querySelector(elem);
				if (!section) return;

				var end = { r: 66, g: 66, b: 66 };
				var start = ip.utilities.colors.hexToRgb(startHex);

				function updateBackground() {
					var progress = sfc.getScrollProgress(section);
					var r = ip.utilities.lerp(start.r, end.r, progress);
					var g = ip.utilities.lerp(start.g, end.g, progress);
					var b = ip.utilities.lerp(start.b, end.b, progress);
					section.style.backgroundColor = 'rgb(' + r + ',' + g + ',' + b + ')';
				}

				window.addEventListener('scroll', updateBackground);
				window.addEventListener('resize', updateBackground);
				updateBackground();
			},
			//
			// Calculate scroll progress [0..1] of section visible in viewport
			getScrollProgress: function(section) {
				var rect = section.getBoundingClientRect();
				var vh = window.innerHeight || document.documentElement.clientHeight;
				var progress = 0;

				if (rect.top < vh && rect.bottom > 0) {
					var visible = Math.min(vh, rect.bottom) - Math.max(0, rect.top);
					var total = Math.min(rect.height, vh);
					progress = visible / total;
				}

				return Math.min(Math.max(progress, 0), 1);
			}
		},
		travelPhoto: {
			init: function(){
				var tp = indexPage.sectionLocation.travelPhoto;
				//
				tp.syncPhotoMetaWidths();
				tp.onWindowResize();
				tp.showEalierFootprints();
			},
			// Attach resize event to sync photo captions width
			onWindowResize:function(){
				var tp = indexPage.sectionLocation.travelPhoto;
				window.addEventListener('resize', function () {
					tp.syncPhotoMetaWidths();
				});
			},
			// Set caption max width to match image width for all photos
			syncPhotoMetaWidths: function(){
				var travelPhotos = document.querySelectorAll('#location .gallery-item .photo');
				for (var i = 0; i < travelPhotos.length; i++) {
					var photo = travelPhotos[i];
					var img = photo.querySelector('img');
					var caption = photo.querySelector('.info');
					//
					if (img && caption) {
						var imgWidth = img.clientWidth;
						caption.style.maxWidth = imgWidth + 'px';
					}
				}
			},
			showEalierFootprints: function () {
				var ip = indexPage;
				var loadMore = document.querySelector('#location .travelled-location .load-more');
				var trips = document.querySelectorAll('#location .grid .trip');
				//
				loadMore.addEventListener('click', function () {
					var revealed = 0;
					var anyStillHidden = false;
					var firstNewlyRevealed = null;

					// Start from index 2 (the 3rd trip)
					for (var i = 2; i < trips.length; i++) {
						if (!trips[i].classList.contains('revealed')) {
							if (revealed < 2) {
								trips[i].classList.add('revealed');
								if (!firstNewlyRevealed) firstNewlyRevealed = trips[i];
								revealed++;
							} else {
								anyStillHidden = true;
								break;
							}
						}
					}

					if (!anyStillHidden) {
						loadMore.style.display = 'none';
					}

					if (firstNewlyRevealed) {
						var topY = firstNewlyRevealed.getBoundingClientRect().top + window.pageYOffset;
						
						ip.utilities.scroll.smoothScrollTo(topY, 1000);
					}
				});
			}
		}
	},
	utilities: {
		init:function(onComplete){
			var ut = indexPage.utilities;
			
			ut.scroll.disableInitialScrolling();
			ut.scroll.initialScrollPosReset();
			ut.layout.updateStickySectionBottom();
			ut.scroll.scrollSnap.init();
			//
			if(onComplete){onComplete();}
		},
		lerp: function(a, b, t) {
			return Math.round(a + (b - a) * t);
		},
		clipboard:{
			copyToClipboardFallback: function(text) {
				var textArea = document.createElement("textarea");
				textArea.value = text;
				// Avoid scrolling to bottom
				textArea.style.top = "0";
				textArea.style.left = "0";
				textArea.style.position = "fixed";
				//temp copy operation
				document.body.appendChild(textArea);
				textArea.focus();
				textArea.select();
				document.execCommand('copy');
				document.body.removeChild(textArea);
			},
			copyToClipboard: function(text) {
				var ut = indexPage.utilities
				if (!navigator.clipboard) {
					// Return a resolved Promise when using the fallback
					ut.clipboard.copyToClipboardFallback(text);
					return Promise.resolve();
				}
				return navigator.clipboard.writeText(text);
			},
			bindCopyElement: function(element){
				var ut = indexPage.utilities;
				//
				
				element.addEventListener('click', function(e) {
					if(e.target.classList.contains("copy-data")){
						var copyElement = e.target;
						var copyText = copyElement.textContent;
						var originalContent = copyElement.innerHTML;

						// save the width and text align
						var originalWidth = copyElement.getBoundingClientRect().width + "px";

						//set the width and text again
						copyElement.style.width = originalWidth;
						copyElement.style.textAlign = 'center';

						// Copy to clipboard
						ut.clipboard.copyToClipboard(copyText).then(function() {
							
							// Change the text to "Copied"
							copyElement.textContent = 'Copied!';
							copyElement.classList.add('copied');

							// Change back to the original text after 2 seconds
							setTimeout(function() {
								copyElement.innerHTML = originalContent;
								copyElement.classList.remove('copied');

								// Reset fixed styles
							copyElement.style.width = "";
							copyElement.style.textAlign = "";
							}, 2000);
						});
					}
				});
			},
		},
		colors: {
			hexToRgb: function(hex) {
				var cleanHex = hex.replace(/^#/, '');
				var bigint = parseInt(cleanHex, 16);
				return {
					r: (bigint >> 16) & 255,
					g: (bigint >> 8) & 255,
					b: bigint & 255
				};
			},
			rgbToHex: function(rgb) {
				function toHex(x) {
					var h = x.toString(16);
					return h.length === 1 ? "0" + h : h;
				}
				return "#" + toHex(rgb.r) + toHex(rgb.g) + toHex(rgb.b);
			},
			lerpColor: function(a, b, t) {
				var ip = indexPage;
				//
				var c1 = ip.utilities.colors.hexToRgb(a);
				var c2 = ip.utilities.colors.hexToRgb(b);
				//
				var r = ip.utilities.lerp(c1.r, c2.r, t);
				var g = ip.utilities.lerp(c1.g, c2.g, t);
				var b = ip.utilities.lerp(c1.b, c2.b, t);
				//
				return ip.utilities.colors.rgbToHex({ r: r, g: g, b: b });
			}
		},
		multimedia:{
			imaging:{
				validateImage: function(source, success, failure){
					var img = new Image();
					img.onload = success; 
					img.onerror = function(){
						console.error("Invalid Image: ", source)
						if(failure){failure();}
					};
					img.src = source;
				}
			}
		},
		data: {
			json:{
				parseSanitized: function(jsonString, reviver){
					if (typeof jsonString !== 'string') {
						throw new TypeError('First argument must be a string');
					}

					var sanitized = jsonString
						// Remove /* block comments */
						.replace(/\/\*[\s\S]*?\*\//g, '')
						// Remove // line comments
						.replace(/(^|\s)\/\/[^\n\r]*/g, '');

					return JSON.parse(sanitized, reviver);
				}
			},
			object:{
				isEmpty: function(obj){
					for (var key in obj) {
						if (obj.hasOwnProperty(key)) {
							return false; 
						}
					}
					return true;
				}
			}
		},
		layout:{
			updateStickySectionBottom: function() {
				var lo = indexPage.utilities.layout;
				var sections = document.querySelectorAll('.section');
				var viewportHeight = window.innerHeight;

				for (var i = 0; i < sections.length; i++) {
					var section = sections[i];
					var sectionHeight = section.getBoundingClientRect().height;

					if (sectionHeight > viewportHeight) {
						section.style.bottom = "-" + (sectionHeight - viewportHeight) + "px";
					} else {
						section.style.bottom = "";
					}
				}
				// Attach watcher once (store flag so it doesn't re-attach every time)
				if (!lo.updateStickySectionBottom._watching) {
						lo.updateStickySectionBottom._watching = true;

						var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

						if (MutationObserver) {
								var observer = new MutationObserver(function() {
										lo.updateStickySectionBottom();
								});
								observer.observe(document.body, { childList: true, subtree: true });
						} else {
								// IE fallback
								document.body.addEventListener('DOMNodeInserted', lo.updateStickySectionBottom);
								document.body.addEventListener('DOMNodeRemoved', lo.updateStickySectionBottom);
						}
				}
			},
			getViewportHeight: function(){
				return Math.max(
					document.documentElement.clientHeight,
					window.innerHeight || 0
				);
			}
		},
		scroll: {
			disableInitialScrolling: function(){
				//
				//TODO: For debug, uncomment
				if(indexPage.isDebugMode){
					document.documentElement.style.overflowY = '';
					document.body.style.overflowY = "auto";
				}
				else{
					document.documentElement.style.overflowY = 'hidden';
					document.body.style.overflowY = 'hidden';
				}
			},
			initialScrollPosReset: function(){
					//start page scroll at top
				if ('scrollRestoration' in history) {
					history.scrollRestoration = 'manual';
				}
				window.scrollTo(0, 0);
				//
			},
			smoothScrollTo: function(y, duration){
				var startY = window.pageYOffset || document.documentElement.scrollTop;
				var distance = y - startY;
				var startTime = new Date().getTime();

				duration = typeof duration === 'number' ? duration : 500;

				function easeInOutQuad(t) {
					return t < 0.5
						? 2 * t * t
						: -1 + (4 - 2 * t) * t;
				}
				function scroll() {
					var now = new Date().getTime();
					var time = Math.min(1, ((now - startTime) / duration));
					var eased = easeInOutQuad(time);

					window.scrollTo(0, Math.ceil((eased * distance) + startY));

					if (time < 1) {
						requestAnimationFrame(scroll);
					}
				}
				scroll();
			},
			scrollSnap:{
				sections: null,
				init: function(){
					var ip = indexPage;
					var ss = ip.utilities.scroll.scrollSnap;
					ss.sections = document.querySelectorAll('.section');
					ss.wheelScroll.init()
					ss.touchScroll.init()
				},
				wheelScroll: {
					isSnapping: false,
					epsilon: 2, // pixel buffer for edge tests
					init: function(){
						var ip = indexPage;
						var ss = ip.utilities.scroll.scrollSnap;
						var supportsPassive = false;
						try {
							var opts = Object.defineProperty({}, 'passive', {
								get: function() { supportsPassive = true; }
							});
							window.addEventListener('dummy_event', null, opts);
							window.removeEventListener('dummy_event', null, opts);
						} catch (e) {}

						var wheelOpts = supportsPassive
							? { passive: false, capture: true }
							: true;

						window.addEventListener('wheel', ss.wheelScroll.onWheel, wheelOpts);
						window.addEventListener('mousewheel', ss.wheelScroll.onWheel, wheelOpts);
					},
					clampAndSnap: function(delta){
						var ip = indexPage;
						var ss = ip.utilities.scroll.scrollSnap;
						var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
						var viewportHeight = ip.utilities.layout.getViewportHeight();
						var idx       = ss.getCurrentIndex(scrollTop);
						var start     = ss.sumHeightBefore(ss.sections[idx]);
						var height    = ss.sections[idx].offsetHeight;
						var end       = start + height;
						var threshU   = start;
						var threshD   = end - viewportHeight;

						// immediate snap for short sections
						if (height <= viewportHeight + ss.wheelScroll.epsilon) {
							if (delta > 0 && idx < ss.sections.length - 1) {
								ss.wheelScroll.isSnapping = true;
								ip.utilities.scroll.smoothScrollTo(
									ss.sumHeightBefore(ss.sections[idx + 1]),
									600
								);
								setTimeout(function() { ss.wheelScroll.isSnapping = false; }, 650);
								return;
							}
							if (delta < 0 && idx > 0) {
								ss.wheelScroll.isSnapping = true;
								var prevEnd = ss.sumHeightBefore(ss.sections[idx - 1]) + ss.sections[idx - 1].offsetHeight;
								var upPos   = Math.max(prevEnd - viewportHeight, 0);
								ip.utilities.scroll.smoothScrollTo(upPos, 600);
								setTimeout(function() { ss.wheelScroll.isSnapping = false; }, 650);
								return;
							}
							return;
						}

						// clamp inside the section
						var target = scrollTop + delta;
						if (target < threshU) target = threshU;
						if (target > threshD) target = threshD;
						window.scrollTo(0, target);

						// snap DOWN on bottom edge
						if (
							delta > 0 &&
							target >= threshD - ss.wheelScroll.epsilon &&
							idx < ss.sections.length - 1
						) {
							ss.wheelScroll.isSnapping = true;
							ip.utilities.scroll.smoothScrollTo(end, 600);
							setTimeout(function() { ss.wheelScroll.isSnapping = false; }, 650);
							return;
						}

						// snap UP on top edge
						if (
							delta < 0 &&
							target <= threshU + ss.wheelScroll.epsilon &&
							idx > 0
						) {
							ss.wheelScroll.isSnapping = true;
							var prevEnd = ss.sumHeightBefore(ss.sections[idx - 1]) + ss.sections[idx - 1].offsetHeight;
							var upPos = Math.max(prevEnd - viewportHeight, 0);
							ip.utilities.scroll.smoothScrollTo(upPos, 600);
							setTimeout(function() { ss.wheelScroll.isSnapping = false; }, 650);
							return;
						}
					},
					onWheel: function(e){
						var ip = indexPage;
						var ss = ip.utilities.scroll.scrollSnap;

						// ✅ NEW: allow native scroll inside scrollable elements
						var target = e.target;
						while (target && target !== document.body) {
								const style = window.getComputedStyle(target);
								const overflowY = style.overflowY;
								const canScroll = overflowY === 'auto' || overflowY === 'scroll';
								const hasScroll = target.scrollHeight > target.clientHeight;

								if (canScroll && hasScroll) {
										// let native scroll happen
										return;
								}
								target = target.parentElement;
						}
						
						var delta = e.deltaY !== undefined ? e.deltaY : -e.wheelDelta;
						var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
						var viewportHeight = ip.utilities.layout.getViewportHeight();
						var lastIdx = ss.sections.length - 1;
						var lastStart = ss.sumHeightBefore(ss.sections[lastIdx]);
						var lastEnd = lastStart + ss.sections[lastIdx].offsetHeight;
						var threshLast = lastEnd - viewportHeight;

						// 1) if snapping in progress, block everything
						if (ss.wheelScroll.isSnapping) {
							e.preventDefault();
							return;
						}

						// 2) if at bottom-edge of last section and scrolling down, bail out
						if (delta > 0 && scrollTop >= threshLast - ss.wheelScroll.epsilon) {
							return;
						}

						// 3) otherwise hijack scroll, clamp + snap
						e.preventDefault();
						ss.wheelScroll.clampAndSnap(delta);
					}
				},
				touchScroll: {
					isTouchScrollDebug: false,
				  // states
					STATE_LOCKED: 0,
					STATE_ARMED: 1,
					STATE_WAITING: 2,
					STATE_UNLOCKED: 3,
  				// mutable vars
					state: null,
					direction: 0, // –1 = down, +1 = up
					pointerId: null,
					startY: 0,
					startScroll: 0,
					deltaY: 0,
					isFrozen: false,
					lastSnap: 0,
					snapDur: 600,
					eps: 2,
					// momentum tracking
					velocityY: 0, // px per ms
					lastMoveY: 0,
					lastMoveTime: 0,
					init: function(){
						var ip = indexPage;
						var ss = ip.utilities.scroll.scrollSnap;
						ss.touchScroll.state = ss.touchScroll.STATE_LOCKED;
						//
  					document.documentElement.style.touchAction = 'none';
						window.addEventListener('pointerdown',   ss.touchScroll.onPointerDown,   false);
						window.addEventListener('pointermove',   ss.touchScroll.onPointerMove,   false);
						window.addEventListener('pointerup',     ss.touchScroll.onPointerUp,     false);
						window.addEventListener('pointercancel', ss.touchScroll.onPointerUp,     false);
						if(ip.isDebugMode && ss.touchScroll.isTouchScrollDebug){
							ss.touchScroll.debugMode.init();
						}
					},
					clampY: function(rawY){
						var ip = indexPage;
						var ss = ip.utilities.scroll.scrollSnap;
						var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
						var idx  = ss.getCurrentIndex(scrollTop);
						var viewportHeight = ip.utilities.layout.getViewportHeight();
						var top  = ss.sumHeightBefore(ss.sections[idx]);
						var maxY = top + ss.sections[idx].offsetHeight - viewportHeight;

						var isLast   = idx === ss.sections.length - 1;
						var atBottom = scrollTop >= maxY - ss.touchScroll.eps;

						if (isLast && atBottom) return rawY;
						return Math.min(Math.max(rawY, top), maxY);
					},
					onPointerDown: function(e){
						var ip = indexPage;
						var ss = ip.utilities.scroll.scrollSnap;

						// ignore mouse pointers so normal clicks work
						if (e.pointerType === 'mouse') return;

						// ✅ Allow native scroll inside scrollable elements
						var target = e.target;
						while (target && target !== document.body) {
								const style = window.getComputedStyle(target);
								const overflowY = style.overflowY;
								const canScroll = overflowY === 'auto' || overflowY === 'scroll';
								const hasScroll = target.scrollHeight > target.clientHeight;

								if (canScroll && hasScroll) {
										return; // skip hijack
								}
								target = target.parentElement;
						}

						if (ss.touchScroll.pointerId !== null) return;
						ss.touchScroll.pointerId = e.pointerId;

						// safe capture: only for non-mouse, wrapped in try/catch
						try {
							if (document.setPointerCapture) document.documentElement.setPointerCapture(ss.touchScroll.pointerId);
						} catch (err) {
							ss.touchScroll.pointerId = null;
							return;
						}

						ss.touchScroll.startY = e.clientY;
						ss.touchScroll.startScroll = window.pageYOffset || document.documentElement.scrollTop;
						ss.touchScroll.deltaY = 0;
						ss.touchScroll.isFrozen = false;

						// reset momentum tracking
						ss.touchScroll.velocityY = 0;
						ss.touchScroll.lastMoveY = e.clientY;
						ss.touchScroll.lastMoveTime = Date.now();

						var idx = ss.getCurrentIndex(ss.touchScroll.startScroll);
						if (idx === 0) {
							ss.touchScroll.state = ss.touchScroll.STATE_UNLOCKED;
						} else if (ss.touchScroll.state !== ss.touchScroll.STATE_WAITING) {
							ss.touchScroll.state = ss.touchScroll.STATE_LOCKED;
							ss.touchScroll.direction = 0;
						}
					},
					onPointerMove: function(e){
						var ip = indexPage;
						var ss = ip.utilities.scroll.scrollSnap;
						if (e.pointerId !== ss.touchScroll.pointerId || ss.touchScroll.isFrozen) return;

						// ✅ Allow native scroll inside scrollable elements
						var target = e.target;
						while (target && target !== document.body) {
								const style = window.getComputedStyle(target);
								const overflowY = style.overflowY;
								const canScroll = overflowY === 'auto' || overflowY === 'scroll';
								const hasScroll = target.scrollHeight > target.clientHeight;

								if (canScroll && hasScroll) {
										return; // skip hijack
								}
								target = target.parentElement;
						}


						var now = Date.now();
						var dy  = e.clientY - ss.touchScroll.lastMoveY;
						var dt  = now - ss.touchScroll.lastMoveTime;
						if (dt > 0) ss.touchScroll.velocityY = dy / dt;
						ss.touchScroll.lastMoveY    = e.clientY;
						ss.touchScroll.lastMoveTime = now;

						ss.touchScroll.deltaY = e.clientY - ss.touchScroll.startY;
						if (Math.abs(ss.touchScroll.deltaY) < 1) return;

						var rawY      = ss.touchScroll.startScroll - ss.touchScroll.deltaY;
						var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
						var idx       = ss.getCurrentIndex(scrollTop);
						var top       = ss.sumHeightBefore(ss.sections[idx]);
						var viewportHeight = ip.utilities.layout.getViewportHeight();
						var bottom    = top + ss.sections[idx].offsetHeight - viewportHeight;
						var atTop     = scrollTop <= top + ss.touchScroll.eps;
						var atBottom  = scrollTop >= bottom - ss.touchScroll.eps;
						var lastIndex = ss.sections.length - 1;
						var isLast    = idx === lastIndex;

						var secH = ss.sections[idx].offsetHeight;
						if (Math.abs(secH - viewportHeight) <= ss.touchScroll.eps) {
							if (ss.touchScroll.deltaY > 0) {
								atTop    = true;
								atBottom = false;
							} else if (ss.touchScroll.deltaY < 0) {
								atTop    = false;
								atBottom = true;
							}
						}

						var clampedY = ss.touchScroll.clampY(rawY);
						var allowFooterScroll = isLast && rawY > clampedY + ss.touchScroll.eps;

						switch (ss.touchScroll.state) {
							case ss.touchScroll.STATE_LOCKED:
								if (
									(atBottom && ss.touchScroll.deltaY <= -1 && idx < lastIndex) ||
									(atTop    && ss.touchScroll.deltaY >=  1 && idx > 0)
								) {
									ss.touchScroll.state = ss.touchScroll.STATE_ARMED;
									ss.touchScroll.direction = atBottom ? -1 : +1;
								}
								window.scrollTo(0, allowFooterScroll ? rawY : clampedY);
								break;

							case ss.touchScroll.STATE_ARMED:
								window.scrollTo(0, allowFooterScroll ? rawY : clampedY);
								if (
									(ss.touchScroll.direction === -1 && atBottom) ||
									(ss.touchScroll.direction === +1 && atTop)
								) {
									ss.touchScroll.state = ss.touchScroll.STATE_WAITING;
								}
								break;

							case ss.touchScroll.STATE_WAITING:
								window.scrollTo(0, allowFooterScroll ? rawY : clampedY);
								if (
									(ss.touchScroll.direction === -1 && atBottom && ss.touchScroll.deltaY <= -1) ||
									(ss.touchScroll.direction === +1 && atTop    && ss.touchScroll.deltaY >=  1)
								) {
									ss.touchScroll.state = ss.touchScroll.STATE_UNLOCKED;
								}
								break;

							case ss.touchScroll.STATE_UNLOCKED:
								var nowTs  = Date.now();
								var target = idx;
								if (idx < lastIndex && atBottom && ss.touchScroll.deltaY <= -1) {
									target = idx + 1;
								} else if (idx > 0 && atTop && ss.touchScroll.deltaY >= 1) {
									target = idx - 1;
								}

								if (target !== idx && nowTs - ss.touchScroll.lastSnap >= ss.touchScroll.snapDur) {
									ss.touchScroll.lastSnap = nowTs;
									ss.touchScroll.isFrozen = true;

									var scrollToY = target > idx
										? ss.sumHeightBefore(ss.sections[target])
										: ss.sumHeightBefore(ss.sections[target]) + ss.sections[target].offsetHeight - viewportHeight;

									ss.touchScroll.state = ss.touchScroll.STATE_LOCKED;
									ss.touchScroll.direction = 0;
									ip.utilities.scroll.smoothScrollTo(scrollToY, 600);
								} else {
									window.scrollTo(0, rawY);
								}
								break;
						}
					},
					onPointerUp: function(e){
						var ip = indexPage;
						var ss = ip.utilities.scroll.scrollSnap;
						if (ss.touchScroll.pointerId !== null) {
							try {
								if (document.hasPointerCapture && document.hasPointerCapture(ss.touchScroll.pointerId)) {
									document.documentElement.releasePointerCapture(ss.touchScroll.pointerId);
								} else if (document.releasePointerCapture) {
									document.documentElement.releasePointerCapture(ss.touchScroll.pointerId);
								}
							} catch (err) {
								// ignore
							} finally {
								ss.touchScroll.pointerId = null;
							}
						}

						// preserve existing state transitions
						if (ss.touchScroll.state === ss.touchScroll.STATE_ARMED) {
							ss.touchScroll.state = ss.touchScroll.STATE_WAITING;
						} else if (ss.touchScroll.state !== ss.touchScroll.STATE_UNLOCKED) {
							ss.touchScroll.state     = ss.touchScroll.STATE_LOCKED;
							ss.touchScroll.direction = 0;
						}

						ss.touchScroll.deltaY = 0;
						ss.touchScroll.isFrozen = false;

						// ─── momentum for oversized sections ────────────────────────────────────
						var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
						var idx       = ss.getCurrentIndex(scrollTop);
						var secH      = ss.sections[idx].offsetHeight;
						var viewportHeight = ip.utilities.layout.getViewportHeight();
						if (secH > viewportHeight + ss.touchScroll.eps && Math.abs(ss.touchScroll.velocityY) > 0.01) {
							// convert px/ms to px/frame (~16ms)
							var vFrame    = ss.touchScroll.velocityY * 16;
							var decay     = 0.95;
							var topBound  = ss.sumHeightBefore(ss.sections[idx]);
							var botBound  = topBound + secH - viewportHeight;

							function momentumStep() {
								if (Math.abs(vFrame) < 0.5) return;

								var current = window.pageYOffset || document.documentElement.scrollTop;
								var nextY   = current - vFrame;

								// 🔁 Recalculate index live
								var liveIdx     = ss.getCurrentIndex(current);
								var isLast      = liveIdx === ss.sections.length - 1;
								var topBound    = ss.sumHeightBefore(ss.sections[liveIdx]);
								var secH        = ss.sections[liveIdx].offsetHeight;
								var viewportHeight = ip.utilities.layout.getViewportHeight();
								var botBound    = topBound + secH - viewportHeight;
								
								var atBottomNow = nextY > botBound + ss.touchScroll.eps;

								// ✅ Allow free scroll into footer if we're past last section
								if (isLast && atBottomNow) {
									window.scrollTo(0, nextY);
									vFrame *= decay;
									requestAnimationFrame(momentumStep);
									return;
								}

								// Clamp within section bounds
								if (nextY < topBound) {
									window.scrollTo(0, topBound);
									return;
								}
								if (nextY > botBound) {
									window.scrollTo(0, botBound);
									return;
								}

								window.scrollTo(0, nextY);
								vFrame *= decay;
								requestAnimationFrame(momentumStep);
							}


							
							momentumStep();
						}

						// reset momentum
						ss.touchScroll.velocityY = 0;
					},
					debugMode: {
						indicator: null,
						logState: null,
						logDir: null,
						logDelta: null,
						logEdge: null,
						logSnap: null,
						_polling: false,
						_rafId: null,
						_lastSnapSeen: null,
						init: function(){
							var ip = indexPage;
							var ss = ip.utilities.scroll.scrollSnap;
							var dm = ss.touchScroll.debugMode;
							if (dm.indicator) return;
							dm.indicator = document.createElement('div');
							Object.assign(dm.indicator.style, {
								position: 'fixed',
								top: '0px',
								left: '0px',
								width: '100vw',
								height: '100vh',
								pointerEvents: 'none',
								border: '4px solid white',
								zIndex: 9999,
								boxSizing: 'border-box',
								display: 'flex',
								flexDirection: 'column',
								padding: '8px',
								fontSize: '12px',
								color: 'black',
								background: 'rgba(255,255,255,0.1)'
							});
							document.body.appendChild(dm.indicator);
							dm.logState = dm._createLog('log-state');
							dm.logDir   = dm._createLog('log-dir');
							dm.logDelta = dm._createLog('log-delta');
							dm.logEdge  = dm._createLog('log-edge');
							dm.logSnap  = dm._createLog('log-snap');
							dm._startPolling();
						},
						destroy: function(){
							var ip = indexPage;
							var ss = ip.utilities.scroll.scrollSnap;
							var dm = ss.touchScroll.debugMode;
							if (!dm.indicator) return;
							dm._stopPolling();
							dm.indicator.parentNode.removeChild(dm.indicator);
							dm.indicator = dm.logState = dm.logDir = dm.logDelta = dm.logEdge = dm.logSnap = null;
							dm._lastSnapSeen = null;
						},
						_createLog: function(id){
							var el = document.createElement('div');
							el.id = 'dbg-' + id;
							el.style.marginBottom = '4px';
							el.textContent = '—';
							this.indicator.appendChild(el);
							return el;
						},
						_startPolling: function(){
							var ip = indexPage;
							var ss = ip.utilities.scroll.scrollSnap;
							var dm = ss.touchScroll.debugMode;
							if (dm._polling) return;
							dm._polling = true;
							function loop(){
								if (!dm._polling) return;
								try {
									if (ss && ss.sections && ss.sections.length) {
										var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
										var idx = ss.getCurrentIndex(scrollTop);
										var viewportHeight = ip.utilities.layout.getViewportHeight();
										var top = ss.sumHeightBefore(ss.sections[idx]);
										var secH = ss.sections[idx].offsetHeight;
										var bottom = top + secH - viewportHeight;
										var atTop = scrollTop <= top + ss.touchScroll.eps;
										var atBottom = scrollTop >= bottom - ss.touchScroll.eps;
										var state = ss.touchScroll.state;
										var dir = ss.touchScroll.direction;
										var delta = ss.touchScroll.deltaY || 0;
										var snapshot = {
											stateName: ['LOCKED','ARMED','WAITING','UNLOCKED'][state],
											direction: dir,
											deltaY: delta,
											atTop: !!atTop,
											atBottom: !!atBottom,
											idx: idx
										};
										var newBorder = 'white';
										if (Math.abs(secH - viewportHeight) <= ss.touchScroll.eps) {
											newBorder = 'purple';
										} else {
											if (state === ss.touchScroll.STATE_LOCKED) {
												newBorder = (atTop || atBottom) ? 'orange' : 'white';
											} else if (state === ss.touchScroll.STATE_ARMED) {
												newBorder = 'orange';
											} else if (state === ss.touchScroll.STATE_WAITING) {
												newBorder = 'orange';
												if ((ss.touchScroll.direction === -1 && atBottom && ss.touchScroll.deltaY <= -1) ||
														(ss.touchScroll.direction === +1 && atTop && ss.touchScroll.deltaY >= 1)) {
													newBorder = 'green';
												}
											} else if (state === ss.touchScroll.STATE_UNLOCKED) {
												var lastIndex = ss.sections.length - 1;
												var target = idx;
												if (idx < lastIndex && atBottom && ss.touchScroll.deltaY <= -1) target = idx + 1;
												else if (idx > 0 && atTop && ss.touchScroll.deltaY >= 1) target = idx - 1;
												if (target !== idx) {
													newBorder = 'red';
													snapshot.snap = target;
													dm._lastSnapSeen = Date.now();
												} else if (ss.touchScroll.isFrozen) {
													newBorder = 'red';
												} else {
													newBorder = 'white';
												}
											}
										}
										dm.logState.textContent = 'STATE → ' + (snapshot.stateName || '');
										dm.logDir.textContent   = 'DIR   → ' + (snapshot.direction == null ? '' : snapshot.direction);
										dm.logDelta.textContent = 'ΔY    → ' + Math.round(snapshot.deltaY);
										dm.logEdge.textContent  = 'EDGE  → top:' + snapshot.atTop + ' bottom:' + snapshot.atBottom + ' idx:' + snapshot.idx;
										if (snapshot.snap != null) dm.logSnap.textContent = 'SNAP → ' + snapshot.snap;
										else dm.logSnap.textContent = 'SNAP →';
										dm.indicator.style.borderColor = newBorder;
										if (dm._lastSnapSeen) {
											(function(mark){
												setTimeout(function(){
													if (dm._lastSnapSeen === mark) {
														dm._lastSnapSeen = null;
													}
												}, ss.touchScroll.snapDur || 600);
											})(dm._lastSnapSeen);
										}
									}
								} catch (e){}
								dm._rafId = requestAnimationFrame(loop);
							}
							dm._rafId = requestAnimationFrame(loop);
						},
						_stopPolling: function(){
							var dm = indexPage.utilities.scroll.scrollSnap.touchScroll.debugMode;
							dm._polling = false;
							if (dm._rafId) {
								cancelAnimationFrame(dm._rafId);
								dm._rafId = null;
							}
						}
					}
				},
				sumHeightBefore: function(el){
					var ip = indexPage;
					var ss = ip.utilities.scroll.scrollSnap;
					var sum = 0;
					for (var i = 0; i < ss.sections.length; i++) {
						if (ss.sections[i] === el) break;
						sum += ss.sections[i].offsetHeight;
					}
					return sum;
				},
				getCurrentIndex: function(scrollTop) {
					var ip = indexPage;
					var ss = ip.utilities.scroll.scrollSnap;
					for (var i = 0; i < ss.sections.length; i++) {
						var start = ss.sumHeightBefore(ss.sections[i]);
						var end   = start + ss.sections[i].offsetHeight;
						if (scrollTop >= start && scrollTop < end) return i;
					}
					return ss.sections.length - 1;
				}
			},
		},
		system:{
			isMobile: function(){
				var isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
				if (isMobile) {
					return true;
				}
				else{
					return false;
				}
			},
			isIE: function(){
				var ua = window.navigator.userAgent; //Check the userAgent property of the window.navigator object
				var msie = ua.indexOf('MSIE '); // IE 10 or older
				var trident = ua.indexOf('Trident/'); //IE 11
				return (msie > 0 || trident > 0);
			},
		},
		network: {
			xmlHttpRequest:{
				sendRequest: function(method, url, onSuccess, onError, onComplete, data, headers) {
					method = method.toUpperCase();

					if (method !== 'GET' && method !== 'POST' && method !== 'HEAD') {
						console.error('Unsupported HTTP method: ' + method);
						if (onComplete) onComplete();
						return;
					}

					var xhr = new XMLHttpRequest();
					xhr.open(method, url, true);

					if (headers && typeof headers === 'object') {
						for (var key in headers) {
							if (headers.hasOwnProperty(key)) {
								xhr.setRequestHeader(key, headers[key]);
							}
						}
					}

					xhr.onload = function() {
						if (xhr.status >= 200 && xhr.status < 300) {
							if (onSuccess) onSuccess(xhr.responseText, xhr);
						} else {
							if (onError) onError(xhr.status, xhr.statusText, xhr);
						}
					};

					xhr.onerror = function() {
						if (onError) onError(xhr.status, xhr.statusText, xhr);
					};

					xhr.onloadend = function() {
						if (onComplete) onComplete(xhr);
					};

					if (method === 'POST') {
						xhr.send(data || null);
					} else {
						xhr.send();
					}
				}
			},
		},


		// getSingaporeTime: function() {
		// 	var now = new Date();
		// 	var utc = now.getTime() + now.getTimezoneOffset() * 60000;
		// 	var singaporeTime = new Date(utc + (8 * 3600000)); // UTC+8 for Singapore

		// 	var hour = singaporeTime.getHours();
		// 	var minute = singaporeTime.getMinutes();
		// 	var ampm = hour >= 12 ? 'PM' : 'AM';

		// 	hour = hour % 12 || 12; // Convert to 12-hour format
		// 	minute = minute < 10 ? '0' + minute : minute; // Ensure two digits

		// 	return "<span class='hour'>" + hour + "</span><span class='tick'>:</span><span class='hour'>" + minute + "</span><span class='time-suffix'>" + ampm + "</span>";
		// },
		// updateTimeElement: function(timeElement){
		// 	var ut = indexPage.utilities;
		// 	//
		// 	if (timeElement.timeInterval) {
		// 		clearInterval(timeElement.timeInterval);
		// 	}

		// 	// Update the time immediately
		// 	timeElement.innerHTML = ut.getSingaporeTime();

		// 	// Start updating the time every second
		// 	timeElement.timeInterval = setInterval(function() {
		// 		timeElement.innerHTML = ut.getSingaporeTime();
		// 	}, 1000);
		// }
	}
};

// Document ready
window.addEventListener("load", function () {
	indexPage.init();
});
