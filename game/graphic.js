
function refreshLives()
{
    var vlives = document.getElementById("player1");
    vlives.innerHTML = "Joueur 1: " + lives + " vie(s) restante(s)";
    vlives.className = "poulet";
}

function oulalaJeMeurs() // most usefull function
{
    player1.dead();
}

function oulalaJaiMal(multiplicateur = 1)
{
    if (Date.now() > invincibleDate)
    {
        lives -= multiplicateur;
        if (lives <= 0)
        {
            oulalaJeMeurs();
        }
        refreshLives();
        invincibleDate = new Date();
        invincibleDate.setSeconds(invincibleDate.getSeconds() + 5);
    }
    
}


function init()
{
    // set some camera attributes
    lives = 5;
    refreshLives();
    invincibleDate = new Date();
    invincibleDate.setSeconds(invincibleDate.getSeconds() + 5);

    var VIEW_ANGLE = 45,
        ASPECT = WIDTH / HEIGHT,
        NEAR = 0.1,
        FAR = 10000;

    $container = $('#container');
    renderer = new THREE.WebGLRenderer();
    camera = new THREE.PerspectiveCamera(VIEW_ANGLE,
                                    ASPECT,
                                    NEAR,
                                    FAR);
    scene = new THREE.Scene();
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    camera.position.z = 500;
    scene.add(camera);

    renderer.setSize(WIDTH, HEIGHT);

    $container.append(renderer.domElement);

    noGround = [];
    
    
    ground = new Ground(0xffffff, WIDTH, HEIGHT, 10);
    player1 = new Player("player1", 0xffff00, new THREE.Vector2(minX, minY), 0);

    enemi1 = new Player("Enemi1", 0xffc0cb, new THREE.Vector2(0, 0), 0);


    scene.add(player1.graphic);
    scene.add(enemi1.graphic);

    light1 = new Light("sun", 0xffffff, "0,0,340");
    scene.add(light1);
}

function Ground(color, size_x, size_y, nb_tile)
{
    colors = Array(0xff0000, 0x00ff00, 0x0000ff, 0x000000);

    sizeOfTileX = size_x / nb_tile;
    minX = -(size_x/2);
    maxX = (size_x/2);
    
    sizeOfTileY = size_y / nb_tile;
    minY = -(size_y/2);
    maxY = (size_y/2);
    for (x = minX; x <= maxX; x = x+sizeOfTileX){
        for (y = minY; y <= maxY; y = y+sizeOfTileY){

            color = colors[Math.floor(Math.random()*colors.length)];
            if (x == minX && y == minY)
            {
                color = 0xff0000;
                tmpGround = new THREE.Mesh(
                    new THREE.PlaneGeometry(sizeOfTileX-10, sizeOfTileY-10),
                    new THREE.MeshLambertMaterial({color: color, transparent: true, opacity: 0.6}));
                    tmpGround.position.x = x;
                    tmpGround.position.y = y;
                    scene.add(tmpGround);
            }
            else if (0x000000 != color)
            {
                tmpGround = new THREE.Mesh(
                new THREE.PlaneGeometry(sizeOfTileX-10, sizeOfTileY-10),
                new THREE.MeshLambertMaterial({color: color, transparent: true, opacity: 0.6}));
                tmpGround.position.x = x;
                tmpGround.position.y = y;
                scene.add(tmpGround);
            }
            else
                noGround.push([x, y]);
        }
    }
}

function Light(name, color, position)
{
    pointLight = new THREE.PointLight(color, 50, 9999); //https://coubsecure-s.akamaihd.net/get/b28/p/coub/simple/cw_timeline_pic/0a2702ca21f/04d7f828fcbd4cfe83cf4/med_1465070451_image.jpg

    pointLight.position.x = position.split(',')[0];
    pointLight.position.y = position.split(',')[1];
    pointLight.position.z = position.split(',')[2];

    return pointLight;
}
