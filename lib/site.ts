export const site = {
  brand: 'LUOQI Gauging',
  wordmark: 'LUOQI',
  legalNameEn: 'Wuxi Luoqi Measuring Instruments Co., Ltd.',
  legalNameZh: '无锡市洛奇量仪有限公司',
  url: 'https://luoqigauging.com',
  email: 'info@luoqigauging.com',
  phoneDisplay: '+86 187 6265 9380',
  phoneHref: 'tel:+8618762659380',
  addressLines: [
    'Linzhuang Road, Yangxiyuan Village',
    'Luoshe Town, Huishan District',
    'Wuxi, Jiangsu, China',
  ],
} as const

export const mainNav = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Applications', href: '/applications' },
  { label: 'Capabilities', href: '/capabilities' },
  { label: 'About Us', href: '/about' },
  { label: 'News', href: '/news' },
  { label: 'Contact', href: '/contact' },
] as const

export const quoteCta = { label: 'Request a Quote', href: '/contact' } as const
