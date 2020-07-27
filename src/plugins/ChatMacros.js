import Plugin from "@ckeditor/ckeditor5-core/src/plugin";

import Model from "@ckeditor/ckeditor5-ui/src/model";
import Collection from "@ckeditor/ckeditor5-utils/src/collection";

import {
  addListToDropdown,
  createDropdown,
} from "@ckeditor/ckeditor5-ui/src/dropdown/utils";

const opts = [
  { label: "Visitor Name", value: "[VisitorName]" },
  { label: "Visitor Email", value: "[VisitorEmail]" },
  { label: "Agent Display Name", value: "[AgentDisplayName]" },
  { label: "Agent Email", value: "[AgentEmail]" },
  { label: "Agent Phone", value: "[AgentPhone]" },
  { label: "Department Name", value: "[DepartmentName]" },
  { label: "Custom Data", value: "[key:value]" },
];

export default class ChatMacros extends Plugin {
  init() {
    const editor = this.editor;

    editor.ui.componentFactory.add("chatMacros", (locale) => {
      // The default dropdown.
      const dropdownView = createDropdown(locale);

      // The collection of the list items.
      const items = new Collection();

      opts.forEach((opt) => {
        items.add({
          type: "button",
          model: new Model({
            withText: true,
            label: opt.label,
            value: opt.value,
          }),
        });
      });

      // Create a dropdown with a list inside the panel.
      addListToDropdown(dropdownView, items);

      dropdownView.buttonView.set({
        withText: true,
        label: "Chat Macros",
      });

      dropdownView.on("execute", (eventInfo) => {
        const { value } = eventInfo.source;

        editor.model.change((writer) => {
          const insertPosition = editor.model.document.selection.getFirstPosition();
          writer.insertText(value, insertPosition);
        });
      });

      return dropdownView;
    });
  }
}
