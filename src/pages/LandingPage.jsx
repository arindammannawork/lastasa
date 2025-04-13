import React, { useEffect, useRef, useState } from 'react'
import { Search, Mic, Image, MapPin } from 'lucide-react';
import Navbar from '../components/Navbar'
import Spline3d from '../components/Spline3d'
import AudioRecorderWithWaveformfrom, { AudioPlayer, AudioRecoderStartButton, AudioRecoderWraper, AudioWaveViewer } from '../components/AudioRecorderWithWaveform'
import AudioRecorderWithWaveform from '../components/AudioRecorderWithWaveform'
import { cros_svg, img_svg, mic_svg, send_svg } from '../assets/svgs'
import ProductCard from '../components/ProductCard'
import Footer from '../components/Footer'
import AnimatedHeroHeader from '../components/AnimatedHeroHeader'
import ProductList from '../components/ProductList';

function LandingPage() {
    const [searchComponentFocus, setSearchComponentFocus] = useState(false);
    const [result, setResult] = useState([])
    const [formdata, setFormdata] = useState({
        text: "",
        image: null
    })
    const [loaded, setLoaded] = useState(false);
    const [highlightIndex, setHighlightIndex] = useState(0);
    const [isLoader, setIsLoader] = useState(false)
    const searchMethods = [
        { text: "voice", icon: <Mic className="h-5 w-5" /> },
        { text: "images", icon: <Image className="h-5 w-5" /> },
        { text: "prompts", icon: <Search className="h-5 w-5" /> },
        { text: "location", icon: <MapPin className="h-5 w-5" /> }
    ];

    useEffect(() => {
        setLoaded(true);

        const interval = setInterval(() => {
            setHighlightIndex((prev) => (prev + 1) % searchMethods.length);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    const [preview, setPreview] = useState(null);
    const [error, setError] = useState('');
    const fileInputRef = useRef(null);
    const dragCounter = useRef(0); // This keeps track of how many dragEnter/Leave calls happen


    const handleDragEnter = (e) => {
        e.preventDefault();
        dragCounter.current++;
        setSearchComponentFocus(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        dragCounter.current--;
        if (dragCounter.current === 0) {
            setSearchComponentFocus(false);
        }
    };

    const handleFile = (file) => {
        if (!file.type.startsWith('image/')) {
            setError('Only image files are allowed');
            return;
        }

        setError('');
        setFormdata(prev => ({
            ...prev,
            image: file
        }))
        const imageUrl = URL.createObjectURL(file);
        setPreview(imageUrl);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) handleFile(file);
    };

    const handleDragOver = (e) => e.preventDefault();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) handleFile(file);
    };






    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData_send = new FormData();

        formData_send.append("text", formdata.text);
        if (formdata.image) {

            formData_send.append("image", formdata.image);
        }
        console.log("fdsfsdf", formData_send);
        const audioSrc = document.querySelector("#audiotagId").src;
        console.log(audioSrc);


        try {
            setIsLoader(true)
            if (audioSrc) {

                const response = await fetch(audioSrc);
                const audioBlob = await response?.blob();
                formData_send.append("voice", audioBlob);
            }
            const res = await fetch("https://collie-one-verbally.ngrok-free.app/search", {
                method: "POST",
                headers: {
                    // "Content-Type": "multipart/form-data",
                },
                body: formData_send,
                // body: JSON.stringify(formData),
            });
            // console.log(response);

            const result = await res.json();
            setResult(prev => (result?.products))
            console.log("API response:", result);
            // Show results to user or update UI
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setIsLoader(false)
        }
    };
    return (
        <>
            <Spline3d isLoader={isLoader} />
            <div className='flex flex-col '>
                <Navbar />
                <div className=' h-full grow   flex flex-col justify-center items-center '>

                    <div className="container  h-full flex flex-col  pt-24  relative z-10 ">

                        <div className="relative text-white  w-full ">


                            {/* Content */}
                            <div className="container px-4 py-20 relative z-10">
                                <form action="" onSubmit={handleSubmit}>
                                    <AnimatedHeroHeader loaded={loaded} highlightIndex={highlightIndex} searchMethods={searchMethods} />

                                    {/* Search bar animation */}

                                    <div className={`transition-all mt-12 w-full duration-1000 delay-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>

                                        <AudioRecoderWraper>

                                            <div onDragOver={handleDragOver}
                                                // onDragLeave={handleDragLeave}
                                                onDragEnter={handleDragEnter}
                                                onDragLeave={handleDragLeave}
                                                onDrop={handleDrop}
                                                className={`searchComponentWraper h-fit shrink-0  bg-gray-800/70 backdrop-blur-md border border-gray-700  overflow-hidden transition-all flex flex-col rounded-2xl   w-3/5 p-4 relative min-h-32 ${searchComponentFocus ? "border border-white" : ""}`}
                                            >
                                                <AudioWaveViewer />



                                                {preview && (
                                                    <> <div className="top w-full flex justify-start pb-2 border-b border-white/20 mb-2">
                                                        <div className='relative '>
                                                            <button className='h-4 w-4 rounded-full flex items-center justify-center shrink-0 absolute z-10 top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-red-600 hover:bg-red-400 transition-all  cursor-pointer' onClick={() => {
                                                                fileInputRef.current.value = '';
                                                                setPreview(null)
                                                                setFormdata(prev => ({
                                                                    ...prev,
                                                                    image: null
                                                                }))
                                                            }}>
                                                                {cros_svg}
                                                            </button>

                                                            <img
                                                                src={preview}
                                                                alt="Uploaded preview"
                                                                className=" rounded-md object-contain max-h-10 "
                                                            />
                                                        </div>
                                                    </div>
                                                    </>
                                                )}

                                                <textarea onChange={(e) => {
                                                    setFormdata(prev => ({
                                                        ...prev,
                                                        text: e.target.value
                                                    }))
                                                }} value={formdata.text} placeholder='Search anything using text, voice, or image — in any language!' name="prompt" id="" className='w-full text-white text-xl focus:border-0 focus-visible:border-0 grow min-h-10 focus-visible:outline-0' onFocus={() => setSearchComponentFocus(true)}
                                                    onBlur={() => setSearchComponentFocus(false)} />
                                                <div className=' flex items-center gap-2'>

                                                    {/* <AudioRecorderWithWaveform /> */}
                                                    <div className=''>
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            ref={fileInputRef}
                                                            onChange={handleFileChange}
                                                            className="hidden"
                                                            name='image'
                                                        />

                                                        <button type='button' onClick={() => fileInputRef.current.click()} className="flex items-center gap-2 px-2 py-2 text-white border border-white/20 rounded-full hover:bg-white/10 transition cursor-pointer">
                                                            {img_svg}
                                                        </button>
                                                    </div>
                                                    <AudioRecoderStartButton />
                                                    <div className='grow mr-8 ml-4'>
                                                        <AudioPlayer />
                                                    </div>
                                                    <div>
                                                        <button type='submit' className="flex items-center gap-2 px-2 py-2 text-white border border-white/20 rounded-full hover:bg-white/10 transition cursor-pointer">
                                                            {send_svg}
                                                        </button>
                                                    </div>
                                                </div>

                                            </div>
                                        </AudioRecoderWraper>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=' flex flex-col justify-center items-center  w-full'>


                    <ProductList result={result} />
                </div>

                <Footer />
            </div>
        </>
    )
}

export default LandingPage