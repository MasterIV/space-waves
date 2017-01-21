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
    g.add('img/spaceship1.png');

	function Ship(pos, map, level, direction) {
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

		this.img = new Animation('img/spaceship1.png', new V2(-256, -312), new V2(1, 1), 5000, true);
		this.img.state = 0;
		this.add(this.img);
	}

	Ship.prototype = new Entity();

    Ship.spawn = function(map, level) {
        return new Ship(new V2(0,30), map, level, 0);
    };

	Ship.prototype.onDraw = function(ctx) {

	};

	Ship.prototype.onUpdate = function (delta) {
        if (!this.movement) {
            var xDir = 0;
            var yDir = 0;

            switch (this.direction) {
                case 0:
                    yDir = -1;
                    break;
                case 1:
                    xDir = -1;
                case 2:
                    yDir = 1;
                case 3:
                    yDir = -1;
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

	Ship.prototype.onClick = function () {
		if(this.type.enemy) return false;
		//this.map.selectUnit(this);
		return true;
	};

	return Ship;
});
