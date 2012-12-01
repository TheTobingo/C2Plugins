﻿function GetBehaviorSettings()
{
	return {
		"name":			"Button",
		"id":			"Rex_Button2",
		"version":		"0.1",        
		"description":	"",
		"author":		"Rex.Rainbow",
		"help url":		"",
		"category":		"Object",
		"flags":		bf_onlyone
	};
};

//////////////////////////////////////////////////////////////
// Actions
AddComboParamOption("No");
AddComboParamOption("Yes");
AddComboParam("Activated", "Enable the behavior.",1);
AddAction(0, 0, "Set activated", "", "Set {my} activated to <i>{0}</i>", 
          "Enable clicking.", "SetActivated");
AddAction(1, 0, "Cancel click detecting", "", "Cancel {my} click detecting", 
          "Cancel click detecting.", "CancelClickDetecting");  
          
//////////////////////////////////////////////////////////////
// Conditions
AddCondition(1,	cf_trigger, "On clicking", "Click", "On {my} click", "Triggered when clicking detected.", "OnClick");
AddCondition(2,	cf_trigger, "On click cancel", "Click", "On {my} click cancel", "Triggered when clicking canceled.", "OnClickCancel");
AddCondition(3,	cf_trigger, "On click detecting start", "Click", "On {my} detecting start", "Triggered when clicking  detecting start.", "OnClickStart");

//////////////////////////////////////////////////////////////
// Expressions


ACESDone();

// Property grid properties for this plugin
var property_list = [
	new cr.Property(ept_combo, "Activated", "Yes", "Enable if you wish this to begin at the start of the layout.", "No|Yes"),
	new cr.Property(ept_combo, "Click mode", "Released", "Clicking when touch released or pressed.", "Released|Pressed"),    
    ];
	
// Called by IDE when a new behavior type is to be created
function CreateIDEBehaviorType()
{
	return new IDEBehaviorType();
}

// Class representing a behavior type in the IDE
function IDEBehaviorType()
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");
}

// Called by IDE when a new behavior instance of this type is to be created
IDEBehaviorType.prototype.CreateInstance = function(instance)
{
	return new IDEInstance(instance, this);
}

// Class representing an individual instance of an object in the IDE
function IDEInstance(instance, type)
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");
	
	// Save the constructor parameters
	this.instance = instance;
	this.type = type;
	
	// Set the default property values from the property table
	this.properties = {};
	
	for (var i = 0; i < property_list.length; i++)
		this.properties[property_list[i].name] = property_list[i].initial_value;
}

// Called by the IDE after all initialization on this instance has been completed
IDEInstance.prototype.OnCreate = function()
{
}

// Called by the IDE after a property has been changed
IDEInstance.prototype.OnPropertyChanged = function(property_name)
{
}
