import React from 'react';
import PropTypes from 'prop-types';

const Shimmer = ({ width, height, className }) => (
  <div style={{ width: `${width}px`, height: `${height}px` }} className={`w-${width ?? 20}as h-${height ?? 10}as animate-pulse ${className}`}>
    <div className="w-full h-full bg-slate-200 rounded" />
  </div>
);

Shimmer.propTypes = {
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  className: PropTypes.string.isRequired,
};

export default React.memo(Shimmer);
