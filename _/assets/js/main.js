(function() {
	//	ONLOAD
	$(window).scrollTop(0);
	var position = $(window).scrollTop();

	$(document).ready(function(){
		// READY
		var counter = 0;
		var size = 0;

		function loadData(a,b) {
			// $(".loader").removeClass("hidden");
			// console.log("Coundter: "+counter);
			
			$.getJSON("assets/js/bennu.json", function(data){
				// console.log(data);
				size = Object.keys(data.data).length;
				// console.log("Length: "+ Object.keys(data.data).length);
				
					$.each(data.data.slice(a,b), function(i, data){
						
						// console.log(data.id);

						var title = data.titulo.toString().replace("dolor sit amet", "dot");
						
						var card = "<div id='"+data.id+"' class='card alfa0'><img src='assets/img/"+data.imagem+"'><div class='info row gutters'><div class='links cf'><div class='col grid10'><small>"+title+"</small></div><div class='col grid1'><a href='#' class='fa fa-heart-o heart'></a></div><div class='col grid1'><a href='#' class='fa fa-share-alt share'></a></div></div><p class='desc'>"+data.descricao+"</p></div></div>";
						
							$(card).appendTo(".cards");
						
						counter++;
						// console.log("Coundter: "+counter);
						
						$(".loader").addClass("hidden");
						reveal();	
						
					});
				
			});
		}
		loadData(0, 4);

		function reveal() {
			for(i = 0; i < counter; i++) {
				$(".card:eq(" + i  + ")").removeClass("alfa0").delay( 1000 ).addClass("alfa100");
			}
		}

	   	$(window).scroll(function () {
			// load of content
			var scroll = $(window).scrollTop();
			if (counter < size) {

				if($(window).scrollTop() == $(document).height() - $(window).height()) {
					$(".loader").removeClass("hidden");
					setTimeout(function(){
						loadData(counter, counter+4);
					}, 1000);
				}

			}else if (counter == size) {
				counter++;
				setTimeout(function(){
					$(".the-end").removeClass("alfa0").addClass("alfa100");
				}, 1000);
			}
			
			// Hide tabs
			if (scroll > position){
				$(".tabs").addClass("off");
				// console.log("Scroll Down");
			} else {
				$(".tabs").removeClass("off");
				// console.log("Scroll Top");
			}
			position = scroll;
			// console.log("Scroll: "+scroll);
		});

		// Tab filter effect
		$(".menu-filter li").click(function(){
			$(".menu-filter li").removeClass("active");
			$(this).addClass("active");
		});

		// Search
		$(".search-link").click(function(){
			$(".search-box").removeClass("hidden");
		});
		
		$(".search-box .close").click(function(){
			$(".search-box").addClass("hidden");
		});
		//  Card icons
		// $(".heart").click(function(e){
		// 	e.preventDefault();
		// 	$(this).toggleClass("fa-heart-o").toggleClass("fa-heart");
		// 	console.log("click");
		// });

	});

})();