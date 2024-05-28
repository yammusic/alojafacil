import React from 'react'
import { Body, Column, Container, Head, Heading, Hr, Html, Img, Preview, Row, Section, Text } from '@react-email/components'

import type { BookingTemplateProps } from './props-types'
import styles from './styles'

const baseUrl = process.env.BASE_URL

export function BookingTemplate(props: Readonly<BookingTemplateProps>) {
  const { booking } = props

  return (
    <Html lang="en">
      <Head />

      <Preview>Booking successful!</Preview>

      <Body style={ styles.main }>
        <Container style={ styles.container }>
          <Section style={ styles.message }>
            <Img
              alt="Logo"
              height={ 50 }
              src={ `${ baseUrl }/images/logo.webp` }
              style={ styles.logo }
              width={ 50 }
            />

            <Heading style={ styles.heading }>Booking successful!</Heading>

            <Text style={ styles.text }>Your booking has been confirmed.</Text>
          </Section>

          <Hr style={ styles.hr } />

          <Section style={ styles.details }>
            <Row>
              <Column>
                <Img
                  alt={ booking.name }
                  src={ `${booking.picture}` }
                  style={ { float: 'left' } }
                  width="180px"
                />
              </Column>

              <Column style={ styles.info }>
                <Text style={ styles.title }>
                  { booking.name }
                </Text>

                <Text style={ styles.text }>
                  { booking.type }
                </Text>

                <Text style={ styles.text }>{ `Check-in: ${booking.checkIn}` }</Text>

                <Text style={ styles.text }>{ `Check-out: ${booking.checkOut}` }</Text>
              </Column>
            </Row>
          </Section>

          <Hr style={ styles.hr } />

          <Section style={ styles.footer }>
            <Img
              alt="Logo"
              height={ 50 }
              src={ `${ baseUrl }/images/logo.webp` }
              style={ styles.logo }
              width={ 50 }
            />
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
