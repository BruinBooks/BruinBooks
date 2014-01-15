/*******************************************************************
Course List Builder functions
AJC - 2013-04-08 - Changed to handle both regular and preorder pages
AJC - 2013-06-03 - Changes to handle jQuery Mobile and further preorder refinements
*******************************************************************/
// Array used to track current requests by objectID
var clCurrReqID = new Array();
var clBaseHandlerUrl = '/x-page.clhandler.xml.config.aspx?';
var clMode = '';
var clMobile = false;

// Separators in variable, multi-character to avoid clobbering data
var clItemSep = "~~";
var clValueSep = "^^";

var clDeptRegEx = '';
var clCourseRegEx = '';
var clSectionRegEx = '';

function clGetHandlerURL() {
    return clBaseHandlerUrl + 'dl' + clMode + '=1&';
}
function clGetSelectedURL() {
    return clBaseHandlerUrl + 'cl' + clMode + '=1&';
}

function clFetchData(url, objectID, mode, callback) {
    var pageRequest = false;
    if (window.XMLHttpRequest) {
        pageRequest = new XMLHttpRequest()
    } else if (window.ActiveXObject) {
        try {
            pageRequest = new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch (e) {
            try {
                pageRequest = new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch (e) { }
        }
    } else {
        return false;
    }

    pageRequest.onreadystatechange = function () {
        clParseData(pageRequest, objectID, mode, callback);
    }
    // Use random number as request ID and to prevent caching
    var reqid = (Math.floor(Math.random() * 1000000));
    clCurrReqID[objectID] = reqid;
    url += '&rnd=' + reqid;
    pageRequest.open('GET', url, true);
    pageRequest.send(null);
}
function clParseData(pageRequest, objectID, mode, callback) {
    if (pageRequest.readyState == 4 && (pageRequest.status == 200 || window.location.href.indexOf("http") == -1)) {
        try {
            // Request ID will appended to front of response, test it and then strip it off, 
            // or just bail if request has been superceded by new request for same object id
            var response = pageRequest.responseText;
            var reqidx = response.indexOf("~^~");
            if (reqidx > 0) {
                if (clCurrReqID[objectID] != response.substring(0, reqidx)) {
                    return;
                } else {
                    response = response.slice(reqidx + 3);
                }
            }

            if (mode == 1) {
                clBuildList(response, objectID);
            } else if (document.getElementById(objectID)) {
                clSelectedList(response, objectID);
            }
            if (callback != null) {
                callback(objectID);
            }
        }
        catch (e) { }
    }
}
function clSelectedList(vals, objectID) {
    var obj = document.getElementById(objectID);
    if (obj) {
        obj.innerHTML = vals;
        var count = obj.getElementsByTagName('a').length;
        if (clMobile) {
            // AJC - 2013-06-03 - write count to dedicated element
            var courseCount = document.getElementById('clCourseCount');
            if (courseCount) {
                courseCount.innerHTML = " (" + count + ")";
            }
        }
    }
}
function clBuildList(vals, objectID) {
    var obj = document.getElementById(objectID);
    if (obj && obj.options) {
        clClearSelectBox(objectID);
        if (clMobile && objectID != "clCampusSelectBox" && objectID != "clTermSelectBox") {
            clNewOption(obj, "0", "");
        }
        var aValList = vals.split(clValueSep);
        for (var i = 0; i < aValList.length; i++) {
            var aVals = aValList[i].split(clItemSep);
            if (aVals.length == 2) {
                clNewOption(obj, aVals[0], aVals[1]);
            }
        }
    }
}
function clNewOption(obj, value, text, className) {
    var opt = document.createElement('option');
    obj.options.add(opt);
    opt.value = value;
    opt.innerHTML = text;
    opt.className = className;
}
function clGetSelectedValue(objectID) {
    var val = '';
    var obj = document.getElementById(objectID);
    if (obj == null) {
        return '0';
    }
    if (obj && obj.selectedIndex > -1 && obj.options) {
        val = obj.options[obj.selectedIndex].value;
    }
    return val;
}
function clClearSelectBox(objectID) {
    var obj = document.getElementById(objectID);
    if (obj && obj.options) {
        obj.options.length = 0;
    }
}
function clShowLoading(objectID) {
    var obj = document.getElementById(objectID);
    if (obj && obj.options) {
        clNewOption(obj, "0", "Loading...", "clLoadingOption");
    }
}
function clInit() {
    clSetSizes();
    clFetchData(clGetHandlerURL() + 'o=c', 'clCampusSelectBox', 1, clSetDefaultValue);
    clFetchData(clGetHandlerURL() + 'o=t', 'clTermSelectBox', 1, clSetDefaultValue);
    clFetchData(clGetSelectedURL(), 'clSelectedCoursesList', 2);
    document.getElementById("clSectionSelectBox").onkeypress = clSectionKey;
}
function clSetSizes() {
    if (clMobile) {
        var campusbox = document.getElementById('clCampusSelectBox');
        if (campusbox) campusbox.size = 1;
        var termbox = document.getElementById('clTermSelectBox');
        if (termbox) termbox.size = 1;
        var deptbox = document.getElementById('clDeptSelectBox');
        if (deptbox) deptbox.size = 1;
        var coursebox = document.getElementById('clCourseSelectBox');
        if (coursebox) coursebox.size = 1;
        var sectionbox = document.getElementById('clSectionSelectBox');
        if (sectionbox) sectionbox.size = 1;
    }
}
function clSetDefaultValue(objectID) {
    var obj = document.getElementById(objectID);
    if (obj && obj.options && obj.options.length > 0) {
        obj.selectedIndex = 0;
        // AJC - 2013-06-03 - Handle jQuery Mobile
        if (typeof jQuery != 'undefined' && typeof jQuery.mobile != 'undefined' && $(objectID) && $(objectID).selectmenu) {
            $("#" + objectID).selectmenu('refresh');
        }
        clChangeCampusTerm();
    }
}
function clChangeCampusTerm() {
    var campusid = clGetSelectedValue('clCampusSelectBox');
    var termid = clGetSelectedValue('clTermSelectBox');
    clClearSelectBox('clDeptSelectBox');
    clClearSelectBox('clCourseSelectBox');
    clClearSelectBox('clSectionSelectBox');
    if (campusid != '' && termid != '') {
        clShowLoading('clDeptSelectBox');
        var url = clGetHandlerURL() + 'o=d&cm=' + campusid + '&tm=' + termid;
        clFetchData(url, 'clDeptSelectBox', 1);
    }
}
function clChangeDept() {
    var campusid = clGetSelectedValue('clCampusSelectBox');
    var termid = clGetSelectedValue('clTermSelectBox');
    var deptid = clGetSelectedValue('clDeptSelectBox');
    clClearSelectBox('clCourseSelectBox');
    clClearSelectBox('clSectionSelectBox');
    if (campusid != '' && termid != '' && deptid != '') {
        clShowLoading('clCourseSelectBox');
        var url = clGetHandlerURL() + 'o=r&cm=' + campusid + '&tm=' + termid + '&dp=' + deptid;
        clFetchData(url, 'clCourseSelectBox', 1);
    }
}
function clChangeCourse() {
    var campusid = clGetSelectedValue('clCampusSelectBox');
    var termid = clGetSelectedValue('clTermSelectBox');
    var deptid = clGetSelectedValue('clDeptSelectBox');
    var course = clGetSelectedValue('clCourseSelectBox');
    clClearSelectBox('clSectionSelectBox');
    if (course != '') {
        clShowLoading('clSectionSelectBox');
        var url = clGetHandlerURL() + 'o=s&cm=' + campusid + '&tm=' + termid + '&dp=' + deptid + '&cs=' + course;
        clFetchData(url, 'clSectionSelectBox', 1);
    }
}
function clChangeSection() {
    clAddSelectedCourse();
}
function clAddSelectedCourse() {
    clToggleBlock('clDeptError', false);
    clToggleBlock('clCourseError', false);
    clToggleBlock('clSectionError', false);
    var sectionid = clGetSelectedValue('clSectionSelectBox');
    if (sectionid != '') {
        var callback = clMobile ? function () { clToggleAdded(true, 'clAdded'); } : null;
        clFetchData(clGetSelectedURL() + 'a=a&cs=' + sectionid, 'clSelectedCoursesList', 2, callback);
    }
}

// AJC - 2013-06-03 - Added parameter to control which element to show
function clToggleAdded(show, addedID) {
    var clAdded = document.getElementById(addedID);
    if (clAdded) {
        if (show) {
            clAdded.style.display = 'block';
            setTimeout(function () { clToggleAdded(false, addedID); }, 1500);
        } else {
            clAdded.style.display = 'none';
        }
    }
}

function clAddEnteredSection() {
    clToggleBlock('clDeptError', false);
    clToggleBlock('clCourseError', false);
    clToggleBlock('clSectionError', false);
    var campusid = clGetSelectedValue('clCampusSelectBox');
    var dept = clGetInputValue('clDeptInputBox');
    var course = clGetInputValue('clCourseInputBox');
    var section = clGetInputValue('clSectionInputBox');
    var err = !clTestFormat(clDeptRegEx, dept, 'clDeptError');
    err = !clTestFormat(clCourseRegEx, course, 'clCourseError') || err;
    err = !clTestFormat(clSectionRegEx, section, 'clSectionError') || err;
    if (!err) {
        var url = clGetSelectedURL() + 'a=a&cm=' + campusid + '&dp=' + encodeURIComponent(dept) + '&ce=' + encodeURIComponent(course) + '&se=' + encodeURIComponent(section);
        // AJC - 2013-06-03 - Show message when adding manual course
        var callback = clMobile ? function () { clToggleAdded(true, 'clEntryAdded'); } : null;
        clFetchData(url, 'clSelectedCoursesList', 2, callback);
        clClearEntryForm();
    }
}

function clTestFormat(format, value, errorblock) {
    if (!new RegExp(format, 'g').test(value)) {
        clToggleBlock(errorblock, true);
        return false;
    }
    return true;
}

function clClearEntryForm() {
    clSetInputValue('clDeptInputBox', '');
    clSetInputValue('clCourseInputBox', '');
    clSetInputValue('clSectionInputBox', '');
    clToggleBlock('clDeptError', false);
    clToggleBlock('clCourseError', false);
    clToggleBlock('clSectionError', false);
}

function clGetInputValue(id) {
    var inputfield = document.getElementById(id);
    if (inputfield && inputfield.value) {
        return inputfield.value;
    }
}

function clSetInputValue(id, value) {
    var inputfield = document.getElementById(id);
    if (inputfield && inputfield.value) {
        inputfield.value = value;
    }
}

function clToggleBlock(id, show) {
    var block = document.getElementById(id);
    if (block && block.style) {
        block.style.display = show ? 'block' : 'none';
    }
}

function clClearSection() {
    var obj = document.getElementById('clSectionSelectBox');
    if (obj && obj.options) {
        obj.selectedIndex = -1;
    }
}
function clDeleteSelection(sectionid) {
    if (sectionid != '') {
        clFetchData(clGetSelectedURL() + 'a=d&cs=' + sectionid, 'clSelectedCoursesList', 2);
    }
}
function clSectionKey(e) {
    var evt = window.event || e;
    if (evt && evt.keyCode && evt.keyCode == 13) clChangeSection();
}
function clHasCourses() {
    var obj = document.getElementById('clSelectedCoursesList');
    if (obj) {
        return obj.getElementsByTagName('a').length > 0;
    }
}
function clSetMobile() {
    clMobile = true;
}
function clPreorderSave() {
    if (!clHasCourses()) {
        alert("You must select at least 1 course for your Pre-Order.");
        return false;
    }
}
/*******************************************************************/
