import React from "react";

const BlockComponent = (props) => {
  return (
    <div>
      <div className="py-4 px-8 w-80 rounded-2xl text-slate-100 bg-slate-800 border-[1px] border-gray-500/50 mb-2">
        {props.children}
      </div>
    </div>
  );
};

export default BlockComponent;
