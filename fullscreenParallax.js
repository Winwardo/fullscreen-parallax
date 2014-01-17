/*
The MIT License (MIT)

Copyright (c) 2014 Topher Winward

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

/**
 * The Fullscreen Parallax script
 * By Topher Winward (@Winwardo), 2014
 * http://winwardo.co.uk
 * Version 0.1.1
 *
 * The latest version of this script can be found at http://github.com/Winwardo/fullscreen-parallax
 */

function fullscreenParallax () {
	var $window = $(window);

	$('.parallax').each(function() { // Grab each parallax element
		var $this = $(this);
		var xSpeed = $this.data('background-speed-x');
		var ySpeed = $this.data('background-speed-y');
		var align = $this.data("parallax-align");
		var stickx = $this.data("parallax-stick-x");
		var sticky = $this.data("parallax-stick-y");
		var offsetx_percent = $this.data("parallax-offset-x-percent") / 100;
		var offsety_percent = $this.data("parallax-offset-y-percent") / 100;
		var heightmult = $this.data("parallax-height") / 100;

		if (xSpeed === null || xSpeed === undefined) { xSpeed = 0; }
		if (ySpeed === null || ySpeed === undefined) { ySpeed = 1; }

		if (isNaN(offsetx_percent)) { offsetx_percent = 0; }
		if (isNaN(offsety_percent)) { offsety_percent = 0; }

		if (isNaN(heightmult)) { heightmult = 1; }

		// Hold the CSS values here before applying them
		var sectionCSS = {};

		// Set up the background image. We want to hook it into place with "fixed" and make sure it uses as much space as possible with "cover".
		if (ySpeed !== 1) { // Don't do this if this isn't meant to parallax on the y, otherwise you can see jumpiness
			sectionCSS["background-attachment"] = "fixed";
		}
		sectionCSS["background-size"] = "cover";

		// If specified, load the background image in
		if ($this.data("parallax-image")) { 
			sectionCSS["background-image"] = "url(" + $this.data("parallax-image") + ")";
		}

		// Set the CSS values
		$this.css(sectionCSS);

		// Attach a scroll event to each section
		$window.scroll(function() {
			var xPosition = 0, yPosition = 0;
			var scrollPos = $window.scrollTop();
			var thisY = $this.offset().top;
			var calcX = false, calcY = false;
			var windowHeight = $window.height() * heightmult;

			// Do we want to calculate the x position?
			if (xSpeed !== 0) {
				if (stickx === "before") {
					// Will this image "stick" in place once it's reached it?
					if (scrollPos < thisY) {
						calcX = true;
					}
				} else if (stickx === "after") {
					// Will this image "stick" in place once it's reached it?
					if (scrollPos > thisY) {
						calcX = true;
					}
				} else {
					calcX = true;
				}
			}
			if (calcX) {
				xPosition = (thisY - scrollPos) * xSpeed;
			}

			// Calculate a new y value if it's scrolling
			if (ySpeed !== 1) {
				if (sticky === "before") {
					// Will this image "stick" in place once it's reached it?
					if (scrollPos < thisY) {
						calcY = true;
					}
				} else if (sticky === "after") {
					// Will this image "stick" in place once it's reached it?
					if (scrollPos > thisY) {
						calcY = true;
					}
				} else {
					calcY = true;
				}
			}
			if (calcY) {
				yPosition = (thisY - scrollPos) * ySpeed + (windowHeight * offsety_percent);				
			} 

			// Offset by one window to make the image align to the bottom, rather than the top
			if (align === "bottom") {
				yPosition += windowHeight;
			}

			// Center align, and offset by the y position
			$this.css({ "background-position": xPosition + "px " + yPosition + "px"})
		});
	});

	// When the window resizes, make the parallax sections resize accordingly
	$(window).resize(function() {
		// $('.parallax').css({
		$('.parallax').each(function() {
			var $this = $(this);

			var heightmult = $this.data("parallax-height") / 100;
			if (isNaN(heightmult)) { heightmult = 1; }

			$this.css({height: $window.height() * heightmult});
		});
			// height: function(e, i, o) { console.log(o); return $window.height() }
		// });

		// And force a scroll to update all the images
		$(window).scroll();

	});

	// Kick it all into action
	$(window).resize();
}