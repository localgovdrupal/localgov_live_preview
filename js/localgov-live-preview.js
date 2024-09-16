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
      const currentPath = window.location.pathname;

      const newTab = document.createElement("li");
      newTab.innerHTML = `
        <a>
          Edit Microsite
        </a>`;
      tabsLists.forEach((tabsList) => {
        tabsList.appendChild(newTab);
      });

      newTab.addEventListener("click", (e) => {
        e.preventDefault();
        var ajaxSettings = {
          url: `/group/${micrositeId}/edit?destination=${currentPath}`,
          dialogType: 'dialog',
          dialogRenderer: 'off_canvas',
          dialog: { width: 400 },
        };
        Drupal.ajax(ajaxSettings).execute();
      });

      function handleFieldChange(fieldBeingEdited, cssVariableName) {
        fieldBeingEdited.addEventListener("change", () => {
          bodyElement.style.setProperty(
            cssVariableName,
            fieldBeingEdited.value
          );
        });
        const colourPickerInput = fieldBeingEdited
          .closest(".colour-picker-field")
          .querySelector(".colour-picker-field__picker");
        if (colourPickerInput) {
          colourPickerInput.addEventListener("input", () => {
            bodyElement.style.setProperty(
              cssVariableName,
              colourPickerInput.value
            );
            colourPickerInput.closest(".colour-picker-field").querySelector(".colour-picker-field__text").value = colourPickerInput.value;
          });
        }
      }

      const [headingFontWeightField] = once('headingFontWeightField', '[data-drupal-selector="edit-lgms-heading-font-weight"]', context);

      if (headingFontWeightField) {
        headingFontWeightField.addEventListener("change", () => {
          bodyElement.style.setProperty(
            '--heading-font-weight',
            headingFontWeightField.value
          );
        });
      }

      window.addEventListener("click", function (e) {
        // If this is true, then we are in the edit form inside a modal
        if (e.target.closest(".ui-dialog .group-microsite-edit-form")) {
          const fieldBeingEdited = e.target;
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

          if (fieldBeingEditedName === "edit-lgms-primary-colour-0-value") {
            handleFieldChange(fieldBeingEdited, "--color-accent");
          }
          if (fieldBeingEditedName === "edit-lgms-primary-colour-contrast-0-value") {
            handleFieldChange(fieldBeingEdited, "--color-accent-contrast");
          }
          if (fieldBeingEditedName === "edit-lgms-secondary-colour-0-value") {
            handleFieldChange(fieldBeingEdited, "--color-secondary");
          }
          if (fieldBeingEditedName === "edit-lgms-secondary-colour-contrast-0-value") {
            handleFieldChange(fieldBeingEdited, "--color-secondary-contrast");
          }
          if (fieldBeingEditedName === "edit-lgms-text-colour-0-value") {
            handleFieldChange(fieldBeingEdited, "--color-text");
          }
          if (fieldBeingEditedName === "edit-lgms-page-background-colour-0-value") {
            handleFieldChange(fieldBeingEdited, "--page-background-color");
          }
          if (fieldBeingEditedName === "edit-lgms-link-colour-0-value") {
            handleFieldChange(fieldBeingEdited, "--color-link");
          }
          if (fieldBeingEditedName === "edit-lgms-base-line-height-0-value") {
            handleFieldChange(fieldBeingEdited, "--line-height");
          }
          if (fieldBeingEditedName === "edit-lgms-base-spacing-0-value") {
            handleFieldChange(fieldBeingEdited, "--spacing");
          }

        }
      });
    },
  };
})(Drupal);
