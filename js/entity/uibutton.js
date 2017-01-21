define(['basic/entity', 'geo/v2', 'basic/image', 'core/graphic'],
    function(Entity, V2, ImageEntity, g) {
        g.add('img/gui/ButtonConstruct.png');
        g.add('img/gui/ButtonHire.png');
        g.add('img/gui/ButtonMenu.png');
        g.add('img/gui/ButtonPause.png');

        function UIButton(pos, type) {
            Entity.call(this, pos);

            this.type = type;

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

        UIButton.prototype.onClick = function() {
            console.log('hi!');
        };

        return UIButton;
    });
