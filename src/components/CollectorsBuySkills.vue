<template>
  <div>
    <h1>Buy a skill</h1>
    <div class="buy-skills">
      <div v-for="(card, index) in skillsOnSale" :key="index">
        <CollectorsCard
          :card="card"
          :availableAction="card.available"
          @doAction="buySkill(card)"
        />
        {{ skillCost(card) }}
        {{ card.available }}
      </div>
    </div>
    <div>
      <div class="buttons" v-for="(p, index) in placement" :key="index">
        <button
          v-if="p.playerId === null"
          :disabled="cannotAfford(p.cost)"
          @click="placeBottle(p)"
        >
          ${{ p.cost }}
        </button>
        <div v-if="p.playerId !== null">
          {{ p.playerId }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CollectorsCard from "@/components/CollectorsCard.vue";

export default {
  name: "CollectorsBuySkills",
  components: {
    CollectorsCard,
  },
  props: {
    labels: Object,
    player: Object,
    skillsOnSale: Array,
    placement: Array,
  },
  methods: {
    /* Kollar om player har råd med skillsen */
    cannotAfford: function (cost) {
      if (this.player.money < cost) {
        return true;
      } else {
        return false;
      }
    },
    /* Returnerar hur mycket ett skill kostar */
    skillCost: function (card) {
      return this.placement[card];
    },
    placeBottle: function (p) {
      this.$emit("placeBottle", p.cost);
      this.highlightAvailableSkills(p.cost);
    },
    highlightAvailableSkills: function (cost = 100) {
      /* Kollar på skillsen som ligger på brädet */
      for (let i = 0; i < this.skillsOnSale.length; i += 1) {
         
          this.$set(this.skillsOnSale[i], "available", true);
      }
      this.chosenPlacementCost = cost;
      /* Kollar på skillsen som ligger på handen */
      for (let i = 0; i < this.player.hand.length; i += 1) {
          this.$set(this.player.hand[i], "available", true);
        } 
          this.chosenPlacementCost = cost;
        
      },
    buySkill: function (card) {
      console.log(card.available);
      if (card.available) {
        console.log(card.available);
        this.$emit("buySkill", card);

      }
    },
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.buy-skills,
.buttons {
  display: grid;
  grid-template-columns: repeat(auto-fill, 130px);
}
</style>
