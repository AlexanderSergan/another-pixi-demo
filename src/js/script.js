// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container.
var app = new PIXI.Application();
document.body.appendChild(app.view);



let pixelate = new PIXI.filters.PixelateFilter(4);

// Line points, lineSize, lineColor
let clickHandler = pos  => {

    let line = new Line([20, app.renderer.height, pos.x, pos.y], 2)
  
    app.stage.addChild(line)
}



// line test

var p = 0; // Percentage

var graphics = new PIXI.Graphics();
app.stage.addChild(graphics)

function animate() {
    if (p < 1.00)  // while we didn't fully draw the line
        p += 0.01; // increase the "progress" of the animation

    graphics.clear();
    graphics.lineStyle(3, 0x33FF00);
    graphics.moveTo(30, 30);
    // This is the length of the line. For the x-position, that's 600-30 pixels - so your line was 570 pixels long.
    // Multiply that by p, making it longer and longer. Finally, it's offset by the 30 pixels from your moveTo above. 
    //So, when p is 0, the line moves to 30 (not drawn at all), and when p is 1, the line moves to 600 (where it was for you).
    //For y, it's the same, but with your y values.
    graphics.lineTo(30 + (600 - 30) * p, 30 + (300 - 30) * p);

    
    app.renderer.render(app.stage);
    requestAnimationFrame(animate);
}
animate()

/*
    Hitarea initialization
*/

let hitArea = new PIXI.Graphics()
hitArea.beginFill()
hitArea.drawRect(0, 0, app.renderer.width, app.renderer.height)
hitArea.endFill()

hitArea.interactive = true
hitArea.alpha = 0
hitArea.on('pointerdown', e => clickHandler(e.data.getLocalPosition(app.stage)))

app.stage.addChildAt(hitArea, 0)



var line = new Line([0, app.renderer.height, 0, 0], 2 );
app.stage.addChild(line);

window.addEventListener("mousemove", e => line.updatePoints([null, null, e.clientX, e.clientY]), false);


// load the texture we need
PIXI.loader.add('upLogo', '../src/img/upLogo.png').load(function (loader, resources) {

    // This creates a texture from a 'upLogo.png' image.
    var upLogo = new PIXI.Sprite(resources.upLogo.texture);

    // Setup the position of the upLogo
    upLogo.width = app.renderer.width / 6;
    upLogo.height = app.renderer.height / 5;

    // Rotate around the center
    // upLogo.anchor.x = 0.5;
    // upLogo.anchor.y = 0.5;

    upLogo.position.x = 50;
    upLogo.position.y = 50;

    // Add the upLogo to the scene we are building.
    app.stage.addChild(upLogo);
    app.stage.filters = [ pixelate ]


    app.stage.interactive = true;


    // Listen for frame updates
    app.ticker.add(function () {
        // each frame we spin the upLogo around a bit
        // upLogo.rotation += 0.01;
    });
});