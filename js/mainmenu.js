var regeln = false;
function mainmenusidebar(side) {
    $('.mainmenuside').hide();
    $('.sidebariconbox i').css('color', 'rgba(255, 255, 255, 0.699)');
    $('.mainmenuside'+side).show(300);
    $('.main_header_actions_item').removeClass('selected_header');
    $('.page-'+side).addClass('selected_header');
};

$(".armyteleport").click(function() {
    $.post(`https://${GetParentResourceName()}/mainmenu`, JSON.stringify({action: 'teleport', location: 'army'}));
});
$(".obsateleport").click(function() {
    $.post(`https://${GetParentResourceName()}/mainmenu`, JSON.stringify({action: 'teleport', location: 'obsa'}));
});
$('.sandyteleport').click(function () { 
    $.post(`https://${GetParentResourceName()}/mainmenu`, JSON.stringify({action: 'teleport', location: 'sandyteleport'}));
});

$(".eventteleport").click(function() {
    $.post(`https://${GetParentResourceName()}/mainmenu`, JSON.stringify({action: 'teleport', location: 'event'}));
});

$(".frakteleport").click(function() {
    $.post(`https://${GetParentResourceName()}/mainmenu`, JSON.stringify({action: 'teleport', location: 'frak'}));
});

$('.silentlootdropteleport').click(function() { 
    $.post(`https://${GetParentResourceName()}/mainmenu`, JSON.stringify({action: 'teleport', location: 'silentlootdrop'}));
});

$('.closemainmenu').click(function() { 
    $.post(`https://${GetParentResourceName()}/mainmenu`, JSON.stringify({action: 'close'}));    
});

function closemainmenu(id, p, mp) {
    $.post(`https://${GetParentResourceName()}/mainmenu`, JSON.stringify({action: 'close'}));    
}

function joinffa(id, p, mp) {
    $.post(`https://${GetParentResourceName()}/joinffa`, JSON.stringify({id: id, players: p, maxplayers: mp}));
}

$(".Inventory_container_append").on("click", ".aufsatz", function() {
    const weapon = $(this).data("weapon");
    $.post(`https://${GetParentResourceName()}/mainmenu`, JSON.stringify({ action: 'upgradeweapon', weapon: weapon }));
});
$(".Inventory_container_append").on("click", ".wegwerfen", function() {
    const weapon = $(this).data("weapon");
    $.post(`https://${GetParentResourceName()}/mainmenu`, JSON.stringify({ action: 'removeweapon', weapon: weapon }));
});
$(".Inventory_container_append").on("click", ".geben", function() {
    const weapon = $(this).data("weapon");
    $.post(`https://${GetParentResourceName()}/mainmenu`, JSON.stringify({ action: 'giveweapon', weapon: weapon }));
});

$(".Inventory_container_append").on("click", ".useitem", function() {
    const weapon = $(this).data("weapon");
    $.post(`https://${GetParentResourceName()}/mainmenu`, JSON.stringify({ action: 'useitem', weapon: weapon }));
});
$(".Inventory_container_append").on("click", ".gebenitem", function() {
    const weapon = $(this).data("weapon");
    $.post(`https://${GetParentResourceName()}/mainmenu`, JSON.stringify({ action: 'giveitem', weapon: weapon }));
});

$(".fpsmode").change(function() {
    $.post(`https://${GetParentResourceName()}/mainmenu`, JSON.stringify({action: 'fps'}));
});
$(".nightmode").change(function() {
    $.post(`https://${GetParentResourceName()}/mainmenu`, JSON.stringify({action: 'night'}));
});
$(".drawfps").change(function() {
    $.post(`https://${GetParentResourceName()}/mainmenu`, JSON.stringify({action: 'drawfps'}));
    if (fps == false) {
        fps = true;
        $('.fps').show();
    } else {
        fps = false;
        $('.fps').hide();
    }
});
$(".wetterbutton").click(function() {
    var selectElement = document.querySelector(".wetterchoose");
    var selectedValue = selectElement.value;
    $.post(`https://${GetParentResourceName()}/mainmenu`, JSON.stringify({action: 'wetter', type: selectedValue}));
});

$('.verstanden').click(function() {
    if (regeln === true) {
        $('.aufnahme').fadeOut(200);
        $('.eventregeln').fadeIn(200);
    } else {
        $('.aufnahme').fadeOut(200);
        $.post(`https://${GetParentResourceName()}/mainmenu`, JSON.stringify({action: 'disableUI'}));
    }
});

$('.acceps').click(function() {
    $.post(`https://${GetParentResourceName()}/mainmenu`, JSON.stringify({action: 'disableUI'}));
    $('.eventregeln').fadeOut();
});

$(".pedsinvbody").on("click", ".anziehen", function() {
    const ped = $(this).data("ped");
    $.post(`https://${GetParentResourceName()}/mainmenu`, JSON.stringify({ action: 'pedanziehen', ped: ped }));
});

$(".pedsinvbody").on("click", ".ausziehen", function() {
    const ped = $(this).data("ped");
    $.post(`https://${GetParentResourceName()}/mainmenu`, JSON.stringify({ action: 'pedausziehen', ped: ped }));
});

function loadweapons(weapons) {
    $(".Inventory_container_append.weapons_shop").empty();
    $(".Inventory_container_append.items_shop").empty();
    const weaponInfoList = weapons;
    if (weaponInfoList !== undefined && weaponInfoList.length > 0) {
        weaponInfoList.forEach((weaponInfo) => {
            const itemHTML = `
            <div class="inventory_item" id="item_${weaponInfo.weaponitem}" onclick="showAttachments('${weaponInfo.weaponitem}', '${weaponInfo.weapon}', 'buy', ${weaponInfo.price}, '${weaponInfo.type}')">
                <div class="inventory_item_header">
                    <svg class="inventory_item_header_edit" xmlns="http://www.w3.org/2000/svg" width="24" height="6" viewBox="0 0 24 6" fill="none">
                        <path d="M6 3C6 4.65686 4.65686 6 3 6C1.34315 6 0 4.65686 0 3C0 1.34314 1.34315 0 3 0C4.65686 0 6 1.34314 6 3Z" fill="white" fill-opacity="0.45"/>
                        <path d="M15 3C15 4.65686 13.6569 6 12 6C10.3431 6 9 4.65686 9 3C9 1.34314 10.3431 0 12 0C13.6569 0 15 1.34314 15 3Z" fill="white" fill-opacity="0.45"/>
                        <path d="M21 6C22.6569 6 24 4.65686 24 3C24 1.34314 22.6569 0 21 0C19.3431 0 18 1.34314 18 3C18 4.65686 19.3431 6 21 6Z" fill="white" fill-opacity="0.45"/>
                    </svg>
                    <div class="inventory_item_header_status">
                        <div class="inventory_item_header_status_data"></div>
                    </div>
                </div>
                <img class="inventory_item_image" src="img/${weaponInfo.weaponitem}.png" alt="${weaponInfo.weaponitem}">
                <p class="inventory_item_label">${weaponInfo.weapon}</p>
            </div>
            `;
            if (weaponInfo.type === "WEAPON") {
                $('.Inventory_container_append.weapons_shop').append(itemHTML);
            } else {
                $('.Inventory_container_append.items_shop').append(itemHTML);
            }
        });
    }
};

function loadpedshop(peds) {
    $(".Inventory_container_append.peds_shop").empty();
    const PedsInfoList = peds;
    if (PedsInfoList !== undefined && PedsInfoList.length > 0) {
        PedsInfoList.forEach((PedInfo) => {
            const itemHTML = `
            <div class="inventory_item" id="item_${PedInfo.name}" onclick="showAttachments('${PedInfo.name}','${PedInfo.label}', 'pedbuy', ${PedInfo.price})">
                <div class="inventory_item_header">
                    <svg class="inventory_item_header_edit" xmlns="http://www.w3.org/2000/svg" width="24" height="6" viewBox="0 0 24 6" fill="none">
                        <path d="M6 3C6 4.65686 4.65686 6 3 6C1.34315 6 0 4.65686 0 3C0 1.34314 1.34315 0 3 0C4.65686 0 6 1.34314 6 3Z" fill="white" fill-opacity="0.45"/>
                        <path d="M15 3C15 4.65686 13.6569 6 12 6C10.3431 6 9 4.65686 9 3C9 1.34314 10.3431 0 12 0C13.6569 0 15 1.34314 15 3Z" fill="white" fill-opacity="0.45"/>
                        <path d="M21 6C22.6569 6 24 4.65686 24 3C24 1.34314 22.6569 0 21 0C19.3431 0 18 1.34314 18 3C18 4.65686 19.3431 6 21 6Z" fill="white" fill-opacity="0.45"/>
                    </svg>
                    <div class="inventory_item_header_status">
                        <div class="inventory_item_header_status_data"></div>
                    </div>
                </div>
                <img class="inventory_item_image" src="img/peds/${PedInfo.name}.png" alt="${PedInfo.name}">
                <p class="inventory_item_label">${PedInfo.label}</p>
            </div>
            `;
            $('.Inventory_container_append.peds_shop').append(itemHTML);

        });
    }
};

function loadffa(data) {
    if (data !== undefined && data.length > 0) {
        $(".ffabody").empty();
        data.forEach((v) => {
            const content = $(`
            <div class="ffaitem">
                <div class="preview">
                    <div class="previewhead">
                        <h2>${v.name}</h2>
                        <h3>FFA</h3>   
                    </div>
                    <img src="img/${v.name}.png" alt="">
                </div>
                <div class="ffabutton">
                    <button class="ffabutt" onclick="joinffa('${v.name}', ${v.players}, ${v.maxplayers})">Join</button>
                    <div class="showpl"><i class="fa-sharp fa-solid fa-person ffaicon"></i> ${v.players}/${v.maxplayers}</div>
                </div>                    
            </div>
            `);
            $(".ffabody").append(content);
        });
    }
};

function loadleaderboard(data) {
    $(".leaderboardbody").empty();
    if (data) {
        data.forEach((v, index) => {
            if (v.name === "0") {
                return;
            }
            let rankClass;
            if (index === 0) {
                rankClass = 'gold';
            } else if (index === 1) {
                rankClass = 'silver';
            } else if (index === 2) {
                rankClass = 'bronce';
            } else {
                rankClass = 'ranked';
            }
            const content = $(`
            <div class="rankeduser">
                <div class="rank">
                    <p class="${rankClass}">#${v.placement}</p>
                </div>
                <div class="rankedname">
                    <p>${v.name}</p>
                </div>
                <div class="rankedstat">
                    <p>${v.kills}</p>
                </div>
                <div class="rankedstat">
                    <p>${v.tode}</p>
                </div>
                <div class="rankedstat">
                    <p>${v.kd}</p>
                </div>
            </div>
            `);
            $(".leaderboardbody").append(content);
        });
    }
};       


var weapons = [];
function inventar(weapons, items) {
    $(".Inventory_container_append.items").empty();
    $(".Inventory_container_append.weapons").empty();
    if (weapons !== undefined && weapons.length > 0) {
        weapons.forEach((weapon) => {
            const itemHTML = `
            <div class="inventory_item" id="item_${weapon.name}" onclick="showAttachments('${weapon.name}','${weapon.label}', 'weapon')">
                <div class="inventory_item_header">
                    <svg class="inventory_item_header_edit" xmlns="http://www.w3.org/2000/svg" width="24" height="6" viewBox="0 0 24 6" fill="none">
                        <path d="M6 3C6 4.65686 4.65686 6 3 6C1.34315 6 0 4.65686 0 3C0 1.34314 1.34315 0 3 0C4.65686 0 6 1.34314 6 3Z" fill="white" fill-opacity="0.45"/>
                        <path d="M15 3C15 4.65686 13.6569 6 12 6C10.3431 6 9 4.65686 9 3C9 1.34314 10.3431 0 12 0C13.6569 0 15 1.34314 15 3Z" fill="white" fill-opacity="0.45"/>
                        <path d="M21 6C22.6569 6 24 4.65686 24 3C24 1.34314 22.6569 0 21 0C19.3431 0 18 1.34314 18 3C18 4.65686 19.3431 6 21 6Z" fill="white" fill-opacity="0.45"/>
                    </svg>
                    <div class="inventory_item_header_status">
                        <div class="inventory_item_header_status_data"></div>
                    </div>
                </div>
                <img class="inventory_item_image" src="img/${weapon.name}.png" alt="${weapon.name}">
                <p class="inventory_item_label">${weapon.label}</p>
            </div>
            `;
            $('.Inventory_container_append.weapons').append(itemHTML);
        });
    }

    if (items !== undefined && items.length > 0) {
        items.forEach((item) => {
            if (item.count > 0) {
                const itemHTML = `
                <div class="inventory_item" id="item_${item.name}" onclick="showAttachments('${item.name}','${item.label}', 'item', ${item.count})">
                    <div class="inventory_item_header">
                        <svg class="inventory_item_header_edit" xmlns="http://www.w3.org/2000/svg" width="24" height="6" viewBox="0 0 24 6" fill="none">
                            <path d="M6 3C6 4.65686 4.65686 6 3 6C1.34315 6 0 4.65686 0 3C0 1.34314 1.34315 0 3 0C4.65686 0 6 1.34314 6 3Z" fill="white" fill-opacity="0.45"/>
                            <path d="M15 3C15 4.65686 13.6569 6 12 6C10.3431 6 9 4.65686 9 3C9 1.34314 10.3431 0 12 0C13.6569 0 15 1.34314 15 3Z" fill="white" fill-opacity="0.45"/>
                            <path d="M21 6C22.6569 6 24 4.65686 24 3C24 1.34314 22.6569 0 21 0C19.3431 0 18 1.34314 18 3C18 4.65686 19.3431 6 21 6Z" fill="white" fill-opacity="0.45"/>
                        </svg>
                        <div class="inventory_item_header_status">
                            <div class="inventory_item_header_status_data"></div>
                        </div>
                    </div>
                    <img class="inventory_item_image" src="img/${item.name}.png" alt="${item.name}">
                    <p class="inventory_item_label">${item.label}</p>
                </div>
                `;
                $('.Inventory_container_append.items').append(itemHTML);
            }
        });
    }
};

function InventoryDoShit(name, label, type, type2, price) {
    switch (type) {
        case 'give':
            if (type2 == "WEAPON")  {
                $.post(`https://${GetParentResourceName()}/mainmenu`, JSON.stringify({action: 'giveweapon', weapon:name}));
            } else {
                $.post(`https://${GetParentResourceName()}/mainmenu`, JSON.stringify({action: 'giveitem', weapon:name}));
            }
            break;
        case 'remove':
            if (type2 == "WEAPON")  {
                $.post(`https://${GetParentResourceName()}/mainmenu`, JSON.stringify({action: 'removeweapon', weapon:name, item:false}));
            } else {
                $.post(`https://${GetParentResourceName()}/mainmenu`, JSON.stringify({action: 'removeweapon', weapon:name, item:true}));
            }
            break;
        case 'useitem':
            $.post(`https://${GetParentResourceName()}/mainmenu`, JSON.stringify({action: 'useitem', weapon:name }));
            break;
        case 'pedanziehen':
            $.post(`https://${GetParentResourceName()}/mainmenu`, JSON.stringify({action: 'pedanziehen', ped:name }));
            break;
        case 'pedausziehen':
            $.post(`https://${GetParentResourceName()}/mainmenu`, JSON.stringify({action: 'pedausziehen'}));
            break;
        case 'pedshopshow':
            $.post(`https://${GetParentResourceName()}/mainmenu`, JSON.stringify({action: 'pedshopshow', ped:{name:name,label:label,type2:type2}}));
            break;
        case 'buy':
            if (type2 !== "PED") {
                $.post(`https://${GetParentResourceName()}/mainmenu`, JSON.stringify({action: 'weaponshop', weapon:{name:name,label:label,type:type2,price:price}}));
            } else {
                $.post(`https://${GetParentResourceName()}/mainmenu`, JSON.stringify({action: 'pedshop', ped:{name:name,label:label,price:price}}));
            }
            break;
        case 'sell':
            $.post(`https://${GetParentResourceName()}/mainmenu`, JSON.stringify({action: 'weaponshopsell', weapon:{name:name,label:label,type:type2,price:price}}));
            break;
    }
    $('.main_menu_inventory_popup').hide()
    $('.prepopup').hide()
}

function showAttachments(weapon, weaponLabel, type, price, type2) {
    var activationHTML
    switch (type) {
        case 'weapon':
            $('.prepopup').show();
            $(".main_menu_inventory_popup").show();
            $('.main_popup_container').empty();
            $('.inv_popup_title').text(weaponLabel);
        
             activationHTML = `
                <div class="main_popup_item_sell" style="margin-bottom: 3px; color: rgb(55, 255, 0); background: rgba(122, 255, 60, 0.15);" onclick="InventoryDoShit('${weapon}', '${weaponLabel}', 'give', 'WEAPON')">
                    <p class="main_popup_item_sell_p">Geben</p>
                </div>
                <div class="main_popup_item_sell" style="margin-bottom: 3px; color: rgb(255, 213, 0); background: rgba(255, 222, 60, 0.15);" onclick="InventoryDoShit('${weapon}', '${weaponLabel}', 'remove', 'WEAPON')">
                    <p class="main_popup_item_sell_p">Wegwerfen</p>
                </div>
                <div class="main_popup_item_sell" style="margin-bottom: 3px;" onclick="InventoryDoShit('${weapon}', '${weaponLabel}', 'sell', 'WEAPON')">
                    <p class="main_popup_item_sell_p">Verkaufen</p>
                </div>
            `;
            break;
        case 'item':
            $('.prepopup').show();
            $(".main_menu_inventory_popup").show();
            $('.main_popup_container').empty();
            $('.inv_popup_title').text(price+"x "+weaponLabel);
        
             activationHTML = `
                <div class="main_popup_item_sell" style="margin-bottom: 3px; color: rgb(55, 255, 0); background: rgba(122, 255, 60, 0.15);" onclick="InventoryDoShit('${weapon}', '${weaponLabel}', 'useitem')">
                    <p class="main_popup_item_sell_p">Benutzen</p>
                </div>
                <div class="main_popup_item_sell" style="margin-bottom: 3px; color: rgb(251, 255, 0); background: rgba(255, 222, 60, 0.15);" onclick="InventoryDoShit('${weapon}', '${weaponLabel}', 'give', 'ITEM')">
                    <p class="main_popup_item_sell_p">Geben</p>
                </div>
                <div class="main_popup_item_sell" style="margin-bottom: 3px;" onclick="InventoryDoShit('${weapon}', '${weaponLabel}', 'remove', 'ITEM')">
                    <p class="main_popup_item_sell_p">Wegwerfen</p>
                </div>
                <div class="main_popup_item_sell" style="margin-bottom: 3px;" onclick="InventoryDoShit('${weapon}', '${weaponLabel}', 'sell', 'ITEM')">
                    <p class="main_popup_item_sell_p">Verkaufen</p>
                </div>
            `;
            break;
        case 'ped':
            $('.prepopup').show();
            $(".main_menu_inventory_popup").show();
            $('.main_popup_container').empty();
            $('.inv_popup_title').text(weaponLabel);
        
            activationHTML = `
                <div class="main_popup_item_sell" style="margin-bottom: 3px; color: rgb(55, 255, 0); background: rgba(122, 255, 60, 0.15);" onclick="InventoryDoShit('${weapon}', '${weaponLabel}', 'pedanziehen')">
                    <p class="main_popup_item_sell_p">Anziehen</p>
                </div>
            `;
            break;
        case 'pedbuy':
            $('.prepopup').show();
            $(".main_menu_inventory_popup").show();
            $('.main_popup_container').empty();
            $('.inv_popup_title').text(weaponLabel);
        
            activationHTML = `
                <div class="main_popup_item_sell" id="cantsell" style="margin-bottom: 3px; color: rgb(55, 255, 0); background: rgba(148, 255, 60, 0.15);" onclick="InventoryDoShit('${weapon}', '${weaponLabel}', 'buy', 'PED', ${price})">
                    <p class="main_popup_item_sell_p">Kaufen für $${price}</p>
                </div>
                <div class="main_popup_item_sell" style="margin-bottom: 3px;" onclick="InventoryDoShit('${weapon}', '${weaponLabel}', 'pedshopshow')">
                    <p class="main_popup_item_sell_p">Testen</p>
                </div>
            `;
            break;
        case 'buy':
            $('.prepopup').show();
            $(".main_menu_inventory_popup").show();
            $('.main_popup_container').empty();
            $('.inv_popup_title').text(weaponLabel);
        
            activationHTML = `
                <div class="main_popup_item_sell" style="margin-bottom: 3px; color: rgb(68, 255, 0); background: rgba(96, 255, 60, 0.15);" onclick="InventoryDoShit('${weapon}', '${weaponLabel}', 'buy', '${type2}', ${price})">
                    <p class="main_popup_item_sell_p">Kaufen für $${price}</p>
                </div>
            `;
            break;
        

    }
    $('.main_popup_container').prepend(activationHTML);

}
function togglePopupHover(elementId, message, leftOffset) {
    $(`#${elementId}`).on('mouseenter', function () {
        $('.eye_popup').show().css("left", `${leftOffset}px`).find('p').text(message);
    }).on('mouseleave', function () {
        $('.eye_popup').hide();
    });
}

togglePopupHover('revert_skin', 'Skin zurücksetzen', -80);
togglePopupHover('cantsell', 'Kann nicht verkauft werden', -10);

function pedsinv(peds) {
    $(".Inventory_container_append.peds").empty();
    if (peds !== undefined && peds.length > 0) {
        peds.forEach((ped) => {
            const itemHTML = `
            <div class="inventory_item" id="item_${ped.name}" onclick="showAttachments('${ped.name}','${ped.label}', 'ped')">
                <div class="inventory_item_header">
                    <svg class="inventory_item_header_edit" xmlns="http://www.w3.org/2000/svg" width="24" height="6" viewBox="0 0 24 6" fill="none">
                        <path d="M6 3C6 4.65686 4.65686 6 3 6C1.34315 6 0 4.65686 0 3C0 1.34314 1.34315 0 3 0C4.65686 0 6 1.34314 6 3Z" fill="white" fill-opacity="0.45"/>
                        <path d="M15 3C15 4.65686 13.6569 6 12 6C10.3431 6 9 4.65686 9 3C9 1.34314 10.3431 0 12 0C13.6569 0 15 1.34314 15 3Z" fill="white" fill-opacity="0.45"/>
                        <path d="M21 6C22.6569 6 24 4.65686 24 3C24 1.34314 22.6569 0 21 0C19.3431 0 18 1.34314 18 3C18 4.65686 19.3431 6 21 6Z" fill="white" fill-opacity="0.45"/>
                    </svg>
                    <div class="inventory_item_header_status">
                        <div class="inventory_item_header_status_data"></div>
                    </div>
                </div>
                <img class="inventory_item_image" src="img/peds/${ped.name}.png" alt="${ped.name}">
                <p class="inventory_item_label">${ped.label}</p>
            </div>
            `;
            $('.Inventory_container_append.peds').append(itemHTML);
        });
    }
};
$(".close_main_popup").on("click", function () {
    $('.main_menu_inventory_popup').hide()
    $('.prepopup').hide()
    $('.main_menu_inventory_popup').hide()
    $('.prepopup').hide()
})

function crosshair(data) {
    $('.crosshairbody').empty();
    data.forEach((v, index) => {
        const content = $(`
            <div class="crosshairbox cr${index + 1}">
                <img src="${v.img}" alt="">
            </div>
        `);
        $(".crosshairbody").append(content);
        if (v.default === true) {
            $(`.cr${index + 1}`).click(function() {
                $(".crosshair").fadeOut(200);
            });
        } else {
            $(`.cr${index + 1}`).click(function() {
                $(".crosshair").fadeIn();
                $(".crosshair").css('display', 'flex');
                $(".crosshair img").attr('src', v.img);
                $(".crosshair img").css('width', v.size+"%");
                $(".crosshair img").css('height', v.size+"%");
            });
        }
    });
}

function playerlist(data) {
    
}

function sidebar(group, job) {
    $('.main_header_actions').empty();
    let content = `
        <!--<div class="main_header_actions_item page-1" onclick="mainmenusidebar(1)">
            <i class="fa-sharp fa-solid fa-map"></i>
            <p>Teleporter</p>
        </div>-->        <div class="main_header_actions_item page-1" onclick="mainmenusidebar(1)">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M7.5 1C8.32843 1 9 1.67157 9 2.5C9 3.32843 8.32843 4 7.5 4C6.67157 4 6 3.32843 6 2.5C6 1.67157 6.67157 1 7.5 1Z" stroke="white" stroke-opacity="0.45" stroke-width="1.2"/><path d="M7.5 11C8.32843 11 9 11.6716 9 12.5C9 13.3284 8.32843 14 7.5 14C6.67157 14 6 13.3284 6 12.5C6 11.6716 6.67157 11 7.5 11Z" stroke="white" stroke-opacity="0.45" stroke-width="1.2"/><path d="M1 7.5C1 6.67157 1.67157 6 2.5 6C3.32843 6 4 6.67157 4 7.5C4 8.32843 3.32843 9 2.5 9C1.67157 9 1 8.32843 1 7.5Z" stroke="white" stroke-opacity="0.45" stroke-width="1.2"/><path d="M11 7.5C11 6.67157 11.6716 6 12.5 6C13.3284 6 14 6.67157 14 7.5C14 8.32843 13.3284 9 12.5 9C11.6716 9 11 8.32843 11 7.5Z" stroke="white" stroke-opacity="0.45" stroke-width="1.2"/><path d="M7.5 4.5V6M7.5 9V10.5M4.5 7.5H6M9 7.5H10.5" stroke="white" stroke-opacity="0.45" stroke-width="1.2" stroke-linecap="round"/><circle cx="7.5" cy="7.5" r="1" fill="white" fill-opacity="0.45"/></svg>
            <p>Spawn</p>
        </div>
        <div class="main_header_actions_item page-2" onclick="mainmenusidebar(2)">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M2.12956 1.38012L2.03569 1H1.64414H0.5V0.5H2.40949L3.05648 3.11988L3.15035 3.5H3.5419H14.3783L12.867 10.3848L12.4172 10.75H4.62262L4.17285 10.3848L2.73072 3.81512L2.73088 3.81509L2.72776 3.80245L2.12956 1.38012ZM3.88702 4H3.26536L3.39865 4.60721L4.55111 9.85721L4.63733 10.25H5.03948H12.0004H12.4025L12.4888 9.8572L13.6412 4.6072L13.7744 4H13.1528H3.88702ZM6.16776 13.5C6.16776 14.0581 5.72247 14.5 5.18604 14.5C4.64961 14.5 4.20431 14.0581 4.20431 13.5C4.20431 12.9419 4.64961 12.5 5.18604 12.5C5.72247 12.5 6.16776 12.9419 6.16776 13.5ZM12.0947 13.5C12.0947 14.0581 11.6493 14.5 11.1129 14.5C10.5765 14.5 10.1312 14.0581 10.1312 13.5C10.1312 12.9419 10.5765 12.5 11.1129 12.5C11.6493 12.5 12.0947 12.9419 12.0947 13.5Z" stroke="white" stroke-opacity="0.45"/></svg>
            <p>Shop</p>
        </div>
        <div class="main_header_actions_item page-3" onclick="mainmenusidebar(3)">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="13" viewBox="0 0 15 13" fill="none"><path d="M4.61111 1.42308L14 1.42374M4.61111 6.5L14 6.50068M4.61111 11.5769L14 11.5775M1 1.84615H1.72222V1H1V1.84615ZM1 6.92308H1.72222V6.07692H1V6.92308ZM1 12H1.72222V11.1538H1V12Z" stroke="white" stroke-opacity="0.45" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>                
            <p>Inventar</p>
        </div>
        <div class="main_header_actions_item page-82" onclick="mainmenusidebar(82)">
            <i class="fal fa-star"></i>
            <p>Battlepass</p>
        </div>
        <div class="main_header_actions_item page-4" onclick="mainmenusidebar(4)">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none"> <path d="M5.51517 10.4027L5.16161 10.7563L5.51517 11.1098L6.47411 12.0688L5.94378 12.5991L4.29105 10.9464L3.9375 10.5928L3.58395 10.9464L2.26944 12.2609L2.11147 12.4189L2.12375 12.6419C2.12458 12.6569 2.125 12.6721 2.125 12.6875C2.125 13.1362 1.76123 13.5 1.3125 13.5C0.863775 13.5 0.5 13.1362 0.5 12.6875C0.5 12.2388 0.863775 11.875 1.3125 11.875C1.3275 11.875 1.34281 11.8754 1.35847 11.8763L1.58131 11.8884L1.73912 11.7306L3.05362 10.4161L3.40717 10.0625L3.05362 9.70895L1.40089 8.05622L1.93122 7.52589L2.89017 8.48483L3.24372 8.83839L3.59727 8.48483L11.5821 0.5H13.5V2.41789L5.51517 10.4027ZM11.8763 12.6416L11.8884 12.4187L11.7306 12.2609L9.53218 10.0625L12.0688 7.52589L12.5991 8.05622L10.9464 9.70895L10.5928 10.0625L10.9464 10.4161L12.2609 11.7306L12.4187 11.8884L12.6416 11.8763C12.6571 11.8754 12.6725 11.875 12.6875 11.875C13.1362 11.875 13.5 12.2388 13.5 12.6875C13.5 13.1362 13.1362 13.5 12.6875 13.5C12.2388 13.5 11.875 13.1362 11.875 12.6875C11.875 12.6725 11.8754 12.6571 11.8763 12.6416ZM0.5 0.5H2.41789L5.05546 3.13757L3.13757 5.05546L0.5 2.41789V0.5Z" stroke="white" stroke-opacity="0.45"/></svg>
            <p>FFA</p>
        </div>
        <div class="main_header_actions_item page-7" onclick="mainmenusidebar(7)">
            <i class="fa-sharp fa-solid fa-gear"></i>
        </div>`;
    
    content += ``;

    if (group !== 'user') {
        content += `
        <div class="main_header_actions_item page-9" onclick="mainmenusidebar(9)">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="13" viewBox="0 0 15 13" fill="none"><path d="M6.15132 1.05962L6.15133 1.05961C6.89623 0.313469 8.10369 0.313454 8.84866 1.05962L10.9085 3.12276L10.9085 3.12278C11.3049 3.51981 11.9108 3.61844 12.4126 3.36715L12.983 3.08151L12.983 3.0815C13.8144 2.66514 14.7382 3.46285 14.4426 4.35119L12.9682 8.78148L12.9682 8.78149C12.7084 9.56236 11.9791 10.0884 11.1585 10.0884H3.84149C3.02088 10.0884 2.29162 9.56235 2.03175 8.78148L0.557395 4.35118L0.0829758 4.50906L0.557394 4.35117C0.261777 3.46288 1.18563 2.66513 2.01702 3.0815L2.58738 3.36714L2.58738 3.36715C3.08916 3.61844 3.69512 3.51982 4.09154 3.12276L6.15132 1.05962ZM2.382 12.1961C2.382 12.0275 2.51823 11.8922 2.68457 11.8922H12.3154C12.4818 11.8922 12.618 12.0275 12.618 12.1961C12.618 12.3647 12.4818 12.5 12.3154 12.5H2.68457C2.51823 12.5 2.382 12.3647 2.382 12.1961Z" stroke="white" stroke-opacity="0.45"/></svg>
            <p>Admin</p>
        </div>`;
    }
    // content += `<button onclick="closemainmenu"><i class="fa-sharp fa-regular fa-xmark"></i></button>`;
    $(".main_header_actions").append(content);
}

window.addEventListener('message', function(event){
    if (event.data.action === 'notify'){
        var item = event.data;
        if (item !== undefined) {
            notify(item.title, item.message, item.type)
        }        
    } else if (event.data.action === 'mainmenu') {
        if (event.data.enable === true) {
            mainmenusidebar(1);
            $('.mainmenu').fadeIn(200);
            loadleaderboard(event.data.leaderboard);
            loadffa(event.data.ffa);
            sidebar(event.data.group, event.data.job);
            loadweapons(event.data.weaponshop);
            loadpedshop(event.data.pedshop);
            inventar(event.data.loadout, event.data.items);
            pedsinv(event.data.ownedpeds);
            crosshair(event.data.crosshairs);
            playerlist(event.data.players);
            $('.playername').text(event.data.playername);
            $('.playermoney').text(formatNum(event.data.money) + '$');
            loadBattlepass({
                rewards: event.data.battlepass.rewards,
                level: event.data.battlepass.level,
                collected: event.data.battlepass.collected,
            });
        } else {
            $('.mainmenu').fadeOut(200);
        }
    } else if (event.data.action === 'updatemoney') {
        $('.money').text(formatNum(event.data.money));
    } else if (event.data.action === 'announce') {
        announce(event.data.title, event.data.message)
    } else if (event.data.action === 'aufnahme') {
        $('.aufnahme').fadeIn();
        $('.aufnahme p').text(event.data.text);
        $('.aufnahme').css('display', 'flex');
        regeln = event.data.regeln;
    } else if (event.data.action === 'warning') {
        $('.warning').css('display', 'flex');
        $('.warntext').text(event.data.reason);
    } else if (event.data.action === 'updateloadout') {
        inventar(event.data.loadout, event.data.items);
    } else if (event.data.action === 'updateskins') {
        pedsinv(event.data.peds);
    }
});

// setInterval(function() {
//     notify("", "", "y")
//     announce("title", "msg")
// })

function notify(title, msg, type) {
    let content = $(`
        <div class="notify ${type}">
            <div class="notify_background">
                <div class="notify_title">
                    <div class="notify_icon">
                        <img src="img/hud/${type}_type.svg">
                    </div>
                    <p>${title}</p>
                </div>
                <p class="notify_text">${msg}</p>
                <div class="notify_progress">
                    <div class="notify_progress_inner"></div>
                </div>
            </div>
        </div>
    `);
    
    $(".notify_container").prepend(content);
    const progressBar = content.find('.notify_progress_inner');
    progressBar.css('width', '0%');
    let progress = 0;

    const interval = setInterval(() => {
        progress += 1.8; 
        progressBar.css('width', progress + '%');
        if (progress >= 100) {
            clearInterval(interval);
            content.css('animation', 'fadeOutFromLeft 0.4s ease-in-out forwards');
            content.fadeOut(400);
        }
    }, 90);
}


function announce(title, msg) {
    let content = $(`
        <div class="announce">
            <div class="announce_background">
                <div class="announce_title">
                    <div class="announce_icon">
                        <img src="img/hud/y_type.svg">
                    </div>
                    <p>${title}</p>
                </div>
                <p class="announce_text">${msg}</p>
                <div class="announce_progress">
                    <div class="announce_progress_inner"></div>
                </div>
            </div>
        </div>
    `);
    
    $(".announce_container").prepend(content);
    const progressBar = content.find('.announce_progress_inner');
    progressBar.css('width', '0%');
    let progress = 0;

    const interval = setInterval(() => {
        progress += 1.1; 
        progressBar.css('width', progress + '%');
        if (progress >= 100) {
            clearInterval(interval);
            content.css('animation', 'fadeOutFromTop 0.4s ease-in-out forwards');
            content.fadeOut(400);
        }
    }, 90);
}

  
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        $('.main_menu_inventory_popup').hide()
        $('.prepopup').hide()
        $.post(`https://${GetParentResourceName()}/mainmenu`, JSON.stringify({action: 'close'}));
    }
});


function loadBattlepass(data) {
    const rewards = $('#battlepassappend');
    rewards.empty();
    if (typeof data.collected === 'object' && data.collected !== null) {
        for (var i = 0; i < data.rewards.length; i++) {
            const reward = data.rewards[i];
            let money = reward.name == "money" ? `<span class="currentPrice">${new Intl.NumberFormat('de-DE').format(reward.amount)}$</span>` : `<span class="currentLevel">${reward.label}</span>`;

            let collectedStatus = data.collected[i + 1] !== undefined ? data.collected[i + 1] : false;
            rewards.append(`
                <div class="item ${collectedStatus ? ' claimed' : i + 1 <= data.level ? 'unclaimed' : 'locked' }" item-count="${i + 1}">
                    ${money}
                    <img src="img/battlepasss/${reward.name}.png" draggable="false">
                    <div class="levelbox" onclick="collect(${i + 1})">
                        <span>Level ${i + 1}</span>
                    </div>
                </div>
            `);
        }
    } 
}
const collect = (index) => {
    const element = $(`[item-count="${index}"]`);
    if (element.hasClass('unclaimed')) {
        $.post(
            `https://${GetParentResourceName()}/collect`,
            JSON.stringify({
                index: index,
            }),
        ).done((resp) => {
            if (resp.success) {
                element.removeClass('unclaimed');
                element.addClass('claimed');
            }
        });
    }else if (element.hasClass('claimed')) {
        // $.post('https://' + GetParentResourceName() + '/notify', JSON.stringify({ msg: "Dieses Level wurde bereits beansprucht!" }));
    }
};

$(document).ready(function() {
    var $button = $("#warnButton");
    var $loadingBar = $(".buttoninnerwarn");
    var progress = 0;
    var interval;
    function startLoading() {
        interval = setInterval(function() {
            progress += 1;
            $loadingBar.css("width", progress + "%");
            if (progress >= 100) {
                $('.warning').hide();
                $.post(`https://${GetParentResourceName()}/mainmenu`, JSON.stringify({action: 'closewarn'}));
                clearInterval(interval);
            }
        }, 100);
    }
    function resetLoading() {
        clearInterval(interval);
        progress = 0;
        $loadingBar.css("width", "0%");
    }
    $button.mousedown(function() {
        startLoading();
    });
    $button.mouseup(function() {
        resetLoading();
    });
    $button.mouseleave(function() {
        resetLoading();
    });
});

mainmenusidebar(82);
$('.mainmenu').fadeIn(200);
loadleaderboard([{placement: 1, name: "Diro Der Beste", kills: 1000000, tode: 0, kd: 10000000}]);
loadffa([{name: "Dach", players: 1, maxplayers:10}, {name: "Dach", players: 1, maxplayers:10}, {name: "Dach", players: 1, maxplayers:10}, {name: "Dach", players: 1, maxplayers:10}, {name: "Dach", players: 1, maxplayers:10}, {name: "Dach", players: 1, maxplayers:10}, ]);
sidebar('pl', 'ballas');
crosshair([{default: true, img:"https://em-content.zobj.net/source/joypixels/275/white-circle_26aa.png",size:100}, {default: false, img:"https://cdn-icons-png.flaticon.com/128/2576/2576760.png",size:100}]);
inventar([{label:"Pistole", name:"weapon_pistol"},{label:"Pistole", name:"weapon_pistol"},{label:"Pistole", name:"weapon_pistol"},{label:"Pistole", name:"weapon_pistol"},{label:"Pistole", name:"weapon_pistol"},{label:"Pistole", name:"weapon_pistol"},{label:"Pistole", name:"weapon_pistol"},{label:"Pistole", name:"weapon_pistol"},{label:"Pistole", name:"weapon_pistol"},{label:"Pistole", name:"weapon_pistol"},{label:"Pistole", name:"weapon_pistol"},{label:"Pistole", name:"weapon_pistol"},{label:"Pistole", name:"weapon_pistol"},{label:"Pistole", name:"weapon_pistol"},{label:"Pistole", name:"weapon_pistol"}], [{label:"Erwitertes Magazin", name:"clip_extended", count:10}])
pedsinv([{label:"Midas (Fortnite)", name:"midas"}])
loadweapons([{weapon: "Pistole", weaponitem: "weapon_pistol", type:"WEAPON", price:1}, {weapon: "Erweitertes Magazin", weaponitem: "clip_extended", type:"ITEM", price:1}])
loadpedshop([{label: "Midas (Fortnite)", name: "midas", price:1}])
var Levels=[
    {
        name:"money",
        label:"Geld",
        type:"money",
        amount:36000000,
        needed:11500,
    },
    {
        name:"money",
        label:"Geld",
        type:"money",
        amount:34000000,
        needed:11000,
    },
    {
        name:"weapon_candyaxe",
        label:"Candy Axt",
        type:"weapon",
        amount:1,
        needed:10500,
    },
    {
        name:"money",
        label:"Geld",
        type:"money",
        amount:30000000,
        needed:9500,
    },
    {
        name:"money",
        label:"Geld",
        type:"money",
        amount:28000000,
        needed:9000,
    },
    {
        name:"money",
        label:"Geld",
        type:"money",
        amount:26000000,
        needed:8500,
    },
    {
        name:"weapon_knuckle",
        label:"Schlagring",
        type:"weapon",
        amount:1,
        needed:8000,
    },
    {
        name:"money",
        label:"Geld",
        type:"money",
        amount:24000000,
        needed:7500,
    },
    {
        name:"weapon_switchblade",
        label:"Switchblade",
        type:"weapon",
        amount:1,
        needed:7000,
    },
    {
        name:"money",
        label:"Geld",
        type:"money",
        amount:22000000,
        needed:6500,
    },
    {
        name:"money",
        label:"Geld",
        type:"money",
        amount:20000000,
        needed:5500,
    },
    {
        name:"money",
        label:"Geld",
        type:"money",
        amount:18000000,
        needed:5000,
    },
    {
        name:"money",
        label:"Geld",
        type:"money",
        amount:16000000,
        needed:4500,
    },
    {
        name:"money",
        label:"Geld",
        type:"money",
        amount:14000000,
        needed:3500,
    },
    {
        name:"money",
        label:"Geld",
        type:"money",
        amount:9000000,
        needed:3000,
    },
    {
        name:"money",
        label:"Geld",
        type:"money",
        amount:7000000,
        needed:2500,
    },
    {
        name:"money",
        label:"Geld",
        type:"money",
        amount:6000000,
        needed:2000,
    },
    {
        name:"money",
        label:"Geld",
        type:"money",
        amount:5000000,
        needed:1500,
    },
    {
        name:"money",
        label:"Geld",
        type:"money",
        amount:4000000,
        needed:1000,
    },
    {
        name:"money",
        label:"Geld",
        type:"money",
        amount:3000000,
        needed:500,
    },
    {
        name:"money",
        label:"Geld",
        type:"money",
        amount:2000000,
        needed:0,
    },
]
loadBattlepass({
    rewards: Levels,
    level: 1,
    collected: {},
});