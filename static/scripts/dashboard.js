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

var bGraphShown = false;

$(document).ready(function () {
  initControls();

  $(document).on("click", "#ToggleSwitch", function () {
    if ($(this).find("input").prop("checked") == true) {
      if ($("#DashboardGraphs").css("display") != "block")
        $("#DashboardGraphs").show("blind");

      if ($("#DashboardIcons").css("display") == "block")
        $("#DashboardIcons").hide("blind");

      $.cookie($("#DashboardGraphs").attr("rel"), "Y", {
        httponly: false,
        secure: $("base").attr("server") == "prod" ? true : false,
      });

      showGraphs($("#DashboardGraphs").attr("rel"));
    } else {
      if ($("#DashboardIcons").css("display") != "block")
        $("#DashboardIcons").show("blind");

      if ($("#DashboardGraphs").css("display") == "block")
        $("#DashboardGraphs").hide("blind");

      $.cookie($("#DashboardGraphs").attr("rel"), "N", {
        httponly: false,
        secure: $("base").attr("server") == "prod" ? true : false,
      });

      $("#Body").css("min-height", "auto");

      if ($("#Contents").length > 0) $("#Contents").css("min-height", "auto");

      setTimeout(function () {
        $("#Body").css("min-height", $(window).height() - 210);

        if ($("#Contents").length > 0)
          $("#Contents").css("min-height", $(window).height() - 322);
      }, 100);
    }
  });

  $(document).on("click", "#BtnFilter", function () {
    $("#BtnFilter").attr("disabled", true);

    $.post(
      document.location,
      {
        Ajax: "Y",
        Schools: $("#ddSchools").val(),
      },

      function (sResponse) {
        bGraphShown = false;

        $("#DashboardGraphs").html(sResponse);

        showGraphs($("#DashboardGraphs").attr("rel"));
        initControls();
      },

      "text"
    );
  });

  if ($.cookie($("#DashboardGraphs").attr("rel")) == "Y")
    showGraphs($("#DashboardGraphs").attr("rel"));
});

function initControls() {
  $(".count").each(function () {
    $(this)
      .prop("Counter", 0)
      .animate(
        {
          Counter: $(this).text(),
        },

        {
          duration: 500,
          easing: "swing",

          step: function (iIndex) {
            $(this).text(Math.ceil(iIndex));
          },
        }
      );
  });

  $(".chart").easyPieChart({
    size: 90,
    lineWidth: 6,
    animate: 2500,
    trackColor: "#eeeeee",
    scaleColor: "#aaaaaa",
    easing: "easeOutBounce",

    onStep: function (from, to, percent) {
      $(this.el).find(".percent").text(Math.round(percent));
    },
  });

  if (
    $("#EmployeePresent").length == 1 &&
    $("#EmployeePresent").hasClass("chart")
  )
    $("#EmployeePresent").data("easyPieChart").options.barColor = "#00a65a";

  if (
    $("#StudentPresent").length == 1 &&
    $("#StudentPresent").hasClass("chart")
  )
    $("#StudentPresent").data("easyPieChart").options.barColor = "#00a65a";

  if ($("#EmployeeLeave").length == 1 && $("#EmployeeLeave").hasClass("chart"))
    $("#EmployeeLeave").data("easyPieChart").options.barColor = "#ebde06";

  if ($("#StudentLeave").length == 1 && $("#StudentLeave").hasClass("chart"))
    $("#StudentLeave").data("easyPieChart").options.barColor = "#ebde06";

  if ($("#DashboardFilters").length == 1) {
    if ($("#ddSchools").length == 1) {
      $("#ddSchools").chosen({
        disable_search_threshold: 10,
        width: "99%",
      });
    }

    $("#BtnFilter").button({ icons: { primary: "ui-icon-refresh" } });
  }
}

function showGraphs(sDashboard) {
  if (bGraphShown == true) return;

  if (sDashboard == "MainDashboard") {
    google.charts.setOnLoadCallback(setupBillingChart);
    google.charts.setOnLoadCallback(setupPayrollChart);
    google.charts.setOnLoadCallback(setupPettyCashChart);
    google.charts.setOnLoadCallback(setupClassStrengthChart);
    google.charts.setOnLoadCallback(setupLocationChart);
  } else if (sDashboard == "StudentsDashboard") {
    google.charts.setOnLoadCallback(setupYearStatsChart);
    google.charts.setOnLoadCallback(setupClassWiseChart);
    google.charts.setOnLoadCallback(setupNationalityChart);
    google.charts.setOnLoadCallback(setupReligionChart);
    google.charts.setOnLoadCallback(setupGendersChart);
    google.charts.setOnLoadCallback(setupGraduatesChart);
    google.charts.setOnLoadCallback(setupAreaWiseChart);
  } else if (sDashboard == "PettyCashDashboard") {
    google.charts.setOnLoadCallback(setupMonthlySummaryChart);
    google.charts.setOnLoadCallback(setupYearlySummaryChart);
  } else if (sDashboard == "BillingDashboard") {
    google.charts.setOnLoadCallback(setupDayWiseCollectionChart);
    google.charts.setOnLoadCallback(setupFeeCategoriessChart);
    google.charts.setOnLoadCallback(setupMonthlyBillingChart);
    google.charts.setOnLoadCallback(setupYearlyBillingChart);
  } else if (sDashboard == "HrDashboard") {
    google.charts.setOnLoadCallback(setupYearStatsChart);
    google.charts.setOnLoadCallback(setupSubjectWiseChart);
    google.charts.setOnLoadCallback(setupDepartmentsChart);
    google.charts.setOnLoadCallback(setupNationalityChart);
    google.charts.setOnLoadCallback(setupReligionChart);
    google.charts.setOnLoadCallback(setupGendersChart);
    google.charts.setOnLoadCallback(setupAreaWiseChart);
  } else if (sDashboard == "PayrollDashboard") {
    google.charts.setOnLoadCallback(setupPayrollSummaryChart);
    google.charts.setOnLoadCallback(setupLoanSummaryChart);
    google.charts.setOnLoadCallback(setupYearlySummaryChart);
  }

  bGraphShown = true;
}
