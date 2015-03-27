/*============================================================================*\

	A PNG Opacity Work-Around for Internet Explorer
	-----------------------------------------------------------------------
	© 2015 by Carroket, Inc.
	http://www.carroket.com/
	-----------------------------------------------------------------------
	Made by Brian Sexton.
	http://www.briansexton.com/
	-----------------------------------------------------------------------
	MIT License

\*============================================================================*/

function stylePNGs() {

	if (window.navigator.appName && window.navigator.appName == "Microsoft Internet Explorer" && document.body.filters) {

		var containerNode;

		var imageToReplace;

		var newElement;

		var PNGs = [];

		// Find all PNG IMG elements in the document.

		for (var i = 0; i < document.images.length; i++) {

			if (document.images[i].src.indexOf('.png') == document.images[i].src.length - 4) {

				PNGs[PNGs.length] = document.images[i];
			}
		}

		// Replace all PNG IMG elements with DIV elements to which Microsoft's
		// suggested work-around are applied.

		for (var j = 0; j < PNGs.length; j++) {

			containerNode = PNGs[j].parentNode;

			imageToReplace = PNGs[j];

			newElement = document.createElement('div');

			newElement.style.width = imageToReplace.width;
			newElement.style.height = imageToReplace.height;
			newElement.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + imageToReplace.src + "', sizingMethod='scale');";

			newElement.className = imageToReplace.className;

			containerNode.replaceChild(newElement, imageToReplace);
		}
	}
}