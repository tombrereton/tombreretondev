
import logoAnimaginary from '@/images/logos/animaginary.svg'
import logoCosmos from '@/images/logos/cosmos.svg'
import logoHelioStream from '@/images/logos/helio-stream.svg'
import logoOpenShuttle from '@/images/logos/open-shuttle.svg'
import logoPlanetaria from '@/images/logos/planetaria.svg'

export const getProjects = () => [
  {
    name: 'SoundSort',
    description: 'A website to build your perfect Spotify playlist.',
    link: { href: 'http://planetaria.tech', label: 'planetaria.tech' },
    logo: logoPlanetaria,
  },
  {
    name: 'Gem Island',
    description: 'A match three game like Candy Crush.',
    link: { href: '#', label: 'github.com' },
    logo: logoAnimaginary,
  },
  {
    name: 'Amelia Ames Landscape Architecture',
    description: 'A marketing website for a landscape architect.',
    link: { href: '#', label: 'github.com' },
    logo: logoHelioStream,
  }
]
