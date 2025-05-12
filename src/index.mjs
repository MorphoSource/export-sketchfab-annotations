import Sketchfab from "@sketchfab/viewer-api";
import ClipboardJS from "clipboard";

new ClipboardJS('.btn');

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

        document.querySelector(
          "#import-sketchfab .spinner-border"
        ).hidden = true;
      });
      // api.getSceneGraph(function (err, graph) {
      //   if (!err) {
      //     console.log("scene", graph); // { ... }
      //   }
      // });
    });
  });
};

document.getElementById("sketchfab-url").addEventListener("input", function () {
  this.setCustomValidity('');
});

document.getElementById("sketchfab-form").addEventListener("submit", function (event) {
  event.preventDefault();
  
  event.target.querySelector(".spinner-border").hidden = false;

  const urlElement = document.getElementById("sketchfab-url");
  if (!urlElement) return;

  urlElement.setCustomValidity('');
  const url = urlElement.value;
  const uid = extractSketchfabUID(url);

  if (uid) {
    client.init(uid, {
      success: success,
      error: error,
      autostart: 1,
      preload: 1,
    });
  } else {
    urlElement.setCustomValidity("Invalid SketchFab URL");
    urlElement.reportValidity();
    event.target.querySelector(".spinner-border").hidden = true;
  }
});

// For now, start by importing to speed up development
// const importSketchfabButton = document.getElementById("import-sketchfab");
// importSketchfabButton.click();

// Function to extract UID from SketchFab URL
function extractSketchfabUID(url) {
  const regex = /(?:models|3d-models)\/(?:.*-)?([a-zA-Z0-9]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
}


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
