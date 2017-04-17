# Cornerstone

A static site boilerplate that gets out of your way.

## Customising the site

- Update meta info in `package.json`!
- Update meta info in `_config.yml`
- Add site URL to `_config.build.yml`
- Add at least one author to `app/_data/authors.yml`
- Give some content to `404.md`, `index.html`, etc.
- Sitemap- and robots-restricted content gets added to `app/_data/disallow.yml`
- (optional) Setup travis deploys by adding Github token or running `travis setup s3` on the command line

### A word about posts & collections

There are a lot of ways you can organize a jekyll site, this is just one:

- All files that live at the root level of a site (i.e. robots.txt) are documents in the `_root` collection. By default, they do not have a layout, but you can easily add one in the [yaml front matter][00].
- Static pages that likely will not have child pages (About, Contact) are documents in the `_static` collection. Permalinks here are, by default `/filename/index.html` and layouts fall back to `default` unless set otherwise.
- The possibilities for collections are endless, you can [read the docs][01] or check out config.yml for more info.
- If you plan on using this site as a blog, the paginator is set up to read all post-style files and output them to /blog-posts/.

[00]: https://jekyllrb.com/docs/frontmatter/
[01]: https://jekyllrb.com/docs/collections/

## Setup

### Dependencies:

- Ruby—see `.ruby-version`
- Nodejs—see `package.json`
- Bundler

### Install:

```bash
npm install
```

### Configure deploys:

Cornerstone assumes you are going to use [Travis-CI][02] to deploy the compiled site. It's preconfigured to deploy to [Github Pages][04], on the assumption that this is a "project" (as opposed to user/org) Github pages site.

To complete setup, [generate a new token][05] on Github and add it to your repo's settings page at https://travis-ci.org/USERNAME/REPONAME/settings. Call it `$GITHUB_TOKEN` and make sure "Display value in build log" is set to "off".

If this is going to be a user or org Github pages site, you also need to change `target_branch: gh-pages` to read `target_branch: master` in .travis.yml.

With this setup, Travis will deploy each time you add commits to the `production` branch.

If you prefer to use [Amazon S3][03] for your compiled static site, Travis can help with that too. Make sure you have created your s3 bucket (named the same as your site url, i.e. example.com) and have your access key ID & secret access key on hand. Then run
 
```bash
travis setup s3 --force
```

This will replace the deploy section in your .travis.yml file. Follow the prompts to set Travis up to deploy to your bucket any time you push to the `production` branch. Specify `dist` as your local directory. Finally, add the line `  skip_cleanup: true` to the deploy object. That will make sure the dist directory is not deleted before travis attempts the deploy.

[02]: https://docs.travis-ci.com/user/deployment
[03]: https://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html
[04]: https://help.github.com/articles/user-organization-and-project-pages/
[05]: https://github.com/settings/tokens

## Running the local server

```bash
npm start
```

Then browse to <http://localhost:9084>. This port can be customised in the `connect` object within the [Gruntfile](Gruntfile.js).

## Test:

Currently runs a check on Jekyll, then ESLint and StyleLint.

```bash
npm test
```
