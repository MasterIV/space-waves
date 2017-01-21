define(['geo/v2', 'basic/entity', 'config/screen', 'entity/uibutton'],
    function(V2, Entity, Screen, UIButton) {
        function UIController() {
            Entity.call(this, Zero(), new V2(Screen.w, Screen.h));

            var b_size_x = 64;
            var b_size_y = 64;
            var b_margin = 12;

            this.button_construct = new UIButton(new V2(b_margin, this.size.y - b_size_y - b_margin), "construct");
            this.button_hire = new UIButton(new V2(b_margin * 2 + b_size_x, this.size.y - b_size_y - b_margin), "hire");
            this.button_pause = new UIButton(new V2(this.size.x - b_margin * 2 - b_size_x * 2, this.size.y - b_size_y - b_margin), "pause");
            this.button_menu = new UIButton(new V2(this.size.x - b_margin - b_size_x, this.size.y - b_size_y - b_margin), "menu");

            this.add(this.button_construct);
            this.add(this.button_hire);
            this.add(this.button_pause);
            this.add(this.button_menu);
        }

        UIController.prototype = new Entity();

        return UIController;
    });
