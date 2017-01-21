define([
	'basic/entity',
	'config/config',
	'core/graphic',
	'lib/animation',
	'geo/v2',
	'basic/image',
	'core/sound'
], function (Entity, config, g, Animation, V2, Image, sound) {
	for(var i in units)
		g.add(units[i].img);

	function Creature(pos, map, level, type) {
		Entity.call(this, map.grid.getPixels(pos), new V2(128, 160));

		this.pos = pos;
		this.type = type;
		this.grid = map.grid;
		this.map = map;
		this.level = level;

		this.img = new Animation(type.img, new V2(-64, -118), new V2(4, 4), 200, true);
		this.img.state = 0;
		//this.img.
		this.add(this.img);
	}

	Creature.prototype = new Entity();

	Creature.prototype.onDraw = function(ctx) {

	};

	Creature.prototype.onUpdate = function (delta) {

	};

	Creature.prototype.onClick = function () {
		if(this.type.enemy) return false;
		//this.map.selectUnit(this);
		return true;
	};

	return Creature;
});