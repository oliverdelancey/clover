import React, { useState, useRef, useEffect } from "react";

import { EditorView } from 'codemirror';
import { EditorState, Compartment } from '@codemirror/state';
//import { highlightSelectionMatches } from '@codemirror/search';
import { foldGutter, indentOnInput, indentUnit, bracketMatching, foldKeymap, syntaxHighlighting, defaultHighlightStyle } from '@codemirror/language';
import { lineNumbers, highlightActiveLineGutter, highlightSpecialChars, drawSelection, dropCursor, rectangularSelection, crosshairCursor, highlightActiveLine, keymap } from '@codemirror/view';
import { indentWithTab, history, defaultKeymap, historyKeymap } from '@codemirror/commands';
import { javascriptLanguage } from "@codemirror/lang-javascript";
import { closeBrackets, autocompletion, closeBracketsKeymap, completionKeymap } from '@codemirror/autocomplete';

import { oneDark } from "@codemirror/theme-one-dark";

const CodeEditor: React.FC = () => {
    const [code, setCode] = useState<string>("console.log('hello world!');");

    const editor = useRef<any>();
    const valueRef = useRef<string>(code);

    useEffect(() => {
        valueRef.current = code;
    }, [code]);

    useEffect(() => {
        const onUpdate = EditorView.updateListener.of((v) => {
            setCode(v.state.doc.toString());
        });

        const extensions = [
                lineNumbers(),
                highlightActiveLineGutter(),
                highlightSpecialChars(),
                history(),
                foldGutter(),
                drawSelection(),
                indentUnit.of("  "),
                indentOnInput(),
                bracketMatching(),
                closeBrackets(),
                autocompletion(),
                rectangularSelection(),
                //crosshairCursor,
                highlightActiveLine(),
                //highlightSele

                keymap.of([
                    indentWithTab,
                    ...closeBracketsKeymap,
                    ...defaultKeymap,
                    ...historyKeymap,
                    ...foldKeymap,
                    ...completionKeymap,
                ]),
                onUpdate,
                syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
                javascriptLanguage,
                oneDark
            ];

        const startstate = EditorState.create({
            doc: valueRef.current,
            extensions
        })

        const view = new EditorView({
            state: startstate,
            parent: editor.current,
        });

        return () => {
            view.destroy();
        };
    }, []);

    return <div className="CodeEditor" ref={editor} />;
}

export default CodeEditor;