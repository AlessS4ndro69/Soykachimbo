import React from 'react';
import { View } from 'react-native';
import { BannerAd, BannerAdSize, TestIds, InterstitialAd, AdEventType, RewardedInterstitialAd, RewardedAdEventType } from 'react-native-google-mobile-ads';

import tw from 'twrnc';


const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-4929040887239501/6478277541';

const BannerAdGoogle = () => {


    return (
        <View style ={tw`items-center m-1`}>
                    <BannerAd 
                        unitId={adUnitId}
                        size={BannerAdSize.LARGE_BANNER}
                        requestOptions={{
                        requestNonPersonalizedAdsOnly: true
                        }}
                    />
                </View>
    );
};

export default BannerAdGoogle;