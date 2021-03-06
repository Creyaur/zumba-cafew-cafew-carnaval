var bulletTime1 = 0;

var bullet_player1_material = new THREE.MeshLambertMaterial(
{
    color: 0x00ff00, 
    transparent: false
});

function shoot()
{
    if (keyboard.pressed("space") && bulletTime1 + 0.1 < clock.getElapsedTime())
    {
        bullet = new THREE.Mesh(
            new THREE.SphereGeometry(2),
            bullet_player1_material);
        scene.add(bullet);
        bullet.position.x = player1.graphic.position.x + 7.5 * Math.cos(player1.direction);
        bullet.position.y = player1.graphic.position.y + 7.5 * Math.sin(player1.direction);
        bullet.angle = player1.direction;
        player1.bullets.push(bullet);
        bulletTime1 = clock.getElapsedTime();
    } 

    // move bullets
    var moveDistance = 5;

    for (var i = 0; i < player1.bullets.length; i++)
    {
        player1.bullets[i].position.x += moveDistance * Math.cos(player1.bullets[i].angle);
        player1.bullets[i].position.y += moveDistance * Math.sin(player1.bullets[i].angle);
    }

}

function collisions()
{
    bullet_collision();
    player_collision();
    player_falling();
}

function bullet_collision()
{
    //collision between bullet and walls
    for (var i = 0; i < player1.bullets.length; i++)
    {
        bulletPosX = player1.bullets[i].position.x;
        bulletPosY = player1.bullets[i].position.y;
        if (Math.abs(bulletPosX) >= WIDTH / 2 ||
            Math.abs(bulletPosY) >= HEIGHT / 2)
        {
            scene.remove(player1.bullets[i]);
            player1.bullets.splice(i, 1);
            i--;
        }
        else if (((enemi1.position.x + 10) > bulletPosX && (enemi1.position.x - 10) < bulletPosX)
            &&
            ((enemi1.position.y + 10) > bulletPosY && (enemi1.position.y - 10) < bulletPosY))
        {
            scene.remove(enemi1.graphic);
            scene.remove(player1.bullets[i]);
            player1.bullets.splice(i, 1);
            i--;
        }
    }

}