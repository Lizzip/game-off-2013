pc.script.create('win_pad', function (context) {
    // Creates a new Win_pad instance
    var Win_pad = function (entity) {
        this.entity = entity;
        this.entity.collision.on('collisionstart',this.startCollision);
    };

    Win_pad.prototype = {
        startCollision: function(){
            context.systems.script.broadcast('fps_character_controller', 'tryWin');
        }
    };

   return Win_pad;
});