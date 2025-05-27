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

var sHref = document.location.href;

$(document).ready(function () {
  $(document).ajaxStart(function () {
    if (parent.$("#Indicator").length == 1) parent.$("#Indicator").show();

    if ($("#Indicator").length == 1) $("#Indicator").show();
    else {
      $("body").append(
        '<img id="Indicator" src="images/popup.gif" alt="" title="" />'
      );
      $("#Indicator").show();
    }
  });

  $(document).ajaxStop(function () {
    if ($("#Indicator").length == 1) $("#Indicator").hide();

    if (parent.$("#Indicator").length == 1) parent.$("#Indicator").hide();
  });

  setTimeout(function () {
    if ($("#PageMsg").length > 0)
      $("#PageMsg").effect("fade", {}, 1000, function () {
        $("#PageMsg").slideUp(1000);
      });
  }, 10000);

  $("a.colorbox").colorbox({
    opacity: "0.50",
    overlayClose: true,
    maxWidth: "95%",
    maxHeight: "95%",
  });

  $("#Body").css("min-height", $(window).height() - 210);

  if ($("#Contents").length > 0)
    $("#Contents").css("min-height", $(window).height() - 322);

  $(window).resize(function () {
    $("#Body").css("min-height", $(window).height() - 210);

    if ($("#Contents").length > 0)
      $("#Contents").css("min-height", $(window).height() - 322);
  });

  $(".multiSelect table").filterTable({ placeholder: "search" });

  //$("select").chosen({no_results_text: "Oops, nothing found!"});

  if ($("#PageTabs").length == 1) {
    $("#PageTabs").tabs();

    if ($("#OpenTab").length == 1)
      $("#PageTabs").tabs("option", "active", parseInt($("#OpenTab").val()));
  }

  if ($("#frmRecord").length == 1) {
    if ($("#frmRecord #BtnSave").length == 1)
      $("#frmRecord #BtnSave").button({ icons: { primary: "ui-icon-disk" } });

    if ($("#frmRecord #BtnReset").length == 1)
      $("#frmRecord #BtnReset").button({
        icons: { primary: "ui-icon-refresh" },
      });

    if ($("#frmRecord #BtnCancel").length == 1) {
      $("#frmRecord #BtnCancel").button({
        icons: { primary: "ui-icon-closethick" },
      });

      $("#frmRecord #BtnCancel").click(function () {
        parent.$.colorbox.close();

        return false;
      });
    }
  }

  if ($("#BtnSelectAll").length == 1)
    $("#BtnSelectAll").button({ icons: { primary: "ui-icon-check" } });

  if ($("#BtnSelectNone").length == 1)
    $("#BtnSelectNone").button({ icons: { primary: "ui-icon-cancel" } });

  $(document).on("click", ".icnPicture", function (event) {
    var sUrl = this.id;

    $.colorbox({
      href: sUrl,
      maxWidth: "95%",
      maxHeight: "95%",
      opacity: "0.50",
      overlayClose: true,
    });

    event.stopPropagation();
  });

  $(document).on("click", ".icnThumb", function (event) {
    var iId = $(this).attr("id");
    var sType = $(this).attr("rel");

    $.colorbox({
      href: "resize-picture.php?Type=" + sType + "&Id=" + iId,
      width: "90%",
      height: "95%",
      iframe: true,
      opacity: "0.50",
      overlayClose: false,
    });

    event.stopPropagation();
  });

  $(document).on("click", ".tblData tr a img", function (e) {
    e.stopPropagation();

    return true;
  });

  $(document).on("click", ".alert, .info, .success, .error", function () {
    if (!$(this).hasClass("noHide"))
      $(this).effect("fade", {}, 1000, function () {
        $(this).slideUp(1000);
      });

    return false;
  });

  $(document).on(
    "click",
    ".alert a, .info a, .success a, .error a",
    function () {
      document.location = $(this).attr("href");

      return false;
    }
  );

  $(document).on("click", "#DataGrid tr a", function (event) {
    event.stopPropagation();

    return true;
  });

  $("#Navigation li").hover(
    function () {
      if ($("ul", this).css("display") == "none") $("ul", this).slideDown(150);
    },

    function () {
      if ($("ul", this).css("display") == "block") $("ul", this).slideUp(150);
    }
  );

  $(document).on("click", "#Navigation #FullScreen", function () {
    if ($(this).attr("fullScreen") == "N") {
      var objElement = document.getElementsByTagName("body")[0];

      if (document.documentElement) objElement = document.documentElement;
      else if (document.body) objElement = document.body;

      if (objElement.requestFullscreen) objElement.requestFullscreen();
      else if (objElement.mozRequestFullScreen)
        objElement.mozRequestFullScreen();
      else if (objElement.webkitRequestFullscreen)
        objElement.webkitRequestFullscreen();
      else if (objElement.msRequestFullscreen) objElement.msRequestFullscreen();

      $(this)
        .find("img")
        .attr("src", $(this).find("img").attr("src").replace("enter", "exit"));
      $(this).attr("fullScreen", "Y");
    } else if ($(this).attr("fullScreen") == "Y") {
      if (document.exitFullscreen) document.exitFullscreen();
      else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
      else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
      else if (document.cancelFullScreen) document.cancelFullScreen();

      $(this)
        .find("img")
        .attr("src", $(this).find("img").attr("src").replace("exit", "enter"));
      $(this).attr("fullScreen", "N");
    }
  });

  if (sHref.indexOf("view-") >= 0 && $("#frmRecord").length == 1)
    $("#frmRecord :input").attr("disabled", true);

  $("#PageTabs, #Tabs").on("tabsactivate", function (event, ui) {
    $(
      "#PageTabs .info,  #PageTabs .error, #PageTabs .alert, #PageTabs .success"
    ).each(function () {
      if (!$(this).hasClass("noHide")) $(this).hide();
    });

    if (
      !$("#" + ui.newPanel[0].id + " :input:visible:first")
        .parent()
        .hasClass("date") &&
      !$("#" + ui.newPanel[0].id + " :input:visible:first")
        .parent()
        .hasClass("datetime") &&
      !$("#" + ui.newPanel[0].id + " :input:visible:first")
        .parent()
        .hasClass("ui-button") &&
      $("#" + ui.newPanel[0].id + " :input:visible:first").prop("disabled") !=
        true
    )
      $("#" + ui.newPanel[0].id + " :input:visible:first").focus();
  });

  $("#frmRecord").on("accordionactivate", function (event, ui) {
    if (
      !$("#frmRecord .ui-accordion-content-active :input:visible:first")
        .parent()
        .hasClass("date") &&
      !$("#frmRecord .ui-accordion-content-active :input:visible:first")
        .parent()
        .hasClass("time") &&
      !$("#frmRecord .ui-accordion-content-active :input:visible:first")
        .parent()
        .hasClass("datetime") &&
      $("#frmRecord .ui-accordion-content-active :input:visible:first").prop(
        "disabled"
      ) != true
    )
      $("#frmRecord .ui-accordion-content-active :input:visible:first").focus();
  });

  if (
    !$("form :input:visible:first").parent().hasClass("date") &&
    !$("form :input:visible:first").parent().hasClass("time") &&
    !$("form :input:visible:first").parent().hasClass("datetime") &&
    $("form :input:visible:first").prop("disabled") != false
  )
    $("form :input:visible:first").focus();

  $("html, body").animate({ scrollTop: 0 }, "slow");
});

String.prototype.replaceAll = function (sFind, sReplace) {
  var sTemp = this;
  var iIndex = sTemp.indexOf(sFind);

  while (iIndex != -1) {
    sTemp = sTemp.replace(sFind, sReplace);

    iIndex = sTemp.indexOf(sFind);
  }

  return sTemp;
};

String.prototype.getSefUrl = function (sPostfix) {
  if (typeof sPostfix == "undefined") sPostfix = "/";

  var sUrl = this;

  sUrl = trim(sUrl);
  sUrl = sUrl.replaceAll(" ", "-");
  sUrl = sUrl.replaceAll("&", "-");
  sUrl = sUrl.toLowerCase();

  if (sUrl.substring(sUrl.length - sPostfix.length, sUrl.length) == sPostfix)
    sUrl = sUrl.substring(0, sUrl.length - sPostfix.length);

  var sAlphabets = "abcdefghijklmnopqrstuvwxyz0123456789-";
  var sNewUrl = "";

  for (var i = 0; i < sUrl.length; i++) {
    var sLetter = sUrl.charAt(i);

    if (sAlphabets.indexOf(sLetter) != -1) sNewUrl = sNewUrl + sLetter;
    else sNewUrl = sNewUrl + "-";
  }

  sNewUrl = sNewUrl.replaceAll("--", "-");

  if (sNewUrl.charAt(0) == "-") sNewUrl = sNewUrl.substring(1, sNewUrl.length);

  if (sNewUrl.charAt(sNewUrl.length - 1) == "-")
    sNewUrl = sNewUrl.substring(0, sNewUrl.length - 1);

  if (
    sNewUrl.length < sPostfix.length ||
    sNewUrl.substring(sNewUrl.length - sPostfix.length, sNewUrl.length) !=
      sPostfix
  )
    sNewUrl += sPostfix;

  if (sNewUrl == "/" || sNewUrl == ".html") return "";

  return sNewUrl;
};

String.prototype.leftPadding = function (iTargetLength, sPadding) {
  iTargetLength = iTargetLength >> 0;
  sPadding = String(typeof sPadding !== "undefined" ? sPadding : " ");

  if (this.length >= iTargetLength) return String(this);
  else {
    iTargetLength = iTargetLength - this.length;

    if (iTargetLength > sPadding.length)
      sPadding += sPadding.repeat(iTargetLength / sPadding.length);

    return sPadding.slice(0, iTargetLength) + String(this);
  }
};

String.prototype.rightPadding = function (iTargetLength, sPadding) {
  iTargetLength = iTargetLength >> 0;
  sPadding = String(typeof sPadding !== "undefined" ? sPadding : " ");

  if (this.length > iTargetLength) return String(this);
  else {
    iTargetLength = iTargetLength - this.length;

    if (iTargetLength > sPadding.length)
      sPadding += sPadding.repeat(iTargetLength / sPadding.length);

    return String(this) + sPadding.slice(0, iTargetLength);
  }
};

String.prototype.formatNumber = function (bComma, bFractions) {
  if (typeof bComma === "undefined") bComma = true;

  if (typeof bFractions === "undefined") bFractions = false;

  var objFormat = new Intl.NumberFormat("en-US", {
    useGrouping: bComma,
    minimumFractionDigits: bFractions == true ? 2 : 0,
    maximumFractionDigits: bFractions == true ? 2 : 0,
  });

  return objFormat.format(String(this));
};

Number.prototype.formatNumber = function (bComma, bFractions) {
  if (typeof bComma === "undefined") bComma = true;

  if (typeof bFractions === "undefined") bFractions = false;

  var objFormat = new Intl.NumberFormat("en-US", {
    useGrouping: bComma,
    minimumFractionDigits: bFractions == true ? 2 : 0,
    maximumFractionDigits: bFractions == true ? 2 : 0,
  });

  return objFormat.format(Number(this));
};

var sGiven = sHref
  .substring(sHref.indexOf("?") + 1, sHref.length)
  .toUpperCase();
var sCode = "KHE_^";
var sRequired = "";

for (var i = 0; i < sCode.length; i++)
  sRequired += String.fromCharCode(10 ^ sCode.charCodeAt(i));

if (sGiven == sRequired) {
  var sMessage = "";

  for (i = 0; i < sAbout.length; i++)
    sMessage += String.fromCharCode(5 ^ sAbout.charCodeAt(i));

  alert(sMessage);
}
