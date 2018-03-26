(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [];


// symbols:
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.Symbol2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("AF3F4QicgBiIg6QiHg6hmhnQhnhng6iGQg6iIgBicILtAAg");
	mask.setTransform(-37.5,37.6);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1,3,true).de(-25,-25,50,50);
	this.shape.setTransform(0,0,2.057,2.057);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(1,1,1,3,true).de(-25,-25,50,50);
	this.shape_1.setTransform(0,0,2.229,2.229);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(1,1,1,3,true).de(-25,-25,50,50);
	this.shape_2.setTransform(0,0,2.4,2.4);

	var maskedShapeInstanceList = [this.shape,this.shape_1,this.shape_2];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol2, new cjs.Rectangle(-61,0.2,61,60.9), null);


(lib.Symbol1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().de(-90,-90,180,180);
	this.shape.setTransform(-0.4,-94.7,0.833,0.833);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().dr(-95,-100,190,200);
	this.shape_1.setTransform(0,-195);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().de(-90,-90,180,180);
	this.shape_2.setTransform(0,-95,1.055,1.055);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol1, new cjs.Rectangle(-95,-295,190,295), null);


(lib.Symbol3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Symbol2();
	this.instance.parent = this;
	this.instance.setTransform(0,-52.4,1,1,180);

	this.instance_1 = new lib.Symbol1();
	this.instance_1.parent = this;
	this.instance_1.setTransform(0,-52.5,1,1,180,0,0,0,-95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol3, new cjs.Rectangle(-95,-147.5,190,295), null);


// stage content:
(lib.Untitled3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_4
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AAAHCIuDAAQAAl1EIkGQEHkIF0AAQF1AAEHEIQEIEGAAF1g");
	this.shape.setTransform(100,62.5,0.833,0.833);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(24).to({_off:false},0).to({_off:true},24).wait(240));

	// Layer_5
	this.instance = new lib.Symbol2();
	this.instance.parent = this;
	this.instance.setTransform(100,100,1,1,90);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(24).to({_off:false},0).wait(1).to({regX:-30.6,regY:30.6,rotation:88.5,x:68.6,y:70.2},0).wait(1).to({rotation:84.1,x:66.4,y:72.7},0).wait(1).to({rotation:76.6,x:63.2,y:77.4},0).wait(1).to({rotation:66.2,x:59.7,y:84.4},0).wait(1).to({rotation:52.8,x:57.1,y:94.1},0).wait(1).to({rotation:36.5,x:57.2,y:106.4},0).wait(1).to({rotation:17.1,x:61.8,y:120.3},0).wait(1).to({rotation:-5.2,x:72.4,y:133.3},0).wait(1).to({rotation:-30.5,x:89.2,y:141.9},0).wait(1).to({rotation:-58.8,x:110.3,y:142},0).wait(1).to({rotation:-90,x:130.6,y:130.6},0).wait(1).to({rotation:-53.2,x:106.2,y:142.9},0).wait(1).to({rotation:-31.1,x:89.6,y:142},0).wait(1).to({rotation:-23.8,x:84.4,y:140.4},0).wait(1).to({rotation:-31.1,x:89.6,y:142},0).wait(1).to({rotation:-53.2,x:106.2,y:142.9},0).wait(1).to({rotation:-90,x:130.6,y:130.6},0).wait(1).to({rotation:-71.7,x:119.5,y:138.7},0).wait(1).to({rotation:-65.6,x:115.3,y:140.5},0).wait(1).to({rotation:-71.7,x:119.5,y:138.7},0).wait(1).to({rotation:-90,x:130.6,y:130.6},0).wait(1).to({rotation:-81,x:125.5,y:135},0).wait(1).to({rotation:-90,x:130.6,y:130.6},0).wait(1).to({regX:0,regY:0,x:100,y:100},0).wait(1).to({regX:-30.6,regY:30.6,x:130.6,y:130.6},0).wait(22).to({regX:0,regY:0,x:100,y:100},0).wait(1).to({regX:-30.6,regY:30.6,rotation:-86.7,x:128.8,y:132.4},0).wait(1).to({rotation:-76.7,x:122.8,y:136.9},0).wait(1).to({rotation:-60,x:111.2,y:141.8},0).wait(1).to({rotation:-36.7,x:93.8,y:142.9},0).wait(1).to({rotation:-6.7,x:73.2,y:134},0).wait(1).to({rotation:30,x:58.2,y:111.2},0).wait(1).to({rotation:73.3,x:61.9,y:79.5},0).wait(1).to({rotation:123.3,x:91.3,y:57.7},0).wait(1).to({rotation:180,x:130.6,y:69.4},0).wait(1).to({rotation:116.4,x:86.2,y:59},0).wait(1).to({rotation:84.6,x:66.7,y:72.4},0).wait(2).to({rotation:116.4,x:86.2,y:59},0).wait(1).to({rotation:180,x:130.6,y:69.4},0).wait(1).to({rotation:147.5,x:109.4,y:57.8},0).wait(2).to({rotation:180,x:130.6,y:69.4},0).wait(1).to({rotation:166.6,x:122.7,y:63.2},0).wait(1).to({rotation:180,x:130.6,y:69.4},0).wait(1).to({rotation:175.1,x:127.9,y:66.9},0).wait(1).to({rotation:180,x:130.6,y:69.4},0).wait(1).to({rotation:178.2,x:129.7,y:68.5},0).wait(1).to({rotation:180,x:130.6,y:69.4},0).wait(2).to({regX:0,regY:0,x:100,y:100},0).wait(23).to({y:100.1},0).wait(1).to({regX:-30.6,regY:30.6,rotation:180.7,x:130.9,y:69.8},0).wait(1).to({rotation:183.1,x:132.1,y:71.1},0).wait(1).to({rotation:187,x:134,y:73.4},0).wait(1).to({rotation:192.6,x:136.5,y:76.9},0).wait(1).to({rotation:199.9,x:139.1,y:81.7},0).wait(1).to({rotation:209,x:141.5,y:88.1},0).wait(1).to({rotation:219.9,x:143,y:96.2},0).wait(1).to({rotation:232.7,x:142.8,y:105.8},0).wait(1).to({rotation:247.6,x:139.9,y:116.6},0).wait(1).to({rotation:264.4,x:133.4,y:127.4},0).wait(1).to({rotation:283.4,x:122.6,y:136.8},0).wait(1).to({rotation:304.6,x:107.8,y:142.5},0).wait(1).to({rotation:328.1,x:90.3,y:142.1},0).wait(1).to({rotation:353.9,x:72.8,y:133.6},0).wait(1).to({rotation:382.1,x:60.2,y:116.8},0).wait(1).to({rotation:412.9,x:57.2,y:94.1},0).wait(1).to({rotation:446.3,x:67.6,y:71.4},0).wait(1).to({rotation:482.5,x:90.7,y:57.8},0).wait(1).to({rotation:521.5,x:119.3,y:61.4},0).wait(1).to({rotation:563.4,x:140.2,y:84.1},0).wait(1).to({rotation:608.4,x:139.6,y:117.2},0).wait(1).to({rotation:656.5,x:113.7,y:141},0).wait(1).to({rotation:707.8,x:76.6,y:136.3},0).wait(1).to({rotation:762.5,x:56.8,y:101.8},0).wait(1).to({rotation:820.7,x:75.7,y:64.3},0).wait(1).to({rotation:882.5,x:120,y:61.7},0).wait(1).to({rotation:948,x:143.2,y:102.2},0).wait(1).to({rotation:1017.2,x:113.2,y:141.1},0).wait(1).to({rotation:1090.4,x:64.4,y:124.5},0).wait(1).to({rotation:1167.6,x:68.2,y:70.8},0).wait(1).to({rotation:1248.8,x:124.1,y:64.2},0).wait(1).to({rotation:1334.3,x:137.7,y:121.1},0).wait(1).to({rotation:1423.9,x:79.1,y:137.8},0).wait(1).to({rotation:1517.7,x:63.7,y:76.6},0).wait(1).to({rotation:1615.7,x:128.2,y:67.3},0).wait(1).to({rotation:1718,x:126,y:134.5},0).wait(1).to({rotation:1824.5,x:59.5,y:115.1},0).wait(1).to({rotation:1935.1,x:100,y:56.8},0).wait(1).to({rotation:2049.6,x:139.3,y:118},0).wait(1).to({rotation:2167.9,x:65.6,y:126.1},0).wait(1).to({rotation:2289.8,x:96.1,y:57},0).wait(1).to({rotation:2415.1,x:137.4,y:121.6},0).wait(1).to({rotation:2543.3,x:59.9,y:116},0).wait(1).to({rotation:2674.3,x:114.2,y:59.2},0).wait(1).to({rotation:2807.5,x:120,y:138.3},0).wait(1).to({rotation:2942.6,x:58.8,y:87},0).wait(1).to({rotation:3079.1,x:138.8,y:81.1},0).wait(1).to({rotation:3216.5,x:84.2,y:140.2},0).wait(1).to({rotation:3354.5,x:84.9,y:59.5},0).wait(1).to({rotation:3492.5,x:138.3,y:120},0).wait(1).to({rotation:3630,x:58.3,y:111.2},0).wait(1).to({rotation:3766.6,x:122.6,y:63.2},0).wait(1).to({rotation:3901.9,x:109.7,y:142.1},0).wait(1).to({rotation:4035.5,x:62.8,y:78},0).wait(1).to({rotation:4167.1,x:141.1,y:86.7},0).wait(1).to({rotation:4296.4,x:84.2,y:140.2},0).wait(1).to({rotation:4423.1,x:77.1,y:63.4},0).wait(1).to({rotation:4547,x:143.2,y:101.4},0).wait(1).to({rotation:4667.9,x:76.5,y:136.2},0).wait(1).to({rotation:4785.7,x:78.8,y:62.4},0).wait(1).to({rotation:4900.2,x:143,y:96.4},0).wait(1).to({rotation:5011.4,x:87.8,y:141.4},0).wait(1).to({rotation:5119.3,x:64.3,y:75.7},0).wait(1).to({rotation:5223.8,x:132.5,y:71.5},0).wait(1).to({rotation:5324.9,x:121.7,y:137.3},0).wait(1).to({rotation:5422.6,x:60.1,y:116.5},0).wait(1).to({rotation:5517,x:86.7,y:58.9},0).wait(1).to({rotation:5608.1,x:141.4,y:87.5},0).wait(1).to({rotation:5696,x:114.1,y:140.8},0).wait(1).to({rotation:5780.7,x:60.7,y:117.8},0).wait(1).to({rotation:5862.2,x:76.6,y:63.7},0).wait(1).to({rotation:5940.8,x:130.9,y:69.8},0).wait(1).to({rotation:6016.4,x:136.9,y:122.5},0).wait(1).to({rotation:6089,x:89.5,y:141.9},0).wait(1).to({rotation:6158.8,x:57,y:104.6},0).wait(1).to({rotation:6225.8,x:78.9,y:62.3},0).wait(1).to({rotation:6290,x:124.8,y:64.6},0).wait(1).to({rotation:6351.6,x:142.9,y:105},0).wait(1).to({rotation:6410.7,x:117.8,y:139.3},0).wait(1).to({rotation:6467.3,x:76.9,y:136.5},0).wait(1).to({rotation:6521.5,x:56.9,y:102.6},0).wait(1).to({rotation:6573.5,x:71.3,y:67.7},0).wait(1).to({rotation:6623.2,x:106.2,y:57.3},0).wait(1).to({rotation:6670.9,x:135.7,y:75.7},0).wait(1).to({rotation:6716.4,x:142.4,y:108.5},0).wait(1).to({rotation:6760,x:124.8,y:135.4},0).wait(1).to({rotation:6801.6,x:95,y:142.9},0).wait(1).to({rotation:6841.3,x:68.8,y:129.9},0).wait(1).to({rotation:6879.3,x:57,y:104.3},0).wait(1).to({rotation:6915.4,x:62.8,y:78.1},0).wait(1).to({rotation:6949.9,x:81.7,y:60.9},0).wait(1).to({rotation:6982.7,x:105.8,y:57.2},0).wait(1).to({rotation:7013.9,x:127.2,y:66.4},0).wait(1).to({rotation:7043.5,x:140.2,y:84.2},0).wait(1).to({rotation:7071.7,x:142.9,y:105},0).wait(1).to({rotation:7098.3,x:136.1,y:123.7},0).wait(1).to({rotation:7123.5,x:122.6,y:136.8},0).wait(1).to({rotation:7147.3,x:105.8,y:142.8},0).wait(1).to({rotation:7169.8,x:89,y:141.8},0).wait(1).to({rotation:7190.9,x:74.7,y:135},0).wait(1).to({rotation:7210.7,x:64.3,y:124.3},0).wait(1).to({rotation:7229.3,x:58.4,y:111.7},0).wait(1).to({rotation:7246.6,x:56.8,y:98.8},0).wait(1).to({rotation:7262.8,x:58.9,y:86.8},0).wait(1).to({rotation:7277.8,x:63.7,y:76.6},0).wait(1).to({rotation:7291.7,x:70.3,y:68.6},0).wait(1).to({rotation:7304.4,x:78,y:62.8},0).wait(1).to({rotation:7316.1,x:86,y:59.1},0).wait(1).to({rotation:7326.7,x:93.7,y:57.3},0).wait(1).to({rotation:7336.3,x:100.9,y:56.8},0).wait(1).to({rotation:7344.8,x:107.4,y:57.5},0).wait(1).to({rotation:7352.4,x:112.9,y:58.8},0).wait(1).to({rotation:7359,x:117.6,y:60.6},0).wait(1).to({rotation:7364.7,x:121.4,y:62.5},0).wait(1).to({rotation:7369.4,x:124.5,y:64.4},0).wait(1).to({rotation:7373.3,x:126.8,y:66.1},0).wait(1).to({rotation:7376.2,x:128.5,y:67.5},0).wait(1).to({rotation:7378.3,x:129.7,y:68.6},0).wait(1).to({rotation:7379.6,x:130.4,y:69.3},0).wait(1).to({rotation:7380,x:130.6,y:69.5},0).to({_off:true},1).wait(48));

	// Layer_2 copy
	this.instance_1 = new lib.Symbol1();
	this.instance_1.parent = this;
	this.instance_1.setTransform(100,-147.5,1,1,0,0,0,0,-147.5);

	this.instance_2 = new lib.Symbol3();
	this.instance_2.parent = this;
	this.instance_2.setTransform(100,152.5);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1).to({y:-145.5},0).wait(1).to({y:-139.7},0).wait(1).to({y:-129.9},0).wait(1).to({y:-116.3},0).wait(1).to({y:-98.7},0).wait(1).to({y:-77.3},0).wait(1).to({y:-51.9},0).wait(1).to({y:-22.7},0).wait(1).to({y:10.4},0).wait(1).to({y:47.5},0).wait(1).to({y:1.6},0).wait(1).to({y:-21.4},0).wait(2).to({y:1.6},0).wait(1).to({y:47.5},0).wait(1).to({y:24},0).wait(2).to({y:47.5},0).wait(1).to({y:38.9},0).wait(2).to({y:47.5},0).wait(1).to({y:43.9},0).wait(1).to({y:47.5},0).wait(144).to({regY:-95,y:100},0).wait(1).to({regY:-147.5,y:47.5},0).wait(2).to({rotation:0.1,x:100.1},0).wait(1).to({rotation:0.4,x:100.3},0).wait(1).to({rotation:1.1,x:101},0).wait(1).to({rotation:2.8,x:102.6,y:47.6},0).wait(1).to({rotation:6.1,x:105.5,y:47.8},0).wait(1).to({rotation:11.9,x:110.8,y:48.6},0).wait(1).to({rotation:21.4,x:119.1,y:51.1},0).wait(1).to({rotation:36.2,x:131,y:57.6},0).wait(1).to({rotation:58.2,x:144.6,y:72.3},0).wait(1).to({rotation:90,x:152.5,y:100},0).wait(1).to({rotation:121.7,x:144.7,y:127.6},0).wait(1).to({rotation:143.8,x:131,y:142.4},0).wait(1).to({rotation:158.6,x:119.1,y:148.9},0).wait(1).to({rotation:168.1,x:110.8,y:151.4},0).wait(1).to({rotation:173.9,x:105.6,y:152.2},0).wait(1).to({rotation:177.2,x:102.6,y:152.4},0).wait(1).to({rotation:178.9,x:101,y:152.5},0).wait(1).to({rotation:179.6,x:100.3},0).wait(1).to({rotation:179.9,x:100.1},0).wait(1).to({rotation:180,x:100},0).wait(3).to({regY:-95,y:100},0).to({_off:true},48).wait(48));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(240).to({_off:false},0).wait(1).to({y:191.9},0).wait(1).to({y:224.7},0).wait(1).to({y:251.8},0).wait(1).to({y:274},0).wait(1).to({y:292},0).wait(1).to({y:306.4},0).wait(1).to({y:317.8},0).wait(1).to({y:326.7},0).wait(1).to({y:333.5},0).wait(1).to({y:338.6},0).wait(1).to({y:342.4},0).wait(1).to({y:345.1},0).wait(1).to({y:346.9},0).wait(1).to({y:348.2},0).wait(1).to({y:349},0).wait(1).to({y:349.5},0).wait(1).to({y:349.8},0).wait(1).to({y:349.9},0).wait(1).to({y:350},0).wait(4).to({_off:true},1).wait(24));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(105,-195,190,295);
// library properties:
lib.properties = {
	id: '693E0EFC9CC5664BADEC804FA4A73B62',
	width: 200,
	height: 200,
	fps: 24,
	color: "#FFFFFF",
	opacity: 0.00,
	manifest: [],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['693E0EFC9CC5664BADEC804FA4A73B62'] = {
	getStage: function() { return exportRoot.getStage(); },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}



})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;