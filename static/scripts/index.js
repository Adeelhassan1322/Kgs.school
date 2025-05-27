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

$(document).ready(function () {
  $("#Tabs").tabs();
  $("#frmLogin button").button({ icons: { primary: "ui-icon-locked" } });
  $("#frmVerify button").button({ icons: { primary: "ui-icon-key" } });
  $("#frmPassword button").button({ icons: { primary: "ui-icon-key" } });

  if ($("base").attr("href").indexOf("localhost") == -1) {
    grecaptcha.ready(function () {
      grecaptcha
        .execute($("body").attr("reCaptchaSiteKey"), { action: "login" })
        .then(function (sToken) {
          $("#frmLogin #Token").val(sToken);
          $("#frmPassword #Token").val(sToken);
        });
    });
  }

  $("#frmLogin").submit(function () {
    var objFV = new FormValidator("frmLogin", "LoginMsg");

    if (
      !objFV.validate(
        "txtEmail",
        "B,E",
        "Please enter your Login Email Address."
      )
    )
      return false;

    if (
      !objFV.validate(
        "txtPassword",
        "B,L(4)",
        "Please enter the valid Password."
      )
    )
      return false;

    $("#BtnLogin").attr("disabled", true);

    $.post(
      "ajax/login.php",
      $("#frmLogin").serialize(),

      function (sResponse) {
        var sParams = sResponse.split("|-|");

        showMessage("#LoginMsg", sParams[0], sParams[1]);

        if (sParams[0] == "success") {
          if (sParams[1] == "2fa") {
            $("#frmLogin").hide();
            $("#frmVerify").show();

            $("#frmVerify #Email").text($("#frmLogin #txtEmail").val());
            $("#frmVerify #txtCode").focus();
          } else {
            $("#frmLogin :input").attr("disabled", true);

            var sLocation = new String(document.location);

            sLocation = sLocation.replace("index.php", "");
            sLocation = sLocation + sParams[2];

            document.location = sLocation;
          }
        } else {
          $("#BtnLogin").attr("disabled", false);

          if ($("base").attr("href").indexOf("localhost") == -1) {
            grecaptcha
              .execute($("body").attr("reCaptchaSiteKey"), { action: "login" })
              .then(function (sToken) {
                $("#frmLogin #Token").val(sToken);
              });
          }
        }
      },

      "text"
    );
  });

  $("#frmVerify").submit(function () {
    var objFV = new FormValidator("frmVerify", "VerifyMsg");

    if (
      !objFV.validate(
        "txtCode",
        "B,L(6)",
        "Please enter the 6 digit code to verify."
      )
    )
      return false;

    $("#BtnVerify").attr("disabled", true);

    $.post(
      "ajax/verify-2fa.php",
      { Code: $("#frmVerify #txtCode").val() },

      function (sResponse) {
        var sParams = sResponse.split("|-|");

        showMessage("#VerifyMsg", sParams[0], sParams[1]);

        if (sParams[0] == "success") {
          $("#frmVerify :input").attr("disabled", true);

          var sLocation = new String(document.location);

          sLocation = sLocation.replace("index.php", "");
          sLocation = sLocation + sParams[2];

          document.location = sLocation;
        } else {
          $("#frmVerify #EmailCode a").show();
          $("#frmVerify #txtCode").focus();

          $("#BtnVerify").attr("disabled", false);
        }
      },

      "text"
    );
  });

  $(document).on("click", "#frmVerify #EmailCode a", function () {
    $("#frmVerify #Sending").show();
    $("#frmVerify #EmailCode a").hide();

    $.post(
      "ajax/email-2fa.php",
      {},

      function (sResponse) {
        var sParams = sResponse.split("|-|");

        if (sParams[0] == "success") {
          $("#frmVerify #Sending").hide();
          $("#frmVerify #EmailCode span").text(sParams[1]);

          setTimeout(function () {
            $("#frmVerify #EmailCode span").text("");
            $("#frmVerify #EmailCode a").show();
          }, 60000);
        } else {
          $("#frmVerify #Sending").hide();
          $("#frmVerify #EmailCode a").show();

          showMessage("#VerifyMsg", sParams[0], sParams[1]);
        }
      },

      "text"
    );

    return false;
  });

  $("#frmPassword").submit(function () {
    var objFV = new FormValidator("frmPassword", "PasswordMsg");

    if (
      !objFV.validate(
        "txtLoginEmail",
        "B,E",
        "Please enter your Login Email Address."
      )
    )
      return false;

    $("#BtnPassword").attr("disabled", true);

    $.post(
      "ajax/password.php",
      $("#frmPassword").serialize(),

      function (sResponse) {
        var sParams = sResponse.split("|-|");

        showMessage("#PasswordMsg", sParams[0], sParams[1]);

        if (sParams[0] == "success noHide")
          $("#frmPassword :input").attr("disabled", true);
        else {
          $("#BtnPassword").attr("disabled", false);

          if ($("base").attr("href").indexOf("localhost") == -1) {
            grecaptcha
              .execute($("body").attr("reCaptchaSiteKey"), { action: "login" })
              .then(function (sToken) {
                $("#frmPassword #Token").val(sToken);
              });
          }
        }
      },

      "text"
    );
  });
});
