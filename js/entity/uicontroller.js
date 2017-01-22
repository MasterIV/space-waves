define([
	'geo/v2',
	'basic/entity',
	'config/screen',
	'entity/uibutton',
	'entity/uiconstruction',
	'entity/uihire',
	'core/game',
	'basic/image',
	'core/graphic'
], function (V2, Entity, screen, UIButton, UIConstruction, UIHire, game, ImageEntity, g) {
	g.add('img/main_hud.png');

	function UIController(scene) {
		Entity.call(this, Zero(), new V2(screen.w, screen.h));

		this.b_size_x = 83;
		this.b_size_y = 84;
		this.b_margin = 24;

		this.button_construct = new UIButton(new V2(this.b_margin, this.size.y - this.b_size_y), "construct", this);
		this.button_hire = new UIButton(new V2(this.b_margin * 2 + this.b_size_x, this.size.y - this.b_size_y), "hire", this);
		this.button_pause = new UIButton(new V2(this.size.x - this.b_margin * 2 - this.b_size_x * 2, this.size.y - this.b_size_y), "pause", this);
		this.button_menu = new UIButton(new V2(this.size.x - this.b_margin - this.b_size_x, this.size.y - this.b_size_y), "menu", this);

		this.add(this.button_construct);
		this.add(this.button_hire);
		this.add(this.button_pause);
		this.add(this.button_menu);

		var resources = new ImageEntity(new V2(0, 555), 'img/main_hud.png');
		resources.onClick = function() { scene.viewport.scrollTo(scene.size.quo(2), 500 );};
		this.center(resources);



		this.menu = {
			construct: new UIConstruction(scene.cursor)
		}
	}

	UIController.prototype = new Entity();

	UIController.prototype.togglePause = function () {
		this.parent.Pause();
		return true;
	};

	UIController.prototype.toggleConstructionMenu = function () {
		this.menu.construct.open();
		this.parent.block(this.menu.construct);
	};

	UIController.prototype.toggleHireMenu = function () {
		this.menu.construct.open();
		this.parent.block(new UIHire(this.parent));
	};

	UIController.prototype.toggleMenu = function () {
		require('config/scenes').menu.gamePaused();
		game.scene = require('config/scenes').menu;
	};

	return UIController;
});
