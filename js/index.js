class Transaction {
  constructor(Mode, Navn, Koebspris, Salgspris, Antal){
    this.Mode = Mode;
    this.Navn = Navn;
    this.Koebspris = Koebspris;
    this.Salgspris = Salgspris; 
    this.Antal = Antal; 
  }
  setSaldo(Saldo){
    this.Saldo = Saldo; 
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



      IndexChosen: 0,
      SelectedAmount: 1,
      MaxStocks: 200,
      TransactionMode: null, 
      TransaktionsView: 'Alle',
      TransaktionsNavneFilter: 'Alle',
      Transaktioner: [],
      Portfolie: new Map(),

    }
  },
  methods: {
    ProcessTransaction(){
      t = new Transaction(this.TransactionMode, this.Aktier[this.IndexChosen].Navn, this.Aktier[this.IndexChosen].Koebspris,
        this.Aktier[this.IndexChosen].Salgspris, this.SelectedAmount); 
        if (!this.Portfolie.has('Saldo')){
          this.Portfolie.set('Saldo',10000); 
        }
        
        if (this.TransactionMode == 'Køb'){ 
          this.Aktier[this.IndexChosen].Antal -= this.SelectedAmount; 
          // Hvivs der købes og nøgle ikke findes
          if (!this.Portfolie.has(this.Aktier[this.IndexChosen].Navn)){
            this.Portfolie.set(this.Aktier[this.IndexChosen].Navn, this.SelectedAmount);
            this.Portfolie.set('Saldo', this.Portfolie.get('Saldo') - this.Aktier[this.IndexChosen].Koebspris * this.SelectedAmount);
          } 
          else { // Hvis der købes og nøgle findes
            this.Portfolie.set(this.Aktier[this.IndexChosen].Navn, this.SelectedAmount + this.Portfolie.get(this.Aktier[this.IndexChosen].Navn));
            this.Portfolie.set('Saldo', this.Portfolie.get('Saldo') - this.Aktier[this.IndexChosen].Koebspris * this.SelectedAmount);
          }
        } 
        else { // Hvis der sælges fra eget portfølje
          this.Aktier[this.IndexChosen].Antal += this.SelectedAmount;
          this.Portfolie.set(this.Aktier[this.IndexChosen].Navn, this.Portfolie.get(this.Aktier[this.IndexChosen].Navn) - this.SelectedAmount);
          this.Portfolie.set('Saldo', this.Portfolie.get('Saldo') + this.Aktier[this.IndexChosen].Salgspris * this.SelectedAmount);
          this.AddToLifetime(this.Aktier[this.IndexChosen].Salgspris * this.SelectedAmount);
        } 

      t.setSaldo(this.Portfolie.get('Saldo'));
      this.Transaktioner.push(t);
      
      
    },

    AddToLifetime(money){
      console.log(money);
      if (!this.Portfolie.has('LifetimeIncome')){
        this.Portfolie.set("LifetimeIncome", money); 
      } else {
        this.Portfolie.set('LifetimeIncome', this.Portfolie.get('LifetimeIncome') + money); 
      }
    },

    TransactionClass(index){
      if (Vue.toRaw(this.TransaktionerFiltreret[index].Mode) == 'Køb') return 'buyTransactionClass'; 
      return 'saleTransactionClass';  
    },
    CanSell(index){
      if (!this.Portfolie.has('Saldo')){
        this.Portfolie.set('Saldo',10000); 
      }
      return !(Vue.toRaw(this.Portfolie).has(this.Aktier[index].Navn) && this.Portfolie.get(this.Aktier[index].Navn) > 0); 
    },
    CanBuy(index){
      if (!this.Portfolie.has('Saldo')){
        this.Portfolie.set('Saldo',10000); 
      }

      
      return !(this.Portfolie.get('Saldo') >= this.Aktier[index].Koebspris * this.SelectedAmount && this.SelectedAmount > 0)
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
    TotalSkat() {
      if (!this.Portfolie.has('LifetimeIncome')) return 0; 
      if (this.Portfolie.get('LifetimeIncome') <= 67000) return 0.27* this.Portfolie.get('LifetimeIncome'); 
      
      const money = this.Portfolie.get('LifetimeIncome'); 
      const highTax = (money - 67000)*0.42; 
      const lowTax = 0.27*67000; 
      return lowTax + highTax; 
      
    },
    SetAfNavne() {
      const a = this.Transaktioner;
      let setToReturn = new Set(); 
      for (let index = 0; index < a.length; index++) {
        let element = a[index].Navn
        setToReturn.add(element); 
      }
      return setToReturn; 
    },

    TransaktionerFiltreret() {
      if (this.TransaktionsNavneFilter == "Alle") return this.Transaktioner; 

      const beforeCollection = collect(this.Transaktioner);
      const filtered = Vue.toRaw(beforeCollection).where('Navn', this.TransaktionsNavneFilter);
      return filtered.all();
    }
    
  },
})

app.mount('#app')