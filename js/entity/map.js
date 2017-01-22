define([
	'geo/v2',
	'core/graphic',
	'basic/entity',
	'entity/room',
	'entity/creature',
	'entity/door',
	'lib/wavemanager'
], function (V2, g, Entity, Room, Creature, Door, WaveManager) {
	function Map(grid) {
		Entity.call(this, Zero());

		this.grid = grid;
		this.map = {};
		this.doors = {};
		this.units = [];

		this.min = new V2(0,0);
		this.max = new V2(0,0);
	}

	Map.prototype = new Entity();

	Map.prototype.onUpdate = function (delta) {
		this.entities.sort(function(a,b) {
			return a.z - b.z;
		});
	};

	Map.prototype.addRoom = function(pos, type, force) {
		var room = new Room(pos, this.grid, type);
		var possible = true;
		var self = this;

		var doors = [];
		var neighbours = [];

		function checkForDoor(s, d) {
			var dest = self.get(d.x, d.y);

			if (!dest || dest.get(d.x, d.y) > 1) return;
			if (neighbours.indexOf(dest) != -1) return;

			neighbours.push(dest);
			doors.push({ p1: s, p2: d, r1: room, r2: dest });
		}

		room.eachRel(function(x, y) {
			if(self.map[x] && self.map[x][y])
				possible = false;
			else if (room.get(x, y) == 1) {
				checkForDoor(new V2(x, y), new V2(x+1, y));
				checkForDoor(new V2(x, y), new V2(x-1, y));
				checkForDoor(new V2(x, y), new V2(x, y+1));
				checkForDoor(new V2(x, y), new V2(x, y-1));
			}
		});

		if(!force && (!possible || doors.length < 1)) return false;

		room.eachRel(function(x, y) {
			if(!self.map[x]) self.map[x] = {};
			self.map[x][y] = room;

			if(x < self.min.x) self.min.x = x;
			if(y < self.min.y) self.min.y = y;
			if(x > self.max.x) self.max.x = x;
			if(y > self.max.y) self.max.y = y;
		});

		this.add(room);
		for(var i in doors) {
			this.addDoor(doors[i], doors[i].p1);
			this.addDoor(doors[i], doors[i].p2);
			this.add(new Door(doors[i], this));
		}

		return true;
	};

	Map.prototype.addDoor = function(door, pos) {
		if(!this.doors[pos.x]) this.doors[pos.x] = {};
		this.doors[pos.x][pos.y] = door;
	};

	Map.prototype.getAdjacent = function(pos) {
		var room = this.get(pos.x, pos.y);
		if(!room) return [];

		var result = [];

		this.checkTile(result, room, pos, pos.x-1, pos.y);
		this.checkTile(result, room, pos, pos.x+1, pos.y);
		this.checkTile(result, room, pos, pos.x, pos.y+1);
		this.checkTile(result, room, pos, pos.x, pos.y-1);

		return result;
	};

	Map.prototype.checkTile = function(result, room, pos, x, y) {
		var dest = this.get(x, y);

		if(dest == room && room.get(x, y) < 2)
			result.push(new V2(x, y));

		if(this.doors[x] && this.doors[x][y]) {
			var door = this.doors[x][y];
			if(pos.equal(door.p1))
				result.push(door.p2);
			if(pos.equal(door.p2))
				result.push(door.p1);
		}
	};

	Map.prototype.get = function (x, y) {
		if (this.map[x]) return this.map[x][y];
	};

	Map.prototype.findPosition = function(pos) {
		var self = this;

		function checkPos(pos) {
			var room = self.get(pos.x, pos.y);
			var unit = self.unit(pos);
			return !unit && room && room.get(pos.x, pos.y) < 2;
		}

		var checked = {};
		var next = [pos];

		function addNext(x, y) {
			if(!checked[x]) checked[x] = {};
			if(checked[x][y]) return;
			checked[x][y] = true;
			next.push(new V2(x, y));
		}

		while(next.length) {
			var p = next.shift();
			if(checkPos(p)) return p;
			addNext(p.x+1, p.y);
			addNext(p.x-1, p.y);
			addNext(p.x, p.y+1);
			addNext(p.x, p.y-1);
		}

		return null;
	};

	Map.prototype.addCreature = function (type, pos, level) {
		var p = this.findPosition(pos);
		if(!p) return;
		var creature = new Creature(p, this, level, type);
		this.units.push(creature);
		this.add(creature);
		return creature;
	};

	Map.prototype.spawnEnemy = function (pos, level) {
		var alien = this.addCreature(units.alien, pos, level);
		WaveManager.addAlien(alien);
	};

	Map.prototype.unit = function (pos) {
		for(var i in this.units)
			if(this.units[i].pos.equal(pos))
				return this.units[i];
		return null;
	};

	Map.prototype.inside = function () {
		return true;
	};

	return Map;
});
