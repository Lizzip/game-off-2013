pc.script.create('lighting', function (context) {
    var Lighting = function (entity) {
        this.entity = entity;
        context.scene.setGlobalAmbient(0.1, 0.1, 0.1);
    };

    Lighting.prototype = {
        update: function (dt) {
        }
    };

   return Lighting;
});