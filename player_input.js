pc.script.create('player_input', function (context) {
    var invertY = false;
    
    var PlayerInput = function (entity) {
        this.entity = entity;
        this.heading = pc.math.vec3.create();
            
        // Euler angles used to do camera look
        this.ex = 0;
        this.ey = -90;
        this.ez = 0;
    };
    
    PlayerInput.LEFT = 'left';
    PlayerInput.RIGHT = 'right';
    PlayerInput.FORWARD = 'forward';
    PlayerInput.BACK = 'back';
    PlayerInput.SWITCH = 'switch';
    
    var state = 0;
    var stateCooldown = 0;
    var delay = 0;
        
    PlayerInput.prototype = {
        initialize: function () {
            context.controller = new pc.input.Controller(document);
            
            context.controller.registerKeys(PlayerInput.LEFT, [pc.input.KEY_A, pc.input.KEY_Q, pc.input.KEY_LEFT]);
            context.controller.registerKeys(PlayerInput.RIGHT, [pc.input.KEY_D, pc.input.KEY_RIGHT]);
            context.controller.registerKeys(PlayerInput.FORWARD, [pc.input.KEY_W, pc.input.KEY_Z, pc.input.KEY_UP]);
            context.controller.registerKeys(PlayerInput.BACK, [pc.input.KEY_S, pc.input.KEY_DOWN]);
            
            // Disabling the context menu stops the browser displaying a menu when 
            // you right-click the page
            context.mouse.disableContextMenu();
            // Catch mousemove and mousedown events
            context.mouse.on(pc.input.EVENT_MOUSEMOVE, this.onMouseMove, this);
            context.mouse.on(pc.input.EVENT_MOUSEDOWN, this.onMouseDown, this);

            // This API needs to change!
            this.character = this.entity.script.instances.fps_character_controller.instance;
            this.heading = pc.math.vec3.create();
            this.right = pc.math.vec3.create();
            this.direction = pc.math.vec3.create();
            
            this.camera = this.entity.findByName("Camera");
            this.floor = context.root.findByName("Floor");
        },
        
        update: function (dt) {
            if(stateCooldown > 0) stateCooldown -= dt;
            
            this.camera.setEulerAngles(this.ex, this.ey, 0);
            
            pc.math.vec3.set(this.direction, 0, 0, 0);
            
            if (context.controller.isPressed(PlayerInput.LEFT)) {
                this.direction = this.getLeft();
            } else if (context.controller.isPressed(PlayerInput.RIGHT)) {
                this.direction = this.getRight();
            }
            
            if (context.controller.isPressed(PlayerInput.FORWARD)) {
                pc.math.vec3.add(this.direction, this.getHeading(), this.direction);
            } else if (context.controller.isPressed(PlayerInput.BACK)) {
                pc.math.vec3.add(this.direction, this.getReverseHeading(), this.direction);
            }
            
            if (pc.math.vec3.length(this.direction)) {
                pc.math.vec3.normalize(this.direction, this.direction);
            }
            
            this.character.move(this.direction);
        },
        
        getHeading: function () {
            pc.math.vec3.copy(this.camera.forwards, this.heading);
            this.heading[1] = 0;
            return pc.math.vec3.normalize(this.heading, this.heading);            
        },
        
        getReverseHeading: function () {
            this.getHeading();
            return pc.math.vec3.scale(this.heading, -1, this.heading);
        },
        
        getRight: function () {
            pc.math.vec3.copy(this.camera.right, this.right);
            this.right[1] = 0;
            return pc.math.vec3.normalize(this.right, this.right);
        },
        
        getLeft: function () {
            this.getRight();
            return pc.math.vec3.scale(this.right, -1, this.right);
        },
        
        invertYMovement: function(){
            invertY = true;
        },
        
        onMouseMove: function (event) {
            // Update the current Euler angles, clamp the pitch.
            
            if(invertY) this.ex += event.dy / 5;
            else this.ex -= event.dy / 5;
            
            this.ex = pc.math.clamp(this.ex, -90, 90);
            this.ey -= event.dx / 5;
        },
        
        onMouseDown: function (event) {
            context.mouse.enablePointerLock();
            
            if(delay === 0) delay = 1;
            else this.character.fire();
        }
    };

   return PlayerInput;
});