    import 'quill/dist/quill.snow.css'; // ES6

    import { ImageIcon, XIcon } from 'lucide-react';
    import Quill from 'quill';
    import { useEffect, useRef, useState } from 'react';
    import { PiTextAa } from 'react-icons/pi';
    import { IoSend } from "react-icons/io5";

    import { Button } from '@/components/ui/button';
    import { useSocket } from '@/hooks/context/useSocket';
    import { useAuth } from '@/hooks/context/useAuth';
    import { useCurrentWorkspace } from '@/hooks/context/useCurrentWorkspace';
    import { Hint } from '../hint/Hint';
    import { useDmSocket } from '@/hooks/context/useDmSocket';
    import { useParams } from 'react-router-dom';

    export const Editor = ({
        variant = 'create',
        onSubmit,
        onCancel,
        placeholder,
        disabled,
        defaultValue,
        dm
    }) => {

        const [isToolbarVisible, setIsToolbarVisible] = useState(false);
        const [image, setImage] = useState(null)

        const { socket, currentChannel } = useSocket(); 
        const { dmSocket, conversationIdref } = useDmSocket()
        const {auth} = useAuth();
        const { currentWorkspace } = useCurrentWorkspace();
        const { userId: recieverId } = useParams();

        const containerRef = useRef();
        const defaultValueRef = useRef();
        const quillRef = useRef();
        const imageInputref = useRef(null);
        const handleSubmitRef = useRef(null);
        const handleDmSubmitRef = useRef(null);
        const imageRef = useRef(null);

        imageRef.current = image;
        handleSubmitRef.current = handleSubmit;
        handleDmSubmitRef.current = hadleDmSubmit;

        function toggleToolbar() {
            setIsToolbarVisible(!isToolbarVisible);
            const toolbar = containerRef.current.querySelector('.ql-toolbar');
            if (toolbar) {
                toolbar.classList.toggle('hidden'); 
            }
        }

        function handleSubmit({body, image} ) {
            console.log("current channel", currentChannel);
            if(!image) {
                socket?.emit('newMessage', {
                    channelId: currentChannel,
                    body,
                    senderId: auth?.user?._id,
                    workSpaceId: currentWorkspace?._id
                    }, (data) => {
                        console.log('Message sent', data);
                        setImage(null)
                        imageInputref.current.value = '';
                    })
                    return;
            } else {
                console.log("with image ", image);
                const fileReader = new FileReader();
                fileReader.readAsDataURL(image);
                fileReader.onload = () => {
                if(fileReader.readyState === fileReader.DONE) {
                    socket.emit('newMessage', {
                        channelId: currentChannel,
                        body,
                        image: fileReader.result,
                        senderId: auth?.user?._id,
                        workSpaceId: currentWorkspace?._id
                    }, (data) => {
                        console.log('Message sent', data);
                        setImage(null)
                        imageInputref.current.value = '';
                    })
                }
            }
            return;
            } 
        }

        function hadleDmSubmit({ body, image }) {
        const id = conversationIdref.current;
        if (!id) {
            console.log('❌ conversation not ready');
            return;
        }

        if (!image) {
            dmSocket?.emit('sendDm', {
                conversationId: id,
                senderId: auth?.user?._id,
                recieverId,
                body
            }, (data) => {
                setImage(null);
                imageInputref.current.value = '';
            });
        } else {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(image);
            fileReader.onload = () => {
                if (fileReader.readyState === fileReader.DONE) {
                    // ✅ was using `socket` — now correctly uses `dmSocket`
                    // ✅ was using bare `conversationId` — now uses `id` from ref
                    dmSocket.emit('sendDm', {
                        conversationId: id,
                        senderId: auth?.user?._id,
                        body,
                        recieverId,
                        image: fileReader.result,
                    }, (data) => {
                        setImage(null);
                        imageInputref.current.value = '';
                    });
                }
            };
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
                                    if (dm) {
                                        const dmContent = JSON.stringify(quillRef?.current.getContents());
                                        handleDmSubmitRef.current({ body: dmContent, image: imageRef.current });
                                        quillRef.current?.setText('')
                                    } else {
                                        const messageContent = JSON.stringify(quillRef?.current.getContents())
                                        handleSubmitRef.current({body: messageContent, image: imageRef.current});
                                        quillRef.current?.setText('');
                                    }
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

            return function() {
                quillRef.current = null;
                containerRef.current ? (containerRef.current.innerHTML = '') : null;
            }

        }, []);

        return (
            <div className='flex flex-col '>
                <div 
                style={{ boxShadow: '2px 0px 20px 7px #ada6a6' }}
                className='flex flex-col shadow-[2px_0px_20px_7px_#ada6a6] border border-slate-300 rounded-md overflow-hidden focus-within:shadow-md focus-within:border-slate-400 bg-white '>
                    
                    <div className='h-full ql-custom' ref={containerRef} />

                    {
                        image && (
                            <div className="p-2 ">
                                
                                <div className="relative size-[60px] items-center justify-center group/image">
                                    <button className='hidden group-hover/image:flex rounded-full bg-black/70 hover:bg-black absolute -top-2.5 -right-2.5 text-white size-6 z-50 border-2 border-white items-center justify-center' 
                                    onClick={() => {
                                        setImage(null)
                                        imageInputref.current.value = '';
                                    }}
                                    >
                                        <XIcon className='size-4 ' />
                                    </button>
                                    <img src={URL.createObjectURL(image)} alt="" 
                                        className='rounded-xl overflow-hidden border object-cover'
                                    />
                                </div>

                            </div>
                        )
                    }
                    

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
                                onClick={() => { imageInputref.current.click() }}
                            >
                                <ImageIcon className='size-4' />
                            </Button>
                        </Hint>

                        <input 
                            ref={imageInputref}
                            className='hidden'
                            type="file" 
                            onChange={e => setImage(e.target.files[0])}
                        />

                    </div>


                        <Hint label="Send Message" >
                            <Button 
                                className="ml-auto bg-[#007a6a] hover:bg-[#007a6a]/80 text-white"
                                onClick={() => {
                                    if (dm) {
                                        const dmContent = JSON.stringify(quillRef?.current.getContents());
                                        hadleDmSubmit({ body: dmContent, image: image });
                                        quillRef.current?.setText('')
                                    } else {
                                        const messageContent = JSON.stringify(quillRef?.current.getContents())
                                        handleSubmit({body: messageContent, image: image});
                                        quillRef.current?.setText('');
                                    }
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