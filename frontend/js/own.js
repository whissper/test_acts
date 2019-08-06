
$(document).ready(function() {
	
	
	$(document).on('click', '.btn-sub', function(){
		var jsonObj = {
			"docDate" 			: $('#docDate').val().trim(),
			"docTown" 			: $('#docTown option:selected').text(),
			"agentRank" 		: $('#agentRank option:selected').text(),
			"agentFio" 			: $('#agentFio').val().trim(),
			"customer" 			: $('#consumerName').val().trim(),
			"customerAddress" 	: $('#consumerAddress').val().trim(),
			"object" 			: $('#objectName').val().trim(),
			"address" 			: $('#objectAddress').val().trim(),
			"date" 				: $('#indicationDate').val().trim()
		};
		
		$('#json1').val(JSON.stringify(jsonObj));
		$('#printtype1').val($(this).attr('printtype'));
		$('#form1').submit();
	});
	
	$(document).on('click', '.back-to-log', function(){
		window.location = 'http://kom-es01-app25:8888/exitlog/';
	});
	
});