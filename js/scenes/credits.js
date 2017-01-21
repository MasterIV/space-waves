define(['lib/scene', 'entity/back', 'basic/text', 'geo/v2', 'entity/background'],
		function(Scene, BackButton, TextEntity, V2, Bg) {
			function CreditsScene() {
				Scene.call(this);
				this.add(new Bg(this.size));
				this.center(new TextEntity(new V2(0, 100), "Tobias Rojahn"));
				this.center(new TextEntity(new V2(0, 180), "Felix Wagner"));
				this.center(new TextEntity(new V2(0, 260), "Judith Gastell"));
				this.center(new TextEntity(new V2(0, 340), "Tamara Meyendriesch"));
				this.center(new TextEntity(new V2(0, 420), "Marcel Rose"));
				this.center(BackButton('menu'));
			}

			CreditsScene.prototype = new Scene();

			return CreditsScene;
		}
);