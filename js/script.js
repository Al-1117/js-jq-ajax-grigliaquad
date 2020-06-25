// CONSEGNA
// Griglia 6x6, ad ogni click parte una richiesta AJAX che prende un numero random da 1 a 9.
// Se è <= 5 il quadrato diventa giallo, se è > di 5 il quadrato diventa verde.
 // Il numero ottenuto appare al centro del quadrato


// EFFETTUO LA CHIAMATA AJAX PER PRENDERE I NUMERI CASUALI DAL SEVER DI BOOLEAN

$(document).ready(function(){

  var chiamataAjax = $.ajax(

    // Inserisco i dati del server da cui fare la chiamata per AJAX
    {
      url: "https://flynn.boolean.careers/exercises/api/random/int",
      method: 'GET',
      success: function(numero){
        var numeroCasuale = numero.response;
        console.log(numeroCasuale);

        // IN CASO DI RICHIESTA ANDATA A BUON FINE:
        // Creo l'evento per il click su ogni quadrato della griglia
        $(document).on('click', '.square',
          function(){

            // Inserisco il numero nel quadrato

            $(this).children('h2').text(numeroCasuale);

            // Se il numero generato è minore o uguale a 5, avrà la lo sfondo giallo

            if (numeroCasuale <= 5) {

              $(this).addClass('yellow');

              // Altrimenti, avrà lo sfondo verde
            } else {

              $(this).addClass('green');

            }
            
          }

        );
      },

      // IN CASO DI ERRORE:
      error: function (richiesta, stato, errore){
        // Visualizzo un messaggio di avviso
        alert('Qualcosa è andato storto ') + errore;
      }

    }

  );

});
