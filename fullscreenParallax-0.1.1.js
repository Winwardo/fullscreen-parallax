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

		// Set up the background image. We want to hook it into place with "fixed" and make sure it uses as much space as possible with "cover".
		$this.css({
			"background-image": "url(" + $this.data("parallax-image") + ")",
			"background-attachment": "fixed",
			"background-size": "cover",
		});

		// Attach a scroll event to each section
		$window.scroll(function() {
			// Calculate background position
			var yPosition = ($this.offset().top - $window.scrollTop()) * $this.data('background-speed');

			// Offset by one window to make the image stick to the bottom, rather than the top
			if ($this.data("parallax-stick") === "bottom") {
				yPosition += $window.height();
			}

			// Center align, and offset by the y position
			$this.css({ "background-position": "50% " + yPosition + "px"})
		});
	});

	// When the window resizes, make the parallax sections resize accordingly
	$(window).resize(function() {
		$('.parallax').css({
			height: $window.height()
		});

		// And force a scroll to update all the images
		$(window).scroll();

	});

	// Kick it all into action
	$(window).resize();
}