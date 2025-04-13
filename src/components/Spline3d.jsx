import Spline from '@splinetool/react-spline';

export default function Spline3d({ isLoader }) {
    return (
        <>
            {isLoader &&
                <div className='h-screen w-screen fixed top-0 left-0 z-50  opacity-80'>

                    <Spline scene="https://prod.spline.design/PAzfK2n0Vnjx0bHE/scene.splinecode" />
                </div>}
            {/* Animated background gradient */}
            <div className="fixed top-0 left-0 inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20">
                {/*  */}
                <div className={`absolute inset-0 opacity-30 transition-opacity duration-1000 `}>
                    {/* Animated particles/dots */}
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full bg-blue-400"
                            style={{
                                width: Math.random() * 6 + 2 + 'px',
                                height: Math.random() * 6 + 2 + 'px',
                                top: Math.random() * 100 + '%',
                                left: Math.random() * 100 + '%',
                                opacity: Math.random() * 0.5 + 0.2,
                                animation: `float ${Math.random() * 15 + 10}s linear infinite`
                            }}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
