'use strict';

var isDate = function () {

    var api = {};

    /*
     * This is the function where you will code your isDate parser. There should be no need to alter any of the
     * other functions in this module, but you can use them for guidance.  add additional functions as you find
     * necessary.  Good Luck!
     */

    api.customDateParser = function (str) {

        /*
            insert your code here
           */

        //return what ever success/fail message you choose to be logged to the console
        return 'Running your Custom Date Parser....You have some work to do yet.';
    };

    /*
     * Whoa there! No need to code beyond this point.
     */

    api.parse = function (str) {
        api.consoleLog(api.parser(str));
    };

    api.nativeJsParser = function (str) {
        var pd = Date.parse(str);
        if (isNaN(pd) || typeof pd == 'undefined') {
            return '&quot' + str + '&quot --&gt; Native JS Parser --> ' + pd;
        } else {
            var d = new Date(pd);
            return '&quot' + str + '&quot --> Native JS Parser --> ' + d.toDateString();
        }
    };

    api.momentJsParser = function (str) {
        var pd = moment(str, moment.ISO_8601);
        if (isNaN(pd) || typeof pd == 'undefined') {
            return '&quot' + str + '&quot --&gt; Moment.js Parser --> ' + pd;
        } else {
            var d = new Date(pd);
            return '&quot' + str + '&quot --> Moment.js Parser --> ' + d.toDateString();
        }

        return moment(str);
    };

    api.consoleLog = function (str) {
        idConsole.innerHTML += '<br>&gt; ' + str;
    };

    api.consoleClear = function () {
        idConsole.innerHTML = '&gt; enter a string, select a parse method and click <i>parse</i>';
    };

    return api;
}();

document.addEventListener('DOMContentLoaded', function () {

    var button_text = ["Parse: custom isDate.parse()", "Parse: native Date.parse()", "Parse: moment(str, format)"],
        date_input = document.getElementById('rjsw-date-input'),
        parse_button = document.getElementById('rjsw-run-button');

    //disable form submit
    document.getElementById('rjsw-form').addEventListener("submit", function (e) {
        e.preventDefault();
        //window.history.back();
    }, true);

    //add a keypress event handler to the date input
    date_input.addEventListener('keypress', function (e) {
        if (e.charCode == 13) {
            isDate.parse(date_input.value);
        }
    });

    //create a global reference to the app console
    window.idConsole = document.getElementsByClassName('console-window')[0];

    //set the app defaults
    idConsole.innerHTML = '&gt; Enter a string, select a parse method, and click <i>Parse</i>...';
    isDate.parser = isDate.customDateParser;
    parse_button.innerHTML = button_text[0];

    //set the event handler for the clear-console button
    document.getElementById('rjsw-clear-button').addEventListener('click', function () {
        isDate.consoleClear();
    });

    //set the event handler for the parse button
    document.getElementById('rjsw-run-button').addEventListener('click', function () {
        isDate.parse(date_input.value);
    });

    //set the event handlers for the parser selector
    document.getElementById('rjsw-select-mine').addEventListener('click', function () {
        isDate.parser = isDate.customDateParser;
        parse_button.innerHTML = button_text[0];
    });

    document.getElementById('rjsw-select-native').addEventListener('click', function () {
        isDate.parser = isDate.nativeJsParser;
        parse_button.innerHTML = button_text[1];
    });

    document.getElementById('rjsw-select-moment').addEventListener('click', function () {
        isDate.parser = isDate.momentJsParser;
        parse_button.innerHTML = button_text[2];
    });

    //set the date in the copyright
    var now = new Date();
    document.getElementById('rjsw-copy-date').innerHTML = now.getFullYear();
});