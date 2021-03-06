
var counter:number = 0;
var link:string;
var arrayTypes:string[] = [];
var moveset:string[] = [];
var stats:string[] = [];
var statsName:string[] = [];

function output(id:string, out:string):void{
  (<HTMLDivElement> document.getElementById(id)).innerHTML = out;
}

function outputMultipli(id:string, out:string):void{
  (<HTMLDivElement> document.getElementById(id)).innerHTML = "";
  (<HTMLDivElement> document.getElementById(id)).innerHTML += out;
}

function switchPkmnFwd(){
  counter++;
  link = 'https://pokeapi.co/api/v2/pokemon/' + counter;
  dataBind(link);
}
function switchPkmnBck(){
  if(counter > 0){
    counter--;
  }
  link = 'https://pokeapi.co/api/v2/pokemon/' + counter;
  dataBind(link);
}

function dataBind(link:string):void{
  fetch(link)
  .then(response => response.json())
  .then(data => {
    output("text", data.name.charAt(0).toUpperCase() + data.name.slice(1));
    output("img", '<img src="'+ data.sprites.front_default + '" width="200" height="200">');
    for(var i = 0; i<2; i++)
    {
      arrayTypes[i] = "";
      if(data.types[i] != undefined)
      {
        arrayTypes[i] = data.types[i].type.name;
        outputMultipli("showTypes"+ i, arrayTypes[i]);
      }
      else if(data.types[i] == undefined)
      {
        arrayTypes[i] = "";
      }
    }
    for(var i = 0; i < data.moves.length; i++){
      moveset[i] = data.moves[i].move.name;
    }
    for(var i = 0; i < 4; i++){
      output("moveset"+ i,moveset[Math.floor(Math.random() * data.moves.length)]);
    }
    document.getElementById("showTypes0").setAttribute("style", "background-color :" + colorPicking(arrayTypes[0]));
    document.getElementById("showTypes1").setAttribute("style", "background-color :" + colorPicking(arrayTypes[1]));
    document.getElementById("moveset").setAttribute("style", "color: black");
    document.getElementById("stats").setAttribute("style", "color: black");

    stats[0] = data.stats[1].base_stat;
    stats[1] = data.stats[2].base_stat;
    stats[2] = data.stats[5].base_stat;
    statsName[0] = data.stats[1].stat.name;
    statsName[1] = data.stats[2].stat.name;
    statsName[2] = data.stats[5].stat.name;

     for(var i = 0; i<3; i++)
      {
       output("stats"+i, statsName[i] + ": " + stats[i]);
      }
    const carta = document.querySelector('.cartaInterna');
      carta.addEventListener('click', function (){
        carta.classList.toggle('is_Flipped');
    })

    output("description", checkBetterStat(stats));

  });
}

function checkBetterStat(statistics):string
{
    if(Number(statistics[0]) > Number(statistics[1]) && Number(statistics[0]) > Number(statistics[2]))
    {
      return "Questo pokemon ?? un pokemon principalmente offensivo, la sua statistica pi?? alta ?? l'attacco";
    }
    else if(Number(statistics[1]) > Number(statistics[2]) && Number(statistics[1]) > Number(statistics[2]))
    {
      return "Questo pokemon ?? un pokemon principalmente difensivo, la sua statistica pi?? alta ?? la difesa";
    }
    else if(Number(statistics[2]) > Number(statistics[0]) && Number(statistics[2]) > Number(statistics[1]))
    {
      return "Questo pokemon ?? un pokemon principalmente elusivo, la sua statistica pi?? alta ?? la velocit??";
    }
}

function colorPicking(type):string
{
  switch (type) {
    case 'bug':
      return "#26de81";
      break;
    case 'dragon':
      return "#ffeaa7";
      break;
    case 'electric':
      return "#fed330";
      break;
    case 'fairy':
      return "#FF0069";
      break;
    case 'fighting':
      return "#30336b";
      break;
    case 'fire':
      return "#f0932b";
      break;
    case 'flying':
      return "#81ecec";
      break;
    case 'grass':
      return "#00b894";
      break;
    case 'ground':
      return "#EFB549";
      break;
    case 'ghost':
      return "#a55eea";
      break;
    case 'ice':
      return "#74b9ff";
      break;
    case 'normal':
      return "#95afc0";
      break;
    case 'poison':
      return "#6c5ce7";
      break;
    case 'psychic':
      return "#a29bfe";
      break;
    case 'rock':
      return "#2d3436";
      break;
    case 'water':
      return "#0190FF";
      break;
    default:
      break;
  }
}