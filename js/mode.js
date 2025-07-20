var stopalles = false;
window.addEventListener('message', function(event){
    const leonis = event.data;
    if (leonis.type == "mode-selector") {
        $('.body-hud').fadeOut(500);
        $('.headshot-hud').fadeOut(500);
        stopalles = false;
        $('.mode-selector').fadeIn(500);
        $('#mode-selector_name').text(leonis.name);
        $('#mode-selector_banner').attr('src', leonis.banner);
        $('#mode-selector_pb').attr('src', leonis.pb);
        $('#mode-selector_level').css('width', leonis.level + '%');
        $('#mode-selector_playerBody').text(leonis.modes.body);
        $('#mode-selector_playerHead').text(leonis.modes.headshot);
    } else if (leonis.type == "showSpawnMenu") {
        $(".charterMenu-container").fadeTo("fast", 1.0);
        stopalles = false;
        
        $(".charterMenu-spawnPoints-list").empty();
        $(".charterMenu-spawnPoints-list").append(`
            ${(() => {
                let spawnPoints = ``;

                for (let i = 0; i < leonis.spawns.length; i++) {
                    let staticVal = leonis.spawns[i].static;
                    spawnPoints += `
                        <div data-name="${leonis.spawns[i].name}" data-static="${staticVal}" class="charterMenu-spawnPoint">
                            <span></span>
                            <h1>${leonis.spawns[i].name}</h1>
                        </div>
                    `;
                }

                return spawnPoints
            })()}
        `);

        $(".charterMenu-spawnPoint").hover(
            function () {
                if (stopalles) return;
                $(".charterMenu-sections").stop(true, true).fadeTo("fast", 0.25);
                $.post(
                    "https://framework/ShowSpawnCam",
                    JSON.stringify({
                        name: $(this).data("name"),
                        static: $(this).data("static"),
                    })
                );
            },
            function () {
                if (stopalles) return;
                $(".charterMenu-sections").fadeTo("fast", 1.0);
                $.post("https://framework/HideSpawnCam");
            }
        );

        $(".charterMenu-spawnPoint").on("click", function () {
            const staticVal = $(this).data("static");
            const name = $(this).data("name");
            PlayChar(staticVal, name);
        });
    }
});

const PlayChar = (staticVal, name) => {
    stopalles = true;
    $(".charterMenu-container").fadeOut(500);
    $(".charterMenu-spawnPoints-list").empty();
    $.post("https://framework/PlayChar", JSON.stringify({ static: staticVal, name: name }));
}

$('.mode-selector .btn').click(function() {
    const mode = $(this).data('mode');
    $('.mode-selector').fadeOut(500);
    if (mode) {
        $.post('https://framework/select_modus', JSON.stringify({ mode: mode }));
    }
})