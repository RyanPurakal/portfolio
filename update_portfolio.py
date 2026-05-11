import re

with open('src/components/portfolio-content.tsx', 'r') as f:
    content = f.read()

# We need to replace everything from '<section\n        id="work"' to the end of '</footer>'
# Let's find the indices.
start_str = '      <section\n        id="work"'
end_str = '      </footer>'

start_idx = content.find(start_str)
end_idx = content.find(end_str) + len(end_str)

if start_idx != -1 and end_idx != -1:
    new_code = """
      <div className="editorial-design">
        <TealFlood />

        <section id="work">
          <motion.p 
            className="section-label"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "0px 0px -36px 0px" }}
          >Projects</motion.p>
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.09 }}
            viewport={{ once: true, margin: "0px 0px -36px 0px" }}
          >Selected <em>work</em></motion.h2>

          <div className="work-grid">
            {loadingRepos ? (
              <p className="text-muted-foreground col-span-full text-center py-12">Loading projects from GitHub...</p>
            ) : (
              githubRepos.map((repo, index) => (
                <motion.a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`project-card ${index % 3 === 0 ? "wide" : ""}`}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: (index % 3) * 0.09 }}
                  viewport={{ once: true, margin: "0px 0px -36px 0px" }}
                >
                  <span className="project-number">{(index + 1).toString().padStart(2, '0')}</span>
                  <h3 className="project-name">{repo.name}</h3>
                  <p className="project-desc">{repo.description || "No description provided."}</p>
                  <div className="project-tags">
                    {repo.language && <span className="tag">{repo.language}</span>}
                    <span className="tag">★ {repo.stargazers_count}</span>
                  </div>
                </motion.a>
              ))
            )}
          </div>
        </section>

        <section id="experience">
          <motion.p 
            className="section-label"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "0px 0px -36px 0px" }}
          >Experience</motion.p>
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.09 }}
            viewport={{ once: true, margin: "0px 0px -36px 0px" }}
          ><em>Where</em> I've worked</motion.h2>

          <div className="experience-list">
            {experience.map((exp, index) => (
              <motion.div 
                key={exp.company} 
                className="exp-item"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: (index % 5) * 0.09 }}
                viewport={{ once: true, margin: "0px 0px -36px 0px" }}
              >
                <div className="exp-bar"></div>
                <div className="exp-body">
                  <h3 className="exp-role">{exp.title}</h3>
                  <p className="exp-org">{exp.company}</p>
                  <p className="exp-desc">{exp.bullets.join(" ")}</p>
                </div>
                <div className="exp-date">{exp.period}</div>
              </motion.div>
            ))}
          </div>

          <ImageAutoSlider
            className="mt-16 md:mt-24"
            prefersReducedMotion={prefersReducedMotion}
            duration={38}
          />
        </section>

        <section id="contact">
          <div className="contact-inner">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "0px 0px -36px 0px" }}
            >
              <p className="section-label">Contact</p>
              <h2 className="contact-headline">Open to<br/>opportunities<em>.</em></h2>
              <p className="contact-body">I'm looking for internships in software engineering and AI/ML for Summer/Fall 2026. If you're building something interesting, reach out.</p>
            </motion.div>

            <motion.div 
              className="contact-links"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.09 }}
              viewport={{ once: true, margin: "0px 0px -36px 0px" }}
            >
              <a className="contact-link-item" href={`mailto:${EMAIL}`}>
                <span className="contact-link-type">Email</span>
                <span className="contact-link-label">{EMAIL}</span>
                <span className="contact-link-arrow">→</span>
              </a>
              <a className="contact-link-item" href="https://github.com/RyanPurakal" target="_blank" rel="noopener noreferrer">
                <span className="contact-link-type">GitHub</span>
                <span className="contact-link-label">github.com/RyanPurakal</span>
                <span className="contact-link-arrow">→</span>
              </a>
              <a className="contact-link-item" href="https://linkedin.com/in/ryan-purakal" target="_blank" rel="noopener noreferrer">
                <span className="contact-link-type">LinkedIn</span>
                <span className="contact-link-label">linkedin.com/in/ryan-purakal</span>
                <span className="contact-link-arrow">→</span>
              </a>
            </motion.div>
          </div>
        </section>

        <footer>
          <span className="footer-left">Ryan Purakal</span>
          <span className="footer-right">© {new Date().getFullYear()}</span>
        </footer>
      </div>"""

    new_content = content[:start_idx] + new_code + content[end_idx:]
    
    # We also need to add TealFlood component at the end of the file or beginning.
    teal_flood_code = """

function TealFlood() {
  useEffect(() => {
    const zone = document.getElementById('flood-zone');
    const fill = document.getElementById('flood-fill');
    if (!zone || !fill) return;

    function ease(t: number) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }
    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t;
    }
    function clamp(v: number, lo: number, hi: number) {
      return Math.max(lo, Math.min(hi, v));
    }

    function update() {
      if (!zone || !fill) return;
      const rect = zone.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh;
      const scrolled = vh - rect.top;
      const progress = clamp(scrolled / total, 0, 1);

      if (progress <= 0 || progress >= 1) {
        fill.style.clipPath = 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)';
        zone.classList.remove('flood-peak');
        return;
      }

      if (progress < 0.5) {
        const p = ease(progress / 0.5);
        const top = lerp(100, 0, p);
        fill.style.clipPath = `polygon(0 ${top}%, 100% ${top}%, 100% 100%, 0 100%)`;
        zone.classList.toggle('flood-peak', p > 0.85);
      } else {
        const p = ease((progress - 0.5) / 0.5);
        const bottom = lerp(100, 0, p);
        fill.style.clipPath = `polygon(0 0, 100% 0, 100% ${bottom}%, 0 ${bottom}%)`;
        zone.classList.toggle('flood-peak', p < 0.15);
      }
    }

    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div id="flood-zone">
      <div id="flood-fill"></div>
      <div className="flood-text">
        <span>Selected Work</span>
      </div>
    </div>
  );
}
"""
    new_content += teal_flood_code

    with open('src/components/portfolio-content.tsx', 'w') as out:
        out.write(new_content)
    print("Replaced content successfully.")
else:
    print("Could not find start or end bounds.")
