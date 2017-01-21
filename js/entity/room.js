define([
	'geo/v2',
	'core/graphic',
	'basic/entity',
	'basic/rect',
	'lib/animation'
], function (V2, g, Entity, RectEntity, Animation) {
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
		this.pos = pos;
		this.shape = type.shape;
		this.z = this.position.y;

		if (type.anim) {
			this.add(new Animation(type.anim, Zero().add(type.offset).dif(type.animOffset), 8, 150, true));
		}
	}

	Room.prototype = new Entity();

	Room.prototype.onDraw = function (ctx) {
		ctx.drawImage(this.img, 0, 0);
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

	Room.prototype.click = null;

	return Room;
});
