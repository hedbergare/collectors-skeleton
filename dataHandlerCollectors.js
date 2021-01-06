'use strict';

let csv = require("csvtojson");

let collectorsDeck = "collectors-cards";
let languages = ["en", "se"];
/* https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array */
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Store data in an object to keep the global namespace clean
function Data() {
  this.data = {};
  this.rooms = {};
}


/***********************************************
For performance reasons, methods are added to the
prototype of the Data object/class
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
***********************************************/

/*
  Function to load initial data from CSV files into the object
*/
Data.prototype.initializeTable = function (table) {
  csv({ checkType: true })
    .fromFile("./data/" + table + ".csv")
    .then((jsonObj) => {
      this.data[table] = jsonObj;
    });
};

Data.prototype.initializeData = function () {
  console.log("Starting to build data tables");
  for (let i in languages) {
    this.initializeTable(collectorsDeck);
  }
}

Data.prototype.getUILabels = function (roomId) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    let lang = room.lang;
    var ui = require("./data/collectors-" + lang + ".json");
    return ui;
  }
  else return {};
}

Data.prototype.createRoom = function (roomId, playerCount, lang = "en") {
  let room = {};
  room.players = {};
  room.roundCounter = 1;
  room.cardUpForAuction = {};
  room.auctionWinner = '';
  room.leadingBet = 0;
  room.lang = lang;
  room.deck = this.createDeck(lang);
  room.playerCount = playerCount;
  room.itemsOnSale = room.deck.splice(0, 5);
  room.skillsOnSale = room.deck.splice(0, 5);
  room.auctionCards = room.deck.splice(0, 4);
  /*   room.playerId[hand] = room.deck.splice(0, 3);
   */
  room.market = [];
  room.buyPlacement = [{ cost: 1, playerId: null },
  { cost: 1, playerId: null },
  { cost: 2, playerId: null },
  { cost: 2, playerId: null },
  { cost: 3, playerId: null }];
  room.skillPlacement = [{ cost: 0, playerId: null },
  { cost: 0, playerId: null },
  { cost: 0, playerId: null },
  { cost: 1, playerId: null },
  { cost: 1, playerId: null }];
  room.auctionPlacement = [{ cost: -2, playerId: null },
  { cost: -1, playerId: null },
  { cost: 0, playerId: null },
  { cost: 0, playerId: null }];
  room.marketPlacement = [{ cost: 0, playerId: null, numCards: 2 },
  { cost: 2, playerId: null, numCards: 2 },
  { cost: 1, playerId: null, numCards: 1 }];
  room.workPlacement = [{ cost: 0, playerId: null},
  { cost: -1, playerId: null },
  { cost: -2, playerId: null},
  { cost: -3, playerId: null},
  { cost: -1, playerId: null},
  { cost: 1, playerId: null},
  { cost: 0, playerId: null},
  { cost: 0, playerId: null}];
  this.rooms[roomId] = room;
}

Data.prototype.createDeck = function () {
  // we want a copy of the deck array, not a reference to it so we use the
  // spread operator (...) to copy the items. Note that this is a shallow copy
  // so it is not generalizable to all copy problems
  let deck = [...this.data[collectorsDeck]];
  return shuffle(deck);
}

Data.prototype.joinGame = function (roomId, playerId) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    if (typeof room.players[playerId] !== 'undefined') {
      return true;
    }
    else if (Object.keys(room.players).length < room.playerCount) {
      //Här har jag lagt till färger till varje spelare i en lista
      let colors = ["rgb(125, 38, 125, 0.3)", "rgb(19, 186, 170, 0.3)", "rgb(193, 151, 105, 0.3)", "rgb(69, 72, 73, 0.3)"];
      console.log("Player", playerId, "joined for the first time");
      let turn;
      if (Object.keys(room.players).length == 0) {
        turn = true;
      }
      else {
        turn = false;
      }

      room.players[playerId] = {
        hand: [],
        money: 1,
        points: 0,
        skills: [],
        items: [],
        income: [],
        secret: [],
        color: [], //När vi startar spelet tar vi en färg från listan (ingen spelare kan ta samma färg)
        pId: playerId,
        isTurn: turn,
        auctionBet: 0,
        auctionTurn: false,
        auctionPass: false,
        bottles: 2,
        passiveIncome: 0,

      };
      /* När spelare joinar ska dom ha rätt antal pengar från */
      for (let i = 0; i < Object.keys(room.players).length + 1; i++) {
        if (Object.keys(room.players)[i] == playerId) {
          room.players[playerId] = {
            hand: [room.deck.pop(), room.deck.pop(), room.deck.pop()],
            money: i + 2,
            points: 0,
            skills: [],
            items: [],
            income: [],
            secret: [],
            color: colors[Object.keys(room.players).length - 1], //När vi startar spelet tar vi en färg från listan (ingen spelare kan ta samma färg)
            pId: playerId,
            isTurn: turn,
            auctionBet: 0,
            auctionTurn: false,
            auctionPass: false,
            bottles: 2,
            passiveIncome: 0,
          }
        }
      };
      let secretCard = room.players[playerId].hand.pop(0, 1);
      room.players[playerId].secret.push(secretCard);

      if (Object.keys(room.players).length == 1) {
        room.turn = playerId;
        console.log("Den första spelaren har joinat och den har id:  " + room.turn);
      }
      return true;
    }
    console.log("Player", playerId, "was declined due to player limit");


  }
  return false;
}

Data.prototype.getPlayers = function (id) {
  let room = this.rooms[id]
  if (typeof room !== 'undefined') {
    return room.players;
  }
  else return {};
}

/* Här har vi gjort funktionen som räknar ut hur många poäng varje spelare har */
Data.prototype.updatePoints = function (roomId) {
  let room = this.rooms[roomId]
  if (typeof room !== 'undefined') {
    let marketList = this.getMarketValues(roomId);
    let newPoints = 0;
    for (let x in room.players) {
      room.players[x].points = 0;

      /* Uträkningar för hur många poäng varje spelare ska ha med avseende på item och dess marketvalue */
      for (let y in room.players[x].items) {
        newPoints = marketList[room.players[x].items[y].item];
        room.players[x].points += newPoints;
      }

      /* Om en spelare äger skill VP-all samt ett item av varje slag ska den få 5 poäng */
      for (let z in room.players[x].skills) {
        if (room.players[x].skills[z].skill === 'VP-all') {
          for (let a in room.players[x].items) {
            if (room.players[x].items[a].item === 'fastaval') {
              for (let b in room.players[x].items) {
                if (room.players[x].items[b].item === 'figures') {
                  for (let c in room.players[x].items) {
                    if (room.players[x].items[c].item === 'movie') {
                      for (let d in room.players[x].items) {
                        if (room.players[x].items[d].item === 'music') {
                          for (let e in room.players[x].items) {
                            if (room.players[x].items[e].item === 'technology') {
                              room.players[x].points += 5;
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }

      /* Om en spelare äger ett skill VP-nån item ska den få ett extra poäng för varje item av samma slag den äger */
      for (let w in room.players[x].skills) {
        /* Extra p för varje itemfastaval om player äger skill VP-fastaval */
        if (room.players[x].skills[w].skill === 'VP-fastaval') {
          for (let i in room.players[x].items) {
            if (room.players[x].items[i].item === 'fastaval') {
              room.players[x].points += 1;
            }
          }
        }
        /* Extra p för varje item-figures om player äger skill VP-figures */
        if (room.players[x].skills[w].skill === 'VP-figures') {
          for (let i in room.players[x].items) {
            if (room.players[x].items[i].item === 'figures') {
              room.players[x].points += 1;
            }
          }
        }
        /* Extra p för varje item-movie om player äger skill VP-movie */
        if (room.players[x].skills[w].skill === 'VP-movie') {
          for (let i in room.players[x].items) {
            if (room.players[x].items[i].item === 'movie') {
              room.players[x].points += 1;
            }
          }
        }
        /* Extra p för varje item-music om player äger skill VP-music */
        if (room.players[x].skills[w].skill === 'VP-music') {
          for (let i in room.players[x].items) {
            if (room.players[x].items[i].item === 'music') {
              room.players[x].points += 1;
            }
          }
        }
        /* Extra p för varje item-technology om player äger skill VP-technology */
        if (room.players[x].skills[w].skill === 'VP-technology') {
          for (let i in room.players[x].items) {
            if (room.players[x].items[i].item === 'technology') {
              room.players[x].points += 1;
            }
          }
        }
      }

      /* Här uppdateras en spelares passive income */
      room.players[x].passiveIncome = 0;
      for (let y in room.players[x].income) {
        room.players[x].passiveIncome += 1;
        if (room.players[x].income[y].skill === 'VP-fastaval' || room.players[x].income[y].skill === 'VP-figures' || room.players[x].income[y].skill === 'VP-movie' || room.players[x].income[y].skill === 'VP-music' || room.players[x].income[y].skill === 'VP-technology') {
          room.players[x].passiveIncome += 1;
          console.log("Inne i sjuk if-sats i datahandler getPassiveIncome");
        }
      }
    }
  }
}
Data.prototype.updatePlayers = function (players, roomId) {
  let room = this.rooms[roomId]
  if (typeof room !== 'undefined') {
    room.players = players;
  }
}
/* returns players after a new card is drawn */
Data.prototype.drawCard = function (roomId, playerId) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    let card = room.deck.pop();
    room.players[playerId].hand.push(card);
    return room.players;
  }
  else return [];
}

/* moves card from itemsOnSale to a player's hand */
Data.prototype.buyCard = function (roomId, playerId, card, cost) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    let c = null;
    /// check first if the card is among the items on sale
    for (let i = 0; i < room.itemsOnSale.length; i += 1) {
      // since card comes from the client, it is NOT the same object (reference)
      // so we need to compare properties for determining equality      
      if (room.itemsOnSale[i].x === card.x &&
        room.itemsOnSale[i].y === card.y) {
        c = room.itemsOnSale.splice(i, 1, {});
        break;
      }
    }
    // ...then check if it is in the hand. It cannot be in both so it's safe
    for (let i = 0; i < room.players[playerId].hand.length; i += 1) {
      // since card comes from the client, it is NOT the same object (reference)
      // so we need to compare properties for determining equality      
      if (room.players[playerId].hand[i].x === card.x &&
        room.players[playerId].hand[i].y === card.y) {
        c = room.players[playerId].hand.splice(i, 1);
        break;
      }
    }
    room.players[playerId].items.push(...c);
    room.players[playerId].money -= cost;
  }
}

/* moves card from skillsOnSale to a player's hand */
Data.prototype.buySkill = function (roomId, playerId, card, cost) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    let c = null;
    /// check first if the card is among the items on sale
    for (let i = 0; i < room.skillsOnSale.length; i += 1) {
      // since card comes from the client, it is NOT the same object (reference)
      // so we need to compare properties for determining equality      
      if (room.skillsOnSale[i].x === card.x &&
        room.skillsOnSale[i].y === card.y) {
        c = room.skillsOnSale.splice(i, 1, {});
        break;
      }
    }
    // ...then check if it is in the hand. It cannot be in both so it's safe
    for (let i = 0; i < room.players[playerId].hand.length; i += 1) {
      // since card comes from the client, it is NOT the same object (reference)
      // so we need to compare properties for determining equality      
      if (room.players[playerId].hand[i].x === card.x &&
        room.players[playerId].hand[i].y === card.y) {
        c = room.players[playerId].hand.splice(i, 1);
        break;
      }
    }
    /* Extra bottle om den äger ett speciellt skill */
    if (typeof c[0].skill !== 'undefined' && c[0].skill === 'bottle') {
      room.players[playerId].bottles += 1;
    }
    room.players[playerId].skills.push(...c);
    room.players[playerId].money -= cost;
  }
}
Data.prototype.buyMarket = function (roomId, playerId, card, cost, numCards) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    let c = null;
    for (let i = 0; i < room.skillsOnSale.length; i += 1) {
      // since card comes from the client, it is NOT the same object (reference)
      // so we need to compare properties for determining equality      
      if (room.skillsOnSale[i].x === card.x &&
        room.skillsOnSale[i].y === card.y) {
        c = room.skillsOnSale.splice(i, 1, {});

      }
    }
    for (let i = 0; i < room.players[playerId].hand.length; i += 1) {
      // since card comes from the client, it is NOT the same object (reference)
      // so we need to compare properties for determining equality      
      if (room.players[playerId].hand[i].x === card.x &&
        room.players[playerId].hand[i].y === card.y) {
        c = room.players[playerId].hand.splice(i, 1);
      }
    }
    /* Om kortet plockas från auction ska de försvinna från auction */
    for (let i = 0; i < room.auctionCards.length; i += 1) {
      if (room.auctionCards[i].x === card.x &&
        room.auctionCards[i].y === card.y) {
        c = room.auctionCards.splice(i, 1, {});
      }
    }
    room.market.push(c[0]);
    room.players[playerId].money -= cost;
    this.updatePoints(roomId);

  }
}


Data.prototype.placeBottle = function (roomId, playerId, action, cost) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    let activePlacement = [];
    if (action === "item") {
      activePlacement = room.buyPlacement;
    }
    else if (action === "skill") {
      activePlacement = room.skillPlacement;

    }
    else if (action === "auction") {
      activePlacement = room.auctionPlacement;
    }
    else if (action === "market1" || action === "market2") {
      activePlacement = room.marketPlacement;
    }
    /* Här måste vi lägga in ifall det är work - MED UNDANTAGET om man lägger sin bottle på recycle*/
    for (let i = 0; i < activePlacement.length; i += 1) {
      if (activePlacement[i].cost === cost &&
        activePlacement[i].playerId === null) {
        activePlacement[i].playerId = playerId;
        room.players[playerId].bottles -= 1;
        break;
      }

    }
  }

}
/* returns the hand of the player */
Data.prototype.Cards = function (roomId, playerId) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    let i = room.players.map(d => d.playerId).indexOf(playerId)
    return room.players[i].hand;
  }
  else return [];
}

Data.prototype.getPlacements = function (roomId) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    let allPlacements = {
      buyPlacement: room.buyPlacement,
      skillPlacement: room.skillPlacement,
      auctionPlacement: room.auctionPlacement,
      marketPlacement: room.marketPlacement,
      workPlacement: room.workPlacement
    }
    return allPlacements
  }
  else return {};
}


Data.prototype.getSkillsOnSale = function (roomId) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    return room.skillsOnSale;
  }
  else return [];
}
Data.prototype.getItemsOnSale = function (roomId) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    return room.itemsOnSale;
  }
  else return [];
}

Data.prototype.getMarketValues = function (roomId) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    return room.market.reduce(function (acc, curr) {
      curr.market == "fastaval" ? acc.fastaval += 1 : null
      curr.market == "movie" ? acc.movie += 1 : null
      curr.market == "technology" ? acc.technology += 1 : null
      curr.market == "figures" ? acc.figures += 1 : null
      curr.market == "music" ? acc.music += 1 : null

      return acc
    },
      {
        fastaval: 0,
        movie: 0,
        technology: 0,
        figures: 0,
        music: 0
      });
  }
  else return [];
}

Data.prototype.getAuctionCards = function (roomId) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    return room.auctionCards;
  }
  else return [];
}

Data.prototype.turnChanged = function (players, roomId) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    room.players = players;
  }
}
Data.prototype.startAuction = function (roomId, auctionCard, playerId, cost) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    let c;
    for (let i = 0; i < room.players[playerId].hand.length; i += 1) {
      // since card comes from the client, it is NOT the same object (reference)
      // so we need to compare properties for determining equality      
      if (room.players[playerId].hand[i].x === auctionCard.x &&
        room.players[playerId].hand[i].y === auctionCard.y) {
        c = room.players[playerId].hand.splice(i, 1);
        break;
      }
    }
    for (let i = 0; i < room.auctionCards.length; i += 1) {
      // since card comes from the client, it is NOT the same object (reference)
      // so we need to compare properties for determining equality      
      if (room.auctionCards[i].x === auctionCard.x &&
        room.auctionCards[i].y === auctionCard.y) {
        c = room.auctionCards.splice(i, 1, {});
        break;
      }
    }
    room.cardUpForAuction = c[0];

    for (let x in room.players) {
      for (let y in room.players[x].skills) {
        if (room.players[x].skills[y].skill === 'auctionIncome') {
          room.players[x].money += 1;
        }
      }
    }

    room.players[playerId].money -= cost;
  }
}
Data.prototype.getCardUpForAuction = function (roomId) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    return room.cardUpForAuction;
  }
  else {
    return {};
  }

}
Data.prototype.setAuctionWinner = function (roomId, auctionWinner) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    room.auctionWinner = auctionWinner;
  }
}
Data.prototype.winnerPlaceCard = function (roomId, playerId, placement) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    /* Lägg in auctionCard på valda plats */
    if (placement === 'items') {
      room.players[playerId].items.push(room.cardUpForAuction);
    }
    else if (placement === 'skills') {
      room.players[playerId].skills.push(room.cardUpForAuction);
      if (room.cardUpForAuction.skill === 'bottle') {
        room.players[playerId].bottles += 1;
      }
    }
    else if (placement === 'market') {
      room.market.push(room.cardUpForAuction);
    }
    room.players[playerId].money -= room.leadingBet;
    room.cardUpForAuction = {};
    room.auctionWinner = '';
    room.leadingBet = 0;

    for (let x in room.players) {
      room.players[x].auctionBet = 0;
      room.players[x].auctionPass = false;
      room.players[x].auctionTurn = false;
    }
    this.updatePoints(roomId);
  }


}
Data.prototype.getAuctionWinner = function (roomId) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    return room.auctionWinner;
  }
}
Data.prototype.getLeadingBet = function (roomId) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    return room.leadingBet;
  }
}
Data.prototype.updateLeadingBet = function (leadingBet, roomId) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    room.leadingBet = leadingBet;

  }
}

Data.prototype.fillPools = function (roomId) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined' && room.roundCounter < 4) {
    /* Här ska alla kort förflyttas och nya kort dras för fas 2 */

    /* Hittar vilket kort som ligger längst ner i skills */
    for (let i = room.skillsOnSale.length - 1; i >= 0; i--) {
      if (typeof room.skillsOnSale[i].skill !== 'undefined') {
        /* Ta ut det kortet från skills on sale och sparar det som c */
        let c = room.skillsOnSale.splice(i, 1, {});
        /* Lägg till kortets "market" in i market value */
        room.market.push(c[0]);
        break;
      }
    }
    /* Hittar vilket kort som ligger längst ner i auctionCards */
    for (let i = room.auctionCards.length - 1; i >= 0; i--) {
      if (typeof room.auctionCards[i].item !== 'undefined') {
        /* Ta ut det kortet från skills on sale och sparar det som c */
        let c = room.auctionCards.splice(i, 1, {});
        /* Lägg till kortets "market" in i market value */
        room.market.push(c[0]);
        break;
      }
    }

    /* Förflyttar alla skills on sale kort längst ner i listan */
    room.skillsOnSale = this.pushElementsToEnd(room.skillsOnSale)
    /* Fyller på skills med kort från items */
    this.mergeItemsToSkills(room);
    /* Förflyttar alla items on sale längst fram i listan */
    room.itemsOnSale = this.pushElementsToFront(room.itemsOnSale);
    /* Förflyttar alla auctionCards längst ner i listan */
    room.auctionCards = this.pushElementsToEnd(room.auctionCards);
    /* Fyller på alla tomma platser med nya kort från kortleken */
    this.fillWithCards(room);
    this.collectBottles(room);
    this.resetPlacement(room);
    this.getPassiveIncome(roomId);
    this.addRoundCounter(roomId);

  } else {
    this.addRoundCounter(roomId);
  }
}

Data.prototype.getPassiveIncome = function (roomId) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    for (let x in room.players) {

      let bottles = room.players[x].bottles;
      if (bottles < 3) {
        this.drawCard(roomId, room.players[x].pId);
        room.players[x].money += 3;
      }
      else if (bottles === 3) {
        room.players[x].money += 3;
      }
      else if (bottles === 4) {
        room.players[x].money += 2;
      }
      else {
        console.log("Du fick inga pengar din sopa, du måste panta några bottles för att få mer pengar KOM IGEN NU");
      }

      room.players[x].money += room.players[x].passiveIncome;
    }
  }
}

/* Funktion som gör det till nästa runda efter att en runda är slut */
Data.prototype.addRoundCounter = function (roomId) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    room.roundCounter += 1;
  }
}

/* Funktion som returnerar vilken runda det är just nu */
Data.prototype.getRoundCounter = function (roomId) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    return room.roundCounter;
  }
  else {
    return 0;
  }
}

/* Funktion som samlar in spelarnas bottles igen när fill pools sker */
Data.prototype.collectBottles = function (room) {
  if (typeof room !== 'undefined') {
    for (let i in room.buyPlacement) {
      for (let x in room.players) {
        if (room.players[x].pId === room.buyPlacement[i].playerId) {
          room.players[x].bottles += 1;

        }
      }
    }
    for (let i in room.skillPlacement) {
      for (let x in room.players) {
        if (room.players[x].pId === room.skillPlacement[i].playerId) {
          room.players[x].bottles += 1;

        }
      }
    }
    for (let i in room.auctionPlacement) {
      for (let x in room.players) {
        if (room.players[x].pId === room.auctionPlacement[i].playerId) {
          room.players[x].bottles += 1;

        }
      }
    }
    for (let i in room.marketPlacement) {
      for (let x in room.players) {
        if (room.players[x].pId === room.marketPlacement[i].playerId) {
          room.players[x].bottles += 1;

        }
      }
    }
  }
}
Data.prototype.resetPlacement = function (room) {
  if (typeof room !== 'undefined') {
    for (let i in room.buyPlacement) {
      if (room.buyPlacement[i].playerId !== null) {
        room.buyPlacement[i].playerId = null;
      }
    }
    for (let i in room.skillPlacement) {
      if (room.skillPlacement[i].playerId !== null) {
        room.skillPlacement[i].playerId = null;
      }
    }
    for (let i in room.auctionPlacement) {
      if (room.auctionPlacement[i].playerId !== null) {
        room.auctionPlacement[i].playerId = null;
      }
    }
    for (let i in room.marketPlacement) {
      if (room.marketPlacement[i].playerId !== null) {
        room.marketPlacement[i].playerId = null;
      }
    }
  }
}

Data.prototype.pushElementsToEnd = function (list) {
  let newList = new Array();
  for (let i = 0; i < list.length; i++) {
    newList.push({});
  }

  for (let j = newList.length - 1; j >= 0; j--) {
    for (let i = list.length - 1; i >= 0; i--) {
      if (typeof list[i].skill !== 'undefined') {
        let c = list.splice(i, 1, {});
        newList[j] = c[0];
        break;
      }
    }
  }

  return newList;
}
Data.prototype.pushElementsToFront = function (list) {
  let newList = new Array();
  for (let i = 0; i < list.length; i++) {
    newList.push({});
  }

  for (let j = 0; j < newList.length; j++) {
    for (let i = 0; i < list.length; i++) {
      if (typeof list[i].item !== 'undefined') {
        let c = list.splice(i, 1, {});
        newList[j] = c[0];
        break;
      }
    }
  }
  return newList;
}

/* Lägger in de återstående items in i skills i den mån det behövs och finns kort för */
Data.prototype.mergeItemsToSkills = function (room) {
  for (let j = room.skillsOnSale.length - 1; j >= 0; j--) {
    if (typeof room.skillsOnSale[j].skill == 'undefined') {
      for (let i = 0; i < room.itemsOnSale.length; i++) {
        if (typeof room.itemsOnSale[i].item !== 'undefined') {
          let c = room.itemsOnSale.splice(i, 1, {});
          room.skillsOnSale[j] = c[0];
          break;
        }
      }
    }
  }
}
Data.prototype.fillWithCards = function (room) {
  /* Lägger till nya kort på alla tomma platser i skillsOnSale */
  for (let i = 0; i < room.skillsOnSale.length; i++) {
    if (typeof room.skillsOnSale[i].skill == 'undefined') {
      room.skillsOnSale[i] = room.deck.pop();
    }
  }
  /* Lägger till nya kort på alla tomma platser i itemsOnSale */
  for (let i = 0; i < room.itemsOnSale.length; i++) {
    if (typeof room.itemsOnSale[i].item == 'undefined') {
      room.itemsOnSale[i] = room.deck.pop();
    }
  }
  /* Lägger till nya kort på alla tomma platser i auctionCards */
  for (let i = 0; i < room.auctionCards.length; i++) {
    if (typeof room.auctionCards[i].item == 'undefined') {
      room.auctionCards[i] = room.deck.pop();
    }
  }
}
Data.prototype.handleWorkActions = function (roomId, playerId, cost, workId) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    /* Här är det typ bara välja två kort och stoppa in i income tror jag*/
    if(workId < 4){
      
    }
    /* Dra två kort */
    if(workId === 4){
      
    }
    /* Dra två kort */
    if(workId === 5){
      let cards = room.deck.splice(0,2);
      room.players[playerId].hand.push(...cards);
    }
    /* Dra ett kort och bli första spelare nästa runda (något med unshift) */
    if(workId === 6){
    
    }
    /* Dra ett kort och välj ett kort att lägga i income från handen */
    if(workId === 7){

    }
  }
}

module.exports = Data;

