// create a drupal javascript behaviour
(function localovLivePreviewScript(Drupal) {
  Drupal.behaviors.localovLivePreview = {
    attach: function (context, settings) {
      const [bodyElement] = once("bodyElement", "body", context);
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
      if (headingFont1) {
        handleSelectFieldChange(headingFont1, "--font-heading-1");
      }
      if (headingFontWeight1) {
        handleSelectFieldChange(headingFontWeight1, "--heading-1-font-weight");
      }
      if (headingFont2) {
        handleSelectFieldChange(headingFont2, "--font-heading-2");
      }
      if (headingFontWeight2) {
        handleSelectFieldChange(headingFontWeight2, "--heading-2-font-weight");
      }
      if (headingFont3) {
        handleSelectFieldChange(headingFont3, "--font-heading-3");
      }
      if (headingFontWeight3) {
        handleSelectFieldChange(headingFontWeight3, "--heading-3-font-weight");
      }
      if (headingFont4) {
        handleSelectFieldChange(headingFont4, "--font-heading-4");
      }
      if (headingFontWeight4) {
        handleSelectFieldChange(headingFontWeight4, "--heading-4-font-weight");
      }
      if (headingFont5) {
        handleSelectFieldChange(headingFont5, "--font-heading-5");
      }
      if (headingFontWeight5) {
        handleSelectFieldChange(headingFontWeight5, "--heading-5-font-weight");
      }
      if (headingFont6) {
        handleSelectFieldChange(headingFont6, "--font-heading-6");
      }
      if (headingFontWeight6) {
        handleSelectFieldChange(headingFontWeight6, "--heading-6-font-weight");
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
          if (fieldBeingEditedName === "edit-lgms-heading-1-font-size-0-value") {
            handleTextFieldChange(fieldBeingEdited, "--font-size-h1");
          }
          if (fieldBeingEditedName === "edit-lgms-heading-2-font-size-0-value") {
            handleTextFieldChange(fieldBeingEdited, "--font-size-h2");
          }
          if (fieldBeingEditedName === "edit-lgms-heading-3-font-size-0-value") {
            handleTextFieldChange(fieldBeingEdited, "--font-size-h3");
          }
          if (fieldBeingEditedName === "edit-lgms-heading-4-font-size-0-value") {
            handleTextFieldChange(fieldBeingEdited, "--font-size-h4");
          }
          if (fieldBeingEditedName === "edit-lgms-heading-5-font-size-0-value") {
            handleTextFieldChange(fieldBeingEdited, "--font-size-h5");
          }
          if (fieldBeingEditedName === "edit-lgms-heading-6-font-size-0-value") {
            handleTextFieldChange(fieldBeingEdited, "--font-size-h6");
          }
          if (fieldBeingEditedName === "edit-lgms-heading-1-font-colour-0-value") {
            handleTextFieldChange(fieldBeingEdited, "--heading-1-color");
          }
          if (fieldBeingEditedName === "edit-lgms-heading-2-font-colour-0-value") {
            handleTextFieldChange(fieldBeingEdited, "--heading-2-color");
          }
          if (fieldBeingEditedName === "edit-lgms-heading-3-font-colour-0-value") {
            handleTextFieldChange(fieldBeingEdited, "--heading-3-color");
          }
          if (fieldBeingEditedName === "edit-lgms-heading-4-font-colour-0-value") {
            handleTextFieldChange(fieldBeingEdited, "--heading-4-color");
          }
          if (fieldBeingEditedName === "edit-lgms-heading-5-font-colour-0-value") {
            handleTextFieldChange(fieldBeingEdited, "--heading-5-color");
          }
          if (fieldBeingEditedName === "edit-lgms-heading-6-font-colour-0-value") {
            handleTextFieldChange(fieldBeingEdited, "--heading-6-color");
          }
          if (fieldBeingEditedName === "edit-lgms-heading-1-line-height-0-value") {
            handleTextFieldChange(fieldBeingEdited, "--heading-1-line-height");
          }
          if (fieldBeingEditedName === "edit-lgms-heading-2-line-height-0-value") {
            handleTextFieldChange(fieldBeingEdited, "--heading-2-line-height");
          }
          if (fieldBeingEditedName === "edit-lgms-heading-3-line-height-0-value") {
            handleTextFieldChange(fieldBeingEdited, "--heading-3-line-height");
          }
          if (fieldBeingEditedName === "edit-lgms-heading-4-line-height-0-value") {
            handleTextFieldChange(fieldBeingEdited, "--heading-4-line-height");
          }
          if (fieldBeingEditedName === "edit-lgms-heading-5-line-height-0-value") {
            handleTextFieldChange(fieldBeingEdited, "--heading-5-line-height");
          }
          if (fieldBeingEditedName === "edit-lgms-heading-6-line-height-0-value") {
            handleTextFieldChange(fieldBeingEdited, "--heading-6-line-height");
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
