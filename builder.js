const esbuild = require('esbuild')
const developmentMode = process.env.NODE_ENV === 'development'

const buildConfig = {
  entryPoints: ['./src/index.css'],
  outfile: './dist/index.css',
  minify: !developmentMode,
  bundle: true
}

// Development server
if(developmentMode) {
  let buildContext
  esbuild.context(buildConfig)
    .then((_buildContext) => {

      buildContext = _buildContext

      return buildContext.watch()
    })
    .then(() => {
      console.log(`✅ Development is running. Listening ./src directory`)
    })
    .catch(() => {})
}

// Production build
else {
  console.log('⌛ Building....')

  esbuild.build(buildConfig).then((buildResults) => {

    if(buildResults.errors.length) {
      for(const error of buildResults.errors) {
        console.error(error)
      }
    }

    else if(buildResults.warnings.length) {
      for(const warning of buildResults.warnings) {
        console.warn(warning)
      }
    }

    else {
      console.log('✅ Project is successfully built')
    }
  })
}
