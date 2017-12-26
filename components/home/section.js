import PropTypes from 'prop-types'

import Container from '../container'

const Section = ({title, children}) => (
  <section>
    <Container>
      {title && <h2>{title}</h2>}
      {children}
    </Container>

    <style jsx>{`
      @import 'colors';

      section {
        padding: 1em 0;
        margin-top: 2em;
        text-align: center;
      }

      h2 {
        color: $white;
        text-transform: uppercase;

        @media (max-width: 551px) {
          font-size: 1.3em;
        }
      }
    `}</style>
  </section>
)

Section.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired
}

Section.defaultProps = {
  title: null
}

export default Section
