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

      function handleSelectChange(selectElement, cssVariableName) {
        selectElement.addEventListener("change", () => {
          bodyElement.style.setProperty(
            cssVariableName,
            selectElement.value
          );
        });
      };

      // Default Items
      const [bodyFont] = once('bodyFont', '[data-drupal-selector="edit-lgms-body-font"]', context);
      const [headingFont] = once('headingFont', '[data-drupal-selector="edit-lgms-heading-font"]', context);
      const [headingFontWeightField] = once('headingFontWeightField', '[data-drupal-selector="edit-lgms-heading-font-weight"]', context);
      const [siteNameWeightField] = once('siteNameWeightField', '[data-drupal-selector="edit-lgms-site-name-font-weight"]', context);
      const [headerItemsVerticalAlighmentField] = once('headerItemsVerticalAlighmentField', '[data-drupal-selector="edit-lgms-header-vertical-alignment"]', context);

      // Headings
      const [headingFont1] = once('headingFont', '[data-drupal-selector="edit-lgms-heading-1-font"]', context);
      const [headingFontWeight1] = once('headingFont', '[data-drupal-selector="edit-lgms-heading-1-font-weight"]', context);

      const [headingFont2] = once('headingFont', '[data-drupal-selector="edit-lgms-heading-2-font"]', context);
      const [headingFontWeight2] = once('headingFont', '[data-drupal-selector="edit-lgms-heading-2-font-weight"]', context);

      const [headingFont3] = once('headingFont', '[data-drupal-selector="edit-lgms-heading-3-font"]', context);
      const [headingFontWeight3] = once('headingFont', '[data-drupal-selector="edit-lgms-heading-3-font-weight"]', context);

      const [headingFont4] = once('headingFont', '[data-drupal-selector="edit-lgms-heading-4-font"]', context);
      const [headingFontWeight4] = once('headingFont', '[data-drupal-selector="edit-lgms-heading-4-font-weight"]', context);

      const [headingFont5] = once('headingFont', '[data-drupal-selector="edit-lgms-heading-5-font"]', context);
      const [headingFontWeight5] = once('headingFont', '[data-drupal-selector="edit-lgms-heading-5-font-weight"]', context);

      const [headingFont6] = once('headingFont', '[data-drupal-selector="edit-lgms-heading-6-font"]', context);
      const [headingFontWeight6] = once('headingFont', '[data-drupal-selector="edit-lgms-heading-6-font-weight"]', context);

      // Defaut Items
      if (bodyFont) {
        handleSelectChange(bodyFont, "--font-primary");
      }
      if (headingFont) {
        handleSelectChange(headingFont, "--font-secondary");
      }
      if (headingFontWeightField) {
        handleSelectChange(headingFontWeightField, "--heading-font-weight");
      }
      if (siteNameWeightField) {
        handleSelectChange(siteNameWeightField, "--site-name-font-weight");
      }
      if (headerItemsVerticalAlighmentField) {
        handleSelectChange(headerItemsVerticalAlighmentField, "--header-items-alignment");
      }

      // Headings
      if (headingFont1) {
        handleSelectChange(headingFont1, "--font-heading-1");
      }
      if (headingFontWeight1) {
        handleSelectChange(headingFontWeight1, "--heading-1-font-weight");
      }
      if (headingFont2) {
        handleSelectChange(headingFont2, "--font-heading-2");
      }
      if (headingFontWeight2) {
        handleSelectChange(headingFontWeight2, "--heading-2-font-weight");
      }
      if (headingFont3) {
        handleSelectChange(headingFont3, "--font-heading-3");
      }
      if (headingFontWeight3) {
        handleSelectChange(headingFontWeight3, "--heading-3-font-weight");
      }
      if (headingFont4) {
        handleSelectChange(headingFont4, "--font-heading-4");
      }
      if (headingFontWeight4) {
        handleSelectChange(headingFontWeight4, "--heading-4-font-weight");
      }
      if (headingFont5) {
        handleSelectChange(headingFont5, "--font-heading-5");
      }
      if (headingFontWeight5) {
        handleSelectChange(headingFontWeight5, "--heading-5-font-weight");
      }
      if (headingFont6) {
        handleSelectChange(headingFont6, "--font-heading-6");
      }
      if (headingFontWeight6) {
        handleSelectChange(headingFontWeight6, "--heading-6-font-weight");
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

          // Default items
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

          // Headings
          if (fieldBeingEditedName === "edit-lgms-heading-1-font-size-0-value") {
            handleFieldChange(fieldBeingEdited, "--font-size-h1");
          }
          if (fieldBeingEditedName === "edit-lgms-heading-2-font-size-0-value") {
            handleFieldChange(fieldBeingEdited, "--font-size-h2");
          }
          if (fieldBeingEditedName === "edit-lgms-heading-3-font-size-0-value") {
            handleFieldChange(fieldBeingEdited, "--font-size-h3");
          }
          if (fieldBeingEditedName === "edit-lgms-heading-4-font-size-0-value") {
            handleFieldChange(fieldBeingEdited, "--font-size-h4");
          }
          if (fieldBeingEditedName === "edit-lgms-heading-5-font-size-0-value") {
            handleFieldChange(fieldBeingEdited, "--font-size-h5");
          }
          if (fieldBeingEditedName === "edit-lgms-heading-6-font-size-0-value") {
            handleFieldChange(fieldBeingEdited, "--font-size-h6");
          }
          if (fieldBeingEditedName === "edit-lgms-heading-1-font-colour-0-value") {
            handleFieldChange(fieldBeingEdited, "--heading-1-color");
          }
          if (fieldBeingEditedName === "edit-lgms-heading-2-font-colour-0-value") {
            handleFieldChange(fieldBeingEdited, "--heading-2-color");
          }
          if (fieldBeingEditedName === "edit-lgms-heading-3-font-colour-0-value") {
            handleFieldChange(fieldBeingEdited, "--heading-3-color");
          }
          if (fieldBeingEditedName === "edit-lgms-heading-4-font-colour-0-value") {
            handleFieldChange(fieldBeingEdited, "--heading-4-color");
          }
          if (fieldBeingEditedName === "edit-lgms-heading-5-font-colour-0-value") {
            handleFieldChange(fieldBeingEdited, "--heading-5-color");
          }
          if (fieldBeingEditedName === "edit-lgms-heading-6-font-colour-0-value") {
            handleFieldChange(fieldBeingEdited, "--heading-6-color");
          }
          if (fieldBeingEditedName === "edit-lgms-heading-1-line-height-0-value") {
            handleFieldChange(fieldBeingEdited, "--heading-1-line-height");
          }
          if (fieldBeingEditedName === "edit-lgms-heading-2-line-height-0-value") {
            handleFieldChange(fieldBeingEdited, "--heading-2-line-height");
          }
          if (fieldBeingEditedName === "edit-lgms-heading-3-line-height-0-value") {
            handleFieldChange(fieldBeingEdited, "--heading-3-line-height");
          }
          if (fieldBeingEditedName === "edit-lgms-heading-4-line-height-0-value") {
            handleFieldChange(fieldBeingEdited, "--heading-4-line-height");
          }
          if (fieldBeingEditedName === "edit-lgms-heading-5-line-height-0-value") {
            handleFieldChange(fieldBeingEdited, "--heading-5-line-height");
          }
          if (fieldBeingEditedName === "edit-lgms-heading-6-line-height-0-value") {
            handleFieldChange(fieldBeingEdited, "--heading-6-line-height");
          }

          // Pre-header
          if (fieldBeingEditedName === "edit-lgms-pre-header-bg-colour-0-value") {
            handleFieldChange(fieldBeingEdited, "--pre-header-background-color");
          }
          if (fieldBeingEditedName === "edit-lgms-pre-header-text-colour-0-value") {
            handleFieldChange(fieldBeingEdited, "--pre-header-text-color");
          }
          if (fieldBeingEditedName === "edit-lgms-pre-header-link-colour-0-value") {
            handleFieldChange(fieldBeingEdited, "--pre-header-link-color");
          }
          if (fieldBeingEditedName === "edit-lgms-pre-header-link-hover-colour-0-value") {
            handleFieldChange(fieldBeingEdited, "--pre-header-link-hover-color");
          }

          // Header
          if (fieldBeingEditedName === "edit-lgms-header-bg-colour-0-value") {
            handleFieldChange(fieldBeingEdited, "--header-background-color");
          }
          if (fieldBeingEditedName === "edit-lgms-header-text-colour-0-value") {
            handleFieldChange(fieldBeingEdited, "--header-text-color");
          }
          if (fieldBeingEditedName === "edit-lgms-header-link-colour-0-value") {
            handleFieldChange(fieldBeingEdited, "--header-link-color");
          }
          if (fieldBeingEditedName === "edit-lgms-header-link-hover-colour-0-value") {
            handleFieldChange(fieldBeingEdited, "--header-link-hover-color");
          }

          // Footer
          if (fieldBeingEditedName === "edit-lgms-footer-bg-colour-0-value") {
            handleFieldChange(fieldBeingEdited, "--footer-background-color");
          }
          if (fieldBeingEditedName === "edit-lgms-footer-text-colour-0-value") {
            handleFieldChange(fieldBeingEdited, "--footer-text-color");
          }
          if (fieldBeingEditedName === "edit-lgms-footer-link-colour-0-value") {
            handleFieldChange(fieldBeingEdited, "--footer-link-color");
          }
          if (fieldBeingEditedName === "edit-lgms-footer-link-hover-colour-0-value") {
            handleFieldChange(fieldBeingEdited, "--footer-link-hover-color");
          }



        }
      });
    },
  };
})(Drupal);
