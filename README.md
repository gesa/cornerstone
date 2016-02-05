# Cornerstone

A static site boilerplate that gets out of your way.

## Customising the site

- Add your meta info to `package.json`!
- Add your meta info to `_config.yml`
- Add at least one author to `app/_data/authors.yml`
- Give some content to `404.md`, `index.html`, etc.
- Sitemap-/robots-restricted content gets added to `app/_data/disallow.yml`
- Scripts are concatenated by grunt, `concat` around line 79 in `Gruntfile.js`
- (optional) Setup travis S3 deploy with `travis setup s3` on the CLI

### A word about posts & collections

There are a lot of ways you can organize a jekyll site, this is just one:

- All files that live at the root level of a site (i.e. robots.txt) are documents in the `_root` collection. By default, they do not have a layout, but you can easily add one in the [yaml front matter][00].
- Static pages that likely will not have child pages (About, Resume, Contact) are documents in the `_static` collection. Permalinks here are, by default `/filename/index.html` and layout are `default` unless set otherwise.
- The possibilities for collections are endless, you can [read the docs][01] or check out config.yml for more info.

[00]: https://jekyllrb.com/docs/frontmatter/
[01]: https://jekyllrb.com/docs/collections/

## Running the server, building the site

### Dependencies:

- Ruby—see `.ruby-version`
- Nodejs—see `package.json`

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

If jsbeautifier throws an error, run `npm run-script beautify` to clean up your
js.

### Deploy:

Deploy to S3 using travis by running `travis setup s3` on the command line
