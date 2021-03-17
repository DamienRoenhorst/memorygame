// array alle kaarten
let card = document.getElementsByClassName("card");
let cards = ["bx-microchip", "bx-hdd", "bx-fingerprint", "bx-memory-card", "bx-tv", "bx-mobile", "bx-printer", "bx-joystick-alt", "bx-microchip", "bx-hdd", "bx-fingerprint", "bx-memory-card", "bx-tv", "bx-mobile", "bx-printer", "bx-joystick-alt"];
// alle kaarten op het deck
const deck = document.getElementById("card-deck");

function shuffle(array) {
    let huidigKaart = array.length, tijdelijkeWaarde, randomKaart;

    while (huidigKaart !== 0) {
        randomKaart = Math.floor(Math.random() * huidigKaart);
        huidigKaart -= 1;
        tijdelijkeWaarde = array[huidigKaart];
        array[huidigKaart] = array[randomKaart];
        array[randomKaart] = tijdelijkeWaarde;
    }

    return array;
};


// kaarten schudden en spel starten
document.body.onload = startGame();

// nieuw spel starten
function startGame() {
    // open kaarten array leeghalen
    openedCards = [];
    matchedCards = [];

    // shuffle deck
    shuffle(cards);

    let html = "";
    cards.forEach(function (item) {
        html += `<li class="card">
            <i class='bx ${item}'></i>
            </li>`;
            $(cards).removeClass("show open match disabled");
    });

    document.getElementById("card-deck").innerHTML = html;

    // toggled de classes 
    // let displayCard = function () {
    //     this.classList.toggle("open");
    //     this.classList.toggle("show");
    //     this.classList.toggle("disabled");
    // };

    $("ul").on('click', 'li', function(){
        if(!$(this).hasClass("open") && !$(this).hasClass("match") && !$(this).hasClass('disabled') && openedCards.length <=1){
            //displayCard(this)
            $(this).addClass("open");
            console.log(this);
            $(this).addClass("show");
            $(this).addClass("disabled");;
            cardOpen($(this).html());
        }

    })


    function cardOpen(card) {
        console.log(card)
        openedCards.push(card);
        let len = openedCards.length;
        //console.log(openedCards);
        if(len === 2){
            if(openedCards[0] === openedCards[1]){
                matched();
                console.log("match");
            } else {
                unmatched();
                console.log("unmatch");
            }
        }
    };
    function matched(){
        $(".open").addClass("match");
        
        setTimeout(function(){
           $(".open").removeClass("unmatched open disabled");
           openedCards = [];
        },2000);
    }
    
    
    // description when cards don't match
    function unmatched(){
        $(".open").addClass("unmatched");
        
        setTimeout(function(){
           $(".open").removeClass("unmatched show open disabled");
           openedCards = [];
        },2000);
    
    }
        };