import Container from '../../container'
import Social from './social'
import Sitemap from './sitemap'

const Footer = () => (
  <footer>
    <Container>
      <div className='content'>
        <div>
          <img src='/static/images/etalab.png' alt='Etalab' />
          <Social />
        </div>
        <Sitemap />
      </div>
    </Container>

    <style jsx>{`
      @import 'colors';

      footer {
        background: $darkblue;
        color: $white;
        padding: 2em 0;
        line-height: 2em;
      }

      .content {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        @media (max-width: 551px) {
          flex-direction: column;
          align-items: flex-start;
        }
      }
    `}</style>
  </footer>
)

export default Footer
