---
title: "My Work Setup (Late 2024)"
slug: "2024-work-setup"
date: 2024-12-17
---


It's been three years since I wrote [my blog post that originally showed off my home office space](/blog/2021/2021-work-setup), and while things are mostly the same, there have been a few slight changes here and there, corresponding with the three years of tweaks and improvements I've been able to make since I originally published. Instead of issuing a string of corrections and updates within the original post, I'm writing a full update to describe where and how I work now, in the end of 2024.

{% figure layout="wide" %}
{% image src="https://img.jameslittle.me/blog/33-2024-work-setup/_JIL10132.jpg" /%}
{% /figure %}

## The Desk

I'm still using a 2' &times; 4' butcher block on top of Fully sit/stand legs. I don't stand much, but it's nice to have the option available. At some point, I took the feet off the Fully legs and replaced them with caster wheels, which has made it quite easy to slide out the desk to change my cable management. However, it also added about four inches to the minimum height of the desk, which is slightly too tall for me. I think the tradeoff was worth it, but I'm not completely confident that it was the right choice.

About a year ago, I took everything off the desk, went over the surface with an orbital sander, and restained it; it seems to have gotten rid of a lot of stains and gunk, so I'll try to do that every few years or so.

## Monitors & Computers

{% figure %}
{% image src="https://img.jameslittle.me/blog/33-2024-work-setup/_JIL10149.jpg" /%}
{% /figure %}

{% figure layout="half-right" %}
{% image src="https://img.jameslittle.me/blog/33-2024-work-setup/_JIL10141.jpg" /%}
{% /figure %}

I have a 14" M1 Macbook Pro for personal use and another one for work, both mounted in a vertical dual-laptop stand. I connect one of those laptops to the [CalDigit TS4](https://www.caldigit.com/thunderbolt-station-4/), which connects it to my two displays, my keyboard, my Logitech unifying reciever{%footnote %}I actually connected the Unifying Reciever to the Caldigit via an eight-inch-long USB cable. After suffering through years of an oddly flaky mouse connection, I learned that the Caldigit TS4 emits a bit of electromagnetic interference through its USB ports which could jumble up the Unifying Reciever radio signal. Adding a USB cable to move the reciever away from the Caldigit has completely solved this problem.{% /footnote %}, and my USB audio interface.

I stare at the same two monitors I did three years ago, the [LG 27UL500](https://www.lg.com/us/monitors/lg-27UL500-W-4k-uhd-led-monitor), a 27" 4K monitor that I keep at a 3008 &times; 1692 resolution, and a [Dell P2415Q](https://pcmonitors.info/reviews/dell-p2415q/), a 24" 4K monitor rotated vertically on the left that I keep in a 1440 &times; 2560 resolution.

In my previous post, I mentioned that I was only getting 30 frames per second on the Dell monitor, and that I had to also switch the input on the Dell monitor when I switched from one computer to another. After upgrading to the CalDigit TS4, I have an extra DisplayPort connector that I can connect directly to that Dell monitor, which means I can switch computers with a single cable, and I get a full 60 frames per second on the Dell monitor.

I never did end up getting the Apple Studio Display; it never seemed worth the price.

## Keyboard

{% figure caption="The left half of my split keyboard. The two halves are connected through a TRRS cable, effectively a headphone cable." %}
{% image src="https://img.jameslittle.me/blog/33-2024-work-setup/_JIL10135.jpg" /%}
{% /figure %}



I still love my Moonlander, but I've been working on a [Sofle Choc keyboard](https://brianlow.notion.site/Sofle-Choc-Build-Guide-c4bbbaece6e746f7a5956842af567e79) for the past few months. I love it. It's very flat and very subtle, it takes up much less space on my desk, it's quieter, and it's got lighter key switches in it so I can rip through typing without as much force. I'm at about 110 words per minute now, but my accuracy isn't quite where I'd like it yet.

{% figure layout="half-right" caption="The left half of the keyboard." %}
{% image src="https://img.jameslittle.me/blog/33-2024-work-setup/_JIL10139.jpg" /%}
{% /figure %}


Apparently [Oryx](https://configure.zsa.io/moonlander/layouts/default/latest/0/), the ZSA keyboard firmware configurator that you use to program ZSA keyboards like the Moonlander, is a UI built on top of [QMK](https://docs.qmk.fm), an open source mechanical keyboard firmware. Supposedly you can download the QMK code from any Oryx layout, but I had never tried that, so when I got the Sofle Choc, QMK was brand new to me.

{% figure layout="half-right" caption="The OLED display showing four data points." %}
{% image src="https://img.jameslittle.me/blog/33-2024-work-setup/_JIL10144.jpg" /%}
{% /figure %}

As I've worked more and more with this keyboard I've gotten more invested in building out a [layout that works well for me](https://github.com/jameslittle230/qmk/tree/jil/keyboards/sofle_choc/keymaps/jil). I use home row mods with three layers: a regular QWERTY layer, a layer that gives me access to arrow keys and brackets, and a numpad/macro layer.

I set up the knobs to switch the LED functions: the left knob controls the hue of the current LED pattern, and the right knob controls the currently active LED pattern. The OLED display shows the current layer, the hue and pattern for the LEDs, and my current typing speed.

I also have a sneaky Magic Keyboard taped to the underside of my desk, which lets me use Touch ID even though my laptop is closed up in its stand. It's been moderately useful, but isn't a game changer.

I'm still using the Logitech MX Vertical as my mouse; nothing has been able to dethrone it in the past few years. I hope Logitech never stops making it.

## Webcam

I'm still using the [Sony a6300](https://www.dpreview.com/products/sony/slrs/sony_a6300) as my webcam, which remains completely overkill but is absolutely great. I've switched the lens attached to it; the 50mm lens started getting flaky, so I've switched to a 24mm-200mm zoom lens. Otherwise, nothing has changed: it's attached to the same [KanexPro capture dongle](https://www.bhphotovideo.com/c/product/1609628-REG/kanexpro_con_gamecap_hdmi_4k_usb_2_0.html) and has a dummy battery that keeps it connected to power all the time. 

{% figure caption="These lights turn on when I'm having a Zoom call." %}
{% image src="https://img.jameslittle.me/blog/33-2024-work-setup/_JIL10151.jpg" /%}
{% /figure %}

I'm sure that using a mirrorless camera as a webcam is not particularly good for the camera, so I can't recommend it unless you want to burn out your equipment. In fact, I've tried using this camera for photography in the years since I started using it as a webcam, and it's pretty wrecked: the image is a little fuzzy no matter what I do to correct for it. It somehow still works fine as a webcam, though, so it's probably going to keep on working in semi-retirement until the sensor fully burns out somehow.

{% figure caption="This is what you see when you're on a video call with me." %}
{% image src="https://img.jameslittle.me/blog/33-2024-work-setup/selfie.jpg" /%}
{% /figure %}

I have a Nanlite Compac as my key light and a Philips Hue Go as a [practical](https://nofilmschool.com/practical-lighting). That Hue Go, which sits on a table behind me, is also the light that [changes color from a public HTTP API](/blog/2023/lights-api/). I have buttons on my Stream Deck that toggle on the key light and the Hue Go when I need to be in a meeting, but more recently I've been [running a little script on my computer](https://nathanfriend.com/2024/05/31/zoom-light.html) that will automatically switch those lights on when I'm in a Zoom meeting.

{% figure caption="The Philips Hue Go that illuminates me from behind when I'm on camera." %}
{% image src="https://img.jameslittle.me/blog/33-2024-work-setup/_JIL10152.jpg" /%}
{% /figure %}

## Audio

{% figure layout="half-right" caption="The Rode PodMic sporting the first-party pop filter. The heart sticker on my headphones reminds me which is the left earcup." %}
{% image src="https://img.jameslittle.me/blog/33-2024-work-setup/_JIL10140.jpg" /%}
{% /figure %}

I use the [Rode PodMic](https://www.rode.com/podmic) connected to the [Focusrite Scarlett Solo](https://focusrite.com/en/audio-interface/scarlett/scarlett-solo) via a [FetHead](https://www.tritonaudio.com/product/fethead/) to boost the gain, and I'd still recommend all three wholeheartedly. I've had some bad luck with XLR cables but a replacement always fixes whatever issue I'm having.

I've stopped using a separate headphone amp and started plugging my [Sennheiser HD 58X](https://drop.com/buy/massdrop-x-sennheiser-hd-58x-jubilee-headphones) headphones directly into the Focusrite's "direct monitor" port. I've also set the Focusrite as my computer's audio output, and the Focusrite will act as a headphone amp itself while also mixing my microphone audio into my headphone feed; this way, I'm hearing the audio from my computer and I can monitor my own microphone sounds, and I've also gotten rid of two boxes on my desk.

I still use a HomePod Mini for casual background music, but it's moved to the table behind me.

## Accessories

{% figure %}
{% image src="https://img.jameslittle.me/blog/33-2024-work-setup/_JIL10143.jpg" /%}
{% /figure %}

* A Belkin phone/Apple Watch/Airpods triple charger
* An Ember smart mug, to keep tea at a reasonable temperature for a long time
* An Elgato Stream Deck, which I use mostly to run Hammerspoon scripts to control my work computer
* A Time Timer
* An Aranet 4, so I can incessantly check whether I'm poisioning myself with my own CO2
* A bunch of chargers
* Two llama figurines: one made out of plastic and another one I 3D printed at my local library
* Some pens: currently enjoying a TWSBI Eco with Pilot Iroshizuku Shin-ryoku ink
* The Sidekick Notepad
* A Rhodia Dotpad No. 12

{% figure caption="My llama buddies." %}
{% image src="https://img.jameslittle.me/blog/33-2024-work-setup/_JIL10147.jpg" /%}
{% /figure %}
