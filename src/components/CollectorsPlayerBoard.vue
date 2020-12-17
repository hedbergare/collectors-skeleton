<template>
  <div id="wrapper" :style="'background-color:' + player.color">
    <!-- Här läggs det in vilken färg man "är" -->
    <!-- Översta raden - där det visas hur mycket pengar, poäng och income man har och chest -->
    <div id="topRow">
      <img id="chest" src="images/player_board/treasure.PNG" />
      <div class="secretPopup" v-if="playerId == player.pId">
        <CollectorsCard
          v-for="(card, index) in player.secret"
          :key="index"
          :card="card"
        />
      </div>
      <div id="wallet">
        <div id="money">
          <div class="helper_wrapper">
            <span class="helper"></span>
            <img src="images/player_board/current_money.png" />
          </div>
          <p>{{ player.money }}</p>
        </div>

        <div id="income">
          <div>
            <span class="helper"></span>
            <img src="images/player_board/passive_income.png" />
          </div>
          <p>{{player.passiveIncome}}</p>
        </div>

        <div id="currentPoints">
          <div>
            <img src="images/player_board/score.png" />
          </div>
          <p>{{ player.points }}</p>
        </div>
      </div>
    </div>

    <!-- Mellersta raden, där ens "bottles" ska ligga -->
    <div id="midRow">
      <div class="box">
        <CollectorsBottle v-if="player.bottles > 0" :color="player.color" />
        <img v-else class="x bottle" src="images/player_board/bottle.JPG" />
      </div>
      <div class="box">
        <CollectorsBottle v-if="player.bottles > 1" :color="player.color" />
        <img v-else class="x bottle" src="images/player_board/bottle.JPG" />
      </div>
      <div class="box">
        <CollectorsBottle v-if="player.bottles > 2" :color="player.color" />
        <img v-else class="x addCard" src="images/player_board/add_card.JPG" />
      </div>
      <div class="box">
        <CollectorsBottle v-if="player.bottles > 3" :color="player.color" />
        <img
          v-else
          class="x oneDollar"
          src="images/player_board/1_dollar.JPG"
        />
      </div>
      <div class="box">
        <CollectorsBottle v-if="player.bottles > 4" :color="player.color" />
        <img
          v-else
          class="x twoDollar"
          src="images/player_board/2_dollar.JPG"
        />
      </div>
    </div>

    <!-- Understa raden -->
    <div id="bottomRow">
      <div id="skills">
        <div id="skillsImage">
          <span class="helper"></span>
          <img id="skillsButton" src="images/buySkillPic/Skillsbutton.png/" />
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

      <div id="items">
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
    <div id="cardRow">
      <div id="cardsImage">
        <span class="helper"></span>
        <img src="images/player_board/card_hand.png" />
      </div>
      <div id="cardRefill" v-if="playerId == player.pId">
        <CollectorsCard
          v-for="(card, index) in player.hand"
          :key="index"
          :card="card"
          :availableAction="card.available"
          @doAction="handleAction(card)"
        />
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
  props: {
    player: Object,
  },
  computed: {
    playerId: function () {
      return this.$store.state.playerId;
    },
  },
  methods: {
    handleAction: function (card) {
      this.$emit("handleAction", card);
    },
  },
};
</script>
<style scoped>
#wrapper {
  display: grid;
  border: 3px solid black;
  position: relative;
  height: 100%;
  grid-template-rows:auto 1fr 1.25fr auto;
}

#topRow {
  grid-row: 1;
}

/* Hover och style för treasure */
#chest {
  width: 7%;
}

#chest:hover + .secretPopup {
  display: inline-block;
  position: absolute;
}

.secretPopup {
  display: none;
  position: absolute;
  transform: scale(0.5);
  width: 100%;
}

#wallet {
  width: 20%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  float: right;
  font-size: 100%;
}

#money {
  display: grid;
  grid-template-columns: 2fr 1fr;
}

#income {
  display: grid;
  grid-template-columns: 2fr 1fr;
  width: 100%;
}

#currentPoints {
  display: grid;
  grid-template-columns: 2fr 1fr;
  width: 100%;
}

#money p,
#income p,
#currentPoints p {
  margin: 0%;
  margin-top: 0.3em;
  font-size: 140%;
}
#money img,
#income img,
#currentPoints img {
  max-width: 100%;
  vertical-align: middle;
}

#midRow {
  grid-row: 2;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  height: 10%;
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

/*  */
#bottomRow {
  grid-row: 3;
  display: grid;
  grid-template-columns: 2fr 2fr;
  height: 100%;
}

#skills {
  display: grid;
  grid-template-columns: 1fr 5fr;
  border: 2px dashed black;
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
  border: 2px dashed black;
  /* height: 30vh; */
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
}

#cardRefill {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(auto-fill, 130px);
  /*   grid-template-rows: repeat(auto-fill, 130px); */
}
#cardRefill > * {
  transform: scale(0.4) translate(-60%, -60%);
}

#cardsImage img {
  max-width: 100%;
}
</style>