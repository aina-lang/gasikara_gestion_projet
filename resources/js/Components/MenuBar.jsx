import {
    BoldIcon,
    ItalicIcon,
    StrikethroughIcon,
    CodeIcon,
    AlignLeftIcon,
    AlignCenterIcon,
    AlignRightIcon,
    UndoIcon,
    RedoIcon,
    Heading1Icon,
    Heading2Icon,
    Heading3Icon,
    Heading4Icon,
    Heading5Icon,
    Heading6Icon,
    BrushIcon,
    HardHatIcon,
    FileCode2Icon,
    ListCollapseIcon,
    ListOrdered,
    AlignJustify,
} from "lucide-react"; // Ensure you have these icons or similar ones
import { BlockOutlined, HorizontalRule } from "@mui/icons-material";

import { Menu, MenuItem, Button } from "@mui/material";
import { useCurrentEditor } from "@tiptap/react";

const FontFamilyDropdown = ({ editor }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleFontFamilyChange = (fontFamily) => {
        editor.chain().focus().setFontFamily(fontFamily).run();
        handleClose();
    };

    return (
        <div className="control-group">
            <Button onClick={handleClick} variant="contained">
                Font Family
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem
                    onClick={() => handleFontFamilyChange("Inter")}
                    selected={editor.isActive("textStyle", {
                        fontFamily: "Inter",
                    })}
                >
                    Inter
                </MenuItem>
                <MenuItem
                    onClick={() =>
                        handleFontFamilyChange("Comic Sans MS, Comic Sans")
                    }
                    selected={editor.isActive("textStyle", {
                        fontFamily: "Comic Sans MS, Comic Sans",
                    })}
                >
                    Comic Sans
                </MenuItem>
                <MenuItem
                    onClick={() => handleFontFamilyChange("serif")}
                    selected={editor.isActive("textStyle", {
                        fontFamily: "serif",
                    })}
                >
                    Serif
                </MenuItem>
                <MenuItem
                    onClick={() => handleFontFamilyChange("monospace")}
                    selected={editor.isActive("textStyle", {
                        fontFamily: "monospace",
                    })}
                >
                    Monospace
                </MenuItem>
                <MenuItem
                    onClick={() => handleFontFamilyChange("cursive")}
                    selected={editor.isActive("textStyle", {
                        fontFamily: "cursive",
                    })}
                >
                    Cursive
                </MenuItem>
                <MenuItem
                    onClick={() =>
                        handleFontFamilyChange("var(--title-font-family)")
                    }
                    selected={editor.isActive("textStyle", {
                        fontFamily: "var(--title-font-family)",
                    })}
                >
                    CSS variable
                </MenuItem>
                <MenuItem
                    onClick={() =>
                        handleFontFamilyChange('"Comic Sans MS", "Comic Sans"')
                    }
                    selected={editor.isActive("textStyle", {
                        fontFamily: '"Comic Sans MS", "Comic Sans"',
                    })}
                >
                    Comic Sans quoted
                </MenuItem>
                <MenuItem
                    onClick={() =>
                        editor.chain().focus().unsetFontFamily().run()
                    }
                >
                    Unset font family
                </MenuItem>
            </Menu>
        </div>
    );
};

const MyButton = ({ icon, isActive, onClick, disabled, ariaLabel }) => (
    <button
        onClick={(e) => {
            e.preventDefault();
            onClick();
        }}
        disabled={disabled}
        className={`p-2 rounded-md ${
            isActive ? "bg-gray-200 dark:text-black" : "dark:bg-gray-900 text-gray-400"
        } border dark:border-gray-700 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 dark:focus:ring-gray-400`}
        aria-label={ariaLabel}
    >
        {icon}
    </button>
);

export const MenuBar = ({ editor }) => {
    // const { editor } = useCurrentEditor();

    if (!editor) {
        return null;
    }

    return (
        <div className="flex flex-wrap gap-2 p-2 dark:bg-gray-900 border-b dark:border-gray-700">
            <div className="flex gap-2" aria-label="Editor styling">
                <MyButton
                    icon={<BoldIcon />}
                    isActive={editor.isActive("bold")}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={!editor.can().chain().focus().toggleBold().run()}
                    ariaLabel="Bold"
                />
                <MyButton
                    icon={<ItalicIcon />}
                    isActive={editor.isActive("italic")}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={
                        !editor.can().chain().focus().toggleItalic().run()
                    }
                    ariaLabel="Italic"
                />
                <MyButton
                    icon={<StrikethroughIcon />}
                    isActive={editor.isActive("strike")}
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    disabled={
                        !editor.can().chain().focus().toggleStrike().run()
                    }
                    ariaLabel="Strike-through"
                />
                <MyButton
                    icon={<CodeIcon />}
                    isActive={editor.isActive("code")}
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    disabled={!editor.can().chain().focus().toggleCode().run()}
                    ariaLabel="Code"
                />
            </div>

            <div className="flex gap-2" aria-label="Text formatting">
                <MyButton
                    icon={<AlignLeftIcon />}
                    isActive={editor.isActive({ textAlign: "left" })}
                    onClick={() =>
                        editor.chain().focus().setTextAlign("left").run()
                    }
                    ariaLabel="Align Left"
                />
                <MyButton
                    icon={<AlignCenterIcon />}
                    isActive={editor.isActive({ textAlign: "center" })}
                    onClick={() =>
                        editor.chain().focus().setTextAlign("center").run()
                    }
                    ariaLabel="Align Center"
                />
                <MyButton
                    icon={<AlignRightIcon />}
                    isActive={editor.isActive({ textAlign: "right" })}
                    onClick={() =>
                        editor.chain().focus().setTextAlign("right").run()
                    }
                    ariaLabel="Align Right"
                />
                <MyButton
                    icon={<AlignJustify />}
                    isActive={editor.isActive({ textAlign: "justify" })}
                    onClick={() =>
                        editor.chain().focus().setTextAlign("justify").run()
                    }
                    ariaLabel="Justify"
                />
            </div>

            <div className="flex gap-2" aria-label="Editor structure">
                <MyButton
                    icon={<Heading1Icon />}
                    isActive={editor.isActive("heading", { level: 1 })}
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 1 }).run()
                    }
                    ariaLabel="Heading 1"
                />
                <MyButton
                    icon={<Heading2Icon />}
                    isActive={editor.isActive("heading", { level: 2 })}
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 2 }).run()
                    }
                    ariaLabel="Heading 2"
                />
                <MyButton
                    icon={<Heading3Icon />}
                    isActive={editor.isActive("heading", { level: 3 })}
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 3 }).run()
                    }
                    ariaLabel="Heading 3"
                />
                <MyButton
                    icon={<Heading4Icon />}
                    isActive={editor.isActive("heading", { level: 4 })}
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 4 }).run()
                    }
                    ariaLabel="Heading 4"
                />
                <MyButton
                    icon={<Heading5Icon />}
                    isActive={editor.isActive("heading", { level: 5 })}
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 5 }).run()
                    }
                    ariaLabel="Heading 5"
                />
                <MyButton
                    icon={<Heading6Icon />}
                    isActive={editor.isActive("heading", { level: 6 })}
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 6 }).run()
                    }
                    ariaLabel="Heading 6"
                />
            </div>

            <div className="flex gap-2" aria-label="Lists and blocks">
                <MyButton
                    icon={<ListOrdered />}
                    isActive={editor.isActive("bulletList")}
                    onClick={() =>
                        editor.chain().focus().toggleBulletList().run()
                    }
                    ariaLabel="Bullet List"
                />
                <MyButton
                    icon={<ListCollapseIcon />}
                    isActive={editor.isActive("orderedList")}
                    onClick={() =>
                        editor.chain().focus().toggleOrderedList().run()
                    }
                    ariaLabel="Ordered List"
                />
                <MyButton
                    icon={<FileCode2Icon />}
                    isActive={editor.isActive("codeBlock")}
                    onClick={() =>
                        editor.chain().focus().toggleCodeBlock().run()
                    }
                    ariaLabel="Code Block"
                />
                <MyButton
                    icon={<BlockOutlined />}
                    isActive={editor.isActive("blockquote")}
                    onClick={() =>
                        editor.chain().focus().toggleBlockquote().run()
                    }
                    ariaLabel="Blockquote"
                />
            </div>

            <div className="flex gap-2" aria-label="Special formatting">
                <MyButton
                    icon={<HorizontalRule />}
                    onClick={() =>
                        editor.chain().focus().setHorizontalRule().run()
                    }
                    ariaLabel="Horizontal Rule"
                />
                <MyButton
                    icon={<HardHatIcon />}
                    onClick={() => editor.chain().focus().setHardBreak().run()}
                    ariaLabel="Hard Break"
                />
                <input
                    type="color"
                    onChange={(event) =>
                        editor
                            .chain()
                            .focus()
                            .setColor(event.target.value)
                            .run()
                    }
                    value={editor.getAttributes("textStyle").color || ""}
                    data-testid="setColor"
                    style={{ width: "2rem", height: "2rem" }}
                />
                <button
                    onClick={() =>
                        editor.chain().focus().setColor("#958DF1").run()
                    }
                    className={
                        editor.isActive("textStyle", { color: "#958DF1" })
                            ? "is-active"
                            : ""
                    }
                    data-testid="setPurple"
                ></button>
                <MyButton
                    onClick={() => editor.chain().focus().unsetAllMarks().run()}
                    ariaLabel="Clear Marks"
                >
                    Clear Marks
                </MyButton>
                <MyButton
                    onClick={() => editor.chain().focus().clearNodes().run()}
                    ariaLabel="Clear Nodes"
                >
                    Clear Nodes
                </MyButton>
                <MyButton
                    icon={<UndoIcon />}
                    onClick={() => {
                        console.log(
                            "Can Undo:",
                            editor.can().chain().focus().undo().run()
                        );
                        editor.chain().focus().undo().run();
                    }}
                    // disabled={!editor.can().chain().focus().undo().run()}
                    ariaLabel="Undo"
                />
                <MyButton
                    icon={<RedoIcon />}
                    onClick={() => {
                        console.log(
                            "Can Undo:",
                            editor.can().chain().focus().redo().run()
                        );
                        editor.chain().focus().redo().run();
                    }}
                    // disabled={!editor.can().chain().focus().redo().run()}
                    ariaLabel="Redo"
                />
            </div>
        </div>
    );
};
