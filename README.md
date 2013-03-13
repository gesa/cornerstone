The DivEyes Jekyll Boilerplate
============

## So Here's the Thing
>[&ldquo;When your favorite tool is Jekyll, every site should be static.&rdquo;](https://twitter.com/gesa/statuses/301497940369879040/ "View this tweet on twitter")

### I love jekyll.
I've been using it a ton since December 2011 (thank you [Daniel Ryan](https://github.com/dryan/) for showing me the way) and using it has really made me think about how we, as a development community, may have a tendency to overengineer our output. Not every site needs a database. Not every site needs a full-featured CMS. Static is cheaper, easy to maintain, and no longer means disobeying DRY.
Given my total obsession with Jekyll, I've been using it in a lot of projects I'm tinkering on lately. Like most engineers, living and dying DRY, I generally start each project by copying my last project, and making some tweaks.

…Why the hell haven't I made myself an actual boilerplate for this yet?

So if this is helpful to you as well, dear reader, awesome. If you can make it better, bring on the pull requests. I'm particularly concerned with any changes I could make that would provide &/or improve a baseline of accessibility features.

### Structure
The config file, includes, and layouts are all built to be modular, adaptable, and reusable. Easy to use, basically.

#### Meta info
Most of the head markup will be written by having a solid config file. The only major assumption is that the following Apple touch icons are located in root directory:
- /touch-icon-iphone.png
- /touch-icon-ipad.png
- /touch-icon-iphone-retina.png
- /touch-icon-ipad-retina.png

#### Posts & Permalinks
Posts are set to render with a permalink based on their "category" variable in the YAML front matter. Theoretically, you'll want to create an index file for any category you plan on using. Hopefully I can think of a way to fix that in a future release.

#### Preprocessing and Minification
##### LESS files
- All LESS files are imported into [_style.less](css/_style.less); only [_style.less](css/_style.less) should be complied directly, to /css/style.css
- [_grid.less](css/_grid.less) is actually my [fluid-to-em grid](https://github.com/gesa/fuild-to-em-grid/ "Fluid-to-em Grid on GitHub"), which I created to try to be friendly to a wide variety of viewport sizes, while still giving a designer a touch more control for readability on wider viewports.
- [_mixins.less](css/_mixins.less), [_reset.less](css/_reset.less), and [_variables.less](css/_variables.less) are edited versions of their [Twitter Bootstrap](http://twitter.github.com/bootstrap/ "Twitter Bootstrap on GitHub") counterparts. I tend to discourage Twitter Bootstrap for production apps, but I never discount the value of some of the code buried within. I do encourage heavily editing [_mixins.less](css/_mixins.less) (by subtraction) and [_variables.less](css/_variables.less) (by addition) on a per-project basis.

##### JS files
- [_script.js](js/_script.js) should be minified, [global-scripts.html](_includes/global-scripts.html) is expecting it at /js/script.min.js
- [global-scripts.html](_includes/global-scripts.html) & [global-meta.html](_includes/global-meta.html) expect jQuery & Modernizr to live in /js/libs/; version/build can be specified in [_config.yml](_config.yml)
- if you're feeling like an HTTP request miser, as I oft am, prepend jQ to [_script.js](js/_script.js) before it's minified and remove lines 1-2 from global-scripts.html

## Major To-do's
- [ ] Accessibility review
- [ ] Automate category indicies
