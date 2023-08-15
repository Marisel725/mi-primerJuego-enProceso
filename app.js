

const PIEDRA = "rock";
const PAPEL = "paper";
const TIJERA = "scissors";

const EMPATE = 0 ;
const GANASTE = 1;
const PIERDES = 2;

let intentos = 0;
let puntajeJugador = 0;
let puntajeMaquina = 0;


//Se declara la variable jugando que se utiliza para evitar que el jugador realice más de una jugada mientras se está procesando la partida actual.
let jugando = false;

const piedraBoton = document.getElementById("PIEDRA");
const papelBoton = document.getElementById("PAPEL");
const tijeraBoton = document.getElementById("TIJERA");
const resultadoEnTexto = document.getElementById("texto-oculto");
const userImg = document.getElementById("user-img");
const machineImg = document.getElementById("machine-img");
const resultado = document.getElementById("resultado");
const jugarDeNuevoButton = document.getElementById("jugar-de-nuevo");
jugarDeNuevoButton.style.display = "none";

piedraBoton.addEventListener("click", () =>{ 
    jugar (PIEDRA);
})

papelBoton.addEventListener("click", () =>{
    jugar (PAPEL);
})

    tijeraBoton.addEventListener("click", () =>{
        jugar (TIJERA);
    })

jugarDeNuevoButton.addEventListener("click", () => {
    jugarDeNuevo ();
});


function iniciarJuego() {
    let nombre = "";
  
    alert("Bienvenido al popular juego de piedra, papel o tijera");
  
    do {
      nombre = prompt("Ingrese su nombre por favor: ");
    } while (!validarNombre(nombre));
  
    nombre = nombre.toUpperCase();
  
    alert("Gracias por jugar, " + nombre + ". ¡Mucha suerte!");
    return nombre;
  }
  
  function validarNombre(nombre) {
    // Expresión regular que verifica si el nombre contiene solo letras y no tiene espacios
    const letrasSinEspaciosRegex = /^[A-Za-z]+$/;
  
    // Verificamos si el nombre tiene al menos 3 caracteres y si cumple la expresión regular
    if (nombre.length >= 3 && letrasSinEspaciosRegex.test(nombre)) {
      return true;
    } else {
      alert("El nombre debe tener solo letras, sin espacios y al menos 3 caracteres.");
      return false;
    }
  }
  const nombreJugador = iniciarJuego();
  
//La función jugar(opcionDelUsuario) se ejecuta cuando el jugador selecciona una opción. 
//Primero, comprueba si ya se está procesando una partida (jugando es verdadero) y, en ese caso, sale de la función sin hacer nada más.
//Luego, establece jugando en verdadero para evitar que el jugador realice más jugadas mientras se está procesando la partida actual. 
//Luego, muestra la selección del jugador actualizando la imagen userImg.src.
//Establece el mensaje "Eligiendo..." en el elemento resultadoEnTexto mientras la máquina hace su elección. 
//Utiliza un intervalo de 200 milisegundos para mostrar cambios aleatorios en la imagen de la máquina a través de la función machineOpcionCalcular().
//Después de 2000 milisegundos (2 segundos), se detiene el intervalo y se obtiene la opción de la máquina. 
//Luego, se calcula el resultado del juego utilizando la función calcularResultado() y se actualiza la imagen de la máquina con la opción seleccionada.

function jugar (opcionDelUsuario) {
    if(jugando) return;

    jugando = true;


    userImg.src= "imgJuego/" + opcionDelUsuario + ".svg";

    resultadoEnTexto.innerHTML = "Eligiendo...";

    const intervalo = setInterval(function(){ 

        const opcionMaquina = machineOpcionCalcular();

        machineImg.src= "imgJuego/" + opcionMaquina + ".svg";
    }, 200);
    
    setTimeout(function(){

        clearInterval(intervalo)

        const opcionMaquina = machineOpcionCalcular();
        const resultado = calcularResultado(opcionDelUsuario,opcionMaquina);
    
        
        machineImg.src= "imgJuego/" + opcionMaquina + ".svg";
        
    
        switch(resultado){
            case EMPATE:
                resultadoEnTexto.innerHTML= "¡Ups! empataste."
             break;
            case GANASTE:
                resultadoEnTexto.innerHTML= "Muy bien! GANASTE "
                puntajeJugador++;
             break;
            case PIERDES:
                resultadoEnTexto.innerHTML= "Lo siento! perdiste"
                puntajeMaquina++;
                break;
        }

        intentos++;
//Esta instrucción es una forma abreviada de incrementar el valor de la variable intentos en 1.
//La variable intentos se utiliza para llevar la cuenta de cuántas partidas ha jugado el jugador. 
//Cada vez que el jugador hace una jugada (selecciona piedra, papel o tijera)
//se incrementa el valor de intentos en 1 para contar esa partida como un intento jugado.
        
        if (intentos === 3) {
            piedraBoton.disabled = true;
            papelBoton.disabled = true;
            tijeraBoton.disabled = true;
            mostrarGanador();
            finalizarJuego();
            
            intentos = 0;
            puntajeJugador = 0;
            puntajeMaquina = 0;
    
            }
        
        jugando = false;

    }, 2000);

    
}
//La función machineOpcionCalcular() 
//se utiliza para obtener una opción aleatoria para la máquina (piedra, papel o tijera) mediante el uso de Math.random() y Math.floor().
function machineOpcionCalcular (){
    const num = Math.floor(Math.random()*3)
    switch(num){
        case 0:
            return PIEDRA;
        case 1:
            return PAPEL;
        case 2:
            return TIJERA;
    }
    
}

//La función calcularResultado(opcionDelUsuario, opcionMaquina) 
//compara las opciones del jugador y la máquina para determinar el resultado del juego (empate, ganó el jugador o ganó la máquina) 
//y devuelve el resultado correspondiente.
function calcularResultado(opcionDelUsuario,opcionMaquina){

    if (opcionDelUsuario === opcionMaquina) {
        return EMPATE;
        
    }
    else if (opcionDelUsuario === PIEDRA ){
        if (opcionMaquina === PAPEL) return PIERDES ;
        if (opcionMaquina === TIJERA) return GANASTE ;
            
        }
        else if (opcionDelUsuario === PAPEL ){
            if (opcionMaquina === TIJERA) return PIERDES ;
            if (opcionMaquina === PIEDRA) return GANASTE;
                
        }
            else if (opcionDelUsuario === TIJERA ){
                if (opcionMaquina === PIEDRA) return PIERDES ;
                if (opcionMaquina === PAPEL) return GANASTE;
                    
        }
   
    }

    function mostrarGanador() {
        if (puntajeJugador > puntajeMaquina) {
          resultadoEnTexto.innerHTML = "¡Felicidades! Ganaste la partida";
          userImg.style.background = "green"
          userImg.style.borderRadius ="50%"
          machineImg.style.background= "red"
          machineImg.style.borderRadius = "50%"
        } else if (puntajeMaquina > puntajeJugador) {
          resultadoEnTexto.innerHTML = "¡Ups! Perdiste la partida"
          userImg.style.background= "red",
          userImg.style.borderRadius="50%"
          machineImg.style.background="green"
          machineImg.style.borderRadius = "50%"; 
        } else (puntajeJugador === puntajeMaquina)
          resultadoEnTexto.innerHTML = "La partida terminó en empate";
          userImg.style.background="none"
          machineImg.style.background="none"
        

        
        }

        function finalizarJuego() {
        
            const jugarDeNuevoButton = document.getElementById("jugar-de-nuevo");
            jugarDeNuevoButton.style.display = "block";
        
            
             }
        

function jugarDeNuevo() {
    piedraBoton.disabled = false;
    papelBoton.disabled = false;
    tijeraBoton.disabled = false;

    intentos = 0;
    puntajeJugador = 0;
    puntajeMaquina = 0;
    
    const jugarDeNuevoButton = document.getElementById("jugar-de-nuevo");
    jugarDeNuevoButton.style.display = "none";

    resultadoEnTexto.innerHTML = "";
    userImg.src = "imgJuego/rock.svg";
    machineImg.src = "imgJuego/rock.svg";

    userImg.style.background = "none";
    machineImg.style.background = "none";
    userImg.style.borderRadius = "0";
    machineImg.style.borderRadius = "0";
}






      

    

    

      

        

