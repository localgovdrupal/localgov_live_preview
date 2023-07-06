// create a drupal javascript behaviour
(function localovLivePreviewScript(Drupal) {
  Drupal.behaviors.localovLivePreview = {
    attach: function (context, settings) {
      const bodyElement = document.querySelector("body");
      const tabsLists = once(
        "allTabs",
        ".block-local-tasks-block .tabs > ul",
        context
      );
      if (!tabsLists) {
        return;
      }

      // Get a list of classes from bodyElement
      // find the class that starts with "lgd-ms--"
      // get the value of the class
      // we can use this to build a link for the group id
      const bodyClasses = bodyElement.classList;
      const bodyClassesArray = Array.from(bodyClasses);
      const msClass = bodyClassesArray.filter((bodyClass) => {
        return bodyClass.startsWith("lgd-ms--");
      });

      const micrositeId = msClass[0].replace("lgd-ms--", "");

      // Get the id of the current node, so when we save the form
      // we can redirect to the correct page
      const [currentNode] = once("currentNode", ".full", context);
      const currentNodePath = currentNode.dataset.quickeditEntityId;

      const newTab = document.createElement("li");
      newTab.innerHTML = `
        <a href="/group/${micrositeId}/edit?destination=${currentNodePath}"
          class="use-ajax"
          data-dialog-type="dialog"
          data-dialog-renderer="off_canvas"
          data-dialog-options="{&quot;width&quot;:800}">
          Live Preview
        </a>`;
      tabsLists.forEach((tabsList) => {
        tabsList.appendChild(newTab);
      });

      window.addEventListener("click", function (e) {
        // If this is true, then we are in the edit form inside a modal
        if (e.target.closest(".ui-dialog .group-microsite-edit-form")) {
          const fieldBeingEdited = e.target;
          console.log(fieldBeingEdited);
          const fieldBeingEditedName = e.target.dataset.drupalSelector;

          let correspondingField;

          // The title field is a special case, where the field name does not
          // correspond with the class name of the field being edited
          if (fieldBeingEditedName === "edit-label-0-value") {
            let correspondingField = context.querySelector(
              ".microsite-header__name"
            );
            fieldBeingEdited.addEventListener("keyup", () => {
              correspondingField.textContent = fieldBeingEdited.value;
            });
          }

          // I'm hardcoding the field names here for now as proof-of-concept
          // It will take a little bit of a formula to figure out how to
          // make a generic solution for this with the fields corresponding
          // to the correct css variables
          if (fieldBeingEditedName === "edit-lgms-primary-colour-0-value") {
            fieldBeingEdited.addEventListener("change", () => {
              bodyElement.style.setProperty(
                "--color-accent",
                fieldBeingEdited.value
              );
              console.log(fieldBeingEdited.value);
            });
          }
          if (
            fieldBeingEdited.classList.contains("colour-picker-field__picker")
          ) {
            const actualField = fieldBeingEdited
              .closest(".colour-picker-field")
              .querySelector("input").dataset.drupalSelector;
            console.log("colour picker field");
            fieldBeingEdited.addEventListener("input", () => {
              if (actualField === "edit-lgms-primary-colour-0-value") {
                bodyElement.style.setProperty(
                  "--color-accent",
                  fieldBeingEdited.value
                );
              }
            });
          }
          if (
            fieldBeingEditedName === "edit-lgms-primary-colour-contrast-0-value"
          ) {
            fieldBeingEdited.addEventListener("change", () => {
              bodyElement.style.setProperty(
                "--color-accent-contrast",
                fieldBeingEdited.value
              );
              console.log(fieldBeingEdited.value);
            });
          }
          if (
            fieldBeingEdited.classList.contains("colour-picker-field__picker")
          ) {
            // The "actualField" is the text input that is actually being edited
            const actualField = fieldBeingEdited
              .closest(".colour-picker-field")
              .querySelector("input").dataset.drupalSelector;
            console.log("colour picker field");
            fieldBeingEdited.addEventListener("input", () => {
              if (actualField === "edit-lgms-primary-colour-contrast-0-value") {
                bodyElement.style.setProperty(
                  "--color-accent-contrast",
                  fieldBeingEdited.value
                );
              }
            });
          }
        }
      });
    },
  };
})(Drupal);
