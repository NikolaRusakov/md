/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { useEffect, useRef } from 'react';
// @ts-ignore
import shaka from 'shaka-player/dist/shaka-player.ui.js';
import { mq } from '../utils/theme';

export interface VideoPlayerProps {
  src: string;
  panelElements: string[];
  poster?: string;
  autoPlay?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src = 'https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd',
  panelElements = ['mute', 'volume', 'time_and_duration', 'fullscreen', 'overflow_menu'],
  poster,
  autoPlay,
}) => {
  const videoComponent = useRef(null);
  const videoContainer = useRef(null);

  const onError = (error: Error & { code: number }) => console.error('Error code', error.code, 'object', error);

  const onErrorEvent = (event: Error & { detail: any }) => {
    onError(event.detail);
  };

  useEffect(() => {
    if (videoContainer.current != null && videoComponent.current != null) {
      const video = videoComponent.current;
      const container = videoContainer.current;
      const player = new shaka.Player(video);
      // Configures controls for video player
      const uiConfig = {
        controlPanelElements: panelElements,
      };

      const ui = new shaka.ui.Overlay(player, container, video);

      ui.configure(uiConfig);
      ui.getControls();

      player.addEventListener('error', onErrorEvent);

      player
        .load(src)
        .then(() => console.log('The video has now been loaded!'))
        .catch(onError);
    }
  }, [src]);
  return (
    <div
      className="video-container"
      css={mq({
        width: '100vw',
        height: ['50vh', 'calc(100vh - 48px)', 'calc(100vh - 48px)'],
      })}
      ref={videoContainer}>
      <video
        css={{ width: '100%' }}
        ref={videoComponent}
        poster={poster ?? '//shaka-player-demo.appspot.com/assets/poster.jpg'}
        autoPlay={autoPlay ?? false}
      />
    </div>
  );
};
export default VideoPlayer;
