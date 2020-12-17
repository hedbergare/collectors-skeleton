<template>
  <div>
    <main>
      <CollectorsGameOver
      v-if="roundCounter === 5"
        :players="players"
        :marketValues="marketValues"
      />

      
      <CollectorsAuction
        v-if="players[playerId] && this.auctionInitiated"
        :auctionCards="auctionCards"
        :players="players"
        :cardUpForAuction="cardUpForAuction"
        :leadingBet="leadingBet"
        :auctionWinner="auctionWinner"
        @startAuction="startAuction($event)"
        @updatePlayers="updatePlayers($event)"
        @updateLeadingBet="updateLeadingBet($event)"
        @setAuctionWinner="setAuctionWinner($event)"
        @winnerPlaceCard="winnerPlaceCard($event)"
      />
      <div id="browserWrapper">
        <div id="gameboardColumn">
          <CollectorsGameBoard
            v-if="itemsOnSale"
            :player="players[playerId]"
            :labels="labels"
            :itemsOnSale="itemsOnSale"
            :skillsOnSale="skillsOnSale"
            :marketValues="marketValues"
            :buyPlacement="buyPlacement"
            :skillPlacement="skillPlacement"
            :auctionPlacement="auctionPlacement"
            :marketPlacement="marketPlacement"
            @buyCard="buyCard($event)"
            @updatePoints="updatePoints($event)"
            @buySkill="buySkill($event)"
            @placeBottle="placeBottle($event)"
            @initiateAuction="initiateAuction($event)"
            @handleAction="handleAction($event)"
          />
        </div>
        <div id="rightColumn">
          <div id="playerboardRow">
            <div id="playerBoardContainer">
              <!-- Sin egen flik ska skapas först -->
              <div v-if="players[playerId]">
                <div
                  :class="['playerBoardTab', {'activeTab': players[playerId].isTurn}]"
                  :style="'background-color:' + players[playerId].color"
                  @click="showCorrectPlayerBoard(playerId)"
                >
                  <p>{{ playerId }} ({{Object.keys(players).indexOf(playerId)+1}})</p>
                </div>
              </div>
              <!-- Sedan skapas flikarna för de andra spelarna -->
              <div v-for="(player, index) in players" :key="index">
                <div
                  v-if="player.pId !== playerId"
                  :class="['playerBoardTab', {'activeTab': player.isTurn}]"
                  :style="'background-color:' + player.color"
                  @click="showCorrectPlayerBoard(player.pId)"
                >
                  <p>{{ player.pId }} ({{Object.keys(players).indexOf(player.pId)+1}})</p>
                </div>
              </div>
            </div>
            <!-- Sitt eget player board -->
            <div :id="playerId">
              <CollectorsPlayerBoard
                v-if="players[playerId]"
                :player="players[playerId]"
                :class="playerId"
                @handleAction="handleAction($event)"
              />
            </div>
            <!-- De andras player board -->
            <div
              v-for="(p, index) in players"
              :key="index"
              :id="p.pId"
              :style="'display:none'"
            >
              <CollectorsPlayerBoard
                v-if="p !== players[playerId]"
                :player="p"
              />
            </div>
          </div>
          <div id="infoboardColumn">
            <CollectorsInfoBoard 
            :consoleHistory="consoleHistory"
            :roundCounter="roundCounter" />
          </div>
        </div>
      </div>
    </main>
    <div>
      <div class="buttons">
        Draw a card here
        <button @click="drawCard">
          {{ labels.draw }}
        </button>
      </div>
      Testknapp för "fill pools"
      <button @click="fillPools()">Fill pools (fas 2) testknapp</button>
      <button @click="changeTurn()">Byt tur testknapp</button>
      Auction
      <div class="cardslots">
        <CollectorsCard
          v-for="(card, index) in auctionCards"
          :card="card"
          :key="index"
        />
      </div>

      {{ players }}
      <button v-if="players[playerId]" @click="players[playerId].money += 1">
        fake more money
      </button>
    </div>
    <footer>
      <p>
        {{ labels.invite }}
        <input
          type="text"
          :value="publicPath + $route.path"
          @click="selectAll"
          readonly="readonly"
        />
      </p>
    </footer>
  </div>
</template>


<script>
/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "[iI]gnored" }]*/

import CollectorsCard from "@/components/CollectorsCard.vue";
import CollectorsGameBoard from "@/components/CollectorsGameBoard.vue";
import CollectorsPlayerBoard from "@/components/CollectorsPlayerBoard.vue";
import CollectorsInfoBoard from "@/components/CollectorsInfoBoard.vue";
import CollectorsAuction from "@/components/CollectorsAuction.vue";
import CollectorsGameOver from "@/components/CollectorsGameOver.vue";

export default {
  name: "Collectors",
  components: {
    CollectorsCard,
    CollectorsGameBoard,
    CollectorsPlayerBoard,
    CollectorsInfoBoard,
    CollectorsAuction,
    CollectorsGameOver,
  },
  data: function () {
    return {
      publicPath: "localhost:8080/#", //"collectors-groupxx.herokuapp.com/#",
      touchScreen: false,
      maxSizes: { x: 0, y: 0 },
      labels: {},
      players: {},
      // playerId: {
      //   hand: [],
      //   money: 1,
      //   points: 0,
      //   skills: [],
      //   items: [],
      //   income: [],
      //   secret: []
      //   color: ""
      // }
      buyPlacement: [],
      skillPlacement: [],
      auctionPlacement: [],
      marketPlacement: [],
      chosenPlacementCost: null,
      marketValues: {
        fastaval: 0,
        movie: 0,
        technology: 0,
        figures: 0,
        music: 0,
      },
      itemsOnSale: [],
      skillsOnSale: [],
      auctionCards: [],
      playerid: 0,
      cardUpForAuction: {},
      auctionWinner: "",
      leadingBet: 0,
      auctionInitiated: false,
      action: "",
      consoleHistory: [],
      roundCounter: 1,
    };
  },
  computed: {
    playerId: function () {
      return this.$store.state.playerId;
    },
    roomId: function () {
      return this.$route.params.id;
    },
  },
  watch: {
    players: function (newP, oldP) {
      console.log(newP, oldP);
      for (let p in this.players) {
        for (let c = 0; c < this.players[p].hand.length; c += 1) {
          if (typeof this.players[p].hand[c].item !== "undefined")
            this.$set(this.players[p].hand[c], "available", false);
        }
      }
    },
  },
  created: function () {
    this.$store.commit("SET_PLAYER_ID", this.$route.query.id);
    //TODO! Fix this ugly hack
    //background: https://github.com/quasarframework/quasar/issues/5672
    const newRoute = this.$route.params.id + "?id=" + this.playerId;
    if (this.$route.params.id + "?id=" + this.$route.query.id !== newRoute)
      this.$router.push(newRoute);

    this.$store.state.socket.emit("collectorsLoaded", {
      roomId: this.$route.params.id,
      playerId: this.playerId,
    });

    this.$store.state.socket.on(
      "collectorsInitialize",
      function (d) {
        this.labels = d.labels;
        this.players = d.players;
        this.itemsOnSale = d.itemsOnSale;
        this.marketValues = d.marketValues;
        this.skillsOnSale = d.skillsOnSale;
        this.auctionCards = d.auctionCards;
        this.buyPlacement = d.placements.buyPlacement;
        this.skillPlacement = d.placements.skillPlacement;
        this.marketPlacement = d.placements.marketPlacement;
        this.auctionPlacement = d.placements.auctionPlacement;
      }.bind(this)
    );

    this.$store.state.socket.on(
      "collectorsBottlePlaced",
      function (d) {
        this.buyPlacement = d.buyPlacement;
        this.skillPlacement = d.skillPlacement;
        this.marketPlacement = d.marketPlacement;
        this.auctionPlacement = d.auctionPlacement;
      }.bind(this)
    );

    this.$store.state.socket.on(
      "collectorsPointsUpdated",
      function (d) {
        this.players = d.players;
      }.bind(this)
    );

    this.$store.state.socket.on(
      "collectorsCardDrawn",
      function (d) {
        //this has been refactored to not single out one player's cards
        //better to update the state of all cards
        this.players = d;
      }.bind(this)
    );

    this.$store.state.socket.on(
      "collectorsCardBought",
      function (d) {
        console.log(d.playerId, "bought a card");
        this.consoleHistory.push(d.playerId + " bought a card");
        this.players = d.players;
        this.itemsOnSale = d.itemsOnSale;
        if (this.playerId === d.playerId) {
          this.changeTurn();
        }
      }.bind(this)
    );
    this.$store.state.socket.on(
      "collectorsMarketBought",
      function (d) {
        console.log(d.playerId, "raised a value");
        this.players = d.players;
        this.skillsOnSale = d.skillsOnSale;
        this.marketValues = d.marketValues;
        if (this.playerId === d.playerId) {
          this.changeTurn();
        }
      }.bind(this)
    );
    this.$store.state.socket.on(
      "auctionStarted",
      function (d) {
        console.log("Auction has been started");
        this.consoleHistory.push(d.playerId + " Auction has been started");
        this.cardUpForAuction = d.cardUpForAuction;
        this.players = d.players;
        this.auctionCards = d.auctionCards;
        this.auctionInitiated = true;
        if (this.playerId === d.playerId) {
          this.changeTurn();
        }
      }.bind(this)
    );
    this.$store.state.socket.on(
      "leadingBetUpdated",
      function (d) {
        this.leadingBet = d.leadingBet;
      }.bind(this)
    );
    this.$store.state.socket.on(
      "collectorsSkillBought",
      function (d) {
        console.log(d.playerId, "bought a skill");
        this.consoleHistory.push(d.playerId + " bought a skill");
        this.players = d.players;
        this.skillsOnSale = d.skillsOnSale;
        if (this.playerId === d.playerId) {
          this.changeTurn();
        }
      }.bind(this)
    );
    this.$store.state.socket.on(
      "collectorsPoolsFilled",
      function (d) {
        console.log("Pools have been filled");
        this.consoleHistory.push("New round has been started");
        this.itemsOnSale = d.itemsOnSale;
        this.skillsOnSale = d.skillsOnSale;
        this.auctionCards = d.auctionCards;
        this.marketValues = d.marketValues;
        this.buyPlacement = d.placements.buyPlacement;
        this.skillPlacement = d.placements.skillPlacement;
        this.marketPlacement = d.placements.marketPlacement;
        this.auctionPlacement = d.placements.auctionPlacement;
        this.roundCounter = d.roundCounter;
        this.players = d.players;
      }.bind(this)
    );
    this.$store.state.socket.on(
      "turnChanged",
      function (d) {
        this.players = d.players;
      }.bind(this)
    );
    this.$store.state.socket.on(
      "playersUpdated",
      function (d) {
        this.players = d.players;
      }.bind(this)
    );
    this.$store.state.socket.on(
      "auctionWinnerSet",
      function (d) {
        this.auctionWinner = d.auctionWinner;
      }.bind(this)
    );
    this.$store.state.socket.on(
      "auctionDone",
      function (d) {
        this.players = d.players;
        this.cardUpForAuction = d.cardUpForAuction;
        this.marketValues = d.marketValues;
        this.auctionWinner = d.auctionWinner;
        this.leadingBet = d.leadingBet;
        this.auctionInitiated = false;
      }.bind(this)
    );
  },

  methods: {
    initiateAuction: function () {
      this.auctionInitiated = true;
    },
    setAuctionWinner: function (p) {
      this.$store.state.socket.emit("setAuctionWinner", {
        roomId: this.$route.params.id,
        playerId: p,
      });
    },
    updatePlayers: function (players) {
      this.$store.state.socket.emit("updatePlayers", {
        players: players,
        roomId: this.$route.params.id,
      });
    },
    updateLeadingBet: function (leadingBet) {
      this.$store.state.socket.emit("updateLeadingBet", {
        roomId: this.$route.params.id,
        leadingBet: leadingBet,
      });
    },
    /* Fungerar ej men har potential  */
    fillTreasure: function (card) {
      let secretCard = this.players[this.playerId].hand.pop(card);
      this.players[this.playerId].secret.push(secretCard);
    },

    fillPools: function () {
      this.$store.state.socket.emit("fillPools", {
        roomId: this.$route.params.id,
      });
      this.updatePoints(); /* När poolen fylls på ska dina poäng uppdateras */
    },
    changeTurn: function (
      playerIndex = Object.keys(this.players).indexOf(this.playerId)
    ) {
      Object.values(this.players)[playerIndex].isTurn = false;

      for (let x in this.players) {
        if (this.players[x].bottles > 0) {
          let newPlayerIndex;
          if (playerIndex == Object.keys(this.players).length - 1) {
            newPlayerIndex = 0;
          } else {
            newPlayerIndex = playerIndex + 1;
          }
          if (Object.values(this.players)[newPlayerIndex].bottles > 0) {
            Object.values(this.players)[newPlayerIndex].isTurn = true;
            this.$store.state.socket.emit("changeTurn", {
              players: this.players,
              roomId: this.$route.params.id,
            });
            return;
          } else {
            this.changeTurn(newPlayerIndex);
            return;
          }
        }
      }
      /* Här under ska vi göra allt som ska ske när alla spelare har slut på bottles */
      console.log("Everyone has run out of bottles :(");
      this.consoleHistory.push("everyone has run out of bottles");
      this.fillPools();
    },

    showCorrectPlayerBoard: function (clickedId) {
      //Den här funktionen visar rätt player board när man klickar på en "tab"
      for (let p in this.players) {
        if (p !== clickedId) {
          document.getElementById(p).style.display = "none";
        }
        document.getElementById(clickedId).style.display = "block";
      }
      /* Tar bort den tomma fliken */
      let children = document.getElementById("playerBoardContainer").childNodes;
      for (let i in children) {
        if (children[i].tagName == "DIV") {
          if (children[i].childNodes[0].tagName !== "DIV") {
            children[i].style = "display:none;";
          }
        }
      }
    },
    selectAll: function (n) {
      n.target.select();
    },
    placeBottle: function (p) {
      console.log("PlaceBottle inparameter cost: " + p.cost);
      this.chosenPlacementCost = p.cost;
      console.log("chosenPlaceMentCost" + this.chosenPlacementCost);
      this.action = p.action;
      this.$store.state.socket.emit("collectorsPlaceBottle", {
        roomId: this.$route.params.id,
        playerId: this.playerId,
        action: p.action,
        cost: p.cost,
      });
    },
    handleAction: function (card) {
      if (this.action === "skill") {
        this.buySkill(card);
        this.action = "";
      }
      if (this.action === "item") {
        this.buyCard(card);
        this.action = "";
      }
      if (this.action === "market") {
        this.buyMarket(card);
        this.action = "";
      }
    },
    buyMarket: function (card) {
      this.$store.state.socket.emit("collectorsBuyMarket", {
        roomId: this.$route.params.id,
        playerId: this.playerId,
        card: card,
        cost: this.chosenPlacementCost,
      });
    },

    drawCard: function () {
      this.$store.state.socket.emit("collectorsDrawCard", {
        roomId: this.$route.params.id,
        playerId: this.playerId,
      });
    },
    buyCard: function (card) {
      this.$store.state.socket.emit("collectorsBuyCard", {
        roomId: this.$route.params.id,
        playerId: this.playerId,
        card: card,
        cost: this.marketValues[card.item] + this.chosenPlacementCost,
      });
    },
    buySkill: function (card) {
      this.$store.state.socket.emit("collectorsBuySkills", {
        roomId: this.$route.params.id,
        playerId: this.playerId,
        card: card,
        cost: this.chosenPlacementCost,
      });
    },

    startAuction: function (card) {
      console.log(
        "this.choseplacementcost i startauction()" + this.chosenPlacementCost
      );
      this.cardUpForAuction = card;
      this.$store.state.socket.emit("startAuction", {
        roomId: this.$route.params.id,
        cardUpForAuction: this.cardUpForAuction,
        playerId: this.playerId,
        cost: this.chosenPlacementCost,
      });
    },
    winnerPlaceCard: function (placement) {
      this.$store.state.socket.emit("winnerPlaceCard", {
        roomId: this.$route.params.id,
        playerId: this.playerId,
        placement: placement,
      });
    },
    updatePoints: function () {
      this.$store.state.socket.emit("collectorsUpdatePoints", {
        roomId: this.$route.params.id,
      });
    },
  },
};
</script>
<style scoped>
header {
  user-select: none;
  position: fixed;
  width: 100%;
  pointer-events: none;
}
main {
  user-select: none;
}
footer {
  margin-top: 5em auto;
}
footer a {
  text-decoration: none;
  border-bottom: 2px dotted ivory;
}
footer a:visited {
  color: ivory;
}
.cardslots {
  display: grid;
  grid-template-columns: repeat(auto-fill, 130px);
  grid-template-rows: repeat(auto-fill, 180px);
}
.cardslots div {
  transform: scale(0.5) translate(-50%, -50%);
  transition: 0.2s;
  transition-timing-function: ease-out;
  z-index: 0;
}
.cardslots div:hover {
  transform: scale(0.5) translate(-25%, 0);
  z-index: 1;
}
#playerBoardContainer {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  max-width: 50%;
}
.playerBoardTab {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: white;
  color: black;
  text-align: center;
  font-weight: bold;
  border-top:2px solid transparent;
  border-left:2px solid transparent;
  border-right:2px solid transparent;
}
.activeTab{
  border-top:2px solid gold;
  border-left:2px solid gold;
  border-right:2px solid gold;
}
.playerBoardTab p {
  margin: 0;
  padding: 0.5em;
}
.playerBoardTab:hover {
  cursor: pointer;
}
@media screen and (max-width: 800px) {
  main {
    width: 90vw;
  }
}

/* PLayerboard layout för browsern */
#browserWrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-height: 100vh;
}

#gameboardColumn {
  display: grid;
  max-height:100%;
}

#infoboardColumn {
  width: 100%;
  height:100%;
}

#playerboardRow {
  display: grid;
  display: inline-block;
  vertical-align: bottom;
}
#rightColumn{
  height:100%;
}
</style>
