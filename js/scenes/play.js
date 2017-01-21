define([
		'lib/scene',
		'geo/v2',
		'entity/uicontroller',
		'lib/isogrid',
		'entity/room',
		'lib/viewport',
		'entity/background',
		'entity/cursor'
	], function (Scene, V2, UIController, IsoGrid, Room, Viewport, Bg, Cursor) {
			function PlayScene() {
				Scene.call(this);
				this.viewport = new Viewport();
				var grid = new IsoGrid(this.viewport, 64, 32);

				this.viewport.add(new Cursor(grid, {at: function() {return true;}}, function() {}));

				this.add(new Bg(this.size));
				this.add(this.viewport);


				// this.room = new Room(Zero(), rooms[10].shape, grid);
				// this.add(this.room);
				this.gui = new UIController();
				this.add(this.gui);

			}

			PlayScene.prototype = new Scene();

			// PlayScene.prototype.update = function (delta) {
			// 	this.display = document.getElementById('gameframe');
			// 	this.display.width = this.room.size.x;
			// 	this.display.height = this.room.size.y;
			// };

			PlayScene.prototype.Pause = function () {

			};

			return PlayScene;
		}
);
