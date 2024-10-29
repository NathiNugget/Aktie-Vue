const app = Vue.createApp({
  data() {
    return {
      Aktier: [
        {
          Navn: "Maersk",
          Koebspris: 200,
          Salgspris: 210, 
          Antal: 50, 

        },
        {
          Navn: "McDonald's",
          Koebspris: 180,
          Salgspris: 185, 
          Antal: 200, 
          
        },
        {
          Navn: "ToysRUs",
          Koebspris: 200,
          Salgspris: 5, 
          Antal: 10, 
          
        },
        {
          Navn: "Swagster",
          Koebspris: 200,
          Salgspris: 300, 
          Antal: 50, 

        },
      ],
      IndexChosen: -1,
      SelectedAmount: 1,
      MaxStocks: 200,
    }
  },
  methods: {

  },

  computed: {
    SumAfKoeb() {


      return this.Aktier[this.IndexChosen].Koebspris * this.SelectedAmount;
    },
    
  },
})

app.mount('#app')