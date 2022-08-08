/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  'views/layout/main.ejs',
'views/*.html',
  'views/*.ejs'
  ],
  theme: {
    container:{
      center: true,
      padding:'16px'
    },
    extend: {
      screens: {
        '2xl':'1320px'
      },
      colors: {
        'primary':'#299ae5'
      }
    },
  },
  plugins: [],
}
