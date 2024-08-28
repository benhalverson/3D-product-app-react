import React, { Suspense, lazy } from "react";

const PreviewComponent = lazy(() => import("./PreviewComponent"));

const Scene: React.FC = () => {
  return (
      <div className="flex justify-center items-center min-h-90">
        <div className="w-full max-w-lg mx-auto flex flex-col items-center">
          <h1 className="text-center text-2xl font-bold mb-4"></h1>

          <div className="border-4 border-white">
            <Suspense fallback={<div>Loading...</div>}>
              <PreviewComponent
                url="https://pub-0ec69c7d5c064de8b57f5d594f07bc02.r2.dev/Rear_Buggy_RC_RIM_BBS.stl"
                onExceedsLimit={() => false}
                onError={() => (<div>
                  <p>There was an error loading the model</p>
                </div>)}
              />
            </Suspense>
          </div>
        </div>
      </div>
  );
};

export default Scene;
