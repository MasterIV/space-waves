define([
		'lib/scene',
		'basic/button',
		'core/game',
		'geo/v2',
		'transitions/slideinright',
		'transitions/slideinleft',
		'basic/morph', 'definition/easing',
		'basic/layout',
		'core/graphic',
		'entity/background'
	], function (Scene, Button, game, V2, SlideInRightTransition, SlideInLeftTransition, Morph, Easing, Layout, g, Bg) {
		// g.add('img/main_btn_back.png');
		// g.add('img/main_btn_back_hover.png');
		// g.add('img/main_btn_continue.png');
		// g.add('img/main_btn_continue_hover.png');

		g.add('img/main_btn_credits.png');
		g.add('img/main_btn_credits_hover.png');
		g.add('img/main_btn_start.png');
		g.add('img/main_btn_start_hover.png');
		g.add('img/main_btn_continue.png');
		g.add('img/main_btn_continue_hover.png');
		g.add('img/main_btn_help.png');
		g.add('img/main_btn_help_hover.png');
		g.add('img/full_screen_button.png');

		function MenuScene() {
			Scene.call(this);
			var self = this;

			this.add(new Bg(this.size));

			this.playButton = Button.create(new V2(0, 680), function() {
				document.getElementById('game_music').play();

				game.scene = require('config/scenes').play;
			}).img('img/main_btn_start.png').highlight('img/main_btn_start_hover.png');

			this.continueButton = Button.create(new V2(0, 680), function() {
				self.vLayout.addfirst(self.playButton);
				self.vLayout.remove(self.continueButton);

				document.getElementById('pause_music').currentTime = 0;
				document.getElementById('pause_music').pause();
				document.getElementById('game_music').play();

				game.scene = require('config/scenes').play;
			}).img('img/main_btn_continue.png').highlight('img/main_btn_continue_hover.png');

			var creditsButton = Button.create(new V2(0, 680), function() {
				game.scene = new SlideInRightTransition(require('config/scenes').credits, 1000, Easing.OUTQUAD);
			}).img('img/main_btn_credits.png').highlight('img/main_btn_credits_hover.png');

			var helpButton = Button.create(new V2(0, 680), function() {
				game.scene = new SlideInLeftTransition(require('config/scenes').help, 1000, Easing.OUTQUAD);
			}).img('img/main_btn_help.png').highlight('img/main_btn_help_hover.png');

			//this.bg = 'img/main_bg.jpg';

			this.vLayout = new Layout.vertical(new V2(0, 280), 0, 0);
			this.vLayout.add(this.playButton);
			this.vLayout.add(creditsButton);
			this.vLayout.add(helpButton);
			this.center(this.vLayout);

			this.add(Button.create(new V2(1160, 20), function() {
				self.toggleFullScreen();
			}).img('img/full_screen_button.png'));
		}

		MenuScene.prototype = new Scene();

		MenuScene.prototype.toggleFullScreen = function() {
			if (!document.fullscreenElement &&    // alternative standard method
				!document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
				if (document.body.requestFullscreen) {
					document.body.requestFullscreen();
				} else if (document.body.msRequestFullscreen) {
					document.body.msRequestFullscreen();
				} else if (document.body.mozRequestFullScreen) {
					document.body.mozRequestFullScreen();
				} else if (document.body.webkitRequestFullscreen) {
					document.body.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
				}
			} else {
				if (document.exitFullscreen) {
					document.exitFullscreen();
				} else if (document.msExitFullscreen) {
					document.msExitFullscreen();
				} else if (document.mozCancelFullScreen) {
					document.mozCancelFullScreen();
				} else if (document.webkitExitFullscreen) {
					document.webkitExitFullscreen();
				}
			}
		};

		MenuScene.prototype.gamePaused = function () {
			this.vLayout.addfirst(this.continueButton);
			this.vLayout.remove(this.playButton);

			document.getElementById('game_music').pause();
			document.getElementById('pause_music').play();
		};

		return MenuScene;
	}
);
