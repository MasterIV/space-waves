define([
	'geo/v2',
	'core/graphic',
	'basic/entity',
	'basic/rect'
], function (V2, g, Entity, RectEntity) {
	for(var i in rooms) if(i == 0)
		g.add(rooms[i].img);

	function Room(pos, grid, type) {
		var size = new V2(type.shape.length, type.shape[0].length);
		var offset = new V2(size.x * grid.size.x+1 - grid.size.y, grid.size.y*10 );
		offset.add(grid.size);

		Entity.call(this, grid.getPixels(pos).dif(offset));
		this.img = g[type.img];
		this.pos = pos;

	}

	Room.prototype = new Entity();

	Room.prototype.onDraw = function (ctx) {
		ctx.drawImage(this.img, 0, 0);
	};

	return Room;
});