﻿// ECMAScript 5 strict mode
"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.plugins_, "cr.plugins_ not created");

/////////////////////////////////////
// Plugin class
cr.plugins_.Rex_ToneJS_synth = function(runtime)
{
	this.runtime = runtime;
};

(function ()
{
	var pluginProto = cr.plugins_.Rex_ToneJS_synth.prototype;
		
	/////////////////////////////////////
	// Object type class
	pluginProto.Type = function(plugin)
	{
		this.plugin = plugin;
		this.runtime = plugin.runtime;
	};
	
	var typeProto = pluginProto.Type.prototype;

	typeProto.onCreate = function()
	{
	};

	/////////////////////////////////////
	// Instance class
	pluginProto.Instance = function(type)
	{
		this.type = type;
		this.runtime = type.runtime;
	};
	
	var instanceProto = pluginProto.Instance.prototype;

    var PREFIX_MAP = ["", "fm" ,"am", "fat"];    
    var OSCTYPE_MAP = ["sine", "square", "triangle", "custom", "pwm", "pulse"];
	instanceProto.onCreate = function()
	{
        //var oscillatorOpts = {};
        //oscillatorOpts["detune"] = this.properties[0];
        //oscillatorOpts["phase"] = this.properties[1];          
        //oscillatorOpts["volume"] = this.properties[2];  
        //
        //var prefix = PREFIX_MAP[ this.properties[3] ];
        //var type = OSCTYPE_MAP[ this.properties[4] ];
        //oscillatorOpts["type"] = prefix + type;
        //
        //if (type === "custom")
        //    oscillatorOpts["partials"] = JSON.parse( "[" + this.properties[5] + "]");
        //else if (type === "pulse")
        //    oscillatorOpts["width"] = this.properties[6];
        //
        //var envelopeOpts = {
        //    "attack": this.properties[7],
        //    "decay": this.properties[8],
        //    "sustain": this.properties[9],
        //    "release": this.properties[10],
        //};
        //
        //
        //var options = {
        //    "oscillator": oscillatorOpts,
        //    "envelope": envelopeOpts,
        //    
        //    "volume": this.properties[11],
        //    "portamento": parseTime( this.properties[12] ),
        //    "frequency": parseTime( this.properties[13] ),
        //    "detune": this.properties[14]
        //}
        this.synth = new window["Tone"]["Synth"]();
	};
    
	instanceProto.onDestroy = function ()
	{
        this.synth["dispose"]();
        this.synth = null;
	};   
    
    var parseTime = function (timeString)
    {
        if (isNaN(timeString))
            return timeString;
        else
            return parseFloat(timeString);
    };
        
    // export
	instanceProto.GetObject = function ()
	{
        return this.synth;
	};     
    
	//////////////////////////////////////
	// Conditions
	function Cnds() {};
	pluginProto.cnds = new Cnds();    

	//////////////////////////////////////
	// Actions
	function Acts() {};
	pluginProto.acts = new Acts();

	Acts.prototype.TriggerAttackRelease = function (note, duration, time, velocity)
	{
        this.synth["triggerAttackRelease"](note, duration, time, velocity);      
	};  
    
	Acts.prototype.TriggerAttack = function (note, time, velocity)
	{
        this.synth["triggerAttack"](note, time, velocity);      
	};   
    
	Acts.prototype.TriggerRelease = function (time)
	{
        this.synth["triggerRelease"](time);      
	};   
    
	Acts.prototype.SetNote = function (time)
	{
        this.synth["setNote"](time);      
	};     
	//////////////////////////////////////
	// Expressions
	function Exps() {};
	pluginProto.exps = new Exps();

}());