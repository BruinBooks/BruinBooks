/***************************************************
CHANGE LOG
AJC - 2013-05-02 - Changes for rental substitutions, correct display issues
AJC - 2013-06-03 - Handle jQuery and jQuery mobile better, some refactoring
***********************************************/

var _taball = null;

function showAllCourses() {
    if (_taball != null && $('#' + _taball) != null && $('#' + _taball).attr("class").indexOf("tabs-selected") >= 0) {
        $('#allcourses').hide();
        var tablist = $('ul#tablist a');
        for (var x = 0; x < tablist.length; x++) {
            if (tablist[x].hash != "#allcourses") {
                var tab = $('div' + tablist[x].hash);
                tab.attr("class", tab.attr("class").replace("tabs-hide", ""));
            }
        }
    }
    else {
        // Set height of allcourses tab to height of current tab to avoid display issues when switching
        var selectedtab = $('ul#tablist li.tabs-selected a');
        if (selectedtab != null && selectedtab.length > 0 && selectedtab[0] != null) {
            var tabcontent = $('div' + selectedtab[0].hash);
            if (tabcontent != null) {
                $('#allcourses').height(tabcontent.height());
            }
        }
    }
}

// AJC - 2013-06-03 - Handle case where jQuery is already loaded, don't load again
if (typeof $ != 'undefined') {
    $(document).ready(booklistInit);
}

function jQueryReady() {
    $(document).ready(booklistInit);
}

// AJC - 2013-06-03 - refactored into separate function
function booklistInit() {

    //initialize tabs
    // AJC - 2013-06-03 - Only process tabs if we are using them
    if ($('#booklisttabs').tabs) {
        $('#booklisttabs').tabs({
            onShow: showAllCourses
        });
    }
    showAllCourses();

    //gray backdrop for 2nd row of tabs, only show if there's a second row.
    if ($('#booklisttabs ul.tabs-nav').length > 0) {
        if ($('#booklisttabs ul.tabs-nav').height() > 30)
            $('#booklisttabs ul.tabs-nav').attr("style", "background: transparent url(/app_templates/skin_1/images/booklist/tab2ndrowbg.gif) repeat-x right bottom;");
    }

    //Highlight row when New/Used/eBook clicked
    // AJC - 2013-06-03 - use more reliable change function
    $('.addcartform input').change(function () {
        selectRow(this);
    });

    //Highlight row when New/Used/eBook preselected.
    $('.addcartform input:checked').each(function () {
        selectRow(this);
    });

    //Row remove link
    $('.unselect a').click(function () {
        var row = $(this).closest('tr');
        $(row).find('.addcartform input').removeAttr('checked');
        $(row).find('.subs input').removeAttr('disabled');
        $(row).attr('class', $(row).attr("class").replace(" selected", ""));
        // AJC - 2013-06-03 - Handle jQuery mobile better
        $(row).find('td.subs').removeClass('error');
        $(row).find('div.subs').removeClass('error');
        if (typeof jQuery.mobile != 'undefined') {
            $(row).find('.addcartform input').checkboxradio('refresh');
            $(row).find('.subs input').checkboxradio('enable');
        }

        return false;
    });

    //details rollover
    // AJC - 2013-05-10 - Changed class name so hover isn't added to everything
    $('#bodyWrapper .infooverlay').hover(
		function () {
		    $(this).addClass("infobackdrop");
		    $(this).find('.productoverlay').fadeIn('fast');
		},
		function () {
		    var info = this;
		    $(this).find('.productoverlay').fadeOut('fast', function () { $(info).removeClass("infobackdrop"); });
		}

	);

    //rollover close link
    $('.productoverlay a.close').click(function () {
        $(this).closest('.productoverlay').fadeOut('fast', function () {
            $(this).closest(".info").removeClass("infobackdrop");
        });
        return false;
    });

    //Automatically show subs overlay if the link to it is tagged with the "autoload" css class.
    if ($('a.autoload[href^="BooklistSubsOverlay"]').length > 0) {

        if (imgLoader == undefined) //just in case thickbox.js isn't initialized.
        {
            imgLoader = new Image(); // preload image
            imgLoader.src = tb_pathToImage;
        }
        tb_show("", $('a.autoload[href^="BooklistSubsOverlay"]').attr("href"), "");
    }

    //Select All links
    $('a.selectall').click(function () {
        var type = $(this).attr("type"); // attribute type="new" or type="used" in the link.
        // don't try to select a disabled item
        $(this).closest('table').find(".addcartform input." + type + ":not(:disabled)").click();
        return false;
    });

    $('.booklistright #pnlStudentLogin .title').click(function () {
        $(this).next('.inner').slideDown("fast");
    });
}

function selectRow(radio)
{
	var name = $(radio).attr('name');
	$(".addcartform input[name='"+name+"']").closest('tr').removeClass('selected');
	$(radio).closest('tr').addClass('selected');
}

function setSub(value)
{
	tb_remove();
	if (value=="1" || value=="0")
	{
		$('.subs input').attr("checked","");
		$('.subs input[value='+value+']').attr("checked","checked");
	}
	return false;
}

// Changes to handle rental substitutions, use setTimeout to avoid timing problems in browser
function selectedVariant(prodid, suffix, cansub, defaultsub, obj) {
    var sub0 = $('#sub_' + prodid + '_0_' + suffix);
    var sub1 = $('#sub_' + prodid + '_1_' + suffix);

    if (sub0.attr("type") == 'radio' && sub1.attr("type") == 'radio') {
        if (cansub) {
            sub0.attr("disabled", false);
            sub1.attr("disabled", false);
        }
        if (!cansub) {
            if (defaultsub == 0) {
                sub0.attr("disabled", false);
                setTimeout(function () { sub0.click(); sub1.attr("disabled", true); }, 100);
            } else if (defaultsub == 1) {
                sub1.attr("disabled", false);
                setTimeout(function () { sub1.click(); sub0.attr("disabled", true); }, 100);
            }
        }
    }
}

function toggleCourse(CourseID) {
    var course = document.getElementById('course' + CourseID);
    var coursetab = document.getElementById('coursetab' + CourseID);
    if (course && coursetab) {
        if (coursetab.className.toLowerCase().indexOf('header_highlight') > -1) {
            coursetab.className = coursetab.className.toLowerCase().replace('header_highlight', '');
            course.style.display = "none";
        } else {
            coursetab.className = coursetab.className += ' header_highlight';
            course.style.display = "block";
        }
    }
}
