import React from "react";

function OfflineStream() {
  return (
    <div className="bg-dark px-10 md:px-20 min-h-[34rem] w-full flex items-center justify-center">
      <div className="text-white text-center">
        <div>
          <div className="border-dark mx-auto h-14 w-14 animate-spin rounded-full border-4 border-t-medium mb-10" />
        </div>
        <p className="py-2">Connect streaming software to go live</p>
        <p className="py-2">
          Viewers will be able to find your stream once you go live on Dexa
        </p>
        <p className="py-2 text-primary font-semibold bg-white mt-4">
          DO YOU NEED HELP?
        </p>
      </div>
    </div>
  );
}

export default OfflineStream;
