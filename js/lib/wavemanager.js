define(function() {
	return {
		ships: [],
		aliens: [],

		addShip: function(ship) {
			this.ships.push(ship);
		},
		removeShip: function(ship) {
			var index = this.ships.indexOf(ship);
			if (index > -1) {
				this.ships.splice(index, 1);
			}
		},
		addAlien: function(alien) {
			this.aliens.push(alien);
		},
		removeAlien: function(alien) {
			var index = this.aliens.indexOf(alien);
			if (index > -1) {
				this.aliens.splice(index, 1);
			}
		},
		isEnemyLeft: function() {
			if (!this.ships.length)
				if (!this.aliens.length)
					return false;
			return true;
		}
	};
});
