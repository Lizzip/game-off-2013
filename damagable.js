pc.script.create('damagable', function (context) {
    var Damagable = function (entity) {
        this.entity = entity;
        
        this.health = 10;
        
        pc.extend(this, pc.events);
    };

    Damagable.prototype = {
        update: function (dt) {
        },
        
        doDamage: function (damage, dealer) {
            this.health -= damage;
            if (this.health <= 0) {
                this.fire("killed", dealer);
            }
        }
    };

   return Damagable;
});