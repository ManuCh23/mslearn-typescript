//ESERCIZIO - Inferenza di tipo

let x: number; //espllicitamente dichiaro x di tipo numero

let y = 1; //implicitamente dichiaro y di tipo numero

let z; //dichiaro z senza inizializzarla

y.toFixed(2); //se provo accedere ai metodi di y tramite la notazione puntata IntelliSense mi suggerisce i metodi dei number nonostante y non sia dichiarata esplicitamente come number

z = 1; //vengono accettati entrambi perche queste dichiarazioni funzionano allo stesso modo di javascript, ora z puo accettare qualsiasi valore assegnato
z = "one"; //typescript ha dedotto che z e di tipo, perche non e stato assegnato il tipo any

//TIPI PRIMITIVI

//Booleani
let flag: boolean;
let yes = true;
let no = false;

//Number e BigInteger
let n1: number;
let n2 = 0;
//let big:bigint = 100n;//numero troppo grande per essere rappresentato da tipo number
//typescript supporta anche esadecimali, ottali e binari

//String
let s: string;
let empty = "";
let abc = "abc";

//Template string
let firstName: string = "Mateo";
let sentence: string = `My name is ${firstName}.
    I am new to TypeScript.`;
console.log(sentence);

/*Tipo Void, Null e Undefined

Null = valore primitivo usato per segnalare valore assente 
Undefined = valore primitivo usato per segnalare valore non inizializzato
Void = serve esclusivamente nelle funzioni per segnalare che non ritorna niente 

*/

/*Enum

Nome simbolico per set di costanti correlate
Consentono di specificare un elenco di opzioni disponibili

*/
//esempio se abbiamo un campo del database che si chiama ContractStatus che contiene i numeri 1, 2 o 3, che rappresentano gli stati del contratto:Permanent, Temp e Apprentice
enum ContractStatus {
  Permanent,
  Temp,
  Apprentice,
}

let employeeStatus: ContractStatus = ContractStatus.Temp; //stampa 1 perche enum partono da 0(zero)
console.log(employeeStatus); // 1
console.log(ContractStatus[employeeStatus]); // Temp

/*modifica per far partire l'enum da 1
enum ContractStatus {
    Permanent = 1,
    Temp,
    Apprentice
}
*/

//Tipo Any e Unknown

//Any-> rappresenta qualsiasi valore javascript

let randomValue: any = 10;
randomValue = "Mateo";
randomValue = true;

console.log(randomValue.name); //undefined N.B. nonostante randomValue non abbia la proprieta name, l'editor non da errore
//randomValue(); // "randomValue is not a function"
//randomValue.toUpperCase(); //"randomValue is not a function"

//Unknown-> simile ad any puo rappresentare qualsiasi valore, tuttavia le proprieta di tipo Unknown non si possono accedere ne chiamarle ne crearle

let randomValue1: unknown = 10;
randomValue1 = true;
randomValue = "Mateo";

//console.log(randomValue1.name); questa volta l'accesso alla proprieta name da errore nel editor //Error: Object is of type unknown
//randomValue1();                                                                                 //Error: Object is of type unknown
randomValue.toUpperCase(); //Error: Object is of type unknown

/*ASSERZIONE TIPO
Ha due sintassi:

-1 (randomValue as string).toUpperCase //sintassi da preferire

-2 (<string>randomValue).toUpperCase

L'esempio seguente esegue controllo per determinare che variabile rValue sia di tipo string prima di usare l'asserzione del tipo per chiamare metodo toUpperCase
*/

let rValue: unknown = 10;

rValue = true;
rValue = "Mateo";

if (typeof rValue === "string") {
  console.log((rValue as string).toUpperCase()); //senza asserzione di tipo non si poteva accedere al metodo toUpperCase()
} else {
  console.log("Error - A string was expected here.");
}
//altro esempio
// siccome document.getElementById() ritorna un valore di tipo HTMLElement che non ha la proprieta .value,
//HtMLInputElement ha la prorprieta value ed e una classe figlia di HTMLElement

//const myInp:HTMLInputElement = <HTMLInputElement>document.getElementById('myInp);
//const myInp:HTMLInputElement = document.getElementById('myInp') as HTMLInputElement;

const myInp:HTMLInputElement = document.getElementById("myInput") as HTMLInputElement; //con l'asserzione di tipo dico al compilatore che so in anticipo il tipo del dato ritornato

console.log(myInp.value); //in pratica senza asserzione di tipo mi averbbe ritornato HTMLElement anzi che la classe figlia HTMLInputElement

const guardClause = (val:unknown): void => {
  if (Array.isArray(val)) {
    console.log("array");
  }
  switch (typeof val) {
    case "string":
      console.log(typeof val);
    case "number":
      console.log(typeof val);
    case "boolean":
      console.log(typeof val);
    case "undefined":
      console.log(typeof val);
    case "function":
      console.log(typeof val);
      default:
      console.log("non si sa il tipo della variabile");
  }
};

let str:string = "Sono una stringa!";

guardClause(str);