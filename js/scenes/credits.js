define(['lib/scene', 'entity/back', 'basic/text', 'geo/v2', 'entity/background', 'core/graphic', 'basic/image', 'lib/animation'],
		function(Scene, BackButton, TextEntity, V2, Bg, g, ImageEntity, Animation) {
			g.add('img/credits_1.png');
			g.add('img/credits_2.png');
			g.add('img/room/commando_room.png');
			g.add('img/room/commando_animation.png');

			function CreditsScene() {
				Scene.call(this);
				this.add(new Bg(this.size));
				this.center(new TextEntity(new V2(0, 100), "Tobias Rojahn"));
				this.center(new TextEntity(new V2(0, 180), "Felix Wagner"));
				this.center(new TextEntity(new V2(0, 260), "Judith Gastell"));
				this.center(new TextEntity(new V2(0, 340), "Tamara Meyendriesch"));
				this.center(new TextEntity(new V2(0, 420), "Marcel Rose"));
				this.center(BackButton('menu'));

				this.timeBuffer = 0;
				this.drawSpots = false;
				this.spot1 = new ImageEntity(new V2(-50, 300), 'img/credits_1.png');
				this.spot1.visible = false;
				this.add(this.spot1);
				this.spot2 = new ImageEntity(new V2(1360-386, 300), 'img/credits_2.png');
				this.spot2.visible = false;
				this.add(this.spot2);

				var dude1 = new Animation(units.science.img, new V2(150, 520), new V2(4, 4), 200, true);
				dude1.state = 1;
				this.add(dude1);
				var dude2 = new Animation(units.alien.img, new V2(1280-290, 520), new V2(4, 4), 200, true);
				dude2.state = 2;
				this.add(dude2);

				var dj_back = new ImageEntity(new V2(30,-200), 'img/room/commando_room.png');
				this.add(dj_back);
				var dj_front = new Animation('img/room/commando_animation.png', new V2(30+155,-200+327), 8, 100, true);
				this.add(dj_front);
			}

			CreditsScene.prototype = new Scene();

			CreditsScene.prototype.onUpdate = function (delta) {
				this.timeBuffer += delta;
				if (this.timeBuffer >= 300) {
					this.spot1.visible = true;
					this.spot2.visible = true;
				}
				if (this.timeBuffer >= 600) {
					this.timeBuffer = 0;
					this.spot1.visible = false;
					this.spot2.visible = false;
				}
			};

			return CreditsScene;
		}
);
