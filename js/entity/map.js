define([
	'geo/v2',
	'core/graphic',
	'basic/entity'
], function (V2, g, Entity) {

	function Map(grid) {
		Entity.call(this, Zero());
		this.grid = grid;
	}

	Map.prototype = new Entity();

	return Map;
});