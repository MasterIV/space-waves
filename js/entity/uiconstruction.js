define(['basic/entity', 'geo/v2', 'basic/image', 'core/graphic', 'core/sound'],
    function(Entity, V2, ImageEntity, g, s) {
        function UIConstruction(pos, ui_controller) {
            Entity.call(this, new V2(pos.x, pos.y - 110), new V2(460, 110));

            this.img = new ImageEntity(Zero(), 'img/gui/main_btn_back_hover.png');
            this.add(this.img);
        }

        UIConstruction.prototype = new Entity();

        return UIConstruction;
    });
