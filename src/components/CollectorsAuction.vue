<template>
  <div class="auctionBackground">
    <div class="auctionWrapper">
      <div
        id="startAuction"
        v-if="this.cardUpForAuction.item == undefined && auctionWinner == ''"
      >
        <h1>{{ labels.chooseAuctionCard }}</h1>
        <div class="titles">
          <h2>{{ labels.cardsFromHand }}</h2>

          <h2>{{ labels.cardsFromAuction }}</h2>
        </div>
        <div class="chooseCard">
          <div class="cardsFromHand">
            <div
              v-for="(card, index) in players[playerId].hand"
              :key="index"
              @click="putCardUpForAuction(card)"
            >
              <CollectorsCard :card="card" />
            </div>
          </div>
          <div class="cardsFromAuction">
            <div
              v-for="(card, index) in auctionCards"
              :key="index"
              @click="putCardUpForAuction(card)"
            >
              <CollectorsCard :card="card" />
            </div>
          </div>
        </div>
      </div>
      <div
        id="auctionStarted"
        v-if="this.cardUpForAuction.item !== undefined && auctionWinner == ''"
      >
        <div id="yourBets">
          <div
            v-if="
              !players[playerId].auctionPass && players[playerId].auctionTurn
            "
          >
            <h1>{{ labels.placeBetsHere }}</h1>
            <div>
              <button
                id="betButton"
                @click="placeBet()"
                :disabled="cannotAfford()"
              >
                {{ labels.betButton }}
              </button>
              <br /><br />
              <button id="passButton" @click="pass()">Pass</button>
            </div>
          </div>
          <div v-if="players[playerId].auctionPass">
            <h1>{{ labels.youPassed }}</h1>
          </div>
          <div
            v-if="
              !players[playerId].auctionPass && !players[playerId].auctionTurn
            "
          >
            <p>{{ labels.noTurn }}</p>
          </div>
          <div>
            <h1>{{ labels.leadingBet + this.leadingBet }}</h1>
          </div>
        </div>
        <div id="cardContainer">
          <h1>{{ labels.theAuctionCard }}</h1>
          <CollectorsCard id="theCard" :card="cardUpForAuction" />
        </div>
        <div id="bettingBoxes">
          <div
            v-for="(player, index) in players"
            :key="index"
            class="bettingBox"
          >
            <div v-if="!player.auctionPass">
              <h2>{{ labels.player + player.pId }} {{ player.auctionTurn }}</h2>
              <h3>{{ labels.betPlaced + player.auctionBet }}</h3>
              <p>{{ labels.coinsLeft}} {{ (player.money - player.auctionBet) }}</p>
            </div>
            <div v-else class="passed">
              <h2>{{ labels.player + player.pId }} {{ player.auctionTurn }}</h2>
              <h2>{{ labels.passed }}</h2>
            </div>
          </div>
        </div>
      </div>
      <div v-if="auctionWinner !== ''">
        <h1>{{ labels.auctionWinnerIs + auctionWinner }}</h1>
        <div v-if="auctionWinner == playerId">
          <h2>
            {{ labels.auctionWinnerChoose }}
          </h2>
          <img
            class="winnerOptionLogos"
            :src="'images/item_logos/' + cardUpForAuction.item + '_item.png'"
            @click="placeCardAsItem()"
          />
          <img
            class="winnerOptionLogos"
            :src="'images/skill_logos/' + cardUpForAuction.skill + '_skill.png'"
            @click="placeCardAsSkill()"
          />
          <img
            class="winnerOptionLogos"
            :src="'images/marketPic/image_' + cardUpForAuction.market + '.png'"
            @click="placeCardAsMarket()"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CollectorsCard from "@/components/CollectorsCard.vue";

export default {
  name: "CollectorsAuction",
  components: {
    CollectorsCard,
  },
  props: {
    players: Object,
    auctionCards: Array,
    cardUpForAuction: Object,
    leadingBet: Number,
    auctionWinner: String,
    labels: Object,
  },
  methods: {
    placeCardAsItem: function () {
      /* Lägg in kortet i spelarens items */
      this.$emit("winnerPlaceCard", "items");
    },
    placeCardAsSkill: function () {
      this.$emit("winnerPlaceCard", "skills");
    },
    placeCardAsMarket: function () {
      this.$emit("winnerPlaceCard", "market");
    },
    putCardUpForAuction: function (card) {
      this.placeBet();
      this.changeTurn();
      this.$emit("startAuction", card);
    },
    cannotAfford: function () {
      return this.leadingBet >= this.players[this.playerId].money;
    },
    updatePlayers: function () {
      this.$emit("updatePlayers", this.players);
    },
    updateLeadingBet: function (leadingBet) {
      this.$emit("updateLeadingBet", leadingBet);
    },
    placeBet: function () {
      this.players[this.playerId].auctionBet = this.leadingBet + 1;
      this.changeTurn();
      this.updateLeadingBet(this.players[this.playerId].auctionBet);
      this.updatePlayers();
    },
    pass: function () {
      this.players[this.playerId].auctionPass = true;
      this.changeTurn();
      this.updatePlayers();
    },
    nextPlayerIndex: function (currentIndex) {
      if (currentIndex == Object.keys(this.players).length - 1) {
        return 0;
      } else {
        return currentIndex + 1;
      }
    },
    hasWon: function (nextPlayer) {
      let passChecker = true;
      for (let x in this.players) {
        if (
          this.players[x].pId !== Object.values(this.players)[nextPlayer].pId &&
          !this.players[x].auctionPass
        ) {
          passChecker = false;
        }
      }
      if (
        this.leadingBet == Object.values(this.players)[nextPlayer].auctionBet &&
        this.leadingBet !== 0 &&
        passChecker
      ) {
        console.log(
          "Den här spelaren har vunnit auktionen! " +
            Object.values(this.players)[nextPlayer].pId
        );
        this.setAuctionWinner(Object.values(this.players)[nextPlayer].pId);
      }
    },
    setAuctionWinner: function (playerId) {
      this.$emit("setAuctionWinner", playerId);
    },
    changeTurn: function (
      /* Mitt eget index i player-listan som inparameter ifall inget annat angivet */
      playerIndex = Object.keys(this.players).indexOf(this.playerId)
    ) {
      this.players[this.playerId].auctionTurn = false;

      let newPlayerIndex = this.nextPlayerIndex(playerIndex);

      /* Vid det här laget vet vi vem vi vill byta till. Nu måste vi dock kolla att den personen inte har passat */
      if (!Object.values(this.players)[newPlayerIndex].auctionPass) {
        Object.values(this.players)[newPlayerIndex].auctionTurn = true;
        this.hasWon(newPlayerIndex);
      } else {
        this.changeTurn(this.nextPlayerIndex(newPlayerIndex));
      }
      /* Kolla ifall spelaren som vi byter till har vunnit */
    },
  },
  computed: {
    playerId: function () {
      return this.$store.state.playerId;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.auctionBackground {
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  position: absolute;
  z-index: 5;
}
.auctionWrapper {
  z-index: 6;
  width: 80%;
  background-color: rgb(247, 195, 137);
  height: 80vh;
  margin: 0 auto;
  margin-top: 10vh;
  color: white;
  text-align: center;
  border-radius: 20px;
}
.winnerOptionLogos {
  max-height: 100px;
}
.titles {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.chooseCard {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.cardsFromAuction,
.cardsFromHand {
  display: grid;
  grid-template-columns: repeat(auto-fill, 130px);
  grid-template-rows: repeat(auto-fill, 180px);
}
.cardsFromAuction div,
.cardsFromHand div {
  transform: scale(0.7);
  z-index: 0;
}
#auctionStarted {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 3fr 1fr;
}
#theCard {
  margin: 0 auto;
}
#yourBets {
  text-align: center;
}
#bettingBoxes {
  grid-column: 1/3;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}
.bettingBox {
  border: 2px solid black;
}
.passed {
  opacity: 0.6;
}
#betButton {
  background-color: #44c767;
  border-radius: 28px;
  border: 1px solid #18ab29;
  display: inline-block;
  cursor: pointer;
  color: white;
  padding: 2.5%;
  text-decoration: none;
  text-shadow: 0px 1px 0px #2f6627;
}
#betButton:hover {
  background-color: #5cbf2a;
}
#betButton:active {
  position: relative;
  top: 1px;
}
#passButton {
  background-color: #c22020;
  border-radius: 20px;
  border: 1px solid #ee2308;
  display: inline-block;
  cursor: pointer;
  color: white;
  padding: 2.5%;
  text-decoration: none;
  text-shadow: 0px 1px 0px #742626;
}
#passButton:hover {
  background-color: #6d2020;
}
#passButton:active {
  position: relative;
  top: 1px;
}
</style>