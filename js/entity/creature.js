define([
	'basic/entity',
	'config/config',
	'core/graphic',
	'lib/animation',
	'geo/v2',
	'basic/image',
	'core/sound'
], function (Entity, config, graphic, Animation, V2, Image, sound) {
	function Creature(pos, map, level, type) {
		Entity.call(this, map.grid.getPixels(pos), new V2(128, 160));

		this.type = type;
		this.grid = map.grid;
		this.map = map;
		this.level = level;

	}

	Creature.prototype = new Entity();

	Creature.prototype.onDraw = function(ctx) {

	};

	Creature.prototype.onUpdate = function (delta) {

	};

	Creature.prototype.onClick = function () {
		if(this.type == 'enemy') return false;
		this.map.selectUnit(this);
		return true;
	};

});