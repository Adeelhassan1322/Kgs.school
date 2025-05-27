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

var objTable;
var sFromDate = "";
var sToDate = "";

$(document).ready(function () {
  $("#frmRecord #BtnSame").button({ icons: { primary: "ui-icon-copy" } });
  $("#BtnImport").button({ icons: { primary: "ui-icon-transferthick-e-w" } });

  $("#BtnImport").click(function () {
    $.colorbox({
      href: "students/import-students.php",
      width: "400px",
      height: "250",
      iframe: true,
      opacity: "0.50",
      overlayClose: false,
    });
  });

  $("#frmRecord").accordion({
    collapsible: false,
    header: "h3",
    heightStyle: "content",
    icons: {
      header: "ui-icon-circle-arrow-e",
      activeHeader: "ui-icon-circle-arrow-s",
    },
  });

  $(
    "#frmRecord #txtDob, #frmQuick #txtQuickDob, #frmRecord #txtStartDate, #frmRecord #txtEndDate, #frmRecord #txtStartDate2, #frmRecord #txtEndDate2, #frmRecord #txtLatDate"
  ).datepicker({
    showOn: "both",
    buttonImage: "images/icons/calendar.gif",
    buttonImageOnly: true,
    dateFormat: "yy-mm-dd",
    changeYear: true,
    yearRange: "-30:+0",
  });

  $("#frmRecord #txtJoiningDate, #frmQuick #txtQuickJoiningDate").datepicker({
    showOn: "both",
    buttonImage: "images/icons/calendar.gif",
    buttonImageOnly: true,
    dateFormat: "yy-mm-dd",
    minDate: parseDate($("#frmRecord #txtJoiningDate").attr("date"), true),
  });

  $(
    "#frmRecord #txtRegistrationDate, #frmQuick #txtQuickRegistrationDate"
  ).datepicker({
    showOn: "both",
    buttonImage: "images/icons/calendar.gif",
    buttonImageOnly: true,
    dateFormat: "yy-mm-dd",
    minDate: parseDate($("#frmRecord #txtRegistrationDate").attr("date"), true),
  });

  $("#frmRecord #txtDob, #frmQuick #txtQuickDob").mask("9999-99-99");
  $("#frmRecord #txtJoiningDate, #frmQuick #txtQuickJoiningDate").mask(
    "9999-99-99"
  );
  $(
    "#frmRecord #txtRegistrationDate, #frmQuick #txtQuickRegistrationDate"
  ).mask("9999-99-99");

  $("#frmRecord #txtPhone, #frmQuick #txtQuickPhone").mask("999-99999999");
  $("#frmRecord #txtMobile, #frmQuick #txtQuickMobile").mask("0399-9999999");
  $("#frmRecord #txtFatherCnicNo, #frmQuick #txtQuickFatherCnicNo").mask(
    "99999-9999999-9"
  );
  $("#frmRecord #txtFatherNtn").mask("9999999-9");
  $("#frmRecord #txtFatherPhone").mask("999-99999999");
  $("#frmRecord #txtFatherMobile").mask("0399-9999999");
  $("#frmRecord #txtMotherCnicNo, #frmQuick #txtQuickMotherCnicNo").mask(
    "99999-9999999-9"
  );
  $("#frmRecord #txtMotherNtn").mask("9999999-9");
  $("#frmRecord #txtMotherPhone").mask("999-99999999");
  $("#frmRecord #txtMotherMobile").mask("0399-9999999");
  $("#frmRecord #txtEmergencyPhone").mask("999-99999999");
  $("#frmRecord #txtEmergencyMobile").mask("0399-9999999");

  $("#frmRecord #BtnSame").click(function () {
    $("#frmRecord #txtFatherAddress").val($("#frmRecord #txtAddress").val());
    $("#frmRecord #ddFatherLocation").val($("#frmRecord #ddLocation").val());
    $("#frmRecord #txtFatherPostalCode").val(
      $("#frmRecord #txtPostalCode").val()
    );

    $("#frmRecord #txtMotherAddress").val($("#frmRecord #txtAddress").val());
    $("#frmRecord #ddMotherLocation").val($("#frmRecord #ddLocation").val());
    $("#frmRecord #txtMotherPostalCode").val(
      $("#frmRecord #txtPostalCode").val()
    );

    return false;
  });

  $("#frmRecord #txtRegistrationNo").blur(function () {
    if ($("#frmRecord #txtRegistrationNo").val() == "") return;

    $.post(
      "ajax/students/check-student.php",
      { RegistrationNo: $("#frmRecord #txtRegistrationNo").val() },

      function (sResponse) {
        if (sResponse == "USED") {
          showMessage(
            "#frmRecord #RecordMsg",
            "info",
            "The specified Registration No is already used. Please specify another Registration No."
          );

          $("#frmRecord #DuplicateStudent").val("1");
        } else {
          $("#frmRecord #RecordMsg").hide();
          $("#frmRecord #DuplicateStudent").val("0");
        }
      },

      "text"
    );
  });

  $("#frmRecord #ddSchool").change(function () {
    getClassSectionsList("#frmRecord #ddSchool", "#frmRecord #ddClass");

    $("#frmRecord #txtRegistrationNo").val("");

    if ($(this).val() == 10) $(".law").removeClass("hidden");
    else $(".law").addClass("hidden");

    if ($("#frmRecord #ddSchool").val() == "") return;

    $.post(
      "ajax/students/get-registration-no.php",
      { School: $("#frmRecord #ddSchool").val() },

      function (sResponse) {
        $("#frmRecord #txtRegistrationNo").val(sResponse);
      },

      "text"
    );
  });

  $("#frmRecord #BtnReset").click(function () {
    $("#frmRecord")[0].reset();
    $("#frmRecord #RecordMsg").hide();

    $("#frmRecord").accordion("option", "active", 0);
    $("#frmRecord #txtName").focus();

    return false;
  });

  $("#frmRecord").submit(function () {
    var objFV = new FormValidator("frmRecord", "RecordMsg");

    if (!objFV.validate("txtName", "B", "Please enter the Student Name.")) {
      $("#frmRecord").accordion("option", "active", 0);

      return false;
    }

    if (!objFV.validate("ddGender", "B", "Please select the Gender.")) {
      $("#frmRecord").accordion("option", "active", 0);

      return false;
    }

    if (!objFV.validate("txtDob", "B", "Please select the Date of Birth.")) {
      $("#frmRecord").accordion("option", "active", 0);

      return false;
    }

    if (objFV.value("filePicture") != "") {
      if (!checkImage(objFV.value("filePicture"))) {
        showMessage(
          "#RecordMsg",
          "alert",
          "Invalid File Format. Please select an image file of type jpg, gif or png."
        );

        objFV.focus("filePicture");
        objFV.select("filePicture");

        $("#frmRecord").accordion("option", "active", 0);

        return false;
      }
    }

    if (!objFV.validate("txtAddress", "B", "Please enter the Address.")) {
      $("#frmRecord").accordion("option", "active", 1);

      return false;
    }

    if (!objFV.validate("ddLocation", "B", "Please select the City/Town.")) {
      $("#frmRecord").accordion("option", "active", 1);

      return false;
    }

    if (!objFV.validate("txtMobile", "B", "Please enter the Mobile No.")) {
      $("#frmRecord").accordion("option", "active", 1);

      return false;
    }

    if (
      !objFV.validate("txtEmail", "E", "Please enter the valid Email Address.")
    ) {
      $("#frmRecord").accordion("option", "active", 1);

      return false;
    }

    if (!objFV.validate("ddSchool", "B", "Please select the School.")) {
      $("#frmRecord").accordion("option", "active", 2);

      return false;
    }

    if (!objFV.validate("ddClass", "B", "Please select the Class/Section.")) {
      $("#frmRecord").accordion("option", "active", 2);

      return false;
    }

    if (
      !objFV.validate(
        "txtRegistrationNo",
        "B",
        "Please enter the Registration No."
      )
    ) {
      $("#frmRecord").accordion("option", "active", 2);

      return false;
    }

    if (
      !objFV.validate(
        "txtRegistrationDate",
        "B",
        "Please select the Registration Date."
      )
    ) {
      $("#frmRecord").accordion("option", "active", 2);

      return false;
    }

    var objMinRegistrationDate = parseDate(
      $("#frmRecord #txtRegistrationDate").attr("date")
    );
    var objRegistrationDate = parseDate(
      $("#frmRecord #txtRegistrationDate").val()
    );

    if (objRegistrationDate.getTime() <= objMinRegistrationDate.getTime()) {
      showMessage(
        "#RecordMsg",
        "alert",
        "You cannot select this Registration Date (Old Dated entries are Restricted)."
      );

      $("#frmRecord").accordion("option", "active", 2);

      return false;
    }

    if (
      !objFV.validate("txtJoiningDate", "B", "Please select the Joining Date.")
    ) {
      $("#frmRecord").accordion("option", "active", 2);

      return false;
    }
    /*
		if (!objFV.validate("txtRollNo", "B", "Please enter the Student Roll No."))
		{
			$("#frmRecord").accordion("option", "active", 2);

			return false;
		}
*/

    var objMinJoiningDate = parseDate(
      $("#frmRecord #txtJoiningDate").attr("date")
    );
    var objJoiningDate = parseDate($("#frmRecord #txtJoiningDate").val());

    if (objJoiningDate.getTime() <= objMinJoiningDate.getTime()) {
      showMessage(
        "#RecordMsg",
        "alert",
        "You cannot select this Joining Date (Old Dated entries are Restricted)."
      );

      $("#frmRecord").accordion("option", "active", 2);

      return false;
    }

    if (objJoiningDate.getTime() < objRegistrationDate.getTime()) {
      showMessage(
        "#RecordMsg",
        "alert",
        "Invalid Joining Date, cannot be less than the Registration Date."
      );

      $("#frmRecord").accordion("option", "active", 2);

      return false;
    }

    if (
      !objFV.validate("txtFatherName", "B", "Please enter the Father Name.")
    ) {
      $("#frmRecord").accordion("option", "active", 3);

      return false;
    }

    if (!objFV.validate("txtFatherAddress", "B", "Please enter the Address.")) {
      $("#frmRecord").accordion("option", "active", 3);

      return false;
    }

    if (
      !objFV.validate("ddFatherLocation", "B", "Please select the City/Town.")
    ) {
      $("#frmRecord").accordion("option", "active", 3);

      return false;
    }

    if (
      !objFV.validate(
        "txtFatherEmail",
        "E",
        "Please enter the valid Email Address."
      )
    ) {
      $("#frmRecord").accordion("option", "active", 3);

      return false;
    }

    /*
		if (!objFV.validate("txtMotherName", "B", "Please enter the Mother Name."))
		{
			$("#frmRecord").accordion("option", "active", 4);

			return false;
		}

		if (!objFV.validate("txtMotherAddress", "B", "Please enter the Address."))
		{
			$("#frmRecord").accordion("option", "active", 4);

			return false;
		}

		if (!objFV.validate("ddMotherLocation", "B", "Please select the City/Town."))
		{
			$("#frmRecord").accordion("option", "active", 4);

			return false;
		}
*/
    if (
      !objFV.validate(
        "txtMotherEmail",
        "E",
        "Please enter the valid Email Address."
      )
    ) {
      $("#frmRecord").accordion("option", "active", 4);

      return false;
    }

    if (objFV.value("ddSchool") == "10") {
      if (
        !objFV.validate("txtLatDate", "B", "Please select the LAT Test Date.")
      ) {
        $("#frmRecord").accordion("option", "active", 6);

        return false;
      }

      if (
        !objFV.validate(
          "txtLatMarks",
          "B,N",
          "Please enter the valid LAT Marks."
        )
      ) {
        $("#frmRecord").accordion("otion", "active", 6);

        return false;
      }

      if (parseFloat(objFV.value("txtLatMarks")) < 50) {
        $("#frmRecord").accordion("otion", "active", 6);

        showMessage(
          "#RecordMsg",
          "info",
          "Please enter valid LAT Marks (minimum: 50)"
        );

        objFV.focus("txtLatMarks");
        objFV.select("txtLatMarks");

        return false;
      }

      if (
        !objFV.validate(
          "ddIntermediateYear",
          "B",
          "Please select the Intermediate Passing Year."
        )
      ) {
        $("#frmRecord").accordion("option", "active", 6);

        return false;
      }

      if (
        !objFV.validate(
          "txtIntermediateTotal",
          "B,N",
          "Please enter the valid Intermediate Total."
        )
      ) {
        $("#frmRecord").accordion("option", "active", 6);

        return false;
      }

      if (
        !objFV.validate(
          "txtIntermediateMarks",
          "B,N",
          "Please enter the valid Intermediate Marks."
        )
      ) {
        $("#frmRecord").accordion("option", "active", 6);

        return false;
      }

      if (
        parseFloat(objFV.value("txtIntermediateMarks")) <
        parseFloat(parseFloat(objFV.value("txtIntermediateTotal")) * 0.45)
      ) {
        $("#frmRecord").accordion("option", "active", 6);

        showMessage(
          "#RecordMsg",
          "info",
          "Please enter valid Obtained Marks (minimum: 45%)"
        );

        objFV.focus("txtIntermediateMarks");
        objFV.select("txtIntermediateMarks");

        return false;
      }
    }

    if (objFV.value("DuplicateStudent") == "1") {
      showMessage(
        "#frmRecord #RecordMsg",
        "info",
        "The specified Registration No is already used. Please specify another Registration No."
      );

      objFV.focus("txtRegistrationNo");
      objFV.select("txtRegistrationNo");

      return false;
    }

    $("#frmRecord #BtnSave").attr("disabled", true);
    $("#frmRecord #RecordMsg").hide();
  });

  $("#frmQuick #BtnSave").button({ icons: { primary: "ui-icon-disk" } });
  $("#frmQuick #BtnReset").button({ icons: { primary: "ui-icon-refresh" } });

  $("#frmQuick #txtQuickRegistrationNo").blur(function () {
    if ($("#frmQuick #txtQuickRegistrationNo").val() == "") return;

    $.post(
      "ajax/students/check-student.php",
      { RegistrationNo: $("#frmQuick #txtQuickRegistrationNo").val() },

      function (sResponse) {
        if (sResponse == "USED") {
          showMessage(
            "#frmQuick #QuickMsg",
            "info",
            "The specified Registration No is already used. Please specify another Registration No."
          );

          $("#frmQuick #DuplicateQuick").val("1");
        } else {
          $("#frmQuick #QuickMsg").hide();
          $("#frmQuick #DuplicateQuick").val("0");
        }
      },

      "text"
    );
  });

  $("#frmQuick #ddQuickSchool").change(function () {
    getClassSectionsList("#frmQuick #ddQuickSchool", "#frmQuick #ddQuickClass");

    $("#frmQuick #txtQuickRegistrationNo").val("");

    if ($("#frmQuick #ddQuickSchool").val() == "") return;

    $.post(
      "ajax/students/get-registration-no.php",
      { School: $("#frmQuick #ddQuickSchool").val() },

      function (sResponse) {
        $("#frmQuick #txtQuickRegistrationNo").val(sResponse);
      },

      "text"
    );
  });

  $("#frmQuick #BtnReset").click(function () {
    $("#frmQuick")[0].reset();
    $("#frmQuick #QuickMsg").hide();
    $("#frmQuick #txtQuickName").focus();

    return false;
  });

  $("#frmQuick").submit(function () {
    var objFV = new FormValidator("frmQuick", "QuickMsg");

    if (!objFV.validate("txtName", "B", "Please enter the Student Name."))
      return false;

    if (!objFV.validate("ddGender", "B", "Please select the Gender."))
      return false;

    if (!objFV.validate("txtDob", "B", "Please select the Date of Birth."))
      return false;

    if (objFV.value("filePicture") != "") {
      if (!checkImage(objFV.value("filePicture"))) {
        showMessage(
          "#QuickMsg",
          "alert",
          "Invalid File Format. Please select an image file of type jpg, gif or png."
        );

        objFV.focus("filePicture");
        objFV.select("filePicture");

        return false;
      }
    }

    if (!objFV.validate("txtAddress", "B", "Please enter the Address."))
      return false;

    if (!objFV.validate("ddLocation", "B", "Please select the City/Town."))
      return false;

    if (!objFV.validate("txtMobile", "B", "Please enter the Mobile No."))
      return false;

    if (!objFV.validate("txtFatherName", "B", "Please enter the Father Name."))
      return false;

    /*
		if (!objFV.validate("txtMotherName", "B", "Please enter the Mother Name."))
			return false;
*/

    if (!objFV.validate("ddSchool", "B", "Please select the School."))
      return false;

    if (!objFV.validate("ddClass", "B", "Please select the Class/Section."))
      return false;

    if (
      !objFV.validate(
        "txtRegistrationNo",
        "B",
        "Please enter the Registration No."
      )
    )
      return false;

    if (
      !objFV.validate(
        "txtRegistrationDate",
        "B",
        "Please select the Registration Date."
      )
    )
      return false;

    var objMinRegistrationDate = parseDate(
      $("#frmQuick #txtQuickRegistrationDate").attr("date")
    );
    var objRegistrationDate = parseDate(
      $("#frmQuick #txtQuickRegistrationDate").val()
    );

    if (objRegistrationDate.getTime() <= objMinRegistrationDate.getTime()) {
      showMessage(
        "#frmQuick #QuickMsg",
        "alert",
        "You cannot select this Registration Date (Old Dated entries are Restricted)."
      );

      return false;
    }

    if (
      !objFV.validate("txtJoiningDate", "B", "Please select the Joining Date.")
    )
      return false;

    var objMinJoiningDate = parseDate(
      $("#frmQuick #txtQuickJoiningDate").attr("date")
    );
    var objJoiningDate = parseDate($("#frmQuick #txtQuickJoiningDate").val());

    if (objJoiningDate.getTime() <= objMinJoiningDate.getTime()) {
      showMessage(
        "#frmQuick #QuickMsg",
        "alert",
        "You cannot select this Joining Date (Old Dated entries are Restricted)."
      );

      return false;
    }

    if (objJoiningDate.getTime() < objRegistrationDate.getTime()) {
      showMessage(
        "#frmQuick #QuickMsg",
        "alert",
        "Invalid Joining Date, cannot be less than the Registration Date."
      );

      return false;
    }

    if (objFV.value("DuplicateQuick") == "1") {
      showMessage(
        "#frmQuick #QuickMsg",
        "info",
        "The specified Registration No is already used. Please specify another Registration No."
      );

      objFV.focus("txtRegistrationNo");
      objFV.select("txtRegistrationNo");

      return false;
    }

    $("#frmQuick #BtnSave").attr("disabled", true);
    $("#frmQuick #QuickMsg").hide();
  });

  if (parseInt($("#TotalRecords").val()) > 100) {
    $("#frmFilters #BtnApply").button({
      icons: { primary: "ui-icon-refresh" },
    });
    $("#frmFilters #BtnRemove")
      .button({ icons: { primary: "ui-icon-cancel" } })
      .attr("disabled", true);

    $("#frmFilters #txtFromDate, #frmFilters #txtToDate").datepicker({
      showOn: "both",
      buttonImage: "images/icons/calendar.gif",
      buttonImageOnly: true,
      dateFormat: "yy-mm-dd",
    });

    $("#frmFilters #BtnApply").click(function () {
      $("#BtnMultiDelete").hide();

      if (
        $("#frmFilters #txtFromDate").val() == "" ||
        $("#frmFilters #txtToDate").val() == ""
      )
        return;

      if (
        $("#frmFilters #txtFromDate").val() == sFromDate &&
        $("#frmFilters #txtToDate").val() == sToDate
      )
        return;

      sFromDate = $("#frmFilters #txtFromDate").val();
      sToDate = $("#frmFilters #txtToDate").val();

      objTable.fnFilter($(this).val(), 0);
      $("#frmFilters #BtnRemove").attr("disabled", false);
    });

    $("#frmFilters #BtnRemove").click(function () {
      $("#frmFilters #txtFromDate, #frmFilters #txtToDate").val("");

      if (sFromDate == "" || sToDate == "") return;

      sFromDate = "";
      sToDate = "";

      $("#BtnMultiDelete").hide();

      objTable.fnFilter($(this).val(), 0);
      $("#frmFilters #BtnRemove").attr("disabled", true);
    });

    objTable = $("#DataGrid").dataTable({
      sDom: '<"H"f<"toolbar"><"TableTools">>t<"F"ip>',
      aoColumnDefs: [{ bSortable: false, aTargets: [8] }],
      oLanguage: {
        sEmptyTable: "No record found",
        sInfoEmpty: "0 records",
        sZeroRecords: "No matching record found",
      },
      aaSorting: [[0, "desc"]],
      bJQueryUI: true,
      sPaginationType: "full_numbers",
      bPaginate: true,
      bLengthChange: false,
      iDisplayLength: parseInt($("#RecordsPerPage").val()),
      bFilter: true,
      bSort: true,
      bInfo: true,
      bStateSave: false,
      bProcessing: false,
      bAutoWidth: false,
      bServerSide: true,
      sAjaxSource: "ajax/students/get-students.php",

      fnServerData: function (sSource, aoData, fnCallback) {
        if ($("div.toolbar #School").length > 0)
          aoData.push({
            name: "School",
            value: $("div.toolbar #School").val(),
          });

        if ($("div.toolbar #Class").length > 0)
          aoData.push({ name: "Class", value: $("div.toolbar #Class").val() });

        if ($("div.toolbar #Session").length > 0)
          aoData.push({
            name: "Session",
            value: $("div.toolbar #Session").val(),
          });

        if ($("div.toolbar #Status").length > 0)
          aoData.push({
            name: "Status",
            value: $("div.toolbar #Status").val(),
          });

        if (sFromDate != "")
          aoData.push({ name: "FromDate", value: sFromDate });

        if (sToDate != "") aoData.push({ name: "ToDate", value: sToDate });

        $.getJSON(sSource, aoData, function (jsonData) {
          fnCallback(jsonData);

          $("#DataGrid tbody tr").each(function (iIndex) {
            $(this).attr("id", $(this).find("img:first-child").attr("id"));
            $(this).find("td:first-child").addClass("position");
          });
        });
      },

      fnDrawCallback: function () {
        $(".details").tipTip();
      },

      fnInitComplete: function () {
        $.post(
          "ajax/students/get-student-filters.php",
          {},

          function (sResponse) {
            $("div.toolbar").html(sResponse);
          },

          "text"
        );

        var iSchool = 0;
        var iClass = 0;
        var iSession = 0;
        var iStatus = 0;

        $("#DataGrid thead tr th").each(function (iIndex) {
          if ($(this).text() == "School") iSchool = iIndex;

          if ($(this).text() == "Class/Section") iClass = iIndex;

          if ($(this).text() == "Session") iSession = iIndex;

          if ($(this).text() == "Status") iStatus = iIndex;
        });

        this.fnFilter("", iSchool);
        this.fnFilter("", iClass);
        this.fnFilter("", iSession);
        this.fnFilter("", iStatus);
      },
    });
  } else {
    objTable = $("#DataGrid").dataTable({
      sDom: '<"H"f<"toolbar"><"TableTools">>t<"F"ip>',
      aoColumnDefs: [{ bSortable: false, aTargets: [8] }],
      oLanguage: {
        sEmptyTable: "No record found",
        sInfoEmpty: "0 records",
        sZeroRecords: "No matching record found",
      },
      aaSorting: [[0, "desc"]],
      bJQueryUI: true,
      sPaginationType: "full_numbers",
      bPaginate: true,
      bLengthChange: false,
      iDisplayLength: parseInt($("#RecordsPerPage").val()),
      bFilter: true,
      bSort: true,
      bInfo: true,
      bStateSave: false,
      bProcessing: false,
      bAutoWidth: false,

      fnDrawCallback: function () {
        $(".details").tipTip();
      },

      fnInitComplete: function () {
        $.post(
          "ajax/students/get-student-filters.php",
          {},

          function (sResponse) {
            $("div.toolbar").html(sResponse);
          },

          "text"
        );

        var iSchool = 0;
        var iClass = 0;
        var iStatus = 0;

        $("#DataGrid thead tr th").each(function (iIndex) {
          if ($(this).text() == "School") iSchool = iIndex;

          if ($(this).text() == "Class/Section") iClass = iIndex;

          if ($(this).text() == "Status") iStatus = iIndex;
        });

        this.fnFilter("", iSchool);
        this.fnFilter("", iClass);
        this.fnFilter("Active", iStatus);
      },
    });
  }

  $(document).on("change", "div.toolbar #School", function () {
    var sStatus = $("div.toolbar #Status").val();

    $("div.toolbar #Class").val("");
    $("div.toolbar #Session").val("");

    var objRows = objTable.fnGetNodes();

    for (var i = 0; i < objRows.length; i++)
      $(objRows[i]).removeClass("selected");

    $("#BtnMultiDelete").hide();

    var iColumn = 0;

    $("#DataGrid thead tr th").each(function (iIndex) {
      if ($(this).text() == "School") iColumn = iIndex;
    });

    objTable.fnFilter($(this).val(), iColumn);

    if (parseInt($("#TotalRecords").val()) <= 100) {
      $("#DataGrid td.position").each(function (iIndex) {
        var objRow = objTable.fnGetPosition($(this).closest("tr")[0]);

        objTable.fnUpdate(iIndex + 1, objRow, 0);
      });

      objTable.fnDraw();
    }

    $.post(
      "ajax/students/get-student-filters.php",
      { School: $("div.toolbar #School").val(), Status: sStatus },

      function (sResponse) {
        $("div.toolbar").html(sResponse);
      },

      "text"
    );
  });

  $(document).on("change", "div.toolbar #Class", function () {
    var objRows = objTable.fnGetNodes();

    for (var i = 0; i < objRows.length; i++)
      $(objRows[i]).removeClass("selected");

    $("#BtnMultiDelete").hide();

    var iColumn = 0;

    $("#DataGrid thead tr th").each(function (iIndex) {
      if ($(this).text() == "Class/Section") iColumn = iIndex;
    });

    objTable.fnFilter($(this).val(), iColumn);

    if (parseInt($("#TotalRecords").val()) <= 100) {
      $("#DataGrid td.position").each(function (iIndex) {
        var objRow = objTable.fnGetPosition($(this).closest("tr")[0]);

        objTable.fnUpdate(iIndex + 1, objRow, 0);
      });

      objTable.fnDraw();
    }
  });

  $(document).on("change", "div.toolbar #Session", function () {
    var objRows = objTable.fnGetNodes();

    for (var i = 0; i < objRows.length; i++)
      $(objRows[i]).removeClass("selected");

    $("#BtnMultiDelete").hide();

    objTable.fnFilter($(this).val(), 0);
  });

  $(document).on("change", "div.toolbar #Status", function () {
    var objRows = objTable.fnGetNodes();

    for (var i = 0; i < objRows.length; i++)
      $(objRows[i]).removeClass("selected");

    $("#BtnMultiDelete").hide();

    var iColumn = 0;

    $("#DataGrid thead tr th").each(function (iIndex) {
      if ($(this).text() == "Status") iColumn = iIndex;
    });

    objTable.fnFilter($(this).val(), iColumn);

    if (parseInt($("#TotalRecords").val()) <= 100) {
      $("#DataGrid td.position").each(function (iIndex) {
        var objRow = objTable.fnGetPosition($(this).closest("tr")[0]);

        objTable.fnUpdate(iIndex + 1, objRow, 0);
      });

      objTable.fnDraw();
    }
  });

  $(document).on("click", "#DataGrid tr", function () {
    if ($(this).find("img.icnDelete").length == 0) return false;

    if ($(this).hasClass("selected")) $(this).removeClass("selected");
    else $(this).addClass("selected");

    var bSelected = false;
    var objRows = objTable.fnGetNodes();

    for (var i = 0; i < objRows.length; i++) {
      if ($(objRows[i]).hasClass("selected")) {
        bSelected = true;

        break;
      }
    }

    if (bSelected == true) $("#BtnMultiDelete").show();
    else $("#BtnMultiDelete").hide();
  });

  $(".TableTools").prepend(
    '<button id="BtnMultiDelete">Delete Selected Rows</button>'
  );
  $("#BtnMultiDelete").button({ icons: { primary: "ui-icon-trash" } });
  $("#BtnMultiDelete").hide();

  $("#BtnMultiDelete").click(function () {
    var sStudents = "";
    var objSelectedRows = new Array();

    var objRows = objTable.fnGetNodes();

    for (var i = 0; i < objRows.length; i++) {
      if ($(objRows[i]).hasClass("selected")) {
        if (sStudents != "") sStudents += ",";

        sStudents += objRows[i].id;

        objSelectedRows.push(objRows[i]);
      }
    }

    if (sStudents != "") {
      $("#ConfirmMultiDelete").dialog({
        resizable: false,
        width: 420,
        height: 110,
        modal: true,
        buttons: {
          Delete: function () {
            $.post(
              "ajax/students/delete-student.php",
              { Students: sStudents },

              function (sResponse) {
                var sParams = sResponse.split("|-|");

                showMessage("#GridMsg", sParams[0], sParams[1]);

                if (sParams[0] == "success") {
                  for (var i = 0; i < objSelectedRows.length; i++)
                    objTable.fnDeleteRow(objSelectedRows[i]);

                  $("#BtnMultiDelete").hide();
                }
              },

              "text"
            );

            $(this).dialog("close");
          },

          Cancel: function () {
            $(this).dialog("close");
          },
        },
      });
    }
  });

  $(document).on("click", ".icnEdit", function (event) {
    var iStudentId = this.id;
    var iIndex = objTable.fnGetPosition($(this).closest("tr")[0]);

    $.colorbox({
      href:
        "students/edit-student.php?StudentId=" +
        iStudentId +
        "&Index=" +
        iIndex,
      width: "95%",
      maxWidth: "95%",
      height: "730px",
      maxHeight: "90%",
      iframe: true,
      opacity: "0.50",
      overlayClose: false,
    });

    event.stopPropagation();
  });

  $(document).on("click", ".icnView", function (event) {
    var iStudentId = this.id;

    $.colorbox({
      href: "students/view-student.php?StudentId=" + iStudentId,
      width: "95%",
      maxWidth: "95%",
      height: "650px",
      maxHeight: "90%",
      iframe: true,
      opacity: "0.50",
      overlayClose: true,
    });

    event.stopPropagation();
  });

  $(document).on("click", ".icnDelete", function (event) {
    var iStudentId = this.id;
    var objRow = objTable.fnGetPosition($(this).closest("tr")[0]);

    $("#ConfirmDelete").dialog({
      resizable: false,
      width: 420,
      height: 110,
      modal: true,
      buttons: {
        Delete: function () {
          $.post(
            "ajax/students/delete-student.php",
            { Students: iStudentId },

            function (sResponse) {
              var sParams = sResponse.split("|-|");

              showMessage("#GridMsg", sParams[0], sParams[1]);

              if (sParams[0] == "success") objTable.fnDeleteRow(objRow);
            },

            "text"
          );

          $(this).dialog("close");
        },

        Cancel: function () {
          $(this).dialog("close");
        },
      },
    });

    event.stopPropagation();
  });
});

function updateRecord(iStudentId, iRow, sFields) {
  if (parseInt($("#TotalRecords").val()) <= 100) {
    $("#DataGrid thead tr th").each(function (iIndex) {
      if ($(this).text() == "Registration #")
        objTable.fnUpdate(sFields[0], iRow, iIndex);
      else if ($(this).text() == "Student")
        objTable.fnUpdate(sFields[1], iRow, iIndex);
      else if ($(this).text() == "Father")
        objTable.fnUpdate(sFields[2], iRow, iIndex);
      else if ($(this).text() == "Class/Section")
        objTable.fnUpdate(sFields[3], iRow, iIndex);
      else if ($(this).text() == "Gender" || $(this).text() == "School")
        objTable.fnUpdate(sFields[4], iRow, iIndex);
      else if ($(this).text() == "Options")
        objTable.fnUpdate(sFields[5], iRow, iIndex);
    });

    $(".details").tipTip();
  } else objTable.fnStandingRedraw();

  $.post(
    "ajax/students/get-student-filters.php",
    {},

    function (sResponse) {
      var sSchool = $("div.toolbar #School").val();
      var sClass = $("div.toolbar #Class").val();
      var sSession = $("div.toolbar #Session").val();
      var sStatus = $("div.toolbar #Status").val();

      $("div.toolbar").html(sResponse);

      $("div.toolbar #School").val(sSchool);
      $("div.toolbar #Class").val(sClass);
      $("div.toolbar #Session").val(sSession);
      $("div.toolbar #Status").val(sStatus);
    },

    "text"
  );
}

function updateOptions(iRow, sOptions) {
  $("#DataGrid thead tr th").each(function (iIndex) {
    if ($(this).text() == "Options") {
      objTable.fnUpdate(sOptions, iRow, iIndex);

      $(".details").tipTip();
    }
  });
}

function updateStudents() {
  objTable.fnDestroy();

  objTable = $("#DataGrid").dataTable({
    sDom: '<"H"f<"toolbar"><"TableTools">>t<"F"ip>',
    aoColumnDefs: [{ bSortable: false, aTargets: [7] }],
    oLanguage: {
      sEmptyTable: "No record found",
      sInfoEmpty: "0 records",
      sZeroRecords: "No matching record found",
    },
    aaSorting: [[0, "desc"]],
    bJQueryUI: true,
    sPaginationType: "full_numbers",
    bPaginate: true,
    bLengthChange: false,
    iDisplayLength: parseInt($("#RecordsPerPage").val()),
    bFilter: true,
    bSort: true,
    bInfo: true,
    bStateSave: false,
    bProcessing: false,
    bAutoWidth: false,
    bServerSide: true,
    sAjaxSource: "ajax/students/get-students.php",

    fnServerData: function (sSource, aoData, fnCallback) {
      if ($("div.toolbar #School").length > 0)
        aoData.push({ name: "School", value: $("div.toolbar #School").val() });

      if ($("div.toolbar #Class").length > 0)
        aoData.push({ name: "Class", value: $("div.toolbar #Class").val() });

      if ($("div.toolbar #Session").length > 0)
        aoData.push({
          name: "Session",
          value: $("div.toolbar #Session").val(),
        });

      if ($("div.toolbar #Status").length > 0)
        aoData.push({ name: "Status", value: $("div.toolbar #Status").val() });

      $.getJSON(sSource, aoData, function (jsonData) {
        fnCallback(jsonData);

        $("#DataGrid tbody tr").each(function (iIndex) {
          $(this).attr("id", $(this).find("img:first-child").attr("id"));
          $(this).find("td:first-child").addClass("position");
        });
      });
    },

    fnDrawCallback: function () {
      $(".details").tipTip();
    },

    fnInitComplete: function () {
      $.post(
        "ajax/students/get-student-filters.php",
        {},

        function (sResponse) {
          $("div.toolbar").html(sResponse);
        },

        "text"
      );

      var iSchool = 0;
      var iClass = 0;
      var iSession = 0;
      var iStatus = 0;

      $("#DataGrid thead tr th").each(function (iIndex) {
        if ($(this).text() == "School") iSchool = iIndex;

        if ($(this).text() == "Class/Section") iClass = iIndex;

        if ($(this).text() == "Session") iSession = iIndex;

        if ($(this).text() == "Status") iStatus = iIndex;
      });

      this.fnFilter("", iSchool);
      this.fnFilter("", iClass);
      this.fnFilter("", iSession);
      this.fnFilter("", iStatus);
    },
  });
}
