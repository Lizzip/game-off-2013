pc.script.create('green_plate', function (context) {    
    var Green_plate = function (entity) {
        this.entity = entity;
        
        this.entity.collision.on('collisionstart',this.startCollision);
        this.entity.collision.on('collisionend', this.endCollision);
    };

    Green_plate.prototype = {        
        startCollision: function(event){
            if(event.other._name === "Player")
            {
                context.systems.script.broadcast('fps_character_controller', 'setState', "green", 0);
            }
        },
        
        endCollision: function(event){
            if(event._name === "Player")
            {
                context.systems.script.broadcast('fps_character_controller', 'setState', "red", 0);
            }
        }
    };

   return Green_plate;
});