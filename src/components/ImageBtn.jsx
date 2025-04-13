import React from 'react'

function ImageBtn() {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      onFileDrop(file);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileDrop(file);
    }
  };
  return (
    <>

      <div className=''>
        <input type="file" multiple="false" />
        <button className="flex items-center gap-2 px-2 py-2 text-white border border-white/20 rounded-full hover:bg-white/10 transition cursor-pointer">
          {img_svg}
        </button>
      </div>
    </>
  )
}

export default ImageBtn