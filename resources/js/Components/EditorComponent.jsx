import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tiptap/core";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Heading from "@tiptap/extension-heading";
import Code from "@tiptap/extension-code";
import Color from "@tiptap/extension-color";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import StarterKit from "@tiptap/starter-kit";
import { MenuBar } from "./MenuBar";
import FontFamily from "@tiptap/extension-font-family";
// import History from '@tiptap/extension-history';

const extensions = [
    // Core extensions
    Document,
    Paragraph,
    Text,
    TextAlign,
    TextStyle,
    FontFamily,
    // Heading levels from 1 to 6
    Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
    TextAlign.configure({
        types: ["heading", "paragraph"],
    }),
    Code,
    Color,
    BulletList,
    OrderedList,
    ListItem,
    // History,
    // StarterKit configuration
    StarterKit.configure({
        bulletList: {
            keepMarks: true,
            keepAttributes: false,
        },
        orderedList: {
            keepMarks: true,
            keepAttributes: false,
        },
    }),
];

const EditorComponent = ({ initialContent, onContentChange }) => {
    const [editor, setEditor] = useState(null);
    const editorRef = useRef(null);
    useEffect(() => {
        const editorInstance = new Editor({
            element: editorRef.current,
            extensions,
            content: initialContent || `<p>Description...</p>`, // Contenu initial
            editorProps: {
                attributes: {
                    className:
                        "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none dark:prose-invert",
                },
            },
            enablePasteRules: true,
            onUpdate: ({ editor }) => {
                if (onContentChange) {
                    onContentChange(editor.getHTML()); // Mise à jour du contenu
                }
            },
        });

        setEditor(editorInstance);

        return () => {
            editorInstance.destroy(); // Détruire l'éditeur lors du démontage
        };
    }, []); // Utiliser un tableau de dépendances vide pour s'assurer que l'éditeur est initialisé qu'une seule fois

    useEffect(() => {
        if (editor && initialContent !== editor.getHTML()) {
            editor.commands.setContent(initialContent); // Mettre à jour le contenu seulement si différent
        }
    }, [initialContent, editor]);
    return (
        <div className="flex flex-col   border border-gray-300 dark:text-gray-100 rounded-md shadow-sm  overflow-hidden dark:bg-gray-800 dark:border-gray-700">
            <MenuBar editor={editor} />
            <div
                ref={editorRef}
                className="min-h-[200px] p-4 bg-gray-100 border-t-0 dark:text-gray-100 border-gray-300 rounded-md  dark:bg-gray-900 dark:border-gray-800"
            ></div>
        </div>
    );
};

export default EditorComponent;
