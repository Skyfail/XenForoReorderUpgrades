(function($){
	if($(window).width() < 950) {
		return; //doesn't look good on small devices
	}
	
	var $section = $('.primaryContent.upgrade');
	var titleObjects = {};
		
	//Serialize upgrades
	$section.each(function(){
		var $title = $(this).children('.upgradeMain').children('h4.title').text();
		if($title.indexOf(' | ') !== -1) {
			var productName = $title.split(' | ')[0];
			
			if(typeof(titleObjects[productName]) === 'undefined') {
				titleObjects[productName] = { 
					sections: [ this ]
				};
			} else {
				titleObjects[productName]['sections'].push(this);
			}
		}
	});
		
	//Reorder upgrades
	$.each(titleObjects, function(key, val){
		if(val['sections'].length > 1) {
			//More than one upgrade here
			//Add the upgradeForm of every upgrade to the first element
			var firstElement = val['sections'][0];
			
			for(var i = 1; i < val['sections'].length; i++) {
				var section = val['sections'][i];
				var $upgradeForm = $(section).children('.upgradeForm');
				var $oldUpgradeElement = $upgradeForm.parent();
				
				//Add "Lifetime" indicator
				var $cost = $upgradeForm.children('.cost');
				if($cost.text().indexOf(' for ') === -1) {
					$cost.text($cost.text() + ' Lifetime');
				}
				
				//Move element to the first upgradeForm
				$(firstElement).prepend($upgradeForm);
				
				//Remove the old upgrade section
				$oldUpgradeElement.remove();
			}
			
			$(firstElement).children('.upgradeMain').children('h4.title').text(key);
		}
	});
})(jQuery);