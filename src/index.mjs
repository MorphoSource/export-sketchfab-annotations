import Sketchfab from "@sketchfab/viewer-api";

// Sketchfab Viewer API: Start/Stop the viewer
var version = "1.12.1";
var iframe = document.getElementById("api-frame");
var client = new Sketchfab(version, iframe);
var error = function error() {
  console.error("Sketchfab API error");
};
var success = function success(api) {
  api.addEventListener("viewerstart", function () {
    console.log("viewerstart");
  });
  api.addEventListener("viewerstop", function () {
    console.log("viewerstop");
  });
  api.start(function () {
    api.addEventListener("viewerready", function () {
      console.log("viewerReady");
      api.getAnnotationList(function (err, annotations) {
        if (!err) {
          console.log("annotations", annotations);
          if (annotations) {
            const sketchfabAnnotations = annotations.map((anno) => {
              return {
                title: anno.name,
                position: anno.position,
                eye: anno.eye,
                target: anno.target,
              };
            });

            // Report SketchFab Annotation Format
            const sketchfabAnnotationsInput = document.getElementById(
              "sketchfab-annotations"
            );
            sketchfabAnnotationsInput.value = JSON.stringify(
              sketchfabAnnotations,
              null,
              2
            );

            // Convert and Report MorphoSource Annotation Format
            const morphosourceAnnotationsInput = document.getElementById(
              "morphosource-annotations"
            );
            morphosourceAnnotationsInput.value = JSON.stringify(
              sketchfabAnnotations.map((anno) => {
                return {
                  label: anno.title,
                  description: anno.text,
                  position: convertCoordsSfToMs(anno.position),
                  cameraPosition: convertCoordsSfToMs(anno.eye),
                  cameraTarget: convertCoordsSfToMs(anno.target),
                };
              }),
              null,
              2
            );
          }
        }
      });
      // api.getSceneGraph(function (err, graph) {
      //   if (!err) {
      //     console.log("scene", graph); // { ... }
      //   }
      // });
    });
  });
};

//////////////////////////////////
// GUI Code
//////////////////////////////////
function initGui() {
  var controls = document.getElementById("controls");
  var buttonsText = "";
  buttonsText += '<button id="start">Start</button>';
  buttonsText += '<button id="stop">Stop</button>';
  controls.innerHTML = buttonsText;
}
// initGui();

//////////////////////////////////
// GUI Code end
//////////////////////////////////

const importSketchfabButton = document.getElementById("import-sketchfab");

importSketchfabButton.addEventListener("click", function (event) {
  event.preventDefault();

  const uidElement = document.getElementById("sketchfab-id");
  if (uidElement && uidElement.value) {
    client.init(uidElement.value, {
      success: success,
      error: error,
      autostart: 1,
      preload: 1,
    });
  }
});

// For now, start by importing to speed up development
importSketchfabButton.click();

// Code for converting to MS annotation format

function convertCoordsSfToMs(xyz) {
  if (xyz) {
    // Sometimes XYZ is an object instead of an array
    if (!Array.isArray(xyz)) {
      xyz = [xyz["0"], xyz["1"], xyz["2"]];
    }

    // Where MS uses Y+ up Z+ toward viewer, SF uses Z+ up Y+ away from viewer
    return {
      x: xyz[0],
      y: xyz[2],
      z: xyz[1] * -1.0,
    };
  } else {
    return undefined;
  }
}
