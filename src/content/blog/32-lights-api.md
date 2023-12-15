---
title: "Festival of (API-controlled) Lights"
slug: "lights-api"
date: 2023-12-15
---

If you run the following command in your terminal, the light in my office will turn blue:

```sh
curl -X POST https://api.jameslittle.me/home/light -d "color=blue"
```

{% figure caption="A photo of the light in my office, being blue" %}
![A photo of a blue smart lamp](https://img.jameslittle.me/blog/32-lights-api/blue-light.jpg)
{% /figure %}

I have a smart lightbulb in my office that I'll use as a backlight to make myself pop on video calls. For a while, I've had some [iOS shortcuts](https://support.apple.com/guide/shortcuts/welcome/ios) that I run from my phone (or my computer) that I would run when I was starting or stopping a video call, to turn on and off that light, respectively.

I started using an app called [Pushcut](https://www.pushcut.io/) recently. It does a lot of different things, but the one feature I use is the _Automation Server_: in short, if you have a spare iOS device and you're willing to run the Pushcut app in the foreground constantly, Pushcut will start an HTTP server on your device and expose your shortcuts via a web API.

```txt
https://api.pushcut.io/[secret]/execute?shortcut=[shortcut-name]
```

`[secret]` is a generated authentication key that routes the API request to my iCloud account, and `[shortcut-name]` is the name of a Shortcut I've put together in the app.

You can see where this is going.

## Exposing a Public API

I've had that light for a few years now, and despite being capable of representing a full color spectrum, I only ever set it to "off" or "white". That seemed like a sad existence for the light, so I wanted to make it colorful sometimes.

Instead of deciding when it should be different colors myself, I decided to use Pushcut to set up a system where the internet could decide which color the light should be.

The naive solution is to publish the Pushcut URL for that shortcut somewhere, but I don't want my Pushcut secret to be publicly available -- it makes the API less pretty, and my Pushcut account can only accept so many requests per day. Instead, I decided to write a little proxy API.

I run a web service exposed at `api.jameslittle.me`. Nothing terribly critical happens on that service, it's mostly just fun to write and run something. I added a new endpoint at `/home/light` that proxies requests to my Pushcut API endpoint, with a few caviats to keep my Pushcut account from being slammed:

- There's a global rate limit so my office doesn't turn into a rave
- It validates the color you pass in (and requires that you pass in a color), rejecting requests that don't specify a valid color

From there, it's a matter of decoding the incoming form-encoded data and crafting the request to the Pushcut servers:

```rust
let response = reqwest::Client::new()
  .post(format!(
      "https://api.pushcut.io/{}/execute",
      std::env::var("PUSHCUT_KEY").unwrap()
  ))
  .query(&[
      ("shortcut", "Set Light Color"),
      ("input", &shortcut_input.to_string()),
  ])
  .send()
  .await
  .context("Failed to send request to Pushcut")?;
```

## Error Handling

There are lots of things that could fail in this system. Pushcut could reject the request if that service is down or if I've hit my request limit for the day. My spare iPhone-turned-web-server might be stuck in some weird state (which unfortunately seems to happen a few times a week). If Pushcut can't run the shortcut on my device, it will respond with a non-200 HTTP code.

I also have a kill switch in case you internet weirdos get too adventurous, and if the kill switch is activated, the shortcut will respond with a Dictionary with an error message:

{% figure layout="half-middle" caption="Early-returning a dictionary from a shortcut" %}
![A screenshot of the Shortcuts app on my iPhone](https://img.jameslittle.me/blog/32-lights-api/set-light-color.jpg)
{% /figure %}

If a shortcut responds with a dictionary, Pushcut will turn it into a JSON object and return it in the body of its HTTP request.

My API endpoint has logic to find errors from all those situations and return them in its own response. For an API that's as tempermental as this one (just look at how many things can go wrong!), the experience will only be delightful if folks can trust that when they see a successful response the light in my room has actually changed color, and when the response has an error it explains what went wrong.

## That API endpoint, once again

```sh
curl -X POST https://api.jameslittle.me/home/light -d "color=blue"
```

Blue isn't the only color that the endpoint accepts. There are six valid colors as I write this - can you find them all?

N.B.: The title is a Hanukkah thing.
