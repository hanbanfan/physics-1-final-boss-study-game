import React, { useMemo, useState } from "react";

const chapters = [
  {
    id: "ch1",
    short: "Units",
    title: "Ch. 1 — Measurement & Units",
    boss: "Unit Goblin",
    bigIdea: "Units are part of the answer. Cancel units like algebra and your setup will tell you if the formula makes sense.",
    mustKnow: ["SI units", "unit conversion", "scientific notation", "significant figures", "dimensional analysis"],
    formulas: ["speed = distance / time", "density = mass / volume", "1 km = 1000 m", "1 h = 3600 s"],
    traps: ["Dropping units", "Rounding too early", "Not checking the final unit"],
    examples: [{ q: "Convert 72 km/h to m/s.", a: "20 m/s", steps: "72 × 1000 / 3600 = 20." }],
    card: ["Dimensional analysis", "Write conversions as fractions and cancel units before calculating."]
  },
  {
    id: "ch2",
    short: "Motion",
    title: "Ch. 2 — One-Dimensional Motion",
    boss: "Acceleration Serpent",
    bigIdea: "Motion problems are stories about position, velocity, acceleration, and time. Graphs show the same story visually.",
    mustKnow: ["position", "displacement", "velocity", "acceleration", "free fall", "motion graphs"],
    formulas: ["v = v0 + at", "x = x0 + v0t + 1/2at²", "v² = v0² + 2aΔx", "g = 9.8 m/s²"],
    traps: ["Mixing velocity and acceleration", "Forgetting signs", "Confusing graph slope and area"],
    examples: [{ q: "A car starts from rest and accelerates at 3 m/s² for 6 s. Final speed?", a: "18 m/s", steps: "v = 0 + 3(6)." }],
    card: ["Position-time slope", "Velocity."]
  },
  {
    id: "ch3",
    short: "Vectors",
    title: "Ch. 3 — Vectors, Projectiles, Relative Motion",
    boss: "Projectile Dragon",
    bigIdea: "Split vectors into x and y. Horizontal and vertical motion are connected by time, not by sharing acceleration.",
    mustKnow: ["components", "resultants", "projectile motion", "parametric motion", "relative velocity", "circular acceleration"],
    formulas: ["Ax = A cosθ", "Ay = A sinθ", "|A| = √(Ax² + Ay²)", "x = vx t", "y = y0 + v0y t - 1/2gt²", "ac = v²/r = ω²r", "ω = 2π/T"],
    traps: ["Using sine/cosine backward", "Mixing x and y equations", "Forgetting v0y = 0 for horizontal launch", "Forgetting velocity is derivative of position"],
    examples: [
      { q: "48.0 m river jump, vertical drop 19.5 m. Minimum horizontal speed?", a: "24.1 m/s", steps: "-19.5 = -4.9t² gives t = 1.995 s. vx = 48.0/1.995." },
      { q: "Boat 4.2 m/s east, river 2.0 m/s south. Resultant speed?", a: "4.65 m/s", steps: "√(4.2² + 2.0²)." }
    ],
    card: ["Projectile checklist", "Find time from vertical motion, then use horizontal motion."]
  },
  {
    id: "ch4",
    short: "Forces",
    title: "Ch. 4 — Newton's Laws",
    boss: "Free-Body Phantom",
    bigIdea: "Forces cause acceleration. A free-body diagram turns the problem into x and y equations.",
    mustKnow: ["Newton's laws", "free-body diagrams", "net force", "weight", "normal force", "impulse", "piecewise motion"],
    formulas: ["ΣF = ma", "W = mg", "J = Favg Δt = Δp", "v = dx/dt", "a = dv/dt"],
    traps: ["Putting velocity on a FBD", "Assuming normal force always equals mg", "Forgetting upward acceleration means N > mg", "Not converting mph to m/s"],
    examples: [
      { q: "0.160 kg puck pushed by 0.250 N for 2.0 s. Speed?", a: "3.13 m/s", steps: "a = F/m = 1.5625. v = at." },
      { q: "0.145 kg ball reaches 42.2 m/s in 0.020 s. Average force?", a: "306 N", steps: "Favg = mΔv/Δt." }
    ],
    card: ["Newton checklist", "Draw FBD, choose axes, write ΣF = ma."]
  },
  {
    id: "ch5",
    short: "Friction",
    title: "Ch. 5 — Applying Newton's Laws",
    boss: "Ramp Troll",
    bigIdea: "Friction, tension, inclines, and circular motion are Newton's laws wearing costumes.",
    mustKnow: ["friction", "tension", "inclines", "centripetal force", "circular motion"],
    formulas: ["fk = μkN", "fs ≤ μsN", "Fc = mv²/r", "mg sinθ down ramp", "mg cosθ into ramp"],
    traps: ["Using mg instead of N on ramps", "Treating centripetal force as a new force", "Mixing static and kinetic friction"],
    examples: [{ q: "1000 kg car at 20 m/s turns with radius 50 m. Centripetal force?", a: "8000 N", steps: "Fc = mv²/r = 1000(20²)/50." }],
    card: ["Ramp components", "mg sinθ down ramp; mg cosθ into ramp."]
  },
  {
    id: "ch6",
    short: "Work",
    title: "Ch. 6 — Work & Energy",
    boss: "Cosine Crusher",
    bigIdea: "Work transfers energy. Only the force component along displacement does work.",
    mustKnow: ["work", "kinetic energy", "potential energy", "work-energy theorem", "power"],
    formulas: ["W = Fd cosθ", "K = 1/2mv²", "Ug = mgh", "Wnet = ΔK"],
    traps: ["Forgetting cosθ", "Thinking every force does positive work", "Confusing work and power"],
    examples: [{ q: "12.0 N tension moves block 0.750 m. Work?", a: "9 J", steps: "W = Fd = 12.0(0.750)." }],
    card: ["Work with angle", "W = Fd cosθ."]
  },
  {
    id: "ch7",
    short: "Energy",
    title: "Ch. 7 — Conservation of Energy",
    boss: "Friction Goblin",
    bigIdea: "Energy changes form. Friction removes mechanical energy; springs store it.",
    mustKnow: ["energy conservation", "spring energy", "friction work", "air resistance", "mechanical energy"],
    formulas: ["Ki + Ui = Kf + Uf", "Us = 1/2kx²", "Wnc = ΔEmech", "v = √(v0² + 2gh)"],
    traps: ["Conserving mechanical energy with friction", "Forgetting spring energy", "Using energy through a sticky collision"],
    examples: [{ q: "Ball thrown downward 12.0 m/s from 22.0 m. Impact speed?", a: "24 m/s", steps: "v = √(12² + 2(9.8)(22))." }],
    card: ["Energy event", "Height, speed, spring, or rough patch usually means energy."]
  },
  {
    id: "ch8",
    short: "Momentum",
    title: "Ch. 8 — Momentum & Collisions",
    boss: "Sticky Collision Beast",
    bigIdea: "Collisions, explosions, and recoil are momentum problems first.",
    mustKnow: ["momentum", "impulse", "elastic collision", "inelastic collision", "recoil"],
    formulas: ["p = mv", "J = FΔt = Δp", "momentum before = momentum after"],
    traps: ["Conserving kinetic energy in sticky collisions", "Forgetting direction", "Using energy when the event screams collision"],
    examples: [{ q: "10000 kg truck at 12.0 m/s. Momentum?", a: "120000 kg m/s", steps: "p = mv." }],
    card: ["Sticky collision", "Momentum conserved; kinetic energy not conserved."]
  },
  {
    id: "ch9",
    short: "Rotate",
    title: "Ch. 9 — Rotational Motion",
    boss: "Inertia Ogre",
    bigIdea: "Rotation mirrors linear motion, but uses radians, torque, moment of inertia, and angular acceleration.",
    mustKnow: ["radians", "arc length", "angular speed", "torque", "moment of inertia"],
    formulas: ["s = rθ", "v = rω", "a = rα", "τ = rF sinθ", "I = Σmr²"],
    traps: ["Forgetting radians", "Ignoring lever arm", "Using hanging mass as wheel mass"],
    examples: [{ q: "Masses M at 0, L/2, L from axis. I?", a: "5ML²/4", steps: "I = 0 + M(L/2)² + ML²." }],
    card: ["Point-mass inertia", "I = Σmr²."]
  },
  {
    id: "ch10",
    short: "Torque",
    title: "Ch. 10 — Equilibrium & Angular Momentum",
    boss: "Torque Troll",
    bigIdea: "Static equilibrium means both net force and net torque are zero.",
    mustKnow: ["static equilibrium", "torque balance", "pivot choice", "angular momentum", "parallel-axis theorem"],
    formulas: ["ΣF = 0", "Στ = 0", "L = Iω", "I = Icm + Md²"],
    traps: ["Bad pivot choice", "Forgetting torque balance", "Using total length instead of pivot distance"],
    examples: [{ q: "10.0 N force acts 4.00 m from pivot at 90°. Torque?", a: "40 N m", steps: "τ = rFsin90." }],
    card: ["Static equilibrium", "ΣF = 0 and Στ = 0."]
  },
  {
    id: "ch11",
    short: "Gravity",
    title: "Ch. 11 — Gravity & Center of Gravity",
    boss: "Inverse-Square Hydra",
    bigIdea: "Gravity is inverse-square. Center of gravity is a weighted average.",
    mustKnow: ["universal gravitation", "inverse-square law", "orbits", "center of gravity", "center of mass"],
    formulas: ["Fg = Gm1m2/r²", "g = GM/r²", "v = √(GM/r)", "xcm = Σmx / Σm"],
    traps: ["Forgetting inverse square", "Using altitude instead of radius", "Forgetting center of mass is weighted"],
    examples: [{ q: "Distance triples. Gravity becomes?", a: "1/9", steps: "Gravity scales like 1/r²." }],
    card: ["Gravity scaling", "Gravity follows 1/r²."]
  },
  {
    id: "ch12",
    short: "Fluids",
    title: "Ch. 12 — Fluids",
    boss: "Buoyancy Kraken",
    bigIdea: "Fluids create pressure, buoyant forces, and flow patterns.",
    mustKnow: ["density", "pressure", "pressure with depth", "buoyancy", "continuity"],
    formulas: ["ρ = m/V", "P = F/A", "P = P0 + ρgh", "Fb = ρfluidVg", "A1v1 = A2v2"],
    traps: ["Confusing object density and fluid density", "Forgetting pressure increases with depth"],
    examples: [{ q: "Object displaces 0.01 m³ water. Buoyant force?", a: "98 N", steps: "Fb = 1000(0.01)(9.8)." }],
    card: ["Buoyancy", "Buoyant force equals weight of displaced fluid."]
  },
  {
    id: "ch13",
    short: "Waves",
    title: "Ch. 13 — Oscillations & Waves",
    boss: "Frequency Wraith",
    bigIdea: "Oscillations repeat in time. Waves carry energy through space.",
    mustKnow: ["period", "frequency", "wave speed", "wavelength", "simple harmonic motion"],
    formulas: ["T = 1/f", "v = fλ", "Tspring = 2π√(m/k)", "Tpendulum = 2π√(L/g)"],
    traps: ["Confusing period and frequency", "Ignoring Hz = 1/s", "Mixing wavelength and amplitude"],
    examples: [{ q: "f = 5 Hz and λ = 2 m. Wave speed?", a: "10 m/s", steps: "v = fλ." }],
    card: ["Wave speed", "v = fλ."]
  },
  {
    id: "ch14",
    short: "Sound",
    title: "Ch. 14.1–14.4 — Sound",
    boss: "Decibel Wizard",
    bigIdea: "Sound is a longitudinal mechanical wave. Decibels are logarithmic, not linear.",
    mustKnow: ["sound waves", "frequency and pitch", "intensity", "decibels", "standing waves"],
    formulas: ["β = 10log(I/I0)", "v = fλ", "open pipe: fn = nv/2L", "closed pipe: fn = nv/4L for odd n"],
    traps: ["Treating dB as linear", "Confusing pitch and loudness", "Using open-pipe formula for closed pipes"],
    examples: [{ q: "Intensity increases by factor of 100. Sound level change?", a: "20 dB", steps: "100 = 10², so +20 dB." }],
    card: ["Decibels", "Every 10x intensity increase is +10 dB."]
  }
];

const homeworkBosses = [
  { chapter: "Ch. 3", boss: "Vector Function Wizard", q: "Given r(t) = (4.0 cm + 2.5t²)i + 5.0t j from t=0 to 2s, what is average velocity?", choices: ["5i + 5j cm/s", "10i + 5j cm/s", "5i + 10j cm/s", "14i + 10j cm/s"], a: "5i + 5j cm/s", why: "r(2)-r(0) = (10i+10j) cm. Divide by 2s." },
  { chapter: "Ch. 3", boss: "Instant Velocity Goblin", q: "For r(t) = (4 + 2.5t²)i + 5t j, what is v(t)?", choices: ["5t i + 5 j", "2.5t i + 5 j", "5 i + 5t j", "10t i + 5 j"], a: "5t i + 5 j", why: "Velocity is derivative of position." },
  { chapter: "Ch. 3", boss: "Parametric Path Goblin", q: "If x = 4 + 2.5t² and y = 5t, what shape is the trajectory?", choices: ["Parabola", "Circle", "Straight line", "Ellipse"], a: "Parabola", why: "Solve t=y/5, then x = 4 + 2.5(y/5)²." },
  { chapter: "Ch. 3", boss: "Velocity Dot Acceleration Beast", q: "For v = 2.4i - 4.8j and a = -2.4j, what sign is v dot a?", choices: ["Positive", "Negative", "Zero", "Impossible"], a: "Positive", why: "v·a = (-4.8)(-2.4), so it is positive." },
  { chapter: "Ch. 3", boss: "River Jump Boss", q: "A biker launches horizontally across a 48.0 m river, dropping 19.5 m. Minimum horizontal speed?", choices: ["24.1 m/s", "19.6 m/s", "31 m/s", "48 m/s"], a: "24.1 m/s", why: "t=√(19.5/4.9)=1.995s, then vx=48/1.995." },
  { chapter: "Ch. 3", boss: "Landing Speed Boss", q: "Using the river jump above, what is the approximate speed before landing?", choices: ["31 m/s", "24 m/s", "19.6 m/s", "5 m/s"], a: "31 m/s", why: "vx=24.1, vy=-19.6, so speed=√(vx²+vy²)." },
  { chapter: "Ch. 3", boss: "Angled Projectile Goblin", q: "Projectile travels 2.1 m horizontally with v0=6.4 m/s at 60°. Time to reach that x?", choices: ["0.656 s", "0.328 s", "1.53 s", "2.1 s"], a: "0.656 s", why: "v0x=6.4cos60=3.2. t=2.1/3.2." },
  { chapter: "Ch. 3", boss: "Projectile Height Boss", q: "For v0=6.4 m/s at 60° and t=0.656s, height above launch?", choices: ["1.53 m", "0 m", "5.54 m", "-0.889 m"], a: "1.53 m", why: "y=v0y t - 4.9t²." },
  { chapter: "Ch. 4", boss: "Normal Force Boss", q: "55 kg block accelerates upward at 9.5 m/s². Normal force?", choices: ["1061.5 N", "523 N", "55 N", "9.5 N"], a: "1061.5 N", why: "N-mg=ma, so N=m(g+a)." },
  { chapter: "Ch. 4", boss: "Baseball Force Boss", q: "0.145 kg ball reaches 42.2 m/s in 0.020s. Average force?", choices: ["306 N", "68.8 N", "6.12 N", "2110 N"], a: "306 N", why: "Favg=mΔv/Δt." },
  { chapter: "Ch. 6", boss: "Homework Work Wraith", q: "Tension 12.0 N moves block 0.750 m. Work?", choices: ["9 J", "16 J", "0 J", "12 J"], a: "9 J", why: "W=Fd." },
  { chapter: "Ch. 8", boss: "Momentum Truck Monster", q: "10000 kg truck moves 12.0 m/s. Momentum?", choices: ["120000 kg m/s", "833 kg m/s", "12000 kg m/s", "60000 kg m/s"], a: "120000 kg m/s", why: "p=mv." },
  { chapter: "Ch. 14", boss: "Decibel Wizard", q: "Sound intensity increases by factor of 100. Sound level change?", choices: ["20 dB", "10 dB", "100 dB", "2 dB"], a: "20 dB", why: "100=10², so +20 dB." }
];

const missedTestBank = [
  { topic: "Elastic collision", likelyMiss: "Tiny object leaves with about 2V when hit elastically by a huge mass.", drill: "Huge cart at 12 m/s elastically hits tiny cart. Tiny cart leaves at about?", answer: "24", fix: "2V = 24 m/s." },
  { topic: "Work angle", likelyMiss: "Work depends on angle, not just force and distance.", drill: "Which does more work: horizontal pull or 60° upward pull?", answer: "horizontal", fix: "W = Fdcosθ, and cos0 is bigger than cos60." },
  { topic: "Moment of inertia", likelyMiss: "Each mass has its own distance from the axis.", drill: "M at 0, L/2, and L gives what coefficient in front of ML²?", answer: "5", fix: "0 + 1/4 + 1 = 5/4." },
  { topic: "Ballistic pendulum", likelyMiss: "Energy was used through a sticky collision.", drill: "In a sticky collision, conserve momentum or kinetic energy?", answer: "momentum", fix: "Energy before, momentum during, energy after." },
  { topic: "Rough patch and spring", likelyMiss: "Friction removes energy; spring compression stores remaining energy.", drill: "At max spring compression, kinetic energy becomes what?", answer: "spring", fix: "Remaining KE becomes 1/2kx²." },
  { topic: "Beam torque", likelyMiss: "Cable torque uses the vertical component of tension.", drill: "Which tension component supports torque against weight?", answer: "vertical", fix: "Use Tsinθ in the torque equation." }
];

const botKnowledge = [
  { keys: ["projectile", "launch", "river", "height", "horizontal"], answer: "Projectile move: split x and y. Horizontal: x = vx t. Vertical: y = y0 + v0y t - 1/2gt². Horizontal launch means v0y = 0." },
  { keys: ["vector", "component", "angle", "resultant"], answer: "Vector move: if angle is from horizontal, x = A cosθ and y = A sinθ. Resultant = √(x²+y²)." },
  { keys: ["force", "newton", "free body", "fbd", "normal"], answer: "Newton move: draw the FBD. Only forces go on it. Then write ΣF = ma in x and y." },
  { keys: ["friction", "rough", "patch"], answer: "Rough patch move: friction does negative work. On flat ground, Wfriction = -μmgd." },
  { keys: ["spring", "compression", "k"], answer: "Spring move: use Us = 1/2kx². At maximum compression, velocity is zero." },
  { keys: ["collision", "stick", "inelastic", "momentum"], answer: "Collision move: conserve momentum during the collision. If objects stick, kinetic energy is not conserved." },
  { keys: ["torque", "beam", "cable", "pivot"], answer: "Torque move: choose the pivot at an unknown force. Use τ = rFsinθ and Στ = 0." },
  { keys: ["circle", "circular", "centripetal", "radial"], answer: "Circular motion move: inward acceleration is ac = v²/r or ac = ω²r. If period is given, ω = 2π/T." },
  { keys: ["sound", "wave", "frequency", "wavelength", "decibel"], answer: "Wave/sound move: v = fλ and T = 1/f. Decibels are logarithmic: every 10x intensity increase is +10 dB." },
  { keys: ["unit", "convert", "dimensional"], answer: "Unit move: write conversions as fractions and cancel units. The final unit should match what the problem asks for." }
];

const tabs = ["game", "learn", "missed", "cards", "bot"];
const lootItems = ["Formula Sword", "Unit Shield", "Momentum Gauntlet", "Torque Hammer", "Energy Potion", "Wave Wand", "Free-Body Armor", "Decibel Cloak", "Gravity Boots", "Spring Launcher"];
const hypeLines = ["Your calculator just saluted you.", "Final exam monster took emotional damage.", "You are becoming dangerously hard to trick.", "Newton would give that a thumbs-up."];

function clean(text) {
  return String(text).toLowerCase().trim();
}

function askPhysicsBot(question) {
  const q = clean(question);
  const hit = botKnowledge.find((item) => item.keys.some((key) => q.includes(key)));
  if (hit) return hit.answer;
  return "First move: identify the event. Is it force, energy, momentum, torque, circular motion, projectile motion, gravity, fluids, or waves? Send the known values and what the problem asks for.";
}

function CardShell({ children, tone = "slate" }) {
  return <section className={`card-shell ${tone}`}>{children}</section>;
}

function TinyPill({ children, tone = "cyan" }) {
  return <span className={`tiny-pill ${tone}`}>{children}</span>;
}

function ActionButton({ children, onClick, active = false, variant = "dark", type = "button" }) {
  return (
    <button type={type} onClick={onClick} className={`action-button ${active ? "active" : ""} ${variant === "primary" ? "primary" : ""}`}>
      {children}
    </button>
  );
}

function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <div className="section-header">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {subtitle ? <p>{subtitle}</p> : null}
    </div>
  );
}

const styles = `
  :root { color-scheme: dark; }
  * { box-sizing: border-box; }
  body { margin: 0; background: #020617; }
  button, input { font: inherit; }
  button { cursor: pointer; }
  .app { min-height: 100vh; padding: 16px; color: #f8fafc; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; background: radial-gradient(circle at top left, rgba(34,211,238,.20), transparent 30%), radial-gradient(circle at 90% 10%, rgba(168,85,247,.16), transparent 26%), #020617; }
  .app-inner { max-width: 980px; margin: 0 auto; }
  .hero { border: 1px solid rgba(148,163,184,.18); border-radius: 30px; background: linear-gradient(135deg, rgba(17,24,39,.96), rgba(15,23,42,.88)); padding: 20px; margin-bottom: 14px; box-shadow: 0 24px 70px rgba(0,0,0,.35); }
  .hero-top { display: flex; justify-content: space-between; gap: 16px; align-items: flex-start; }
  .app-kicker, .eyebrow { color: #67e8f9; text-transform: uppercase; font-size: 12px; font-weight: 950; letter-spacing: 1.2px; margin: 0 0 4px; }
  h1 { margin: 0; font-size: clamp(2.7rem, 9vw, 5.2rem); line-height: .92; letter-spacing: -.07em; }
  .subtitle, .section-header p { color: #cbd5e1; font-size: 15px; line-height: 1.55; }
  .heart-badge { border: 1px solid rgba(248,113,113,.3); background: #020617; border-radius: 18px; padding: 8px 10px; color: #fecaca; font-weight: 950; white-space: nowrap; }
  .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-top: 16px; }
  .stat-box { border: 1px solid rgba(148,163,184,.14); background: rgba(2,6,23,.55); border-radius: 18px; padding: 12px; }
  .stat-num { display: block; font-size: 22px; font-weight: 950; }
  .stat-label { color: #94a3b8; font-size: 12px; font-weight: 850; }
  .progress-track { height: 12px; border-radius: 999px; background: #020617; margin-top: 15px; overflow: hidden; }
  .progress-fill { height: 100%; background: linear-gradient(90deg, #22d3ee, #34d399, #fbbf24); border-radius: 999px; }
  .loot { color: #fde68a; margin: 10px 0 0; line-height: 1.4; font-weight: 750; }
  .tabs { position: sticky; top: 0; z-index: 3; display: flex; gap: 8px; overflow-x: auto; padding: 8px 0 14px; background: linear-gradient(#020617, rgba(2,6,23,.78)); backdrop-filter: blur(12px); }
  .tab-button { border: 1px solid rgba(148,163,184,.18); border-radius: 999px; padding: 11px 16px; background: #0f172a; color: #cbd5e1; font-weight: 950; text-transform: capitalize; }
  .tab-button.active { background: #22d3ee; border-color: #22d3ee; color: #020617; }
  .section-header { margin: 8px 0 10px; }
  .section-header h2 { margin: 0; font-size: clamp(1.9rem, 7vw, 3rem); line-height: 1.02; letter-spacing: -.055em; }
  .card-shell { border: 1px solid rgba(148,163,184,.18); border-radius: 24px; padding: 16px; margin-bottom: 12px; background: rgba(15,23,42,.96); box-shadow: 0 16px 40px rgba(0,0,0,.22); }
  .card-shell.blue { border-color: rgba(34,211,238,.28); }
  .card-shell.green { border-color: rgba(52,211,153,.30); }
  .card-shell.amber { border-color: rgba(251,191,36,.30); }
  .card-shell.rose { border-color: rgba(251,113,133,.30); }
  .tiny-pill { display: inline-flex; border-radius: 999px; padding: 6px 10px; margin-bottom: 10px; color: #a5f3fc; background: rgba(34,211,238,.16); font-size: 12px; font-weight: 950; }
  .tiny-pill.green { background: rgba(52,211,153,.16); color: #bbf7d0; }
  .card-title { color: #f8fafc; font-size: 20px; line-height: 1.25; font-weight: 950; margin: 0 0 8px; }
  .body, .bullet { color: #dbeafe; font-size: 15px; line-height: 1.55; margin: 6px 0; }
  .question { color: #f8fafc; font-size: 19px; line-height: 1.34; font-weight: 950; margin: 8px 0; }
  .answer { color: #bbf7d0; font-weight: 950; line-height: 1.45; }
  .formula { display: block; color: #fde68a; background: #020617; padding: 11px; border-radius: 14px; margin: 6px 0; font-weight: 950; }
  .example-box { background: rgba(2,6,23,.55); border-radius: 18px; padding: 12px; margin-top: 8px; }
  .segmented { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 10px; }
  .action-button { border: 1px solid rgba(148,163,184,.18); border-radius: 16px; padding: 12px 14px; background: rgba(2,6,23,.82); color: #f8fafc; font-weight: 950; margin: 8px 8px 0 0; transition: transform .14s ease, border-color .14s ease, background .14s ease; }
  .action-button:hover { transform: translateY(-1px); border-color: rgba(34,211,238,.45); }
  .action-button.active { background: #22d3ee; border-color: #22d3ee; color: #020617; }
  .action-button.primary { background: #34d399; border-color: #34d399; color: #020617; }
  .feedback { border-radius: 16px; padding: 12px; margin: 10px 0; line-height: 1.5; font-weight: 750; }
  .feedback.win { color: #d1fae5; background: rgba(6,78,59,.55); }
  .feedback.lose { color: #fef3c7; background: rgba(120,53,15,.50); }
  .chapter-scroller { display: flex; gap: 8px; overflow-x: auto; padding-bottom: 10px; }
  .input { width: 100%; border: 1px solid rgba(148,163,184,.22); border-radius: 18px; padding: 14px; background: #020617; color: #f8fafc; margin-top: 10px; outline: none; }
  .input:focus { border-color: #22d3ee; box-shadow: 0 0 0 4px rgba(34,211,238,.12); }
  .flashcard { min-height: 250px; width: 100%; border: 1px solid rgba(34,211,238,.35); border-radius: 28px; padding: 22px; background: rgba(14,165,233,.16); display: grid; place-items: center; margin-bottom: 12px; }
  .flash-label { color: #67e8f9; font-size: 12px; font-weight: 950; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; text-align: center; }
  .flash-text { color: #f8fafc; font-size: clamp(1.7rem, 7vw, 2.5rem); font-weight: 950; text-align: center; line-height: 1.15; }
  .chat { border-radius: 18px; padding: 12px; margin: 6px 0; line-height: 1.5; }
  .chat.bot { color: #d1fae5; background: rgba(6,78,59,.45); }
  .chat.user { color: #cffafe; background: rgba(8,145,178,.40); }
  @media (min-width: 780px) { .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; } .card-shell { padding: 20px; } }
  @media (max-width: 420px) { .app { padding: 10px; } .hero { border-radius: 24px; padding: 16px; } .stats-grid { grid-template-columns: 1fr 1fr 1fr; } .action-button { width: 100%; margin-right: 0; } .segmented .action-button { width: auto; } }
`;

export default function PhysicsFinalBossStudyGame() {
  const [tab, setTab] = useState("game");
  const [selectedId, setSelectedId] = useState("ch3");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [gameMode, setGameMode] = useState("mixed");
  const [missedIndex, setMissedIndex] = useState(0);
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState(null);
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [hearts, setHearts] = useState(5);
  const [cleared, setCleared] = useState({});
  const [inventory, setInventory] = useState([]);
  const [botInput, setBotInput] = useState("");
  const [botMessages, setBotMessages] = useState([{ who: "bot", text: "Ask me a physics question. I can help identify the event and formula." }]);

  const selected = chapters.find((c) => c.id === selectedId) || chapters[0];

  const battles = useMemo(() => {
    const chapterBattles = chapters.map((chapter) => ({
      source: "chapter",
      chapterId: chapter.id,
      chapter: chapter.title,
      boss: chapter.boss,
      world: chapter.short,
      q: chapter.examples[0].q,
      choices: [chapter.examples[0].a, chapter.traps[0], chapter.formulas[0], chapter.mustKnow[0]],
      a: chapter.examples[0].a,
      why: chapter.examples[0].steps
    }));
    const homeworkBattles = homeworkBosses.map((boss) => ({ source: "homework", world: "Homework", ...boss }));
    if (gameMode === "homework") return homeworkBattles;
    if (gameMode === "chapters") return chapterBattles;
    return homeworkBattles.concat(chapterBattles);
  }, [gameMode]);

  const gameQuestion = battles[questionIndex % battles.length];
  const missed = missedTestBank[missedIndex];
  const allCards = useMemo(() => chapters.map((c) => c.card).concat([
    ["First move", "Draw or imagine the situation. Write knowns, unknown, event type, formula, units."],
    ["Event map", "Collision = momentum. Rough patch = friction work. Spring = spring energy. Beam = torque."],
    ["Projectile checklist", "Find time from vertical motion, then solve horizontal motion."],
    ["Newton checklist", "Draw FBD, choose axes, write ΣF = ma."],
    ["Circular motion", "ac = v²/r = ω²r, and ω = 2π/T."]
  ]), []);

  const progress = Math.round((Object.keys(cleared).length / chapters.length) * 100);
  const currentLoot = inventory.slice(-3);

  function earnLoot() {
    const item = lootItems[Math.floor(Math.random() * lootItems.length)];
    setInventory((old) => [...old, item]);
    return item;
  }

  function choose(choice) {
    if (choice === gameQuestion.a) {
      const loot = earnLoot();
      const hype = hypeLines[Math.floor(Math.random() * hypeLines.length)];
      setResult({ kind: "win", text: `Correct. ${gameQuestion.why} Loot gained: ${loot}. ${hype}` });
      setXp((v) => v + 25 + streak * 3);
      setStreak((s) => s + 1);
      if (gameQuestion.source === "chapter") setCleared((old) => ({ ...old, [gameQuestion.chapterId]: true }));
    } else {
      setResult({ kind: "lose", text: `Not this one. Correct answer: ${gameQuestion.a}. ${gameQuestion.why}` });
      setStreak(0);
      setHearts((h) => Math.max(0, h - 1));
    }
  }

  function nextGame() {
    setQuestionIndex((i) => i + 1);
    setResult(null);
  }

  function checkMissed() {
    const user = clean(answer);
    const right = clean(missed.answer);
    if (user && (user.includes(right) || right.includes(user))) {
      const loot = earnLoot();
      setResult({ kind: "win", text: `Comeback complete. ${missed.fix} Loot gained: ${loot}.` });
      setXp((v) => v + 40);
      setStreak((s) => s + 1);
    } else {
      setResult({ kind: "lose", text: `Target answer: ${missed.answer}. ${missed.fix}` });
      setStreak(0);
      setHearts((h) => Math.max(0, h - 1));
    }
  }

  function nextMissed() {
    setMissedIndex((i) => (i + 1) % missedTestBank.length);
    setAnswer("");
    setResult(null);
  }

  function sendBotQuestion() {
    if (!botInput.trim()) return;
    const userText = botInput;
    const reply = askPhysicsBot(userText);
    setBotMessages((old) => [...old, { who: "user", text: userText }, { who: "bot", text: reply }]);
    setBotInput("");
  }

  return (
    <div className="app">
      <style>{styles}</style>
      <div className="app-inner">
        <header className="hero">
          <div className="hero-top">
            <div>
              <p className="app-kicker">Physics 1 Final Boss</p>
              <h1>Study Game</h1>
            </div>
            <div className="heart-badge">❤️ {hearts}</div>
          </div>
          <p className="subtitle">Boss battles, flashcards, missed-test drills, and a formula bot built for your final.</p>
          <div className="stats-grid">
            <div className="stat-box"><span className="stat-num">{xp}</span><span className="stat-label">XP</span></div>
            <div className="stat-box"><span className="stat-num">{streak}</span><span className="stat-label">Streak</span></div>
            <div className="stat-box"><span className="stat-num">{progress}%</span><span className="stat-label">Mastery</span></div>
          </div>
          <div className="progress-track"><div className="progress-fill" style={{ width: `${progress}%` }} /></div>
          {currentLoot.length > 0 ? <p className="loot">Loot: {currentLoot.join(" • ")}</p> : null}
        </header>

        <nav className="tabs">
          {tabs.map((t) => (
            <button key={t} onClick={() => { setTab(t); setResult(null); }} className={`tab-button ${tab === t ? "active" : ""}`}>{t}</button>
          ))}
        </nav>

        {tab === "game" && (
          <main>
            <SectionTitle eyebrow="Battle Mode" title={gameQuestion.boss} subtitle={`${gameQuestion.chapter} • ${gameQuestion.world}`} />
            <div className="segmented">
              <ActionButton active={gameMode === "mixed"} onClick={() => { setGameMode("mixed"); setQuestionIndex(0); setResult(null); }}>Mixed</ActionButton>
              <ActionButton active={gameMode === "homework"} onClick={() => { setGameMode("homework"); setQuestionIndex(0); setResult(null); }}>Homework</ActionButton>
              <ActionButton active={gameMode === "chapters"} onClick={() => { setGameMode("chapters"); setQuestionIndex(0); setResult(null); }}>Chapters</ActionButton>
            </div>
            <CardShell tone="green">
              <TinyPill tone="green">Boss Question</TinyPill>
              <p className="question">{gameQuestion.q}</p>
              {gameQuestion.choices.map((choice) => <ActionButton key={choice} onClick={() => choose(choice)}>{choice}</ActionButton>)}
              {result ? <p className={`feedback ${result.kind}`}>{result.text}</p> : null}
              <ActionButton variant="primary" onClick={nextGame}>Next Battle</ActionButton>
            </CardShell>
            <CardShell tone="blue">
              <p className="card-title">Final Exam Event Map</p>
              {["Collision/recoil → momentum", "Ramp/friction/FBD → Newton", "Height/spring/rough patch → energy", "Beam/cable/pivot → torque", "Sound/frequency/wavelength → waves"].map((x) => <p key={x} className="bullet">• {x}</p>)}
            </CardShell>
          </main>
        )}

        {tab === "learn" && (
          <main>
            <SectionTitle eyebrow="Learn Mode" title={selected.short} subtitle={selected.title} />
            <div className="chapter-scroller">
              {chapters.map((c) => <ActionButton key={c.id} active={selected.id === c.id} onClick={() => setSelectedId(c.id)}>{c.id.toUpperCase()}</ActionButton>)}
            </div>
            <div className="two-col">
              <CardShell tone="blue"><p className="card-title">{selected.boss}</p><p className="body">{selected.bigIdea}</p></CardShell>
              <CardShell tone="green"><p className="card-title">Must Know</p>{selected.mustKnow.map((x) => <p key={x} className="bullet">• {x}</p>)}</CardShell>
            </div>
            <CardShell tone="amber"><p className="card-title">Formula Vault</p>{selected.formulas.map((x) => <code key={x} className="formula">{x}</code>)}</CardShell>
            <CardShell tone="rose"><p className="card-title">Traps</p>{selected.traps.map((x) => <p key={x} className="bullet">⚠ {x}</p>)}</CardShell>
            <CardShell tone="green"><p className="card-title">Examples</p>{selected.examples.map((ex) => <div key={ex.q} className="example-box"><p className="question">{ex.q}</p><p className="body">Steps: {ex.steps}</p><p className="answer">Answer: {ex.a}</p></div>)}</CardShell>
            <ActionButton variant="primary" onClick={() => { setCleared((old) => ({ ...old, [selected.id]: true })); setXp((v) => v + 50); }}>I can teach this chapter</ActionButton>
          </main>
        )}

        {tab === "missed" && (
          <main>
            <SectionTitle eyebrow="Comeback Mode" title={missed.topic} subtitle="These are the old-test traps that steal points." />
            <CardShell tone="rose">
              <p className="body">Likely miss: {missed.likelyMiss}</p>
              <p className="question">{missed.drill}</p>
              <input className="input" value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Type your answer" />
              <ActionButton variant="primary" onClick={checkMissed}>Check</ActionButton>
              {result ? <p className={`feedback ${result.kind}`}>{result.text}</p> : null}
              <ActionButton onClick={nextMissed}>Next Drill</ActionButton>
            </CardShell>
          </main>
        )}

        {tab === "cards" && (
          <main>
            <SectionTitle eyebrow="Flashcard Gym" title={allCards[cardIndex][0]} subtitle={`${cardIndex + 1}/${allCards.length}`} />
            <button className="flashcard" onClick={() => setFlipped((f) => !f)}>
              <div>
                <p className="flash-label">{flipped ? "Answer" : "Tap to reveal"}</p>
                <p className="flash-text">{flipped ? allCards[cardIndex][1] : allCards[cardIndex][0]}</p>
              </div>
            </button>
            <div className="segmented">
              <ActionButton onClick={() => { setCardIndex((i) => (i - 1 + allCards.length) % allCards.length); setFlipped(false); }}>Previous</ActionButton>
              <ActionButton active onClick={() => setFlipped((f) => !f)}>Flip</ActionButton>
              <ActionButton onClick={() => { setCardIndex((i) => (i + 1) % allCards.length); setFlipped(false); }}>Next</ActionButton>
            </div>
          </main>
        )}

        {tab === "bot" && (
          <main>
            <SectionTitle eyebrow="Formula Bot" title="Ask the Physics Bot" subtitle="Describe the problem and it will pick the event type." />
            <CardShell tone="green">
              {botMessages.map((m, i) => <p key={`${m.who}-${i}`} className={`chat ${m.who}`}>{m.text}</p>)}
              <input className="input" value={botInput} onChange={(e) => setBotInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") sendBotQuestion(); }} placeholder="Example: How do I solve a projectile problem?" />
              <ActionButton variant="primary" onClick={sendBotQuestion}>Ask Bot</ActionButton>
            </CardShell>
          </main>
        )}
      </div>
    </div>
  );
}
