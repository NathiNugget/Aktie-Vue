class Transaction {
  constructor(Mode, Navn, Koebspris, Salgspris, Antal){
    this.Mode = Mode;
    this.Navn = Navn;
    this.Koebspris = Koebspris;
    this.Salgspris = Salgspris; 
    this.Antal = Antal; 
  }
}

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
      
      isGreen: (this.TransactionMode == "Køb"),
      isRed: this.TransactionMode == "Salg", 



      IndexChosen: -1,
      SelectedAmount: 1,
      MaxStocks: 200,
      TransactionMode: null, 
      
      Transaktioner: []
      
    }
  },
  methods: {
    ProcessTransaction(){
      t = new Transaction(this.TransactionMode, this.Aktier[this.IndexChosen].Navn, this.Aktier[this.IndexChosen].Koebspris,
        this.Aktier[this.IndexChosen].Salgspris, this.SelectedAmount); 
        if (this.TransactionMode == 'Køb') this.Aktier[this.IndexChosen].Antal -= this.SelectedAmount; 
        else this.Aktier[this.IndexChosen].Antal += this.SelectedAmount; 
      this.Transaktioner.push(t);
    },

    TransactionClass(index){
      if (Vue.toRaw(this.Transaktioner[index].Mode) === 'Køb') return 'buyClass'; 
      return 'saleClass';  
    }

  },

  computed: {
    SumAfKoeb() {
      return this.Aktier[this.IndexChosen].Koebspris * this.SelectedAmount;
    },
    ClassForTransaction(){
      if (this.TransactionMode == "Køb") return 'buyClass'; 
      else if (this.TransactionMode == "Salg") return 'saleClass'; 
    },
    
  },
})

app.mount('#app')