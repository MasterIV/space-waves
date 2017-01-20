define(['lib/scene', 'geo/v2', 'lib/isogrid', 'entity/room'],
		function(Scene, V2, IsoGrid, Room ) {
			function PlayScene() {
				Scene.call(this);


				var shapes = [
					[
						[1, 1, 1],
						[1, 1, 1],
						[1, 1, 1]
					],
					[
						[1, 1, 1],
						[1, 1, 1],
						[1, 1, 0]
					],
					[
						[1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1]
					],
					[
						[1, 0, 0],
						[1, 1, 1],
						[1, 1, 1],
						[1, 0, 0]
					],
					[
						[1, 0, 0, 1],
						[1, 1, 1, 1],
						[1, 1, 1, 1],
						[1, 0, 0, 1]
					],
					[
						[1, 1, 0],
						[1, 1, 1],
						[1, 1, 1],
						[0, 1, 1]
					],
					[
						[1, 1, 0],
						[1, 1, 1],
						[1, 1, 1],
						[1, 1, 0]
					],
					[
						[1, 1, 1, 1],
						[1, 1, 1, 1],
						[0, 1, 1, 0]
					],
				];



				var grid = new IsoGrid(this, 64, 32);
				this.room = new Room(Zero(), shapes[5], grid);

				this.add(this.room);
			}

			PlayScene.prototype = new Scene();

			PlayScene.prototype.update = function (delta) {
				this.display = document.getElementById('gameframe');
				this.display.width = this.room.size.x;
				this.display.height = this.room.size.y;
			};

			return PlayScene;
		}
);