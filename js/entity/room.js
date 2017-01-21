define([
	'geo/v2',
	'core/graphic',
	'basic/entity',
	'basic/rect'
], function (V2, g, Entity, RectEntity) {
	g.add('img/room/room0_grau.png');
	g.add('img/room/room1_grau.png');
	g.add('img/room/room2_grau.png');
	g.add('img/room/room5_grau.png');
	g.add('img/room/room6_grau.png');

	function Room(pos, grid, type) {
		var size = new V2(type.shape.length, type.shape[0].length);
		var offset = new V2(size.x * grid.size.x+1 - grid.size.y, grid.size.y*10 );
		offset.add(grid.size);

		Entity.call(this, grid.getPixels(pos).dif(offset));
		this.pos = pos;

	}

	Room.prototype = new Entity();

	Room.prototype.onDraw = function (ctx) {
		ctx.drawImage(g['img/room/room0_grau.png'], 0, 0);
	};

	return Room;
});