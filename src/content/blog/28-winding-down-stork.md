---
title: "Winding Down my Work with Stork"
date: 2023-06-18
slug: winding-down-stork
blurb: "I'll be stopping Stork development and support for the foreseeable future."
---

Hi, friends. I'm no longer able to work on Stork to the degree the project and its users deserve, and because of this, I will be stopping my Stork development and support for the foreseeable future.

I've shut down any mechanism through which people can give me money for working on Stork (i.e. Ko-Fi and the "buy a sticker" page), I've archived many auxiliary repositories related to the project, and I'll be closing the Discord server by the end of the month.

Stork has been intertwined with my life for the past four years, and I'm simultaneously happy with all I've been able to build and design, and bummed that I was not and am not able to give it the features, community, and development pace it deserved. I'm extremely grateful to everyone who has used Stork. This project has introduced me to many interesting people around the world, and I'm thankful for all of you that I've gotten to know.

Thank you for supporting me and for using Stork, and I hope to see you around in the future.

## FAQs

**What should I use for client-side search?**

Oh boy, there are a ton of great options. **[Tinysearch](https://github.com/tinysearch/tinysearch)** and **[PageFind](https://pagefind.app/)** are, philosophically, the most similar alternatives to Stork. **[Lunr](http://lunrjs.com/)**, **[Fuse.js](http://fusejs.io/)**, and **[Minisearch](https://github.com/lucaong/minisearch)** are similar, but are Javascript-only (no WASM). **[Meilisearch](http://meilisearch.com/)**, **[EdgeSearch](https://github.com/wilsonzlin/edgesearch)**, and **[Tantivy](https://github.com/quickwit-oss/tantivy)** are all server-hosted search engines written in Rust. I haven't tried any of them for any significant amount of time, but they all seem like useful projects.

**Will the Stork files continue to be hosted from [files.stork-search.net](http://files.stork-search.net/)?**

Yes, I plan on keeping the Stork CDN up for at least four years, starting today. I currently have no reason or incentive to take the files down, and my AWS bill is <$1/mo, so my plan is not necessarily to shut down the CDN after four years, but instead to reevaluate the decision and see if it makes sense to continue hosting the files or if instead, I should make plans to shut down the CDN.

Regardless of what happens, I'll give users six months of notice here on Github Discussions before shutting down the CDN.

**Will the documentation remain available?**

Yes, the content currently available on [https://stork-search.net](https://stork-search.net/) will be available for as long as the Stork CDN files are up, if not longer.

**Will security vulnerabilities be patched?**

Reported security vulnerabilities will be investigated on a case-by-case basis, and I can't make any guarantees about my ability to fix or publish security patches.

**Is Stork completely abandoned? Can I still submit pull requests?**

My current thinking is that I'm not going to do any more development or support for the foreseeable future, but that doesn't mean that I'm dropping off the face of the earth. If folks are interested in contributing, I'll review, merge, and release human-authored pull requests with similar discretion that I do today (in other words, I probably won't merge pull requests that significantly diverge from the philosophy of the project). I'm also happy to chat about the project with people who are hoping to contribute.

**Will someone else take over Stork?**

Today, I don't plan on transferring maintainership of Stork to anyone else or adding anyone else as a maintainer, but should someone express a willingness and ability to take over the project, I'll consider it.

**What about forks?**

Please take what you can from the Stork source code! I'll publish all my work-in-progress 2.0.0 branches so people can poke around, and if I have the time and energy, I'll extract some of the more interesting bits into their own repositories to give them a bit more spotlight. You are welcome to fork the Stork source code and start your own project, community, etc. - I'll be cheering you along from the sidelines if you do!

Please don't co-opt the Stork branding (logo, color, imagery, etc) in your fork, and, until your fork significantly diverges, please mention that it's a fork of Stork.

**Is this open-source burnout?**

Probably, a little bit. Aside from the day job, this is the largest project I've ever been a part of, and the only one that I've done completely by myself. Stork has a binary component and a web library, there's a documentation site, a UI theming system, a rich feature set for parsing different kinds of documents from different sources, a home-grown algorithm for writing a search index to disk, and a complex system for loading those search indexes from the web UI. I've learned a lot about how to manage the scope of a solo-run open source web library, especially one that can only take up a few hours of each week.

For as long as I can remember I've had more ideas than I have had time, and it's been tiring to continuously gauge the priority those ideas against stewarding the project well.

**What's next for James?**

There's no big coding project waiting in the wings that I'm going to drop. I have a day job and a wedding to plan, and while those things will probably take up most of my focus in the near future, I'm keeping some time open to tinker and explore. I love programming and designing and building, so regardless of what form it takes, I'm confident there will be all of that in my future.

**AMA**

I tried to think of everything I'd want to know about, but if you have any more questions about this post, about Stork, or about anything else, please drop them in [the Github discussion's comments](https://github.com/jameslittle230/stork/discussions/360), reach out on Mastodon (@jil@mastodon.social), or send me an email.

Thank you for everything,  
James
