import { withUiHook, htm } from '@zeit/integration-utils';
import htmldom from 'htmldom';
import { htmlx, renderNode } from './_utils/htmlx';

const h = (node: HtmNode[] | HtmNode | string): string | string[] => {
  // Pure string
  if (typeof node === "string") {
    return node;
  }

  // HtmNode[]
  if (Array.isArray(node)) {
    return node
      .map((n: HtmNode): any => h(n));
  }

  const content = Array.isArray(node.children)
    ? node.children.map((child: HtmNode) => h(child))
    : node.children;

  const result = htm`
    <${node.type} ...${node.props}>
      ${content}
    </>`;

  return result;
}

const withColumnDemo = (node: HtmNode) => {
  return htm`
    ${h(node)}
    <Code>${renderNode(node)}</Code>
`;
};

const withHrDemo = (node: HtmNode) => {
  return htm`
    <P>${h(node)}</P>
    <Code>${renderNode(node)}</Code>
`;
};

const withRowDemo = (node: HtmNode) => {
  return htm`
    ${h(node)}
    <BR/>
    <Code>${renderNode(node)}</Code>
`;
};

const withFormattedRowDemo = (node: HtmNode) => {
  return htm`
    ${h(node)}
    <BR/>
    <Code>${htmldom(renderNode(node)).beautify().trim()}</Code>
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
      ${withColumnDemo(htmlx`<Button width=100px>100px</Button>`)}
    </Box>
    <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom="10px">
      ${withColumnDemo(htmlx`<Button width=250px>250px</Button>`)}
    </Box>
    <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom="10px">
      ${withColumnDemo(htmlx`<Button small width=150px>150px</Button>`)}
    </Box>
    <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom="10px">
      ${withColumnDemo(htmlx`<Button success>Success</Button>`)}
    </Box>
    <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom="10px">
      ${withColumnDemo(htmlx`<Button secondary>Secondary</Button>`)}
    </Box>
    <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom="10px">
      ${withColumnDemo(htmlx`<Button warning>Warning</Button>`)}
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

const INPUTS_INPUT = htm`
<H1>Inputs</H1>
<Fieldset>
  <FsContent>
    <Box display="flex" alignItems="center" flexDirection="column">
      ${withRowDemo(htmlx`<Input name="dbName" />`)}
    </Box>
    <HR/>
    <Box display="flex" alignItems="center" flexDirection="column">
      ${withRowDemo(htmlx`<Input name="dbName" label="Name for the Database" />`)}
    </Box>
    <HR/>
    <Box display="flex" alignItems="center" flexDirection="column">
      ${withRowDemo(htmlx`<Input name="dbName" value="postgres" />`)}
    </Box>
    <HR/>
    <Box display="flex" alignItems="center" flexDirection="column">
      ${withRowDemo(htmlx`<Input disabled />`)}
    </Box>
    <HR/>
    <Box display="flex" alignItems="center" flexDirection="column">
      ${withRowDemo(htmlx`<Input errored />`)}
    </Box>
  </FsContent>
  <FsFooter>
    <P>
      <Link href="https://zeit.co/docs/integrations#component-catalog/input-components">Documentation</>
    </P>
  </FsFooter>
</Fieldset>
`;

const INPUTS_TEXTAREA = htm`
<H1>Inputs</H1>
<Fieldset>
  <FsContent>
    <Box display="flex" alignItems="center" flexDirection="column">
      ${withFormattedRowDemo(htmlx`
      <Textarea name="description" label="Enter your description"></Textarea>
      `)}
    </Box>
    <HR/>
    <Box display="flex" alignItems="center" flexDirection="column">
      ${withFormattedRowDemo(htmlx`
      <Textarea name="description">
        The value
      </Textarea>
      `)}
    </Box>
    <HR/>
    <Box display="flex" alignItems="center" flexDirection="column">
      ${withFormattedRowDemo(htmlx`
      <Textarea name="description" width="400px" height="200px">
        The value
      </Textarea>
      `)}
    </Box>
    <HR/>
    <Box display="flex" alignItems="center" flexDirection="column">
      ${withFormattedRowDemo(htmlx`<Textarea disabled></Textarea>`)}
    </Box>
    <HR/>
    <Box display="flex" alignItems="center" flexDirection="column">
      ${withFormattedRowDemo(htmlx`<Textarea errored></Textarea>`)}
    </Box>
  </FsContent>
  <FsFooter>
    <P>
      <Link href="https://zeit.co/docs/integrations#component-catalog/input-components">Documentation</>
    </P>
  </FsFooter>
</Fieldset>
`;

const INPUTS_SELECT = htm`
<H1>Selects</H1>
<Fieldset>
  <FsContent>
    <Box display="flex" alignItems="center" flexDirection="column">
      ${withFormattedRowDemo(htmlx`
        <Select name="dbName" value="selectedValue">
          <Option value="mongodb" caption="MongoDB"></Option>
          <Option value="redis" caption="Redis"></Option>
        </Select>
      `)}
    </Box>
    <HR/>
    <Box display="flex" alignItems="center" flexDirection="column">
      ${withFormattedRowDemo(htmlx`
        <Select name="dbName" value="selectedValue" action="change-db">
          <Option value="mongodb" caption="MongoDB"></Option>
          <Option value="redis" caption="Redis"></Option>
        </Select>
      `)}
    </Box>
  </FsContent>
  <FsFooter>
    <P>
      <Link href="https://zeit.co/docs/integrations#component-catalog/input-components/select">Documentation</>
    </P>
  </FsFooter>
</Fieldset>
`;

const INPUTS_CHECKBOX = htm`
<H1>Checkboxes</H1>
<Fieldset>
  <FsContent>
    <Box display="flex" alignItems="center" flexDirection="column">
      ${withRowDemo(htmlx`
        <Checkbox name="allowOptionA" label="Allow Option A"/>
      `)}
    </Box>
    <HR/>
    <Box display="flex" alignItems="center" flexDirection="column">
      ${withRowDemo(htmlx`
        <Checkbox name="allowOptionA" label="Allow Option A" checked="true"/>
      `)}
    </Box>
  </FsContent>
  <FsFooter>
    <P>
      <Link href="https://zeit.co/docs/integrations#component-catalog/input-components/checkbox">Documentation</>
    </P>
  </FsFooter>
</Fieldset>
`;

const INPUTS_RESET = htm`
<H1>Reset</H1>
<Fieldset>
  <FsContent>
    <Box display="flex" alignItems="center" flexDirection="column">
      ${withFormattedRowDemo(htmlx`
        <Input type="text" label="Username" name="username" />
        <Input type="text" label="Password" name="password" />
        <Input type="text" label="Age" name="age" />
        <ResetButton targets="username, password">Reset</ResetButton>
      `)}
    </Box>
  </FsContent>
  <FsFooter>
    <P>
      <Link href="https://zeit.co/docs/integrations#component-catalog/input-components/resetbutton">Documentation</>
    </P>
  </FsFooter>
</Fieldset>
`;

const UI = htm`
<H1>UI</H1>
<Fieldset>
  <FsContent>
    <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom="10px">
      ${withColumnDemo(htmlx`<P>A paragraph.</P>`)}
    </Box>
    <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom="10px">
      ${withColumnDemo(htmlx`<H1>Headline 1</H1>`)}
    </Box>
    <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom="10px">
      ${withColumnDemo(htmlx`<H2>Headline 2</H2>`)}
    </Box>
    <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom="10px">
      ${withHrDemo(htmlx`<HR/>`)}
    </Box>
    <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom="10px">
      ${withColumnDemo(htmlx`<B>Bold</B>`)}
    </Box>
    <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom="10px">
      ${withColumnDemo(htmlx`<Img width="128px" src="https://github.com/zeit.png"/>`)}
    </Box>
    <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom="10px">
      ${withColumnDemo(htmlx`<Notice type="message">This is an message.</Notice>`)}
    </Box>
    <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom="10px">
      ${withColumnDemo(htmlx`<Notice type="success">This is an success message.</Notice>`)}
    </Box>
    <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom="10px">
      ${withColumnDemo(htmlx`<Notice type="error">This is an error message.</Notice>`)}
    </Box>
    <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom="10px">
      ${withColumnDemo(htmlx`<Notice type="warn">This is an warning message.</Notice>`)}
    </Box>
  </FsContent>
  <FsFooter>
    <P>
      <Link href="https://zeit.co/docs/integrations#component-catalog/ui-components">Documentation</>
    </P>
  </FsFooter>
</Fieldset>
`;

export default withUiHook(async () => {
  return htm`
    <Page>
    ${BUTTONS}
      ${INPUTS_INPUT}
      ${INPUTS_TEXTAREA}
      ${INPUTS_SELECT}
      ${INPUTS_CHECKBOX}
      ${INPUTS_RESET}
      ${PROJECT_SWITCHER}
      ${LINKS}
      ${UI}
		</Page>
	`
});
