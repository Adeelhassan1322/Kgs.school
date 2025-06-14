/*
 * File:        jquery.dataTables.min.js
 * Version:     1.9.4
 * Author:      Allan Jardine (www.sprymedia.co.uk)
 * Info:        www.datatables.net
 *
 * Copyright 2008-2012 Allan Jardine, all rights reserved.
 *
 * This source file is free software, under either the GPL v2 license or a
 * BSD style license, available at:
 *   http://datatables.net/license_gpl2
 *   http://datatables.net/license_bsd
 *
 * This source file is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
 */
(function (X, l, n) {
  var L = function (h) {
    var j = function (e) {
      function o(a, b) {
        var c = j.defaults.columns,
          d = a.aoColumns.length,
          c = h.extend({}, j.models.oColumn, c, {
            sSortingClass: a.oClasses.sSortable,
            sSortingClassJUI: a.oClasses.sSortJUI,
            nTh: b ? b : l.createElement("th"),
            sTitle: c.sTitle ? c.sTitle : b ? b.innerHTML : "",
            aDataSort: c.aDataSort ? c.aDataSort : [d],
            mData: c.mData ? c.oDefaults : d,
          });
        a.aoColumns.push(c);
        if (a.aoPreSearchCols[d] === n || null === a.aoPreSearchCols[d])
          a.aoPreSearchCols[d] = h.extend({}, j.models.oSearch);
        else if (
          ((c = a.aoPreSearchCols[d]),
          c.bRegex === n && (c.bRegex = !0),
          c.bSmart === n && (c.bSmart = !0),
          c.bCaseInsensitive === n)
        )
          c.bCaseInsensitive = !0;
        m(a, d, null);
      }
      function m(a, b, c) {
        var d = a.aoColumns[b];
        c !== n &&
          null !== c &&
          (c.mDataProp && !c.mData && (c.mData = c.mDataProp),
          c.sType !== n && ((d.sType = c.sType), (d._bAutoType = !1)),
          h.extend(d, c),
          p(d, c, "sWidth", "sWidthOrig"),
          c.iDataSort !== n && (d.aDataSort = [c.iDataSort]),
          p(d, c, "aDataSort"));
        var i = d.mRender ? Q(d.mRender) : null,
          f = Q(d.mData);
        d.fnGetData = function (a, b) {
          var c = f(a, b);
          return d.mRender && b && "" !== b ? i(c, b, a) : c;
        };
        d.fnSetData = L(d.mData);
        a.oFeatures.bSort || (d.bSortable = !1);
        !d.bSortable ||
        (-1 == h.inArray("asc", d.asSorting) &&
          -1 == h.inArray("desc", d.asSorting))
          ? ((d.sSortingClass = a.oClasses.sSortableNone),
            (d.sSortingClassJUI = ""))
          : -1 == h.inArray("asc", d.asSorting) &&
            -1 == h.inArray("desc", d.asSorting)
          ? ((d.sSortingClass = a.oClasses.sSortable),
            (d.sSortingClassJUI = a.oClasses.sSortJUI))
          : -1 != h.inArray("asc", d.asSorting) &&
            -1 == h.inArray("desc", d.asSorting)
          ? ((d.sSortingClass = a.oClasses.sSortableAsc),
            (d.sSortingClassJUI = a.oClasses.sSortJUIAscAllowed))
          : -1 == h.inArray("asc", d.asSorting) &&
            -1 != h.inArray("desc", d.asSorting) &&
            ((d.sSortingClass = a.oClasses.sSortableDesc),
            (d.sSortingClassJUI = a.oClasses.sSortJUIDescAllowed));
      }
      function k(a) {
        if (!1 === a.oFeatures.bAutoWidth) return !1;
        da(a);
        for (var b = 0, c = a.aoColumns.length; b < c; b++)
          a.aoColumns[b].nTh.style.width = a.aoColumns[b].sWidth;
      }
      function G(a, b) {
        var c = r(a, "bVisible");
        return "number" === typeof c[b] ? c[b] : null;
      }
      function R(a, b) {
        var c = r(a, "bVisible"),
          c = h.inArray(b, c);
        return -1 !== c ? c : null;
      }
      function t(a) {
        return r(a, "bVisible").length;
      }
      function r(a, b) {
        var c = [];
        h.map(a.aoColumns, function (a, i) {
          a[b] && c.push(i);
        });
        return c;
      }
      function B(a) {
        for (var b = j.ext.aTypes, c = b.length, d = 0; d < c; d++) {
          var i = b[d](a);
          if (null !== i) return i;
        }
        return "string";
      }
      function u(a, b) {
        for (
          var c = b.split(","), d = [], i = 0, f = a.aoColumns.length;
          i < f;
          i++
        )
          for (var g = 0; g < f; g++)
            if (a.aoColumns[i].sName == c[g]) {
              d.push(g);
              break;
            }
        return d;
      }
      function M(a) {
        for (var b = "", c = 0, d = a.aoColumns.length; c < d; c++)
          b += a.aoColumns[c].sName + ",";
        return b.length == d ? "" : b.slice(0, -1);
      }
      function ta(a, b, c, d) {
        var i, f, g, e, w;
        if (b)
          for (i = b.length - 1; 0 <= i; i--) {
            var j = b[i].aTargets;
            h.isArray(j) ||
              D(
                a,
                1,
                "aTargets must be an array of targets, not a " + typeof j
              );
            f = 0;
            for (g = j.length; f < g; f++)
              if ("number" === typeof j[f] && 0 <= j[f]) {
                for (; a.aoColumns.length <= j[f]; ) o(a);
                d(j[f], b[i]);
              } else if ("number" === typeof j[f] && 0 > j[f])
                d(a.aoColumns.length + j[f], b[i]);
              else if ("string" === typeof j[f]) {
                e = 0;
                for (w = a.aoColumns.length; e < w; e++)
                  ("_all" == j[f] || h(a.aoColumns[e].nTh).hasClass(j[f])) &&
                    d(e, b[i]);
              }
          }
        if (c) {
          i = 0;
          for (a = c.length; i < a; i++) d(i, c[i]);
        }
      }
      function H(a, b) {
        var c;
        c = h.isArray(b) ? b.slice() : h.extend(!0, {}, b);
        var d = a.aoData.length,
          i = h.extend(!0, {}, j.models.oRow);
        i._aData = c;
        a.aoData.push(i);
        for (var f, i = 0, g = a.aoColumns.length; i < g; i++)
          (c = a.aoColumns[i]),
            "function" === typeof c.fnRender &&
            c.bUseRendered &&
            null !== c.mData
              ? F(a, d, i, S(a, d, i))
              : F(a, d, i, v(a, d, i)),
            c._bAutoType &&
              "string" != c.sType &&
              ((f = v(a, d, i, "type")),
              null !== f &&
                "" !== f &&
                ((f = B(f)),
                null === c.sType
                  ? (c.sType = f)
                  : c.sType != f && "html" != c.sType && (c.sType = "string")));
        a.aiDisplayMaster.push(d);
        a.oFeatures.bDeferRender || ea(a, d);
        return d;
      }
      function ua(a) {
        var b, c, d, i, f, g, e;
        if (a.bDeferLoading || null === a.sAjaxSource)
          for (b = a.nTBody.firstChild; b; ) {
            if ("TR" == b.nodeName.toUpperCase()) {
              c = a.aoData.length;
              b._DT_RowIndex = c;
              a.aoData.push(h.extend(!0, {}, j.models.oRow, { nTr: b }));
              a.aiDisplayMaster.push(c);
              f = b.firstChild;
              for (d = 0; f; ) {
                g = f.nodeName.toUpperCase();
                if ("TD" == g || "TH" == g)
                  F(a, c, d, h.trim(f.innerHTML)), d++;
                f = f.nextSibling;
              }
            }
            b = b.nextSibling;
          }
        i = T(a);
        d = [];
        b = 0;
        for (c = i.length; b < c; b++)
          for (f = i[b].firstChild; f; )
            (g = f.nodeName.toUpperCase()),
              ("TD" == g || "TH" == g) && d.push(f),
              (f = f.nextSibling);
        c = 0;
        for (i = a.aoColumns.length; c < i; c++) {
          e = a.aoColumns[c];
          null === e.sTitle && (e.sTitle = e.nTh.innerHTML);
          var w = e._bAutoType,
            o = "function" === typeof e.fnRender,
            k = null !== e.sClass,
            n = e.bVisible,
            m,
            p;
          if (w || o || k || !n) {
            g = 0;
            for (b = a.aoData.length; g < b; g++)
              (f = a.aoData[g]),
                (m = d[g * i + c]),
                w &&
                  "string" != e.sType &&
                  ((p = v(a, g, c, "type")),
                  "" !== p &&
                    ((p = B(p)),
                    null === e.sType
                      ? (e.sType = p)
                      : e.sType != p &&
                        "html" != e.sType &&
                        (e.sType = "string"))),
                e.mRender
                  ? (m.innerHTML = v(a, g, c, "display"))
                  : e.mData !== c && (m.innerHTML = v(a, g, c, "display")),
                o &&
                  ((p = S(a, g, c)),
                  (m.innerHTML = p),
                  e.bUseRendered && F(a, g, c, p)),
                k && (m.className += " " + e.sClass),
                n
                  ? (f._anHidden[c] = null)
                  : ((f._anHidden[c] = m), m.parentNode.removeChild(m)),
                e.fnCreatedCell &&
                  e.fnCreatedCell.call(
                    a.oInstance,
                    m,
                    v(a, g, c, "display"),
                    f._aData,
                    g,
                    c
                  );
          }
        }
        if (0 !== a.aoRowCreatedCallback.length) {
          b = 0;
          for (c = a.aoData.length; b < c; b++)
            (f = a.aoData[b]),
              A(a, "aoRowCreatedCallback", null, [f.nTr, f._aData, b]);
        }
      }
      function I(a, b) {
        return b._DT_RowIndex !== n ? b._DT_RowIndex : null;
      }
      function fa(a, b, c) {
        for (var b = J(a, b), d = 0, a = a.aoColumns.length; d < a; d++)
          if (b[d] === c) return d;
        return -1;
      }
      function Y(a, b, c, d) {
        for (var i = [], f = 0, g = d.length; f < g; f++)
          i.push(v(a, b, d[f], c));
        return i;
      }
      function v(a, b, c, d) {
        var i = a.aoColumns[c];
        if ((c = i.fnGetData(a.aoData[b]._aData, d)) === n)
          return (
            a.iDrawError != a.iDraw &&
              null === i.sDefaultContent &&
              (D(
                a,
                0,
                "Requested unknown parameter " +
                  ("function" == typeof i.mData
                    ? "{mData function}"
                    : "'" + i.mData + "'") +
                  " from the data source for row " +
                  b
              ),
              (a.iDrawError = a.iDraw)),
            i.sDefaultContent
          );
        if (null === c && null !== i.sDefaultContent) c = i.sDefaultContent;
        else if ("function" === typeof c) return c();
        return "display" == d && null === c ? "" : c;
      }
      function F(a, b, c, d) {
        a.aoColumns[c].fnSetData(a.aoData[b]._aData, d);
      }
      function Q(a) {
        if (null === a)
          return function () {
            return null;
          };
        if ("function" === typeof a)
          return function (b, d, i) {
            return a(b, d, i);
          };
        if (
          "string" === typeof a &&
          (-1 !== a.indexOf(".") || -1 !== a.indexOf("["))
        ) {
          var b = function (a, d, i) {
            var f = i.split("."),
              g;
            if ("" !== i) {
              var e = 0;
              for (g = f.length; e < g; e++) {
                if ((i = f[e].match(U))) {
                  f[e] = f[e].replace(U, "");
                  "" !== f[e] && (a = a[f[e]]);
                  g = [];
                  f.splice(0, e + 1);
                  for (var f = f.join("."), e = 0, h = a.length; e < h; e++)
                    g.push(b(a[e], d, f));
                  a = i[0].substring(1, i[0].length - 1);
                  a = "" === a ? g : g.join(a);
                  break;
                }
                if (null === a || a[f[e]] === n) return n;
                a = a[f[e]];
              }
            }
            return a;
          };
          return function (c, d) {
            return b(c, d, a);
          };
        }
        return function (b) {
          return b[a];
        };
      }
      function L(a) {
        if (null === a) return function () {};
        if ("function" === typeof a)
          return function (b, d) {
            a(b, "set", d);
          };
        if (
          "string" === typeof a &&
          (-1 !== a.indexOf(".") || -1 !== a.indexOf("["))
        ) {
          var b = function (a, d, i) {
            var i = i.split("."),
              f,
              g,
              e = 0;
            for (g = i.length - 1; e < g; e++) {
              if ((f = i[e].match(U))) {
                i[e] = i[e].replace(U, "");
                a[i[e]] = [];
                f = i.slice();
                f.splice(0, e + 1);
                g = f.join(".");
                for (var h = 0, j = d.length; h < j; h++)
                  (f = {}), b(f, d[h], g), a[i[e]].push(f);
                return;
              }
              if (null === a[i[e]] || a[i[e]] === n) a[i[e]] = {};
              a = a[i[e]];
            }
            a[i[i.length - 1].replace(U, "")] = d;
          };
          return function (c, d) {
            return b(c, d, a);
          };
        }
        return function (b, d) {
          b[a] = d;
        };
      }
      function Z(a) {
        for (var b = [], c = a.aoData.length, d = 0; d < c; d++)
          b.push(a.aoData[d]._aData);
        return b;
      }
      function ga(a) {
        a.aoData.splice(0, a.aoData.length);
        a.aiDisplayMaster.splice(0, a.aiDisplayMaster.length);
        a.aiDisplay.splice(0, a.aiDisplay.length);
        y(a);
      }
      function ha(a, b) {
        for (var c = -1, d = 0, i = a.length; d < i; d++)
          a[d] == b ? (c = d) : a[d] > b && a[d]--;
        -1 != c && a.splice(c, 1);
      }
      function S(a, b, c) {
        var d = a.aoColumns[c];
        return d.fnRender(
          {
            iDataRow: b,
            iDataColumn: c,
            oSettings: a,
            aData: a.aoData[b]._aData,
            mDataProp: d.mData,
          },
          v(a, b, c, "display")
        );
      }
      function ea(a, b) {
        var c = a.aoData[b],
          d;
        if (null === c.nTr) {
          c.nTr = l.createElement("tr");
          c.nTr._DT_RowIndex = b;
          c._aData.DT_RowId && (c.nTr.id = c._aData.DT_RowId);
          c._aData.DT_RowClass && (c.nTr.className = c._aData.DT_RowClass);
          for (var i = 0, f = a.aoColumns.length; i < f; i++) {
            var g = a.aoColumns[i];
            d = l.createElement(g.sCellType);
            d.innerHTML =
              "function" === typeof g.fnRender &&
              (!g.bUseRendered || null === g.mData)
                ? S(a, b, i)
                : v(a, b, i, "display");
            null !== g.sClass && (d.className = g.sClass);
            g.bVisible
              ? (c.nTr.appendChild(d), (c._anHidden[i] = null))
              : (c._anHidden[i] = d);
            g.fnCreatedCell &&
              g.fnCreatedCell.call(
                a.oInstance,
                d,
                v(a, b, i, "display"),
                c._aData,
                b,
                i
              );
          }
          A(a, "aoRowCreatedCallback", null, [c.nTr, c._aData, b]);
        }
      }
      function va(a) {
        var b, c, d;
        if (0 !== h("th, td", a.nTHead).length) {
          b = 0;
          for (d = a.aoColumns.length; b < d; b++)
            if (
              ((c = a.aoColumns[b].nTh),
              c.setAttribute("role", "columnheader"),
              a.aoColumns[b].bSortable &&
                (c.setAttribute("tabindex", a.iTabIndex),
                c.setAttribute("aria-controls", a.sTableId)),
              null !== a.aoColumns[b].sClass &&
                h(c).addClass(a.aoColumns[b].sClass),
              a.aoColumns[b].sTitle != c.innerHTML)
            )
              c.innerHTML = a.aoColumns[b].sTitle;
        } else {
          var i = l.createElement("tr");
          b = 0;
          for (d = a.aoColumns.length; b < d; b++)
            (c = a.aoColumns[b].nTh),
              (c.innerHTML = a.aoColumns[b].sTitle),
              c.setAttribute("tabindex", "0"),
              null !== a.aoColumns[b].sClass &&
                h(c).addClass(a.aoColumns[b].sClass),
              i.appendChild(c);
          h(a.nTHead).html("")[0].appendChild(i);
          V(a.aoHeader, a.nTHead);
        }
        h(a.nTHead).children("tr").attr("role", "row");
        if (a.bJUI) {
          b = 0;
          for (d = a.aoColumns.length; b < d; b++) {
            c = a.aoColumns[b].nTh;
            i = l.createElement("div");
            i.className = a.oClasses.sSortJUIWrapper;
            h(c).contents().appendTo(i);
            var f = l.createElement("span");
            f.className = a.oClasses.sSortIcon;
            i.appendChild(f);
            c.appendChild(i);
          }
        }
        if (a.oFeatures.bSort)
          for (b = 0; b < a.aoColumns.length; b++)
            !1 !== a.aoColumns[b].bSortable
              ? ia(a, a.aoColumns[b].nTh, b)
              : h(a.aoColumns[b].nTh).addClass(a.oClasses.sSortableNone);
        "" !== a.oClasses.sFooterTH &&
          h(a.nTFoot)
            .children("tr")
            .children("th")
            .addClass(a.oClasses.sFooterTH);
        if (null !== a.nTFoot) {
          c = N(a, null, a.aoFooter);
          b = 0;
          for (d = a.aoColumns.length; b < d; b++)
            c[b] &&
              ((a.aoColumns[b].nTf = c[b]),
              a.aoColumns[b].sClass && h(c[b]).addClass(a.aoColumns[b].sClass));
        }
      }
      function W(a, b, c) {
        var d,
          i,
          f,
          g = [],
          e = [],
          h = a.aoColumns.length,
          j;
        c === n && (c = !1);
        d = 0;
        for (i = b.length; d < i; d++) {
          g[d] = b[d].slice();
          g[d].nTr = b[d].nTr;
          for (f = h - 1; 0 <= f; f--)
            !a.aoColumns[f].bVisible && !c && g[d].splice(f, 1);
          e.push([]);
        }
        d = 0;
        for (i = g.length; d < i; d++) {
          if ((a = g[d].nTr)) for (; (f = a.firstChild); ) a.removeChild(f);
          f = 0;
          for (b = g[d].length; f < b; f++)
            if (((j = h = 1), e[d][f] === n)) {
              a.appendChild(g[d][f].cell);
              for (
                e[d][f] = 1;
                g[d + h] !== n && g[d][f].cell == g[d + h][f].cell;

              )
                (e[d + h][f] = 1), h++;
              for (; g[d][f + j] !== n && g[d][f].cell == g[d][f + j].cell; ) {
                for (c = 0; c < h; c++) e[d + c][f + j] = 1;
                j++;
              }
              g[d][f].cell.rowSpan = h;
              g[d][f].cell.colSpan = j;
            }
        }
      }
      function x(a) {
        var b = A(a, "aoPreDrawCallback", "preDraw", [a]);
        if (-1 !== h.inArray(!1, b)) E(a, !1);
        else {
          var c,
            d,
            b = [],
            i = 0,
            f = a.asStripeClasses.length;
          c = a.aoOpenRows.length;
          a.bDrawing = !0;
          a.iInitDisplayStart !== n &&
            -1 != a.iInitDisplayStart &&
            ((a._iDisplayStart = a.oFeatures.bServerSide
              ? a.iInitDisplayStart
              : a.iInitDisplayStart >= a.fnRecordsDisplay()
              ? 0
              : a.iInitDisplayStart),
            (a.iInitDisplayStart = -1),
            y(a));
          if (a.bDeferLoading) (a.bDeferLoading = !1), a.iDraw++;
          else if (a.oFeatures.bServerSide) {
            if (!a.bDestroying && !wa(a)) return;
          } else a.iDraw++;
          if (0 !== a.aiDisplay.length) {
            var g = a._iDisplayStart;
            d = a._iDisplayEnd;
            a.oFeatures.bServerSide && ((g = 0), (d = a.aoData.length));
            for (; g < d; g++) {
              var e = a.aoData[a.aiDisplay[g]];
              null === e.nTr && ea(a, a.aiDisplay[g]);
              var j = e.nTr;
              if (0 !== f) {
                var o = a.asStripeClasses[i % f];
                e._sRowStripe != o &&
                  (h(j).removeClass(e._sRowStripe).addClass(o),
                  (e._sRowStripe = o));
              }
              A(a, "aoRowCallback", null, [
                j,
                a.aoData[a.aiDisplay[g]]._aData,
                i,
                g,
              ]);
              b.push(j);
              i++;
              if (0 !== c)
                for (e = 0; e < c; e++)
                  if (j == a.aoOpenRows[e].nParent) {
                    b.push(a.aoOpenRows[e].nTr);
                    break;
                  }
            }
          } else
            (b[0] = l.createElement("tr")),
              a.asStripeClasses[0] && (b[0].className = a.asStripeClasses[0]),
              (c = a.oLanguage),
              (f = c.sZeroRecords),
              1 == a.iDraw && null !== a.sAjaxSource && !a.oFeatures.bServerSide
                ? (f = c.sLoadingRecords)
                : c.sEmptyTable &&
                  0 === a.fnRecordsTotal() &&
                  (f = c.sEmptyTable),
              (c = l.createElement("td")),
              c.setAttribute("valign", "top"),
              (c.colSpan = t(a)),
              (c.className = a.oClasses.sRowEmpty),
              (c.innerHTML = ja(a, f)),
              b[i].appendChild(c);
          A(a, "aoHeaderCallback", "header", [
            h(a.nTHead).children("tr")[0],
            Z(a),
            a._iDisplayStart,
            a.fnDisplayEnd(),
            a.aiDisplay,
          ]);
          A(a, "aoFooterCallback", "footer", [
            h(a.nTFoot).children("tr")[0],
            Z(a),
            a._iDisplayStart,
            a.fnDisplayEnd(),
            a.aiDisplay,
          ]);
          i = l.createDocumentFragment();
          c = l.createDocumentFragment();
          if (a.nTBody) {
            f = a.nTBody.parentNode;
            c.appendChild(a.nTBody);
            if (
              !a.oScroll.bInfinite ||
              !a._bInitComplete ||
              a.bSorted ||
              a.bFiltered
            )
              for (; (c = a.nTBody.firstChild); ) a.nTBody.removeChild(c);
            c = 0;
            for (d = b.length; c < d; c++) i.appendChild(b[c]);
            a.nTBody.appendChild(i);
            null !== f && f.appendChild(a.nTBody);
          }
          A(a, "aoDrawCallback", "draw", [a]);
          a.bSorted = !1;
          a.bFiltered = !1;
          a.bDrawing = !1;
          a.oFeatures.bServerSide && (E(a, !1), a._bInitComplete || $(a));
        }
      }
      function aa(a) {
        a.oFeatures.bSort
          ? O(a, a.oPreviousSearch)
          : a.oFeatures.bFilter
          ? K(a, a.oPreviousSearch)
          : (y(a), x(a));
      }
      function xa(a) {
        var b = h("<div></div>")[0];
        a.nTable.parentNode.insertBefore(b, a.nTable);
        a.nTableWrapper = h(
          '<div id="' +
            a.sTableId +
            '_wrapper" class="' +
            a.oClasses.sWrapper +
            '" role="grid"></div>'
        )[0];
        a.nTableReinsertBefore = a.nTable.nextSibling;
        for (
          var c = a.nTableWrapper,
            d = a.sDom.split(""),
            i,
            f,
            g,
            e,
            w,
            o,
            k,
            m = 0;
          m < d.length;
          m++
        ) {
          f = 0;
          g = d[m];
          if ("<" == g) {
            e = h("<div></div>")[0];
            w = d[m + 1];
            if ("'" == w || '"' == w) {
              o = "";
              for (k = 2; d[m + k] != w; ) (o += d[m + k]), k++;
              "H" == o
                ? (o = a.oClasses.sJUIHeader)
                : "F" == o && (o = a.oClasses.sJUIFooter);
              -1 != o.indexOf(".")
                ? ((w = o.split(".")),
                  (e.id = w[0].substr(1, w[0].length - 1)),
                  (e.className = w[1]))
                : "#" == o.charAt(0)
                ? (e.id = o.substr(1, o.length - 1))
                : (e.className = o);
              m += k;
            }
            c.appendChild(e);
            c = e;
          } else if (">" == g) c = c.parentNode;
          else if (
            "l" == g &&
            a.oFeatures.bPaginate &&
            a.oFeatures.bLengthChange
          )
            (i = ya(a)), (f = 1);
          else if ("f" == g && a.oFeatures.bFilter) (i = za(a)), (f = 1);
          else if ("r" == g && a.oFeatures.bProcessing) (i = Aa(a)), (f = 1);
          else if ("t" == g) (i = Ba(a)), (f = 1);
          else if ("i" == g && a.oFeatures.bInfo) (i = Ca(a)), (f = 1);
          else if ("p" == g && a.oFeatures.bPaginate) (i = Da(a)), (f = 1);
          else if (0 !== j.ext.aoFeatures.length) {
            e = j.ext.aoFeatures;
            k = 0;
            for (w = e.length; k < w; k++)
              if (g == e[k].cFeature) {
                (i = e[k].fnInit(a)) && (f = 1);
                break;
              }
          }
          1 == f &&
            null !== i &&
            ("object" !== typeof a.aanFeatures[g] && (a.aanFeatures[g] = []),
            a.aanFeatures[g].push(i),
            c.appendChild(i));
        }
        b.parentNode.replaceChild(a.nTableWrapper, b);
      }
      function V(a, b) {
        var c = h(b).children("tr"),
          d,
          i,
          f,
          g,
          e,
          j,
          o,
          k,
          m,
          p;
        a.splice(0, a.length);
        f = 0;
        for (j = c.length; f < j; f++) a.push([]);
        f = 0;
        for (j = c.length; f < j; f++) {
          d = c[f];
          for (i = d.firstChild; i; ) {
            if (
              "TD" == i.nodeName.toUpperCase() ||
              "TH" == i.nodeName.toUpperCase()
            ) {
              k = 1 * i.getAttribute("colspan");
              m = 1 * i.getAttribute("rowspan");
              k = !k || 0 === k || 1 === k ? 1 : k;
              m = !m || 0 === m || 1 === m ? 1 : m;
              g = 0;
              for (e = a[f]; e[g]; ) g++;
              o = g;
              p = 1 === k ? !0 : !1;
              for (e = 0; e < k; e++)
                for (g = 0; g < m; g++)
                  (a[f + g][o + e] = { cell: i, unique: p }),
                    (a[f + g].nTr = d);
            }
            i = i.nextSibling;
          }
        }
      }
      function N(a, b, c) {
        var d = [];
        c || ((c = a.aoHeader), b && ((c = []), V(c, b)));
        for (var b = 0, i = c.length; b < i; b++)
          for (var f = 0, g = c[b].length; f < g; f++)
            if (c[b][f].unique && (!d[f] || !a.bSortCellsTop))
              d[f] = c[b][f].cell;
        return d;
      }
      function wa(a) {
        if (a.bAjaxDataGet) {
          a.iDraw++;
          E(a, !0);
          var b = Ea(a);
          ka(a, b);
          a.fnServerData.call(
            a.oInstance,
            a.sAjaxSource,
            b,
            function (b) {
              Fa(a, b);
            },
            a
          );
          return !1;
        }
        return !0;
      }
      function Ea(a) {
        var b = a.aoColumns.length,
          c = [],
          d,
          i,
          f,
          g;
        c.push({ name: "sEcho", value: a.iDraw });
        c.push({ name: "iColumns", value: b });
        c.push({ name: "sColumns", value: M(a) });
        c.push({ name: "iDisplayStart", value: a._iDisplayStart });
        c.push({
          name: "iDisplayLength",
          value: !1 !== a.oFeatures.bPaginate ? a._iDisplayLength : -1,
        });
        for (f = 0; f < b; f++)
          (d = a.aoColumns[f].mData),
            c.push({
              name: "mDataProp_" + f,
              value: "function" === typeof d ? "function" : d,
            });
        if (!1 !== a.oFeatures.bFilter) {
          c.push({ name: "sSearch", value: a.oPreviousSearch.sSearch });
          c.push({ name: "bRegex", value: a.oPreviousSearch.bRegex });
          for (f = 0; f < b; f++)
            c.push({
              name: "sSearch_" + f,
              value: a.aoPreSearchCols[f].sSearch,
            }),
              c.push({
                name: "bRegex_" + f,
                value: a.aoPreSearchCols[f].bRegex,
              }),
              c.push({
                name: "bSearchable_" + f,
                value: a.aoColumns[f].bSearchable,
              });
        }
        if (!1 !== a.oFeatures.bSort) {
          var e = 0;
          d =
            null !== a.aaSortingFixed
              ? a.aaSortingFixed.concat(a.aaSorting)
              : a.aaSorting.slice();
          for (f = 0; f < d.length; f++) {
            i = a.aoColumns[d[f][0]].aDataSort;
            for (g = 0; g < i.length; g++)
              c.push({ name: "iSortCol_" + e, value: i[g] }),
                c.push({ name: "sSortDir_" + e, value: d[f][1] }),
                e++;
          }
          c.push({ name: "iSortingCols", value: e });
          for (f = 0; f < b; f++)
            c.push({ name: "bSortable_" + f, value: a.aoColumns[f].bSortable });
        }
        return c;
      }
      function ka(a, b) {
        A(a, "aoServerParams", "serverParams", [b]);
      }
      function Fa(a, b) {
        if (b.sEcho !== n) {
          if (1 * b.sEcho < a.iDraw) return;
          a.iDraw = 1 * b.sEcho;
        }
        (!a.oScroll.bInfinite ||
          (a.oScroll.bInfinite && (a.bSorted || a.bFiltered))) &&
          ga(a);
        a._iRecordsTotal = parseInt(b.iTotalRecords, 10);
        a._iRecordsDisplay = parseInt(b.iTotalDisplayRecords, 10);
        var c = M(a),
          c = b.sColumns !== n && "" !== c && b.sColumns != c,
          d;
        c && (d = u(a, b.sColumns));
        for (var i = Q(a.sAjaxDataProp)(b), f = 0, g = i.length; f < g; f++)
          if (c) {
            for (var e = [], h = 0, j = a.aoColumns.length; h < j; h++)
              e.push(i[f][d[h]]);
            H(a, e);
          } else H(a, i[f]);
        a.aiDisplay = a.aiDisplayMaster.slice();
        a.bAjaxDataGet = !1;
        x(a);
        a.bAjaxDataGet = !0;
        E(a, !1);
      }
      function za(a) {
        var b = a.oPreviousSearch,
          c = a.oLanguage.sSearch,
          c =
            -1 !== c.indexOf("_INPUT_")
              ? c.replace("_INPUT_", '<input type="text" />')
              : "" === c
              ? '<input type="text" />'
              : c + ' <input type="text" />',
          d = l.createElement("div");
        d.className = a.oClasses.sFilter;
        d.innerHTML = "<label>" + c + "</label>";
        a.aanFeatures.f || (d.id = a.sTableId + "_filter");
        c = h('input[type="text"]', d);
        d._DT_Input = c[0];
        c.val(b.sSearch.replace('"', "&quot;"));
        c.bind("keyup.DT", function () {
          for (
            var c = a.aanFeatures.f,
              d = this.value === "" ? "" : this.value,
              g = 0,
              e = c.length;
            g < e;
            g++
          )
            c[g] != h(this).parents("div.dataTables_filter")[0] &&
              h(c[g]._DT_Input).val(d);
          d != b.sSearch &&
            K(a, {
              sSearch: d,
              bRegex: b.bRegex,
              bSmart: b.bSmart,
              bCaseInsensitive: b.bCaseInsensitive,
            });
        });
        c.attr("aria-controls", a.sTableId).bind("keypress.DT", function (a) {
          if (a.keyCode == 13) return false;
        });
        return d;
      }
      function K(a, b, c) {
        var d = a.oPreviousSearch,
          i = a.aoPreSearchCols,
          f = function (a) {
            d.sSearch = a.sSearch;
            d.bRegex = a.bRegex;
            d.bSmart = a.bSmart;
            d.bCaseInsensitive = a.bCaseInsensitive;
          };
        if (a.oFeatures.bServerSide) f(b);
        else {
          Ga(a, b.sSearch, c, b.bRegex, b.bSmart, b.bCaseInsensitive);
          f(b);
          for (b = 0; b < a.aoPreSearchCols.length; b++)
            Ha(
              a,
              i[b].sSearch,
              b,
              i[b].bRegex,
              i[b].bSmart,
              i[b].bCaseInsensitive
            );
          Ia(a);
        }
        a.bFiltered = !0;
        h(a.oInstance).trigger("filter", a);
        a._iDisplayStart = 0;
        y(a);
        x(a);
        la(a, 0);
      }
      function Ia(a) {
        for (
          var b = j.ext.afnFiltering,
            c = r(a, "bSearchable"),
            d = 0,
            i = b.length;
          d < i;
          d++
        )
          for (var f = 0, g = 0, e = a.aiDisplay.length; g < e; g++) {
            var h = a.aiDisplay[g - f];
            b[d](a, Y(a, h, "filter", c), h) ||
              (a.aiDisplay.splice(g - f, 1), f++);
          }
      }
      function Ha(a, b, c, d, i, f) {
        if ("" !== b)
          for (
            var g = 0, b = ma(b, d, i, f), d = a.aiDisplay.length - 1;
            0 <= d;
            d--
          )
            (i = Ja(v(a, a.aiDisplay[d], c, "filter"), a.aoColumns[c].sType)),
              b.test(i) || (a.aiDisplay.splice(d, 1), g++);
      }
      function Ga(a, b, c, d, i, f) {
        d = ma(b, d, i, f);
        i = a.oPreviousSearch;
        c || (c = 0);
        0 !== j.ext.afnFiltering.length && (c = 1);
        if (0 >= b.length)
          a.aiDisplay.splice(0, a.aiDisplay.length),
            (a.aiDisplay = a.aiDisplayMaster.slice());
        else if (
          a.aiDisplay.length == a.aiDisplayMaster.length ||
          i.sSearch.length > b.length ||
          1 == c ||
          0 !== b.indexOf(i.sSearch)
        ) {
          a.aiDisplay.splice(0, a.aiDisplay.length);
          la(a, 1);
          for (b = 0; b < a.aiDisplayMaster.length; b++)
            d.test(a.asDataSearch[b]) && a.aiDisplay.push(a.aiDisplayMaster[b]);
        } else
          for (b = c = 0; b < a.asDataSearch.length; b++)
            d.test(a.asDataSearch[b]) || (a.aiDisplay.splice(b - c, 1), c++);
      }
      function la(a, b) {
        if (!a.oFeatures.bServerSide) {
          a.asDataSearch = [];
          for (
            var c = r(a, "bSearchable"),
              d = 1 === b ? a.aiDisplayMaster : a.aiDisplay,
              i = 0,
              f = d.length;
            i < f;
            i++
          )
            a.asDataSearch[i] = na(a, Y(a, d[i], "filter", c));
        }
      }
      function na(a, b) {
        var c = b.join("  ");
        -1 !== c.indexOf("&") && (c = h("<div>").html(c).text());
        return c.replace(/[\n\r]/g, " ");
      }
      function ma(a, b, c, d) {
        if (c)
          return (
            (a = b ? a.split(" ") : oa(a).split(" ")),
            (a = "^(?=.*?" + a.join(")(?=.*?") + ").*$"),
            RegExp(a, d ? "i" : "")
          );
        a = b ? a : oa(a);
        return RegExp(a, d ? "i" : "");
      }
      function Ja(a, b) {
        return "function" === typeof j.ext.ofnSearch[b]
          ? j.ext.ofnSearch[b](a)
          : null === a
          ? ""
          : "html" == b
          ? a.replace(/[\r\n]/g, " ").replace(/<.*?>/g, "")
          : "string" === typeof a
          ? a.replace(/[\r\n]/g, " ")
          : a;
      }
      function oa(a) {
        return a.replace(
          RegExp(
            "(\\/|\\.|\\*|\\+|\\?|\\||\\(|\\)|\\[|\\]|\\{|\\}|\\\\|\\$|\\^|\\-)",
            "g"
          ),
          "\\$1"
        );
      }
      function Ca(a) {
        var b = l.createElement("div");
        b.className = a.oClasses.sInfo;
        a.aanFeatures.i ||
          (a.aoDrawCallback.push({ fn: Ka, sName: "information" }),
          (b.id = a.sTableId + "_info"));
        a.nTable.setAttribute("aria-describedby", a.sTableId + "_info");
        return b;
      }
      function Ka(a) {
        if (a.oFeatures.bInfo && 0 !== a.aanFeatures.i.length) {
          var b = a.oLanguage,
            c = a._iDisplayStart + 1,
            d = a.fnDisplayEnd(),
            i = a.fnRecordsTotal(),
            f = a.fnRecordsDisplay(),
            g;
          g = 0 === f ? b.sInfoEmpty : b.sInfo;
          f != i && (g += " " + b.sInfoFiltered);
          g += b.sInfoPostFix;
          g = ja(a, g);
          null !== b.fnInfoCallback &&
            (g = b.fnInfoCallback.call(a.oInstance, a, c, d, i, f, g));
          a = a.aanFeatures.i;
          b = 0;
          for (c = a.length; b < c; b++) h(a[b]).html(g);
        }
      }
      function ja(a, b) {
        var c = a.fnFormatNumber(a._iDisplayStart + 1),
          d = a.fnDisplayEnd(),
          d = a.fnFormatNumber(d),
          i = a.fnRecordsDisplay(),
          i = a.fnFormatNumber(i),
          f = a.fnRecordsTotal(),
          f = a.fnFormatNumber(f);
        a.oScroll.bInfinite && (c = a.fnFormatNumber(1));
        return b
          .replace(/_START_/g, c)
          .replace(/_END_/g, d)
          .replace(/_TOTAL_/g, i)
          .replace(/_MAX_/g, f);
      }
      function ba(a) {
        var b,
          c,
          d = a.iInitDisplayStart;
        if (!1 === a.bInitialised)
          setTimeout(function () {
            ba(a);
          }, 200);
        else {
          xa(a);
          va(a);
          W(a, a.aoHeader);
          a.nTFoot && W(a, a.aoFooter);
          E(a, !0);
          a.oFeatures.bAutoWidth && da(a);
          b = 0;
          for (c = a.aoColumns.length; b < c; b++)
            null !== a.aoColumns[b].sWidth &&
              (a.aoColumns[b].nTh.style.width = q(a.aoColumns[b].sWidth));
          a.oFeatures.bSort
            ? O(a)
            : a.oFeatures.bFilter
            ? K(a, a.oPreviousSearch)
            : ((a.aiDisplay = a.aiDisplayMaster.slice()), y(a), x(a));
          null !== a.sAjaxSource && !a.oFeatures.bServerSide
            ? ((c = []),
              ka(a, c),
              a.fnServerData.call(
                a.oInstance,
                a.sAjaxSource,
                c,
                function (c) {
                  var f = a.sAjaxDataProp !== "" ? Q(a.sAjaxDataProp)(c) : c;
                  for (b = 0; b < f.length; b++) H(a, f[b]);
                  a.iInitDisplayStart = d;
                  if (a.oFeatures.bSort) O(a);
                  else {
                    a.aiDisplay = a.aiDisplayMaster.slice();
                    y(a);
                    x(a);
                  }
                  E(a, false);
                  $(a, c);
                },
                a
              ))
            : a.oFeatures.bServerSide || (E(a, !1), $(a));
        }
      }
      function $(a, b) {
        a._bInitComplete = !0;
        A(a, "aoInitComplete", "init", [a, b]);
      }
      function pa(a) {
        var b = j.defaults.oLanguage;
        !a.sEmptyTable &&
          a.sZeroRecords &&
          "No data available in table" === b.sEmptyTable &&
          p(a, a, "sZeroRecords", "sEmptyTable");
        !a.sLoadingRecords &&
          a.sZeroRecords &&
          "Loading..." === b.sLoadingRecords &&
          p(a, a, "sZeroRecords", "sLoadingRecords");
      }
      function ya(a) {
        if (a.oScroll.bInfinite) return null;
        var b =
            '<select size="1" ' + ('name="' + a.sTableId + '_length"') + ">",
          c,
          d,
          i = a.aLengthMenu;
        if (
          2 == i.length &&
          "object" === typeof i[0] &&
          "object" === typeof i[1]
        ) {
          c = 0;
          for (d = i[0].length; c < d; c++)
            b += '<option value="' + i[0][c] + '">' + i[1][c] + "</option>";
        } else {
          c = 0;
          for (d = i.length; c < d; c++)
            b += '<option value="' + i[c] + '">' + i[c] + "</option>";
        }
        b += "</select>";
        i = l.createElement("div");
        a.aanFeatures.l || (i.id = a.sTableId + "_length");
        i.className = a.oClasses.sLength;
        i.innerHTML =
          "<label>" + a.oLanguage.sLengthMenu.replace("_MENU_", b) + "</label>";
        h('select option[value="' + a._iDisplayLength + '"]', i).attr(
          "selected",
          !0
        );
        h("select", i).bind("change.DT", function () {
          var b = h(this).val(),
            i = a.aanFeatures.l;
          c = 0;
          for (d = i.length; c < d; c++)
            i[c] != this.parentNode && h("select", i[c]).val(b);
          a._iDisplayLength = parseInt(b, 10);
          y(a);
          if (a.fnDisplayEnd() == a.fnRecordsDisplay()) {
            a._iDisplayStart = a.fnDisplayEnd() - a._iDisplayLength;
            if (a._iDisplayStart < 0) a._iDisplayStart = 0;
          }
          if (a._iDisplayLength == -1) a._iDisplayStart = 0;
          x(a);
        });
        h("select", i).attr("aria-controls", a.sTableId);
        return i;
      }
      function y(a) {
        a._iDisplayEnd =
          !1 === a.oFeatures.bPaginate
            ? a.aiDisplay.length
            : a._iDisplayStart + a._iDisplayLength > a.aiDisplay.length ||
              -1 == a._iDisplayLength
            ? a.aiDisplay.length
            : a._iDisplayStart + a._iDisplayLength;
      }
      function Da(a) {
        if (a.oScroll.bInfinite) return null;
        var b = l.createElement("div");
        b.className = a.oClasses.sPaging + a.sPaginationType;
        j.ext.oPagination[a.sPaginationType].fnInit(a, b, function (a) {
          y(a);
          x(a);
        });
        a.aanFeatures.p ||
          a.aoDrawCallback.push({
            fn: function (a) {
              j.ext.oPagination[a.sPaginationType].fnUpdate(a, function (a) {
                y(a);
                x(a);
              });
            },
            sName: "pagination",
          });
        return b;
      }
      function qa(a, b) {
        var c = a._iDisplayStart;
        if ("number" === typeof b)
          (a._iDisplayStart = b * a._iDisplayLength),
            a._iDisplayStart > a.fnRecordsDisplay() && (a._iDisplayStart = 0);
        else if ("first" == b) a._iDisplayStart = 0;
        else if ("previous" == b)
          (a._iDisplayStart =
            0 <= a._iDisplayLength ? a._iDisplayStart - a._iDisplayLength : 0),
            0 > a._iDisplayStart && (a._iDisplayStart = 0);
        else if ("next" == b)
          0 <= a._iDisplayLength
            ? a._iDisplayStart + a._iDisplayLength < a.fnRecordsDisplay() &&
              (a._iDisplayStart += a._iDisplayLength)
            : (a._iDisplayStart = 0);
        else if ("last" == b)
          if (0 <= a._iDisplayLength) {
            var d =
              parseInt((a.fnRecordsDisplay() - 1) / a._iDisplayLength, 10) + 1;
            a._iDisplayStart = (d - 1) * a._iDisplayLength;
          } else a._iDisplayStart = 0;
        else D(a, 0, "Unknown paging action: " + b);
        h(a.oInstance).trigger("page", a);
        return c != a._iDisplayStart;
      }
      function Aa(a) {
        var b = l.createElement("div");
        a.aanFeatures.r || (b.id = a.sTableId + "_processing");
        b.innerHTML = a.oLanguage.sProcessing;
        b.className = a.oClasses.sProcessing;
        a.nTable.parentNode.insertBefore(b, a.nTable);
        return b;
      }
      function E(a, b) {
        if (a.oFeatures.bProcessing)
          for (var c = a.aanFeatures.r, d = 0, i = c.length; d < i; d++)
            c[d].style.visibility = b ? "visible" : "hidden";
        h(a.oInstance).trigger("processing", [a, b]);
      }
      function Ba(a) {
        if ("" === a.oScroll.sX && "" === a.oScroll.sY) return a.nTable;
        var b = l.createElement("div"),
          c = l.createElement("div"),
          d = l.createElement("div"),
          i = l.createElement("div"),
          f = l.createElement("div"),
          g = l.createElement("div"),
          e = a.nTable.cloneNode(!1),
          j = a.nTable.cloneNode(!1),
          o = a.nTable.getElementsByTagName("thead")[0],
          k =
            0 === a.nTable.getElementsByTagName("tfoot").length
              ? null
              : a.nTable.getElementsByTagName("tfoot")[0],
          m = a.oClasses;
        c.appendChild(d);
        f.appendChild(g);
        i.appendChild(a.nTable);
        b.appendChild(c);
        b.appendChild(i);
        d.appendChild(e);
        e.appendChild(o);
        null !== k && (b.appendChild(f), g.appendChild(j), j.appendChild(k));
        b.className = m.sScrollWrapper;
        c.className = m.sScrollHead;
        d.className = m.sScrollHeadInner;
        i.className = m.sScrollBody;
        f.className = m.sScrollFoot;
        g.className = m.sScrollFootInner;
        a.oScroll.bAutoCss &&
          ((c.style.overflow = "hidden"),
          (c.style.position = "relative"),
          (f.style.overflow = "hidden"),
          (i.style.overflow = "auto"));
        c.style.border = "0";
        c.style.width = "100%";
        f.style.border = "0";
        d.style.width = "" !== a.oScroll.sXInner ? a.oScroll.sXInner : "100%";
        e.removeAttribute("id");
        e.style.marginLeft = "0";
        a.nTable.style.marginLeft = "0";
        null !== k && (j.removeAttribute("id"), (j.style.marginLeft = "0"));
        d = h(a.nTable).children("caption");
        0 < d.length &&
          ((d = d[0]),
          "top" === d._captionSide
            ? e.appendChild(d)
            : "bottom" === d._captionSide && k && j.appendChild(d));
        "" !== a.oScroll.sX &&
          ((c.style.width = q(a.oScroll.sX)),
          (i.style.width = q(a.oScroll.sX)),
          null !== k && (f.style.width = q(a.oScroll.sX)),
          h(i).scroll(function () {
            c.scrollLeft = this.scrollLeft;
            if (k !== null) f.scrollLeft = this.scrollLeft;
          }));
        "" !== a.oScroll.sY && (i.style.height = q(a.oScroll.sY));
        a.aoDrawCallback.push({ fn: La, sName: "scrolling" });
        a.oScroll.bInfinite &&
          h(i).scroll(function () {
            if (
              !a.bDrawing &&
              h(this).scrollTop() !== 0 &&
              h(this).scrollTop() + h(this).height() >
                h(a.nTable).height() - a.oScroll.iLoadGap &&
              a.fnDisplayEnd() < a.fnRecordsDisplay()
            ) {
              qa(a, "next");
              y(a);
              x(a);
            }
          });
        a.nScrollHead = c;
        a.nScrollFoot = f;
        return b;
      }
      function La(a) {
        var b = a.nScrollHead.getElementsByTagName("div")[0],
          c = b.getElementsByTagName("table")[0],
          d = a.nTable.parentNode,
          i,
          f,
          g,
          e,
          j,
          o,
          k,
          m,
          p = [],
          n = [],
          l =
            null !== a.nTFoot
              ? a.nScrollFoot.getElementsByTagName("div")[0]
              : null,
          R = null !== a.nTFoot ? l.getElementsByTagName("table")[0] : null,
          r = a.oBrowser.bScrollOversize,
          s = function (a) {
            k = a.style;
            k.paddingTop = "0";
            k.paddingBottom = "0";
            k.borderTopWidth = "0";
            k.borderBottomWidth = "0";
            k.height = 0;
          };
        h(a.nTable).children("thead, tfoot").remove();
        i = h(a.nTHead).clone()[0];
        a.nTable.insertBefore(i, a.nTable.childNodes[0]);
        g = a.nTHead.getElementsByTagName("tr");
        e = i.getElementsByTagName("tr");
        null !== a.nTFoot &&
          ((j = h(a.nTFoot).clone()[0]),
          a.nTable.insertBefore(j, a.nTable.childNodes[1]),
          (o = a.nTFoot.getElementsByTagName("tr")),
          (j = j.getElementsByTagName("tr")));
        "" === a.oScroll.sX &&
          ((d.style.width = "100%"), (b.parentNode.style.width = "100%"));
        var t = N(a, i);
        i = 0;
        for (f = t.length; i < f; i++)
          (m = G(a, i)), (t[i].style.width = a.aoColumns[m].sWidth);
        null !== a.nTFoot &&
          C(function (a) {
            a.style.width = "";
          }, j);
        a.oScroll.bCollapse &&
          "" !== a.oScroll.sY &&
          (d.style.height = d.offsetHeight + a.nTHead.offsetHeight + "px");
        i = h(a.nTable).outerWidth();
        if ("" === a.oScroll.sX) {
          if (
            ((a.nTable.style.width = "100%"),
            r &&
              (h("tbody", d).height() > d.offsetHeight ||
                "scroll" == h(d).css("overflow-y")))
          )
            a.nTable.style.width = q(
              h(a.nTable).outerWidth() - a.oScroll.iBarWidth
            );
        } else
          "" !== a.oScroll.sXInner
            ? (a.nTable.style.width = q(a.oScroll.sXInner))
            : i == h(d).width() && h(d).height() < h(a.nTable).height()
            ? ((a.nTable.style.width = q(i - a.oScroll.iBarWidth)),
              h(a.nTable).outerWidth() > i - a.oScroll.iBarWidth &&
                (a.nTable.style.width = q(i)))
            : (a.nTable.style.width = q(i));
        i = h(a.nTable).outerWidth();
        C(s, e);
        C(function (a) {
          p.push(q(h(a).width()));
        }, e);
        C(function (a, b) {
          a.style.width = p[b];
        }, g);
        h(e).height(0);
        null !== a.nTFoot &&
          (C(s, j),
          C(function (a) {
            n.push(q(h(a).width()));
          }, j),
          C(function (a, b) {
            a.style.width = n[b];
          }, o),
          h(j).height(0));
        C(function (a, b) {
          a.innerHTML = "";
          a.style.width = p[b];
        }, e);
        null !== a.nTFoot &&
          C(function (a, b) {
            a.innerHTML = "";
            a.style.width = n[b];
          }, j);
        if (h(a.nTable).outerWidth() < i) {
          g =
            d.scrollHeight > d.offsetHeight ||
            "scroll" == h(d).css("overflow-y")
              ? i + a.oScroll.iBarWidth
              : i;
          if (
            r &&
            (d.scrollHeight > d.offsetHeight ||
              "scroll" == h(d).css("overflow-y"))
          )
            a.nTable.style.width = q(g - a.oScroll.iBarWidth);
          d.style.width = q(g);
          a.nScrollHead.style.width = q(g);
          null !== a.nTFoot && (a.nScrollFoot.style.width = q(g));
          "" === a.oScroll.sX
            ? D(
                a,
                1,
                "The table cannot fit into the current element which will cause column misalignment. The table has been drawn at its minimum possible width."
              )
            : "" !== a.oScroll.sXInner &&
              D(
                a,
                1,
                "The table cannot fit into the current element which will cause column misalignment. Increase the sScrollXInner value or remove it to allow automatic calculation"
              );
        } else
          (d.style.width = q("100%")),
            (a.nScrollHead.style.width = q("100%")),
            null !== a.nTFoot && (a.nScrollFoot.style.width = q("100%"));
        "" === a.oScroll.sY &&
          r &&
          (d.style.height = q(a.nTable.offsetHeight + a.oScroll.iBarWidth));
        "" !== a.oScroll.sY &&
          a.oScroll.bCollapse &&
          ((d.style.height = q(a.oScroll.sY)),
          (r =
            "" !== a.oScroll.sX && a.nTable.offsetWidth > d.offsetWidth
              ? a.oScroll.iBarWidth
              : 0),
          a.nTable.offsetHeight < d.offsetHeight &&
            (d.style.height = q(a.nTable.offsetHeight + r)));
        r = h(a.nTable).outerWidth();
        c.style.width = q(r);
        b.style.width = q(r);
        c =
          h(a.nTable).height() > d.clientHeight ||
          "scroll" == h(d).css("overflow-y");
        b.style.paddingRight = c ? a.oScroll.iBarWidth + "px" : "0px";
        null !== a.nTFoot &&
          ((R.style.width = q(r)),
          (l.style.width = q(r)),
          (l.style.paddingRight = c ? a.oScroll.iBarWidth + "px" : "0px"));
        h(d).scroll();
        if (a.bSorted || a.bFiltered) d.scrollTop = 0;
      }
      function C(a, b, c) {
        for (var d = 0, i = 0, f = b.length, g, e; i < f; ) {
          g = b[i].firstChild;
          for (e = c ? c[i].firstChild : null; g; )
            1 === g.nodeType && (c ? a(g, e, d) : a(g, d), d++),
              (g = g.nextSibling),
              (e = c ? e.nextSibling : null);
          i++;
        }
      }
      function Ma(a, b) {
        if (!a || null === a || "" === a) return 0;
        b || (b = l.body);
        var c,
          d = l.createElement("div");
        d.style.width = q(a);
        b.appendChild(d);
        c = d.offsetWidth;
        b.removeChild(d);
        return c;
      }
      function da(a) {
        var b = 0,
          c,
          d = 0,
          i = a.aoColumns.length,
          f,
          e,
          j = h("th", a.nTHead),
          o = a.nTable.getAttribute("width");
        e = a.nTable.parentNode;
        for (f = 0; f < i; f++)
          a.aoColumns[f].bVisible &&
            (d++,
            null !== a.aoColumns[f].sWidth &&
              ((c = Ma(a.aoColumns[f].sWidthOrig, e)),
              null !== c && (a.aoColumns[f].sWidth = q(c)),
              b++));
        if (
          i == j.length &&
          0 === b &&
          d == i &&
          "" === a.oScroll.sX &&
          "" === a.oScroll.sY
        )
          for (f = 0; f < a.aoColumns.length; f++)
            (c = h(j[f]).width()), null !== c && (a.aoColumns[f].sWidth = q(c));
        else {
          b = a.nTable.cloneNode(!1);
          f = a.nTHead.cloneNode(!0);
          d = l.createElement("tbody");
          c = l.createElement("tr");
          b.removeAttribute("id");
          b.appendChild(f);
          null !== a.nTFoot &&
            (b.appendChild(a.nTFoot.cloneNode(!0)),
            C(function (a) {
              a.style.width = "";
            }, b.getElementsByTagName("tr")));
          b.appendChild(d);
          d.appendChild(c);
          d = h("thead th", b);
          0 === d.length && (d = h("tbody tr:eq(0)>td", b));
          j = N(a, f);
          for (f = d = 0; f < i; f++) {
            var k = a.aoColumns[f];
            k.bVisible && null !== k.sWidthOrig && "" !== k.sWidthOrig
              ? (j[f - d].style.width = q(k.sWidthOrig))
              : k.bVisible
              ? (j[f - d].style.width = "")
              : d++;
          }
          for (f = 0; f < i; f++)
            a.aoColumns[f].bVisible &&
              ((d = Na(a, f)),
              null !== d &&
                ((d = d.cloneNode(!0)),
                "" !== a.aoColumns[f].sContentPadding &&
                  (d.innerHTML += a.aoColumns[f].sContentPadding),
                c.appendChild(d)));
          e.appendChild(b);
          "" !== a.oScroll.sX && "" !== a.oScroll.sXInner
            ? (b.style.width = q(a.oScroll.sXInner))
            : "" !== a.oScroll.sX
            ? ((b.style.width = ""),
              h(b).width() < e.offsetWidth &&
                (b.style.width = q(e.offsetWidth)))
            : "" !== a.oScroll.sY
            ? (b.style.width = q(e.offsetWidth))
            : o && (b.style.width = q(o));
          b.style.visibility = "hidden";
          Oa(a, b);
          i = h("tbody tr:eq(0)", b).children();
          0 === i.length && (i = N(a, h("thead", b)[0]));
          if ("" !== a.oScroll.sX) {
            for (f = d = e = 0; f < a.aoColumns.length; f++)
              a.aoColumns[f].bVisible &&
                ((e =
                  null === a.aoColumns[f].sWidthOrig
                    ? e + h(i[d]).outerWidth()
                    : e +
                      (parseInt(a.aoColumns[f].sWidth.replace("px", ""), 10) +
                        (h(i[d]).outerWidth() - h(i[d]).width()))),
                d++);
            b.style.width = q(e);
            a.nTable.style.width = q(e);
          }
          for (f = d = 0; f < a.aoColumns.length; f++)
            a.aoColumns[f].bVisible &&
              ((e = h(i[d]).width()),
              null !== e && 0 < e && (a.aoColumns[f].sWidth = q(e)),
              d++);
          i = h(b).css("width");
          a.nTable.style.width =
            -1 !== i.indexOf("%") ? i : q(h(b).outerWidth());
          b.parentNode.removeChild(b);
        }
        o && (a.nTable.style.width = q(o));
      }
      function Oa(a, b) {
        "" === a.oScroll.sX && "" !== a.oScroll.sY
          ? (h(b).width(),
            (b.style.width = q(h(b).outerWidth() - a.oScroll.iBarWidth)))
          : "" !== a.oScroll.sX && (b.style.width = q(h(b).outerWidth()));
      }
      function Na(a, b) {
        var c = Pa(a, b);
        if (0 > c) return null;
        if (null === a.aoData[c].nTr) {
          var d = l.createElement("td");
          d.innerHTML = v(a, c, b, "");
          return d;
        }
        return J(a, c)[b];
      }
      function Pa(a, b) {
        for (var c = -1, d = -1, i = 0; i < a.aoData.length; i++) {
          var e = v(a, i, b, "display") + "",
            e = e.replace(/<.*?>/g, "");
          e.length > c && ((c = e.length), (d = i));
        }
        return d;
      }
      function q(a) {
        if (null === a) return "0px";
        if ("number" == typeof a) return 0 > a ? "0px" : a + "px";
        var b = a.charCodeAt(a.length - 1);
        return 48 > b || 57 < b ? a : a + "px";
      }
      function Qa() {
        var a = l.createElement("p"),
          b = a.style;
        b.width = "100%";
        b.height = "200px";
        b.padding = "0px";
        var c = l.createElement("div"),
          b = c.style;
        b.position = "absolute";
        b.top = "0px";
        b.left = "0px";
        b.visibility = "hidden";
        b.width = "200px";
        b.height = "150px";
        b.padding = "0px";
        b.overflow = "hidden";
        c.appendChild(a);
        l.body.appendChild(c);
        b = a.offsetWidth;
        c.style.overflow = "scroll";
        a = a.offsetWidth;
        b == a && (a = c.clientWidth);
        l.body.removeChild(c);
        return b - a;
      }
      function O(a, b) {
        var c,
          d,
          i,
          e,
          g,
          k,
          o = [],
          m = [],
          p = j.ext.oSort,
          l = a.aoData,
          q = a.aoColumns,
          G = a.oLanguage.oAria;
        if (
          !a.oFeatures.bServerSide &&
          (0 !== a.aaSorting.length || null !== a.aaSortingFixed)
        ) {
          o =
            null !== a.aaSortingFixed
              ? a.aaSortingFixed.concat(a.aaSorting)
              : a.aaSorting.slice();
          for (c = 0; c < o.length; c++)
            if (
              ((d = o[c][0]),
              (i = R(a, d)),
              (e = a.aoColumns[d].sSortDataType),
              j.ext.afnSortData[e])
            )
              if (
                ((g = j.ext.afnSortData[e].call(a.oInstance, a, d, i)),
                g.length === l.length)
              ) {
                i = 0;
                for (e = l.length; i < e; i++) F(a, i, d, g[i]);
              } else
                D(
                  a,
                  0,
                  "Returned data sort array (col " + d + ") is the wrong length"
                );
          c = 0;
          for (d = a.aiDisplayMaster.length; c < d; c++)
            m[a.aiDisplayMaster[c]] = c;
          var r = o.length,
            s;
          c = 0;
          for (d = l.length; c < d; c++)
            for (i = 0; i < r; i++) {
              s = q[o[i][0]].aDataSort;
              g = 0;
              for (k = s.length; g < k; g++)
                (e = q[s[g]].sType),
                  (e = p[(e ? e : "string") + "-pre"]),
                  (l[c]._aSortData[s[g]] = e
                    ? e(v(a, c, s[g], "sort"))
                    : v(a, c, s[g], "sort"));
            }
          a.aiDisplayMaster.sort(function (a, b) {
            var c, d, e, i, f;
            for (c = 0; c < r; c++) {
              f = q[o[c][0]].aDataSort;
              d = 0;
              for (e = f.length; d < e; d++)
                if (
                  ((i = q[f[d]].sType),
                  (i = p[(i ? i : "string") + "-" + o[c][1]](
                    l[a]._aSortData[f[d]],
                    l[b]._aSortData[f[d]]
                  )),
                  0 !== i)
                )
                  return i;
            }
            return p["numeric-asc"](m[a], m[b]);
          });
        }
        (b === n || b) && !a.oFeatures.bDeferRender && P(a);
        c = 0;
        for (d = a.aoColumns.length; c < d; c++)
          (e = q[c].sTitle.replace(/<.*?>/g, "")),
            (i = q[c].nTh),
            i.removeAttribute("aria-sort"),
            i.removeAttribute("aria-label"),
            q[c].bSortable
              ? 0 < o.length && o[0][0] == c
                ? (i.setAttribute(
                    "aria-sort",
                    "asc" == o[0][1] ? "ascending" : "descending"
                  ),
                  i.setAttribute(
                    "aria-label",
                    e +
                      ("asc" ==
                      (q[c].asSorting[o[0][2] + 1]
                        ? q[c].asSorting[o[0][2] + 1]
                        : q[c].asSorting[0])
                        ? G.sSortAscending
                        : G.sSortDescending)
                  ))
                : i.setAttribute(
                    "aria-label",
                    e +
                      ("asc" == q[c].asSorting[0]
                        ? G.sSortAscending
                        : G.sSortDescending)
                  )
              : i.setAttribute("aria-label", e);
        a.bSorted = !0;
        h(a.oInstance).trigger("sort", a);
        a.oFeatures.bFilter
          ? K(a, a.oPreviousSearch, 1)
          : ((a.aiDisplay = a.aiDisplayMaster.slice()),
            (a._iDisplayStart = 0),
            y(a),
            x(a));
      }
      function ia(a, b, c, d) {
        Ra(b, {}, function (b) {
          if (!1 !== a.aoColumns[c].bSortable) {
            var e = function () {
              var d, e;
              if (b.shiftKey) {
                for (var f = !1, h = 0; h < a.aaSorting.length; h++)
                  if (a.aaSorting[h][0] == c) {
                    f = !0;
                    d = a.aaSorting[h][0];
                    e = a.aaSorting[h][2] + 1;
                    a.aoColumns[d].asSorting[e]
                      ? ((a.aaSorting[h][1] = a.aoColumns[d].asSorting[e]),
                        (a.aaSorting[h][2] = e))
                      : a.aaSorting.splice(h, 1);
                    break;
                  }
                !1 === f &&
                  a.aaSorting.push([c, a.aoColumns[c].asSorting[0], 0]);
              } else
                1 == a.aaSorting.length && a.aaSorting[0][0] == c
                  ? ((d = a.aaSorting[0][0]),
                    (e = a.aaSorting[0][2] + 1),
                    a.aoColumns[d].asSorting[e] || (e = 0),
                    (a.aaSorting[0][1] = a.aoColumns[d].asSorting[e]),
                    (a.aaSorting[0][2] = e))
                  : (a.aaSorting.splice(0, a.aaSorting.length),
                    a.aaSorting.push([c, a.aoColumns[c].asSorting[0], 0]));
              O(a);
            };
            a.oFeatures.bProcessing
              ? (E(a, !0),
                setTimeout(function () {
                  e();
                  a.oFeatures.bServerSide || E(a, !1);
                }, 0))
              : e();
            "function" == typeof d && d(a);
          }
        });
      }
      function P(a) {
        var b,
          c,
          d,
          e,
          f,
          g = a.aoColumns.length,
          j = a.oClasses;
        for (b = 0; b < g; b++)
          a.aoColumns[b].bSortable &&
            h(a.aoColumns[b].nTh).removeClass(
              j.sSortAsc +
                " " +
                j.sSortDesc +
                " " +
                a.aoColumns[b].sSortingClass
            );
        c =
          null !== a.aaSortingFixed
            ? a.aaSortingFixed.concat(a.aaSorting)
            : a.aaSorting.slice();
        for (b = 0; b < a.aoColumns.length; b++)
          if (a.aoColumns[b].bSortable) {
            f = a.aoColumns[b].sSortingClass;
            e = -1;
            for (d = 0; d < c.length; d++)
              if (c[d][0] == b) {
                f = "asc" == c[d][1] ? j.sSortAsc : j.sSortDesc;
                e = d;
                break;
              }
            h(a.aoColumns[b].nTh).addClass(f);
            a.bJUI &&
              ((f = h("span." + j.sSortIcon, a.aoColumns[b].nTh)),
              f.removeClass(
                j.sSortJUIAsc +
                  " " +
                  j.sSortJUIDesc +
                  " " +
                  j.sSortJUI +
                  " " +
                  j.sSortJUIAscAllowed +
                  " " +
                  j.sSortJUIDescAllowed
              ),
              f.addClass(
                -1 == e
                  ? a.aoColumns[b].sSortingClassJUI
                  : "asc" == c[e][1]
                  ? j.sSortJUIAsc
                  : j.sSortJUIDesc
              ));
          } else h(a.aoColumns[b].nTh).addClass(a.aoColumns[b].sSortingClass);
        f = j.sSortColumn;
        if (a.oFeatures.bSort && a.oFeatures.bSortClasses) {
          a = J(a);
          e = [];
          for (b = 0; b < g; b++) e.push("");
          b = 0;
          for (d = 1; b < c.length; b++)
            (j = parseInt(c[b][0], 10)), (e[j] = f + d), 3 > d && d++;
          f = RegExp(f + "[123]");
          var o;
          b = 0;
          for (c = a.length; b < c; b++)
            (j = b % g),
              (d = a[b].className),
              (o = e[j]),
              (j = d.replace(f, o)),
              j != d
                ? (a[b].className = h.trim(j))
                : 0 < o.length &&
                  -1 == d.indexOf(o) &&
                  (a[b].className = d + " " + o);
        }
      }
      function ra(a) {
        if (a.oFeatures.bStateSave && !a.bDestroying) {
          var b, c;
          b = a.oScroll.bInfinite;
          var d = {
            iCreate: new Date().getTime(),
            iStart: b ? 0 : a._iDisplayStart,
            iEnd: b ? a._iDisplayLength : a._iDisplayEnd,
            iLength: a._iDisplayLength,
            aaSorting: h.extend(!0, [], a.aaSorting),
            oSearch: h.extend(!0, {}, a.oPreviousSearch),
            aoSearchCols: h.extend(!0, [], a.aoPreSearchCols),
            abVisCols: [],
          };
          b = 0;
          for (c = a.aoColumns.length; b < c; b++)
            d.abVisCols.push(a.aoColumns[b].bVisible);
          A(a, "aoStateSaveParams", "stateSaveParams", [a, d]);
          a.fnStateSave.call(a.oInstance, a, d);
        }
      }
      function Sa(a, b) {
        if (a.oFeatures.bStateSave) {
          var c = a.fnStateLoad.call(a.oInstance, a);
          if (c) {
            var d = A(a, "aoStateLoadParams", "stateLoadParams", [a, c]);
            if (-1 === h.inArray(!1, d)) {
              a.oLoadedState = h.extend(!0, {}, c);
              a._iDisplayStart = c.iStart;
              a.iInitDisplayStart = c.iStart;
              a._iDisplayEnd = c.iEnd;
              a._iDisplayLength = c.iLength;
              a.aaSorting = c.aaSorting.slice();
              a.saved_aaSorting = c.aaSorting.slice();
              h.extend(a.oPreviousSearch, c.oSearch);
              h.extend(!0, a.aoPreSearchCols, c.aoSearchCols);
              b.saved_aoColumns = [];
              for (d = 0; d < c.abVisCols.length; d++)
                (b.saved_aoColumns[d] = {}),
                  (b.saved_aoColumns[d].bVisible = c.abVisCols[d]);
              A(a, "aoStateLoaded", "stateLoaded", [a, c]);
            }
          }
        }
      }
      function s(a) {
        for (var b = 0; b < j.settings.length; b++)
          if (j.settings[b].nTable === a) return j.settings[b];
        return null;
      }
      function T(a) {
        for (var b = [], a = a.aoData, c = 0, d = a.length; c < d; c++)
          null !== a[c].nTr && b.push(a[c].nTr);
        return b;
      }
      function J(a, b) {
        var c = [],
          d,
          e,
          f,
          g,
          h,
          j;
        e = 0;
        var o = a.aoData.length;
        b !== n && ((e = b), (o = b + 1));
        for (f = e; f < o; f++)
          if (((j = a.aoData[f]), null !== j.nTr)) {
            e = [];
            for (d = j.nTr.firstChild; d; )
              (g = d.nodeName.toLowerCase()),
                ("td" == g || "th" == g) && e.push(d),
                (d = d.nextSibling);
            g = d = 0;
            for (h = a.aoColumns.length; g < h; g++)
              a.aoColumns[g].bVisible
                ? c.push(e[g - d])
                : (c.push(j._anHidden[g]), d++);
          }
        return c;
      }
      function D(a, b, c) {
        a =
          null === a
            ? "DataTables warning: " + c
            : "DataTables warning (table id = '" + a.sTableId + "'): " + c;
        if (0 === b)
          if ("alert" == j.ext.sErrMode) alert(a);
          else throw Error(a);
        else X.console && console.log && console.log(a);
      }
      function p(a, b, c, d) {
        d === n && (d = c);
        b[c] !== n && (a[d] = b[c]);
      }
      function Ta(a, b) {
        var c, d;
        for (d in b)
          b.hasOwnProperty(d) &&
            ((c = b[d]),
            "object" === typeof e[d] && null !== c && !1 === h.isArray(c)
              ? h.extend(!0, a[d], c)
              : (a[d] = c));
        return a;
      }
      function Ra(a, b, c) {
        h(a)
          .bind("click.DT", b, function (b) {
            a.blur();
            c(b);
          })
          .bind("keypress.DT", b, function (a) {
            13 === a.which && c(a);
          })
          .bind("selectstart.DT", function () {
            return !1;
          });
      }
      function z(a, b, c, d) {
        c && a[b].push({ fn: c, sName: d });
      }
      function A(a, b, c, d) {
        for (var b = a[b], e = [], f = b.length - 1; 0 <= f; f--)
          e.push(b[f].fn.apply(a.oInstance, d));
        null !== c && h(a.oInstance).trigger(c, d);
        return e;
      }
      function Ua(a) {
        var b = h(
          '<div style="position:absolute; top:0; left:0; height:1px; width:1px; overflow:hidden"><div style="position:absolute; top:1px; left:1px; width:100px; overflow:scroll;"><div id="DT_BrowserTest" style="width:100%; height:10px;"></div></div></div>'
        )[0];
        l.body.appendChild(b);
        a.oBrowser.bScrollOversize =
          100 === h("#DT_BrowserTest", b)[0].offsetWidth ? !0 : !1;
        l.body.removeChild(b);
      }
      function Va(a) {
        return function () {
          var b = [s(this[j.ext.iApiIndex])].concat(
            Array.prototype.slice.call(arguments)
          );
          return j.ext.oApi[a].apply(this, b);
        };
      }
      var U = /\[.*?\]$/,
        Wa = X.JSON
          ? JSON.stringify
          : function (a) {
              var b = typeof a;
              if ("object" !== b || null === a)
                return "string" === b && (a = '"' + a + '"'), a + "";
              var c,
                d,
                e = [],
                f = h.isArray(a);
              for (c in a)
                (d = a[c]),
                  (b = typeof d),
                  "string" === b
                    ? (d = '"' + d + '"')
                    : "object" === b && null !== d && (d = Wa(d)),
                  e.push((f ? "" : '"' + c + '":') + d);
              return (f ? "[" : "{") + e + (f ? "]" : "}");
            };
      this.$ = function (a, b) {
        var c,
          d,
          e = [],
          f;
        d = s(this[j.ext.iApiIndex]);
        var g = d.aoData,
          o = d.aiDisplay,
          k = d.aiDisplayMaster;
        b || (b = {});
        b = h.extend({}, { filter: "none", order: "current", page: "all" }, b);
        if ("current" == b.page) {
          c = d._iDisplayStart;
          for (d = d.fnDisplayEnd(); c < d; c++) (f = g[o[c]].nTr) && e.push(f);
        } else if ("current" == b.order && "none" == b.filter) {
          c = 0;
          for (d = k.length; c < d; c++) (f = g[k[c]].nTr) && e.push(f);
        } else if ("current" == b.order && "applied" == b.filter) {
          c = 0;
          for (d = o.length; c < d; c++) (f = g[o[c]].nTr) && e.push(f);
        } else if ("original" == b.order && "none" == b.filter) {
          c = 0;
          for (d = g.length; c < d; c++) (f = g[c].nTr) && e.push(f);
        } else if ("original" == b.order && "applied" == b.filter) {
          c = 0;
          for (d = g.length; c < d; c++)
            (f = g[c].nTr), -1 !== h.inArray(c, o) && f && e.push(f);
        } else D(d, 1, "Unknown selection options");
        e = h(e);
        c = e.filter(a);
        e = e.find(a);
        return h([].concat(h.makeArray(c), h.makeArray(e)));
      };
      this._ = function (a, b) {
        var c = [],
          d,
          e,
          f = this.$(a, b);
        d = 0;
        for (e = f.length; d < e; d++) c.push(this.fnGetData(f[d]));
        return c;
      };
      this.fnAddData = function (a, b) {
        if (0 === a.length) return [];
        var c = [],
          d,
          e = s(this[j.ext.iApiIndex]);
        if ("object" === typeof a[0] && null !== a[0])
          for (var f = 0; f < a.length; f++) {
            d = H(e, a[f]);
            if (-1 == d) return c;
            c.push(d);
          }
        else {
          d = H(e, a);
          if (-1 == d) return c;
          c.push(d);
        }
        e.aiDisplay = e.aiDisplayMaster.slice();
        (b === n || b) && aa(e);
        return c;
      };
      this.fnAdjustColumnSizing = function (a) {
        var b = s(this[j.ext.iApiIndex]);
        k(b);
        a === n || a
          ? this.fnDraw(!1)
          : ("" !== b.oScroll.sX || "" !== b.oScroll.sY) &&
            this.oApi._fnScrollDraw(b);
      };
      this.fnClearTable = function (a) {
        var b = s(this[j.ext.iApiIndex]);
        ga(b);
        (a === n || a) && x(b);
      };
      this.fnClose = function (a) {
        for (
          var b = s(this[j.ext.iApiIndex]), c = 0;
          c < b.aoOpenRows.length;
          c++
        )
          if (b.aoOpenRows[c].nParent == a)
            return (
              (a = b.aoOpenRows[c].nTr.parentNode) &&
                a.removeChild(b.aoOpenRows[c].nTr),
              b.aoOpenRows.splice(c, 1),
              0
            );
        return 1;
      };
      this.fnDeleteRow = function (a, b, c) {
        var d = s(this[j.ext.iApiIndex]),
          e,
          f,
          a = "object" === typeof a ? I(d, a) : a,
          g = d.aoData.splice(a, 1);
        e = 0;
        for (f = d.aoData.length; e < f; e++)
          null !== d.aoData[e].nTr && (d.aoData[e].nTr._DT_RowIndex = e);
        e = h.inArray(a, d.aiDisplay);
        d.asDataSearch.splice(e, 1);
        ha(d.aiDisplayMaster, a);
        ha(d.aiDisplay, a);
        "function" === typeof b && b.call(this, d, g);
        d._iDisplayStart >= d.fnRecordsDisplay() &&
          ((d._iDisplayStart -= d._iDisplayLength),
          0 > d._iDisplayStart && (d._iDisplayStart = 0));
        if (c === n || c) y(d), x(d);
        return g;
      };
      this.fnDestroy = function (a) {
        var b = s(this[j.ext.iApiIndex]),
          c = b.nTableWrapper.parentNode,
          d = b.nTBody,
          i,
          f,
          a = a === n ? !1 : a;
        b.bDestroying = !0;
        A(b, "aoDestroyCallback", "destroy", [b]);
        if (!a) {
          i = 0;
          for (f = b.aoColumns.length; i < f; i++)
            !1 === b.aoColumns[i].bVisible && this.fnSetColumnVis(i, !0);
        }
        h(b.nTableWrapper).find("*").andSelf().unbind(".DT");
        h("tbody>tr>td." + b.oClasses.sRowEmpty, b.nTable)
          .parent()
          .remove();
        b.nTable != b.nTHead.parentNode &&
          (h(b.nTable).children("thead").remove(),
          b.nTable.appendChild(b.nTHead));
        b.nTFoot &&
          b.nTable != b.nTFoot.parentNode &&
          (h(b.nTable).children("tfoot").remove(),
          b.nTable.appendChild(b.nTFoot));
        b.nTable.parentNode.removeChild(b.nTable);
        h(b.nTableWrapper).remove();
        b.aaSorting = [];
        b.aaSortingFixed = [];
        P(b);
        h(T(b)).removeClass(b.asStripeClasses.join(" "));
        h("th, td", b.nTHead).removeClass(
          [
            b.oClasses.sSortable,
            b.oClasses.sSortableAsc,
            b.oClasses.sSortableDesc,
            b.oClasses.sSortableNone,
          ].join(" ")
        );
        b.bJUI &&
          (h(
            "th span." +
              b.oClasses.sSortIcon +
              ", td span." +
              b.oClasses.sSortIcon,
            b.nTHead
          ).remove(),
          h("th, td", b.nTHead).each(function () {
            var a = h("div." + b.oClasses.sSortJUIWrapper, this),
              c = a.contents();
            h(this).append(c);
            a.remove();
          }));
        !a && b.nTableReinsertBefore
          ? c.insertBefore(b.nTable, b.nTableReinsertBefore)
          : a || c.appendChild(b.nTable);
        i = 0;
        for (f = b.aoData.length; i < f; i++)
          null !== b.aoData[i].nTr && d.appendChild(b.aoData[i].nTr);
        !0 === b.oFeatures.bAutoWidth &&
          (b.nTable.style.width = q(b.sDestroyWidth));
        if ((f = b.asDestroyStripes.length)) {
          a = h(d).children("tr");
          for (i = 0; i < f; i++)
            a.filter(":nth-child(" + f + "n + " + i + ")").addClass(
              b.asDestroyStripes[i]
            );
        }
        i = 0;
        for (f = j.settings.length; i < f; i++)
          j.settings[i] == b && j.settings.splice(i, 1);
        e = b = null;
      };
      this.fnDraw = function (a) {
        var b = s(this[j.ext.iApiIndex]);
        !1 === a ? (y(b), x(b)) : aa(b);
      };
      this.fnFilter = function (a, b, c, d, e, f) {
        var g = s(this[j.ext.iApiIndex]);
        if (g.oFeatures.bFilter) {
          if (c === n || null === c) c = !1;
          if (d === n || null === d) d = !0;
          if (e === n || null === e) e = !0;
          if (f === n || null === f) f = !0;
          if (b === n || null === b) {
            if (
              (K(
                g,
                { sSearch: a + "", bRegex: c, bSmart: d, bCaseInsensitive: f },
                1
              ),
              e && g.aanFeatures.f)
            ) {
              b = g.aanFeatures.f;
              c = 0;
              for (d = b.length; c < d; c++)
                try {
                  b[c]._DT_Input != l.activeElement && h(b[c]._DT_Input).val(a);
                } catch (o) {
                  h(b[c]._DT_Input).val(a);
                }
            }
          } else
            h.extend(g.aoPreSearchCols[b], {
              sSearch: a + "",
              bRegex: c,
              bSmart: d,
              bCaseInsensitive: f,
            }),
              K(g, g.oPreviousSearch, 1);
        }
      };
      this.fnGetData = function (a, b) {
        var c = s(this[j.ext.iApiIndex]);
        if (a !== n) {
          var d = a;
          if ("object" === typeof a) {
            var e = a.nodeName.toLowerCase();
            "tr" === e
              ? (d = I(c, a))
              : "td" === e && ((d = I(c, a.parentNode)), (b = fa(c, d, a)));
          }
          return b !== n
            ? v(c, d, b, "")
            : c.aoData[d] !== n
            ? c.aoData[d]._aData
            : null;
        }
        return Z(c);
      };
      this.fnGetNodes = function (a) {
        var b = s(this[j.ext.iApiIndex]);
        return a !== n ? (b.aoData[a] !== n ? b.aoData[a].nTr : null) : T(b);
      };
      this.fnGetPosition = function (a) {
        var b = s(this[j.ext.iApiIndex]),
          c = a.nodeName.toUpperCase();
        return "TR" == c
          ? I(b, a)
          : "TD" == c || "TH" == c
          ? ((c = I(b, a.parentNode)), (a = fa(b, c, a)), [c, R(b, a), a])
          : null;
      };
      this.fnIsOpen = function (a) {
        for (
          var b = s(this[j.ext.iApiIndex]), c = 0;
          c < b.aoOpenRows.length;
          c++
        )
          if (b.aoOpenRows[c].nParent == a) return !0;
        return !1;
      };
      this.fnOpen = function (a, b, c) {
        var d = s(this[j.ext.iApiIndex]),
          e = T(d);
        if (-1 !== h.inArray(a, e)) {
          this.fnClose(a);
          var e = l.createElement("tr"),
            f = l.createElement("td");
          e.appendChild(f);
          f.className = c;
          f.colSpan = t(d);
          "string" === typeof b ? (f.innerHTML = b) : h(f).html(b);
          b = h("tr", d.nTBody);
          -1 != h.inArray(a, b) && h(e).insertAfter(a);
          d.aoOpenRows.push({ nTr: e, nParent: a });
          return e;
        }
      };
      this.fnPageChange = function (a, b) {
        var c = s(this[j.ext.iApiIndex]);
        qa(c, a);
        y(c);
        (b === n || b) && x(c);
      };
      this.fnSetColumnVis = function (a, b, c) {
        var d = s(this[j.ext.iApiIndex]),
          e,
          f,
          g = d.aoColumns,
          h = d.aoData,
          o,
          m;
        if (g[a].bVisible != b) {
          if (b) {
            for (e = f = 0; e < a; e++) g[e].bVisible && f++;
            m = f >= t(d);
            if (!m)
              for (e = a; e < g.length; e++)
                if (g[e].bVisible) {
                  o = e;
                  break;
                }
            e = 0;
            for (f = h.length; e < f; e++)
              null !== h[e].nTr &&
                (m
                  ? h[e].nTr.appendChild(h[e]._anHidden[a])
                  : h[e].nTr.insertBefore(h[e]._anHidden[a], J(d, e)[o]));
          } else {
            e = 0;
            for (f = h.length; e < f; e++)
              null !== h[e].nTr &&
                ((o = J(d, e)[a]),
                (h[e]._anHidden[a] = o),
                o.parentNode.removeChild(o));
          }
          g[a].bVisible = b;
          W(d, d.aoHeader);
          d.nTFoot && W(d, d.aoFooter);
          e = 0;
          for (f = d.aoOpenRows.length; e < f; e++)
            d.aoOpenRows[e].nTr.colSpan = t(d);
          if (c === n || c) k(d), x(d);
          ra(d);
        }
      };
      this.fnSettings = function () {
        return s(this[j.ext.iApiIndex]);
      };
      this.fnSort = function (a) {
        var b = s(this[j.ext.iApiIndex]);
        b.aaSorting = a;
        O(b);
      };
      this.fnSortListener = function (a, b, c) {
        ia(s(this[j.ext.iApiIndex]), a, b, c);
      };
      this.fnUpdate = function (a, b, c, d, e) {
        var f = s(this[j.ext.iApiIndex]),
          b = "object" === typeof b ? I(f, b) : b;
        if (h.isArray(a) && c === n) {
          f.aoData[b]._aData = a.slice();
          for (c = 0; c < f.aoColumns.length; c++)
            this.fnUpdate(v(f, b, c), b, c, !1, !1);
        } else if (h.isPlainObject(a) && c === n) {
          f.aoData[b]._aData = h.extend(!0, {}, a);
          for (c = 0; c < f.aoColumns.length; c++)
            this.fnUpdate(v(f, b, c), b, c, !1, !1);
        } else {
          F(f, b, c, a);
          var a = v(f, b, c, "display"),
            g = f.aoColumns[c];
          null !== g.fnRender &&
            ((a = S(f, b, c)), g.bUseRendered && F(f, b, c, a));
          null !== f.aoData[b].nTr && (J(f, b)[c].innerHTML = a);
        }
        c = h.inArray(b, f.aiDisplay);
        f.asDataSearch[c] = na(f, Y(f, b, "filter", r(f, "bSearchable")));
        (e === n || e) && k(f);
        (d === n || d) && aa(f);
        return 0;
      };
      this.fnVersionCheck = j.ext.fnVersionCheck;
      this.oApi = {
        _fnExternApiFunc: Va,
        _fnInitialise: ba,
        _fnInitComplete: $,
        _fnLanguageCompat: pa,
        _fnAddColumn: o,
        _fnColumnOptions: m,
        _fnAddData: H,
        _fnCreateTr: ea,
        _fnGatherData: ua,
        _fnBuildHead: va,
        _fnDrawHead: W,
        _fnDraw: x,
        _fnReDraw: aa,
        _fnAjaxUpdate: wa,
        _fnAjaxParameters: Ea,
        _fnAjaxUpdateDraw: Fa,
        _fnServerParams: ka,
        _fnAddOptionsHtml: xa,
        _fnFeatureHtmlTable: Ba,
        _fnScrollDraw: La,
        _fnAdjustColumnSizing: k,
        _fnFeatureHtmlFilter: za,
        _fnFilterComplete: K,
        _fnFilterCustom: Ia,
        _fnFilterColumn: Ha,
        _fnFilter: Ga,
        _fnBuildSearchArray: la,
        _fnBuildSearchRow: na,
        _fnFilterCreateSearch: ma,
        _fnDataToSearch: Ja,
        _fnSort: O,
        _fnSortAttachListener: ia,
        _fnSortingClasses: P,
        _fnFeatureHtmlPaginate: Da,
        _fnPageChange: qa,
        _fnFeatureHtmlInfo: Ca,
        _fnUpdateInfo: Ka,
        _fnFeatureHtmlLength: ya,
        _fnFeatureHtmlProcessing: Aa,
        _fnProcessingDisplay: E,
        _fnVisibleToColumnIndex: G,
        _fnColumnIndexToVisible: R,
        _fnNodeToDataIndex: I,
        _fnVisbleColumns: t,
        _fnCalculateEnd: y,
        _fnConvertToWidth: Ma,
        _fnCalculateColumnWidths: da,
        _fnScrollingWidthAdjust: Oa,
        _fnGetWidestNode: Na,
        _fnGetMaxLenString: Pa,
        _fnStringToCss: q,
        _fnDetectType: B,
        _fnSettingsFromNode: s,
        _fnGetDataMaster: Z,
        _fnGetTrNodes: T,
        _fnGetTdNodes: J,
        _fnEscapeRegex: oa,
        _fnDeleteIndex: ha,
        _fnReOrderIndex: u,
        _fnColumnOrdering: M,
        _fnLog: D,
        _fnClearTable: ga,
        _fnSaveState: ra,
        _fnLoadState: Sa,
        _fnCreateCookie: function (a, b, c, d, e) {
          var f = new Date();
          f.setTime(f.getTime() + 1e3 * c);
          var c = X.location.pathname.split("/"),
            a = a + "_" + c.pop().replace(/[\/:]/g, "").toLowerCase(),
            g;
          null !== e
            ? ((g =
                "function" === typeof h.parseJSON
                  ? h.parseJSON(b)
                  : eval("(" + b + ")")),
              (b = e(a, g, f.toGMTString(), c.join("/") + "/")))
            : (b =
                a +
                "=" +
                encodeURIComponent(b) +
                "; expires=" +
                f.toGMTString() +
                "; path=" +
                c.join("/") +
                "/");
          a = l.cookie.split(";");
          e = b.split(";")[0].length;
          f = [];
          if (4096 < e + l.cookie.length + 10) {
            for (var j = 0, o = a.length; j < o; j++)
              if (-1 != a[j].indexOf(d)) {
                var k = a[j].split("=");
                try {
                  (g = eval("(" + decodeURIComponent(k[1]) + ")")) &&
                    g.iCreate &&
                    f.push({ name: k[0], time: g.iCreate });
                } catch (m) {}
              }
            for (
              f.sort(function (a, b) {
                return b.time - a.time;
              });
              4096 < e + l.cookie.length + 10;

            ) {
              if (0 === f.length) return;
              d = f.pop();
              l.cookie =
                d.name +
                "=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=" +
                c.join("/") +
                "/";
            }
          }
          l.cookie = b;
        },
        _fnReadCookie: function (a) {
          for (
            var b = X.location.pathname.split("/"),
              a =
                a +
                "_" +
                b[b.length - 1].replace(/[\/:]/g, "").toLowerCase() +
                "=",
              b = l.cookie.split(";"),
              c = 0;
            c < b.length;
            c++
          ) {
            for (var d = b[c]; " " == d.charAt(0); )
              d = d.substring(1, d.length);
            if (0 === d.indexOf(a))
              return decodeURIComponent(d.substring(a.length, d.length));
          }
          return null;
        },
        _fnDetectHeader: V,
        _fnGetUniqueThs: N,
        _fnScrollBarWidth: Qa,
        _fnApplyToChildren: C,
        _fnMap: p,
        _fnGetRowData: Y,
        _fnGetCellData: v,
        _fnSetCellData: F,
        _fnGetObjectDataFn: Q,
        _fnSetObjectDataFn: L,
        _fnApplyColumnDefs: ta,
        _fnBindAction: Ra,
        _fnExtend: Ta,
        _fnCallbackReg: z,
        _fnCallbackFire: A,
        _fnJsonString: Wa,
        _fnRender: S,
        _fnNodeToColumnIndex: fa,
        _fnInfoMacros: ja,
        _fnBrowserDetect: Ua,
        _fnGetColumns: r,
      };
      h.extend(j.ext.oApi, this.oApi);
      for (var sa in j.ext.oApi) sa && (this[sa] = Va(sa));
      var ca = this;
      this.each(function () {
        var a = 0,
          b,
          c,
          d;
        c = this.getAttribute("id");
        var i = !1,
          f = !1;
        if ("table" != this.nodeName.toLowerCase())
          D(
            null,
            0,
            "Attempted to initialise DataTables on a node which is not a table: " +
              this.nodeName
          );
        else {
          a = 0;
          for (b = j.settings.length; a < b; a++) {
            if (j.settings[a].nTable == this) {
              if (e === n || e.bRetrieve) return j.settings[a].oInstance;
              if (e.bDestroy) {
                j.settings[a].oInstance.fnDestroy();
                break;
              } else {
                D(
                  j.settings[a],
                  0,
                  "Cannot reinitialise DataTable.\n\nTo retrieve the DataTables object for this table, pass no arguments or see the docs for bRetrieve and bDestroy"
                );
                return;
              }
            }
            if (j.settings[a].sTableId == this.id) {
              j.settings.splice(a, 1);
              break;
            }
          }
          if (null === c || "" === c)
            this.id = c =
              "DataTables_Table_" + j.ext._oExternConfig.iNextUnique++;
          var g = h.extend(!0, {}, j.models.oSettings, {
            nTable: this,
            oApi: ca.oApi,
            oInit: e,
            sDestroyWidth: h(this).width(),
            sInstance: c,
            sTableId: c,
          });
          j.settings.push(g);
          g.oInstance = 1 === ca.length ? ca : h(this).dataTable();
          e || (e = {});
          e.oLanguage && pa(e.oLanguage);
          e = Ta(h.extend(!0, {}, j.defaults), e);
          p(g.oFeatures, e, "bPaginate");
          p(g.oFeatures, e, "bLengthChange");
          p(g.oFeatures, e, "bFilter");
          p(g.oFeatures, e, "bSort");
          p(g.oFeatures, e, "bInfo");
          p(g.oFeatures, e, "bProcessing");
          p(g.oFeatures, e, "bAutoWidth");
          p(g.oFeatures, e, "bSortClasses");
          p(g.oFeatures, e, "bServerSide");
          p(g.oFeatures, e, "bDeferRender");
          p(g.oScroll, e, "sScrollX", "sX");
          p(g.oScroll, e, "sScrollXInner", "sXInner");
          p(g.oScroll, e, "sScrollY", "sY");
          p(g.oScroll, e, "bScrollCollapse", "bCollapse");
          p(g.oScroll, e, "bScrollInfinite", "bInfinite");
          p(g.oScroll, e, "iScrollLoadGap", "iLoadGap");
          p(g.oScroll, e, "bScrollAutoCss", "bAutoCss");
          p(g, e, "asStripeClasses");
          p(g, e, "asStripClasses", "asStripeClasses");
          p(g, e, "fnServerData");
          p(g, e, "fnFormatNumber");
          p(g, e, "sServerMethod");
          p(g, e, "aaSorting");
          p(g, e, "aaSortingFixed");
          p(g, e, "aLengthMenu");
          p(g, e, "sPaginationType");
          p(g, e, "sAjaxSource");
          p(g, e, "sAjaxDataProp");
          p(g, e, "iCookieDuration");
          p(g, e, "sCookiePrefix");
          p(g, e, "sDom");
          p(g, e, "bSortCellsTop");
          p(g, e, "iTabIndex");
          p(g, e, "oSearch", "oPreviousSearch");
          p(g, e, "aoSearchCols", "aoPreSearchCols");
          p(g, e, "iDisplayLength", "_iDisplayLength");
          p(g, e, "bJQueryUI", "bJUI");
          p(g, e, "fnCookieCallback");
          p(g, e, "fnStateLoad");
          p(g, e, "fnStateSave");
          p(g.oLanguage, e, "fnInfoCallback");
          z(g, "aoDrawCallback", e.fnDrawCallback, "user");
          z(g, "aoServerParams", e.fnServerParams, "user");
          z(g, "aoStateSaveParams", e.fnStateSaveParams, "user");
          z(g, "aoStateLoadParams", e.fnStateLoadParams, "user");
          z(g, "aoStateLoaded", e.fnStateLoaded, "user");
          z(g, "aoRowCallback", e.fnRowCallback, "user");
          z(g, "aoRowCreatedCallback", e.fnCreatedRow, "user");
          z(g, "aoHeaderCallback", e.fnHeaderCallback, "user");
          z(g, "aoFooterCallback", e.fnFooterCallback, "user");
          z(g, "aoInitComplete", e.fnInitComplete, "user");
          z(g, "aoPreDrawCallback", e.fnPreDrawCallback, "user");
          g.oFeatures.bServerSide &&
          g.oFeatures.bSort &&
          g.oFeatures.bSortClasses
            ? z(g, "aoDrawCallback", P, "server_side_sort_classes")
            : g.oFeatures.bDeferRender &&
              z(g, "aoDrawCallback", P, "defer_sort_classes");
          e.bJQueryUI
            ? (h.extend(g.oClasses, j.ext.oJUIClasses),
              e.sDom === j.defaults.sDom &&
                "lfrtip" === j.defaults.sDom &&
                (g.sDom = '<"H"lfr>t<"F"ip>'))
            : h.extend(g.oClasses, j.ext.oStdClasses);
          h(this).addClass(g.oClasses.sTable);
          if ("" !== g.oScroll.sX || "" !== g.oScroll.sY)
            g.oScroll.iBarWidth = Qa();
          g.iInitDisplayStart === n &&
            ((g.iInitDisplayStart = e.iDisplayStart),
            (g._iDisplayStart = e.iDisplayStart));
          e.bStateSave &&
            ((g.oFeatures.bStateSave = !0),
            Sa(g, e),
            z(g, "aoDrawCallback", ra, "state_save"));
          null !== e.iDeferLoading &&
            ((g.bDeferLoading = !0),
            (a = h.isArray(e.iDeferLoading)),
            (g._iRecordsDisplay = a ? e.iDeferLoading[0] : e.iDeferLoading),
            (g._iRecordsTotal = a ? e.iDeferLoading[1] : e.iDeferLoading));
          null !== e.aaData && (f = !0);
          "" !== e.oLanguage.sUrl
            ? ((g.oLanguage.sUrl = e.oLanguage.sUrl),
              h.getJSON(g.oLanguage.sUrl, null, function (a) {
                pa(a);
                h.extend(true, g.oLanguage, e.oLanguage, a);
                ba(g);
              }),
              (i = !0))
            : h.extend(!0, g.oLanguage, e.oLanguage);
          null === e.asStripeClasses &&
            (g.asStripeClasses = [
              g.oClasses.sStripeOdd,
              g.oClasses.sStripeEven,
            ]);
          b = g.asStripeClasses.length;
          g.asDestroyStripes = [];
          if (b) {
            c = !1;
            d = h(this)
              .children("tbody")
              .children("tr:lt(" + b + ")");
            for (a = 0; a < b; a++)
              d.hasClass(g.asStripeClasses[a]) &&
                ((c = !0), g.asDestroyStripes.push(g.asStripeClasses[a]));
            c && d.removeClass(g.asStripeClasses.join(" "));
          }
          c = [];
          a = this.getElementsByTagName("thead");
          0 !== a.length && (V(g.aoHeader, a[0]), (c = N(g)));
          if (null === e.aoColumns) {
            d = [];
            a = 0;
            for (b = c.length; a < b; a++) d.push(null);
          } else d = e.aoColumns;
          a = 0;
          for (b = d.length; a < b; a++)
            e.saved_aoColumns !== n &&
              e.saved_aoColumns.length == b &&
              (null === d[a] && (d[a] = {}),
              (d[a].bVisible = e.saved_aoColumns[a].bVisible)),
              o(g, c ? c[a] : null);
          ta(g, e.aoColumnDefs, d, function (a, b) {
            m(g, a, b);
          });
          a = 0;
          for (b = g.aaSorting.length; a < b; a++) {
            g.aaSorting[a][0] >= g.aoColumns.length && (g.aaSorting[a][0] = 0);
            var k = g.aoColumns[g.aaSorting[a][0]];
            g.aaSorting[a][2] === n && (g.aaSorting[a][2] = 0);
            e.aaSorting === n &&
              g.saved_aaSorting === n &&
              (g.aaSorting[a][1] = k.asSorting[0]);
            c = 0;
            for (d = k.asSorting.length; c < d; c++)
              if (g.aaSorting[a][1] == k.asSorting[c]) {
                g.aaSorting[a][2] = c;
                break;
              }
          }
          P(g);
          Ua(g);
          a = h(this)
            .children("caption")
            .each(function () {
              this._captionSide = h(this).css("caption-side");
            });
          b = h(this).children("thead");
          0 === b.length &&
            ((b = [l.createElement("thead")]), this.appendChild(b[0]));
          g.nTHead = b[0];
          b = h(this).children("tbody");
          0 === b.length &&
            ((b = [l.createElement("tbody")]), this.appendChild(b[0]));
          g.nTBody = b[0];
          g.nTBody.setAttribute("role", "alert");
          g.nTBody.setAttribute("aria-live", "polite");
          g.nTBody.setAttribute("aria-relevant", "all");
          b = h(this).children("tfoot");
          if (
            0 === b.length &&
            0 < a.length &&
            ("" !== g.oScroll.sX || "" !== g.oScroll.sY)
          )
            (b = [l.createElement("tfoot")]), this.appendChild(b[0]);
          0 < b.length && ((g.nTFoot = b[0]), V(g.aoFooter, g.nTFoot));
          if (f) for (a = 0; a < e.aaData.length; a++) H(g, e.aaData[a]);
          else ua(g);
          g.aiDisplay = g.aiDisplayMaster.slice();
          g.bInitialised = !0;
          !1 === i && ba(g);
        }
      });
      ca = null;
      return this;
    };
    j.fnVersionCheck = function (e) {
      for (
        var h = function (e, h) {
            for (; e.length < h; ) e += "0";
            return e;
          },
          m = j.ext.sVersion.split("."),
          e = e.split("."),
          k = "",
          n = "",
          l = 0,
          t = e.length;
        l < t;
        l++
      )
        (k += h(m[l], 3)), (n += h(e[l], 3));
      return parseInt(k, 10) >= parseInt(n, 10);
    };
    j.fnIsDataTable = function (e) {
      for (var h = j.settings, m = 0; m < h.length; m++)
        if (
          h[m].nTable === e ||
          h[m].nScrollHead === e ||
          h[m].nScrollFoot === e
        )
          return !0;
      return !1;
    };
    j.fnTables = function (e) {
      var o = [];
      jQuery.each(j.settings, function (j, k) {
        (!e || (!0 === e && h(k.nTable).is(":visible"))) && o.push(k.nTable);
      });
      return o;
    };
    j.version = "1.9.4";
    j.settings = [];
    j.models = {};
    j.models.ext = {
      afnFiltering: [],
      afnSortData: [],
      aoFeatures: [],
      aTypes: [],
      fnVersionCheck: j.fnVersionCheck,
      iApiIndex: 0,
      ofnSearch: {},
      oApi: {},
      oStdClasses: {},
      oJUIClasses: {},
      oPagination: {},
      oSort: {},
      sVersion: j.version,
      sErrMode: "alert",
      _oExternConfig: { iNextUnique: 0 },
    };
    j.models.oSearch = {
      bCaseInsensitive: !0,
      sSearch: "",
      bRegex: !1,
      bSmart: !0,
    };
    j.models.oRow = {
      nTr: null,
      _aData: [],
      _aSortData: [],
      _anHidden: [],
      _sRowStripe: "",
    };
    j.models.oColumn = {
      aDataSort: null,
      asSorting: null,
      bSearchable: null,
      bSortable: null,
      bUseRendered: null,
      bVisible: null,
      _bAutoType: !0,
      fnCreatedCell: null,
      fnGetData: null,
      fnRender: null,
      fnSetData: null,
      mData: null,
      mRender: null,
      nTh: null,
      nTf: null,
      sClass: null,
      sContentPadding: null,
      sDefaultContent: null,
      sName: null,
      sSortDataType: "std",
      sSortingClass: null,
      sSortingClassJUI: null,
      sTitle: null,
      sType: null,
      sWidth: null,
      sWidthOrig: null,
    };
    j.defaults = {
      aaData: null,
      aaSorting: [[0, "asc"]],
      aaSortingFixed: null,
      aLengthMenu: [10, 25, 50, 100],
      aoColumns: null,
      aoColumnDefs: null,
      aoSearchCols: [],
      asStripeClasses: null,
      bAutoWidth: !0,
      bDeferRender: !1,
      bDestroy: !1,
      bFilter: !0,
      bInfo: !0,
      bJQueryUI: !1,
      bLengthChange: !0,
      bPaginate: !0,
      bProcessing: !1,
      bRetrieve: !1,
      bScrollAutoCss: !0,
      bScrollCollapse: !1,
      bScrollInfinite: !1,
      bServerSide: !1,
      bSort: !0,
      bSortCellsTop: !1,
      bSortClasses: !0,
      bStateSave: !1,
      fnCookieCallback: null,
      fnCreatedRow: null,
      fnDrawCallback: null,
      fnFooterCallback: null,
      fnFormatNumber: function (e) {
        if (1e3 > e) return e;
        for (
          var h = e + "", e = h.split(""), j = "", h = h.length, k = 0;
          k < h;
          k++
        )
          0 === k % 3 && 0 !== k && (j = this.oLanguage.sInfoThousands + j),
            (j = e[h - k - 1] + j);
        return j;
      },
      fnHeaderCallback: null,
      fnInfoCallback: null,
      fnInitComplete: null,
      fnPreDrawCallback: null,
      fnRowCallback: null,
      fnServerData: function (e, j, m, k) {
        k.jqXHR = h.ajax({
          url: e,
          data: j,
          success: function (e) {
            e.sError && k.oApi._fnLog(k, 0, e.sError);
            h(k.oInstance).trigger("xhr", [k, e]);
            m(e);
          },
          dataType: "json",
          cache: !1,
          type: k.sServerMethod,
          error: function (e, h) {
            "parsererror" == h &&
              k.oApi._fnLog(
                k,
                0,
                "DataTables warning: JSON data from server could not be parsed. This is caused by a JSON formatting error."
              );
          },
        });
      },
      fnServerParams: null,
      fnStateLoad: function (e) {
        var e = this.oApi._fnReadCookie(e.sCookiePrefix + e.sInstance),
          j;
        try {
          j =
            "function" === typeof h.parseJSON
              ? h.parseJSON(e)
              : eval("(" + e + ")");
        } catch (m) {
          j = null;
        }
        return j;
      },
      fnStateLoadParams: null,
      fnStateLoaded: null,
      fnStateSave: function (e, h) {
        this.oApi._fnCreateCookie(
          e.sCookiePrefix + e.sInstance,
          this.oApi._fnJsonString(h),
          e.iCookieDuration,
          e.sCookiePrefix,
          e.fnCookieCallback
        );
      },
      fnStateSaveParams: null,
      iCookieDuration: 7200,
      iDeferLoading: null,
      iDisplayLength: 10,
      iDisplayStart: 0,
      iScrollLoadGap: 100,
      iTabIndex: 0,
      oLanguage: {
        oAria: {
          sSortAscending: ": activate to sort column ascending",
          sSortDescending: ": activate to sort column descending",
        },
        oPaginate: {
          sFirst: "First",
          sLast: "Last",
          sNext: "Next",
          sPrevious: "Previous",
        },
        sEmptyTable: "No data available",
        sInfo: "Showing _START_ to _END_ of _TOTAL_ entries",
        sInfoEmpty: "Showing 0 to 0 of 0 entries",
        sInfoFiltered: "(filtered from _MAX_ total entries)",
        sInfoPostFix: "",
        sInfoThousands: ",",
        sLengthMenu: "Show _MENU_ entries",
        sLoadingRecords: "Loading...",
        sProcessing: "Processing...",
        sSearch: "Search:",
        sUrl: "",
        sZeroRecords: "No matching records found",
      },
      oSearch: h.extend({}, j.models.oSearch),
      sAjaxDataProp: "aaData",
      sAjaxSource: null,
      sCookiePrefix: "SpryMedia_DataTables_",
      sDom: "lfrtip",
      sPaginationType: "two_button",
      sScrollX: "",
      sScrollXInner: "",
      sScrollY: "",
      sServerMethod: "GET",
    };
    j.defaults.columns = {
      aDataSort: null,
      asSorting: ["asc", "desc"],
      bSearchable: !0,
      bSortable: !0,
      bUseRendered: !0,
      bVisible: !0,
      fnCreatedCell: null,
      fnRender: null,
      iDataSort: -1,
      mData: null,
      mRender: null,
      sCellType: "td",
      sClass: "",
      sContentPadding: "",
      sDefaultContent: null,
      sName: "",
      sSortDataType: "std",
      sTitle: null,
      sType: null,
      sWidth: null,
    };
    j.models.oSettings = {
      oFeatures: {
        bAutoWidth: null,
        bDeferRender: null,
        bFilter: null,
        bInfo: null,
        bLengthChange: null,
        bPaginate: null,
        bProcessing: null,
        bServerSide: null,
        bSort: null,
        bSortClasses: null,
        bStateSave: null,
      },
      oScroll: {
        bAutoCss: null,
        bCollapse: null,
        bInfinite: null,
        iBarWidth: 0,
        iLoadGap: null,
        sX: null,
        sXInner: null,
        sY: null,
      },
      oLanguage: { fnInfoCallback: null },
      oBrowser: { bScrollOversize: !1 },
      aanFeatures: [],
      aoData: [],
      aiDisplay: [],
      aiDisplayMaster: [],
      aoColumns: [],
      aoHeader: [],
      aoFooter: [],
      asDataSearch: [],
      oPreviousSearch: {},
      aoPreSearchCols: [],
      aaSorting: null,
      aaSortingFixed: null,
      asStripeClasses: null,
      asDestroyStripes: [],
      sDestroyWidth: 0,
      aoRowCallback: [],
      aoHeaderCallback: [],
      aoFooterCallback: [],
      aoDrawCallback: [],
      aoRowCreatedCallback: [],
      aoPreDrawCallback: [],
      aoInitComplete: [],
      aoStateSaveParams: [],
      aoStateLoadParams: [],
      aoStateLoaded: [],
      sTableId: "",
      nTable: null,
      nTHead: null,
      nTFoot: null,
      nTBody: null,
      nTableWrapper: null,
      bDeferLoading: !1,
      bInitialised: !1,
      aoOpenRows: [],
      sDom: null,
      sPaginationType: "two_button",
      iCookieDuration: 0,
      sCookiePrefix: "",
      fnCookieCallback: null,
      aoStateSave: [],
      aoStateLoad: [],
      oLoadedState: null,
      sAjaxSource: null,
      sAjaxDataProp: null,
      bAjaxDataGet: !0,
      jqXHR: null,
      fnServerData: null,
      aoServerParams: [],
      sServerMethod: null,
      fnFormatNumber: null,
      aLengthMenu: null,
      iDraw: 0,
      bDrawing: !1,
      iDrawError: -1,
      _iDisplayLength: 10,
      _iDisplayStart: 0,
      _iDisplayEnd: 10,
      _iRecordsTotal: 0,
      _iRecordsDisplay: 0,
      bJUI: null,
      oClasses: {},
      bFiltered: !1,
      bSorted: !1,
      bSortCellsTop: null,
      oInit: null,
      aoDestroyCallback: [],
      fnRecordsTotal: function () {
        return this.oFeatures.bServerSide
          ? parseInt(this._iRecordsTotal, 10)
          : this.aiDisplayMaster.length;
      },
      fnRecordsDisplay: function () {
        return this.oFeatures.bServerSide
          ? parseInt(this._iRecordsDisplay, 10)
          : this.aiDisplay.length;
      },
      fnDisplayEnd: function () {
        return this.oFeatures.bServerSide
          ? !1 === this.oFeatures.bPaginate || -1 == this._iDisplayLength
            ? this._iDisplayStart + this.aiDisplay.length
            : Math.min(
                this._iDisplayStart + this._iDisplayLength,
                this._iRecordsDisplay
              )
          : this._iDisplayEnd;
      },
      oInstance: null,
      sInstance: null,
      iTabIndex: 0,
      nScrollHead: null,
      nScrollFoot: null,
    };
    j.ext = h.extend(!0, {}, j.models.ext);
    h.extend(j.ext.oStdClasses, {
      sTable: "dataTable",
      sPagePrevEnabled: "paginate_enabled_previous",
      sPagePrevDisabled: "paginate_disabled_previous",
      sPageNextEnabled: "paginate_enabled_next",
      sPageNextDisabled: "paginate_disabled_next",
      sPageJUINext: "",
      sPageJUIPrev: "",
      sPageButton: "paginate_button",
      sPageButtonActive: "paginate_active",
      sPageButtonStaticDisabled: "paginate_button paginate_button_disabled",
      sPageFirst: "first",
      sPagePrevious: "previous",
      sPageNext: "next",
      sPageLast: "last",
      sStripeOdd: "odd",
      sStripeEven: "even",
      sRowEmpty: "dataTables_empty",
      sWrapper: "dataTables_wrapper",
      sFilter: "dataTables_filter",
      sInfo: "dataTables_info",
      sPaging: "dataTables_paginate paging_",
      sLength: "dataTables_length",
      sProcessing: "dataTables_processing",
      sSortAsc: "sorting_asc",
      sSortDesc: "sorting_desc",
      sSortable: "sorting",
      sSortableAsc: "sorting_asc_disabled",
      sSortableDesc: "sorting_desc_disabled",
      sSortableNone: "sorting_disabled",
      sSortColumn: "sorting_",
      sSortJUIAsc: "",
      sSortJUIDesc: "",
      sSortJUI: "",
      sSortJUIAscAllowed: "",
      sSortJUIDescAllowed: "",
      sSortJUIWrapper: "",
      sSortIcon: "",
      sScrollWrapper: "dataTables_scroll",
      sScrollHead: "dataTables_scrollHead",
      sScrollHeadInner: "dataTables_scrollHeadInner",
      sScrollBody: "dataTables_scrollBody",
      sScrollFoot: "dataTables_scrollFoot",
      sScrollFootInner: "dataTables_scrollFootInner",
      sFooterTH: "",
      sJUIHeader: "",
      sJUIFooter: "",
    });
    h.extend(j.ext.oJUIClasses, j.ext.oStdClasses, {
      sPagePrevEnabled: "fg-button ui-button ui-state-default ui-corner-left",
      sPagePrevDisabled:
        "fg-button ui-button ui-state-default ui-corner-left ui-state-disabled",
      sPageNextEnabled: "fg-button ui-button ui-state-default ui-corner-right",
      sPageNextDisabled:
        "fg-button ui-button ui-state-default ui-corner-right ui-state-disabled",
      sPageJUINext: "ui-icon ui-icon-circle-arrow-e",
      sPageJUIPrev: "ui-icon ui-icon-circle-arrow-w",
      sPageButton: "fg-button ui-button ui-state-default",
      sPageButtonActive:
        "fg-button ui-button ui-state-default ui-state-disabled",
      sPageButtonStaticDisabled:
        "fg-button ui-button ui-state-default ui-state-disabled",
      sPageFirst: "first ui-corner-tl ui-corner-bl",
      sPageLast: "last ui-corner-tr ui-corner-br",
      sPaging:
        "dataTables_paginate fg-buttonset ui-buttonset fg-buttonset-multi ui-buttonset-multi paging_",
      sSortAsc: "ui-state-default",
      sSortDesc: "ui-state-default",
      sSortable: "ui-state-default",
      sSortableAsc: "ui-state-default",
      sSortableDesc: "ui-state-default",
      sSortableNone: "ui-state-default",
      sSortJUIAsc: "css_right ui-icon ui-icon-triangle-1-n",
      sSortJUIDesc: "css_right ui-icon ui-icon-triangle-1-s",
      sSortJUI: "css_right ui-icon ui-icon-carat-2-n-s",
      sSortJUIAscAllowed: "css_right ui-icon ui-icon-carat-1-n",
      sSortJUIDescAllowed: "css_right ui-icon ui-icon-carat-1-s",
      sSortJUIWrapper: "DataTables_sort_wrapper",
      sSortIcon: "DataTables_sort_icon",
      sScrollHead: "dataTables_scrollHead ui-state-default",
      sScrollFoot: "dataTables_scrollFoot ui-state-default",
      sFooterTH: "ui-state-default",
      sJUIHeader:
        "fg-toolbar ui-toolbar ui-widget-header ui-corner-tl ui-corner-tr ui-helper-clearfix",
      sJUIFooter:
        "fg-toolbar ui-toolbar ui-widget-header ui-corner-bl ui-corner-br ui-helper-clearfix",
    });
    h.extend(j.ext.oPagination, {
      two_button: {
        fnInit: function (e, j, m) {
          var k = e.oLanguage.oPaginate,
            n = function (h) {
              e.oApi._fnPageChange(e, h.data.action) && m(e);
            },
            k = !e.bJUI
              ? '<a class="' +
                e.oClasses.sPagePrevDisabled +
                '" tabindex="' +
                e.iTabIndex +
                '" role="button">' +
                k.sPrevious +
                '</a><a class="' +
                e.oClasses.sPageNextDisabled +
                '" tabindex="' +
                e.iTabIndex +
                '" role="button">' +
                k.sNext +
                "</a>"
              : '<a class="' +
                e.oClasses.sPagePrevDisabled +
                '" tabindex="' +
                e.iTabIndex +
                '" role="button"><span class="' +
                e.oClasses.sPageJUIPrev +
                '"></span></a><a class="' +
                e.oClasses.sPageNextDisabled +
                '" tabindex="' +
                e.iTabIndex +
                '" role="button"><span class="' +
                e.oClasses.sPageJUINext +
                '"></span></a>';
          h(j).append(k);
          var l = h("a", j),
            k = l[0],
            l = l[1];
          e.oApi._fnBindAction(k, { action: "previous" }, n);
          e.oApi._fnBindAction(l, { action: "next" }, n);
          e.aanFeatures.p ||
            ((j.id = e.sTableId + "_paginate"),
            (k.id = e.sTableId + "_previous"),
            (l.id = e.sTableId + "_next"),
            k.setAttribute("aria-controls", e.sTableId),
            l.setAttribute("aria-controls", e.sTableId));
        },
        fnUpdate: function (e) {
          if (e.aanFeatures.p)
            for (
              var h = e.oClasses, j = e.aanFeatures.p, k, l = 0, n = j.length;
              l < n;
              l++
            )
              if ((k = j[l].firstChild))
                (k.className =
                  0 === e._iDisplayStart
                    ? h.sPagePrevDisabled
                    : h.sPagePrevEnabled),
                  (k = k.nextSibling),
                  (k.className =
                    e.fnDisplayEnd() == e.fnRecordsDisplay()
                      ? h.sPageNextDisabled
                      : h.sPageNextEnabled);
        },
      },
      iFullNumbersShowPages: 5,
      full_numbers: {
        fnInit: function (e, j, m) {
          var k = e.oLanguage.oPaginate,
            l = e.oClasses,
            n = function (h) {
              e.oApi._fnPageChange(e, h.data.action) && m(e);
            };
          h(j).append(
            '<a  tabindex="' +
              e.iTabIndex +
              '" class="' +
              l.sPageButton +
              " " +
              l.sPageFirst +
              '">' +
              k.sFirst +
              '</a><a  tabindex="' +
              e.iTabIndex +
              '" class="' +
              l.sPageButton +
              " " +
              l.sPagePrevious +
              '">' +
              k.sPrevious +
              '</a><span></span><a tabindex="' +
              e.iTabIndex +
              '" class="' +
              l.sPageButton +
              " " +
              l.sPageNext +
              '">' +
              k.sNext +
              '</a><a tabindex="' +
              e.iTabIndex +
              '" class="' +
              l.sPageButton +
              " " +
              l.sPageLast +
              '">' +
              k.sLast +
              "</a>"
          );
          var t = h("a", j),
            k = t[0],
            l = t[1],
            r = t[2],
            t = t[3];
          e.oApi._fnBindAction(k, { action: "first" }, n);
          e.oApi._fnBindAction(l, { action: "previous" }, n);
          e.oApi._fnBindAction(r, { action: "next" }, n);
          e.oApi._fnBindAction(t, { action: "last" }, n);
          e.aanFeatures.p ||
            ((j.id = e.sTableId + "_paginate"),
            (k.id = e.sTableId + "_first"),
            (l.id = e.sTableId + "_previous"),
            (r.id = e.sTableId + "_next"),
            (t.id = e.sTableId + "_last"));
        },
        fnUpdate: function (e, o) {
          if (e.aanFeatures.p) {
            var m = j.ext.oPagination.iFullNumbersShowPages,
              k = Math.floor(m / 2),
              l = Math.ceil(e.fnRecordsDisplay() / e._iDisplayLength),
              n = Math.ceil(e._iDisplayStart / e._iDisplayLength) + 1,
              t = "",
              r,
              B = e.oClasses,
              u,
              M = e.aanFeatures.p,
              L = function (h) {
                e.oApi._fnBindAction(this, { page: h + r - 1 }, function (h) {
                  e.oApi._fnPageChange(e, h.data.page);
                  o(e);
                  h.preventDefault();
                });
              };
            -1 === e._iDisplayLength
              ? (n = k = r = 1)
              : l < m
              ? ((r = 1), (k = l))
              : n <= k
              ? ((r = 1), (k = m))
              : n >= l - k
              ? ((r = l - m + 1), (k = l))
              : ((r = n - Math.ceil(m / 2) + 1), (k = r + m - 1));
            for (m = r; m <= k; m++)
              t +=
                n !== m
                  ? '<a tabindex="' +
                    e.iTabIndex +
                    '" class="' +
                    B.sPageButton +
                    '">' +
                    e.fnFormatNumber(m) +
                    "</a>"
                  : '<a tabindex="' +
                    e.iTabIndex +
                    '" class="' +
                    B.sPageButtonActive +
                    '">' +
                    e.fnFormatNumber(m) +
                    "</a>";
            m = 0;
            for (k = M.length; m < k; m++)
              (u = M[m]),
                u.hasChildNodes() &&
                  (h("span:eq(0)", u).html(t).children("a").each(L),
                  (u = u.getElementsByTagName("a")),
                  (u = [u[0], u[1], u[u.length - 2], u[u.length - 1]]),
                  h(u).removeClass(
                    B.sPageButton +
                      " " +
                      B.sPageButtonActive +
                      " " +
                      B.sPageButtonStaticDisabled
                  ),
                  h([u[0], u[1]]).addClass(
                    1 == n ? B.sPageButtonStaticDisabled : B.sPageButton
                  ),
                  h([u[2], u[3]]).addClass(
                    0 === l || n === l || -1 === e._iDisplayLength
                      ? B.sPageButtonStaticDisabled
                      : B.sPageButton
                  ));
          }
        },
      },
    });
    h.extend(j.ext.oSort, {
      "string-pre": function (e) {
        "string" != typeof e &&
          (e = null !== e && e.toString ? e.toString() : "");
        return e.toLowerCase();
      },
      "string-asc": function (e, h) {
        return e < h ? -1 : e > h ? 1 : 0;
      },
      "string-desc": function (e, h) {
        return e < h ? 1 : e > h ? -1 : 0;
      },
      "html-pre": function (e) {
        return e.replace(/<.*?>/g, "").toLowerCase();
      },
      "html-asc": function (e, h) {
        return e < h ? -1 : e > h ? 1 : 0;
      },
      "html-desc": function (e, h) {
        return e < h ? 1 : e > h ? -1 : 0;
      },
      "date-pre": function (e) {
        e = Date.parse(e);
        if (isNaN(e) || "" === e) e = Date.parse("01/01/1970 00:00:00");
        return e;
      },
      "date-asc": function (e, h) {
        return e - h;
      },
      "date-desc": function (e, h) {
        return h - e;
      },
      "numeric-pre": function (e) {
        return "-" == e || "" === e ? 0 : 1 * e;
      },
      "numeric-asc": function (e, h) {
        return e - h;
      },
      "numeric-desc": function (e, h) {
        return h - e;
      },
    });
    h.extend(j.ext.aTypes, [
      function (e) {
        if ("number" === typeof e) return "numeric";
        if ("string" !== typeof e) return null;
        var h,
          j = !1;
        h = e.charAt(0);
        if (-1 == "0123456789-".indexOf(h)) return null;
        for (var k = 1; k < e.length; k++) {
          h = e.charAt(k);
          if (-1 == "0123456789.".indexOf(h)) return null;
          if ("." == h) {
            if (j) return null;
            j = !0;
          }
        }
        return "numeric";
      },
      function (e) {
        var h = Date.parse(e);
        return (null !== h && !isNaN(h)) ||
          ("string" === typeof e && 0 === e.length)
          ? "date"
          : null;
      },
      function (e) {
        return "string" === typeof e &&
          -1 != e.indexOf("<") &&
          -1 != e.indexOf(">")
          ? "html"
          : null;
      },
    ]);
    h.fn.DataTable = j;
    h.fn.dataTable = j;
    h.fn.dataTableSettings = j.settings;
    h.fn.dataTableExt = j.ext;
  };
  "function" === typeof define && define.amd
    ? define(["jquery"], L)
    : jQuery && !jQuery.fn.dataTable && L(jQuery);
})(window, document);

(function ($) {
  $.fn.dataTableExt.oApi.fnStandingRedraw = function (oSettings) {
    if (oSettings.oFeatures.bServerSide === false) {
      var before = oSettings._iDisplayStart;

      oSettings.oApi._fnReDraw(oSettings);

      // iDisplayStart has been reset to zero - so lets change it back
      oSettings._iDisplayStart = before;
      oSettings.oApi._fnCalculateEnd(oSettings);
    }

    // draw the 'current' page
    oSettings.oApi._fnDraw(oSettings);
  };
})(jQuery);
