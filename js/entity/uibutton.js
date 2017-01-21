define(['basic/entity', 'geo/v2', 'basic/image', 'core/graphic', 'core/sound'],
    function(Entity, V2, ImageEntity, g, s) {
        g.add('img/gui/ButtonConstruct.png');
        g.add('img/gui/ButtonHire.png');
        g.add('img/gui/ButtonMenu.png');
        g.add('img/gui/ButtonPause.png');
        s.add('snd/game_button_positive.ogg');
        s.add('snd/game_button_negative.ogg');
        s.add('snd/game_button_error.ogg');

        function UIButton(pos, type, ui_controller) {
            Entity.call(this, pos, new V2(84, 83));

            this.type = type;
            this.setParent(ui_controller);

            switch (type) {
                case "construct":
                    this.img = new ImageEntity(Zero(), 'img/gui/ButtonConstruct.png');
                    break;
                case "hire":
                    this.img = new ImageEntity(Zero(), 'img/gui/ButtonHire.png');
                    break;
                case "pause":
                    this.img = new ImageEntity(Zero(), 'img/gui/ButtonMenu.png');
                    break;
                case "menu":
                    this.img = new ImageEntity(Zero(), 'img/gui/ButtonPause.png');
                    break;
            }
            this.add(this.img);
        }

        UIButton.prototype = new Entity();

        UIButton.prototype.onMouseDown = function() {
            return true;
        };

        UIButton.prototype.onClick = function (p) {
            var ret = false;
            switch (this.type) {
                case "construct":
                    ret = this.parent.ToggleConstructionMenu();
                    break;
                case "hire":
                    ret = this.parent.ToggleHireMenu();
                    break;
                case "pause":
                    ret = this.parent.TogglePause();
                    break;
                case "menu":
                    ret = this.parent.ToggleMenu();
                    break;
            }
            if (ret == 0)
                s.play('snd/game_button_error.ogg');
            else if (ret == 1)
                s.play('snd/game_button_positive.ogg');
            else if (ret == 2)
                s.play('snd/game_button_negative.ogg');
        };

        return UIButton;
    });
