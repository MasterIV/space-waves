define([
	'basic/entity',
	'config/config',
	'core/graphic',
	'lib/animation',
	'geo/v2',
	'basic/image',
	'core/sound',
	'basic/morph'
], function (Entity, config, g, Animation, V2, Image, sound, Morph) {
	var speed = 500;

	for(var i in units)
		g.add(units[i].img);
	g.add('img/char_selection.png');

	function Creature(pos, map, level, type) {
		Entity.call(this, map.grid.getPixels(pos), new V2(128, 160));

		this.type = type;
		this.grid = map.grid;
		this.map = map;
		this.level = level;
		this.setPos(pos);

		this.selected = false;
		this.cursor = new Animation('img/char_selection.png', new V2(-64, -118), 4, 200, true);
		this.animations = {
			walk: new Animation(type.img, new V2(-64, -118), new V2(4, 4), 300, true),
			idle: new Animation(type.img, new V2(-64, -118), new V2(4, 4), 500, true),
			fight: new Animation(type.img, new V2(-64, -118), new V2(4, 4), 300, true),
		};
		this.animations.idle.setFixedFrame(2);

		this.setState('idle');
		this.add(this.img);
		this.setDirection(2);

		this.path = [];
	}

	Creature.prototype = new Entity();

	Creature.prototype.select = function() {
		if(this.selected) return;
		this.addfirst(this.cursor);
		this.selected = true;
	};

	Creature.prototype.unselect = function() {
		if(!this.selected) return;
		this.remove(this.cursor);
		this.selected = false;
	};

	Creature.prototype.setPos = function(pos) {
		var room = this.map.get(pos.x, pos.y);
		var rel = pos.dif(room.pos);
		this.pos = pos;
		this.z = room.z + rel.x + rel.y + 3;
	};


	Creature.prototype.setState = function(state) {
		if(!this.animations[state]) return;
		this.img = this.animations[state];
		this.entities = this.selected ? [this.cursor, this.img] : [this.img];
	};

	Creature.prototype.setDirection = function(d) {
		for(var i in this.animations)
			this.animations[i].state = d;
	}

	Creature.prototype.onUpdate = function(delta) {
		if(!this.moving && this.path.length) {
			var next = this.path.shift();
			var self = this;

			this.setState('walk');
			this.moving = true;

			if(this.pos.x > next.x)
				this.setDirection(0);
			else if(this.pos.x < next.x)
				this.setDirection(2);
			else if(this.pos.y < next.y)
				this.setDirection(1);
			else
				this.setDirection(3);

			this.setPos( next );

			this.add(new Morph({
				position: this.grid.getPixels(next)
			}, speed, null, function() {
				if( self.path.length < 1)
					self.setState('idle');
				self.moving = false;
			}));
		}
	};

	Creature.prototype.move = function(path) {
		this.path = path;
	};

	Creature.prototype.click = null;

	return Creature;
});
