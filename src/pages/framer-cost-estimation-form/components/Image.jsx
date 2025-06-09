// src/pages/framer-cost-estimation-form/components/Image.jsx
import React from 'react';

const Image = ({ src, alt = "Image Name", style, ...props }) => {
  return (
    <img
      src={src}
      alt={alt}
      style={style}
      onError={(e) => {
        // Fallback to a placeholder if image fails to load
        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjBGOEZGIi8+CjxyZWN0IHg9IjUwIiB5PSI1MCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIHJ4PSI0IiBmaWxsPSIjRTVFN0VCIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTA4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNkI3MjgwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4K';
      }}
      {...props}
    />
  );
};

export default Image;