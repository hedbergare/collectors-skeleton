<template>
  <div id="wrapper" :style="'background-color:' + player.color"><!-- Här läggs det in vilken färg man "är" -->
    <!-- Översta raden - där det visas hur mycket pengar och income man har -->
    <div id="topRow">
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
          <p>5</p>
        </div>
      </div>
    </div>
    <!-- Mellersta raden, där ens "bottles" ska ligga -->
    <div id="midRow">
      <div class="box">
        <img class="x bottle" src="images/player_board/bottle.JPG" />
      </div>
      <div class="box">
        <img class="x bottle" src="images/player_board/bottle.JPG" />
      </div>
      <div class="box">
        <img class="x addCard" src="images/player_board/add_card.JPG" />
      </div>
      <div class="box">
        <img class="x oneDollar" src="images/player_board/1_dollar.JPG" />
      </div>
      <div class="box">
        <img class="x twoDollar" src="images/player_board/2_dollar.JPG" />
      </div>
    </div>
    <!-- Understa raden -->
    <div id="bottomRow">
      <div id="skills">
        <div id="skillsImage">
          <span class="helper"></span>
          <img id="skillsButton" src="images/player_board/skills_clear.png" />
          <img id="skillsInfo" src="images/player_board/skills_info.PNG" />
        </div>
        <!-- Här skapas bilder för de skills som man äger -->
        <div id="skillsRefill">
          <div v-for="(card, index) in player.skills" :key="index">
            <img
              class="skillsIcons"
              :src="'images/skill_logos/' + card.skill + '_skill.png'"
            />
          </div>
        </div>
      </div>
      <div id="hand">
        <div id="cards">
          <div id="cardsImage">
            <img src="images/player_board/card_hand.png" />
          </div>
          <!-- Det som kommer upp när man hoverar - Ingen annan än en själv får se korten på handen -->
          <div class="handPopup" v-if="playerId == player.pId">
            <CollectorsCard
              v-for="(card, index) in player.hand"
              :key="index"
              :card="card"
              :availableAction="card.available"
            />
          </div>
        </div>
        <div id="secret">
          <img src="images/player_board/treasure.PNG" />
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
  </div>
</template>

<script>
import CollectorsCard from "@/components/CollectorsCard.vue";

export default {
  name: "CollectorsPlayerBoard",
  components: {
    CollectorsCard,
  },
  props: {
    /* Tar in player som object, så att vi vet  */
    player: Object,
  },
  computed: {
    playerId: function () {
      return this.$store.state.playerId;
    },
  }
};
</script>
<style scoped>
#wrapper {
  width: 40%;
  display: grid;
  border: 3px solid black;
  position: relative;
}

#topRow {
  grid-row: 1;
}

#wallet {
  width: 20%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  float: right;
  font-size: 150%;
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
#money p,
#income p {
  margin: 0;
  margin-top: 0.3em;
}
#money img,
#income img {
  max-width: 80%;
  vertical-align: middle;
}

#midRow {
  grid-row: 2;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
}

.box {
  width: 100%;
  text-align: center;
}

/* Rutorna i mellersta raden som innehåller bilder/bottles */
.x {
  width: 60%;
  max-width: 150px;
  border: 2px solid black;
  margin-top: 10%;
}

#bottomRow {
  grid-row: 3;
  display: grid;
  grid-template-columns: 2fr 1fr 2fr;
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
}
#itemsRefill {
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}

#skillsRefill {
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}

.itemIcons {
  max-width: 100%;
}

.skillsIcons {
  max-width: 100%;
}

#itemsImage img {
  max-width: 100%;
}
/* Hand-ikonen */
#cardsImage {
  text-align: center;
}
#cardsImage img {
  max-width: 100%;
}
#hand {
  display: grid;
  grid-template-rows: 5fr 1fr;
}
.handPopup > *{
  position:relative;
  transform:scale(0.5);
  top:0;
  left:0;
  
}
#cardsImage:hover + .handPopup{
  display:grid;
  position:absolute;
  top:0;
  left:0;
}
.handPopup {
  display:none;
  position:absolute;
  grid-template-columns: repeat(auto-fill, 130px);
  grid-template-rows: repeat(auto-fill, 180px);
  top:0;
  left:0;
  width:100%;
}

/* Secret */
#secret {
  border: solid black;
  text-align: center;
  background-color: #f7d4c4;
}
#secret img {
  max-width: 100%;
}
</style>