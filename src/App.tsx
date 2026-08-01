/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { BackgroundEffects } from './components/BackgroundEffects';
import { OpeningScreen } from './components/OpeningScreen';
import { ReasonsSection } from './components/ReasonsSection';
import { GallerySection } from './components/GallerySection';
import { TimelineSection } from './components/TimelineSection';
import { GameSection } from './components/GameSection';
import { NightSkySection } from './components/NightSkySection';
import { FutureSection } from './components/FutureSection';
import { FlowerSection } from './components/FlowerSection';
import { DigitalBouquetSection } from './components/DigitalBouquetSection';
import { LoveMeterSection } from './components/LoveMeterSection';
import { PinchHeartSection } from './components/PinchHeartSection';
import { KissCounterSection } from './components/KissCounterSection';
import { LoveLettersSection } from './components/LoveLettersSection';
import { PromiseCardsSection } from './components/PromiseCardsSection';
import { FinalSection } from './components/FinalSection';
import { AudioPlayer } from './components/AudioPlayer';
import { CutePlushie } from './components/CutePlushie';

export default function App() {
  const [isEntered, setIsEntered] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF8F5] via-[#FFD6E8]/30 to-[#C8A2FF]/20 text-gray-900 font-sans overflow-x-hidden selection:bg-pink-200 selection:text-pink-900">
      <BackgroundEffects isEntered={isEntered} />
      
      {!isEntered ? (
        <OpeningScreen onEnter={() => setIsEntered(true)} />
      ) : (
        <main className="relative z-10 w-full overflow-hidden">
          <AudioPlayer />
          <CutePlushie />
          <ReasonsSection />
          <GallerySection />
          <TimelineSection />
          <GameSection />
          <NightSkySection />
          <FutureSection />
          <FlowerSection />
          <DigitalBouquetSection />
          <LoveMeterSection />
          <PinchHeartSection />
          <KissCounterSection />
          <LoveLettersSection />
          <PromiseCardsSection />
          <FinalSection />
        </main>
      )}
    </div>
  );
}
