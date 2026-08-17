import { Link } from 'react-router-dom'

function About() {
  const rules = [
    {
      title: 'One hall, four nights',
      text: 'Thursday through Sunday. The projector is 35mm where a print exists, otherwise 4K digital.',
    },
    {
      title: 'Members choose the programme',
      text: 'Every member gets one vote per month on what plays the following month.',
    },
    {
      title: 'No phones in the room',
      text: 'Screens stay in your bag once the lights go down. The one rule nobody argues with.',
    },
    {
      title: 'Talk afterwards',
      text: 'The bar next door keeps a table for us after every late screening.',
    },
  ]

  return (
    <div className="container">
      <section className="hero">
        <p className="eyebrow">About</p>
        <h1 className="hero__title">A small room, run properly.</h1>
        <p className="hero__text">
          Cinema Club started in 2019 with a rented projector and forty chairs.
          It is still the same room, with better chairs.
        </p>
      </section>

      <section>
        <h2 className="section__title">How it works</h2>
        <div className="rules">
          {rules.map((rule, index) => (
            <article className="rule" key={rule.title}>
              <span className="rule__number">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="rule__title">{rule.title}</h3>
                <p className="rule__text">{rule.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="cta">
        <h2 className="cta__title">Membership is 150 EGP a month.</h2>
        <p className="cta__text">
          That covers every screening, plus a guest ticket once a month.
        </p>
        <Link to="/join" className="btn btn--primary">
          Register now
        </Link>
      </section>
    </div>
  )
}

export default About
