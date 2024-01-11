import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'

function ToolsSection({ children, ...props }) {
  return (
    <Section {...props}>
      <ul role="list" className="space-y-16">
        {children}
      </ul>
    </Section>
  )
}

function Tool({ title, href, children }) {
  return (
    <Card as="li">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Description>{children}</Card.Description>
    </Card>
  )
}

export const metadata = {
  title: 'Tools',
  description: 'The Software and Gadgets I use.',
}

export default function Uses() {
  return (
    <SimpleLayout
      title="The Software and Gadgets I use."
      intro="Here is a list of software, tools and gadgets I love using to stay productive."
    >
      <div className="space-y-20">
        <ToolsSection title="Workstation">
          <Tool title="14” MacBook Pro, M2 Max, 32GB RAM">
          </Tool>
          <Tool title="Apple Magic Keyboard">
          </Tool>
          <Tool title="LG 38WN95C-W 38 Inch Monitor with Thunderbolt™ 3 Connectivity">
          </Tool>
          <Tool title="Elgato Facecam">
          </Tool>
        </ToolsSection>
        <ToolsSection title="Development tools">
          <Tool title="VS Code">
          </Tool>
          <Tool title="JetBrains Rider">
          </Tool>
          <Tool title="NeoVim with BetterVim">
          </Tool>
          <Tool title="iTerm2">
          </Tool>
        </ToolsSection>
        <ToolsSection title="Design">
          <Tool title="Figma">
          </Tool>
        </ToolsSection>
        <ToolsSection title="Productivity">
          <Tool title="Raycast">
          </Tool>
          <Tool title="Arc Browser">
          </Tool>
          <Tool title="Obsidian">
          </Tool>
          <Tool title="Apple Mail">
          </Tool>
          <Tool title="Apple Calendar">
          </Tool>
        </ToolsSection>
      </div>
    </SimpleLayout>
  )
}
