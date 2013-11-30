pc.script.create('ui', function (context) {
    
    var css = [
        '.state {',
            'color: white;',
            'background-color:red;',
            'width: 100px;',
            'height: 50px;',
            'position: absolute;',
            'text-align: left;',
            'align: left;',
            'font-size: xx-large;',
            'font-weight: bold;',
            'top: 0%;',
            'left: 0%;',
            'font-family: Andale Mono;',
        '}',
        '.remaining {',
            'color: black;',
            'background-color:white;',
            'width: 100px;',
            'height: 50px;',
            'position: absolute;',
            'text-align: center;',
            'align: left;',
            'font-size: large;',
            'font-weight: bold;',
            'top: 0%;',
            'left: 0%;',
            'border: 3px solid #000000;',
            'padding: 3px;',
            'font-family: Arial;',
        '}',
        '.cross {',
            'color: white;',
            'position: absolute;',
            'text-align: center;',
            'align: center;',
            'font-size: xx-large;',
            'font-weight: bold;',
            'top: 50%;',
            'left: 50%;',
            'font-family: Andale Mono;',
        '}',
    ].join('\n');
    
    var style = document.createElement('style');
    style.innerHTML = css;
    document.getElementsByTagName("head")[0].appendChild(style);
    
    var Ui = function (entity) {
        this.entity = entity;
        this.container = document.getElementById('application-container');
        
        /*this.div = document.createElement('div');
        this.div.innerHTML = "<div class='state'></div>";
        this.container.appendChild(this.div);*/
        
        this.div = document.createElement('div');
        this.div.innerHTML = "<div class='remaining'>15 remaining</div>";
        this.container.appendChild(this.div);
        
        this.crossHair = document.createElement('div');
        this.crossHair.innerHTML = "<div class='cross'>+</div>";
        this.container.appendChild(this.crossHair);
        
        this.state;
    };

    Ui.prototype = {
        updateEnemyNum: function(num){
            $('div.remaining').eq(0).text(num + " remaining");
        }
        /*
        switch: function(state){
            $('.state')[0].style.backgroundColor = state;
            this.state = state;
        },
        
        win: function(){
            $('div.state').eq(0).text("Win");
        }*/
    };

   return Ui;
});