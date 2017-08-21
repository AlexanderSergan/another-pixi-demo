// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container.
var app = new PIXI.Application();
console.log('app')
// The application will create a canvas element for you that you
// can then insert into the DOM.
document.body.appendChild(app.view);

console.log(PIXI.filters)

let pixelate = new PIXI.filters.PixelateFilter();


// load the texture we need
PIXI.loader.add('upLogo', 'upLogo.png').load(function (loader, resources) {

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

    // Listen for frame updates
    app.ticker.add(function () {
        // each frame we spin the upLogo around a bit
        // upLogo.rotation += 0.01;
    });
});