import React, { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import CKEditorVi from 'ckeditor5-custom-build/ckeditor5/buildck/ckeditor';
import './editor.css';

export default function ({ type = 'classic', placeholder = '', onTextChange, initContent }) {
    const [showTool, setShowTool] = useState(false);
    const [data, setdata] = useState('');
    const [isEditorReady, setIsEditorReady] = useState(false);
    const itemsClassic = [
        'heading',
        '|',
        'fontfamily',
        'fontsize',
        '|',
        'alignment',
        '|',
        'fontColor',
        'fontBackgroundColor',
        '|',
        'bold',
        'italic',
        'underline',
        '|',
        'numberedList',
        'bulletedList',
        '|',
        'link',
        'insertImage',
        'mediaEmbed',
        '|',
        'undo',
        'redo',
    ];
    const itemsInline = ['bold', 'italic', 'underline', '|', 'MathType', 'ChemType'];

    useEffect(() => {
        if (initContent && isEditorReady) {
            setdata(initContent);
        }
    }, [initContent, isEditorReady]);

    return (
        <div className={(type == 'inline' && !showTool ? 'hidden-toolbar' : '') + ` ${type}` + ' compose-editor'}>
            <CKEditor
                editor={CKEditorVi}
                key="ckeditor"
                config={{
                    placeholder: placeholder,
                    toolbar: {
                        items: type !== 'inline' ? itemsClassic : itemsInline,
                    },
                }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    onTextChange && onTextChange(data);
                }}
                data={data}
                onBlur={(event, editor) => {
                    type == 'inline' && setShowTool(false);
                }}
                onFocus={(event, editor) => {
                    type == 'inline' && setShowTool(true);
                }}
                onReady={(editor) => {
                    setIsEditorReady(true);
                }}
            />
        </div>
    );
}
