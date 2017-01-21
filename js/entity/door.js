define([
	'geo/v2',
	'core/graphic',
	'basic/entity',
	'basic/image'
], function (V2, g, Entity, ImageEntity) {
	g.add('img/room/door1.png');
	g.add('img/room/door2.png');

	function Door(door, grid) {
		var dir = door.p1.x == door.p2.x;
		var offset;

		var p1 = grid.getPixels(door.p1);
		var p2 = grid.getPixels(door.p2);

		if(dir) {
			offset = new V2(12, 40);
			p1.sub(offset);
			p2.sub(offset);
		} else {
			offset = new V2(10, 40);
			p1.add(offset);
			p2.add(offset);
		}

		Entity.call(this, p1.y < p2.y ? p1 : p2);

		var img = dir ? 'img/room/door1.png' : 'img/room/door2.png';
		this.add(new ImageEntity(Zero(), img));
	}

	Door.prototype = new Entity();

	return Door;
});