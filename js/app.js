let hud = true;
let hitmarker = false;
let fps = false;
let chat = false;
let killfeed = true;
$(".fps").hide();
$(".progressbar").hide();

// var radio = new Audio("../sounds/mic_click_on.mp3")
// var radioo = new Audio("../sounds/mic_click_off.mp3")

function formatNum(zahl) {
    let num = parseInt(zahl) || 0;
    return num.toLocaleString("de-DE");
}

window.addEventListener('message', function(event){
    if (event.data.type == "copyskid") {
        var copyyy = document.querySelector(".copyoutfit");
        copyyy.style.display = event.data.enable ? "flex" : "none";
    } else if (event.data.type == "enableui") {
        var wrapper = document.querySelector(".identity");
        wrapper.style.display = event.data.enable ? "block" : "none";
    } else if (event.data.type == "setTalking") {
        const talking = event.data.state;
        if (typeof talking !== "undefined") {
            const mic = $('.mic');
            const imagePath = talking
                ? './img/headhud/micactive.svg'
                : './img/headhud/mic.svg';
            mic.css('background-image', `url('${imagePath}')`);
        }
    } else if (event.data.type == "sethud") {
            $('.body-hud').fadeOut(500);
            $('.headshot-hud').fadeOut(500);
            $("."+event.data.mode + '-hud').fadeIn(500);
    } else if (event.data.type == "SetVoiceRange") {
        const range = event.data.index;

        if (range >= 1 && range <= 3) {
            $(".punkt").removeClass("active");
            $(".punkt").each(function(index) {
                if (index < range) {
                    $(this).addClass("active");
                }
            });
        }
    } else if (event.data.type == "enablesupport") {
        var wrapper2 = document.querySelector(".supportcall");
        wrapper2.style.display = event.data.enable ? "flex" : "none";
    } else if (event.data.type == "enablepress") {
        var component = document.querySelector(".presse");
        component.style.display = event.data.enable ? "block" : "none";
        $('.presst').html(event.data.message);
    } else if (event.data.type == "enableinvite") {
        var component2 = document.querySelector(".invite");
        component2.style.display = event.data.enable ? "block" : "none";
        var demoElement = document.querySelector(".frakinnername");
        demoElement.innerHTML = event.data.job;
        var bildElement = document.querySelector(".frakinnerimg");
        bildElement.src = event.data.image;
    } else if (event.data.type == "enableeventud") {
        var component3 = document.querySelector(".eventhud");
        component3.style.display = event.data.enable ? "flex" : "none";
        $('.timetode').text(event.data.time);
    } else if (event.data.message == 'showdeathscreen') {
        deathscreen(event.data)
    } else if (event.data.action === 'health') {
        updateh(event.data.health, event.data.armor)
    } else if (event.data.action === 'hud') {
        // document.querySelector(
        //     '.money-amount',
        // ).innerHTML = `${event.data.money.toLocaleString(
        //     'de-DE',
        // )}<span class="dollar-money">$</span>`;

        // BODY
        $('.killsblau').text(event.data.bodykill);
        $('.todeblau').text(event.data.bodytod);
        $('.kdblau').text(event.data.bodykd);

        // HEADSHOT
        $('#headkill').text(event.data.headkill);
        $('#headtod').text(event.data.headtod);
        $('#headkd').text(event.data.headkd);

        $('#playerId').text(event.data.id);
        $('#playerscount').text(event.data.playersandmax);

    } else if (event.data.action === 'hudenable') {
        if (hud === true) {
            if (event.data.enable == false) {
                $('hud').fadeOut(500);
            } else {
                $('hud').fadeIn(500);
            }
        }
    } else if (event.data.action === 'killstreak') {
        $('.killn').text(event.data.killername)
        $('.killst').text(event.data.killerstreak)
        $('.diedn').text(event.data.diedname)
        $('.diedst').text(event.data.diedstreak)
        $('.killstreakouter').fadeIn()
        setTimeout(() => {
            $('.killstreakouter').fadeOut()
        }, 4000);
    } else if (event.data.action === 'gwui') {
        if (event.data.enable === true) {
            $('.frakinner1 h3').text(event.data.joblabel);
            $('.frakinner2 h3').text(event.data.geglabel);
            $('.gwhud').fadeIn(400);
        } else {
            $('.gwhud').fadeOut(400);
        }
    } else if (event.data.action === 'gwgarage') {
        if (event.data.enable === true) {
            $('.gwgarage').fadeIn(400);
        } else {
            $('.gwgarage').fadeOut(400);
        }
    } else if (event.data.type === 'updateVehicles') {
        const vehiclesin = event.data.vehiclesin;
        if (vehiclesin !== undefined && vehiclesin.length > 0) {
            vehiclesin.forEach((v) => {
                const content = $(`
                    <div class="autoitem ${v.vehicle}">
                        <h3>${v.vehiclename}</h3>
                        <img src="img/${v.vehicle}.png">
                    </div>
                `);
                $(".gangwarbody").append(content);
                $(`.${v.vehicle}`).click(function() {
                    $.post(`https://${GetParentResourceName()}/gwgarage`, JSON.stringify({name: v.vehicle}));
                });
            });
        }
    } else if (event.data.action === 'time') {
        $('.gwtime').text(event.data.time)
    } else if (event.data.action === 'fps') {
        $('.fps p').text(event.data.fps)
    } else if (event.data.type === 'chat') {
        $('.chat').fadeIn(200);
        chat = true;
        $('.chat input').focus();
    } else if (event.data.action === 'uppoints') {
        $('.f1p').text(event.data.my)
        $('.f2p').text(event.data.ot)
    } else if (event.data.action === 'frakgarage') {
        const vehiclesin2 = event.data.vehicles;
        $(".frakbody").empty();
        if (vehiclesin2 !== undefined && vehiclesin2.length > 0) {
            vehiclesin2.forEach((v) => {
                const content = $(`
                    <div class="autoitem ${v.vehicle}">
                        <h3>${v.vehiclename}</h3>
                        <img src="img/${v.vehicle}.png">
                    </div>
                `);
                $(".frakbody").append(content);
                $(`.${v.vehicle}`).click(function() {
                    $.post(`https://${GetParentResourceName()}/frakgarage`, JSON.stringify({name: v.vehicle}));
                });
            });
        }
        if (event.data.enable === true) {
            $('.frakgarage').fadeIn(400);
        } else {
            $('.frakgarage').fadeOut(400);
        }
    } else if (event.data.type === 'hitmarker') {
        if (hitmarker === true) {
            var selectElement2 = document.querySelector(".soundchoose");
            var selectedValue2 = selectElement2.value;
            var audio = new Audio(selectedValue2);
            var volumeControl = document.querySelector(".lautstaerke");
            audio.volume = volumeControl.value;
            audio.play();
        }   
        
    } else if (event.data.type === 'leonis') {
            var audio = new Audio();
            audio.src = 'sounds/'+event.data.was+'.mp3';
            audio.volume = 1.0;
            audio.play();
    } else if (event.data.action === 'gwangreifen') {
        if (event.data.enable === true) {
            $('.angreifen h3').text(event.data.name);
            $('.angreifen').fadeIn(200);
        } else {
            $('.angreifen').fadeOut(200);
        }
    } else if (event.data.action === 'killfeed') {
        if (killfeed === true) {
            addKillfeed(event.data.killer, event.data.killed, event.data.range);
        }
    } else if (event.data.action === "funk") {
        const talking = event.data.talking

        if (typeof talking !== "undefined") {
            const radio = $('.radio');
            const imagePath = talking
                ? './img/headhud/radioactive.svg' 
                : './img/headhud/radio.svg';

            radio.css('background-image', `url('${imagePath}')`);
        }
    }
});

function deathscreen(a) {
    $(".death_screen_badges").empty();
    var health = Math.floor(a.health - 100);
    var armor = Math.floor(a.armor);
    if (health == 99) {
      health = 100;
    }
    if (armor == 99) {
      armor = 100;
    }
    $(".deathscreen_name_data").text(a.name);
    $(".deathscreen_name_id").text(a.id);
    $(".death_heal").text(health + "%");
    $(".death_armor").text(armor + "%");
    $(".deathscreen_banner").attr("src", a.banner);
    $(".deathscreen_profile_picture").attr("src", a.avatar);
    var elem = document.getElementById("death_progress");
    var val = Math.floor(a.time / 100);
    var width = 0;
    var id = setInterval(frame2, val);
    function frame2() {
      if (width >= 100) {
        clearInterval(id);
        width = 0;
        $(".Deathscreen").fadeOut(120);
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
    $(".Deathscreen").show();
    $(".deathscreen_progress_data").css("width", "0%");
  }

$('.giveskin').click(function (e) {
    $.post(`https://${GetParentResourceName()}/mainmenu`, JSON.stringify({action:'giveskin'}));
});

function updateh(h, a) {
    $(".line1").css("width", h + "%");
    $(".line2").css("width", a + "%");
};

$(".closesup").click(function() {
    $.post(`https://${GetParentResourceName()}/supportfalse`, JSON.stringify({}));
});
$('.gwabbrechen').click(function (e) { 
    $.post(`https://${GetParentResourceName()}/closeweaponshop`, JSON.stringify({}));
});
$('.gwangreifen').click(function (e) { 
    $.post(`https://${GetParentResourceName()}/zoneangreifen`, JSON.stringify({}));
});
$(".ja").click(function() {
    $.post(`https://${GetParentResourceName()}/copytrue`, JSON.stringify({}));
});
$(".nein").click(function() {
    $.post(`https://${GetParentResourceName()}/copyfalse`, JSON.stringify({}));
});
$(".eventbf").click(function() {
    $.post(`https://${GetParentResourceName()}/closeweaponshop`, JSON.stringify({}));
    $.post(`https://${GetParentResourceName()}/bf400`, JSON.stringify({}));
});
$('.close').click(function() {
    $.post(`https://${GetParentResourceName()}/closeweaponshop`, JSON.stringify({}));
});
$('.close2').click(function() {
    $.post(`https://${GetParentResourceName()}/closeweaponshop`, JSON.stringify({}));
});
$('.close3').click(function() {
    $.post(`https://${GetParentResourceName()}/closeweaponshop`, JSON.stringify({}));
});
$('.closegarage').click(function() {
    $.post(`https://${GetParentResourceName()}/closeweaponshop`, JSON.stringify({}));
});
$('.closefrak').click(function() {
    $.post(`https://${GetParentResourceName()}/closeweaponshop`, JSON.stringify({}));
});
$(".ann").click(function() {
    $.post(`https://${GetParentResourceName()}/joinjob`, JSON.stringify({}));
});
$(".abl").click(function() {
    $.post(`https://${GetParentResourceName()}/dontaccept`, JSON.stringify({}));
});

$(".stoptp").click(function() {
    $.post(`https://${GetParentResourceName()}/eventdata`, JSON.stringify({data: 'stopeventtp'}));
});
$(".ann321").click(function() {
    $.post(`https://${GetParentResourceName()}/eventdata`, JSON.stringify({data: 'announce'}));
});
$(".annrem").click(function() {
    $.post(`https://${GetParentResourceName()}/eventdata`, JSON.stringify({data: 'announce2'}));
});
$(".startevent").click(function() {
    var selectElement = document.querySelector(".eventchoose");
    var selectedValue = selectElement.value;
    $.post(`https://${GetParentResourceName()}/eventdata`, JSON.stringify({data: 'starteventcoords', name: selectedValue}));
});
$(".startbzone").click(function() {
    $.post(`https://${GetParentResourceName()}/eventdata`, JSON.stringify({data: 'startbattlezone'}));
});
$(".stopbzone").click(function() {
    $.post(`https://${GetParentResourceName()}/eventdata`, JSON.stringify({data: 'stopbattlezone'}));
});
$(".gotoevent").click(function() {
    $.post(`https://${GetParentResourceName()}/eventdata`, JSON.stringify({data: 'gotoevent'}));
});
var hudmoney = false
$(".settings_money").change(function() {
    hudmoney = !hudmoney
    if (hudmoney) {
        $('#settings_money').hide()
    } else {
        $('#settings_money').show()
    }
});
var hudlvl = false
$(".settings_lvl").change(function() {
    hudlvl = !hudlvl
    if (hudlvl) {
        $('#settings_lvl').hide()
    } else {
        $('#settings_lvl').show()
    }
});
var hudkills = false
$(".settings_kills").change(function() {
    hudkills = !hudkills
    if (hudkills) {
        $('#settings_kills').hide()
    } else {
        $('#settings_kills').show()
    }
});
var hudkd = false
$(".settings_kd").change(function() {
    hudkd = !hudkd
    if (hudkd) {
        $('#settings_kd').hide()
    } else {
        $('#settings_kd').show()
    }
});
var hudtode = false
$(".settings_tode").change(function() {
    hudtode = !hudtode
    if (hudtode) {
        $('#settings_tode').hide()
    } else {
        $('#settings_tode').show()
    }
});

$(".hudmode").change(function() {
    if (hud === true) {
        hud = false
        $('hud').fadeOut()
    } else {
        hud = true
        $('hud').fadeIn()
    }
});
$(".killfeedmode").change(function() {
    if (killfeed === true) {
        killfeed = false
    } else {
        killfeed = true
    }
});
$(".hitmarker").change(function() {
    if (hitmarker === true) {
        hitmarker = false
    } else {
        hitmarker = true
    }
});
$('.speakindicator').change(function () { 
    $.post(`https://${GetParentResourceName()}/mainmenu`, JSON.stringify({action: 'speakindicator'}));
});

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        $.post(`https://${GetParentResourceName()}/chatResult`, JSON.stringify({}));
        $('.chat').fadeOut(300);
        $('.chat input').val('');
        chat = false;
    } else if (event.key === "Enter") {
        if (chat === true) {
            chat = false;
            $('.chat').fadeOut(300);
            var value = $('.chat input').val();
            $.post(`https://${GetParentResourceName()}/chatResult`, JSON.stringify({message: value}));
            $('.chat input').val('');
        }
    }
});

$(function(){
    var animationTimeout;
    window.onload = () => { 
        window.addEventListener('message', (event) => {	            
            var item = event.data;
            if (item !== undefined && item.type === "progress") {	
                if (item.display === true) {
                    progress(item.text, item.time)
                } else {
                    $(".progressbar").hide();
                }
            }
        });
    };
});

function progress(title, time) {
    $(".progressbar").removeClass("progress_fadeOut");
    $(".progressbar").addClass("progress_fadeIn");
    $(".progressbar").show();
    i = 1;
    breakk = false;

    const progressElements = document.querySelectorAll(
    ".progressbar_data_progress_inner"
    );
    const totalElements = progressElements.length;
    const stepTime = Math.floor(time / totalElements);

    let currentIndex = 0;
    $(".progressbar_title").text(title);
    $(".progressbar_progress").text("0%");

    function fillNextElement() {
    if (breakk) {
        resetProgress();
        return;
    }

    if (currentIndex < totalElements) {
        const elem = progressElements[currentIndex];
        elem.style.width = "100%";

        const progressPercentage = Math.round(
        ((currentIndex + 1) / totalElements) * 100
        );
        $(".progressbar_progress").text(progressPercentage + "%");

        currentIndex++;
        setTimeout(fillNextElement, stepTime);
    } else {
        resetProgress();
    }
    }
    function resetProgress() {
    i = 0;
    breakk = false;
    $(".progressbar").removeClass("progress_fadeIn");
    $(".progressbar").addClass("progress_fadeOut");
    setTimeout(() => {
        $(".progressbar").hide();
        $(".progressbar_data_progress_inner").css("width", "0%");
    }, 100);
    }

    fillNextElement();
}

// setInterval(() => {
//     addKillfeed('Diro', 'Diro', 100)
// }, 400);

  function addKillfeed(killer, victim, range) {
    const content = $(`
        <div class="killfeed_item">
            <div class="killfeed_icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="14" viewBox="0 0 12 14" fill="none"><path d="M6 0C2.69163 0 0 2.72154 0 6.06667V9.90837C0 10.3158 0.247232 10.6826 0.624962 10.8354L1.86437 11.3368C2.17701 11.4633 2.40483 11.7388 2.47031 12.0697L2.73835 13.4242C2.80458 13.7588 3.09815 14 3.4393 14C3.83393 14 4.15385 13.6801 4.15385 13.2855V12.5949C4.15385 12.34 4.36048 12.1333 4.61538 12.1333C4.87029 12.1333 5.07692 12.34 5.07692 12.5949V13.7692C5.07692 13.8967 5.18024 14 5.30769 14C5.43514 14 5.53846 13.8967 5.53846 13.7692V12.5949C5.53846 12.34 5.7451 12.1333 6 12.1333C6.2549 12.1333 6.46154 12.34 6.46154 12.5949V13.7692C6.46154 13.8967 6.56486 14 6.69231 14C6.81976 14 6.92308 13.8967 6.92308 13.7692V12.5949C6.92308 12.34 7.12971 12.1333 7.38462 12.1333C7.63952 12.1333 7.84615 12.34 7.84615 12.5949V13.2855C7.84615 13.6801 8.16607 14 8.5607 14C8.90185 14 9.19542 13.7588 9.26165 13.4242L9.52969 12.0697C9.59517 11.7388 9.82299 11.4633 10.1356 11.3368L11.375 10.8354C11.7528 10.6826 12 10.3158 12 9.90837V6.06667C12 2.72154 9.30837 0 6 0ZM3.46154 9.33333C3.14205 9.33333 2.82973 9.23754 2.56408 9.05807C2.29843 8.87859 2.09138 8.6235 1.96912 8.32505C1.84685 8.0266 1.81486 7.69819 1.87719 7.38135C1.93952 7.06452 2.09337 6.77348 2.31929 6.54506C2.5452 6.31663 2.83304 6.16107 3.14639 6.09805C3.45975 6.03503 3.78455 6.06737 4.07972 6.191C4.37489 6.31462 4.62718 6.52397 4.80468 6.79257C4.98218 7.06117 5.07692 7.37696 5.07692 7.7C5.07647 8.13305 4.90613 8.54822 4.60328 8.85443C4.30044 9.16064 3.88982 9.33287 3.46154 9.33333ZM6 11.2C5.47595 11.2 5.10056 10.6941 5.25242 10.1926L5.55354 9.19797C5.61311 9.00123 5.79444 8.86667 6 8.86667C6.20556 8.86667 6.38689 9.00123 6.44646 9.19797L6.74758 10.1926C6.89944 10.6941 6.52405 11.2 6 11.2ZM8.53846 9.33333C8.21897 9.33333 7.90665 9.23754 7.641 9.05807C7.37535 8.87859 7.16831 8.6235 7.04604 8.32505C6.92378 8.0266 6.89179 7.69819 6.95412 7.38135C7.01645 7.06452 7.1703 6.77348 7.39621 6.54506C7.62213 6.31663 7.90996 6.16107 8.22332 6.09805C8.53667 6.03503 8.86147 6.06737 9.15664 6.191C9.45182 6.31462 9.7041 6.52397 9.8816 6.79257C10.0591 7.06117 10.1538 7.37696 10.1538 7.7C10.1534 8.13305 9.98305 8.54822 9.68021 8.85443C9.37736 9.16064 8.96675 9.33287 8.53846 9.33333Z" fill="black" fill-opacity="0.6"/></svg>
            </div>
            <div class="killfeed_name">
                <p>${killer}</p>
            </div>
            <div class="killfeed_icon red_icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="15" viewBox="0 0 12 15" fill="none"><path d="M12 13.4331C12 12.8808 11.5523 12.4331 11 12.4331H1C0.447715 12.4331 0 12.8808 0 13.4331V14C0 14.5523 0.447715 15 1 15H11C11.5523 15 12 14.5523 12 14V13.4331Z" fill="black" fill-opacity="0.6"/><path d="M6.22832 0H5.77159C3.24685 0 1.20019 2.08951 1.20019 4.66714V10.6674C1.20019 11.2196 1.6479 11.6674 2.20019 11.6674H9.79976C10.352 11.6674 10.7998 11.2196 10.7998 10.6674V4.66714C10.7998 2.08951 8.75312 0 6.22832 0ZM8.38079 5.963C8.38079 6.31333 8.09679 6.59733 7.74645 6.59733H7.49997C7.01351 6.59733 6.61916 6.99169 6.61916 7.47815V8.78801C6.61916 9.12998 6.34194 9.4072 5.99997 9.4072V9.4072C5.658 9.4072 5.38078 9.12998 5.38078 8.78801V7.47815C5.38078 6.99169 4.98643 6.59733 4.49997 6.59733H4.25349C3.90316 6.59733 3.61915 6.31333 3.61915 5.963V5.963C3.61915 5.61266 3.90316 5.32866 4.25349 5.32866H4.50308C4.98782 5.32866 5.38078 4.9357 5.38078 4.45096V4.19244C5.38078 3.85047 5.658 3.57325 5.99997 3.57325V3.57325C6.34194 3.57325 6.61916 3.85047 6.61916 4.19244V4.45096C6.61916 4.9357 7.01212 5.32866 7.49687 5.32866H7.74645C8.09679 5.32866 8.38079 5.61266 8.38079 5.963V5.963Z" fill="black" fill-opacity="0.6"/></svg>            
            </div>
            <div class="killfeed_name">
                <p>${victim}</p>
            </div>
            <div class="killfeed_range">
                <p>${range}m</p>
            </div>
        </div>`);
    $(".killfeed_container").prepend(content);
    setTimeout(() => {
        content.fadeOut(200);
    }, 4500);
}

function colorizeBar(percentage) {
    const loadingBar = document.querySelector('.progress');
    const loadElements = loadingBar.querySelectorAll('.pgitm');
    const numberOfColoredElements = Math.round(loadElements.length * (percentage / 100));
    loadElements.forEach((load, index) => {
      load.style.backgroundColor = index < numberOfColoredElements ? 'rgb(111, 0, 255)' : 'rgba(255, 255, 255, 0.21)';
  });
};
function updateCarSpeed(speedPercentage) {
    var blueItemCount = Math.ceil((speedPercentage / 100) * 15);
    $(".carspeed div").removeClass("red");
    $(".carspeed div:lt(" + blueItemCount + ")").addClass("red");
}
function openTab(tabId) {
    var tabContents = document.getElementsByClassName("tab-box");
    for (var i = 0; i < tabContents.length; i++) {
      tabContents[i].style.display = "none";
    }
    $('#'+tabId).css('display', 'flex'); 
};

$(".addfriend").click(function() {
    var selectElement3 = document.querySelector(".addinput");
    var selectedValue3 = selectElement3.value;
    $.post(`https://${GetParentResourceName()}/addfriend`, JSON.stringify({data: selectedValue3}));
});

function openTab2(tabId) {
    var tabContents = document.getElementsByClassName("frakbox");
    for (var i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = "none";
    }
    document.getElementById(tabId).style.display = "flex";
};


// function updateClock() {
//     const dateElement = document.getElementById('ickicock');
//     const now = new Date();
//     const hours = String(now.getHours()).padStart(2, '0');
//     const minutes = String(now.getMinutes()).padStart(2, '0');
//     const day = String(now.getDate()).padStart(2, '0');
//     const month = String(now.getMonth() + 1).padStart(2, '0');
//     const year = now.getFullYear();
//     const dateString = `${day}.${month}.${year} ${hours}:${minutes}`;
  
//     dateElement.textContent = dateString;
//   }
  
//   updateClock();
//   setInterval(updateClock, 10000);
//   setInterval(addKillfeed, 1000)

Date.prototype.timeNow = function () {
    return (this.getHours() < 10 ? "0" : "") + this.getHours() + ":" + (this.getMinutes() < 10 ? "0" : "") + this.getMinutes();
};

Date.prototype.today = function () {
    return (this.getDate() < 10 ? "0" : "") + this.getDate() + "." + (this.getMonth() + 1 < 10 ? "0" : "") + (this.getMonth() + 1) + "." + this.getFullYear();
};

function setTime() {
    var currentdate = new Date();
    $(".zeitteil").text(currentdate.timeNow());
    $(".datumteil").text(currentdate.today());
}

setInterval(setTime, 5000);