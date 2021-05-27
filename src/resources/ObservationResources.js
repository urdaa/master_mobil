import {Vibration} from "@ionic-native/vibration";

export const updateSheepCount = (swiper, sheep, setSheep) => {
    if (!swiper) {
        return;
    }
    let modifier = _getSheepModifier(swiper);
    if (modifier !== 0) {
        _preventSwipeBelowZero(swiper, sheep, modifier);
        setSheep(sheep + modifier);
        if (modifier === 1) {
            Vibration.vibrate([100, 50, 100])
            /*await NativeAudio.play("bleet_high")
            setTimeout(async() => {
                await NativeAudio.play("bleet_high");
            },150);*/
        } else {
            Vibration.vibrate(100);
            /*await NativeAudio.play("bleet_high");*/
        }
    }
}

const _getSheepModifier = (swiper) => {
    //If swipeUp (+)
    if (swiper.touches.diff < 0) {
        return 1;
    }//swipeDown (-)
    else if (swiper.touches.diff > 0){
        return -1;
    }//Fixes count being -1 from start, as when slides loads the active one 'changes'
    else {
        return 0;
    }
}

const _preventSwipeBelowZero = (swiper, oldSheepCount, modifier) => {
    if(oldSheepCount === 1 && modifier === -1) {
        swiper.allowSlidePrev = false;
    } else if(oldSheepCount === 0 && modifier === 1) {
        swiper.allowSlidePrev = true;
    }
}
