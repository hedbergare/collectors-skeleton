<template>
  <div id="wrapper">
    <!-- Popup till secret card i treasure -->
    <div class="Absolute-Center" v-if="this.infoText !== ''">
      <div class="infoPopup">
        <button @click="resetInfo()" class="close">X</button>
        <h2>{{ this.infoText }} </h2> 
        <CollectorsCard
          v-for="(card, index) in player.secret"
          :key="index"
          :card="card"
        />
        <p> {{ this.infoTitle }} </p>
      </div>
    </div>
    <!-- Här läggs det in vilken färg man "är" -->
    <div id="topRow" :style="'background-color:' + player.color">
      <div id="midRow">
        <div class="box">
          <CollectorsBottle
            class="x"
            v-if="player.bottles > 0"
            :color="player.color"
          />
          <img v-else class="x bottle" src="images/player_board/bottle.JPG" />
        </div>
        <div class="box">
          <CollectorsBottle
            class="x"
            v-if="player.bottles > 1"
            :color="player.color"
          />
          <img v-else class="x bottle" src="images/player_board/bottle.JPG" />
        </div>
        <div class="box">
          <CollectorsBottle
            class="x"
            v-if="player.bottles > 2"
            :color="player.color"
          />
          <img
            v-else
            class="x addCard"
            src="images/player_board/add_card.JPG"
          />
        </div>
        <div class="box">
          <CollectorsBottle
            class="x"
            v-if="player.bottles > 3"
            :color="player.color"
          />
          <img
            v-else
            class="x oneDollar"
            src="images/player_board/1_dollar.JPG"
          />
        </div>
        <div class="box">
          <CollectorsBottle
            class="x"
            v-if="player.bottles > 4"
            :color="player.color"
          />
          <img
            v-else
            class="x twoDollar"
            src="images/player_board/2_dollar.JPG"
          />
        </div>
      </div>
      <!-- här visas hur mycket pengar, poäng och income man har och chest -->
      <div id="wallet">
        <div>
          <img
            id="chest"
            src="images/player_board/treasure.PNG"
            class="topRowIcons"
            style="cursor: pointer"
            v-if="playerId === player.pId"
            @click="showSecret(labels.secretCardInfo, labels.secretCardTitle)"
          />
        </div>

        <div id="money">
          <div>
            <img
              src="images/player_board/current_money.png"
              class="topRowIcons"
            />
          </div>
          <p>{{ player.money }}</p>
        </div>

        <div id="income">
          <div>
            <img
              src="images/player_board/passive_income.png"
              class="topRowIcons"
            />
          </div>
          <p>{{ player.passiveIncome }}</p>
        </div>

        <div id="currentPoints">
          <div>
            <img src="images/player_board/score.png" class="topRowIcons" />
          </div>
          <p>{{ player.points }}</p>
        </div>
      </div>
    </div>

    <!-- Mellersta raden, där ens "bottles" ska ligga -->

    <!-- Understa raden -->
    <div id="bottomRow">
      <div id="skills" :style="'background-color:' + player.color">
        <div id="skillsImage">
          <span class="helper"></span>
          <img id="skillsButton" src="/images/buySkillPic/Skillsbutton.png" />
          <img id="skillsInfo" src="images/player_board/skills_info.PNG" />
        </div>

        <!-- Här skapas bilder för de skills som man äger -->
        <div id="skillsRefill">
          <div
            v-for="(card, index) in player.skills"
            :key="index"
            style="max-height: 100%"
          >
            <img
              class="skillsIcons"
              :src="'images/skill_logos/' + card.skill + '_skill.png'"
            />
          </div>
        </div>
      </div>

      <div id="items" :style="'background-color:' + player.color">
        <!-- Här skapas bilder för de items man äger -->
        <div id="itemsRefill">
          <div v-for="(card, index) in player.items" :key="index">
            <img
              class="itemIcons"
              :src="'images/item_logos/' + card.item + '_item.png'"
            />
          </div>
        </div>
        <div id="itemsImage">
          <span class="helper"></span>
          <img src="images/player_board/item_button_clean.png" />
        </div>
      </div>
    </div>

    <!-- Här kommer nedersta raden för kort på hand -->
    <div id="cardRow" :style="'background-color:' + player.color">
      <div id="cardsImage">
        <span class="helper"></span>
        <img src="images/player_board/card_hand.png" />
      </div>

      <div id="cardRefill" v-if="playerId == player.pId">
        <div class="cardCont" v-for="(card, index) in player.hand" :key="index">
          <CollectorsCard
            :card="card"
            :availableAction="card.available"
            @doAction="handleAction(card)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CollectorsCard from "@/components/CollectorsCard.vue";
import CollectorsBottle from "@/components/CollectorsBottle.vue";

export default {
  name: "CollectorsPlayerBoard",
  components: {
    CollectorsCard,
    CollectorsBottle,
  },
  data: function () {
    return {
      infoText: "",
      infoTitle: "",
    };
  },

  props: {
    player: Object,
    labels: Object,
  },

  computed: {
    playerId: function () {
      return this.$store.state.playerId;
    },
  },
  methods: {
    handleAction: function (card) {
      if (card.available) {
        this.$emit("handleAction", card);
      }
    },
    showSecret: function (text, title) {
      this.infoText = text;
      this.infoTitle = title;
    },
    resetInfo: function () {
      this.infoText = "";
    },
  },
};
</script>
<style scoped>
.Absolute-Center {
  width: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.3);
  height: 102%;
  z-index: 10;
}
.infoPopup {
  box-shadow: 0px 1px 0px 0px #1c1b18;
  background: linear-gradient(to bottom, #eae0c2 5%, #ccc2a6 100%);
  background-color: #eae0c2;
  border-radius: 15px;
  border: 2px solid #333029;
  color: #0e0f0a;
  font-weight: bold;
  text-shadow: 0px 1px 0px #ffffff;
  padding: 5%;
  position: relative;
  max-width: 50%;
  max-height: 100%;
}
.card {
  transform: scale(0.8);
}

.infoPopup h2 {
  margin-block-start: 0em;
    margin-block-end: 0em;
}
.infoPopup p {
  font-size: 80%;
  margin-block-start: 1em;
  margin-block-end: 1em;
}
.close {
  position: absolute;
  background: rgb(75, 0, 0);
  color: #d1c8ad;
  top: -2px;
  right: -2px;
  font-size: 160%;
  /* padding:10px; */
  border-radius: 10px;
  border: 2px solid black;
  cursor: pointer;
}
#wrapper {
  display: grid;
  border-radius: 10px;
  position: relative;
  height: 100%;
  grid-template-rows: 2fr 2fr auto;
}

#topRow {
  display: grid;
  grid-row: 1;
  grid-template-columns: 7fr 1fr;
  grid-template-rows: 1fr;
  border-radius: 5px;
  margin-top: 3px;
  padding: 1%;
  margin: 5px;
}

/* Hover och style för treasure */
#chest:hover + .secretPopup {
  display: inline-block;
  position: absolute;
  top: 0;
  left: 0;
}

.secretPopup {
  display: none;
  position: absolute;
  transform: scale(0.5);
  width: 100%;
}

#wallet {
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  font-size: 100%;
  max-width: 100%;
  vertical-align: middle;
}
#money {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
#income {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
}
#currentPoints {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
}
.topRowIcons {
  max-width: 100%;
  margin-top: 0.2em;
}
#chest {
  max-width: 80%;
}
#money p,
#income p,
#currentPoints p {
  margin: 0%;
  margin-top: 0.3em;
}

#midRow {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
}

.box {
  width: 100%;
  text-align: center;
}
.box > * {
  border-radius: 4px;
}
/* Rutorna i mellersta raden som innehåller bilder/bottles */
.x {
  width: 60%;
  border: 2px solid black;
  margin-top: 10%;
}

#bottomRow {
  display: grid;
  grid-template-columns: 2fr 2fr;
  height: 100%;
}

#skills {
  display: grid;
  grid-template-columns: 1fr 5fr;
  border: 4px solid rgb(59, 165, 59);
  border-radius: 5px;
  margin: 5px;
  padding: 1%;
}

/* En hjälp-div som gör att bilder centresas vertikalt */
.helper {
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}

#skillsImage img {
  max-width: 100%;
  vertical-align: middle;
}

#skillsButton:hover + #skillsInfo {
  display: inline-block;
}

#skillsInfo {
  position: absolute;
  display: none;
  width: 90%;
}
/* Items- och skillsrutorna */
#items {
  display: grid;
  grid-template-columns: 5fr 1fr;
  border: 4px solid rgb(253, 102, 102);
  border-radius: 5px;
  margin: 5px;
  padding: 1%;
}

#itemsRefill {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
}

#skillsRefill {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
}

.itemIcons {
  max-width: 100%;
}

.skillsIcons {
  max-width: 100%;
  max-height: 100%;
}

#itemsImage img {
  max-width: 100%;
  vertical-align: middle;
}

/* Korten man har på handen */
#cardRow {
  display: grid;
  grid-template-columns: 1fr 5fr;
  height: 100%;
  margin: 5px;
  border-radius: 5px;
}

#cardRefill {
  overflow-x: scroll;
  white-space: nowrap;
  max-width: 100%;
  border-radius: 5px;
}
#cardRefill::-webkit-scrollbar {
  width: 15px;
  height: 15px;
}
#cardRefill::-webkit-scrollbar-button {
  width: 0px;
  height: 0px;
}
#cardRefill::-webkit-scrollbar-thumb {
  background: #e1e1e1;
  border: 0px none #ffffff;
  border-radius: 50px;
}
#cardRefill::-webkit-scrollbar-thumb:hover {
  background: #ffffff;
}
#cardRefill::-webkit-scrollbar-thumb:active {
  background: #ffffff;
}
#cardRefill::-webkit-scrollbar-track {
  background: #666666;
  border: 0px none #ffffff;
  border-radius: 90px;
}
#cardRefill::-webkit-scrollbar-track:hover {
  background: #666666;
}
#cardRefill::-webkit-scrollbar-track:active {
  background: #333333;
}
#cardRefill::-webkit-scrollbar-corner {
  background: transparent;
}
.cardCont {
  display: inline-block;
  max-width: 25%;
  max-height: 200px;
}
.cardCont > * {
  transform: scale(0.4) translate(-60%, -60%);
  display: inline-block;
  margin: 0;
}

#cardsImage img {
  max-width: 100%;
}
/* Här skriver vi css för mobilversion */
@media screen and (max-width: 850px) {
  #wallet {
    font-size: 3vw;
    text-align: center;
  }

  .topRowIcons {
    vertical-align: middle;
    margin-top: 0.35em;
  }
}
</style>