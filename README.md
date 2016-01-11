# Static Site Boilerplate

## Customising the site

- Add your meta info to `package.json`!
- Add your meta info to `_config.yml`
- (optional) Add individual authors to `app/_data/authors.yml`
- Give some content to `404.md`, `index.html`, etc.
- Disallowed content gets added to `app/_data/disallow.xml`
- Scripts are concatenated by grunt, `concat` around line 70 in `Gruntfile.js`
- (optional) Setup travis S3 deploy with `travis setup s3` on the CLI

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

### Deploy:

Deploy to S3 using travis by running `travis setup s3` on the command line
