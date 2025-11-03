import React from "react";
import "./Achievements.css";

export default function Achievements() {
  const achievements = [
    {
      title: "SkillsUSA Regional Conference",
      date: "2025",
      desc: "Gold – Related Technical Math Competition",
    },
    {
      title: "USA Computing Olympiad",
      date: "Dec 2024",
      desc: "Silver Division (USACO competitive programming contest)",
    },
    {
      title: "Presidents’ Volunteer Service Award",
      date: "2018–2024",
      desc: "Recognized for over 600 hours of community service across seven years.",
    },
  ];

  const activities = [
    {
      title: "Machine Learning @ Berkeley",
      date: "2025–Present",
      desc: "Club Member | Training and refining ML models for collaborative projects.",
    },
    {
      title: "Tzu Chi Charity Foundation",
      date: "2017–Present",
      desc: "Fundraised $15,000+, organized senior home performances, and led food drives.",
    },
    {
      title: "Computer Science Kickstart Program",
      date: "2025",
      desc: "Completed a 1-week bootcamp covering web development and technical workshops.",
    },
  ];

  return (
    <section id="achievements" className="achievements-section">
      <div className="achievements-columns">
        <div className="column left">
          <h3>Achievements</h3>
          <div className="achievements-grid">
            {achievements.map((a, i) => (
              <div className="ach-card" key={i}>
                <div className="ach-card-top">
                  <h4>
                    {a.title} <span className="divider">|</span> {a.date}
                  </h4>
                </div>
                <p>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="column right">
          <h3>Activities</h3>
          <div className="achievements-grid">
            {activities.map((a, i) => (
              <div className="ach-card" key={i}>
                <div className="ach-card-top">
                  <h4>
                    {a.title} <span className="divider">|</span> {a.date}
                  </h4>
                </div>
                <p>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
