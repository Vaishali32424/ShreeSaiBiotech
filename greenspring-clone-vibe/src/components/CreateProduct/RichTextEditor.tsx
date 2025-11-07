import React, { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
// Tiptap Extensions
import StarterKit from "@tiptap/starter-kit";
import TiptapImage from "@tiptap/extension-image";
import TiptapParagraph from "@tiptap/extension-paragraph";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import { Node, mergeAttributes } from "@tiptap/core"; // Node, mergeAttributes, etc. import

// ====================================================================
// 1. CUSTOM NODES & EXTENSIONS DEFINITION
// ====================================================================

// Base Extensions to allow saving class/style attributes (Tailwind)
const CustomImage = TiptapImage.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      class: {
        default: null,
        parseHTML: (element) => element.getAttribute("class"),
        renderHTML: (attributes) => {
          if (attributes.class) {
            return { class: attributes.class };
          }
        },
      },
      style: {
        default: null,
        parseHTML: (element) => element.getAttribute("style"),
        renderHTML: (attributes) => {
          if (attributes.style) {
            return { style: attributes.style };
          }
        },
      },
    };
  },
});

const CustomParagraph = TiptapParagraph.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      class: {
        default: null,
        parseHTML: (element) => element.getAttribute("class"),
        renderHTML: (attributes) => {
          if (attributes.class) {
            return { class: attributes.class };
          }
        },
      },
      style: {
        default: null,
        parseHTML: (element) => element.getAttribute("style"),
        renderHTML: (attributes) => {
          if (attributes.style) {
            return { style: attributes.style };
          }
        },
      },
    };
  },
});

// 2-Column Side Image Card Node
const SideImageCard = Node.create({
  name: "sideImageCard",
  group: "block",
  content: "block+", // Can contain editable block content inside
  parseHTML() {
    return [{ tag: 'div[data-type="side-image-card"]' }];
  },
  renderHTML({ HTMLAttributes }) {
    // 🔴 FIX: The external structure is rendered, and '0' holds the place for content: 'block+'
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        "data-type": "side-image-card",
        class:
          "flex flex-col lg:flex-row items-center gap-6 p-4 my-6 border border-green-400 rounded-lg bg-green-50",
      }), // ProseMirror content slot (This is where the 'block+' content goes)
      0,
    ];
  },

  addCommands() {
    return {
      setSideImageCard:
        () =>
        ({ commands }) => {
          // This command inserts the node with default placeholder content
          // that adheres to the 'block+' rule.
          return commands.insertContent({
            type: this.name,
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    type: "text",
                    text: "Edit Text Content Here (Left/Right Column)",
                  },
                ],
              },
              {
                type: "paragraph",
                content: [
                  { type: "text", text: "Edit Image/Icon Here (Other Column)" },
                ],
              },
            ],
          });
        },
    };
  },
});

// 3-Column Icon Card Grid Node (Why Choose Us)
const IconCardGrid = Node.create({
  name: "iconCardGrid",
  group: "block",
  content: "block+",
  parseHTML() {
    return [{ tag: 'div[data-type="icon-card-grid"]' }];
  },
  renderHTML({ HTMLAttributes }) {
    // 🔴 FIX: The external structure is rendered, and '0' holds the place for content: 'block+'
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        "data-type": "icon-card-grid",
        class: "grid grid-cols-1 md:grid-cols-2 gap-4 p-4 mt-6",
      }), // ProseMirror content slot
      0,
    ];
  },

  addCommands() {
    return {
      setIconCardGrid:
        () =>
        ({ commands }) => {
          // Insert the node with default content for 3 editable slots
          return commands.insertContent({
            type: this.name,
            content: [
              {
                type: "paragraph",
                content: [{ text: "Card 1: Edit your text here" }],
              },
              {
                type: "paragraph",
                content: [{ text: "Card 2: Edit your text here" }],
              },
              {
                type: "paragraph",
                content: [{ text: "Card 3: Edit your text here" }],
              },
            ],
          });
        },
    };
  },
});

// ====================================================================
// 2. TOOLBAR COMPONENT
// ====================================================================

const Toolbar = ({ editor }) => {
  if (!editor) return null;

  const addImage = () => {
    const url = window.prompt("Enter image URL");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  const [showCardMenu, setShowCardMenu] = useState(false);
  const insertNode = (command) => {
    // Calls the command defined in addCommands()
    editor.chain().focus()[command]().run();
  };

  const btnClass =
    "px-3 py-1 border border-gray-400 rounded-md text-sm hover:bg-gray-100 disabled:opacity-50";
  const activeBtnClass = "bg-gray-200";
  const menuBtnClass =
    "px-3 py-1 text-white bg-blue-600 rounded-md text-sm hover:bg-blue-700";
  const dropdownItemClass =
    "block w-full text-left px-3 py-1 text-sm text-gray-700 hover:bg-gray-100";

  return (
    <div className="flex flex-wrap gap-2 p-2 border border-gray-300 rounded-t-md bg-gray-50 relative">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`${btnClass} ${
          editor.isActive("bold") ? activeBtnClass : ""
        }`}
      >
        Bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`${btnClass} ${
          editor.isActive("italic") ? activeBtnClass : ""
        }`}
      >
        Italic
      </button>
 
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`${btnClass} ${
          editor.isActive("bulletList") ? activeBtnClass : ""
        }`}
      >
        List
      </button>
\
      <button
        onClick={() =>
          editor
            .chain()
            .focus()
            .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
            .run()
        }
        className={btnClass}
      >
        Insert Table
      </button>
      <button onClick={addImage} className={btnClass}>
        Add Image (URL)
      </button>
      <div className="relative">
       
        <button
          type="button"
          onClick={() => setShowCardMenu(!showCardMenu)}
          className={menuBtnClass}
        >
 + Add Card 
        </button>
        {showCardMenu && (
          <div className="absolute z-10 mt-1 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div
              className="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
            >
            
              <button
                onClick={() => {
                  insertNode("setIconCardGrid");
                  setShowCardMenu(false);
                }}
                className={dropdownItemClass}
                role="menuitem"
              >
               Icon/Why Choose Us (3-Col) </button>
          
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ====================================================================
// 3. RICH TEXT EDITOR COMPONENT
// ====================================================================

const RichTextEditor = ({ initialContent, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Default StarterKit settings को डिसेबल करें
        paragraph: false,
        image: false,
      }), // Custom extensions को जोड़ें
      CustomParagraph,
      CustomImage.configure({
        inline: true,
        allowBase64: true,
      }), // Table extensions
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell, // --- Custom Card Nodes (Crucial for the fix) ---

      SideImageCard,
      IconCardGrid, // -----------------------------------------------
    ],
    content: initialContent || "",
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      handleKeyDown: (view, event) => {
        if (event.key === "Enter" && !event.shiftKey) {
          const { state } = view;
          const { $from } = state.selection;
          const parent = $from.node(-1); // Table exit logic

          if (
            parent.type.name === "tableCell" ||
            parent.type.name === "tableHeader"
          ) {
            event.preventDefault();

            const { tr } = state;
            const endPos = $from.end($from.depth - 1);
            view.dispatch(
              tr
                .insert(endPos, state.schema.nodes.paragraph.create())
                .setSelection(
                  state.selection.constructor.near(tr.doc.resolve(endPos + 1))
                )
            );
            view.focus();
            return true;
          }
        }
        return false;
      },
      attributes: {
        class:
          "ProseMirror focus:outline-none p-3 min-h-[200px] border border-gray-300 rounded-b-md",
      },
    },
  });

  return (
    <div>
            <Toolbar editor={editor} />
            <EditorContent editor={editor} />   {" "}
    </div>
  );
};

export default RichTextEditor;
