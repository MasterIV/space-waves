define(['basic/entity', 'geo/v2', 'basic/text', 'basic/image', 'core/mouse', 'core/graphic', 'config/fonts', 'core/game'],
    function(Entity, V2, TextEntity, ImageEntity, mouse, g, f, game) {
        g.add('img/unit_info_bar.png');

        function VolumeMeter(pos, type) {
            Entity.call(this, pos, new V2(500, 100));

            switch (type) {
                case "sounds":
                    this.name = new TextEntity(Zero(), "Sound volume:", f.left);
                    this.meter = new TextEntity(new V2(410, 50), "100", f.left);
                    this.add(this.name);
                    this.add(this.meter);
                    break;
                case "music":
                    this.name = new TextEntity(Zero(), "Music volume:", f.left);
                    this.meter = new TextEntity(new V2(410, 50), "100", f.left);
                    this.add(this.name);
                    this.add(this.meter);
                    break;
            }

            this.type = type;
            this.dragged = false;
            this.maximum_width = 400;
            this.current_width = 100;

            this.img = g['img/unit_info_bar.png'];
        }

        VolumeMeter.prototype = new Entity();

        VolumeMeter.prototype.align = function () {
            this.name.position.x = 0;
        };

        VolumeMeter.prototype.onMouseDown = function (p) {
            this.dragged = true;
            return true;
        };

        VolumeMeter.prototype.onMouseUp = function () {
            this.dragged = false;
            return true;
        };

        VolumeMeter.prototype.onUpdate = function (p) {
            if (this.dragged) {
                var x = mouse.x - this.parent.position.x;
                if (x < this.position.x)
                    this.setMeter(0);
                else if(x > this.position.x + this.maximum_width)
                    this.setMeter(100);
                else {
                    x -= this.position.x;
                    x /= 4;
                    x = Math.round(x);
                    this.setMeter(x);
                }
            }
        };

        VolumeMeter.prototype.onDraw = function (ctx) {
            ctx.drawImage(this.img, 0, 65, this.current_width * 4, 20);
            ctx.strokeStyle = '#fff';
            ctx.strokeRect(0,0, 500, 100);
        };

        VolumeMeter.prototype.setMeter = function (val) {
            if (val < 0) val = 0;
            if (val > 100) val = 100;
            this.current_width = val;
            this.meter.text = val;

            if (this.type == "sounds")
                game.soundVolume = val;
            if (this.type == "music") {
                document.getElementById("game_music").volume = val / 100;
                document.getElementById("pause_music").volume = val / 100;
            }
        };

        return VolumeMeter;
    });
