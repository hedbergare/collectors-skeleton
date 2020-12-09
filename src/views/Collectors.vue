<template>
  <div>
    <main>
      {{ buyPlacement }} {{ chosenPlacementCost }}
      <CollectorsBuyActions
        v-if="players[playerId]"
        :labels="labels"
        :player="players[playerId]"
        :itemsOnSale="itemsOnSale"
        :marketValues="marketValues"
        :placement="buyPlacement"
        @buyCard="buyCard($event)"
        @placeBottle="placeBottle('buy', $event)"
      />

      <CollectorsBuySkills
        v-if="players[playerId]"
        :labels="labels"
        :player="players[playerId]"
        :skillsOnSale="skillsOnSale"
        :placement="skillPlacement"
        @buySkill="buySkill($event)"
        @placeBottle="placeBottle('skill', $event)"
      />

      <div class="buttons">
        Draw a card here
        <button @click="drawCard">
          {{ labels.draw }}
        </button>
      </div>
      <!-- Testknapp för "fill pools"
    <button @click="fillPools()">HEJ</button> -->
    <button @click="changeTurn()">Byt tur</button>
      Skills
      <div class="cardslots">
        <CollectorsCard
          v-for="(card, index) in skillsOnSale"
          :card="card"
          :availableAction="card.available"
          :key="index"
        />
      </div>

      Auction
      <div class="cardslots">
        <CollectorsCard
          v-for="(card, index) in auctionCards"
          :card="card"
          :key="index"
        />
      </div>

      Hand
      <div class="cardslots" v-if="players[playerId]">
        <CollectorsCard
          v-for="(card, index) in players[playerId].hand"
          :card="card"
          :availableAction="card.available"
          @doAction="buyCard(card)"
          :key="index"
        />
      </div>
      Items
      <div class="cardslots" v-if="players[playerId]">
        <CollectorsCard
          v-for="(card, index) in players[playerId].items"
          :card="card"
          :key="index"
        />
      </div>
    </main>
    {{ players }}
    {{ marketValues }}
    <button v-if="players[playerId]" @click="players[playerId].money += 1">
      fake more money
    </button>
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
    <CollectorsBottle />

    <div id="browserWrapper">
      <div id="gameboardColumn">
        <CollectorsGameBoard
          :itemsOnSale="itemsOnSale"
          :skillsOnSale="skillsOnSale"
          :auctionCards="auctionCards"
          @buyCard="buyCard($event)"
          @buySkill="buySkill($event)"
        />
      </div>
      <div id="rightColumn">
        <div id="infoboardColumn">
          <CollectorsInfoBoard />
        </div>
        <div id="playerboardRow">
          <div id="playerBoardContainer">
            <!-- Sin egen flik ska skapas först -->
            <div v-if="players[playerId]">
              <div
                class="playerBoardTab"
                :style="'background-color:' + players[playerId].color"
                @click="showCorrectPlayerBoard(playerId)"
              >
                <p>{{ playerId }}</p>
              </div>
            </div>
            <!-- Sedan skapas flikarna för de andra spelarna -->
            <div v-for="(player, index) in players" :key="index">
              <div
                v-if="player.pId !== playerId"
                class="playerBoardTab"
                :style="'background-color:' + player.color"
                @click="showCorrectPlayerBoard(player.pId)"
              >
                <p>{{ player.pId }}</p>
              </div>
            </div>
          </div>
          <!-- Sitt eget player board -->
          <div :id="playerId">
            <CollectorsPlayerBoard
              v-if="players[playerId]"
              :player="players[playerId]"
              :class="playerId"
            />
          </div>
          <!-- De andras player board -->
          <div
            v-for="(p, index) in players"
            :key="index"
            :id="p.pId"
            :style="'display:none'"
          >
            <CollectorsPlayerBoard v-if="p !== players[playerId]" :player="p" />
          </div>
        </div>
      </div>
    </div>
<<<<<<< HEAD
    <!-- Sitt eget player board -->
    <div :id="playerId">
      <CollectorsPlayerBoard
        v-if="players[playerId]"
        :player="players[playerId]"
        :class="playerId"
      />
    </div>
    <!-- De andras player board -->
    <div
      v-for="(p, index) in players"
      :key="index"
      :id="p.pId"
      :style="'display:none'"
    >
      <CollectorsPlayerBoard v-if="p !== players[playerId]" :player="p" />
    </div>
    <CollectorsBottle />
    <CollectorsBottle />
    <CollectorsGameBoard
      v-if="itemsOnSale"
      :itemsOnSale="itemsOnSale"
      :skillsOnSale="skillsOnSale"
    />
    <CollectorsInfoBoard :room="roomId" />
=======
>>>>>>> 60b3a75f947e68c595804ecfada4d85669daac03
  </div>
</template>


<script>
/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "[iI]gnored" }]*/

import CollectorsCard from "@/components/CollectorsCard.vue";
import CollectorsBuyActions from "@/components/CollectorsBuyActions.vue";
import CollectorsGameBoard from "@/components/CollectorsGameBoard.vue";
import CollectorsPlayerBoard from "@/components/CollectorsPlayerBoard.vue";
import CollectorsBottle from "@/components/CollectorsBottle.vue";
import CollectorsBuySkills from "@/components/CollectorsBuySkills.vue";
import CollectorsInfoBoard from "@/components/CollectorsInfoBoard.vue";

export default {
  name: "Collectors",
  components: {
    CollectorsCard,
    CollectorsBuyActions,
    CollectorsBuySkills,
    CollectorsGameBoard,
    CollectorsPlayerBoard,
    CollectorsBottle,
    CollectorsInfoBoard,
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
        console.log("Bottle has been placed");
      }.bind(this)
    );

    this.$store.state.socket.on(
      "collectorsPointsUpdated",
      (d) => (this.points = d)
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
        console.log( d.playerId, "bought a card");
        this.players = d.players;
        this.itemsOnSale = d.itemsOnSale;
      }.bind(this)
    );

    this.$store.state.socket.on(
      "collectorsSkillBought",
      function (d) {
        console.log(d.playerId, "bought a skill");
        this.players = d.players;
        this.skillsOnSale = d.skillsOnSale;
      }.bind(this)
    );
    this.$store.state.socket.on(
      "collectorsPoolsFilled",
      function (d) {
        console.log("Pools have been filled");
        this.itemsOnSale = d.itemsOnSale;
        this.skillsOnSale = d.skillsOnSale;
        this.auctionCards = d.auctionCards;
      }.bind(this)
    );
    this.$store.state.socket.on(
      "turnChanged",
      function (d) {
        console.log("turn has changed");
        this.players = d.players;
      }.bind(this)
    );
  },

  methods: {
    fillPools: function () {
      console.log("fillPools i Collectors");
      this.$store.state.socket.emit("fillPools", {
        roomId: this.$route.params.id,
      });
    },
    changeTurn: function(){
      this.players[this.playerId].isTurn = false;
      let playerIndex = Object.keys(this.players).indexOf(this.playerId);
      console.log("Vårat index just nu " + playerIndex);
      let newPlayerIndex;
      if (playerIndex == Object.keys(this.players).length-1){
        newPlayerIndex = 0;
      }
      else {
        newPlayerIndex = playerIndex + 1;
      }
      console.log("Vi ska byta till" + newPlayerIndex);
      Object.values(this.players)[newPlayerIndex].isTurn = true;
      this.$store.state.socket.emit("changeTurn", {
      players: this.players,
      roomId: this.$route.params.id,
    });
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
    placeBottle: function (action, cost) {
      console.log("Placebottle i collectors.vue");
      console.log(cost);
      this.chosenPlacementCost = cost;
      this.$store.state.socket.emit("collectorsPlaceBottle", {
        roomId: this.$route.params.id,
        playerId: this.playerId,
        action: action,
        cost: cost,
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
        cost: this.marketValues[card.market] + this.chosenPlacementCost,
      });
    },
    buySkill: function (card) {
      console.log("buySkill", card);
      console.log("hej 2");
      this.$store.state.socket.emit("collectorsBuySkills", {
        roomId: this.$route.params.id,
        playerId: this.playerId,
        card: card,
        cost: this.marketValues[card.market] + this.chosenPlacementCost,
      });
      console.log("hej");
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
  transform: scale(1) translate(-25%, 0);
  z-index: 1;
}
#playerBoardContainer {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  max-width: 40%;
}
.playerBoardTab {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: white;
  color: black;
  text-align: center;
  font-weight: bold;
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
}

#infoboardColumn {
  display: grid;
  display: table-cell;
  vertical-align: bottom;
}

#playerboardRow {
  display: grid;
  display: inline-block;
  vertical-align: bottom;
}

#rightColumn {
  display: grid;
  grid-template-rows: 1fr 3fr;
}
</style>
