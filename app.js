////////////////////////////////////////////////////////////////////////////////

// Copyright © 2016, 2018 Alan WF
// 
// alanwf@alanwf.com
//
// This file is part of Lens Slate.
// 
// Lens Slate is free software: you can redistribute it and/or modify it
// under the terms of the GNU General Public License as published by the
// Free Software Foundation, either version 3 of the License, or (at your
// option) any later version.
// 
// This program is distributed in the hope that it will be useful, but
// WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
// General Public License for more details.
// 
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>. 
    
////////////////////////////////////////////////////////////////////////////////

// When you change the version here, make sure you also change it in the 
// About page in app.html.

var version = "4.4";

////////////////////////////////////////////////////////////////////////////////

$(function() {
  try {
    if (/^\?page=/.test(location.search)) {
      setPage(location.search.substring(6));
    } else if (!isStandalone()) {
      if (isiOS()) {
        setPage("install-ios");
      } else if (isAndroid()) {
        setPage("install-android")
      } else {
        setPage("install-other");
      }
    } else {
      if (getVersion() === "") {
        setVersion(version);
        setPage("welcome");
      } else if (getVersion() !== version) {
        setVersion(version);
        alert("Lens Slate has been automatically updated to version " + version + ".");
      } else if (/^install-/.test(getPage())) {
        setPage("welcome");
      }
    }
    openPage(getPage());
  }
  catch (e) {
    internalError(e);
  }
});

function openPage(page) {
  if (page === "main") {
    mainPageOpen();
  } else if (page === "sync") {
    syncPageOpen();
  } else if (page === "more") {
    morePageOpen();
  } else if (page === "registerLens") {
    registerLensPageOpen();
  } else if (page === "editLensSelect") {
    editLensSelectPageOpen();
  } else if (page === "editLens") {
    editLensPageOpen();
  } else if (page === "deleteLens") {
    deleteLensPageOpen();
  } else if (page === "registerAdapter") {
    registerAdapterPageOpen();
  } else if (page === "editAdapterSelect") {
    editAdapterSelectPageOpen();
  } else if (page === "editAdapter") {
    editAdapterPageOpen();
  } else if (page === "deleteAdapter") {
    deleteAdapterPageOpen();
  } else if (page === "install-ios") {
    installiOSPageOpen();
  } else if (page === "install-android") {
    installAndroidPageOpen();
  } else if (page === "install-other") {
    installOtherPageOpen();
  } else if (page === "welcome") {
    welcomePageOpen();
  } else if (page === "about") {
    aboutPageOpen();
  } else {
    mainPageOpen();
  }
}

////////////////////////////////////////////////////////////////////////////////

// The main page.

function mainPageOpen() {
  setPage("main");
  mainPageUpdate();
  mainPageShow();
}

function mainPageUpdate() {

  mainPageSelectPrevNext(getPrevNext());

  updateLensModelMenu("main-lens-model");

  var lensModel    = getLensModel();
  if (lensModel === "") {

    mainPageUpdateFocalLengthMenu("", "");

    mainPageUpdateFocalRatioMenu("", "", "", false);

    updateAdapterModelMenu("main-adapter-model", false);

  } else {

    var lens = getLens(lensModel);

    mainPageUpdateFocalLengthMenu(lens.minFocalLength, lens.maxFocalLength);
    if (lens.minFocalLength === lens.maxFocalLength) {
      setFocalLength(lens.minFocalLength);
    }
    var focalLength = getFocalLength();
    if (focalLength !== "") {
      $("select#main-focal-length option").filter(function() {
        return $(this).text() === focalLength;
      }).prop("selected", true);
    }

    mainPageUpdateFocalRatioMenu(lens.minFocalRatio, lens.maxFocalRatio, 
      lens.focalRatioInterval, 
      lens.minFocalLength !== lens.maxFocalLength);
    if (lens.minFocalRatio === lens.maxFocalRatio) {
      setFocalRatio(lens.minFocalRatio);
    }
    var focalRatio = getFocalRatio();
    if (focalRatio !== "") {
      $("select#main-focal-ratio option").filter(function() {
        return $(this).text() === focalRatio;
      }).prop("selected", true);
    }

    updateAdapterModelMenu("main-adapter-model", lens.adapted);

  }

  var notes = getNotes();
  mainPageUpdateNotes(notes);
}

function mainPagePrev() {
  mainPageSelectPrevNext("prev");
}

function mainPageNext() {
  mainPageSelectPrevNext("next");
}

function mainPageTogglePrevNext() {
  var s = getPrevNext(s);
  if (s === "prev") {
    mainPageSelectPrevNext("next");
  } else if (s === "next") {
    mainPageSelectPrevNext("prev");
  } else {
    internalError("unexpected value in changePrevNext(): \"" + s + "\".");
  }
}

function mainPageSelectPrevNext(s) {
  if (s === "prev") {
    $("button#main-prev-next").html("Previous");
    showPrevArrow();
  } else if (s === "next") {
    $("button#main-prev-next").html("Next");
    showNextArrow();
  } else {
    internalError("unexpected value in selectPrevNext(): \"" + s + "\".");
  }
  setPrevNext(s);
}

function mainPageChangeLensModel() {
  var lensModel = $("select#main-lens-model option:selected").text();
  setLensModel(lensModel);
  setFocalLength("");
  setFocalRatio("");
  mainPageUpdate();
}

function mainPageUpdateFocalLengthMenu(min, max) {
  var s = "";
  if (min !== "" && max !== "") {
    if (min === max) {
      s += "<option>" + escape(min) + " mm</option>";
    } else {
      s += "<option>-</option>";
      s += "<option>" + escape(min) + " mm</option>";
      // These are spaced by 1/4 stop in focal length from 50 mm.
      var l = [
         "6"  ,   "7.5",    "9",  "10.5",
        "12.5",  "15"  ,   "18",  "21"  ,
        "25"  ,  "30"  ,   "35",  "42"  ,
        "50"  ,  "60"  ,   "70",  "85"  ,
       "100"  , "120"  ,  "140", "170"  ,
       "200"  , "240"  ,  "280", "340"  ,
       "400"  , "480"  ,  "560", "680"  ,
       "800"
      ];
      for (var i = 0; i < l.length; ++i) {
        if (parseFloat(min) < parseFloat(l[i]) && parseFloat(l[i]) < parseFloat(max)) {
          s += "<option>" + l[i] + " mm</option>";
        }
      }
      s += "<option>" + escape(max) + " mm</option>";
    }
  }
  $("select#main-focal-length").html(s);
}

function mainPageChangeFocalLength() {
  var focalLength = $("select#main-focal-length option:selected").text();
  setFocalLength(focalLength);
}

function mainPageUpdateFocalRatioMenu(min, max, interval, zoom) {
  var s = "";
  if (min !== "" && max !== "" && interval !== "") {
    if (min === max) {
      s += "<option>ƒ/" + escape(min) + "</option>";
    } else {
      s += "<option>-</option>";
      if (zoom) {
        s += "<option>Fastest</option>";
      }
      s += "<option>ƒ/" + escape(min) + "</option>";
      var l = focalRatioList(interval);
      for (var i = 0; i < l.length; ++i) {
        if (parseFloat(min) < parseFloat(l[i]) && parseFloat(l[i]) < parseFloat(max)) {
          s += "<option>ƒ/" + l[i] + "</option>";
        }
      }
      s += "<option>ƒ/" + escape(max) + "</option>";
    }
  }
  $("select#main-focal-ratio").html(s);
}

function mainPageChangeFocalRatio() {
  var focalRatio = $("select#main-focal-ratio option:selected").text();
  setFocalRatio(focalRatio);
}

function mainPageChangeAdapterModel() {
  var adapterModel = $("select#main-adapter-model option:selected").text();
  setAdapterModel(adapterModel);
}

function mainPageUpdateNotes(notes) {
  $("textarea#main-notes").val(notes);
}

function mainPageChangeNotes() {
  setNotes($("textarea#main-notes").val());
}

function mainPageMore() {
  morePageOpen();
}

function mainPageSync() {
  syncPageOpen();
}

function mainPageAbout() {
  aboutPageOpen();
}

////////////////////////////////////////////////////////////////////////////////

// The Sync page.

$.syncPageClock = false;

function syncPageOpen() {
  setPage("sync");
  syncPageUpdate();
  syncPageShow();
}

function syncPageUpdate() {
  syncPageStartClock();
}

function syncPageStartClock() {
  if (!$.clock) {
    syncPageUpdateClock();
    $.syncPageClock = setInterval("syncPageUpdateClock()", 100);
  }
}

function syncPageStopClock() {
  if ($.clock) {
    clearInterval($.syncPageClock);
    $.syncPageClock = false;
  }
}

function syncPageUpdateClock() {

  var now = new Date();

  var year   = padLeft(now.getFullYear(), 4, "0");
  var month  = padLeft(now.getMonth() + 1, 2, "0");
  var day    = padLeft(now.getDate(), 2, "0");
  var hour   = padLeft(now.getHours(), 2, "0");
  var minute = padLeft(now.getMinutes(), 2, "0");
  var second = padLeft(now.getSeconds(), 2, "0");

  var date = year + "-" + month + "-" + day;
  var time = hour + ":" + minute + ":" + second;

  $("span#date").html(date);
  $("span#time").html(time);

  if (second === "00") {
    $("span#time").css("color", "white");
    $("span#time").css("background-color", "black");
  } else {
    $("span#time").css("color", "black");
    $("span#time").css("background-color", "white");
  }

}

function syncPageDone() {
  mainPageOpen();
  syncPageStopClock();
}

function syncPageAbout() {
  aboutPageOpen();
}

////////////////////////////////////////////////////////////////////////////////

// The More page.

function morePageOpen() {
  setPage("more");
  morePageShow();
}

function morePageRegisterLens() {
  registerLensPageOpen();
}

function morePageEditLens() {
  editLensSelectPageOpen();
}

function morePageDeleteLens() {
  deleteLensPageOpen();
}

function morePageRegisterAdapter() {
  registerAdapterPageOpen();
}

function morePageEditAdapter() {
  editAdapterSelectPageOpen();
}

function morePageDeleteAdapter() {
  deleteAdapterPageOpen();
}

function morePageDone() {
  mainPageOpen();
}

function morePageAbout() {
  aboutPageOpen();
}

////////////////////////////////////////////////////////////////////////////////

// The Register Lens page.

function registerLensPageOpen() {
  setPage("registerLens");
  registerLensPageUpdate();
  registerLensPageShow();
}

function registerLensPageUpdate() {
  $("#register-lens-model").val("");
  $("#register-lens-focal-length-min").val("");
  $("#register-lens-focal-length-max").val("");
  $("#register-lens-focal-ratio-min").val("");
  $("#register-lens-focal-ratio-max").val("");
  $("[name=register-lens-focal-ratio-interval]").filter(function() {
    return $(this).val() === "full-stop";
  }).prop("checked", true);
  $("[name=register-lens-adapted]").filter(function() {
    return $(this).val() === "native";
  }).prop("checked", true);
}

function registerLensPageSave() {

  var model = $("#register-lens-model").val();
  var minFocalLength = $("#register-lens-focal-length-min").val();
  var maxFocalLength = $("#register-lens-focal-length-max").val();
  var minFocalRatio = $("#register-lens-focal-ratio-min").val();
  var maxFocalRatio = $("#register-lens-focal-ratio-max").val();
  var focalRatioInterval = $("[name=register-lens-focal-ratio-interval]:checked").val();
  var adapted = $("[name=register-lens-adapted]:checked").val() === "adapted";

  model = prettifyModel(model);
  if (model === "" || model === "-") {
    alert("Register Lens: invalid model (" + model + ").");
    return;
  }

  try {
    var lens = makeLens(minFocalLength, maxFocalLength, minFocalRatio, maxFocalRatio, focalRatioInterval, adapted);
    registerLens(model, lens);
    setLensModel(model);
  }
  catch (e) {
    alert("Register Lens: " + e);
    return;
  }

  morePageOpen();
}

function registerLensPageCancel() {
  morePageOpen();
}

function registerLensPageAbout() {
  aboutPageOpen();
}

////////////////////////////////////////////////////////////////////////////////

// The Edit Lens Select page.

function editLensSelectPageOpen() {
  var lensModels = getLensModels();
  if (lensModels.length === 0) {
    alert("Edit Lens: no lenses are configured.");
    return;
  }
  setPage("editLensSelect");
  editLensSelectPageUpdate();
  editLensSelectPageShow();
}

function editLensSelectPageUpdate() {
  updateLensModelMenu("edit-lens-select-lens-model");
}

function editLensSelectPageChangeLensModel() {
  var model = $("select#edit-lens-select-lens-model option:selected").text();
  setLensModel(model);
}

function editLensSelectPageEdit() {
  editLensPageOpen();
}

function editLensSelectPageCancel() {
  morePageOpen();
}

function editLensSelectPageAbout() {
  aboutPageOpen();
}

////////////////////////////////////////////////////////////////////////////////

// The Edit Lens page.

function editLensPageOpen() {
  setPage("editLens");
  editLensPageUpdate();
  editLensPageShow();
}

function editLensPageUpdate() {
  var lensModel = getLensModel();
  var lens = getLens(lensModel);
  $("#edit-lens-model").val(lensModel);
  $("#edit-lens-focal-length-min").val(lens.minFocalLength);
  $("#edit-lens-focal-length-max").val(lens.maxFocalLength);
  $("#edit-lens-focal-ratio-min").val(lens.minFocalRatio);
  $("#edit-lens-focal-ratio-max").val(lens.maxFocalRatio);
  $("[name=edit-lens-focal-ratio-interval]").filter(function() {
    return $(this).val() === lens.focalRatioInterval;
  }).prop("checked", true);
  $("[name=edit-lens-adapted]").filter(function() {
    return ($(this).val() === "adapted") === lens.adapted;
  }).prop("checked", true);
}

function editLensPageSave() {

  var oldLensModel = getLensModel();

  var lensModel = $("#edit-lens-model").val();
  var minFocalLength = $("#edit-lens-focal-length-min").val();
  var maxFocalLength = $("#edit-lens-focal-length-max").val();
  var minFocalRatio = $("#edit-lens-focal-ratio-min").val();
  var maxFocalRatio = $("#edit-lens-focal-ratio-max").val();
  var focalRatioInterval = $("[name=edit-lens-focal-ratio-interval]:checked").val();
  var adapted = $("[name=edit-lens-adapted]:checked").val() === "adapted";

  lensModel = prettifyModel(lensModel);
  if (lensModel === "" || lensModel === "-") {
    alert("Edit Lens: invalid model (" + lensModel + ").");
    return;
  }

  try {
    var lens = makeLens(minFocalLength, maxFocalLength, minFocalRatio, maxFocalRatio, focalRatioInterval, adapted);
    registerLens(lensModel, lens);
    setLensModel(lensModel);
  }
  catch (e) {
    alert("Edit Lens: " + e);
    return;
  }

  if (lensModel !== oldLensModel) {
    deleteLens(oldLensModel);
  }

  morePageOpen();
}

function editLensPageCancel() {
  morePageOpen();
}

function editLensPageAbout() {
  aboutPageOpen();
}

////////////////////////////////////////////////////////////////////////////////

// The Delete Lens page.

function deleteLensPageOpen() {
  var lensModels = getLensModels();
  if (lensModels.length === 0) {
    alert("Delete Lens: no lenses are configured.");
    return;
  }
  setPage("deleteLens");
  deleteLensPageUpdate();
  deleteLensPageShow();
}

function deleteLensPageUpdate() {
  updateLensModelMenu("delete-lens-model");
}

function deleteLensPageDelete() {
  var model = $("select#delete-lens-model option:selected").text();

  if (model !== "" && confirm("Delete Lens: delete " + model + " lens?")) {
    deleteLens(model);
    if (model === getLensModel()) {
      setLensModel("");
    }
  }

  morePageOpen();
}

function deleteLensPageCancel() {
  morePageOpen();
}

function deleteLensPageAbout() {
  aboutPageOpen();
}

////////////////////////////////////////////////////////////////////////////////

// The Register Adapter page.

function registerAdapterPageOpen() {
  setPage("registerAdapter");
  registerAdapterPageUpdate();
  registerAdapterPageShow();
}

function registerAdapterPageUpdate() {
  $("#register-adapter-model").val("");
}

function registerAdapterPageSave() {

  var model = $("#register-adapter-model").val();

  model = prettifyModel(model);
  if (model === "" || model === "-") {
    alert("Register Adapter: invalid model (" + model + ").");
    return;
  }

  registerAdapter(model);
  setAdapterModel(model);

  morePageOpen();
}

function registerAdapterPageCancel() {
  morePageOpen();
}

function registerAdapterPageAbout() {
  aboutPageOpen();
}

////////////////////////////////////////////////////////////////////////////////

// The Edit Adapter Select page.

function editAdapterSelectPageOpen() {
  var adapterModels = getAdapterModels();
  if (adapterModels.length === 0) {
    alert("Edit Adapter: no adapters are configured.");
    return;
  }
  setPage("editAdapterSelect");
  editAdapterSelectPageUpdate();
  editAdapterSelectPageShow();
}

function editAdapterSelectPageUpdate() {
  updateAdapterModelMenu("edit-adapter-select-adapter-model", true);
}

function editAdapterSelectPageChangeAdapterModel() {
  var model = $("select#edit-adapter-select-adapter-model option:selected").text();
  setAdapterModel(model);
}

function editAdapterSelectPageEdit() {
  editAdapterPageOpen();
}

function editAdapterSelectPageCancel() {
  morePageOpen();
}

function editAdapterSelectPageAbout() {
  aboutPageOpen();
}

////////////////////////////////////////////////////////////////////////////////

// The Edit Adapter page.

function editAdapterPageOpen() {
  setPage("editAdapter");
  editAdapterPageUpdate();
  editAdapterPageShow();
}

function editAdapterPageUpdate() {
  var adapterModel = getAdapterModel();
  $("#edit-adapter-model").val(adapterModel);
}

function editAdapterPageSave() {

  var oldAdapterModel = getAdapterModel();

  var adapterModel = $("#edit-adapter-model").val();

  adapterModel = prettifyModel(adapterModel);
  if (adapterModel === "" || adapterModel === "-") {
    alert("Edit Adapter: invalid model (" + adapterModel + ").");
    return;
  }

  try {
    registerAdapter(adapterModel);
    setAdapterModel(adapterModel);
  }
  catch (e) {
    alert("Edit Adapter: " + e);
    return;
  }

  if (adapterModel !== oldAdapterModel) {
    deleteAdapter(oldAdapterModel);
  }

  morePageOpen();
}

function editAdapterPageCancel() {
  morePageOpen();
}

function editAdapterPageAbout() {
  aboutPageOpen();
}

////////////////////////////////////////////////////////////////////////////////

// The Delete Adapter page.

function deleteAdapterPageOpen() {
  var adapterModels = getAdapterModels();
  if (adapterModels.length === 0) {
    alert("Delete Adapter: no adapters are configured.");
    return;
  }
  setPage("deleteAdapter");
  deleteAdapterPageUpdate();
  deleteAdapterPageShow();
}

function deleteAdapterPageUpdate() {
  updateAdapterModelMenu("delete-adapter-model", true);
}

function deleteAdapterPageDelete() {
  var adapterModel = $("select#delete-adapter-model option:selected").text();

  if (adapterModel !== "" && confirm("Delete Adapter: delete " + adapterModel + " adapter?")) {
    deleteAdapter(adapterModel);
    if (adapterModel === getAdapterModel()) {
      setAdapterModel("");
    }
  }

  morePageOpen();
}

function deleteAdapterPageCancel() {
  morePageOpen();
}

function deleteAdapterPageAbout() {
  aboutPageOpen();
}

////////////////////////////////////////////////////////////////////////////////

// The Install iOS page.

function installiOSPageOpen() {
  setPage("install-ios");
  installiOSPageShow();
}

function installiOSPageAbout() {
  aboutPageOpen();
}

////////////////////////////////////////////////////////////////////////////////

// The Install Android page.

function installAndroidPageOpen() {
  setPage("install-android");
  installAndroidPageShow();
}

function installAndroidPageAbout() {
  aboutPageOpen();
}

////////////////////////////////////////////////////////////////////////////////

// The Install Other page.

function installOtherPageOpen() {
  setPage("install-other");
  installOtherPageShow();
}

function installOtherPageAbout() {
  aboutPageOpen();
}

////////////////////////////////////////////////////////////////////////////////

// The Welcome page.

function welcomePageOpen() {
  setPage("welcome");
  welcomePageUpdate();
  welcomePageShow();
}

function welcomePageUpdate() {
}

function welcomePageSync() {
  syncPageOpen();
}

function welcomePageMore() {
  morePageOpen();
}

function welcomePageAbout() {
  aboutPageOpen();
}

////////////////////////////////////////////////////////////////////////////////

// The About page.

function aboutPageOpen() {
  // Do not use setPage here! We will want to return to the page from 
  // which we were called .
  aboutPageUpdate();
  aboutPageShow();
}

function aboutPageUpdate() {
}

function aboutPageDone() {
  openPage(getPage());
}

function aboutPageAbout() {
  aboutPageOpen();
}

////////////////////////////////////////////////////////////////////////////////

// Showing and Hiding Pages.

// Each of the logical pages is a div with class "page". These initially
// have the CSS display property set to none. We show and hide them by
// toggling this property.

function mainPageShow() {
  $("div.page").hide();
  $("div#main-page").show();
}

function syncPageShow() {
  $("div.page").hide();
  $("div#sync-page").show();
}

function morePageShow() {
  $("div.page").hide();
  $("div#more-page").show();
}

function registerLensPageShow() {
  $("div.page").hide();
  $("div#register-lens-page").show();
}

function editLensSelectPageShow() {
  $("div.page").hide();
  $("div#edit-lens-select-page").show();
}

function editLensPageShow() {
  $("div.page").hide();
  $("div#edit-lens-page").show();
}

function deleteLensPageShow() {
  $("div.page").hide();
  $("div#delete-lens-page").show();
}

function registerAdapterPageShow() {
  $("div.page").hide();
  $("div#register-adapter-page").show();
}

function editAdapterSelectPageShow() {
  $("div.page").hide();
  $("div#edit-adapter-select-page").show();
}

function editAdapterPageShow() {
  $("div.page").hide();
  $("div#edit-adapter-page").show();
}

function deleteAdapterPageShow() {
  $("div.page").hide();
  $("div#delete-adapter-page").show();
}

function installiOSPageShow() {
  $("div.page").hide();
  $("div#install-ios-page").show();
}

function installAndroidPageShow() {
  $("div.page").hide();
  $("div#install-android-page").show();
}

function installOtherPageShow() {
  $("div.page").hide();
  $("div#install-other-page").show();
}

function welcomePageShow() {
  $("div.page").hide();
  $("div#welcome-page").show();
}

function aboutPageShow() {
  $("div.page").hide();
  $("div#about-page").show();
}

////////////////////////////////////////////////////////////////////////////////

// Showing and Hiding the Prev/Next Arrows

// We show and hide the prev/next arrows by toggling their CSS
// visibility property between hidden and visible. When they are hidden,
// they still take up space, which maintains the layout.

function showPrevArrow() {
  $("img#main-next-arrow").css("visibility", "hidden");
  $("img#main-prev-arrow").css("visibility", "visible");
}

function showNextArrow() {
  $("img#main-prev-arrow").css("visibility", "hidden");
  $("img#main-next-arrow").css("visibility", "visible");
}

////////////////////////////////////////////////////////////////////////////////

function updateLensModelMenu(id) {
  var s = "";
  var lensModels = getLensModels();
  for (var i = 0; i < lensModels.length; ++i) {
    s += "<option>" + escape(lensModels[i]) + "</option>";
  }
  $("select#" + id).html(s);
  var lensModel = getLensModel();
  if (lensModel === "" && lensModels.length !== 0) {
    lensModel = lensModels[0];
    setLensModel(lensModel);
  }
  $("select#" + id + " option").filter(function() {
    return $(this).text() === lensModel;
  }).prop("selected", true);
}

function updateAdapterModelMenu(id, adapted) {
  if (adapted) {
    var s = "<option>-</option>";
    var adapterModels = getAdapterModels();
    for (var i = 0; i < adapterModels.length; ++i) {
      s += "<option>" + escape(adapterModels[i]) + "</option>";
    }
    $("select#" + id).html(s);
    var adapterModel = getAdapterModel();
    if (adapterModel === "" && adapterModels.length !== 0) {
      adapterModel = adapterModels[0];
      setAdapterModel(adapterModel);
    }
    $("select#" + id + " option").filter(function() {
      return $(this).text() === adapterModel;
    }).prop("selected", true);
  } else {
    $("select#" + id).html("<option>-</option>");
  }
}

////////////////////////////////////////////////////////////////////////////////

function debug(s) {
  alert("DEBUG: " + s);
}

function internalError(e) {
  alert("INTERNAL ERROR: " + e.type + ": " + e.message);
}

////////////////////////////////////////////////////////////////////////////////

// Persistent storage.

// We use the localStorage object. However, this only can store string
// values, so we translate the raw values to and from JSON. We use a
// cache to speed up references.

var persistents = null;

function loadPersistents() {
  if ($.type(localStorage.getItem("Lens Slate")) !== "string") {
    localStorage.setItem("Lens Slate", "{}");
  }
  persistents = JSON.parse(localStorage.getItem("Lens Slate"));
}

function storePersistents() {
  try {
    localStorage.setItem("Lens Slate", JSON.stringify(persistents));
  }
  catch (e) {
    if (e === QUOTA_EXCEEDED_ERR) {
      internalError(new Error("unable to store a persistent value."));
    } else {
      throw e;
    }
  }
}

function clearPersistents() {
  persistents = {};
  localStorage.removeItem("Lens Slate");
}

function setPersistent(key, value) {
  if (persistents === null) {
    loadPersistents();
  }
  persistents[key] = value;
  storePersistents();
}

function getPersistent(key) {
  if (persistents === null) {
    loadPersistents();
  }
  return persistents[key];
}

////////////////////////////////////////////////////////////////////////////////

// We use this function to prettify model names.

function prettifyModel(model) {
  mode = model.trim();
  model = model.replace("f/", "ƒ/");
  return model;
}

////////////////////////////////////////////////////////////////////////////////

// Lenses

function makeLens(minFocalLength, maxFocalLength, minFocalRatio, maxFocalRatio, focalRatioInterval, adapted) {

  var f = /^[0-9]+(\.[0-9]*)?$/;

  // Trim spaces and "mm" suffix.
  minFocalLength = minFocalLength.trim();
  maxFocalLength = maxFocalLength.trim();
  minFocalLength = minFocalLength.replace(/ *mm$/i, "");
  maxFocalLength = maxFocalLength.replace(/ *mm$/i, "");

  if (minFocalLength === "") {
    minFocalLength = maxFocalLength;
  }
  if (maxFocalLength === "") {
    maxFocalLength = minFocalLength;
  }

  if (!f.test(minFocalLength)) {
    return "invalid minimum focal length (\"" + minFocalLength + "\").";
  }
  if (!f.test(maxFocalLength)) {
    return "invalid maximum focal length (\"" + maxFocalLength + "\").";
  }

  // Trim spaces and "f" or "f/" prefix.
  minFocalRatio = minFocalRatio.trim();
  maxFocalRatio = maxFocalRatio.trim();
  minFocalRatio = minFocalRatio.replace(/^f\/? */i, "");
  maxFocalRatio = maxFocalRatio.replace(/^f\/? */i, "");

  if (minFocalRatio === "") {
    minFocalRatio = maxFocalRatio;
  }
  if (maxFocalRatio === "") {
    maxFocalRatio = minFocalRatio;
  }

  if (!f.test(minFocalRatio)) {
    return "invalid minimum focal ratio (\"" + minFocalRatio + "\").";
  }
  if (!f.test(maxFocalRatio)) {
    return "invalid maximum focal ratio (\"" + maxFocalRatio + "\").";
  }

  if (focalRatioInterval !== "full-stop" &&
      focalRatioInterval !== "half-stop" &&
      focalRatioInterval !== "third-stop") {
    return "invalid focal ratio interval (\"" + focalRatioInterval + "\").";
  }

  var lens = {};
  lens.minFocalLength     = minFocalLength;
  lens.maxFocalLength     = maxFocalLength;
  lens.minFocalRatio      = minFocalRatio;
  lens.maxFocalRatio      = maxFocalRatio;
  lens.focalRatioInterval = focalRatioInterval;
  lens.adapted            = adapted;

  return lens;
}

function registerLens(model, lens) {
  var lenses = getLenses();
  lenses[model] = lens;
  setLenses(lenses);
}

function registerLensAndConfirm(model, lens) {
  registerLens(model, lens);
  alert("Lens Slate: registered " + model + " lens.");
}

function deleteLens(model) {
  var lenses = getLenses();
  delete lenses[model];
  setLenses(lenses);
}

function getLensModels() {
  var lenses = getLenses();
  return Object.keys(lenses).sort();
}

function getLens(model) {
  var lenses = getLenses();
  return lenses[model];
}

////////////////////////////////////////////////////////////////////////////////

// Adapters

function registerAdapter(model) {
  var adapters = getAdapters();
  adapters[model] = true;
  setAdapters(adapters);
}

function deleteAdapter(model) {
  var adapters = getAdapters();
  delete adapters[model];
  setAdapters(adapters);
}

function getAdapterModels(model) {
  var adapters = getAdapters();
  return Object.keys(adapters).sort();
}

////////////////////////////////////////////////////////////////////////////////

// This escape function was written by Brandon Mintern.
// http://shebang.brandonmintern.com/foolproof-html-escaping-in-javascript/

function escape(s) {
  var div = document.createElement("div");
  div.appendChild(document.createTextNode(s));
  return div.innerHTML;
}

////////////////////////////////////////////////////////////////////////////////

// Persistent state.

function makePersistentGetter(key, defaultValue) {
  return function () {
    var value = getPersistent(key);
    if ($.type(value) === "undefined") {
      value = defaultValue;
    }
    return value;
  };
}

function makePersistentSetter(key, value) {
  return function (value) {
    return setPersistent(key, value);
  };
}

getVersion      = makePersistentGetter("version", "");
setVersion      = makePersistentSetter("version");

getLenses       = makePersistentGetter("lenses", {});
setLenses       = makePersistentSetter("lenses");

getAdapters     = makePersistentGetter("adapters", {});
setAdapters     = makePersistentSetter("adapters");

getLensModel    = makePersistentGetter("selectedLensModel", "");
setLensModel    = makePersistentSetter("selectedLensModel");

getFocalLength  = makePersistentGetter("selectedFocalLength", "");
setFocalLength  = makePersistentSetter("selectedFocalLength");

getFocalRatio   = makePersistentGetter("selectedFocalRatio", "");
setFocalRatio   = makePersistentSetter("selectedFocalRatio");

getAdapterModel = makePersistentGetter("selectedAdapterModel", "");
setAdapterModel = makePersistentSetter("selectedAdapterModel");

getNotes        = makePersistentGetter("notes", "");
setNotes        = makePersistentSetter("notes");

getPage         = makePersistentGetter("page", "main");
setPage         = makePersistentSetter("page");

getPrevNext     = makePersistentGetter("selectedPrevNext", "prev");
setPrevNext     = makePersistentSetter("selectedPrevNext");

////////////////////////////////////////////////////////////////////////////////

function focalRatioList(interval) {
  if (interval === "full-stop") {
    return ["0.7", "1.0", "1.4", "2", "2.8", "4", "5.6", "8", "11", "16", "22", "32", "45", "64"];
  } else if (interval === "half-stop") {
    return ["0.7", "0.8", "1.0", "1.2", "1.4", "1.7", "2", "2.4", "2.8", "3.3", "4", "4.8", "5.6", "6.7", "8", "9.5", "11", "13", "16", "19", "22", "27", "32", "38", "45", "54", "64"];
  } else if (interval === "third-stop") {
    return ["0.7", "0.8", "0.9", "1.0", "1.1", "1.2", "1.4", "1.6", "1.8", "2", "2.2", "2.5", "2.8", "3.2", "3.5", "4", "4.5", "5.0", "5.6", "6.3", "7.1", "8", "9", "10", "11", "13", "14", "16", "18", "20", "22", "25", "29", "32", "36", "40", "45", "51", "57", "64"];
  } else {
    internalError(new Error("invalid interval in focalRatioList(): \"" + interval + "\"."));
  }
}

////////////////////////////////////////////////////////////////////////////////

function padLeft(s, width, padding) {
  s = String(s);
  while (s.length < width) {
    s = padding + s;
  }
  return s;
}

////////////////////////////////////////////////////////////////////////////////

function isStandalone() {
  if ("standalone" in navigator) {
    return navigator.standalone;
  } else {
    // https://developers.google.com/web/updates/2015/10/display-mode
    return window.matchMedia('(display-mode: standalone)').matches;
  }
}

function isiOS() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function isAndroid() {
  return /Android/i.test(navigator.userAgent);
}

////////////////////////////////////////////////////////////////////////////////

//registerAdapter(prettifyModel("Fotasy FD->MFT"));
//registerAdapter(prettifyModel("Zhongyi Lens Turbo II FD->MFT"));
//registerAdapter(prettifyModel("Metabones SpeedBoster FD->MFT"));

//registerLens(prettifyModel("Olympus 9mm f/8"), makeLens("9", "9", "8", "8", "full-stop", false));
//registerLens(prettifyModel("Canon New FD50mm f/1.4"), makeLens("50", "50", "1.4", "22", "half-stop", true));
//registerLens(prettifyModel("Canon New FD100mm f/2.8"), makeLens("100", "100", "2.8", "32", "half-stop", true));
//registerLens(prettifyModel("Canon New FD35-105mm f/3.5-4.5"), makeLens("35", "105", "3.5", "22", "half-stop", true));

////////////////////////////////////////////////////////////////////////////////

