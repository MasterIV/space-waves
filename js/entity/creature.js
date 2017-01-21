define([
	'basic/entity',
	'config/config',
	'core/graphic',
	'lib/animation',
	'geo/v2',
	'basic/image',
	'core/sound'
], function (Entity, config, g, Animation, V2, Image, sound) {
	var speed = 500;

	for(var i in units)
		g.add(units[i].img);

	function Creature(pos, map, level, type) {
		Entity.call(this, map.grid.getPixels(pos), new V2(128, 160));

		this.pos = pos;
		this.type = type;
		this.grid = map.grid;
		this.map = map;
		this.level = level;

		this.animations = {
			walk: new Animation(type.img, new V2(-64, -118), new V2(4, 4), 200, true),
			idle: new Animation(type.img, new V2(-64, -118), new V2(4, 4), 200, true),
			fight: new Animation(type.img, new V2(-64, -118), new V2(4, 4), 200, true)
		};

		this.setState('idle');
		this.add(this.img);

		this.path = [];
	}

	Creature.prototype = new Entity();

	Creature.prototype.onDraw = function(ctx) {

	};


	Creature.prototype.setState = function(state) {
		if(!this.animations[state]) return;
		this.img = this.animations[state];
		this.entities = [this.img];
	};

	Creature.prototype.onUpdate = function(delta) {
		if(!this.moving && this.path.length) {
			var next = this.path.shift();
			var self = this;

			this.setState('walk');
			this.moving = true;

			if(this.current.x > next.x)
				this.img.state = 0;
			else if(this.current.x < next.x)
				this.img.state = 2;
			else if(this.current.y < next.y)
				this.img.state = 1;
			else
				this.img.state = 3;

			this.current = next;
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

	Creature.prototype.onClick = function () {
		if(this.type.enemy) return false;
		//this.map.selectUnit(this);
		return true;
	};

	return Creature;
});