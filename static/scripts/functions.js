7;
/*********************************************************************************************\
***********************************************************************************************
**                                                                                           **
**  eSchool                                                                                  **
**  Version 4.0                                                                              **
**                                                                                           **
**  http://www.eschool.pk                                                                    **
**                                                                                           **
**  Copyright 2005-22 (C) SW3 Solutions                                                      **
**  http://www.sw3solutions.com                                                              **
**                                                                                           **
**  ***************************************************************************************  **
**                                                                                           **
**  Project Manager:                                                                         **
**                                                                                           **
**      Name  :  Muhammad Tahir Shahzad                                                      **
**      Email :  mtshahzad@sw3solutions.com                                                  **
**      Phone :  +92 333 456 0482                                                            **
**      URL   :  http://www.mtshahzad.com                                                    **
**                                                                                           **
***********************************************************************************************
\*********************************************************************************************/

function clearList(sList) {
  $(sList + " option").remove();
  $(sList + " optgroup").remove();

  $("<option/>").val("").html("").appendTo(sList);
}

function papulateList(sData, sList) {
  if (sData == "") return;

  var sOptions = sData.split("|-|");

  for (var i = 0; i < sOptions.length; i++) {
    var sOption = sOptions[i].split("||");

    $("<option/>").val(sOption[0]).html(sOption[1]).appendTo(sList);
  }
}

function papulateParentChildList(sData, sList) {
  if (sData == "") return;

  var sOptions = sData.split("|-|");

  for (var i = 1; i < sOptions.length; i++) {
    var sOption = sOptions[i].split("||");

    if (sOption[0] == "0") {
      var sOptGroup = $("<optgroup/>")
        .attr("label", sOption[1])
        .appendTo(sList);

      i++;

      for (var j = i; j < sOptions.length; j++, i++) {
        var sOption = sOptions[i].split("||");

        if (sOption[0] == "0") {
          i--;

          break;
        }

        $("<option/>").val(sOption[0]).html(sOption[1]).appendTo(sOptGroup);
      }
    }
  }
}

function getClassesList(sSchool, sList, sType) {
  if (typeof sType === "undefined") sType = "S";

  if (sType == "S") clearList(sList);
  else if (sType == "M") $(sList).html("");

  var sSchools = "";

  if (sSchool.indexOf(".") >= 0) {
    $(sSchool).each(function () {
      if ($(this).prop("checked") == true) {
        if (sSchools != "") sSchools += ",";

        sSchools += $(this).val();
      }
    });
  } else sSchools = $(sSchool).val();

  if (sSchools == "") return;

  $.post(
    "ajax/get-classes.php",

    { Schools: sSchools, Type: sType },

    function (sResponse) {
      if (sType == "S") papulateList(sResponse, sList);
      else if (sType == "M") $(sList).html(sResponse);

      $(".multiSelect table").filterTable({ placeholder: "search" });
    },

    "text"
  );
}

function getSectionsList(sSchool, sClass, sList, sType) {
  if (typeof sType === "undefined") sType = "S";

  if (sType == "S") clearList(sList);
  else if (sType == "M") $(sList).html("");

  if ($(sSchool).val() == "" || $(sClass).val() == "") return;

  $.post(
    "ajax/get-sections.php",

    { School: $(sSchool).val(), Class: $(sClass).val(), Type: sType },

    function (sResponse) {
      if (sType == "S") papulateList(sResponse, sList);
      else if (sType == "M") $(sList).html(sResponse);

      $(".multiSelect table").filterTable({ placeholder: "search" });
    },

    "text"
  );
}

function getClassSectionsList(
  sSchool,
  sList,
  sParentChild,
  sType,
  iClassPosition
) {
  if (typeof sParentChild === "undefined") sParentChild = "Y";

  if (typeof sType === "undefined") sType = "S";

  if (typeof iClassPosition === "undefined") iClassPosition = 0;

  if (sType == "S") clearList(sList);
  else if (sType == "M") $(sList).html("");

  var sSchools = "";

  if (sSchool.indexOf(".") >= 0) {
    $(sSchool).each(function () {
      if ($(this).prop("checked") == true) {
        if (sSchools != "") sSchools += ",";

        sSchools += $(this).val();
      }
    });
  } else sSchools = $(sSchool).val();

  if (sSchools == "") return;

  $.post(
    "ajax/get-class-sections.php",

    {
      Schools: sSchools,
      ParentChild: sParentChild,
      Type: sType,
      ClassPosition: iClassPosition,
    },

    function (sResponse) {
      if (sType == "S") {
        if (sParentChild == "N") papulateList(sResponse, sList);
        else papulateParentChildList(sResponse, sList);
      } else if (sType == "M") $(sList).html(sResponse);

      $(".multiSelect table").filterTable({ placeholder: "search" });
    },

    "text"
  );
}

function getTeachersList(sSchool, sClass, sSubject, sList) {
  clearList(sList);

  if (
    $(sSchool).val() == "" ||
    $(sClass).val() == "" ||
    $(sSubject).val() == ""
  )
    return;

  $.post(
    "ajax/get-teachers.php",

    {
      School: $(sSchool).val(),
      Class: $(sClass).val(),
      Subject: $(sSubject).val(),
    },

    function (sResponse) {
      papulateList(sResponse, sList);
    },

    "text"
  );
}

function getClassTeachersList(sSchool, sClass, sSession, sList) {
  clearList(sList);

  if (
    $(sSchool).val() == "" ||
    $(sClass).val() == "" ||
    $(sSession).val() == ""
  )
    return;

  $.post(
    "ajax/get-class-teachers.php",

    {
      School: $(sSchool).val(),
      Class: $(sClass).val(),
      Session: $(sSession).val(),
    },

    function (sResponse) {
      papulateList(sResponse, sList);
    },

    "text"
  );
}

function getExamsList(sSchool, sSession, sList, sMarking) {
  clearList(sList);

  if ($(sSchool).val() == "" || $(sSession).val() == "") return;

  if (typeof sMarking === "undefined") sMarking = "";

  $.post(
    "ajax/get-exams.php",

    { School: $(sSchool).val(), Session: $(sSession).val(), Marking: sMarking },

    function (sResponse) {
      papulateList(sResponse, sList);
    },

    "text"
  );
}

function getSubjectsList(sClass, sList) {
  clearList(sList);

  if ($(sClass).val() == "") return;

  $.post(
    "ajax/get-subjects.php",

    { Class: $(sClass).val() },

    function (sResponse) {
      papulateList(sResponse, sList);
    },

    "text"
  );
}

function getAttendanceSubjectsList(sClass, sList, sContainer) {
  clearList(sList);

  if ($(sClass).val() == "") return;

  $.post(
    "ajax/get-subjects.php",

    { Class: $(sClass).val(), Attendance: "Y" },

    function (sResponse) {
      papulateList(sResponse, sList);

      if (typeof sContainer !== "undefined") {
        if ($(sContainer + " option").length > 1) {
          if ($(sContainer).css("display") != "block")
            $(sContainer).show("blind");
        } else {
          if ($(sContainer).css("display") != "none")
            $(sContainer).hide("blind");
        }
      }
    },

    "text"
  );
}

function getDesignationsList(sDepartment, sList) {
  clearList(sList);

  if ($(sDepartment).val() == "") return;

  $.post(
    "ajax/get-designations.php",

    { Department: $(sDepartment).val() },

    function (sResponse) {
      papulateList(sResponse, sList);
    },

    "text"
  );
}

function getStudentsList(
  sSchool,
  sSession,
  sClass,
  sList,
  sStatus,
  sType,
  sApp
) {
  if (typeof sApp === "undefined") sApp = "N";

  if (typeof sStatus === "undefined") sStatus = "";
  else if ($(sStatus).length == 1) sStatus = $(sStatus).val();

  if (typeof sType === "undefined") sType = "S";

  if (sType == "S") clearList(sList);
  else if (sType == "M") $(sList).html("");

  var sSchools = "";

  if (sSchool.indexOf(".") >= 0) {
    $(sSchool).each(function () {
      if ($(this).prop("checked") == true) {
        if (sSchools != "") sSchools += ",";

        sSchools += $(this).val();
      }
    });
  } else sSchools = $(sSchool).val();

  if (sSchools == "") return;

  var sClasses = "";

  if (sClass.indexOf(".") >= 0) {
    $(sClass).each(function () {
      if ($(this).prop("checked") == true) {
        if (sClasses != "") sClasses += ",";

        sClasses += $(this).val();
      }
    });
  } else sClasses = $(sClass).val();

  if (
    sSchools == "" ||
    $(sSession).val() == "" ||
    (sType == "S" && sClasses == "")
  )
    return;

  $.post(
    "ajax/get-students.php",

    {
      Schools: sSchools,
      Session: $(sSession).val(),
      Classes: sClasses,
      Status: sStatus,
      Type: sType,
      App: sApp,
    },

    function (sResponse) {
      if (sType == "S") papulateList(sResponse, sList);
      else if (sType == "M") $(sList).html(sResponse);

      $(".multiSelect table").filterTable({ placeholder: "search" });
    },

    "text"
  );
}

function getEmployeesList(sSchool, sDepartment, sList, sStatus, sType) {
  if (typeof sStatus === "undefined") sStatus = "";
  else if ($(sStatus).length == 1) sStatus = $(sStatus).val();

  if (typeof sType === "undefined") sType = "S";

  if (sType == "S") clearList(sList);
  else if (sType == "M") $(sList).html("");

  var sSchools = "";

  if (sSchool.indexOf(".") >= 0) {
    $(sSchool).each(function () {
      if ($(this).prop("checked") == true) {
        if (sSchools != "") sSchools += ",";

        sSchools += $(this).val();
      }
    });
  } else sSchools = $(sSchool).val();

  if (sSchools == "") return;

  var sDepartments = "";

  if (sDepartment.indexOf(".") >= 0) {
    $(sDepartment).each(function () {
      if ($(this).prop("checked") == true) {
        if (sDepartments != "") sDepartments += ",";

        sDepartments += $(this).val();
      }
    });
  } else if ($(sDepartment).length > 0) sDepartments = $(sDepartment).val();

  $.post(
    "ajax/get-employees.php",

    {
      Schools: sSchools,
      Departments: sDepartments,
      Status: sStatus,
      Type: sType,
    },

    function (sResponse) {
      if (sType == "S") {
        if (sDepartments != "" && sDepartments.indexOf(",") == -1)
          papulateList(sResponse, sList);
        else papulateParentChildList(sResponse, sList);
      } else if (sType == "M") $(sList).html(sResponse);

      $(".multiSelect table").filterTable({ placeholder: "search" });
    },

    "text"
  );
}

function getTimetableSeasonsList(sSchool, sClass, sList) {
  clearList(sList);

  if ($(sSchool).val() == "" || $(sClass).val() == "") return;

  $.post(
    "ajax/get-timetable-seasons.php",

    { School: $(sSchool).val(), Class: $(sClass).val() },

    function (sResponse) {
      papulateList(sResponse, sList);
    },

    "text"
  );
}

function getTimetablesList(sSchool, sClass, sSession, sSeason, sList) {
  clearList(sList);

  if (
    $(sSchool).val() == "" ||
    $(sClass).val() == "" ||
    $(sSession).val() == "" ||
    $(sSeason).val() == ""
  )
    return;

  $.post(
    "ajax/get-timetables.php",

    {
      School: $(sSchool).val(),
      Class: $(sClass).val(),
      Session: $(sSession).val(),
      Season: $(sSeason).val(),
    },

    function (sResponse) {
      papulateList(sResponse, sList);
    },

    "text"
  );
}

function ajaxList(sList, sScript, sOptions) {
  clearList(sList);

  $.post(
    sScript,
    sOptions,

    function (sResponse) {
      papulateList(sResponse, sList);
    },

    "text"
  );
}

function initTableSorting(sGrid, sMsgDiv, objTable) {
  if ($(sGrid + " .icnEdit").length > 1) {
    /*
		var sOldOrder  = "";
		var sPositions = "";


		var objSortable = $('#DataGrid tbody').sortable(
		{
			placeholder  :  "ui-state-highlight",
			items        :  "tr",
			cursor       :  "move",
			containment  :  "parent",
			handle       :  ".position",
			opacity      :  0.9,

			start        :  function(event, ui)
							{
							//console.log("Before: " + objSortable.sortable("toArray"));

								var objRows = objTable.fnGetNodes( );

								sOldOrder   = "";
								sPositions  = "";

								for (var i = 0; i < objRows.length; i ++)
								{
									if (i > 0)
									{
										sOldOrder  += ",";
										sPositions += ",";
									}

									sOldOrder  += $(objRows[i]).attr("id");
									sPositions += $(objRows[i]).find("td:eq(0)").text( );
								}

								console.log("Old Order: " + sOldOrder);
								console.log("Positions: " + sPositions);
							},

			update       :  function( )
							{
//								console.log("After: " + objSortable.sortable("toArray"));

								var objRows   = objTable.fnGetNodes( );
								var sNewOrder = "";

								for (var i = 0; i < objRows.length; i ++)
								{
									if (i > 0)
										sNewOrder += ",";

									sNewOrder += $(objRows[i]).attr("id");
								}

								console.log("New Order: " + sNewOrder);

								if (sOldOrder == sNewOrder)
									return;
							}
		});
*/

    var sOldOrder = "";
    var sPositions = "";

    $(sGrid).tableDnD({
      onDragStart: function (sTable, sRow) {
        var sRows = sTable.tBodies[0].rows;

        sOldOrder = "";
        sPositions = "";

        for (var i = 0; i < sRows.length; i++) {
          if (i > 0) {
            sOldOrder += ",";
            sPositions += ",";
          }

          sOldOrder += sRows[i].id;
          sPositions += $(sRows[i]).find("td:eq(0)").text();
        }
      },

      onDrop: function (sTable, sRow) {
        var sRows = sTable.tBodies[0].rows;
        var sNewOrder = "";

        for (var i = 0; i < sRows.length; i++) {
          if (i > 0) sNewOrder += ",";

          sNewOrder += sRows[i].id;
        }

        if (sOldOrder == sNewOrder) return;

        $.post(
          "ajax/save-sort-order.php",
          { Records: sNewOrder, Table: $(sGrid).attr("rel") },

          function (sResponse) {
            var sParams = sResponse.split("|-|");

            showMessage(sMsgDiv, sParams[0], sParams[1]);

            var iPositions = sPositions.split(",");

            $(sGrid + " td.position").each(function (iIndex) {
              var objRow = objTable.fnGetPosition($(this).closest("tr")[0]);

              objTable.fnUpdate(iPositions[iIndex], objRow, 0);
            });

            $(sRow).trigger("click");
          },

          "text"
        );
      },
    });
  }
}

function parseDate(sDate, bAddDay) {
  if (typeof bAddDay === "undefined") bAddDay = false;

  if (typeof sDate === "undefined") return "";

  var sDateFields = sDate.split("-");
  var iYear = parseInt(sDateFields[0]);
  var iMonth = parseInt(sDateFields[1]) - 1;
  var iDay = parseInt(sDateFields[2]);
  var objDate = new Date(iYear, iMonth, iDay);

  return new Date(objDate.getTime() + (bAddDay == true ? 86400000 : 0));
}

function parseDateTime(sDateTime) {
  if (typeof sDateTime === "undefined") return "";

  var sDateTimeFields = sDateTime.split("-");
  var sDateFields = sDateTimeFields[0].split("-");
  var sTimeFields = sDateTimeFields[1].split(":");

  var iYear = parseInt(sDateFields[0]);
  var iMonth = parseInt(sDateFields[1]) - 1;
  var iDay = parseInt(sDateFields[2]);

  var iHours = parseInt(sTimeFields[0]);
  var iMinutes = parseInt(sTimeFields[1]);
  var iSeconds = parseInt(sTimeFields[2]);

  return new Date(iYear, iMonth, iDay, iHours, iMinutes, iSeconds);
}

function saveAttachment(sIndex, sType, objFile) {
  var objForm = new FormData();

  objForm.append("Type", sType);
  objForm.append("file" + sType, objFile);

  $.ajax({
    xhr: function () {
      var objXhr = new window.XMLHttpRequest();

      objXhr.upload.addEventListener(
        "progress",
        function (event) {
          if (event.lengthComputable) {
            var fPercentage = (event.loaded / event.total) * 100;

            $("#UploadProgress" + sIndex + " .progressBar").width(
              fPercentage + "%"
            );
            $("#UploadProgress" + sIndex + " .progressBar").html(
              fPercentage + "%"
            );
          }
        },
        false
      );

      return objXhr;
    },

    type: "POST",
    url: "ajax/save-attachment.php",
    data: objForm,
    contentType: false,
    cache: false,
    processData: false,

    beforeSend: function () {
      $("#UploadProgress" + sIndex + " .progressBar").width("0%");
      $("#UploadProgress" + sIndex + " .progressBar").html("0%");

      $("#Attachment" + sIndex)
        .find(".browseField")
        .addClass("hidden");
      $("#Attachment" + sIndex)
        .find(".btnRemove")
        .addClass("hidden");

      $("#Attachment" + sIndex)
        .find(".uploadProgress")
        .removeClass("hidden");
      $("#Attachment" + sIndex)
        .find(".btnRemove")
        .parent()
        .append("<img src='images/backup.gif' width='20' alt='' title='' />");
    },

    error: function () {
      $("#Attachment" + sIndex)
        .find(".uploadProgress")
        .addClass("hidden");
      $("#Attachment" + sIndex)
        .find(".browseField")
        .val("")
        .removeClass("hidden")
        .css("border", "solid 1px #dd0000");

      $("#Attachment" + sIndex)
        .find(".btnRemove")
        .removeClass("hidden");
      $("#Attachment" + sIndex)
        .find(".btnRemove")
        .parent()
        .find("img")
        .remove();
    },

    success: function (sResponse) {
      if (sResponse == "OK") {
        $("#Attachment" + sIndex)
          .find(".file")
          .val(objFile.name);
        $("#UploadProgress" + sIndex + " .progressBar").html(objFile.name);
        $("#UploadProgress" + sIndex + " .progressBar").addClass("uploaded");
      } else {
        $("#Attachment" + sIndex)
          .find(".uploadProgress")
          .addClass("hidden");
        $("#Attachment" + sIndex)
          .find(".browseField")
          .val("")
          .removeClass("hidden")
          .css("border", "solid 1px #dd0000");
      }

      $("#Attachment" + sIndex)
        .find(".btnRemove")
        .removeClass("hidden");
      $("#Attachment" + sIndex)
        .find(".btnRemove")
        .parent()
        .find("img")
        .remove();
    },
  });
}

function deleteAttachment(sFile) {
  if (sFile == "") return;

  $.post(
    "ajax/delete-attachment.php",
    { File: sFile },

    function (sResponse) {},

    "text"
  );
}

function deleteAttachmentEntry(sIndex) {
  $("#Attachments #Attachment" + sIndex).remove();

  $("#Attachments .attachment").each(function (iIndex) {
    $(this)
      .find(".serial")
      .html(iIndex + 1 + ".");
    $(this)
      .find(".btnIcon")
      .attr("id", iIndex + 1);
    $(this)
      .find(".title")
      .attr("id", "txtAttachment" + (iIndex + 1));
    $(this)
      .find(".title")
      .attr("name", "txtAttachment" + (iIndex + 1));
    $(this)
      .find(".picture")
      .attr("id", "filePicture" + (iIndex + 1));
    $(this)
      .find(".picture")
      .attr("name", "filePicture" + (iIndex + 1));
    $(this)
      .find(".document")
      .attr("id", "fileDocument" + (iIndex + 1));
    $(this)
      .find(".document")
      .attr("name", "fileDocument" + (iIndex + 1));
    $(this)
      .find(".file")
      .attr("id", "txtFile" + (iIndex + 1));
    $(this)
      .find(".file")
      .attr("name", "txtFile" + (iIndex + 1));
    $(this)
      .find(".uploadProgress")
      .attr("id", "UploadProgress" + (iIndex + 1));
    $(this)
      .find(".video")
      .attr("id", "txtVideo" + (iIndex + 1));
    $(this)
      .find(".video")
      .attr("name", "txtVideo" + (iIndex + 1));
    $(this)
      .find(".link")
      .attr("id", "txtLink" + (iIndex + 1));
    $(this)
      .find(".link")
      .attr("name", "txtLink" + (iIndex + 1));
    $(this)
      .find(".btnRemove")
      .attr("id", iIndex + 1);
    $(this).attr("id", "Attachment" + (iIndex + 1));
  });

  if ($("#Attachments .attachment").length == 0)
    $("#Attachments").html(
      "<p>&bull; No Picture/Document/Video/Link Attached</p>"
    );
}
