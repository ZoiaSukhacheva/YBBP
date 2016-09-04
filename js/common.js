/* --- Site interface --- */
var site = {
	ui: {},
	effects: {},
	sizes: {},
	content: {},
	works: {},
	plugins: {},
	router: {},
	state: {},
	loader: {},
	likes: {},
	device: {},
	storage: {}
};
/*
site.works.items = {
	"index-1": {}, "index-2": {}, "index-21": {}, "index-3": {}, "index-4": {}, "index-5": {}, "index-6": {}


}*/
/* --- Root blocks --- */
var $root = $('#root'),
    $html = $('html'),
    $body = $('body'),
    $document = $(document),
    $window = $(window),
    $posters = $root.find('.posters'),
    $works = $root.find('.works'),
    $serverError = $root.find('.server-error');


/* --- Language --- */
site.lang = $root.data('lang');


/* --- Version --- */
site.version = $root.data('version');


/* --- Prefixed styles --- */
var prefixed = {
	'transform': Modernizr.prefixed('transform'),
	'transform-origin': Modernizr.prefixed('transformOrigin')
};


/*** --- State --- ***/

if ($serverError.length) {
	site.state.mode = $root.data('mode');
	site.state.item = $root.data('item');
} else {
	site.state.mode = 'work';
	site.state.item = 'index';
};


/*** --- Dataset helper --- ***/
$.fn.api = function(key){
	return this.data(key) ? this.data(key) : this.data(key, {}).data(key);
};