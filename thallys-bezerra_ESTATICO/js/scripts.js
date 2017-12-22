$( document ).ready(function() {

    // Ativa e desativa o menu
    $('.menu').click(function(){
        $(this).toggleClass('active');
        $(this).toggleClass('fa-bars , fa-close')
    })

    // Ativa e desativa a busca
    $('.busca').click(function() {
        $('.campo-busca').toggleClass('active');
        $('.campo-busca').focus();
    })

    // Escolhe aba
    $(".tabs a").click(function() {
        $(this).addClass('active');
        $('.tabs a').not(this).removeClass('active');
        var tab = 0;
        var tab = $(this).attr('id');
        $('.' + tab).addClass('active');
        $('.' + tab).siblings().removeClass('active');
    })

    // Chama o Json
    function json(){
        var qtd;
        var retorno;

        // Resgata valores
        json.prototype.resgatarValores = function(){

            // Estrutura o resultado com os 4 primeiros posts
            $.getJSON('js/bennu.json', function(data){
                this.qtd = data.data.length;
                this.retorno = '';

                for (i = 0; i < this.qtd; i++){
                    if (i < 4) {
                        this.retorno += '<article><a href="#"><img src="img/' + data.data[i].imagem + '" alt="" /></a><section><div class="chapeu">' + data.data[i].titulo + '</div><a class="fa fa-heart-o"></a><a class="fa fa-share-alt"></a><h3><a href="#">' + data.data[i].descricao + '</a></h3></section></article>'
                    }
                }
                
                $('#json-file').html(this.retorno);
            });

        }

    }

    // Objeto
    var obj = new json();
    obj.resgatarValores();

});

// Timer para execucao do loader e geracao dos posts atraves do scroll
var timerPosts;
$(window).scroll(function() {
    if($(window).scrollTop() + $(window).height() == $(document).height()) {
        $('.loader').addClass('active');
        if(timerPosts) {
            window.clearTimeout(timerPosts);
        }
        timerPosts = window.setTimeout(function() {
            javascript:alert_once();
            $('.loader').addClass('inactive');
        }, 500);
    }
});

// Gera posts somente uma vez
function run_once(f) {
var done = false;
return function() {
    if(!done) {
    done = true;
    return f.apply(this, arguments);
    }
};   
}

var alert_once = run_once(function() {
    
    // Chama o Json
    function json(){
        var qtd;
        var retorno;

        // Resgata valores
        json.prototype.resgatarValores = function(){

            // Estrutura o resultado a partir do post 4
            $.getJSON('js/bennu.json', function(data){
                this.qtd = data.data.length;
                this.retorno = '';

                for (i = 0; i < this.qtd; i++){
                    this.retorno += '<article><a href="#"><img src="img/' + data.data[i].imagem + '" alt="" /></a><section><div class="chapeu">' + data.data[i].titulo + '</div><a class="fa fa-heart-o" onclick="heart()"></a><a class="fa fa-share-alt"></a><h3><a href="#">' + data.data[i].descricao + '</a></h3></section></article>'
                }
                
                $('#json-file').html(this.retorno);
            });

        } 

    }

    // Objeto
    var obj = new json();
    obj.resgatarValores(); 

});