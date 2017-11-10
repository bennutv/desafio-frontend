var $jq = jQuery.noConflict();

$jq ('.burgMenu').on('click', function() {
	$jq('.burgMenu ul, #overlay').toggle('slow');
});

$jq('.search').on('click', function() {
	var $this = $jq(this);
	$jq($this).addClass('searchActive');
	$jq('#overlay').show('slow');
	$jq('.burgMenu').css('z-index', '10');
});

$jq('#overlay').on('click', function() {
	$jq(this).hide('slow');
	$jq('.burgMenu ul').hide('slow');
	$jq('.search').removeClass('searchActive');
	$jq('.burgMenu').css('z-index', '110');
});

$jq('#navMain li').on('click', function() {
	var $this = $jq(this);
	$jq($this).addClass('active');
	$jq($this).siblings().removeClass('active');
});

var header = $jq('header');
$jq(window).scroll(function() {
	if($jq(this).scrollTop() > 50) {
		$jq('#navMain').hide();
		header.addClass("fixHeader");
    }
	else{
        header.removeClass("fixHeader");
		$jq('#navMain').show();
    }
 });

