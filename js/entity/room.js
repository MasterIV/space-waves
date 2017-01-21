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
		this.shape = type.shape;

		this.lookup = {};
		this.neighbours = [];
		this.doors = [];
	}

	Room.prototype = new Entity();

	Room.prototype.onDraw = function (ctx) {
		ctx.drawImage(this.img, 0, 0);
	};

	Room.prototype.each = function(callback) {
		for(var x = 0; x < this.shape.length; x++)
			for(var y = 0; y < this.shape[0].length; y++)
				if(this.shape[y][x])
					callback.call(this, x, y, this.shape[y][x]);
	};

	Room.prototype.eachRel = function(callback) {
		this.each(function(x, y) {
			callback.call(this, x+this.pos.x, y+this.pos.y, this.shape[y][x]);
		});
	};

	Map.prototype.get = function (x, y) {
		x -= this.pos.x;
		y -= this.pos.y;

		if (x < 0 || y < 0 || x >= this.shape.length || y >= this.shape[0].length)
			return 1;

		return this.shape[x][y];
	};


	return Room;
});