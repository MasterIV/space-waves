define(['geo/v2', 'basic/entity', 'config/screen', 'entity/uibutton', 'entity/uiconstruction', 'entity/uihire', 'core/game'],
    function(V2, Entity, screen, UIButton, UIConstruction, UIHire, game) {
        function UIController(scene) {
            Entity.call(this, Zero(), new V2(screen.w, screen.h));

            this.setParent(scene);

            this.b_size_x = 83;
            this.b_size_y = 84;
            this.b_margin = 24;

            this.button_construct = new UIButton(new V2(this.b_margin, this.size.y - this.b_size_y), "construct", this);
            this.button_hire = new UIButton(new V2(this.b_margin * 2 + this.b_size_x, this.size.y - this.b_size_y), "hire", this);
            this.button_pause = new UIButton(new V2(this.size.x - this.b_margin * 2 - this.b_size_x * 2, this.size.y - this.b_size_y), "pause", this);
            this.button_menu = new UIButton(new V2(this.size.x - this.b_margin - this.b_size_x, this.size.y - this.b_size_y), "menu", this);

            this.add(this.button_construct);
            this.add(this.button_hire);
            this.add(this.button_pause);
            this.add(this.button_menu);

            // Status
            this.construction_open = false;
            this.hire_open = false;
            this.menu_open = false;

            // Temp saves
            this.current_menu = null;
        }

        UIController.prototype = new Entity();

        UIController.prototype.isMenuOpen = function () {
            return this.construction_open || this.menu_open || this.hire_open;
        };

        UIController.prototype.TogglePause = function() {
            // Reject if menu is open
            if (this.isMenuOpen())
                return false;

            this.parent.Pause();
            return true;
        };

        UIController.prototype.ToggleConstructionMenu = function () {
            if (this.isMenuOpen() && !this.construction_open)
                return 0;

            var ret = 1;
            if (this.construction_open) {
                this.remove(this.current_menu);
                this.current_menu = null;
                this.construction_open = false;
                ret = 2;
            } else {
                this.current_menu = new UIConstruction(new V2(this.b_margin, screen.h - (this.b_margin + this.b_size_y)), this);
                this.add(this.current_menu);
                this.construction_open = true;
            }
            return ret;
        };

        UIController.prototype.ToggleHireMenu = function () {
            if (this.isMenuOpen() && !this.hire_open)
                return 0;

            var ret = 1;
            if (this.hire_open) {
                this.remove(this.current_menu);
                this.current_menu = null;
                this.hire_open = false;
                ret = 2;
            } else {
                this.current_menu = new UIConstruction(new V2(this.b_margin * 2 + this.b_size_x, screen.h - (this.b_margin + this.b_size_y)), this);
                this.add(this.current_menu);
                this.hire_open = true;
            }
            return ret;
        };

        UIController.prototype.ToggleMenu = function () {
            game.scene = require('config/scenes').menu;
        };

        return UIController;
    });
