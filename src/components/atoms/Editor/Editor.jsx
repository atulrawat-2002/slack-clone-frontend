import 'quill/dist/quill.snow.css'; // ES6

import { ImageIcon } from 'lucide-react';
import Quill from 'quill';
import { useEffect, useRef, useState } from 'react';
import { PiTextAa } from 'react-icons/pi';
import { IoSend } from "react-icons/io5";

import { Button } from '@/components/ui/button';
import { Hint } from '../Hint/Hint';

export const Editor = ({
    variant = 'create',
    onSubmit,
    onCancel,
    placeholder,
    disabled,
    defaultValue
}) => {

    const [isToolbarVisible, setIsToolbarVisible] = useState(false);

    const containerRef = useRef();
    const defaultValueRef = useRef();
    const quillRef = useRef();

    function toggleToolbar() {
        setIsToolbarVisible(!isToolbarVisible);
        const toolbar = containerRef.current.querySelector('.ql-toolbar');
        if (toolbar) {
            toolbar.classList.toggle('hidden');
        }
    }

    useEffect(() => {

        if (!containerRef.current) return;

        const container = containerRef.current;

        const editorContainer = container.appendChild(
            container.ownerDocument.createElement('div')
        );

        const options = {
            theme: 'snow',
            modules: {
                toolbar: [
                    ['bold', 'italic', 'underline', 'strike'],
                    ['link'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    ['clean']
                ],
                keyboard: {
                    bindings: {
                        enter: {
                            key: 'Enter',
                            handler: () => {
                                return;
                            }
                        },
                        shift_enter: {
                            key: 'Enter',
                            shiftKey: true,
                            handler: () => {
                                quill.insertText(
                                    quill.getSelection()?.index || 0,
                                    '\n'
                                );
                            }
                        }
                    }
                }
            }
        };

        const quill = new Quill(editorContainer, options);

        quillRef.current = quill;
        quillRef.current.focus();

        quill.setContents(defaultValueRef.current);

    }, []);

    return (
        <div className='flex flex-col'>
            <div className='flex flex-col border border-slate-300 rounded-md overflow-hidden focus-within:shadow-sm focus-within:border-slate-400 bg-white '>
                
                <div className='h-full ql-custom' ref={containerRef} />

                <div className='flex w-full px-2 pb-2 z-[5]'>

                <div className="flex gap-1 flex-1" >
                    <Hint
                        label={!isToolbarVisible ? 'Show toolbar' : 'Hide toolbar'}
                        side='bottom'
                        align='center'
                    >
                        <Button
                            size="iconSm"
                            variant="ghost"
                            disabled={false}
                            onClick={toggleToolbar}
                        >
                            <PiTextAa className='size-4' />
                        </Button>
                    </Hint>

                    <Hint label="Image">
                        <Button
                            size="iconSm"
                            variant="ghost"
                            disabled={false}
                            onClick={() => {}}
                        >
                            <ImageIcon className='size-4' />
                        </Button>
                    </Hint>

                </div>


                    <Hint label="Send Message" >
                        <Button 
                            className="ml-auto bg-[#007a6a] hover:bg-[#007a6a]/80 text-white"
                            onClick={() => {
                                const messageContent = JSON.stringify(quillRef?.current.getContents())
                                onSubmit({body: messageContent});
                                quillRef.current?.setText('');
                            }}
                            disabled={false}
                        >
                            <IoSend />
                        </Button>
                    </Hint>

                </div>
            </div>
        </div>
    );
};