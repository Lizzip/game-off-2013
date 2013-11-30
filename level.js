pc.script.create('level', function (context) {
    var sound = true;
	
    var Level = function (entity) {
        this.entity = entity;
    };

    Level.prototype = {
        initialize: function(){
            if(sound) this.entity.audiosource.play('Jarvic8');
        },
        
        disableSound: function(){
            sound = false;
        }
    };

   return Level;
});