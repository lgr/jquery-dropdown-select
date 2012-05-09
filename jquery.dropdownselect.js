(function( $ ){
	var element_name = "DropDownSelect";
	var default_settings = {
		open: 'click',
		selected: null,
		initial: null,
		initial_index: 0,
		initial_value: null, // initial_value has priority over initial_index
		change_element: true,
		button: false,
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
		},
		before: false	// Insert UL before the element
 	};
	var methods = {
 		init : function( options ) {
 			this.each(function(){
 				var settings = jQuery.extend(true, {}, default_settings);
 				var $this = $(this),
 					data = $this.data('DropDownSelect');
 				if (data)
 					settings = data;
       			if(options)
    				$.extend(true, settings, options);
    			settings.selected = settings.initial;
    			settings.id = ($('.' + element_name).length + 1);
    			$this.addClass(element_name).css(settings.css.element)
    			if(settings.change_element)
    				$this.menu();
			if(settings.button)
				$this.button();
    			var ul = $('<ul></ul>').css(settings.css.ul).attr('id',settings.id);
    			for(var i in settings.choices){
    				var li = $('<li></li>').css(settings.css.li).attr('id', settings.choices[i].id);
    				var a = $('<a></a>').attr('href','#').css(settings.css.a).append(settings.choices[i].label);
    				if (i == settings.initial){
    					a.css('font-weight','bold');
    				}
    				a.click(function(e){
    					e.preventDefault();
						ul.find('a').css('font-weight','normal');
						var data = $this.data('DropDownSelect');
						var current = $(this).parent('li').attr('id');
						var selected = data.selected; 
						data.selected = current;
						$this.data('DropDownSelect', data);
						if (selected != current)
							$this.change();
						if (settings.change_element)
							$this.html($(this).removeClass('ui-state-hover').css('font-weight','bold').html());
						ul.slideToggle('fast');
					});
    				ul.append(li.append(a));
    				if (settings.initial_value && settings.choices[i].id == settings.initial_value){
    					$this.empty().append(settings.choices[i].label);
    					settings.selected = li.attr('id');
    				}
    			}
    			$('html').click(function(e){
  					if (ul.is(':visible'))
  						ul.slideUp('fast');
  				});
    			if (settings.selected == null){
    				var index = 0;
    				if (settings.initial_index != null && settings.initial_index < settings.choices.length)
    					index = settings.initial_index;
    				if (settings.change_element)
    					$this.empty().append(settings.choices[index].label);
    				settings.selected = settings.choices[index].id;
    			}
    			ul.find('li').each(function(){
    				if ($(this).attr('id') == settings.selected)
    					$(this).children('a').css('font-weight','bold');
    			});
    			if (settings.before)
    				$this.before(ul.menu());
    			else
    				$this.after(ul.menu());
    			settings.list = ul;
    			$this.data('DropDownSelect', settings);
    			$this.bind(settings.open, function(e){
    				e.preventDefault();
    				e.stopPropagation();
    				$(this).DropDownSelect('open');
    			});
       		});
       		return this;
       	},
       	destroy : function( ) {
       		return this.each(function(){
       			var $this = $(this);
       			$.removeData($this,'DropDownSelect');
       			$this.unbind();
       		});
       	},
       	get_default_settings: function() {return default_settings},
       	close: function() {
       		var $this = $(this),
       			settings = $this.data('DropDownSelect');
       		ul.slideUp('fast');
       	},
       	open: function() {       		
       		var $this = $(this),
       			settings = $this.data('DropDownSelect');
       		settings.list.slideToggle('fast',function(){
    			$(this).css('zIndex', 999);
    		});
		    return this;
       	},
       	close: function() {              
            var $this = $(this),
                settings = $this.data('DropDownSelect');
            settings.list.slideUp('fast');
            return this;
        },
       	selected: function(){
       		var $this = $(this),
       			settings = $this.data('DropDownSelect');
       		return settings.selected;
       	},
       	selected_label: function(){
       		var $this = $(this),
       			settings = $this.data('DropDownSelect');
       		var ret = null;
       		settings.list.find('li').each(function(){
       			if ($(this).attr('id') == settings.selected)
       				ret = $(this).find('a').html();
       		});
       		return ret;
       	},
       	replace_item: function(index, new_item){
       	    var $this = $(this),
                settings = $this.data('DropDownSelect');
            settings.list.find('li').each(function(){
                if ($(this).attr('id') == index)
                    $(this).empty().append(new_item);
            });
       	}
	};
	$.fn.DropDownSelect = function( method ) {
		if ( methods[method] ) {
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.DropDownSelect' );
		}
	};
})( jQuery );
