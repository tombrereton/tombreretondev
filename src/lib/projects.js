
import logoAnimaginary from '@/images/logos/animaginary.svg'
import logoCosmos from '@/images/logos/cosmos.svg'
import logoHelioStream from '@/images/logos/helio-stream.svg'
import logoOpenShuttle from '@/images/logos/open-shuttle.svg'
import logoPlanetaria from '@/images/logos/planetaria.svg'
import logoSoundSort from '@/images/logos/soundsort.svg'
import logoZenmatch from '@/images/logos/zenmatch.svg'
import logoAmeliaAmes from '@/images/logos/ameliaames.svg'

export const getProjects = () => [
  {
      name: 'SoundSort',
      description: 'A website to build your perfect Spotify playlist.',
    link: { href: 'http://soundsort.net', label: 'soundsort.net' },
    logo: logoSoundSort,
  },
  {
      name: 'Zen Match',
      description: 'A game like Candy Crush but more zen.',
    link: { href: '#', label: 'github.com' },
    logo: logoZenmatch,
  },
  {
      name: 'Amelia Ames Landscape Architecture',
      description: 'A marketing website for a landscape architect.',
    link: { href: '#', label: 'github.com' },
    logo: logoAmeliaAmes,
  }
]
