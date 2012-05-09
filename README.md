# jQuery DropDown Select Menu #

A simple drop down select menu. Created on the basis of the standard jQuery UI elements. The list items can be expressed using any HTML elements.


Copyright 2012 Lukasz Gradzki

Dual licensed under the MIT or GPL Version 2 licenses


## Usage ##

* Include required libs and CSS files (of course, it's better to use your custom jQUery UI themes and libraries):

```html
<link href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" rel="stylesheet" type="text/css"/>`
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js"></script>
<script type="text/javascript" src="jquery.dropdownselect.js"></script>

```

* Create the HTML element that is going to be an anchore for the menu:

```html
<body>
...
	<div id="my_dropdown_menu"></div>
...
</body>
```



* Create the DropDownSelect instance on desired DOM element (settings must be an object):

```html
<script type="text/javascript">
	var settings = {choices: [...], ... };
	$(document).ready(function () {
		$('#my_dropdown_menu').DropDownSelect(settings);
	});
</script>

```

## Options ##

* And that's it! Well, before that is good to customize the DropDownSelec settings. Here are the possible options:

`button` - if true, the anchor HTML element will be additionally converted into the jQuery button widget
`change_element` - if true, the anchor HTML element will be converted into the jQuery menu widget
`choices` - the array of objects that represent the possible choices offered in the menu. Each choice is an object that with two attributes: `id` - defines unique ID of the choice, `label` - is the displayed label of the choice.
`css` - additional css attributes applied on the menu elements. By default:
`initial` – ID of the menu element that will be selected durin the initialization
`initial_index` - initial option can be specified using it's index position in the menu (the first option has the index 0)
`initial_value` - initial option can be specified using it's value
`open` – the event that triggers the menu (by default it's 'click')

```js
css: {
	element: {
		'cursor': 'pointer', 
		'min-width': 165
	},
	ul:{
		'display': 'none', 
		'position': 'absolute',
		'min-width': 165
	},
	li: {
		'cursor': 'pointer'
	},
	a: {
		'font-weight': 'normal'
	}
}
```
`before` - if true, the menu is inserted in DOM before the anchor element

NOTE: From the following options only ONE option should be set at once: `initial`, `initial_index`, `initial_value`. In case more than one option is specified, `initial_value` is preferred before `initial_index` and `initial`.


## Methods ##

* The plugin offers the folowing methods:

`get_default_settings` - returns the object with default settings
`close` - close the menu
`open` - open the menu
`selected` - returns the ID of the currently selected item
`selected_label` - returns the label of the currently selected item
`replace_item(index, new_item)` - replaces the item with the index `index` with the `new_item` (must be a DOM element)

## Example usage ##
```js
$('#my_dropdown_menu').DropDownSelect({
	initial_value: 0,  // ID of the menu element that is displayed initially
	choices: [
		{id: 0, label: 'First item'},
		{id: 2, label: '<img src="some_icon.jpg">Second item'}, 
	]
});
var selected_item = $('#my_dropdown_menu').DropDownSelect('selected'); // get ID of the selected item
```

Enjoy!
