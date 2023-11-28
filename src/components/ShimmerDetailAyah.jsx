import React from 'react';
import Shimmer from './Shimmer';

const ShimmerDetailAyah = () => (
  <div className="px-7 pt-6" style={{ overflow: 'hidden' }}>
    <div className="text-center">
      <Shimmer width="70" height="20" className="mx-auto" />
      <Shimmer width="90" height="20" className="mt-1 mx-auto" />
      <div className="flex justify-around items-center">
        <Shimmer width="20" height="20" className="" />
        <p className="text-gray-500 text-base mt-2 mb-4" />
        <Shimmer width="20" height="20" className="" />
      </div>
      <hr />
      <Shimmer width="120" height="20" className="mt-2 mx-auto" />
    </div>
    <div className="mt-8">
      <div className="py-6 border-b flex-column gap-4 items-start justify-between">
        <div className="flex gap-3 items-center justify-between">
          <span className="flex justify-center items-center text-slate-500 text-sm w-10 h-10 radius border overflow-hidden">
            <Shimmer width="80" height="80" className="rounded-full overflow-hidden" />
          </span>
          <div className="flex gap-4">
            <Shimmer width="40" height="20" className="" />
          </div>
        </div>
        <div className="text-right">
          <Shimmer width="150" height="20" className="mt-1 ms-auto" />
          <Shimmer width="140" height="20" className="mt-1 ms-auto" />
          <Shimmer width="220" height="20" className="mt-1 ms-auto" />
          <Shimmer width="220" height="20" className="mt-1 ms-auto" />
        </div>
        <div className="text-left">
          <Shimmer width="50" height="20" className="mt-1 me-auto" />
          <Shimmer width="400" height="20" className="mt-1 me-auto" />
          <Shimmer width="400" height="20" className="mt-1 me-auto" />
          <Shimmer width="400" height="20" className="mt-1 me-auto" />
          <Shimmer width="400" height="20" className="mt-1 me-auto" />
        </div>
      </div>
    </div>
  </div>
);

export default React.memo(ShimmerDetailAyah);
