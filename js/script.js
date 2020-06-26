// CONSEGNA
// Griglia 6x6, ad ogni click parte una richiesta AJAX che prende un numero random da 1 a 9.
// Se è <= 5 il quadrato diventa giallo, se è > di 5 il quadrato diventa verde.
 // Il numero ottenuto appare al centro del quadrato


$(document).ready(function(){


    // CREO DINAMICAMENTE LA GRIGLIA 6X6 TRAMITE IL TEMPLATE E UN CICLO FOR
    for (var i = 0; i < 36; i++) {
      var source = $('#square_template').html();
      var template = Handlebars.compile(source);
      var context = {};
      var html = template(context);
      $('.container').append(html);
    }



  // EFFETTUO LA CHIAMATA AJAX PER PRENDERE I NUMERI CASUALI DAL SEVER DI BOOLEAN

  // Creo l'evento per il click su ogni quadrato della griglia
  $(document).on('click', '.square',
    function(){

      var thisSquare = $(this);

      var chiamataAjax = $.ajax(
        // Inserisco i dati del server da cui fare la chiamata per AJAX
        {
          url: "https://flynn.boolean.careers/exercises/api/random/int",
          method: 'GET',
          // IN CASO DI RICHIESTA ANDATA A BUON FINE:
          success: function(numero){
            var numeroCasuale = numero.response;
            console.log(numeroCasuale);

              $(thisSquare).removeClass('yellow');
              $(thisSquare).removeClass('green');

            // Inserisco il numero nel quadrato
            thisSquare.children('h2').text(numeroCasuale);
            // Se il numero generato è minore o uguale a 5, avrà la lo sfondo giallo
            if (numeroCasuale <= 5) {
              $(thisSquare).addClass('yellow');
              // Altrimenti, avrà lo sfondo verde
            } else {
              $(thisSquare).addClass('green');
            }
          },
          // IN CASO DI ERRORE:
          error: function (richiesta, stato, errore){
            // Visualizzo un messaggio di avviso
            alert('Qualcosa è andato storto ') + errore;
          }
        }
      );
    }
  );
});
