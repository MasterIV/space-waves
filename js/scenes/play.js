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
				map.addRoom(new V2(3, -1), rooms[6], true);
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

				this.setUnits(1);
			}

			PlayScene.prototype = new Scene();

			PlayScene.prototype.setUnits = function(avgLevel) {
				var types = ['engineer', 'science', 'security'];
				var names = ['Felix', 'Tobias', 'Walter', 'Paul', 'Horst'];

				this.availableUnits = [];
				for (var i = 0; i< 6; i++) {
					var level = Math.max(1, Math.round(avgLevel + Math.random() * 2 - 1));
					this.availableUnits.push({
						name: names[(Math.random()*names.length)|0],
						type: types[(Math.random()*types.length)|0],
						level: level,
						costs: (level+1)*40
					});
				}
			};

			PlayScene.prototype.launchWave = function () {
				var ships = Math.floor(this.wave/3+1);
				var crewMembers = Math.ceil(this.wave/5);
				var enemyLevel = Math.ceil(this.wave/4);

				for (var i = 0; i < ships; i++)
					this.viewport.add(Ship.spawn(this.map, enemyLevel, 3, crewMembers));
				this.setUnits(enemyLevel);
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
