define([
    'basic/entity',
    'geo/v2',
    'basic/image',
    'core/graphic',
    'core/sound',
    'basic/layout',
    'config/screen',
    'basic/button',
    'config/fonts',
    'basic/text'
], function (Entity, V2, ImageEntity, g, s, Layout, screen, Button, fonts, TextEntity) {
    for (var i in rooms)
        if (rooms[i].buildable) {
            g.add(rooms[i].icon);
            g.add(rooms[i].img);
        }

    g.add('img/gui/main_btn_back.png');
    g.add('img/gui/main_btn_back_hover.png');
    g.add('img/build menu/build_UI.png');

    function HireButton(menu, room, cursor) {
        Entity.call(this, Zero());
        this.add(new ImageEntity(Zero(), 'img/build menu/build_UI.png'));
        this.add(new ImageEntity(new V2(3, 30), room.icon));
        this.add(new TextEntity(new V2(90, 15), room.name, fonts.roomTitle));

        var img = g[room.img];
        var scale = Math.min(120/img.width, 120/img.height);
        var pos = new V2(280 - img.width*scale*.5, 98 - img.height*scale*.5 )
        this.add(new ImageEntity(pos, room.img, scale));

        this.costs = new TextEntity(new V2(34, 117), room.costs, fonts.roomTitle);
        this.add(this.costs);
        this.add(new TextEntity(new V2(34, 146), room.energy, fonts.roomTitle));

        // TODO description


        this.inheritSize();
        this.room = room;
        this.cursor = cursor;
        this.menu = menu;
    }

    HireButton.prototype = new Entity();

    HireButton.prototype.onClick = function () {
        this.cursor.room = this.room;
        this.menu.close();
    };

    HireButton.prototype.refresh = function () {

    };

    function UIConstruction(cursor) {
        Entity.call(this, new V2(0, 0), new V2(screen.w, screen.h));

        var hLayout = new Layout.horizontal(Zero(), 20, 20);
        var vLayout = new Layout.vertical(Zero(), 20, 10);
        var count = 1;
        var self = this;

        for (var i in rooms)
            if (rooms[i].buildable) {
                vLayout.add(new HireButton(this, rooms[i], cursor));

                if (++count > 3) {
                    vLayout.align("center");
                    hLayout.add(vLayout);
                    vLayout = new Layout.vertical(Zero(), 20, 10);
                    count = 1;
                }
            }

        vLayout.align("center");
        hLayout.add(vLayout);
        hLayout.align("top");
        this.center(hLayout);

        this.center(Button.create(new V2(0, 600), function () {
            self.close();
        }).img('img/gui/main_btn_back.png').highlight('img/gui/main_btn_back_hover.png'))
    }

    UIConstruction.prototype = new Entity();

    UIConstruction.prototype.onDraw = function (ctx) {
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.fillRect(0, 0, this.size.x, this.size.y);
    };

    UIConstruction.prototype.close = function () {
        this.parent.remove(this);
    };

    UIConstruction.prototype.open = function () {
        this.dispatch(this.entities, 'refresh');
    };

    return UIConstruction;
});
