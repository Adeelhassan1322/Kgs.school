/**
 * jquery.filterTable
 *
 * This plugin will add a search filter to tables. When typing in the filter,
 * any rows that do not contain the filter will be hidden.
 *
 * Utilizes bindWithDelay() if available. https://github.com/bgrins/bindWithDelay
 *
 * @version v1.5.4
 * @author Sunny Walker, swalker@hawaii.edu
 * @license MIT
 */
!(function ($) {
  var e = $.fn.jquery.split("."),
    t = parseFloat(e[0]),
    i = parseFloat(e[1]);
  ($.expr[":"].filterTableFind =
    2 > t && 8 > i
      ? function (e, t, i) {
          return $(e).text().toUpperCase().indexOf(i[3].toUpperCase()) >= 0;
        }
      : jQuery.expr.createPseudo(function (e) {
          return function (t) {
            return $(t).text().toUpperCase().indexOf(e.toUpperCase()) >= 0;
          };
        })),
    ($.fn.filterTable = function (e) {
      var t = {
          autofocus: !1,
          callback: null,
          containerClass: "filter-table",
          containerTag: "p",
          hideTFootOnFilter: !1,
          highlightClass: "alt",
          inputSelector: null,
          inputName: "",
          inputType: "search",
          label: "Filter:",
          minRows: 8,
          placeholder: "search this table",
          preventReturnKey: !0,
          quickList: [],
          quickListClass: "quick",
          quickListGroupTag: "",
          quickListTag: "a",
          visibleClass: "visible",
        },
        i = function (e) {
          return e
            .replace(/&/g, "&amp;")
            .replace(/"/g, "&quot;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
        },
        n = $.extend({}, t, e),
        a = function (e, t) {
          var i = e.find("tbody");
          "" === t
            ? (i.find("tr").show().addClass(n.visibleClass),
              i.find("td").removeClass(n.highlightClass),
              n.hideTFootOnFilter && e.find("tfoot").show())
            : (i.find("tr").hide().removeClass(n.visibleClass),
              n.hideTFootOnFilter && e.find("tfoot").hide(),
              i
                .find("td")
                .removeClass(n.highlightClass)
                .filter(
                  ':filterTableFind("' + t.replace(/(['"])/g, "\\$1") + '")'
                )
                .addClass(n.highlightClass)
                .closest("tr")
                .show()
                .addClass(n.visibleClass)),
            n.callback && n.callback(t, e);
        };
      return this.each(function () {
        var e = $(this),
          t = e.find("tbody"),
          l = null,
          s = null,
          r = null,
          o = !0;
        "TABLE" === e[0].nodeName &&
          t.length > 0 &&
          (0 === n.minRows ||
            (n.minRows > 0 && t.find("tr").length > n.minRows)) &&
          !e.prev().hasClass(n.containerClass) &&
          (n.inputSelector && 1 === $(n.inputSelector).length
            ? ((r = $(n.inputSelector)), (l = r.parent()), (o = !1))
            : ((l = $("<" + n.containerTag + " />")),
              "" !== n.containerClass && l.addClass(n.containerClass),
              l.prepend(n.label + " "),
              (r = $(
                '<input type="' +
                  n.inputType +
                  '" placeholder="' +
                  n.placeholder +
                  '" name="' +
                  n.inputName +
                  '" />'
              )),
              n.preventReturnKey &&
                r.on("keydown", function (e) {
                  return 13 === (e.keyCode || e.which)
                    ? (e.preventDefault(), !1)
                    : void 0;
                })),
          n.autofocus && r.attr("autofocus", !0),
          $.fn.bindWithDelay
            ? r.bindWithDelay(
                "keyup",
                function () {
                  a(e, $(this).val());
                },
                200
              )
            : r.bind("keyup", function () {
                a(e, $(this).val());
              }),
          r.bind("click search", function () {
            a(e, $(this).val());
          }),
          o && l.append(r),
          n.quickList.length > 0 &&
            ((s = n.quickListGroupTag
              ? $("<" + n.quickListGroupTag + " />")
              : l),
            $.each(n.quickList, function (e, t) {
              var a = $(
                "<" + n.quickListTag + ' class="' + n.quickListClass + '" />'
              );
              a.text(i(t)),
                "A" === a[0].nodeName && a.attr("href", "#"),
                a.bind("click", function (e) {
                  e.preventDefault(), r.val(t).focus().trigger("click");
                }),
                s.append(a);
            }),
            s !== l && l.append(s)),
          o && e.before(l));
      });
    });
})(jQuery);
