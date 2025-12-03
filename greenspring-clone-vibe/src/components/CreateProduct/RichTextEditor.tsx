import React, { useState, useEffect, useRef } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TiptapImage from "@tiptap/extension-image";
import TiptapParagraph from "@tiptap/extension-paragraph";
import Link from "@tiptap/extension-link";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Underline from "@tiptap/extension-underline";
import { Node, mergeAttributes } from "@tiptap/core";
import "prosemirror-tables/style/tables.css";

// ====================================================================
// 1. CUSTOM NODES & EXTENSIONS DEFINITION
// ====================================================================

// Custom Link extension with green color and subtle green underline on hover
const CustomLink = Link.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      href: {
        default: null,
        parseHTML: (element) => element.getAttribute("href"),
        renderHTML: (attributes) => {
          if (attributes.href) {
            return { href: attributes.href };
          }
        },
      },
      target: {
        default: null,
        parseHTML: (el) => el.getAttribute("target"),
        renderHTML: (attr) => (attr.target ? { target: attr.target } : {}),
      },
    };
  },
  renderHTML({ HTMLAttributes }) {
    return [
      "a",
      mergeAttributes(HTMLAttributes, {
        class:
          "text-green-600 font-semibold hover:underline hover:decoration-green-300 underline-offset-2",
        rel: "noopener noreferrer",
      }),
      0,
    ];
  },
});

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
      alt: {
        default: null,
        parseHTML: (el) => el.getAttribute("alt"),
        renderHTML: (attr) => (attr.alt ? { alt: attr.alt } : {}),
      },
      src: {
        default: null,
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
  content: "block+",
  parseHTML() {
    return [{ tag: 'div[data-type="side-image-card"]' }];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        "data-type": "side-image-card",
        class:
          "flex flex-col lg:flex-row items-center gap-6 p-4 my-6 border border-green-400 rounded-lg bg-green-50",
      }),
      0,
    ];
  },

  addCommands() {
    return {
      setSideImageCard:
        () =>
        ({ commands }) => {
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
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        "data-type": "icon-card-grid",
        class: "grid grid-cols-1 md:grid-cols-2 gap-4 p-4 mt-6",
      }),
      0,
    ];
  },

  addCommands() {
    return {
      setIconCardGrid:
        () =>
        ({ commands }) => {
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

const Toolbar = ({ editor, onUploadClick }) => {
  if (!editor) return null;

  const addImageUrl = () => {
    const url = window.prompt("Enter image URL");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  const addLink = () => {
    const url = window.prompt("Enter link URL (e.g., https://example.com)");
    if (url) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url, target: "_blank" })
        .run();

      try {
        const posAfter = editor.state.selection.to;
        const docSize = editor.state.doc.content.size;
        const newPos = Math.min(posAfter + 1, docSize);
        editor.chain().focus().setTextSelection(newPos).run();
      } catch (e) {
        // ignore
      }
    }
  };

  const removeLink = () => {
    editor.chain().focus().unsetLink().run();
  };

  // ✅ TABLE OPERATIONS - FIXED WITH PROPER PROSEMIRROR METHODS
  const insertTable = () => {
    editor
      .chain()
      .focus()
      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
      .run();
  };

  const addColumnAfter = () => {
    try {
      // सीधे command चलाओ - ProseMirror खुद check करेगा
      const result = editor.chain().focus().addColAfter().run();
      
      if (!result) {
        alert("❌ पहले table के cell में click करें!");
      }
    } catch (error) {
      console.error("Add column error:", error);
      alert("❌ Table के cell में click करने के बाद कोशिश करें!");
    }
  };

  const deleteColumn = () => {
    try {
      const result = editor.chain().focus().deleteCol().run();
      
      if (!result) {
        alert("❌ पहले table के cell में click करें!");
      }
    } catch (error) {
      console.error("Delete column error:", error);
      alert("❌ Table के cell में click करने के बाद कोशिश करें!");
    }
  };

  const addRowAfter = () => {
    try {
      const result = editor.chain().focus().addRowAfter().run();
      
      if (!result) {
        alert("❌ पहले table के cell में click करें!");
      }
    } catch (error) {
      console.error("Add row error:", error);
      alert("❌ Table के cell में click करने के बाद कोशिश करें!");
    }
  };

  const deleteRow = () => {
    try {
      const result = editor.chain().focus().deleteRow().run();
      
      if (!result) {
        alert("❌ Please click inside a table cell first!");
      }
    } catch (error) {
      console.error("Delete row error:", error);
        alert("❌ Please click inside a table cell first!");
    }
  };

  const deleteTable = () => {
    try {
      const result = editor.chain().focus().deleteTable().run();
      
      if (!result) {
        alert("❌ Please click inside a table cell first!");
      }
    } catch (error) {
      console.error("Delete table error:", error);
        alert("❌ Please click inside a table cell first!");
    }
  };

  const btnClass =
    "px-3 py-1 border border-gray-400 rounded-md text-sm hover:bg-gray-100 disabled:opacity-50 transition-colors";
  const activeBtnClass = "bg-green-200 border-green-400";

  return (
    <div className="flex flex-wrap items-center gap-2 p-3 border border-gray-300 rounded-t-md bg-gray-50">
      {/* TEXT FORMATTING */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`${btnClass} ${editor.isActive("bold") ? activeBtnClass : ""}`}
        title="Bold (Ctrl+B)"
      >
        <b>Bold</b>
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`${btnClass} ${editor.isActive("italic") ? activeBtnClass : ""}`}
        title="Italic (Ctrl+I)"
      >
        <i>Italic</i>
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        className={`${btnClass} ${editor.isActive("underline") ? activeBtnClass : ""}`}
        title="Underline (Ctrl+U)"
      >
        <u>Underline</u>
      </button>

      {/* SEPARATOR */}
      <div className="border-l border-gray-300 h-6 mx-1"></div>

      {/* IMAGE OPERATIONS */}
      <button
        type="button"
        onClick={addImageUrl}
        className={btnClass}
        title="URL से Image जोड़ें"
      >
        🖼️ Image (URL)
      </button>

      <button
        type="button"
        onClick={() => onUploadClick && onUploadClick()}
        className={btnClass}
        title="कंप्यूटर से Image Upload करें"
      >
        📤 Upload
      </button>

      {/* SEPARATOR */}
      <div className="border-l border-gray-300 h-6 mx-1"></div>

      {/* LINK OPERATIONS */}
      <button
        type="button"
        onClick={addLink}
        className={`${btnClass} ${editor.isActive("link") ? activeBtnClass : ""}`}
        title="Link जोड़ें"
      >
        🔗 Link
      </button>

      {editor.isActive("link") && (
        <button type="button" onClick={removeLink} className={btnClass} title="Link हटाएं">
          ❌ Remove Link
        </button>
      )}

      {/* SEPARATOR */}
      <div className="border-l border-gray-300 h-6 mx-1"></div>

      {/* TABLE OPERATIONS */}
      <button
        type="button"
        onClick={insertTable}
        className={btnClass}
        title="नया Table बनाएं (3x3)"
      >
        📊 Insert Table
      </button>

     

      {/* ROW OPERATIONS */}
      <div className="flex gap-1 border-l border-gray-300 pl-2 ml-2">
        <button
          type="button"
          onClick={addRowAfter}
          className={btnClass}
          title="नीचे की ओर नई Row जोड़ें"
        >
          ➕ Row
        </button>

        <button
          type="button"
          onClick={deleteRow}
          className={btnClass}
          title="मौजूदा Row हटाएं"
        >
          ❌ Row
        </button>
      </div>

      {/* DELETE TABLE */}
      <div className="border-l border-gray-300 pl-2 ml-2">
        <button
          type="button"
          onClick={deleteTable}
          className={`${btnClass} bg-red-100 border-red-400 hover:bg-red-200`}
          title="पूरा Table हटाएं"
        >
          🗑️ Delete Table
        </button>
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
        paragraph: false,
        image: false,
      }),
      Underline,
      CustomParagraph,
      CustomImage.configure({
        inline: true,
        allowBase64: true,
      }),
      CustomLink.configure({
        openOnClick: true,
        autolink: true,
      }),
      Table.configure({
        resizable: true,
        handleWidth: 4,
        cellMinWidth: 50,
        lastColumnResizable: true,
        allowTableNodeSelection: true,
      }),
      TableRow,
      TableHeader.configure({
        HTMLAttributes: {
          class: "bg-green-100 border border-gray-300 p-3 font-semibold text-left",
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: "border border-gray-300 p-3 text-left min-h-[40px]",
        },
      }),
      SideImageCard,
      IconCardGrid,
    ],
    content: initialContent || "",
    onUpdate: ({ editor }) => onChange && onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class:
          "ProseMirror focus:outline-none p-3 min-h-[300px] border border-gray-300 rounded-b-md prose prose-sm max-w-none overflow-x-auto [&_table]:w-full [&_table]:border-collapse [&_table_td]:border [&_table_td]:border-gray-300 [&_table_td]:p-3 [&_table_th]:border [&_table_th]:border-gray-300 [&_table_th]:p-3 [&_table_th]:bg-green-100",
      },
    },
  });

  // ---- Local UI state for floating link tooltip and image options
  const [linkTooltipState, setLinkTooltipState] = useState({
    visible: false,
    top: 0,
    left: 0,
  });
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // show/hide floating link tooltip when selection changes
  useEffect(() => {
    if (!editor) return;
    const handleSelection = () => {
      const sel = editor.state.selection;
      if (sel && !sel.empty && sel.from !== sel.to) {
        try {
          const coords = editor.view.coordsAtPos(sel.to);
          const left = (coords.left + coords.right) / 2;
          const top = coords.top - 40;
          setLinkTooltipState({ visible: true, top, left });
        } catch (e) {
          setLinkTooltipState((s) => ({ ...s, visible: false }));
        }
      } else {
        setLinkTooltipState((s) => ({ ...s, visible: false }));
      }
    };

    editor.on("selectionUpdate", handleSelection);
    // also hide tooltip when editor blur
    editor.on("blur", () => {
      setLinkTooltipState((s) => ({ ...s, visible: false }));
    });

    return () => {
      editor.off("selectionUpdate", handleSelection);
      editor.off("blur", () => {
        setLinkTooltipState((s) => ({ ...s, visible: false }));
      });
    };
  }, [editor]);

  // helper to update image node attributes at a position
  const updateImageAttrsAtPos = (pos: number, attrs: Record<string, any>) => {
    if (!editor || pos == null) return;
    const tr = editor.state.tr;
    const node = editor.state.doc.nodeAt(pos);
    if (!node) return;
    const newAttrs = { ...(node.attrs || {}), ...attrs };
    tr.setNodeMarkup(pos, undefined, newAttrs);
    editor.view.dispatch(tr);
    // keep focus
    editor.view.focus();
  };

  // handle upload from computer
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;
    const reader = new FileReader();
    reader.onload = () => {
      const src = reader.result as string;
      editor.chain().focus().setImage({ src, alt: file.name }).run();
      if (fileInputRef.current) fileInputRef.current.value = "";
    };
    reader.readAsDataURL(file);
  };

  const applyLinkToSelection = () => {
    if (!editor) return;
    const url = window.prompt("Enter link URL (e.g., https://example.com)");
    if (!url) return;
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url, target: "_blank" })
      .run();
    setLinkTooltipState((s) => ({ ...s, visible: false }));
  };

  return (
    <div className="relative w-full">
      <Toolbar editor={editor} onUploadClick={handleUploadClick} />

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {linkTooltipState.visible && (
        <div
          className="absolute z-50 bg-white border border-green-400 rounded shadow-lg px-3 py-2 text-sm"
          style={{
            top: linkTooltipState.top,
            left: linkTooltipState.left,
            transform: "translateX(-50%)",
          }}
        >
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={applyLinkToSelection}
            className="text-sm text-green-700 font-semibold hover:text-green-800"
          >
            ✅ Add Link
          </button>
        </div>
      )}

      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;
