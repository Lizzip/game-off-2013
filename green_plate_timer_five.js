pc.script.create('green_plate_timer', function (context) {
    // Creates a new Green_plate_timer instance
    var Green_plate_timer = function (entity) {
        this.entity = entity;        
        this.entity.collision.on('collisionstart',this.startCollision);
        this.entity.collision.on('collisionend', this.endCollision);
    };

    Green_plate_timer.prototype = {
        
        startCollision: function(){
            context.systems.script.broadcast('fps_character_controller', 'setState', "green", 0);
        },
        
        endCollision: function(){
            context.systems.script.broadcast('fps_character_controller', 'setState', "red", 5000);
        }
    };

   return Green_plate_timer;
});