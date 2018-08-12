$(window).load(function() {
	game.init();	
});
var game = {
	init: function(){
		$('.gamelayer').hide();
		$('#gamestartscreen').show();

		game.canvas = $('#gamecanvas')[0];
		game.context = game.canvas.getContext('2d');
	},
}
