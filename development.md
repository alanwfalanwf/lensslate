# Development Notes

## License

Lens Slate is under the [GPLv3](COPYING.txt).

## Why is there no startup image?

Startup images are documented in Apple's [documentation for web apps on iOS](https://developer.apple.com/library/ios/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html#//apple_ref/doc/uid/TP40002051-CH3-SW6). This documentation is out of date as it only accounts for the original iPhone with a 320 × 480 screen resolution. Supporting newer iPhones with different screen resolutions [requires multiple images](https://gist.github.com/tfausak/2222823). Furthermore, startup images apparently [do not work in the iOS 9](https://forums.developer.apple.com/thread/23924).

On iOS at least, in the absence of a startup image, the app starts with a blank white screen, which is actually a quite good match to the app's other screens.

The app also starts quite quickly.

Given these considerations, I have decided that at this moment there is no need for a startup image. 

