$(function(){
    LoadNoticias();
    var counter = 0;

    $(".TabContent").hide();
    $(".TabContent:first").show();

    $(".Tab-Option").click(function() {
        $(".TabContent").hide();
        var TabActive = $('.AppContent').find('.TabContent.TabActive');
        var idActiveTab = $(this).attr("data-tab-pos");
        var elDestino = $('.AppContent').find('.TabContent[data-tab-pos="'+idActiveTab+'"]');
        $(TabActive).removeClass('TabActive');
        $(".Tab-Option").removeClass("Active");

        $(this).addClass("Active");
        $('.AppContent').find('.TabContent[data-tab-pos="'+idActiveTab+'"]').fadeIn().addClass('TabActive');

        var destinyTab = $('.TabActive')[0].classList;
        destinyTab = destinyTab[0];
        $('.'+destinyTab).find('.row').empty();

        counter = 0;
        LoadNoticias();
    });

    // ANIMACAO CAIXA DE BUSCA
    $('.Search-Button').click(function(){
        console.log('teste');
        $(".Search-Box").toggle("slide").css({display:'flex'});
        $('.Search-Input').focus();
    });
    $('.Search-Input').blur(function(){
        $(".Search-Box").toggle("close");
    });

    // MENU
    $('.Menu-Button').click(function(){
        $(".Menu").toggle("slide");
    });
    $('.MenuClose-Button').click(function(){
        $(".Menu").toggle("slide");
    });

    $(window).scroll(function () {
        if ($(window).scrollTop() == $(document).height() - $(window).height() && counter < 2) {
            LoadNoticias();
        }
    });
});


function LoadNoticias() {
    $('.LoaderBox').fadeIn();
    $.getJSON( "/desafio-frontend/bennu.json", function( data ) {
        data = data.data;

        var destinyTab = $('.TabActive')[0].classList;
        destinyTab = destinyTab[0];
        var paginacaoInicio = $('.'+destinyTab).find('.Noticia').length;
        var paginacaoFinal = paginacaoInicio == 0 ? 4 : paginacaoInicio+2;

        for(var i=paginacaoInicio; i<paginacaoFinal; i++){
            console.log(data[0]);
            var html='<div class="col col-xs-6 col-sm-6 col-md-6 col-lg-6">'+
            '<div class="Noticia" data-id="'+data[0].id+'">'+
            '<div class="Noticia-Img"><img src="../imagens/'+data[0].imagem+'" alt="Mamães a Bordo"></div>'+
            '<div class="Noticia-Dados">'+
            '<div class="Noticia-Acoes">'+
            '<div class="Noticia-Categoria">'+data[0].titulo+'</div>'+
            '<div class="Noticia-Gostar" data-status-like="notliked"><i class="fa fa-heart-o"></i></div>'+
            '<div class="Noticia-Compartilhar"><i class="fa fa-share-alt"></i></div>'+
            '</div>'+
            '<div class="Noticia-Titulo">'+data[0].descricao+'</div>'+
            '</div>'+
            '</div>'+
            '</div>';
            $('.'+destinyTab).find('.row').append(html);
            setTimeout(function(){
                $('.LoaderBox').fadeOut();
            },1000);
        }
    });
}
