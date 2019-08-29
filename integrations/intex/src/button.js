const { withUiHook } = require('@zeit/integration-utils')

module.exports = withUiHook(async ({ payload, zeitClient }) => {
  // Get metadata
  const metadata = await zeitClient.getMetadata()
  metadata.count = metadata.count || 0
  metadata.count += 1

  // Set metadata
  await zeitClient.setMetadata(metadata)

  return `
    <Page>
    <P>Counter: ${metadata.count}</P>
      <Button>Count Me</Button>
    </Page>
  `
})