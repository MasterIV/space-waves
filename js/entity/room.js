define([
	'geo/v2',
	'core/graphic',
	'basic/entity',
	'basic/rect'
], function (V2, g, Entity, RectEntity) {

	function Room(pos, type) {
		Entity.call(this, pos);
		this.add(new RectEntity(Zero(), new V2(10, 10)));
	}

	Room.prototype = new Entity();

	return Room;
});