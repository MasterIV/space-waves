define([
	'geo/v2',
	'core/graphic',
	'basic/entity',
	'basic/rect',
	'lib/animation',
	'lib/wavemanager',
	'core/sound'
], function (V2, g, Entity, RectEntity, Animation, WaveManager, s) {
	s.add('snd/laser.ogg');

	for(var i in rooms) {
		if(rooms[i].enabled) {
				g.add(rooms[i].img);
				if (rooms[i].anim)
					g.add(rooms[i].anim);
			}
		}

	function Room(pos, grid, type) {
		//var size = new V2(type.shape.length, type.shape[0].length);
		//var offset = new V2(size.x * (grid.size.x+1) - grid.size.y, grid.size.y*10 );
		//offset.add(grid.size);

		Entity.call(this, grid.getPixels(pos).dif(type.offset));
		this.img = g[type.img];
		this.type = type;
		this.pos = pos;
		this.shape = type.shape;
		this.z = this.position.y;

		this.hp = this.type.hp;
		this.maxHp = this.hp;

		if (this.type.heal)
			this.heal = 10;
		if (type.ranged) {
			this.ranged = true;
			this.progress = 0;
			this.firingProgress = 5; // when to shoot
			this.damage = 5;
		}

		if (type.anim) {
			this.add(new Animation(type.anim, Zero().add(type.offset).dif(type.animOffset), 8, 150, true));
		}
	}

	Room.prototype = new Entity();

	Room.prototype.onDraw = function (ctx) {
		ctx.drawImage(this.img, 0, 0);
	};

	Room.prototype.onUpdate = function (delta) {
		if (this.ranged) {
			if (this.progress >= this.firingProgress) {
				this.fire();
				this.progress -= this.firingProgress;
			}
		}
	};

	Room.prototype.each = function(callback) {
		for(var x = 0; x < this.shape.length; x++)
			for(var y = 0; y < this.shape[0].length; y++)
				if(this.shape[x][y])
					callback.call(this, x, y, this.shape[x][y]);
	};

	Room.prototype.eachRel = function(callback) {
		this.each(function(x, y) {
			callback.call(this, x+this.pos.x, y+this.pos.y, this.shape[x][y]);
		});
	};

	Room.prototype.get = function (x, y) {
		x -= this.pos.x;
		y -= this.pos.y;

		if (x < 0 || y < 0 || x >= this.shape.length || y >= this.shape[0].length)
			return 1;

		return this.shape[x][y];
	};

	Room.prototype.use = function(creature) {
		if(this.hp < this.maxHp) {
			this.repair(creature.skills.engineering);
			creature.train('repair');
			return;
		}

		if(this.ranged) {
			this.progress += creature.skills.engineering;
			creature.train('engineering');
		}

		if(this.train) {
			creature.train('attack');
			creature.train('hp');
		}

		if(this.heal) {
			var heal = Math.round(creature.skills.hp * this.heal);
			creature.hp = Math.min(creature.hp+heal, creature.skills.hp);
			//if(creature.hp < creature.skills.hp)
				//this.add(new Actionanimation(heal, this.shape, true, graphic['img/heart_icon.png']));
		}
	};

	Room.prototype.fire = function () {
		var nearestShip;
		var closestDist = 10000000;
		for (var i = 0; i < WaveManager.ships.length; i++) {
			var distance = this.pos.dist(WaveManager.ships[i].pos);
			if (distance < closestDist) {
				nearestShip = WaveManager.ships[i];
				closestDist = distance;
			}
		}
		if (nearestShip) {
			var from = new V2(this.position.x + this.type.offset.x, this.position.y + this.type.offset.y);
			var to = new V2(nearestShip.position.x, nearestShip.position.y);
			this.parent.parent.parent.laser.addLaser(from, to, 5);
			nearestShip.damage(this.damage);
			s.play('snd/laser.ogg');
		}
	};

	Room.prototype.click = null;

	return Room;
});
