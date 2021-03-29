// array alle kaarten
let card = $(".card");
let cards = ["bx-microchip", "bx-hdd", "bx-fingerprint", "bx-memory-card", "bx-tv", "bx-mobile", "bx-printer", "bx-joystick-alt", "bx-microchip", "bx-hdd", "bx-fingerprint", "bx-memory-card", "bx-tv", "bx-mobile", "bx-printer", "bx-joystick-alt"];
let cardsMatch = [];
// alle kaarten op het deck
const deck = $("#card-deck");

// randomized de kaarten
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
$(document).ready(startGame());

// nieuw spel starten
function startGame() {
    // arrays leeghalen voor het begin vd spel
    openedCards = [];
    matchedCards = [];

    // shuffle de kaarten
    shuffle(cards);

    let html = "";
    cards.forEach(function (item) {
        html += `<li class="card">
            <i class='bx ${item}'></i>
            </li>`;
        $(cards).removeClass("show open match disabled");
    });

    $("#card-deck").html(html);

    $("ul").on('click', 'li', function () {
        if (!$(this).hasClass("open") && !$(this).hasClass("match") && !$(this).hasClass('disabled') && openedCards.length <= 1) {
            //displayCard(this)
            $(this).addClass("open");
            console.log(this);
            $(this).addClass("show");
            $(this).addClass("disabled");;
            cardOpen($(this).html());
        }

    })

    // controleren of kaarten overeenkomen
    function cardOpen(card) {
        console.log(card)
        openedCards.push(card);
        let len = openedCards.length;
        //console.log(openedCards);
        if (len === 2) {
            if (openedCards[0] === openedCards[1]) {
                matched();
                console.log("match");
            } else {
                unmatched();
                console.log("unmatch");
            }
        }
    };

    // als kaarten overeenkomen
    function matched() {
        $(".open").addClass("match");

        setTimeout(function () {
            $(".open").removeClass("unmatched open disabled");
            cardsMatch.push(openedCards[0]);
            cardsMatch.push(openedCards[1]);
            if (cardsMatch.length == 16) {
                allmatched();
            };
            openedCards = [];
        }, 2000);
    }


    // als kaarten niet overeenkomen
    function unmatched() {
        $(".open").addClass("unmatched");

        setTimeout(function () {
            $(".open").removeClass("unmatched show open disabled");
            openedCards = [];
        }, 2000);

    }

    // alle kaarten zijn gematched
    function allmatched() {
        console.log("Alle kaarten matchen");
    }
};