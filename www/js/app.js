'use strict';
/*
moment 
2016-05-30=Mon May 30 2016 
16-05-30  =NAN
05-30-2016=NAN

native 
2016-05-30=Sun May 29 2016
05-30-2016=Mon May 30 2016
16-05-30  =Sun Apr 05 1931
05-30-16  =Tue May 30 1916
*/
var isDate = function () {

    var api = {};

    /*
     * This is the function where you will code your isDate parser. 
       There should be no need to alter any of the
     * other functions in this module, but you can 
       use them for guidance.  add additional functions as you find
     * necessary.  Good Luck!
     */

  api.customDateParser = function (str) {
    var space=" ";
    var months  =["Jan","Feb","Mar","Apr",
                  "May","Jun","Jul","Aug",
                  "Sep","Oct","Nov","Dec"];
    var weekDay =["Sun","Mon","Tue","Wed",
                  "Thu","Fri","Sat"];
    
    var tempDate=new Date(str);
    var day, mm,dd,yyyy, fullDate;  
    
    mm  =tempDate.getMonth();
    dd  =tempDate.getDate();
    yyyy=tempDate.getFullYear();
    day =tempDate.getDay();
    //2016-05-30
    //Deal with ISO?
    if (str.indexOf(dd)==-1){
      dd=str.slice(-2);
      tempDate.setDate(dd);
      day =tempDate.getDay();
    }
    
    //Build date
    fullDate=weekDay[day]+space+months[mm]+space+dd+space+yyyy;
      
    return '"'+str+'" --> custom Parser --> '+fullDate;//+dateVar;
    };

    /*
     * Whoa there! No need to code beyond this point.
     */
/*
      var mm,dd,yyyy;  
      var dateLen=str.length;
      
      if (str.indexOf("/")==-1)
       {
        switch(dateLen)
           {
            case '6':
             str=str.substring(0,2)+'/'+
                  str.substring(2,4)+'/'+
                  str.substring(4,6);
             break;
            case '8':
             str=str.substring(0,2)+'/'+
                  str.substring(2,4)+'/'+
                  str.substring(4,8);
             break;
           }
       }
      
      mm=dStr.substring(0,dStr.indexOf('/'));
      dd=dStr.substring((0,dStr.indexOf('/')+1),dStr.lastIndexOf('/'));
      yyyy=dStr.substring((dStr.lastIndexOf('/')+1),dStr.length);

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
