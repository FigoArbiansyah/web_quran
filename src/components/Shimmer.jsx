import React from 'react';

const Shimmer = ({ width, height, className }) => {
	return (
		<div style={{ width: width + 'px', height: height + 'px' }} className={`w-${width ?? 20}as h-${height ?? 10}as animate-pulse ${className}`}>
			<div className="w-full h-full bg-slate-200 rounded"></div>
		</div>
	)
}

export default React.memo(Shimmer)