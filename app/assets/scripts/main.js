var App = function(){

  var self = this;
  var SlideOut;
  var Data = [];
  var currPage = 0;
  var perPage = 4;
  
  var initSlideOut = function(){


    SlideOut = new Slideout({
      'panel': document.getElementById('content'),
      'menu': document.getElementById('sidemenu'),
      'padding': 256,
      'tolerance': 70,
      'touch': false
    });

    $('#sidemenu-toggle').on('click', function(){
      SlideOut.toggle();
    });

    console.log('SlideOut started', SlideOut);
  };

  var initSegmentButtons = function(){
    $('.segment-bar a').on('click', function(e){
      $('.segment-bar li').removeClass('active');
      $(this).parent().addClass('active');

      $("#cssload-pgloading").removeClass("hide");
      $('#shelf-wrapper-list').html('');
      setTimeout(function(){
        App.startInfiniteScroll();
        $("#cssload-pgloading").addClass("hide");
      }, 1500);
    });
  };

  var loadJsonData = function(){
    $.getJSON('/assets/scripts/bennu.json', function() {
      console.log('json loaded');
    })
    .done(function(data){
      self.Data = data.data;
      console.log('json done', self.Data);

      var screenWidth = $(window).outerWidth();

      if(screenWidth > 320 && screenWidth <= 768)
        self.perPage = 9;

      if(screenWidth > 768)
        self.perPage = self.Data.length;

      App.startInfiniteScroll();
    })
    .fail(function(error){
      console.log('json fail', error);
    })
    .always(function(data){
      console.log('always complete');
    });
  };

  var paginate = function(items, page, perPage){
    console.log('paginate', items);
    var start = perPage * page;
    return items.slice(start, start + perPage);
  };

  return {


    noMoreItensToShow: function(){

      $('.no-more-items').removeClass('hide');
    },

    renderShelf: function(pageItems){
      console.log('renderShelf', pageItems);
      tmpltSrc = $('#card-template').html();
      template = Handlebars.compile(tmpltSrc);

      if(!pageItems.length){
        App.noMoreItensToShow();
      }

      var _remapData = _.map(pageItems, function(item){
        return {
          id: item.id,
          imageSrc: item.imagem,
          title: item.titulo,
          description: item.descricao
        }
      });

      for(i = 0; i < _remapData.length; i++){
        $('#shelf-wrapper-list').append(template(_remapData[i]));
      }



    },

    prepareShelf: function(dataArray) {
      console.log('preparando prateleira');
      tmpltSrc = $('#card-template').html();
      template = Handlebars.compile(tmpltSrc);


      var _remapData = _.map(dataArray, function(item){
        return {
          id: item.id,
          imageSrc: item.imagem,
          title: item.titulo,
          description: item.descricao
        }
      });

      self.startItems = self.startItems || 0;
      self.endItems = self.endItems || 4;


      console.log('self.startItems', self.startItems);
      console.log('self.endItems', self.endItems);

      var _remapData = _.slice(_remapData, self.startItems, self.endItems);
      
      self.startItems = self.startItems + self.endItems;

      for(i = 0; i < _remapData.length; i++){
        $('#shelf-wrapper-list').append(template(_remapData[i]));
        //console.log('html', template(_remapData[i]));
      }

      $('.heart-button, .share-button').on('click', function(){
        $(this).toggleClass('active');
      });
    },


    observeContentScroll: function(){

      var prev = 0;
      var $window = $('.shelf');
      var nav = $('.segment-bar');

      $window.on('scroll', function(){
        
        var scrollTop = $window.scrollTop();
        nav.toggleClass('hidden', scrollTop > prev);
        prev = scrollTop;

      });

    },

    startInfiniteScroll: function(){
      var win = $('.shelf');
      var page = 0;

      console.log('agora', self.Data);
      $('#shelf-wrapper-list').html('');
      $('.no-more-items').addClass('hide');
      
      App.renderShelf(paginate(self.Data, page, self.perPage));

      $('.shelf').on('scroll', function() {
        console.log('on scroll');
          if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
              page++;
              $("#cssload-pgloading").removeClass("hide");
              setTimeout(function(){
                App.renderShelf(paginate(self.Data, page, self.perPage));
                $("#cssload-pgloading").addClass("hide");
              }, 1500);
          }
      });

    },

    init: function(){
      console.log('App started');
      initSlideOut();
      initSegmentButtons();
      loadJsonData();

      $(window).on('resize', function(){
        var screenWidth = $(window).outerWidth();
        if(screenWidth > 320 && screenWidth < 768)
          self.perPage = 6;
  
        if(screenWidth > 768)
          self.perPage = self.Data.length;
  
        App.startInfiniteScroll();
      });


      $('.menu-list a').on('click', function(){
        $('.menu-list li').removeClass('active');
        $(this).parent().addClass('active');
        $("#cssload-pgloading").removeClass("hide");
        setTimeout(function() {
          $("#cssload-pgloading").addClass("hide");
          $('#sidemenu-toggle').trigger('click');  
        }, 300);
      });
    }
  }
}();