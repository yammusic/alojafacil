import type { CSSProperties } from 'react'

const paragraph = {
  margin: '0',
  lineHeight: '2',
}

const paddingX = {
  paddingLeft: '40px',
  paddingRight: '40px',
}

// const paddingY = {
//   paddingTop: '22px',
//   paddingBottom: '22px',
// }

const styles = {
  main: {
    backgroundColor: '#ffffff',
    fonFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  },

  container: {
    margin: '10px auto',
    width: '600px',
    maxWidth: '100%',
    border: '1px solid #E5E5E5',
  },

  message: {
    padding: '40px 74px',
    textAlign: 'center',
  } as CSSProperties,

  heading: {
    fontSize: '32px',
    lineHeight: '1.3',
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: '-1px',
  } as CSSProperties,

  logo: {
    margin: 'auto',
  },

  title: {
    ...paragraph,
    fontWeight: '500',
  },

  text: {
    ...paragraph,
    color: '#747474',
    fontWeight: '500',
  },

  hr: {
    borderColor: '#E5E5E5',
    margin: '0',
  },

  details: {
    ...paddingX,
    paddingTop: '40px',
    paddingBottom: '40px',
  },

  info: {
    verticalAlign: 'top',
    paddingLeft: '12px',
  },

  footer: {
    padding: '40px 74px',
    textAlign: 'center',
  } as CSSProperties,
}

export default styles
