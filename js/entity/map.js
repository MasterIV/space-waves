define([
	'geo/v2',
	'core/graphic',
	'basic/entity'
], function (V2, g, Entity) {

	function Map(grid) {
		Entity.call(this, Zero());

		this.grid = grid;
		this.map = {};

	}

	Map.prototype = new Entity();

	Map.prototype.addRoom = function() {

	};

	Map.prototype.getAdjacent = function(pos) {
		return [];
	};

	return Map;
});