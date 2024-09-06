<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class DolibarrRedirectController extends Controller
{
    public function handleRedirect(Request $request)
    {
        $dolLogin = $request->input('dol_login');

        // var_dump($request->all());exit;
        if ($dolLogin) {
            // Trouver l'utilisateur basé sur le login Dolibarr
            $user = User::where('login', $dolLogin)->first();

            if ($user) {
                // Authentifier l'utilisateur
                Auth::login($user);

                // Redirection vers la page d'accueil ou autre page sécurisée
                return redirect()->route('home');
            } else {
                // Gestion des erreurs si l'utilisateur n'existe pas
                return redirect()->route('login')->withErrors(['message' => 'Utilisateur non trouvé.']);
            }
        }

        // Gestion des cas où le dol_login n'est pas présent
        return redirect()->route('login')->withErrors(['message' => 'Authentification Dolibarr échouée.']);
    }
}


























// import React, { useState, useRef, useCallback } from "react";
// import {
//     Button,
//     Tooltip,
//     IconButton,
//     Input,
//     Select,
//     MenuItem,
//     FormControl,
//     InputLabel,
// } from "@mui/material";

// import {
//     Image as ImageIcon,
//     Link as LinkIcon,
//     Redo as RedoIcon,
//     Undo as UndoIcon,
// } from "lucide-react";
// import {
//     TextAlignCenterIcon,
//     TextAlignJustifyIcon,
//     TextAlignLeftIcon,
//     TextAlignRightIcon,
// } from "@radix-ui/react-icons";

// const RichTextEditor = () => {
//     const [content, setContent] = useState("");
//     const [history, setHistory] = useState([]);
//     const [redoStack, setRedoStack] = useState([]);
//     const [fontColor, setFontColor] = useState("#000000");
//     const [fontFamily, setFontFamily] = useState("Arial");
//     const [fontSize, setFontSize] = useState("16px");
//     const [textTransform, setTextTransform] = useState("none");
//     const editorRef = useRef(null);

//     const moveCursorToEnd = () => {
//         if (editorRef.current) {
//             const range = document.createRange();
//             const selection = window.getSelection();
//             const editor = editorRef.current;

//             range.selectNodeContents(editor);
//             range.collapse(false);

//             selection.removeAllRanges();
//             selection.addRange(range);

//             editor.focus();
//         }
//     };

//     const execCommand = useCallback((command, value = null) => {
//         document.execCommand(command, false, value);
//         saveState();
//     }, []);

//     const saveState = useCallback(() => {
//         if (editorRef.current) {
//             const newContent = editorRef.current.innerHTML;
//             setHistory((prev) => [...prev, newContent]);
//             setRedoStack([]);
//         }
//     }, []);

//     const handleUndo = useCallback(
//         (event) => {
//             event.preventDefault();
//             if (history.length > 1) {
//                 const newHistory = [...history];
//                 const lastState = newHistory.pop();
//                 setRedoStack((prev) => [lastState, ...prev]);
//                 setHistory(newHistory);
//                 setContent(newHistory[newHistory.length - 1]);
//                 requestAnimationFrame(() => moveCursorToEnd());
//             }
//         },
//         [history]
//     );

//     const handleRedo = useCallback(
//         (event) => {
//             event.preventDefault();
//             if (redoStack.length > 0) {
//                 const nextState = redoStack.shift();
//                 setHistory((prev) => [...prev, nextState]);
//                 setContent(nextState);
//                 setRedoStack(redoStack);
//                 requestAnimationFrame(() => moveCursorToEnd());
//             }
//         },
//         [redoStack]
//     );

//     const handleButtonClick = useCallback(
//         (event, command, value = null) => {
//             event.preventDefault();
//             execCommand(command, value);
//         },
//         [execCommand]
//     );
//     const handleColorChange = (event) => {
//         const color = event.target.value;
//         setFontColor(color);

//         // Get the selected text range
//         const selection = window.getSelection();
//         if (selection.rangeCount > 0) {
//             const range = document.createRange();
//             const span = document.createElement("span");
//             span.style.color = color;

//             // Wrap the selected text in the span with the new color
//             range.surroundContents(span);

//             // Move the cursor back to the end
//             selection.removeAllRanges();
//             range.collapse(false);
//             selection.addRange(range);

//             // Save the state after applying changes
//             saveState();
//         }
//     };

//     const handleFontFamilyChange = (event) => {
//         const font = event.target.value;
//         setFontFamily(font);

//         // Get the selected text range
//         const selection = window.getSelection();
//         if (selection.rangeCount > 0) {
//             const range = selection.getRangeAt(0);
//             const span = document.createElement("span");
//             span.style.fontFamily = font;

//             // Wrap the selected text in the span with the new font family
//             range.surroundContents(span);

//             // Move the cursor back to the end
//             selection.removeAllRanges();
//             range.collapse(false);
//             selection.addRange(range);

//             // Save the state after applying changes
//             saveState();
//         }
//     };
//     const handleFontSizeChange = (event) => {
//         const size = event.target.value;
//         setFontSize(size);

//         // Obtenir la sélection de texte
//         const selection = window.getSelection();

//         if (selection.rangeCount > 0) {
//             const range = selection.getRangeAt(0);
//             const span = document.createElement("span");
//             span.style.fontSize = size;

//             // Wrap the selected text in the span with the new font size
//             range.surroundContents(span);

//             // Move the cursor back to the end
//             selection.removeAllRanges();
//             range.collapse(false);
//             selection.addRange(range);

//             // Save the state after applying changes
//             saveState();
//         }
//     };

//     const handleTextTransformChange = (transform) => {
//         setTextTransform(transform);
//         const selectedText = window.getSelection();
//         if (selectedText.rangeCount > 0) {
//             const range = selectedText.getRangeAt(0);
//             const span = document.createElement("span");
//             span.style.textTransform = transform;
//             range.surroundContents(span);
//             saveState();
//         }
//     };

//     const toolbarConfig = [
//         {
//             icon: <UndoIcon size={20} />,
//             command: "undo",
//             title: "Undo",
//             onClick: handleUndo,
//         },
//         {
//             icon: <RedoIcon size={20} />,
//             command: "redo",
//             title: "Redo",
//             onClick: handleRedo,
//         },
//         { icon: <b>B</b>, command: "bold", title: "Bold" },
//         { icon: <i>I</i>, command: "italic", title: "Italic" },
//         { icon: <u>U</u>, command: "underline", title: "Underline" },
//         { icon: <s>S</s>, command: "strikeThrough", title: "Strikethrough" },
//         {
//             icon: "A",
//             command: "foreColor",
//             title: "Font Color",
//         },
//         {
//             icon: "H",
//             command: "hiliteColor",
//             value: prompt,
//             title: "Highlight Color",
//         },
//         {
//             icon: <TextAlignLeftIcon />,
//             command: "justifyLeft",
//             title: "Align Left",
//         },
//         {
//             icon: <TextAlignCenterIcon />,
//             command: "justifyCenter",
//             title: "Align Center",
//         },
//         {
//             icon: <TextAlignRightIcon />,
//             command: "justifyRight",
//             title: "Align Right",
//         },
//         {
//             icon: <TextAlignJustifyIcon />,
//             command: "justifyFull",
//             title: "Justify",
//         },
//         {
//             icon: "•",
//             command: "insertUnorderedList",
//             title: "Bullet List",
//         },
//         {
//             icon: "1.",
//             command: "insertOrderedList",
//             title: "Numbered List",
//         },
//         { icon: "←", command: "outdent", title: "Decrease Indent" },
//         { icon: "→", command: "indent", title: "Increase Indent" },
//         {
//             icon: <LinkIcon />,
//             command: "createLink",
//             value: prompt,
//             title: "Insert Link",
//         },
//         {
//             icon: <ImageIcon />,
//             command: "insertImage",
//             value: prompt,
//             title: "Insert Image",
//         },
//     ];

//     return (
//         <div className="" style={{ direction: "ltr" }}>
//             <div className="flex flex-wrap items-center gap-2 p-2 bg-gray-100 rounded-t-md">
//                 {toolbarConfig.map((tool) => (
//                     <Tooltip
//                         key={tool.command}
//                         title={tool.title}
//                         placement="bottom"
//                     >
//                         <IconButton
//                             onClick={
//                                 tool.onClick
//                                     ? tool.onClick
//                                     : (event) =>
//                                           handleButtonClick(
//                                               event,
//                                               tool.command,
//                                               tool.value
//                                           )
//                             }
//                             style={{
//                                 minWidth: 30,
//                                 height: 30,
//                                 display: "flex",
//                                 alignItems: "center",
//                                 justifyContent: "center",
//                                 borderRadius: "4px",
//                                 transition: "background-color 0.3s",
//                                 backgroundColor: document.queryCommandState(
//                                     tool.command
//                                 )
//                                     ? "#007bff"
//                                     : "#ffffff",
//                                 color: document.queryCommandState(tool.command)
//                                     ? "#ffffff"
//                                     : "#000000",
//                             }}
//                             onMouseDown={(e) => e.preventDefault()}
//                         >
//                             {tool.icon}
//                         </IconButton>
//                     </Tooltip>
//                 ))}
//                 <FormControl
//                     variant="standard"
//                     sx={{ minWidth: 120, marginLeft: 1 }}
//                 >
//                     <InputLabel id="font-family-label">Font Family</InputLabel>
//                     <Select
//                         labelId="font-family-label"
//                         id="font-family-select"
//                         value={fontFamily}
//                         onChange={handleFontFamilyChange}
//                     >
//                         <MenuItem value="Arial">Arial</MenuItem>
//                         <MenuItem value="Courier New">Courier New</MenuItem>
//                         <MenuItem value="Georgia">Georgia</MenuItem>
//                         <MenuItem value="Times New Roman">
//                             Times New Roman
//                         </MenuItem>
//                         <MenuItem value="Verdana">Verdana</MenuItem>
//                     </Select>
//                 </FormControl>
//                 <FormControl
//                     variant="standard"
//                     sx={{ minWidth: 120, marginLeft: 1 }}
//                 >
//                     <InputLabel id="font-size-label">Font Size</InputLabel>
//                     <Select
//                         labelId="font-size-label"
//                         id="font-size-select"
//                         value={fontSize}
//                         onChange={handleFontSizeChange}
//                     >
//                         <MenuItem value="12px">12px</MenuItem>
//                         <MenuItem value="14px">14px</MenuItem>
//                         <MenuItem value="16px">16px</MenuItem>
//                         <MenuItem value="18px">18px</MenuItem>
//                         <MenuItem value="20px">20px</MenuItem>
//                         <MenuItem value="24px">24px</MenuItem>
//                     </Select>
//                 </FormControl>
//                 <Input
//                     type="color"
//                     value={fontColor}
//                     onChange={handleColorChange}
//                     style={{ marginLeft: 10 }}
//                 />
//                 <Button onClick={() => handleTextTransformChange("capitalize")}>
//                     Capitalize
//                 </Button>
//                 <Button onClick={() => handleTextTransformChange("uppercase")}>
//                     Uppercase
//                 </Button>
//                 <Button onClick={() => handleTextTransformChange("lowercase")}>
//                     Lowercase
//                 </Button>
//             </div>
//             <div
//                 className="border rounded-b-md p-4"
//                 contentEditable={true}
//                 ref={editorRef}
//                 onInput={saveState}
//                 onKeyDown={(e) => {
//                     if (e.key === "z" && (e.ctrlKey || e.metaKey)) {
//                         e.preventDefault();
//                         handleUndo(e);
//                     } else if (e.key === "y" && (e.ctrlKey || e.metaKey)) {
//                         e.preventDefault();
//                         handleRedo(e);
//                     }
//                 }}
//                 style={{
//                     outline: "none",
//                     minHeight: "200px",
//                     fontFamily: fontFamily,
//                     fontSize: fontSize,
//                     color: fontColor,
//                     textTransform: textTransform,
//                 }}
//                 dangerouslySetInnerHTML={{ __html: content }}
//             ></div>
//         </div>
//     );
// };
