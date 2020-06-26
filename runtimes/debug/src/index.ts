const {
  createLambda,
  shouldServe,
} = require('@now/build-utils');
const FileFsRef = require('@now/build-utils/file-fs-ref.js');
const path = require('path');

exports.shouldServe = shouldServe;

exports.build = async ({ entrypoint }) => {
  const bridgeFiles = {
    'launcher.js': new FileFsRef({
      fsPath: path.join(__dirname, 'launcher.js'),
    }),
  }

  console.log('Bridge files:', Object.keys(bridgeFiles));
  console.log('Entrypoint:', entrypoint);

  const lambda = await createLambda({
    files: { ...bridgeFiles },
    handler: 'launcher.launcher',
    runtime: 'nodejs10.x',
    environment: {
      NOW_ENTRYPOINT: entrypoint,
      NOW_PURE_DEBUG: process.env.NOW_PURE_DEBUG,
    },
  });

  return { [entrypoint]: lambda };
};
