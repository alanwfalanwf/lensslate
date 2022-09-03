# Lens Slate: FAQ

_2016 November 27_

[Lens Slate](index.html) is a free photography app for iOS and Android to help you keep track of the configuration of manual lenses as you shoot.

<hr/>

* <a href="#how-install">How do I install Lens Slate?</a>
* <a href="#how-update">How do I update Lens Slate?</a>
* <a href="#how-use">How do I use Lens Slate? </a>
* <a href="#how-delete">How do I delete Lens Slate?</a>
* <a href="#how-support">How can I get support for Lens Slate?</a>
* <a href="#why-called">Why is it called Lens Slate?</a>
* <a href="#is-free">Is Lens Slate free?</a>
* <a href="#why-install">Why doesn't Lens Slate install from the App Store?</a>  
* <a href="#why-android-firefox">Why doesn't Lens Slate work on Firefox on Android?</a>
* <a href="#how-idea">How did you come up with the idea for Lens Slate?</a>
* <a href="#why-not-write-exif">Why can't Lens Slate write the lens configuration into the EXIF metadata of my images?</a>
* <a href="#can-film">Can I use Lens Slate with film cameras?</a>
* <a href="#screenshot-button">Why doesn't Lens Slate have a button to take a screenshot?</a>

<hr/>

<a name="how-install"></a>

## How do I install Lens Slate?

Open [the app web page](app.html) in 
  
  * Safari on your iOS device or
  * Chrome on your Android device
  
and follow the instructions.
  
<hr/>
  
<a name="how-update"></a>

## How do I update Lens Slate?

  Lens Slate will be automatically updated to the latest version when you
open it and the network is available.
 
<hr/>

<a name="how-use"></a>

## How do I use Lens Slate?

  Follow the instruction in the [manual](manual.html).
 
<hr/>

<a name="how-delete"></a>

## How do I delete Lens Slate?

  You can delete Lens Slate from your device exactly as you would any other app. 
  
* On iOS, touch and hold the app icon on your Home screen until the icons jiggle and then tap the x to delete the app. Then press the Home button.

* On Android, either:

  * Open the Settings app. Tap Apps or Application manager. Tap Lens Slate. Tap Uninstall.
  * Long press on the app icon on the Home screen and then drag to "Remove" or "Uninstall".
  
<hr/>

<a name="how-support"></a>

## How can I get support for Lens Slate?

  You can send email to [lensslate@alanwf.com](mailto:lensslate@alanwf.com).
  
<hr/>

<a name="why-called"></a>

## Why is it called Lens Slate?

  It's a reference to the [chalkboard slates](https://en.wikipedia.org/wiki/Clapperboard) used in movie-making to show information about the scene being shot.
  
<hr/>

<a name="is-free"></a>

## Is Lens Slate free?

  Yes, Lens Slate is [free software](manual.html#license) licensed under the GPL.

<hr/>

<a name="why-install"></a>

## Why doesn't Lens Slate install from the App Store?

  The App Store is for native apps; Lens Slate is a [web app](https://en.wikipedia.org/wiki/Web_application) rather than a native app. You install web apps by simply saving a web page to your home screen. However, despite being a web app, Lens Slate runs locally and does not require a network connection.
  
<hr/>

<a name="why-android-firefox"></a>

## Why doesn't Lens Slate work with Firefox on Android?

  I don't know. I'm working on this, but I'm not very familiar with Android and in particular don't have an Android device for testing, so progress is slow.

<hr/>

<a name="how-idea"></a>

## How did you come up with the idea for Lens Slate?

  I tried a couple of different ways to record the configuration of my manual lenses (recording a short video clip and taking a photo of my fingers showing the aperture in stops), but they seemed very awkward. 
  
  I came up with the idea of writing the configuration on index cards and taking a photo. That quickly evolved into setting the configuration on a local web page on my iPhone and taking a photo. Then I realized I didn't need to take the photo with my camera; I could just take a screenshot.

<hr/>

<a name="why-not-write-exif"></a>

## Why can't Lens Slate write the lens configuration into the EXIF metadata of my images?

Here’s how I think Lens Slate should work:

* While shooting, you set the configuration and it is automatically recorded to a data base on your device.

* After shooting, you transfer the images from your camera to your computer. You also have Lens Slate transfer the data base from your device to your computer (perhaps via DropBox or Google Drive). 

* You then run a program on your computer that reads the data base and automatically writes the lens configuration to the EXIF metadata in your images.

That would be great; no more messing about with screenshots. This is how geo-tagging apps typically work.

The first part -- writing the data base on your device -- is easy. The rest of it -- transferring the data base to your computer and then writing the EXIF metadata to your images -- is much more work. At the moment, I don't have time take it on.

<hr/>

<a name="can-film"></a>

## Can I use Lens Slate with film cameras?

  Yes, but since film images don't typically have time stamps, you'll have to figure out a means to associate the lens configuration screenshots and the images. This might be as simple as making sure you take one (and only one) screenshot for each image or writing the exposure number in the notes area.
  
  You might also like to write the camera body and the film type in the notes area.
  
<hr/>

<a name="screenshot-button"></a>

## Why doesn't Lens Slate have a button to take a screenshot?

To take a screenshot and save it in the camera role on your device:

* On iOS devices with Touch ID, you press the side and home buttons simultaneously.
* On iOS devices with Face ID, you press the side and volume up buttons simultaneously.
* On Android devices, you press and hold the volume down and power buttons simultaneously.

I agree that these can be awkward and it could be more convenient if Lens Slate had a button to take a screenshot.

It is possible for a web app to generate a screenshot, but a web app can't save it to the camera roll. So, any solution along these lines would require either converting Lens Slate to a native app (to have access to the camera roll) or require server-side help (to save the images on a server). I don't have the time or resources to pursue these possibilities.

  
<hr/>

© 2016, 2018 [Alan WF](https://alanwf.org/)
