pc.script.create('main', function (context) {
    var currentState = "main", mainmenu = [{text:"Play", colour: "white"},{text: "Options", colour: "white"}], x, y,
    options = [{text:"Invert Y Axis", colour: "white", value: "N"}, {text: "Disable Sound", colour: "white", value: "N"}, {text:"Back", colour: "white"}];
    
    var COLOUR = {
        red: "red",
        white: "white",
        green: "green"
    };
    
    var STATE = {
        main: "main",
        options: "options"
    };
    
    function contains(event,obj){
        if(event.x > obj.x && event.y > obj.y && event.x < obj.xMax && event.y < obj.yMax)
        {
            return true;
        }
        else return false;
    }
    
    var Main = function (entity) {
        this.entity = entity;
    };

    Main.prototype = {
        initialize: function () {
            this.activeLevel = 0;
            this.currentWorld = null;
            this.levels = [
                'a1111fb2-0fc5-4251-bc48-19c1149c8873',
                'a93140ee-b1b6-4db0-b3cd-9cd78dfcc96c'
            ];            
            
            if(window.innerHeight > 450) y = 200;
            else y = 100;
            
            if(window.innerWidth > 750) x = 300;
            else x =  50; 
            
            currentState = STATE.main;
            this.createOverlayCanvas();
            this.drawLogo(x,y);
            
            this.draw();
        },
        
        loadWorld: function(){
            var packRequest = new pc.resources.PackRequest(this.levels[this.activeLevel]);
            
            context.loader.request(packRequest).then(function (packs) {
                var pack = packs[0];

                // add to hierarchy
                context.root.addChild(pack.hierarchy);
                // Initialise any systems with an initialize() method after pack is loaded
                pc.fw.ComponentSystem.initialize(pack.hierarchy);
            
                this.pack = pack;
                this.world = pack.hierarchy.findByName('outline');
                
                if(options[0].value === "Y") 
                {
                    context.systems.script.broadcast('player_input', 'invertYMovement');
                }
                
                if(options[1].value === "Y")
                {
                    context.systems.script.broadcast('gun', 'disableSound');
                }
                
            }.bind(this));
        },
        
        unloadWorld: function(){
            this.pack.hierarchy.destroy(context.systems);
            this.pack = null;
            this.world = null;
        },
        
        nextLevel: function(){
            this.unloadWorld();
            this.activeLevel++;
            this.loadWorld();
        },
        
        createOverlayCanvas: function(){
            $('body').append('<canvas id="hud_overlay" width="'+ window.innerWidth +'" height="'+ window.innerHeight +
            '" style="position: absolute; left: 0; top: 0; z-index: 1;"></canvas>');
            canvas = document.getElementById("hud_overlay");
            ctx = canvas.getContext("2d");
            canvas.addEventListener("mousedown", this.canvasClick);
            canvas.addEventListener("mousemove", this.canvasMove);
        },
        
        canvasClick: function(event){ 
            if(currentState === STATE.main)
            {                
                if(contains(event,{x:mainmenu[0].x, y:mainmenu[0].y - 48, xMax: mainmenu[0].x + ctx.measureText(mainmenu[0].text).width, yMax: mainmenu[0].y}))
                {
                    $(canvas).remove();
                    context.systems.script.broadcast('main', 'loadWorld');
                }
                else if(contains(event,{x:mainmenu[1].x, y:mainmenu[1].y - 48, xMax: mainmenu[1].x + ctx.measureText(mainmenu[1].text).width, yMax: mainmenu[1].y}))
                {
                    currentState = STATE.options;
                    context.systems.script.broadcast('main', 'draw');
                }
            }
            else if(currentState === STATE.options)
            {
                if(contains(event,{x:options[0].x, y:options[0].y - 48, xMax: options[0].x + ctx.measureText(options[0].text).width, yMax: options[0].y}))
                {
                    if(options[0].value === "Y") options[0].value = "N";
                    else options[0].value = "Y";
                    context.systems.script.broadcast('main', 'drawOptionItems',options[0].x,options[0].y);
                }
                else if(contains(event,{x:options[1].x, y:options[1].y - 48, xMax: options[1].x + ctx.measureText(options[1].text).width, yMax: options[1].y}))
                {
                    if(options[1].value === "Y") options[1].value = "N";
                    else options[1].value = "Y";
                    context.systems.script.broadcast('main', 'drawOptionItems',options[0].x,options[0].y);
                }
                else if(contains(event,{x:options[2].x, y:options[2].y - 48, xMax: options[2].x + ctx.measureText(options[2].text).width, yMax: options[2].y}))
                {
                    currentState = STATE.main;
                    context.systems.script.broadcast('main', 'draw');
                }
            }
        },
        
        canvasMove: function(event){
            if(currentState === STATE.main)
            {
                $.each(mainmenu, function( index, value ) {                    
                    if(contains(event,{x:value.x, y:value.y - 48, xMax: value.x + ctx.measureText(value.text).width, yMax: value.y}))
                    {
                        if(value.colour !== COLOUR.red)
                        {
                            value.colour = COLOUR.red;
                            context.systems.script.broadcast('main', 'drawIntroItems',mainmenu[0].x,mainmenu[0].y);
                        }
                    }
                    else
                    {
                        if(value.colour !== COLOUR.white)
                        {
                            value.colour = COLOUR.white;
                            context.systems.script.broadcast('main', 'drawIntroItems',mainmenu[0].x,mainmenu[0].y);
                        }
                    }
                });
            }
            else if(currentState === STATE.options)
            {
                $.each(options, function( index, value ) {                    
                    if(contains(event,{x:value.x, y:value.y - 48, xMax: value.x + ctx.measureText(value.text).width, yMax: value.y}))
                    {
                        if(value.colour !== COLOUR.red)
                        {
                            value.colour = COLOUR.red;
                            context.systems.script.broadcast('main', 'drawOptionItems',options[0].x,options[0].y);
                        }
                    }
                    else
                    {
                        if(value.colour !== COLOUR.white)
                        {
                            value.colour = COLOUR.white;
                            context.systems.script.broadcast('main', 'drawOptionItems',options[0].x,options[0].y);
                        }
                    }
                });
            }
        },
        
        drawLogo: function(x,y){
            ctx.font = "bold 64px Arial";
            ctx.fillStyle = COLOUR.red;
            ctx.fillText("red/", x, y);
            ctx.fillStyle = COLOUR.green;
            ctx.fillText("/green", x + 106, y);
        },
                
        clearTextArea: function(x,y){
            ctx.clearRect(x-10,y-50,canvas.width,canvas.height);
        },
        
        drawIntroItems: function(x,y){
            this.clearTextArea(x,y);
            ctx.font = "bold 32px Arial";
            var offset = 0;
            
            $.each(mainmenu, function( index, value ) {
                ctx.fillStyle = value.colour;
                ctx.fillText(value.text, x, y + offset);
                value.x = x;
                value.y = y + offset;
                offset += 75;
            });
        },
        
        drawOptionItems: function(x,y){
            this.clearTextArea(x,y);
            ctx.font = "bold 32px Arial";
            var offset = 0;
            
            $.each(options, function( index, value ) {
                ctx.fillStyle = value.colour;
                ctx.fillText(value.text, x, y + offset);
                
                if(value.value) ctx.fillText("["+ value.value +"]", (x*2) + 250, y + offset);
                
                value.x = x;
                value.y = y + offset;
                offset += 75;
            });
        },
        
        draw: function(){
            if(currentState === STATE.main)
            {
                this.drawIntroItems(x,y+75);
            }
            else if(currentState === STATE.options)
            {
                this.drawOptionItems(x,y+75);
            }
        }
    };

   return Main;
});