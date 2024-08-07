import React, {Suspense, lazy} from "react";
import PreviewComponent from "./PreviewComponent";


const Scene: React.FC = () => {
	return (
		<div>
			<PreviewComponent
				url="https://pub-0ec69c7d5c064de8b57f5d594f07bc02.r2.dev/blender_rims.stl"
				onExceedsLimit={() => false}
				onError={() => (<div>
          <p>There was an error loading the model</p>
        </div>)}
			/>

		</div>
	);
};

export default Scene;
