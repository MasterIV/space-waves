define([
		'lib/scene',
		'geo/v2',
		'entity/uicontroller',
		'lib/isogrid',
		'lib/viewport',
		'entity/background',
		'entity/cursor',
		'entity/map',
		'entity/ship'
	], function (Scene, V2, UIController, IsoGrid, Viewport, Bg, Cursor, Map, Ship) {
			function PlayScene() {
				Scene.call(this);
				this.viewport = new Viewport(true);
				this.viewport.position = this.size.quo(2);
				this.viewport.dragable(true, true);

				var grid = new IsoGrid(this.viewport, 64, 32);
				var map = new Map(grid);

				this.cursor = new Cursor(grid, map);
				this.gui = new UIController(this);

				map.addRoom(new V2(-2, -2), rooms[0], true);
				map.addRoom(new V2(3, -1), rooms[1], true);
				map.addCreature(units.engineer, new V2(2, 0), 1);
				map.add(this.cursor);
				this.map = map;

				this.viewport.add(map);
				this.add(new Bg(this.size));
				this.add(this.viewport);
				this.add(this.gui);

				this.wave = 0;
				this.timeout = 30000;
				this.onTimeout = true;
				this.timeBuffer = 29999;
			}

			PlayScene.prototype = new Scene();

			PlayScene.prototype.launchWave = function () {
				// BALANCING!

				// One new ship every 10 waves
				var ships = Math.max(Math.floor((this.wave+10) / 10), 1);
				// One extra level every 5 waves
				var enemyLevel = Math.max(Math.floor((this.wave+5) / 5), 1);
				// After every level up, start with 1 crew member per ship, increase to 5
				var crewMembers = Math.max(Math.floor(this.wave % 5 + 1), 1)

				for (var i = 0; i < ships; i++)
					this.viewport.add(Ship.spawn(this.map, enemyLevel, 3, crewMembers));
			};

			PlayScene.prototype.onUpdate = function (delta) {
				if(this.onTimeout) {
					this.timeBuffer += delta;
					if (this.timeBuffer >= this.timeout) {
						this.nextWave();
					}
				}
			};

			PlayScene.prototype.nextWave = function () {
				this.wave++;
				this.timeBuffer = 0;
				this.onTimeout = false;
				this.launchWave();
			};

			PlayScene.prototype.Pause = function () {

			};

			return PlayScene;
		}
);
