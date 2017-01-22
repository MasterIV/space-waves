define(['basic/entity'], function(Entity) {
		function Laser() {
			this.currentShots = [];
			this.laserDuration = 500;
		}

		Laser.prototype = new Entity();

		Laser.prototype.addLaser = function (from, to, thickness) {
			this.currentShots.push([from, to, thickness, 0]);
		};

		Laser.prototype.onDraw = function (ctx) {
			for (var i = 0; i < this.currentShots.length; i++) {
				var fade = 1 - this.currentShots[i][3] / this.laserDuration;
				ctx.strokeStyle = "rgb("+ Math.round(255 * fade) +", 30, 30)";
				ctx.lineWidth = this.currentShots[i][2];
				ctx.beginPath();
				ctx.moveTo(this.currentShots[i][0].x, this.currentShots[i][0].y);
				ctx.lineTo(this.currentShots[i][1].x, this.currentShots[i][1].y);
				ctx.stroke();
			}
		};

		Laser.prototype.onUpdate = function (delta) {
			var toRemove = [];

			for (var i = 0; i < this.currentShots.length; i++) {
				this.currentShots[i][3] += delta;
				if (this.currentShots[i][3] >= this.laserDuration)
					toRemove.push(i);
			}
			for (var j = 0; j < toRemove; j++) {
				this.currentShots.splice(toRemove[j]-j, 1);
			}
		};

		return Laser;
	}
);
