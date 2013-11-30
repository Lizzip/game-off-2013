pc.script.create('foe', function (context) {
    // Creates a new Foe instance
    var Foe = function (entity) {
        this.entity = entity;
        this.patrolPoints = [];
        this.activePatrolPoint = 0;
    };

    Foe.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            this.player = context.root.findByName("Player");
            context.systems.rigidbody.on("contact", this.onContact, this);
        },

        setPatrolPoints: function(points){
            this.patrolPoints = points;
        },
        
        setColour: function(color){
            this.entity.colour = color;
        },
        
        setHealth: function(health){
            this.entity.health = health;  
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            if(this.patrolPoints.length > 0)
            {
                if(this.distance(this.entity.getPosition(),this.patrolPoints[this.activePatrolPoint]) > 0.1)
                {
                    var direction = this.calcDirection();
                    var pos = this.entity.getPosition();
                    
                    switch(direction){
                        case 0:
                            pos[0] += 10 * dt;
                            break;
                        case 1:
                            pos[0] -= 10 * dt;
                            break;
                        case 2:
                            pos[2] += 10 * dt;
                            break;
                        case 3:
                            pos[2] -= 10 * dt;
                            break;
                    }
                    
                    this.entity.setPosition(pos);
                    this.entity.rigidbody.syncEntityToBody();
                }
                else
                {
                    this.activePatrolPoint++;
                    
                    if(this.activePatrolPoint === this.patrolPoints.length)
                    {
                        this.activePatrolPoint = 0;
                    }
                }                
            }            
        },
        
        distance: function(a,b)
        {
            var distX = a[0] - b[0];
            var distZ = a[2] - b[2];
            var distance = distX * distX + distZ * distZ;
            distance = Math.sqrt(distance);
            return distance;
        },
        
        calcDirection: function(){
            //0 = +x, 1 = -x, 2 = +y, 3 = -y
            var currentPos = this.entity.getPosition();
            var destPos = this.patrolPoints[this.activePatrolPoint];
            var moveX = false, direction = 0;
            
            if(currentPos[0] !== destPos[0]) moveX = true;
            
            if(moveX)
            {
                if(currentPos[0] > destPos[0]) direction = 1;
            }
            else
            {
                if(currentPos[2] > destPos[2]) direction = 3;
                else direction = 2;
            }
            
            return direction;
        },
        
        onContact: function(result){ 
            if (result.a === this.player && result.b === this.entity) {
                this.player.script.send("damagable", "doDamage", 10, this.entity);
            }
        }
    };

   return Foe;
});