import { withUiHook, htm } from '@zeit/integration-utils';
import { htmlx, renderNode } from './utils/htmlx';

const withColumnDemo = (node: HtmNode) => {
  return htm`
  <${node.type} ...${node.props}>${node.children}</>
  <Code>${renderNode(node)}</Code>
`;
};

const withRowDemo = (node: HtmNode) => {
  return htm`
  <${node.type} ...${node.props}>${node.children}</>
  <BR/>
  <Code>${renderNode(node)}</Code>
`;
};

const BUTTONS = htm`
<H1>Buttons</H1>
<Fieldset>
  <FsContent>
    <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom="10px">
    ${withColumnDemo(htmlx`<Button>Button</Button>`)}
    </Box>
    <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom="10px">
      ${withColumnDemo(htmlx`<Button small>Button small</Button>`)}
    </Box>
    <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom="10px">
      ${withColumnDemo(htmlx`<Button disabled>Button disabled</Button>`)}
    </Box>
    <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom="10px">
      ${withColumnDemo(htmlx`<Button width=100>Button 100</Button>`)}
    </Box>
    <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom="10px">
      ${withColumnDemo(htmlx`<Button width=200>Button 200</Button>`)}
    </Box>
    <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom="10px">
      ${withColumnDemo(htmlx`<Button type="success">Success</Button>`)}
    </Box>
    <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom="10px">
      ${withColumnDemo(htmlx`<Button type="secondary">Secondary</Button>`)}
    </Box>
    <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom="10px">
      ${withColumnDemo(htmlx`<Button type=error>Error</Button>`)}
    </Box>
    <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom="10px">
      ${withColumnDemo(htmlx`<Button type=warning>Warning</Button>`)}
    </Box>
    <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom="10px">
      ${withColumnDemo(htmlx`<Button type=ghost>Ghost</Button>`)}
    </Box>
  </FsContent>
  <FsFooter>
    <P>
      <Link href="https://zeit.co/docs/integrations/#component-catalog/action-components">Documentation</>
    </P>
  </FsFooter>
</Fieldset>
`;

const PROJECT_SWITCHER = htm`
<H1>Project Switcher</H1>
<Fieldset>
  <FsContent>
    <Box display="flex" alignItems="center" flexDirection="column">
      ${withRowDemo(htmlx`<ProjectSwitcher message="Choose a project from the list" />`)}
    </Box>
  </FsContent>
  <FsFooter>
    <P>
      <Link href="https://zeit.co/docs/integrations/#component-catalog/action-components/projectswitcher">Documentation</>
    </P>
  </FsFooter>
</Fieldset>
`;

const LINKS = htm`
<H1>Links</H1>
<Fieldset>
  <FsContent>
    <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom="10px">
      ${withColumnDemo(htmlx`<Link href="https://zeit.co">Visit ZEIT</Link>`)}
    </Box>
    <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom="10px">
      ${withColumnDemo(htmlx`<Link action="doSomething">Do Something</Link>`)}
    </Box>
  </FsContent>
  <FsFooter>
    <P>
      <Link href="https://zeit.co/docs/integrations/#component-catalog/action-components/link">Documentation</>
    </P>
  </FsFooter>
</Fieldset>
`;

const SELECT = htm`
<H1>Links</H1>
<Fieldset>
  <FsContent>
    <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom="10px">
      ${withColumnDemo(htmlx`
        <Select name="dbName" value="selectedValue" action="change-db">
          <Option value="mongodb" caption="MongoDB" />
          <Option value="redis" caption="Redis" />
      </Select>
      `)}
    </Box>
  </FsContent>
  <FsFooter>
    <P>
      <Link href="https://zeit.co/docs/integrations/#component-catalog/action-components/link">Documentation</>
    </P>
  </FsFooter>
</Fieldset>
`;

module.exports = withUiHook(async => {
  return htm`
    <Page>
      ${BUTTONS}
      ${PROJECT_SWITCHER}
      ${LINKS}
      ${SELECT}
		</Page>
	`
});
