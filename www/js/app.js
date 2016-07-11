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
left off here
need to handle the following formats 
    16-05-30 --> THIS WORKS
    16/05/30 --> THIS WORKS
    2016/05/30-->this works
    2016-05-30-->this works
    160530   -->  this works
    20160530 -->  this works
        */
var isDate = function() {

    var api = {};

    api.customDateParser = function(str) {

        var space = " ";
        var months = ["Jan", "Feb", "Mar", "Apr",
            "May", "Jun", "Jul", "Aug",
            "Sep", "Oct", "Nov", "Dec"
        ];
        var weekDay = ["Sun", "Mon", "Tue", "Wed",
            "Thu", "Fri", "Sat"
        ];
        var Ogstr = str;
        var strLen = str.length;
        var day, mm, dd, yyyy, fullDate, tempDate;

        if (str.indexOf("-") > -1)
            str = str.replace(/-/g, "/");
        else
        if (str.indexOf("/") === -1) {
            switch (strLen) {
                case 6:
                    str = str.substring(0, 2) + '/' +
                        str.substring(2, 4) + '/' +
                        "20" + str.substring(4, 6);
                    break;
                case 8:
                    str = str.substring(0, 2) + '/' +
                        str.substring(2, 4) + '/' +
                        str.substring(4, 8);
                    break;
            }
        }

        tempDate = new Date(str);

        if (Object.prototype.toString.call(tempDate) === "[object Date]") {
            // it is a date
            if (isNaN(tempDate.getTime())) {
                // date is not valid
                if (strLen === 6) {
                    console.log("hi");
                    tempDate = new Date(str.substring(4, 5) + "/" + str.substring(8, 10) + "/20" + str.substring(0, 2));
                }
                else if(strLen===8 && Ogstr.indexOf("/") <0){
                    console.log("hello");
                    tempDate = new Date(str.substring(6, 8) + "/" + str.substring(8, 10) + "/20" + str.substring(3, 5));
                }
                else{
                    console.log("hey");
                    tempDate = new Date(str.substring(3, 5) + "/" + str.substring(6, 8) + "/20" + str.substring(0,2));
                }
                //16/05/30 
                //1234567890
                console.log(str);
                console.log(str.substring(6, 8) + "/" + str.substring(8, 10) + "/20" + str.substring(3, 5));
                console.log(tempDate);
            }
            else {
                // date is valid
                console.log("date is valid");
            }
        }
        else {
            // not a date
            console.log("not a date");
        }


        mm = tempDate.getMonth();
        dd = tempDate.getDate();
        yyyy = tempDate.getFullYear();
        day = tempDate.getDay();

        // need to check and see if I am still using this clause
        var endSegment = strLen === 6 ?
            Number(str.substring((str.length - 2), str.length)) :
            Number(str.substring((str.length - 4), str.length));
/*
        //Deal with ISO?check and see if I am still using this clause
        if (str.indexOf(dd) == -1) {
            if (Number(str.substring(0, 2)) > 12 && endSegment > 12) {
                yyyy = str.length === 8 ? Number(str.substring(0, 2)) : Number(str.substring(0, 3));
                mm = Number(str.substring(3, 5));
            }

            dd = Number(str.slice(-2));
            tempDate = new Date(mm + "/" + dd + "/" + yyyy);
            day = tempDate.getDay();
            --mm;
            // if another invalid date switch year, and month
        }
*/
        //Build date
        if (yyyy.toString().length === 2) yyyy = "20" + yyyy;
        fullDate = weekDay[day] + space + months[mm] + space + dd + space + yyyy;

        return '"' + Ogstr + '" --> custom Parser --> ' + fullDate;
    };

    /*
     * Whoa there! No need to code beyond this point.
     */

    api.parse = function(str) {
        api.consoleLog(api.parser(str));
    };

    api.nativeJsParser = function(str) {
        var pd = Date.parse(str);
        if (isNaN(pd) || typeof pd == 'undefined') {
            return '&quot' + str + '&quot --&gt; Native JS Parser --> ' + pd;
        }
        else {
            var d = new Date(pd);
            return '&quot' + str + '&quot --> Native JS Parser --> ' + d.toDateString();
        }
    };

    api.momentJsParser = function(str) {
        var pd = moment(str, moment.ISO_8601);
        if (isNaN(pd) || typeof pd == 'undefined') {
            return '&quot' + str + '&quot --&gt; Moment.js Parser --> ' + pd;
        }
        else {
            var d = new Date(pd);
            return '&quot' + str + '&quot --> Moment.js Parser --> ' + d.toDateString();
        }

        return moment(str);
    };

    api.consoleLog = function(str) {
        idConsole.innerHTML += '<br>&gt; ' + str;
    };

    api.consoleClear = function() {
        idConsole.innerHTML = '&gt; enter a string, select a parse method and click <i>parse</i>';
    };

    return api;
}();

document.addEventListener('DOMContentLoaded', function() {

    var button_text = ["Parse: custom isDate.parse()", "Parse: native Date.parse()", "Parse: moment(str, format)"],
        date_input = document.getElementById('rjsw-date-input'),
        parse_button = document.getElementById('rjsw-run-button');

    //disable form submit
    document.getElementById('rjsw-form').addEventListener("submit", function(e) {
        e.preventDefault();
        //window.history.back();
    }, true);

    //add a keypress event handler to the date input
    date_input.addEventListener('keypress', function(e) {
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
    document.getElementById('rjsw-clear-button').addEventListener('click', function() {
        isDate.consoleClear();
    });

    //set the event handler for the parse button
    document.getElementById('rjsw-run-button').addEventListener('click', function() {
        isDate.parse(date_input.value);
    });

    //set the event handlers for the parser selector
    document.getElementById('rjsw-select-mine').addEventListener('click', function() {
        isDate.parser = isDate.customDateParser;
        parse_button.innerHTML = button_text[0];
    });

    document.getElementById('rjsw-select-native').addEventListener('click', function() {
        isDate.parser = isDate.nativeJsParser;
        parse_button.innerHTML = button_text[1];
    });

    document.getElementById('rjsw-select-moment').addEventListener('click', function() {
        isDate.parser = isDate.momentJsParser;
        parse_button.innerHTML = button_text[2];
    });

    //set the date in the copyright
    var now = new Date();
    document.getElementById('rjsw-copy-date').innerHTML = now.getFullYear();
});
