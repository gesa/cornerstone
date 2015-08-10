# Static Site Boilerplate

## Running the server, building the site

### Dependencies:
- Ruby 2.1.0 (probably managed by [rbenv](https://github.com/sstephenson/rbenv)
or rvm)
- Node > 0.10.0
- [Bundler](http://bundler.io)

### Install:

```bash
npm install
```

### Run:

```bash
npm start
```

### Test:

("test" is a generous description of this function)

```bash
npm test
```

### Deploy:

Deploy to S3 using travis by running `travis setup s3` on the command line


## Customising the site

- Add your meta info to `package.json`!
- Add any disallowed content to `app/_data/sitemap.xml`
- Update your `404.md`
- Add all the  touch icons
- (optional) Setup travis S3 deploy with `travis setup s3` on the CLI
- Add any scripts you’re using to `concat` at L152 in `Gruntfile.js` 
- Pay special attention to `app/_includes/partials/meta.html`
    - `og:determiner`, if you need a “the” before your page title
    - `og:locale` if you’re not located in the US or GB
    - `twitter:site` is your twitter username, including `@`
    - Save logo file, then update the following with fully qualified url
        - `og:image` (don’t forget dimensions)
        - `twitter:image:src`
        - `itemprop="image"`
- Markup:
    - `app/_includes/partials/header.html`
    - `app/_includes/partials/footer.html`
- `app/_includes/partials/scripts.html` can probably be ignored, in favor of `grunt concat`
