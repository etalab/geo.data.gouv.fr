import React from 'react'

const Section = ({ title, children }) => (
  <section>
    {title && <h2>{title}</h2>}
    {children}

    <style jsx>{`
      section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 1em;
      }

      h2 {
        color: #fff;
        text-transform: uppercase;
      }

      @media (max-width: 768px) {
        section {
          padding: 0;
        }
      }
    `}</style>
  </section>
)

export default Section
