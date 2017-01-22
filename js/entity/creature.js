define([
	'basic/entity',
	'config/config',
	'core/graphic',
	'lib/animation',
	'geo/v2',
	'basic/image',
	'core/sound',
	'basic/morph',
	'lib/wavemanager'
], function (Entity, config, g, Animation, V2, Image, sound, Morph, WaveManager) {
	sound.add('snd/laser_small.ogg');
	var speed = 500;
	var actionSpeed = 1000;

	for(var i in units)
		g.add(units[i].img);
	g.add('img/char_selection.png');

	function Creature(pos, map, level, type) {
		Entity.call(this, map.grid.getPixels(pos), new V2(128, 160));

		this.type = type;
		this.grid = map.grid;
		this.map = map;
		this.level = level;
		this.cooldown = 0;
		this.setPos(pos);

		this.hp = 100;

		this.skills = {
			attack: this.type.attack,
			science: this.type.science,
			engineering: this.type.engineering,
			heal: 10
		};

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
		} else if (!this.type.enemy) {
			this.cooldown += delta;

			if (this.cooldown >= actionSpeed) {
				this.cooldown -= actionSpeed;
				var room = this.map.get(this.pos.x, this.pos.y);
				if (!this.type.enemy) {
					var enemy;
					for (var i = 0; i < WaveManager.aliens.length; i++) {
						var other_room = this.map.get(WaveManager.aliens[i].pos.x, WaveManager.aliens[i].pos.y);
						if (room == other_room) {
							enemy = WaveManager.aliens[i];
							break;
						}
					}
					if (enemy) {
						var from = new V2(this.position.x, this.position.y-20);
						var to = new V2(enemy.position.x + Math.round(Math.random()*10-5), enemy.position.y + Math.round(Math.random()*10-5));
						this.parent.parent.parent.laser.addLaser(from, to, 2);
						enemy.damage(this.skills.attack * 50);
						sound.play('snd/laser_small.ogg');
						return;
					}
				}
				//var enemy = this.findCreatureTarget(room);

				/*if(enemy) {
					enemy.harm(this.skills.attack);
					this.add( new Animation('img/fight_animation.png', Zero(), 5, 200) );
					this.train('attack');
					this.train('hp');
					return;
				}*/

				/*if( this.enemy ) {
					if (room.hp > 1) {
						room.harm(this.skills.attack);
						this.add( new Animation('img/fight_animation.png', Zero(), 5, 200) );
					}

					if (room.hp < 1) {
						var target = this.findRoomTarget();
						if (target) this.walk(target);
					}
				} else {*/
					room.use(this);
				//}
			}
		}
	};

	Creature.prototype.damage = function (dmg) {
		this.hp -= dmg;
		if (this.hp <= 0) {
			this.parent.remove(this);
			WaveManager.removeAlien(this);
		}
	};

	Creature.prototype.move = function(path) {
		this.path = path;
	};

	Creature.prototype.train = function (toTrain) {
		return;
	};

	Creature.prototype.click = null;

	return Creature;
});
