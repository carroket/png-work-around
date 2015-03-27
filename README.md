# A PNG Opacity Work-Around for Internet Explorer

This is an ancient PNG work-around that is useless now, but perhaps historically interesting.

## Abstract

Microsoft Internet Explorer 6 for Windows does not support variable opacity in PNG images as most actively developed Web browsers do, so I found and further developed a work-around for this peculiar omission.

Microsoft is aware of the problem and suggests a work-around in Microsoft Knowledge Base [Article 294714](http://support.microsoft.com/en-us/kb/294714).

Microsoft suggests using a DIV element with the following style definition rather than using an IMG element:

```css
filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='image.png', sizingMethod='scale');
```

Unfortunately, Microsoft's work-around for its non-standard PNG rendering is itself non-standard, but by implementing it via JavaScript rather than directly in a stylesheet, it can be restricted to Internet Explorer, ensuring that other Web browsers and CSS validators will not be bothered by Microsoft's non-standard CSS "filter" property.

## My Method

If the client identifies itself as "Microsoft Internet Explorer", all PNG images in the document are replaced by DIV elements to which the non- standard CSS "filter" property in Microsoft's suggested work-around is applied, using the same corresponding source images as the original IMG elements.  The resulting DIV elements are given the same widths, heights, and CSS class names as the original IMG elements.

## General Notes

PNG IMG elements are replaced ONLY if the client identifies itself as "Microsoft Internet Explorer" since other popular Web browsers support variable PNG transparency without work-arounds.

When linked PNG IMG elements are replaced by DIV elements, Internet Explorer 6 for Windows honors the original links with the new elements.

Positioning might not be correct after replacements are made.  I would prefer to position replacement elements automatically, but Internet Explorer 6 cannot read a value from the position property of an IMG element's style property via JavaScript.  This is, however, easily handled via CSS since a class name is automatically created for each replacement element.

Alternate text is obviously not copied from IMG elements to DIV elements.

Internet Explorer 6 does not make image properties available when an image is displayed as part of an element other than an IMG element.

If PNG images are loaded before the work-around is executed, the user will obviously be able to see Internet Explorer's incorrect PNG opacity rendering briefly before the work-around is executed.

Clients that falsely identify themselves as "Microsoft Internet Explorer" may successfully replace IMG elements with DIV elements, but if they do not support Microsoft's non-standard "filter" property, they may generate error messages and/or display empty DIV elements.

## Possible Enhancement Notes

It may be desirable to add JavaScript tooltips for DIV elements to replace Internet Explorer's IMG element alternate text boxes.

It may be desirable to duplicate onclick and mouseover events.

One may wish to discriminate between different versions of Internet Explorer (AlphaImageLoader was implemented in Internet Explorer 5.5 while this work-around is not necessary for Internet Explorer 5.0 or later for Mac OS X as that version of Internet Explorer offers full support for variable PNG opacity), but I am not inclined to spend a great deal of time worrying about either obsolete and discontinued Web browsers.

## Usage

First, load this file in each HTML file that you would like to use the work-around:

```html
<SCRIPT TYPE="text/javascript" SRC="./png_work-around.js"></SCRIPT>
```

If you do not need to run any other JavaScript code that automatically assigns an event handler to the window.onload event, you can just put the following in the opening BODY tag for each page:

```html
onLoad="stylePNGs();"
```

However, if you forget that you are assigning an event handler to the window.onload event directly within your HTML, you may find yourself wondering what happened later after you install something else and end up with an event handler conflict.  One way to prevent such conflicts is to initialize all of your JavaScript code in a single common file.  To that end, I have created such a file--start.js--which accompanies this file and includes its own easy usage instructions.  Please refer to it for more information.

Finally, create CSS styles for the resulting DIV elements.  For example, if you already have a style definition for "IMG.MenuItem", you will want to create a similar one for "DIV.MenuItem".  For your PNG images that are linked, you may want to add "cursor: pointer" since Internet Explorer 6 does not by default use the pointer cursor over linked DIV elements.

## History

### Sunday, January 4, 2004

The first version of this work-around was created.

### Tuesday, January 13, 2004

The usage documentation was updated to include information about avoiding potential window.onload event handler conflicts.  The functional code was not altered except for a single curly brace being moved to line up vertically with its counterpart, so the version number was not changed.

### Friday, June 25, 2004

Internet Explorer-specific "filters" array checking was added to the initial execution condition to prevent user agents masquerading as Internet Explorer (Opera, etc.) from executing the work-around.

### Friday, March 27, 2015

Tidy up the script, including explicitly declaring some variables that should have been so declared eleven years ago.

## Who made this?

Clever Contact was made by [Brian Sexton](http://briansexton.com/) of [Carroket, Inc.](http://carroket.com/)
