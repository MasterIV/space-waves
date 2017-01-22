define([
	'geo/v2',
	'core/graphic',
	'basic/entity',
	'basic/image'
], function (V2, g, Entity, ImageEntity) {
	g.add('img/room/door1.png');
	g.add('img/room/door2.png');

	function Door(door, map) {
		var dir = door.p1.x == door.p2.x;
		var offset;

		var p1 = map.grid.getPixels(door.p1);
		var p2 = map.grid.getPixels(door.p2);

		if(dir) {
			offset = new V2(-5, 20);
		} else {
			offset = new V2(50, 20);
		}

		p1.sub(offset);
		p2.sub(offset);

		if(p1.y < p2.y) {
			Entity.call(this, p1 );
			this.z = map.get(door.p2.x, door.p2.y).z + 1;
		} else {
			Entity.call(this, p2 );
			this.z = map.get(door.p1.x, door.p1.y).z + 1;
		}

		var img = dir ? 'img/room/door1.png' : 'img/room/door2.png';
		this.add(new ImageEntity(Zero(), img));
	}

	Door.prototype = new Entity();

	return Door;
});