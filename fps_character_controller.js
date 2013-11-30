pc.script.create('fps_character_controller', function (context) {
    var MOVE_SPEED = 10, shootingRange = 50, state = "red", enemiesAlive = 15;
    
    var FpsCharacterController = function (entity) {
        this.entity = entity;
        this.velocity = pc.math.vec3.create();
        
        this.initialPosition = pc.math.vec3.create();
    };

    FpsCharacterController.prototype = {
        initialize: function () {
            pc.math.vec3.copy(this.entity.getPosition(), this.initialPosition);
            
            this.damagable = this.entity.script.instances.damagable.instance;
            this.damagable.on("killed", this.onKilled, this);
            
            this.floor = context.root.findByName("Floor");
        },
        
        tryWin: function(){
            if(enemiesAlive < 1)
            {
                context.systems.script.broadcast('main', 'nextLevel');
            }
        },
        
        enemyDied: function(){
            enemiesAlive--;
            context.systems.script.broadcast('ui', 'updateEnemyNum', enemiesAlive);
        },
        
        update: function (dt) {
            this.entity.rigidbody.linearVelocity = pc.math.vec3.zero;
        },
                
        move: function (dir) {
            pc.math.vec3.scale(dir, MOVE_SPEED, this.velocity);
            this.entity.rigidbody.activate();
            this.entity.rigidbody.linearVelocity = this.velocity;
        },
        
        fire: function(){
            var camera = context.root.findByName("Camera");
            var currentPos = camera.getPosition();
            var wtm = camera.getWorldTransform();

            var end = pc.math.vec3.create();
            pc.math.mat4.getZ(wtm, end);
            pc.math.vec3.scale(end, -shootingRange, end);
            pc.math.vec3.add(currentPos, end, end);
            
            context.systems.rigidbody.raycastFirst(currentPos, end, function(result){
                if(result.entity)
                {
                    if(result.entity.colour === state)
                    {
                        result.entity.destroy();
                        context.systems.script.broadcast('fps_character_controller', 'enemyDied');
                    }
                }
            });
            context.systems.script.broadcast('gun', 'fire');
        },
        
        setState: function(newState, time){
            if(time < 1)
            {
                state = newState;
            }
            
            if(newState === "green")
            {
                if(time > 0)
                {
                    setTimeout(function(){
                        context.systems.script.broadcast('fps_character_controller', 'setState', "green", 0);
                    },time);
                }
                else this.floor.primitive.color = new pc.Color(0, 1, 0, 1);
            }
            else
            {
                if(time > 0)
                {
                    setTimeout(function(){
                        context.systems.script.broadcast('fps_character_controller', 'setState', "red", 0);
                    },time);
                }
                else this.floor.primitive.color = new pc.Color(1, 0, 0, 1);
            }
            
            this.raiseWalls();
        },
        
        raiseWalls: function(){
            var walls;
            
            if(state === "green")
            {
                walls = context.root.find("getName", "GreenWall");
                
                $.each(walls, function(index, value){
                    var pos = value.getPosition();
                    if(pos[1] < 3)
                    {
                        value.setPosition(pos[0], pos[1] + 5, pos[2]);
                        value.rigidbody.syncEntityToBody();
                    }
                });
                
                walls = context.root.find("getName", "RedWall");
                
                $.each(walls, function(index, value){
                    var pos = value.getPosition();
                    if(pos[1] > 2)
                    {
                        value.setPosition(pos[0], pos[1] - 5, pos[2]);
                        value.rigidbody.syncEntityToBody();
                    }
                });
            }
            else
            {
                walls = context.root.find("getName", "RedWall");
                
                $.each(walls, function(index, value){
                    var pos = value.getPosition();
                    if(pos[1] < 3)
                    {
                        value.setPosition(pos[0], pos[1] + 5, pos[2]);
                        value.rigidbody.syncEntityToBody();
                    }
                });
                
                walls = context.root.find("getName", "GreenWall");
                
                $.each(walls, function(index, value){
                    var pos = value.getPosition();
                    if(pos[1] > 2)
                    {
                        value.setPosition(pos[0], pos[1] - 5, pos[2]);
                        value.rigidbody.syncEntityToBody();
                    }
                });
            }
        },
        
        onKilled: function (killer) {
            this.entity.audiosource.play("restart");
            this.reset();
        },
        
        reset: function () {
            this.entity.setPosition(this.initialPosition);
            this.entity.rigidbody.syncEntityToBody();
        }
    };

   return FpsCharacterController;
});
