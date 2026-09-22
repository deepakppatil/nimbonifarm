import Reveal from './Reveal.jsx'
import { TEAM } from '../data/site.js'

export default function Team() {
  return (
    <section id="team" className="section team" aria-labelledby="team-title">
      <div className="container">
        <div className="sec-head sec-head--split">
          <Reveal>
            <p className="eyebrow">The people behind the place</p>
            <h2 id="team-title" className="sec-head__title">
              Meet the team.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="lede">
              A farm is never just one person. It is a daily conversation between people, soil,
              weather, trees and whatever wandered into the kitchen.
            </p>
          </Reveal>
        </div>

        <ul className="team__grid" role="list">
          {TEAM.map((member, i) => (
            <Reveal as="li" key={member.name} delay={i * 90} className="team-card">
              <div className="team-card__portrait" aria-label={`${member.name} placeholder portrait`}>
                <span>{member.initials}</span>
              </div>
              <div className="team-card__body">
                <p className="team-card__role">{member.role}</p>
                <h3>{member.name}</h3>
                <p>{member.note}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}