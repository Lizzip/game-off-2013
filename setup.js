pc.script.create('setup_foes', function (context) {
    // Creates a new Setup_foes instance
    var Setup_foes = function (entity) {
        this.entity = entity;
    };

    Setup_foes.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            this.setupReds();
            this.setupGreens();
        },
        
        setupGreens: function(){
            var currentEnemy;
            
            currentEnemy = context.root.findByName("GreenEnemy1");
            currentEnemy = currentEnemy.script.instances.foe.instance;
            currentEnemy.setColour("green");
            currentEnemy.setHealth(100);
            currentEnemy.setPatrolPoints([pc.math.vec3.create(-25,1.6,15), pc.math.vec3.create(-25,1.6,-45)]);
            
            
            currentEnemy = context.root.findByName("GreenEnemy2");
            currentEnemy = currentEnemy.script.instances.foe.instance;
            currentEnemy.setColour("green");
            currentEnemy.setHealth(100);
            currentEnemy.setPatrolPoints([pc.math.vec3.create(-5,1.6,35), pc.math.vec3.create(-5,1.6,5)]);
            
            
            currentEnemy = context.root.findByName("GreenEnemy3");
            currentEnemy = currentEnemy.script.instances.foe.instance;
            currentEnemy.setColour("green");
            currentEnemy.setHealth(100);
            
            
            currentEnemy = context.root.findByName("GreenEnemy4");
            currentEnemy = currentEnemy.script.instances.foe.instance;
            currentEnemy.setColour("green");
            currentEnemy.setHealth(100);
            currentEnemy.setPatrolPoints([pc.math.vec3.create(55,1.6,-5), pc.math.vec3.create(25,1.6,-5)]);
            
            
            currentEnemy = context.root.findByName("GreenEnemy5");
            currentEnemy = currentEnemy.script.instances.foe.instance;
            currentEnemy.setColour("green");
            currentEnemy.setHealth(100);
            currentEnemy.setPatrolPoints([pc.math.vec3.create(85,1.6,15), pc.math.vec3.create(85,1.6,-15)]);
            
            
            currentEnemy = context.root.findByName("GreenEnemy6");
            currentEnemy = currentEnemy.script.instances.foe.instance;
            currentEnemy.setColour("green");
            currentEnemy.setHealth(100);
            
            
            currentEnemy = context.root.findByName("GreenEnemy7");
            currentEnemy = currentEnemy.script.instances.foe.instance;
            currentEnemy.setColour("green");
            currentEnemy.setHealth(100);
            currentEnemy.setPatrolPoints([pc.math.vec3.create(45,1.6,-35),pc.math.vec3.create(45,1.6,-55)]);
            
            
            currentEnemy = context.root.findByName("GreenEnemy8");
            currentEnemy = currentEnemy.script.instances.foe.instance;
            currentEnemy.setColour("green");
            currentEnemy.setHealth(100);
            currentEnemy.setPatrolPoints([pc.math.vec3.create(65,1.6,-35),pc.math.vec3.create(65,1.6,-55)]);
            
            
            currentEnemy = context.root.findByName("GreenEnemy9");
            currentEnemy = currentEnemy.script.instances.foe.instance;
            currentEnemy.setColour("green");
            currentEnemy.setHealth(100);
            currentEnemy.setPatrolPoints([pc.math.vec3.create(85,1.6,-35),pc.math.vec3.create(85,1.6,-55)]);
            
            
            currentEnemy = context.root.findByName("GreenEnemy10");
            currentEnemy = currentEnemy.script.instances.foe.instance;
            currentEnemy.setColour("green");
            currentEnemy.setHealth(100);
            currentEnemy.setPatrolPoints([pc.math.vec3.create(105,1.6,-35),pc.math.vec3.create(105,1.6,-55)]);
        },
        
        setupReds: function(){
            var currentEnemy;
            
            currentEnemy = context.root.findByName("RedEnemy1");
            currentEnemy = currentEnemy.script.instances.foe.instance;
            currentEnemy.setColour("red");
            currentEnemy.setHealth(100);
            
            
            currentEnemy = context.root.findByName("RedEnemy2");
            currentEnemy = currentEnemy.script.instances.foe.instance;
            currentEnemy.setColour("red");
            currentEnemy.setHealth(100);
            currentEnemy.setPatrolPoints([pc.math.vec3.create(15,1.6,-35),pc.math.vec3.create(15,1.6,-55)]);
            
            
            currentEnemy = context.root.findByName("RedEnemy3");
            currentEnemy = currentEnemy.script.instances.foe.instance;
            currentEnemy.setColour("red");
            currentEnemy.setHealth(100);
            currentEnemy.setPatrolPoints([pc.math.vec3.create(65,1.6,-25),pc.math.vec3.create(35,1.6,-25)]);
            
            
            currentEnemy = context.root.findByName("RedEnemy4");
            currentEnemy = currentEnemy.script.instances.foe.instance;
            currentEnemy.setColour("red");
            currentEnemy.setHealth(100);
            
            
            currentEnemy = context.root.findByName("RedEnemy5");
            currentEnemy = currentEnemy.script.instances.foe.instance;
            currentEnemy.setColour("red");
            currentEnemy.setHealth(100);
            currentEnemy.setPatrolPoints([pc.math.vec3.create(75,1.6,35),pc.math.vec3.create(75,1.6,25)]);
        },
        
        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
        }
    };

   return Setup_foes;
});