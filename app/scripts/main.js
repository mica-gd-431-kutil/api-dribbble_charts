'use strict';

/*
Self Executing function
(function (){
	
})();
*/

(function ($) {
    var getEntries,
        parseEntries,
        displayEntries,
        makeMap,
        likesArr = [];

    getEntries = function getEntriesF() {
        var req,
        	form = $('#search');
        	
        form.on('submit', function (e) {
	       e.preventDefault();
	       
	       var value = $('#search-field').val();
			
		   req = $.ajax({
	            url: 'http://api.dribbble.com/players/' + value + '/shots',
	            dataType: 'jsonp',
	            type: 'GET'
	        });
	
	        req.done(parseEntries);
	        
	        req.error(function (data, error){
		        alert(error);
	        });	       
	        
        });

    };

    parseEntries = function parseEntriesF(data) {
        var i = 0,
            shots = data.shots;


        for (i = shots.length; i--;) {
            likesArr.push({
                value: shots[i].likes_count,
                color: '#ccc'
            });
        }

        displayEntries();
    };

    displayEntries = function displayEntriesF() {
        var ctx = document.getElementById('myChart').getContext('2d'),
            polarChart = new Chart(ctx).Doughnut(likesArr);

    };

    getEntries();

})(jQuery);
