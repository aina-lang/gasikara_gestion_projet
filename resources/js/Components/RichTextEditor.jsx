import React from "react";
import EditorComponent from "./EditorComponent";

const RichTextEditor = ({ initialContent, onContentChange }) => {
    return (
        <EditorComponent
            initialContent={initialContent} // Passer le contenu initial comme prop
            onContentChange={onContentChange} // Passer la fonction de gestion des changements comme prop
        />
    );
};

export default RichTextEditor;
