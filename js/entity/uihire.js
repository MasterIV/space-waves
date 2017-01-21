define(['basic/entity', 'geo/v2', 'basic/image', 'core/graphic', 'core/sound'],
    function(Entity, V2, ImageEntity, g, s) {
        function UIHire(pos, ui_controller) {
            Entity.call(this, new V2(pos.x, pos.y - 110), new V2(460, 110));

            this.img = new ImageEntity(Zero(), 'img/main_btn_back_hover.png');
            this.add(this.img);
        }

        UIHire.prototype = new Entity();

        return UIHire;
    });
