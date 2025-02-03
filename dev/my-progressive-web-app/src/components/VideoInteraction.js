import React from 'react';

const VideoInteraction = () => {
    return (
        <div className="video-interaction">
            <video width="100%" controls>
                <source src="/assets/videos/interaction.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default VideoInteraction;