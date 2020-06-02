import { withUiHook, htm } from '@zeit/integration-utils';

const UrlItem = ({ href }: { href: string }) => htm`
	<LI><Link href=${href} target="_blank">${href}</Link></LI>
`

module.exports = withUiHook(async ({ payload, zeitClient }) => {
  const { projectId } = payload;
  let apiUrl = `/v4/now/deployments?limit=50`;
  if (projectId) {
    apiUrl += `&projectId=${projectId}`
  }

  const { deployments }: ApiDeployments = await zeitClient.fetchAndThrow(apiUrl, { method: 'GET' });
  const urls = deployments.map(d => `https://${d.url}`);

  console.log(deployments);

  return htm`
		<Page>
			<H1>Recent deployments on this ${projectId ? 'project' : 'account'}</H1>
			<UL>
				${urls.map(u => htm`<${UrlItem} href=${u} //>`)}
			</UL>
		</Page>
	`
});
