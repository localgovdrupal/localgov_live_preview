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

      function handleTextFieldChange(fieldBeingEdited, cssVariableName) {
        fieldBeingEdited.addEventListener("change", () => {
          bodyElement.style.setProperty(
            cssVariableName,
            fieldBeingEdited.value
          );
        });
        let colourPickerInput;
        if (fieldBeingEdited.closest(".colour-picker-field")) {
          colourPickerInput = fieldBeingEdited
            .closest(".colour-picker-field")
            .querySelector(".colour-picker-field__picker");
          colourPickerInput.addEventListener("input", () => {
            bodyElement.style.setProperty(
              cssVariableName,
              colourPickerInput.value
            );
            colourPickerInput.closest(".colour-picker-field").querySelector(".colour-picker-field__text").value = colourPickerInput.value;
          });
        }
      }

      function handleSelectFieldChange(selectElement, cssVariableName) {
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
      // Store references to heading font and font weight elements in arrays
      const headingFonts = [
        once('headingFont', '[data-drupal-selector="edit-lgms-heading-1-font"]', context)[0],
        once('headingFont', '[data-drupal-selector="edit-lgms-heading-2-font"]', context)[0],
        once('headingFont', '[data-drupal-selector="edit-lgms-heading-3-font"]', context)[0],
        once('headingFont', '[data-drupal-selector="edit-lgms-heading-4-font"]', context)[0],
        once('headingFont', '[data-drupal-selector="edit-lgms-heading-5-font"]', context)[0],
        once('headingFont', '[data-drupal-selector="edit-lgms-heading-6-font"]', context)[0]
      ];

      const headingFontWeights = [
        once('headingFont', '[data-drupal-selector="edit-lgms-heading-1-font-weight"]', context)[0],
        once('headingFont', '[data-drupal-selector="edit-lgms-heading-2-font-weight"]', context)[0],
        once('headingFont', '[data-drupal-selector="edit-lgms-heading-3-font-weight"]', context)[0],
        once('headingFont', '[data-drupal-selector="edit-lgms-heading-4-font-weight"]', context)[0],
        once('headingFont', '[data-drupal-selector="edit-lgms-heading-5-font-weight"]', context)[0],
        once('headingFont', '[data-drupal-selector="edit-lgms-heading-6-font-weight"]', context)[0]
      ];

      // Main menu
      const [mainMenuLinkFontWeight] = once('mainMenuLinkFontWeight', '[data-drupal-selector="edit-lgms-main-menu-font-weight"]', context);
      const [mainMenuSubMenuIcon] = once('mainMenuSubMenuIcon', '[data-drupal-selector="edit-lgms-submenu-icon"]', context);
      const [mainMenuSubMenuIconRotation] = once('mainMenuSubMenuIconRotation', '[data-drupal-selector="edit-lgms-submenu-icon-rotation"]', context);
      const [mainMenuOffCanvasMenuIcon] = once('mainMenuOffCanvasMenuIcon', '[data-drupal-selector="edit-lgms-off-canvas-menu-icon"]', context);

      // Footer
      const [footerItemsJustification] = once('footerItemsJustification', '[data-drupal-selector="edit-lgms-footer-items-alignment"]', context);

      // Defaut Items
      if (bodyFont) {
        handleSelectFieldChange(bodyFont, "--font-primary");
      }
      if (headingFont) {
        handleSelectFieldChange(headingFont, "--font-secondary");
      }
      if (headingFontWeightField) {
        handleSelectFieldChange(headingFontWeightField, "--heading-font-weight");
      }
      if (siteNameWeightField) {
        handleSelectFieldChange(siteNameWeightField, "--site-name-font-weight");
      }
      if (headerItemsVerticalAlighmentField) {
        handleSelectFieldChange(headerItemsVerticalAlighmentField, "--header-items-alignment");
      }

      // Headings
      for (let i = 0; i <= 5; i++) {
        if (headingFonts[i]) {
          handleSelectFieldChange(headingFonts[i], `--font-heading-${i + 1}`);
        }
        if (headingFontWeights[i]) {
          handleSelectFieldChange(headingFontWeights[i], `--heading-${i + 1}-font-weight`);
        }
      }


      // Main menu
      if (mainMenuLinkFontWeight) {
        handleSelectFieldChange(mainMenuLinkFontWeight, "--menu-main-font-weight");
      }
      if (mainMenuSubMenuIcon) {
        handleSelectFieldChange(mainMenuSubMenuIcon, "--menu-sub-menu-icon");
      }
      if (mainMenuSubMenuIconRotation) {
        handleSelectFieldChange(mainMenuSubMenuIconRotation, "--menu-item-toggle-icon-rotation");
      }
      if (mainMenuOffCanvasMenuIcon) {
        handleSelectFieldChange(mainMenuOffCanvasMenuIcon, "--off-canvas-menu-icon");
      }

      // Footer
      if (footerItemsJustification) {
        handleSelectFieldChange(footerItemsJustification, "--footer-grid-column-justification");
      }

      window.addEventListener("click", function (e) {
        // If this is true, then we are in the edit form inside a modal
        if (e.target.closest(".ui-dialog .group-microsite-edit-form")) {
          const fieldBeingEdited = e.target;
          const fieldBeingEditedName = e.target.dataset.drupalSelector;

          // Default items
          if (fieldBeingEditedName === "edit-lgms-primary-colour-0-value") {
            handleTextFieldChange(fieldBeingEdited, "--color-accent");
          }
          if (fieldBeingEditedName === "edit-lgms-primary-colour-contrast-0-value") {
            handleTextFieldChange(fieldBeingEdited, "--color-accent-contrast");
          }
          if (fieldBeingEditedName === "edit-lgms-secondary-colour-0-value") {
            handleTextFieldChange(fieldBeingEdited, "--color-secondary");
          }
          if (fieldBeingEditedName === "edit-lgms-secondary-colour-contrast-0-value") {
            handleTextFieldChange(fieldBeingEdited, "--color-secondary-contrast");
          }
          if (fieldBeingEditedName === "edit-lgms-text-colour-0-value") {
            handleTextFieldChange(fieldBeingEdited, "--color-text");
          }
          if (fieldBeingEditedName === "edit-lgms-page-background-colour-0-value") {
            handleTextFieldChange(fieldBeingEdited, "--page-background-color");
          }
          if (fieldBeingEditedName === "edit-lgms-link-colour-0-value") {
            handleTextFieldChange(fieldBeingEdited, "--color-link");
          }
          if (fieldBeingEditedName === "edit-lgms-base-line-height-0-value") {
            handleTextFieldChange(fieldBeingEdited, "--line-height");
          }
          if (fieldBeingEditedName === "edit-lgms-base-spacing-0-value") {
            handleTextFieldChange(fieldBeingEdited, "--spacing");
          }

          // Headings
          // Loop through values 1 to 6 for heading font sizes and colors
          for (let i = 1; i <= 6; i++) {
            if (fieldBeingEditedName === `edit-lgms-heading-${i}-font-size-0-value`) {
              handleTextFieldChange(fieldBeingEdited, `--font-size-h${i}`);
            }
            if (fieldBeingEditedName === `edit-lgms-heading-${i}-font-colour-0-value`) {
              handleTextFieldChange(fieldBeingEdited, `--heading-${i}-color`);
            }
            if (fieldBeingEditedName === `edit-lgms-heading-${i}-line-height-0-value`) {
              handleTextFieldChange(fieldBeingEdited, `--heading-${i}-line-height`);
            }
          }

          // Pre-header
          if (fieldBeingEditedName === "edit-lgms-pre-header-bg-colour-0-value") {
            handleTextFieldChange(fieldBeingEdited, "--pre-header-background-color");
          }
          if (fieldBeingEditedName === "edit-lgms-pre-header-text-colour-0-value") {
            handleTextFieldChange(fieldBeingEdited, "--pre-header-text-color");
          }
          if (fieldBeingEditedName === "edit-lgms-pre-header-link-colour-0-value") {
            handleTextFieldChange(fieldBeingEdited, "--pre-header-link-color");
          }
          if (fieldBeingEditedName === "edit-lgms-pre-header-link-hover-colour-0-value") {
            handleTextFieldChange(fieldBeingEdited, "--pre-header-link-hover-color");
          }

          // Header
          if (fieldBeingEditedName === "edit-lgms-header-bg-colour-0-value") {
            handleTextFieldChange(fieldBeingEdited, "--header-background-color");
          }
          if (fieldBeingEditedName === "edit-lgms-header-text-colour-0-value") {
            handleTextFieldChange(fieldBeingEdited, "--header-text-color");
          }
          if (fieldBeingEditedName === "edit-lgms-header-link-colour-0-value") {
            handleTextFieldChange(fieldBeingEdited, "--header-link-color");
          }
          if (fieldBeingEditedName === "edit-lgms-header-link-hover-colour-0-value") {
            handleTextFieldChange(fieldBeingEdited, "--header-link-hover-color");
          }

          // Footer
          if (fieldBeingEditedName === "edit-lgms-footer-bg-colour-0-value") {
            handleTextFieldChange(fieldBeingEdited, "--footer-background-color");
          }
          if (fieldBeingEditedName === "edit-lgms-footer-text-colour-0-value") {
            handleTextFieldChange(fieldBeingEdited, "--footer-text-color");
          }
          if (fieldBeingEditedName === "edit-lgms-footer-link-colour-0-value") {
            handleTextFieldChange(fieldBeingEdited, "--footer-link-color");
          }
          if (fieldBeingEditedName === "edit-lgms-footer-link-hover-colour-0-value") {
            handleTextFieldChange(fieldBeingEdited, "--footer-link-hover-color");
          }

          // Main menu
          if (fieldBeingEditedName === "edit-lgms-main-menu-font-size-0-value") {
            handleTextFieldChange(fieldBeingEdited, "--menu-main-font-size");
          }
          if (fieldBeingEditedName === "edit-lgms-submenu-background-colour-0-value") {
            handleTextFieldChange(fieldBeingEdited, "--menu-sub-menu-background-colour");
          }
          if (fieldBeingEditedName === "edit-lgms-submenu-link-colour-0-value") {
            handleTextFieldChange(fieldBeingEdited, "---menu-sub-menu-link-colour");
          }
          if (fieldBeingEditedName === "edit-lgms-off-canvas-bg-colour-0-value") {
            handleTextFieldChange(fieldBeingEdited, "--off-canvas-background-color");
          }
          if (fieldBeingEditedName === "edit-lgms-off-canvas-text-colour-0-value") {
            handleTextFieldChange(fieldBeingEdited, "--off-canvas-text-color");
          }

        }
      });
    },
  };
})(Drupal);
