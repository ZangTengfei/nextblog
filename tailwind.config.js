const defaultTheme = require('tailwindcss/defaultTheme')
const mdx = require('@mdx-js/mdx')

module.exports = {
  purge: {
    mode: 'all',
    content: ['./src/**/*.{js,mdx}', './next.config.js'],
    options: {
      extractors: [
        {
          extensions: ['mdx'],
          extractor: (content) => {
            content = mdx.sync(content)

            // Capture as liberally as possible, including things like `h-(screen-1.5)`
            const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []

            // Capture classes within other delimiters like .block(class="w-1/2") in Pug
            const innerMatches =
              content.match(/[^<>"'`\s.(){}[\]#=%]*[^<>"'`\s.(){}[\]#=%:]/g) || []

            return broadMatches.concat(innerMatches)
          },
        },
      ],
    },
  },
  theme: {
    extend: {
      spacing: {
        '9/16': '56.25%',
      },
      lineHeight: {
        '11': '2.75rem',
        '12': '3rem',
        '13': '3.25rem',
        '14': '3.5rem',
      },
      // fontFamily: {
      //   sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      // },
      colors: {
        code: {
          green: '#b5f4a5',
          yellow: '#ffe484',
          purple: '#d9a9ff',
          red: '#ff8383',
          blue: '#93ddfd',
          white: '#fff',
        },
      },
      boxShadow: {
        'mymd': '0px 7px 8px 0px rgb(0 0 0 / 30%)'
      },
      backgroundImage: {
        'mybgi': "url('https://mmbiz.qpic.cn/mmbiz_png/E6FwVF0oicdR2DefnHuCaf6CDefdcpNurvQ2rAHeS66E62MYWFR2ZE8LkWDS1KfLTWh7I9leFCgKNibgrstkNHjw/640?wx_fmt=png')",
      },
      typography: (theme) => ({
        default: {
          css: {
            color: theme('colors.gray.700'),
            h2: {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.gray.900'),
            },
            h3: {
              fontWeight: '600',
              color: theme('colors.gray.900'),
            },
            'ol li:before': {
              fontWeight: '600',
              color: theme('colors.gray.500'),
            },
            'ul li:before': {
              backgroundColor: theme('colors.gray.400'),
            },
            code: {
              color: theme('colors.blue.500'),
              backgroundColor: theme('colors.gray.100'),
              fontWeight: '600',
              borderRadius: theme('borderRadius.sm'),
              padding: theme('padding.1')
            },
            'code::before': {
              content: " "
            },
            'code::after': {
              content: " "
            },
            a: {
              color: theme('colors.gray.900'),
            },
            pre: {
              color: theme('colors.gray.200'),
              backgroundColor: theme('colors.gray.800'),
              backgroundImage: theme('backgroundImage.mybgi'),
              boxShadow: theme('boxShadow.mymd'),
              borderRadius: theme('borderRadius.md'),
              backgroundPosition: '10px 10px',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '45px 13px',
              paddingTop: theme('padding.10'),
              paddingBottom: theme('padding.4')
            },
            blockquote: {
              color: theme('colors.gray.900'),
              borderLeftColor: theme('colors.gray.200'),
            },
          },
        },
      }),
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/ui'),
    require('@tailwindcss/typography'),
    function ({ addBase, addComponents, theme }) {
      addBase([
        // {
        //   '@font-face': {
        //     fontFamily: 'Inter var',
        //     fontWeight: '100 900',
        //     fontStyle: 'normal',
        //     fontNamedInstance: 'Regular',
        //     fontDisplay: 'swap',
        //     src: 'url("/fonts/Inter-roman.var-latin.woff2?3.13") format("woff2")',
        //   },
        // },
        // {
        //   '@font-face': {
        //     fontFamily: 'Inter var',
        //     fontWeight: '100 900',
        //     fontStyle: 'italic',
        //     fontNamedInstance: 'Italic',
        //     fontDisplay: 'swap',
        //     src: 'url("/fonts/Inter-italic.var-latin.woff2?3.13") format("woff2")',
        //   },
        // },
      ])
    },
  ],
}
