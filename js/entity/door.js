define([
	'geo/v2',
	'core/graphic',
	'basic/entity'
], function (V2, g, Entity) {
	//g.add();


	function Door(door) {
		Entity.call(this);

	}

	Door.prototype = new Entity();

	return Door;
});