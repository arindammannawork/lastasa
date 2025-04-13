
import { useState, useRef, useEffect, createContext, useContext } from 'react';
import { cros_svg, mic_svg } from '../assets/svgs';

// function AudioRecorderWithWaveform() {
//     const { canvasRef, recording, setRecording } = useContext(AudioRecoderContextApi);

//     const [audioURL, setAudioURL] = useState('');

//     const audioContextRef = useRef(null);
//     const analyserRef = useRef(null);
//     const dataArrayRef = useRef(null);
//     const animationRef = useRef(null);
//     const sourceRef = useRef(null);
//     const mediaRecorderRef = useRef(null);
//     const audioChunksRef = useRef([]);
//     const timeDataRef = useRef([]);
//     const positionRef = useRef(0);
//     const frameCountRef = useRef(0);

//     const drawWaveform = () => {
//         const canvas = canvasRef.current;
//         const ctx = canvas.getContext('2d');
//         const WIDTH = canvas.width;
//         const HEIGHT = canvas.height;

//         // Get time domain data (amplitude)
//         analyserRef.current.getByteTimeDomainData(dataArrayRef.current);

//         // Slow down the animation - only update position every 3 frames
//         frameCountRef.current = (frameCountRef.current + 1) % 3;

//         // Add current data to our sliding window less frequently
//         if (frameCountRef.current === 0) {
//             // Calculate average value from multiple samples for smoother visualization
//             let sum = 0;
//             for (let i = 0; i < 10; i++) {
//                 sum += Math.abs(dataArrayRef.current[i] - 128);
//             }
//             const avgValue = sum / 10;

//             timeDataRef.current.push(avgValue);

//             // Keep only what we can display
//             if (timeDataRef.current.length > WIDTH) {
//                 timeDataRef.current.shift();
//             }

//             // Update the position for sliding effect
//             positionRef.current = (positionRef.current + 1) % 3;
//         }

//         // Clear canvas
//         ctx.fillStyle = '#131226'; // Black background
//         ctx.fillRect(0, 0, WIDTH, HEIGHT);

//         const centerY = HEIGHT / 2;
//         const barWidth = 1;
//         const gap = 2;
//         const step = barWidth + gap;

//         // Draw the waveform bars
//         ctx.fillStyle = '#ffffff'; // White bars

//         for (let i = 0; i < timeDataRef.current.length; i++) {
//             const x = WIDTH - (timeDataRef.current.length - i) * step + positionRef.current;
//             if (x < 0) continue;

//             // Normalize and amplify the amplitude - increased multiplier for more height
//             const amplitude = timeDataRef.current[i] / 128;
//             // Increase height scaling factor from 0.5 to 0.8 for more pronounced display
//             const amplifiedValue = Math.pow(amplitude, 0.7) * 1.5; // Use power function to emphasize differences
//             const barHeight = Math.max(2, amplifiedValue * HEIGHT * 0.8); // Larger scaling factor

//             // Center the bar vertically
//             const top = centerY - barHeight / 2;
//             ctx.fillRect(x, top, barWidth, barHeight);
//         }

//         animationRef.current = requestAnimationFrame(drawWaveform);
//     };

//     const startRecording = async () => {
//         try {
//             const stream = await navigator.mediaDevices.getUserMedia({
//                 audio: {
//                     echoCancellation: true,
//                     noiseSuppression: true,
//                     autoGainControl: false
//                 }
//             });

//             audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
//             sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);

//             analyserRef.current = audioContextRef.current.createAnalyser();
//             analyserRef.current.fftSize = 2048;
//             analyserRef.current.smoothingTimeConstant = 0.5; // Add some smoothing
//             const bufferLength = analyserRef.current.frequencyBinCount;
//             dataArrayRef.current = new Uint8Array(bufferLength);

//             sourceRef.current.connect(analyserRef.current);

//             // Reset the time data array
//             timeDataRef.current = [];
//             positionRef.current = 0;
//             frameCountRef.current = 0;

//             // Start visualization
//             drawWaveform();

//             const mediaRecorder = new MediaRecorder(stream);
//             mediaRecorderRef.current = mediaRecorder;
//             audioChunksRef.current = [];

//             mediaRecorder.ondataavailable = (event) => {
//                 if (event.data.size > 0) {
//                     audioChunksRef.current.push(event.data);
//                 }
//             };

//             mediaRecorder.onstop = () => {
//                 const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
//                 const url = URL.createObjectURL(audioBlob);
//                 setAudioURL(url);

//                 if (audioContextRef.current) {
//                     audioContextRef.current.close();
//                 }
//                 cancelAnimationFrame(animationRef.current);

//                 // Clear visualization when stopped
//                 const canvas = canvasRef.current;
//                 const ctx = canvas.getContext('2d');
//                 ctx.fillStyle = '#000000';
//                 ctx.fillRect(0, 0, canvas.width, canvas.height);
//             };

//             mediaRecorder.start();
//             setRecording(true);
//         } catch (error) {
//             console.error("Error accessing microphone:", error);
//             alert("Error accessing microphone: " + error.message);
//         }
//     };

//     const stopRecording = () => {
//         if (mediaRecorderRef.current && recording) {
//             mediaRecorderRef.current.stop();
//             setRecording(false);
//         }
//     };

//     // Clean up resources when component unmounts
//     useEffect(() => {
//         return () => {
//             if (animationRef.current) {
//                 cancelAnimationFrame(animationRef.current);
//             }
//             if (audioContextRef.current) {
//                 audioContextRef.current.close().catch(console.error);
//             }
//         };
//     }, []);

//     return (
//         <div style={{ maxWidth: '600px', margin: 'auto' }}>





//         </div>
//     );
// }
function AudioWaveViewer({ }) {
    const { canvasRef, recording } = useContext(AudioRecoderContextApi);
    return (<>

        <div className={`absolute w-full z-20 bg-gray-800 left-0 top-0 ${recording ? "" : "hidden"}`}>
            <canvas
                ref={canvasRef}
                width="600"
                height="40"
                className=' px-4 py-2 box-border '
                style={{
                    width: '100%',
                    // backgroundColor: '#000000',
                    // borderRadius: '8px'

                }}
            />
        </div>
    </>)
}

const AudioRecoderContextApi = createContext({})
function AudioRecoderWraper({ children }) {
    const canvasRef = useRef(null);
    const [recording, setRecording] = useState(false);
    const [audioURL, setAudioURL] = useState('');

    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const dataArrayRef = useRef(null);
    const animationRef = useRef(null);
    const sourceRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const timeDataRef = useRef([]);
    const positionRef = useRef(0);
    const frameCountRef = useRef(0);

    const drawWaveform = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const WIDTH = canvas.width;
        const HEIGHT = canvas.height;

        // Get time domain data (amplitude)
        analyserRef.current.getByteTimeDomainData(dataArrayRef.current);

        // Slow down the animation - only update position every 3 frames
        frameCountRef.current = (frameCountRef.current + 1) % 3;

        // Add current data to our sliding window less frequently
        if (frameCountRef.current === 0) {
            // Calculate average value from multiple samples for smoother visualization
            let sum = 0;
            for (let i = 0; i < 10; i++) {
                sum += Math.abs(dataArrayRef.current[i] - 128);
            }
            const avgValue = sum / 10;

            timeDataRef.current.push(avgValue);

            // Keep only what we can display
            if (timeDataRef.current.length > WIDTH) {
                timeDataRef.current.shift();
            }

            // Update the position for sliding effect
            positionRef.current = (positionRef.current + 1) % 3;
        }

        // Clear canvas
        ctx.fillStyle = '#000000'; // Black background
        ctx.fillRect(0, 0, WIDTH, HEIGHT);

        const centerY = HEIGHT / 2;
        const barWidth = 1;
        const gap = 2;
        const step = barWidth + gap;

        // Draw the waveform bars
        ctx.fillStyle = '#ffffff'; // White bars

        for (let i = 0; i < timeDataRef.current.length; i++) {
            const x = WIDTH - (timeDataRef.current.length - i) * step + positionRef.current;
            if (x < 0) continue;

            // Normalize and amplify the amplitude - increased multiplier for more height
            const amplitude = timeDataRef.current[i] / 128;
            // Increase height scaling factor from 0.5 to 0.8 for more pronounced display
            const amplifiedValue = Math.pow(amplitude, 0.7) * 1.5; // Use power function to emphasize differences
            const barHeight = Math.max(2, amplifiedValue * HEIGHT * 0.8); // Larger scaling factor

            // Center the bar vertically
            const top = centerY - barHeight / 2;
            ctx.fillRect(x, top, barWidth, barHeight);
        }

        animationRef.current = requestAnimationFrame(drawWaveform);
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: false
                }
            });

            audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
            sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);

            analyserRef.current = audioContextRef.current.createAnalyser();
            analyserRef.current.fftSize = 2048;
            analyserRef.current.smoothingTimeConstant = 0.5; // Add some smoothing
            const bufferLength = analyserRef.current.frequencyBinCount;
            dataArrayRef.current = new Uint8Array(bufferLength);

            sourceRef.current.connect(analyserRef.current);

            // Reset the time data array
            timeDataRef.current = [];
            positionRef.current = 0;
            frameCountRef.current = 0;

            // Start visualization
            drawWaveform();

            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                const url = URL.createObjectURL(audioBlob);
                setAudioURL(url);

                if (audioContextRef.current) {
                    audioContextRef.current.close();
                }
                cancelAnimationFrame(animationRef.current);

                // Clear visualization when stopped
                const canvas = canvasRef.current;
                const ctx = canvas.getContext('2d');
                ctx.fillStyle = '#000000';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            };

            mediaRecorder.start();
            setRecording(true);
        } catch (error) {
            console.error("Error accessing microphone:", error);
            alert("Error accessing microphone: " + error.message);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && recording) {
            mediaRecorderRef.current.stop();
            setRecording(false);
        }
    };

    // Clean up resources when component unmounts
    useEffect(() => {
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            if (audioContextRef.current) {
                audioContextRef.current.close().catch(console.error);
            }
        };
    }, []);
    return (<>
        <AudioRecoderContextApi.Provider value={{
            canvasRef, recording, setRecording, stopRecording, startRecording, audioURL, setAudioURL
        }}>
            {children}
        </AudioRecoderContextApi.Provider>

    </>)

}


function AudioRecoderStartButton(params) {
    const { recording, stopRecording, startRecording } = useContext(AudioRecoderContextApi);
    return (
        <>
            <button type='button' onClick={recording ? stopRecording : startRecording} className="flex items-center gap-2 px-2 py-2 text-white border border-white/20 rounded-full hover:bg-white/10 transition">
                {recording ? cros_svg : mic_svg}
            </button>
        </>
    )
}

function AudioPlayer() {
    const { audioURL, setAudioURL } = useContext(AudioRecoderContextApi);
    const getAudioDurationFromBlobURL = (blobUrl) => {
        return new Promise((resolve, reject) => {
            const audio = document.createElement('audio');
            audio.preload = 'metadata';
            audio.src = blobUrl;

            // Wait for metadata to load
            audio.onloadedmetadata = () => {
                if (isFinite(audio.duration)) {
                    resolve(audio.duration);
                } else {
                    // Fallback: force browser to seek to end
                    audio.currentTime = Number.MAX_SAFE_INTEGER;
                    audio.ontimeupdate = () => {
                        audio.ontimeupdate = null; // only run once
                        resolve(audio.duration);
                    };
                }
            };

            audio.onerror = () => {
                reject("Could not load audio metadata.");
            };
        });
    };


    // return (
    //     <>
    //         {audioURL && (
    //             <div className='bdr'>
    //                 <audio
    //                     controls
    //                     src={audioURL}
    //                     // style={{ width: '100%' }}
    //                     className='w-full bg-transparent'
    //                 />
    //             </div>
    //         )}
    //     </>
    // )



    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const audioRef = useRef(null);
    const progressBarRef = useRef(null);
    // console.log(currentTime);



    useEffect(() => {
        if (audioURL) {
            getAudioDurationFromBlobURL(audioURL).then((duration) => {
                console.log('Audio duration (seconds):', duration);
                setDuration(duration);
                // You can store it in state if needed
            }).catch((err) => {
                console.error(err);
            });
        }
    }, [audioURL]);
    useEffect(() => {
        const audio = audioRef.current;

        // Reset state when URL changes
        setIsLoaded(false);
        setDuration(0);
        setCurrentTime(0);
        setIsPlaying(false);

        // Set up event listeners
        const setAudioData = () => {
            if (audio.duration && !isNaN(audio.duration)) {
                // setDuration(audio.duration);
                setIsLoaded(true);
            }
        };

        const updateTime = () => {
            setCurrentTime(audio.currentTime);
        };

        // Add event listeners
        audio.addEventListener('loadedmetadata', setAudioData);
        audio.addEventListener('durationchange', setAudioData);
        audio.addEventListener('timeupdate', updateTime);
        audio.addEventListener('canplay', setAudioData);

        // Remove event listeners on cleanup
        return () => {
            audio.removeEventListener('loadedmetadata', setAudioData);
            audio.removeEventListener('durationchange', setAudioData);
            audio.removeEventListener('timeupdate', updateTime);
            audio.removeEventListener('canplay', setAudioData);
        };
    }, [audioURL]);

    // Toggle play/pause
    const togglePlay = () => {
        const audio = audioRef.current;
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play().catch(error => {
                console.error("Playback failed:", error);
            });
        }
        setIsPlaying(!isPlaying);
    };

    // Handle timeline clicks
    const handleProgressClick = (e) => {
        if (!isLoaded) return;

        const progressBar = progressBarRef.current;
        const rect = progressBar.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        const newTime = percent * duration;

        // Validate the time to prevent errors
        if (!isNaN(newTime) && isFinite(newTime) && newTime >= 0 && newTime <= duration) {
            audioRef.current.currentTime = newTime;
        }
    };

    // Format time in MM:SS
    const formatTime = (time) => {
        if (isNaN(time) || !isFinite(time)) return '00:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    // Handle audio ended
    const handleEnded = () => {
        setIsPlaying(false);
        setCurrentTime(0);
    };

    return (
        <div className={`w-full rounded-lg   shadow-lg ${audioURL ? "" : "hidden"}`}>
            {/* Hidden native audio element */}
            <audio
                id='audiotagId'
                ref={audioRef}
                src={audioURL == "" ? null : audioURL}
                className="hidden"
                onEnded={handleEnded}
                preload="metadata"

            />

            <div className="flex items-center space-x-4 relative">
                <button type='button' className='flex items-center justify-center gap-2 h-[42px] w-[42px] text-white/70 border shrink-0 border-white/20 rounded-full hover:bg-white/10 transition' onClick={() => {
                    setAudioURL(null)
                }}>
                    {cros_svg}
                </button>
                {/* Play/Pause Button */}
                <button type='button'
                    onClick={togglePlay}
                    disabled={!isLoaded}
                    className='flex items-center justify-center gap-2 h-[42px] w-[42px] text-white/70 border shrink-0 border-white/20 rounded-full hover:bg-white/10 transition'
                // className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-900 hover:bg-gray-200 focus:outline-none disabled:opacity-50"
                >
                    {isPlaying ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                            <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z" clipRule="evenodd" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 ml-1">
                            <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                        </svg>
                    )}
                </button>

                {/* Time display */}
                <div className="text-xs text-gray-400">
                    {formatTime(currentTime)}
                </div>

                {/* Progress bar */}
                <div
                    ref={progressBarRef}
                    className="relative h-2 flex-1 cursor-pointer rounded-full bg-gray-800"
                    onClick={handleProgressClick}
                >
                    {/* Track progress */}
                    <div className="absolute h-full bg-white transition-all duration-[250ms] w-[0%]"
                        // className={`absolute h-full rounded-full transition-all ${isLoaded ? 'bg-white' : 'bg-gray-600'}`}
                        style={{
                            width: isLoaded
                                ? `${(currentTime / duration) * 100}%`
                                : '0%'
                        }}
                    />
                </div>

                {/* Duration */}
                <div className="text-xs text-gray-400">
                    {isLoaded ? formatTime(duration) : '--:--'}
                </div>
            </div>
        </div >
    );
}
// export default AudioRecorderWithWaveform;
export default AudioRecoderWraper;
export { AudioWaveViewer, AudioRecoderWraper, AudioRecoderStartButton, AudioPlayer }