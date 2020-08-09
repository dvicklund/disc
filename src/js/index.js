window.onload = function() {

  console.log('loading')

  var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#30aa10',
    physics: {
      default: 'matter',
      matter: {
        enableSleeping: true,
        gravity: {
          y: 1
        },
        debug: {
          showBody: true,
          showStaticBody: true
        }
      }
    },
    scene: {
      preload: preload,
      create: create,
      update: update
    }
  };

  var game = new Phaser.Game(config);

  function preload () {
    this.load.setBaseURL('http://labs.phaser.io');

    this.load.image('red', 'assets/particles/red.png');
    this.load.image('rick', 'assets/sprites/rick.png');
  }

  function create () {
    var particles = this.add.particles('red');

    var emitter = particles.createEmitter({
      speed: 100,
      scale: { start: 1, end: 0 },
      blendMode: 'ADD'
    });

    this.matter.world.setBounds(0, 0, game.config.width, game.config.height);

    this.input.on('pointerdown', function(pointer) {
      var bodiesUnderPointer = Phaser.Physics.Matter.Matter.Query.point(this.matter.world.localWorld.bodies, pointer);

      if(bodiesUnderPointer.length == 0) {
        this.matter.add.sprite(pointer.x, pointer.y, 'rick');
      }
    }, this)

  }

  function update() {

  }
}
