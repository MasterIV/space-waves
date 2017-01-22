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
		'entity/background',
		'entity/volumemeter',
		'basic/image'
	], function (Scene, Button, game, V2, SlideInRightTransition, SlideInLeftTransition, Morph, Easing, Layout, g, Bg, VolumeMeter, ImageEntity) {
		// g.add('img/main_btn_back.png');
		// g.add('img/main_btn_back_hover.png');
		// g.add('img/main_btn_continue.png');
		// g.add('img/main_btn_continue_hover.png');

		g.add('img/gui/main_btn_credits.png');
		g.add('img/gui/main_btn_credits_hover.png');
		g.add('img/gui/main_btn_start.png');
		g.add('img/gui/main_btn_start_hover.png');
		g.add('img/gui/main_btn_continue.png');
		g.add('img/gui/main_btn_continue_hover.png');
		g.add('img/gui/main_btn_restart.png');
		g.add('img/gui/main_btn_restart_hover.png');
		g.add('img/gui/main_btn_help.png');
		g.add('img/gui/main_btn_help_hover.png');
		g.add('img/gui/main_btn_options.png');
		g.add('img/gui/main_btn_options_hover.png');
		g.add('img/main_bg.png');
		g.add('img/gui/full_screen_button.png');
		g.add('img/gui/opt_screen_button.png');

		function MenuScene() {
			Scene.call(this);
			var self = this;

			this.add(new Bg(this.size));
			this.add(new ImageEntity(Zero(), 'img/main_bg.png'));

			this.playButton = Button.create(new V2(0, 680), function () {
				document.getElementById('menu_music').pause();
				document.getElementById('game_music').play();

				game.scene = require('config/scenes').play;
			}).img('img/gui/main_btn_start.png').highlight('img/gui/main_btn_start_hover.png');

			this.continueButton = Button.create(new V2(0, 680), function () {
				self.vLayout.addfirst(self.playButton);
				self.vLayout.remove(self.continueButton);
				self.vLayout.remove(self.restartButton);

				document.getElementById('pause_music').currentTime = 0;
				document.getElementById('pause_music').pause();
				document.getElementById('game_music').play();

				game.scene = require('config/scenes').play;
			}).img('img/gui/main_btn_continue.png').highlight('img/gui/main_btn_continue_hover.png');

			this.restartButton = Button.create(new V2(0, 680), function () {
				self.vLayout.remove(self.restartButton);

				game.scene = require('config/scenes').play;
			}).img('img/gui/main_btn_restart.png').highlight('img/gui/main_btn_restart_hover.png');

			var creditsButton = Button.create(new V2(0, 680), function () {
				game.scene = new SlideInRightTransition(require('config/scenes').credits, 1000, Easing.OUTQUAD);
			}).img('img/gui/main_btn_credits.png').highlight('img/gui/main_btn_credits_hover.png');

			var helpButton = Button.create(new V2(0, 680), function () {
				game.scene = new SlideInLeftTransition(require('config/scenes').help, 1000, Easing.OUTQUAD);
			}).img('img/gui/main_btn_help.png').highlight('img/gui/main_btn_help_hover.png');


			// var optionsButton = Button.create(new V2(1160, 607), function () {
			// 	self.toggleOptions();
			// }).img('img/gui/main_btn_options.png').highlight('img/gui/main_btn_options_hover.png');
			//
			// //this.bg = 'img/main_bg.jpg';
			// this.layoutClean = new Layout.vertical(new V2(0, 280), 0, 0);
			// this.layoutPaused = new Layout.vertical(new V2(0, 280), 0, 0);

			this.vLayout = new Layout.vertical(new V2(0, 280), 0, 0);
			this.vLayout.add(this.playButton);
			this.vLayout.add(creditsButton);
			this.vLayout.add(helpButton);
			this.center(this.vLayout);

			this.add(Button.create(new V2(1160, 20), function () {
				self.toggleFullScreen();
			}).img('img/gui/full_screen_button.png'));

			this.add(Button.create(new V2(1160, 607), function () {
				self.toggleOptions();
			}).img('img/gui/opt_screen_button.png'));

			var sound_vol = new VolumeMeter(Zero(), "sounds");
			var music_vol = new VolumeMeter(Zero(), "music");
			this.optionsLayout = new Layout.vertical(new V2(0, 280), 0, 0);
			this.optionsLayout.add(sound_vol);
			this.optionsLayout.add(music_vol);
			this.options = false;
		}

		MenuScene.prototype = new Scene();

		MenuScene.prototype.loaded = function () {
			document.getElementById("menu_music").play();
		};

		MenuScene.prototype.toggleFullScreen = function () {
			if (!document.fullscreenElement &&    // alternative standard method
				!document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {  // current working methods
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

		MenuScene.prototype.toggleOptions = function () {
			if (this.options) {
				this.center(this.vLayout);
				this.remove(this.optionsLayout);
				this.options = false;
			} else {
				this.center(this.optionsLayout);
				this.remove(this.vLayout);
				this.options = true;
			}
		};

		MenuScene.prototype.gamePaused = function () {
			this.vLayout.addfirst(this.continueButton);
			this.vLayout.remove(this.playButton);

			this.vLayout.add(this.restartButton);

			document.getElementById('game_music').pause();
			document.getElementById('pause_music').play();
		};

		return MenuScene;
	}
);
