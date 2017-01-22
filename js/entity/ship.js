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
	g.add('img/spaceship1_sprite1.png');

	function Ship(pos, map, level, direction, crew) {
		Entity.call(this, map.grid.getPixels(pos), new V2(512, 624));

		this.pos = pos;
		this.grid = map.grid;
		this.map = map;
		this.level = level;

		// 0 = north \^
		// 1 = east ->
		// 2 = south \v
		// 3 = west <-
		this.direction = direction;
		this.speed = 400;
		this.movement = false;

		this.unload = null;
		this.spawnTime = 10000;
		this.spawnBuffer = 0;
		this.isSpawning = false;
		this.crew = crew;
		this.shrinking = 0;

		this.img = new Animation('img/spaceship1_sprite1.png', new V2(-256, -312), new V2(1, 1), 5000, true);
		this.img.state = 0;
		this.add(this.img);
	}

	Ship.prototype = new Entity();

	Ship.spawn = function(map, level, distance, crew) {
		var ship_dir = Math.floor(Math.random() * 4);
		var ship_pos = new V2(0,0);
		switch (ship_dir) {
			case 0:
				var biggest_y = map.max.y + distance;
				var random_x = Math.floor((map.max.x - map.min.x) * Math.random());
				ship_pos.x = random_x;
				ship_pos.y = biggest_y;
				break;
			case 1:
				var biggest_x = map.max.x + distance;
				var random_y = Math.floor((map.max.y - map.min.y) * Math.random());
				ship_pos.x = biggest_x;
				ship_pos.y = random_y;
				break;
			case 2:
				var smallest_y = map.min.y - distance;
				var random_x = Math.floor((map.max.x - map.min.x) * Math.random());
				ship_pos.x = random_x;
				ship_pos.y = smallest_y;
				break;
			case 3:
				var smallest_x = map.min.x - distance;
				var random_y = Math.floor((map.max.y - map.min.y) * Math.random());
				ship_pos.x = smallest_x;
				ship_pos.y = random_y;
				break;
		}
		return new Ship(ship_pos, map, level, ship_dir, crew);
	};

	Ship.prototype.onDraw = function(ctx) {

	};

	Ship.prototype.onUpdate = function (delta) {
		if (this.isSpawning) {
			if(!this.crew) {
				this.shrinkAway(delta);
				return;
			}
			this.spawnBuffer += delta;
			if (this.spawnBuffer >= this.spawnTime) {
				this.spawnBuffer = 0;
				this.map.spawnEnemy(this.unload, 1);
				this.crew--;
			}
			return;
		}
		if (!this.movement) {
			var xDir = 0;
			var yDir = 0;

			switch (this.direction) {
				case 0:
					yDir = -1;
					break;
				case 1:
					xDir = -1;
					break;
				case 2:
					yDir = 1;
					break;
				case 3:
					xDir = 1;
					break;
			}
			// Check for collision with space station
			if (this.map.get(this.pos.x + 3*xDir, this.pos.y + 3*yDir)) {
				this.destinationReached(this.pos.x + 3*xDir, this.pos.y + 3*yDir);
			}

			var nextPos = new V2(this.pos.x + xDir, this.pos.y + yDir);

			this.pos = nextPos;
			var self = this;
			this.add(new Morph({
				position: this.grid.getPixels(this.pos)
			}, this.speed, null, function() {
				self.movement = false;
			}));
			this.movement = true;
		}
	};

	Ship.prototype.destinationReached = function (x, y) {
		this.unload = new V2(x, y);
		this.isSpawning = true;
	};

	Ship.prototype.shrinkAway = function (delta) {
		this.shrinking += delta;

		if (this.shrinking >= 10000) {
			this.parent.remove(this);
			return;
		}

		var shrinkFactor = this.shrinking / 10000;
		this.img.scale = 1 - shrinkFactor;
		this.position.y += 1;
		this.img.position.x = -256 + this.size.x/2 * shrinkFactor;
		this.img.position.y = -312 + this.size.y/2 * shrinkFactor;
	};

	return Ship;
});
