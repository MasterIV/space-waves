define([
	'basic/entity',
	'geo/v2',
	'basic/image',
	'core/graphic',
	'core/sound',
	'basic/layout',
	'config/screen',
	'basic/button',
	'config/fonts',
	'basic/text'
], function (Entity, V2, ImageEntity, g, s, Layout, screen, Button, fonts, TextEntity) {
	for (var i in rooms)
		if (rooms[i].buildable) {
			g.add(rooms[i].icon);
			g.add(rooms[i].img);
		}

	g.add('img/gui/main_btn_back.png');
	g.add('img/gui/main_btn_back_hover.png');
	g.add('img/unit_info.png');
	g.add('img/job_engineer.png');
	g.add('img/job_scentist.png');
	g.add('img/job_security.png');

	var imgs = {
		engineer: 'img/job_engineer.png',
		science: 'img/job_scentist.png',
		security: 'img/job_security.png'
	};

	function HireButton(menu, unit) {
		Entity.call(this, Zero(), new V2(296, 123));
		this.add(new ImageEntity(Zero(), 'img/unit_info.png'));
		this.add(new ImageEntity(new V2(2, 34), imgs[unit.type]));
		this.add(new TextEntity(new V2(90, 22), unit.name, fonts.roomTitle));
		this.add(new TextEntity(new V2(250, 80), unit.level ));
		this.add(new TextEntity(new V2(120, 58), unit.costs, fonts.roomTitle));

		this.unit = unit;
		this.menu = menu;
	}

	HireButton.prototype = new Entity();

	HireButton.prototype.onClick = function () {

	};

	function UIConstruction(scene) {
		Entity.call(this, new V2(0, 0), new V2(screen.w, screen.h));

		var hLayout = new Layout.horizontal(Zero(), 40, 20);
		var vLayout = new Layout.vertical(Zero(), 20, 20);
		var count = 1;
		var self = this;

		for (var i = 0; i < 6; i++) {
				vLayout.add(new HireButton(this, scene.availableUnits[i]));

				if (++count > 3) {
					vLayout.align("center");
					hLayout.add(vLayout);
					vLayout = new Layout.vertical(Zero(), 20, 20);
					count = 1;
				}
			}

		vLayout.align("center");
		hLayout.add(vLayout);
		hLayout.align("top");
		this.center(hLayout);

		this.center(Button.create(new V2(0, 600), function () {
			self.close();
		}).img('img/gui/main_btn_back.png').highlight('img/gui/main_btn_back_hover.png'))
	}

	UIConstruction.prototype = new Entity();

	UIConstruction.prototype.onDraw = function (ctx) {
		ctx.fillStyle = 'rgba(0,0,0,0.5)';
		ctx.fillRect(0, 0, this.size.x, this.size.y);
	};

	UIConstruction.prototype.close = function () {
		this.parent.remove(this);
	};

	return UIConstruction;
});
