pc.script.create('gun', function (context) {
    var sound = true;
    // Creates a new Gun instance
    var Gun = function (entity) {
        this.entity = entity;
    };

    Gun.prototype = {
        fire: function(){
            if(sound) this.entity.audiosource.play('silencedShot');
        },
        
        disableSound: function(){
            sound = false;
        }
    };

   return Gun;
});