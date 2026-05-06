import React, { useMemo, useState } from "react";

const chapters = [
  { id: "ch1", title: "Ch. 1 — Measurement & Units", zone: "Tutorial Island", xp: 100, idea: "Units are part of the answer. Dimensional analysis catches mistakes before math does.", formulas: ["v = d/t", "density = mass/volume", "1 km = 1000 m", "1 h = 3600 s"], traps: ["Dropping units", "Rounding too early", "Converting by vibes"], boss: { q: "A bike travels 300 m in 25 s. Average speed?", a: "12 m/s", hint: "speed = distance/time" } },
  { id: "ch2", title: "Ch. 2 — 1D Motion", zone: "Kinematics Canyon", xp: 160, idea: "Position, velocity, and acceleration tell the story of motion.", formulas: ["v = v0 + at", "x = x0 + v0t + 1/2at^2", "v^2 = v0^2 + 2aDx", "g = 9.8 m/s^2"], traps: ["Mixing velocity and acceleration", "Forgetting signs", "Using the wrong graph rule"], boss: { q: "A car starts from rest and accelerates at 4 m/s^2 for 5 s. Final speed?", a: "20 m/s", hint: "v = v0 + at" } },
  { id: "ch3", title: "Ch. 3 — Vectors & 2D Motion", zone: "Vector Valley", xp: 180, idea: "Break 2D motion into x and y components.", formulas: ["Ax = A cos theta", "Ay = A sin theta", "R = sqrt(Rx^2 + Ry^2)", "tan theta = Ry/Rx"], traps: ["Using sine/cosine backward", "Mixing x and y", "Forgetting ax = 0 for projectiles"], boss: { q: "With no air resistance, horizontal acceleration in projectile motion is?", a: "0", hint: "Gravity acts vertically." } },
  { id: "ch4", title: "Ch. 4 — Newton's Laws", zone: "Force Forest", xp: 230, idea: "Net force causes acceleration. Draw the free-body diagram first.", formulas: ["sum F = ma", "W = mg", "a = Fnet/m"], traps: ["Skipping FBDs", "Calling velocity a force", "Assuming N always equals mg"], boss: { q: "A 5 kg object has net force 15 N. Acceleration?", a: "3 m/s^2", hint: "a = F/m" } },
  { id: "ch5", title: "Ch. 5 — Applying Newton's Laws", zone: "Friction Fortress", xp: 260, idea: "Friction, tension, ramps, and circular motion are Newton's laws in costumes.", formulas: ["fk = mu k N", "fs less than or equal to mu s N", "Fc = mv^2/r", "mg sin theta down ramp"], traps: ["Using mg instead of N on ramps", "Treating centripetal force as a new force", "Mixing static and kinetic friction"], boss: { q: "What component of gravity pulls an object down an incline?", a: "mg sin theta", hint: "Parallel to ramp." } },
  { id: "ch6", title: "Ch. 6 — Work & Energy", zone: "Work-Energy Arena", xp: 280, idea: "Work transfers energy. Energy solves speed, height, distance, and spring problems.", formulas: ["W = Fd cos theta", "K = 1/2mv^2", "Ug = mgh", "Wnet = delta K"], traps: ["Forgetting cos theta", "Thinking all forces do positive work", "Confusing work and power"], boss: { q: "A 4 kg object is lifted 2 m. Gain in gravitational potential energy?", a: "78.4 J", hint: "mgh" } },
  { id: "ch7", title: "Ch. 7 — Conservation of Energy", zone: "Conservation Castle", xp: 330, idea: "Energy changes form. Mechanical energy is conserved only when nonconservative work is zero.", formulas: ["Ki + Ui = Kf + Uf", "Us = 1/2kx^2", "Wnc = delta E mechanical"], traps: ["Conserving mechanical energy with friction", "Forgetting spring energy", "Not defining the system"], boss: { q: "A cart rolls down a frictionless hill. Potential energy becomes?", a: "kinetic energy", hint: "Energy transforms." } },
  { id: "ch8", title: "Ch. 8 — Momentum & Collisions", zone: "Collision Colosseum", xp: 360, idea: "Momentum is conserved in collisions, explosions, and recoil when external forces are negligible.", formulas: ["p = mv", "J = F delta t = delta p", "m1v1i + m2v2i = m1v1f + m2v2f"], traps: ["Conserving kinetic energy in sticky collisions", "Forgetting direction", "Mixing energy and momentum"], boss: { q: "Two carts stick together after colliding. Collision type?", a: "inelastic", hint: "Sticking = perfectly inelastic." } },
  { id: "ch9", title: "Ch. 9 — Rotational Motion", zone: "Rotational Ruins", xp: 380, idea: "Rotation mirrors linear motion: angle, angular velocity, angular acceleration, torque, and moment of inertia.", formulas: ["v = r omega", "a = r alpha", "torque = rF sin theta", "I = sum mr^2"], traps: ["Forgetting radians", "Ignoring lever arm", "Using the wrong mass in inertia"], boss: { q: "A perpendicular 10 N force acts 2 m from a pivot. Torque?", a: "20 N m", hint: "torque = rF" } },
  { id: "ch10", title: "Ch. 10 — Equilibrium & Angular Momentum", zone: "Balance Tower", xp: 410, idea: "Static equilibrium means net force is zero and net torque is zero.", formulas: ["sum F = 0", "sum torque = 0", "L = I omega", "I = Icm + Md^2"], traps: ["Bad pivot choice", "Forgetting torque balance", "Using total length instead of distance from pivot"], boss: { q: "For static equilibrium, net force and net torque equal?", a: "0", hint: "No acceleration." } },
  { id: "ch11", title: "Ch. 11 — Gravity", zone: "Orbital Outlands", xp: 410, idea: "Gravity is universal, attractive, and inverse-square.", formulas: ["Fg = Gm1m2/r^2", "g = GM/r^2", "v = sqrt(GM/r)"], traps: ["Forgetting inverse square", "Using altitude instead of radius", "Thinking orbit means no gravity"], boss: { q: "If distance between masses triples, gravity becomes what fraction?", a: "1/9", hint: "inverse square" } },
  { id: "ch12", title: "Ch. 12 — Fluids", zone: "Fluid Dungeon", xp: 340, idea: "Fluids create pressure, buoyancy, and flow effects.", formulas: ["density = m/V", "P = F/A", "P = P0 + rho gh", "Fb = rho fluid Vg", "A1v1 = A2v2"], traps: ["Confusing object density and fluid density", "Forgetting pressure increases with depth", "Treating buoyancy like magic"], boss: { q: "Buoyant force equals the weight of what?", a: "displaced fluid", hint: "Archimedes." } },
  { id: "ch13", title: "Ch. 13 — Oscillations & Waves", zone: "Wave Temple", xp: 430, idea: "Oscillations repeat in time. Waves carry energy through space.", formulas: ["T = 1/f", "v = f lambda", "spring period = 2pi sqrt(m/k)", "pendulum period = 2pi sqrt(L/g)"], traps: ["Confusing period and frequency", "Ignoring Hz = 1/s", "Mixing wavelength and amplitude"], boss: { q: "If period is 0.25 s, frequency?", a: "4 Hz", hint: "f = 1/T" } },
  { id: "ch14", title: "Ch. 14.1–14.4 — Sound", zone: "Soundwave Citadel", xp: 460, idea: "Sound is a longitudinal mechanical wave. Decibels are logarithmic.", formulas: ["beta = 10 log(I/I0)", "v = f lambda", "open pipe: fn = nv/2L", "closed pipe: fn = nv/4L for odd n"], traps: ["Treating dB as linear", "Confusing pitch and loudness", "Using open-pipe formula for closed pipes"], boss: { q: "A sound wave has f = 440 Hz and wavelength 0.78 m. Speed?", a: "343 m/s", hint: "v = f lambda" } }
];

const importantExamples = {
  ch1: [
    { name: "Unit conversion", setup: "Convert 72 km/h to m/s.", steps: "72 km/h x 1000 m/km x 1 h/3600 s = 20 m/s", answer: "20 m/s" },
    { name: "Dimensional check", setup: "A formula gives meters/second for a speed question.", steps: "Speed must be distance/time, so m/s is reasonable.", answer: "Unit check passes." }
  ],
  ch2: [
    { name: "Constant acceleration", setup: "A car starts from rest and accelerates at 3 m/s^2 for 6 s.", steps: "v = v0 + at = 0 + 3(6)", answer: "18 m/s" },
    { name: "Free fall distance", setup: "A rock drops from rest for 2 s.", steps: "y = 1/2gt^2 = 1/2(9.8)(2^2)", answer: "19.6 m" }
  ],
  ch3: [
    { name: "Vector components", setup: "A 50 N force acts 30 degrees above horizontal.", steps: "Fx = 50 cos30, Fy = 50 sin30", answer: "Fx = 43.3 N, Fy = 25 N" },
    { name: "Projectile rule", setup: "A ball is launched horizontally from a table.", steps: "Horizontal motion has constant velocity; vertical motion accelerates at g.", answer: "ax = 0, ay = -9.8 m/s^2" }
  ],
  ch4: [
    { name: "Net force", setup: "A 10 kg box has 40 N right and 10 N left.", steps: "Fnet = 40 - 10 = 30 N. a = Fnet/m = 30/10", answer: "3 m/s^2 right" },
    { name: "Weight", setup: "Find weight of a 6 kg object.", steps: "W = mg = 6(9.8)", answer: "58.8 N" }
  ],
  ch5: [
    { name: "Incline component", setup: "A block sits on a 30 degree ramp.", steps: "Down-ramp gravity = mg sin30. Normal = mg cos30.", answer: "Use ramp axes." },
    { name: "Circular motion", setup: "A 1000 kg car turns at 20 m/s on radius 50 m.", steps: "Fc = mv^2/r = 1000(20^2)/50", answer: "8000 N" }
  ],
  ch6: [
    { name: "Work angle", setup: "A 100 N force pulls 5 m at 60 degrees.", steps: "W = Fd cos theta = 100(5)cos60", answer: "250 J" },
    { name: "Kinetic energy", setup: "A 2 kg object moves at 4 m/s.", steps: "K = 1/2mv^2 = 1/2(2)(4^2)", answer: "16 J" }
  ],
  ch7: [
    { name: "Frictionless hill", setup: "A 5 kg cart drops 3 m from rest.", steps: "mgh = 1/2mv^2. Mass cancels. v = sqrt(2gh).", answer: "7.67 m/s" },
    { name: "Spring energy", setup: "k = 200 N/m, x = 0.10 m.", steps: "Us = 1/2kx^2 = 1/2(200)(0.10^2)", answer: "1 J" }
  ],
  ch8: [
    { name: "Sticky collision", setup: "2 kg at 6 m/s sticks to 4 kg at rest.", steps: "m1v1 = (m1+m2)V, so 2(6)=6V", answer: "V = 2 m/s" },
    { name: "Impulse", setup: "A force of 20 N acts for 0.5 s.", steps: "J = F delta t = 20(0.5)", answer: "10 N s" }
  ],
  ch9: [
    { name: "Point-mass inertia", setup: "Masses M at 0, L/2, and L from axis.", steps: "I = sum mr^2 = M(0)^2 + M(L/2)^2 + M(L)^2", answer: "5ML^2/4" },
    { name: "Torque", setup: "A 12 N perpendicular force acts 0.5 m from pivot.", steps: "torque = rF = 0.5(12)", answer: "6 N m" }
  ],
  ch10: [
    { name: "Static beam", setup: "A beam is not rotating or accelerating.", steps: "Use sum F = 0 and sum torque = 0. Pick pivot at unknown wall force.", answer: "Torque equation gets easier." },
    { name: "Parallel axis", setup: "Rod inertia about an off-center axis.", steps: "I = Icm + Md^2", answer: "Use distance from center of mass to new axis." }
  ],
  ch11: [
    { name: "Inverse square", setup: "Distance between two masses doubles.", steps: "Gravity scales as 1/r^2.", answer: "Force becomes 1/4 as large." },
    { name: "Orbit setup", setup: "Satellite in circular orbit.", steps: "Set gravity equal to centripetal force: GMm/r^2 = mv^2/r.", answer: "v = sqrt(GM/r)" }
  ],
  ch12: [
    { name: "Pressure at depth", setup: "Water depth increases by 2 m.", steps: "Extra pressure = rho gh = 1000(9.8)(2)", answer: "19600 Pa" },
    { name: "Buoyancy", setup: "Object displaces 0.01 m^3 of water.", steps: "Fb = rho fluid Vg = 1000(0.01)(9.8)", answer: "98 N" }
  ],
  ch13: [
    { name: "Wave speed", setup: "Frequency = 5 Hz, wavelength = 2 m.", steps: "v = f lambda = 5(2)", answer: "10 m/s" },
    { name: "Period-frequency", setup: "Period is 0.25 s.", steps: "f = 1/T = 1/0.25", answer: "4 Hz" }
  ],
  ch14: [
    { name: "Sound wave speed", setup: "f = 440 Hz and wavelength = 0.78 m.", steps: "v = f lambda = 440(0.78)", answer: "343 m/s" },
    { name: "Decibel jump", setup: "Intensity increases by factor of 100.", steps: "100 = 10^2, so decibel change = 20 dB.", answer: "+20 dB" }
  ]
};

const missions = [
  { name: "Graph Goblin Ambush", chapter: "Ch. 2", prompt: "On a position-time graph, what does slope mean?", choices: ["Velocity", "Acceleration", "Force", "Mass"], answer: "Velocity", lesson: "Position-time slope = velocity." },
  { name: "Free-Body Haunted House", chapter: "Ch. 4", prompt: "A book rests on a table. Which forces belong on the book's FBD?", choices: ["Weight down and normal up", "Only weight", "Velocity", "Normal down"], answer: "Weight down and normal up", lesson: "Only forces go on FBDs." },
  { name: "Energy Dragon Bridge", chapter: "Ch. 6–7", prompt: "A coaster drops down a frictionless hill. Potential energy becomes what?", choices: ["Kinetic energy", "Mass", "Normal force", "Nothing"], answer: "Kinetic energy", lesson: "No friction means mechanical energy is conserved." },
  { name: "Momentum Bumper Cars", chapter: "Ch. 8", prompt: "Two carts collide and stick. What is conserved?", choices: ["Momentum", "Kinetic energy", "Speed", "Acceleration"], answer: "Momentum", lesson: "Sticky collision = momentum conserved, KE not conserved." },
  { name: "Torque Troll Drawbridge", chapter: "Ch. 9–10", prompt: "To open a door most easily, where do you push?", choices: ["Far from hinge", "At hinge", "Anywhere", "Straight into hinge"], answer: "Far from hinge", lesson: "Torque grows with lever arm." },
  { name: "Decibel Wizard Duel", chapter: "Ch. 14", prompt: "Intensity increases by factor of 10. Sound level changes by?", choices: ["10 dB", "2 dB", "100 dB", "0.1 dB"], answer: "10 dB", lesson: "Every 10x intensity = plus 10 dB." }
];

const missedTestBank = [
  { topic: "Q3 — Elastic collision: huge mass hits tiny mass", likelyMiss: "You treated the tiny object as leaving with the original heavy-object speed.", fix: "Elastic collision shortcut: huge mass barely slows, tiny mass leaves at about 2V. If V = 20 m/s, answer is about 40 m/s.", drill: "Huge cart at 12 m/s elastically hits tiny cart at rest. Tiny cart leaves at about?", answer: "24 m/s" },
  { topic: "Q5 — Work angle ranking", likelyMiss: "You said all work was the same because F and d were the same.", fix: "Work is W = Fd cos theta. Horizontal force does the most. Steeper angle does less. Least to greatest: 3, 2, 1.", drill: "Which does more work for same F and d: horizontal pull or 60 degree upward pull?", answer: "horizontal" },
  { topic: "Q7 — Point-mass moment of inertia", likelyMiss: "You put every mass at distance L.", fix: "Use I = sum mr^2. For masses at 0, L/2, L: I = 0 + ML^2/4 + ML^2 = 5ML^2/4.", drill: "Masses M at 0, L/2, and L. What is I?", answer: "5ML^2/4" },
  { topic: "Q9 — Hanging mass turning wheel", likelyMiss: "You used the hanging block's mass in I = 1/2MR^2.", fix: "Find a from kinematics, then use mg - T = ma and TR = I alpha with alpha = a/R. The M in disk inertia is the wheel mass.", drill: "In I = 1/2MR^2 for the wheel, M is what mass?", answer: "wheel mass" },
  { topic: "Q10 — Rod inertia integration", likelyMiss: "You did not show clean integral limits and dm substitution.", fix: "Use dm = (M/L)dx. Axis at L/3 from one end gives limits -L/3 to 2L/3. Result: ML^2/9.", drill: "For a uniform rod, dm equals what?", answer: "M/L dx" },
  { topic: "Q11 — Ballistic pendulum", likelyMiss: "You used energy through a sticky collision.", fix: "Use energy before collision, momentum during sticky collision, energy after collision. Final height is about 0.22 m.", drill: "In a sticky collision, conserve momentum or kinetic energy?", answer: "momentum" },
  { topic: "Q12 — Rough patch and spring", likelyMiss: "You used force formulas when energy was cleaner.", fix: "Ramp: mgh to KE. Rough patch: subtract mu mgd. Spring: remaining KE = 1/2kx^2. Results: 6.26 m/s, 4.64 m/s, 0.134 m.", drill: "A rough patch removes energy by what formula?", answer: "mu mg d" },
  { topic: "Q13 — Beam and cable torque", likelyMiss: "You did not torque about the wall cleanly or use the cable's vertical component.", fix: "Torque about wall: T sin45(1 m) = 1000g(2 m) + 100g(4 m). T is about 3.3 x 10^4 N.", drill: "Which component of cable tension supports torque against weight?", answer: "vertical component" },
  { topic: "Core rule — Identify the event first", likelyMiss: "You picked familiar formulas before naming the event.", fix: "Collision = momentum. Rough patch = friction work. Spring = spring energy. Beam = torque. Wheel = torque plus angular acceleration. Angled force = work component.", drill: "Before choosing a formula, identify the what?", answer: "event" }
];

const flashcards = [
  ["First move on almost every physics problem?", "Picture, knowns, unknown, event, formula, units."],
  ["Position-time slope?", "Velocity."],
  ["Velocity-time area?", "Displacement."],
  ["Newton's second law?", "sum F = ma."],
  ["Work formula with angle?", "W = Fd cos theta."],
  ["Sticky collision conserves?", "Momentum, not kinetic energy."],
  ["Static equilibrium conditions?", "sum F = 0 and sum torque = 0."],
  ["Wave equation?", "v = f lambda."],
  ["10x intensity change?", "plus 10 dB."],
  ["Moment of inertia for point masses?", "I = sum mr^2." ]
];

const finalPlan = [
  "Run Missed Test Lab until every actual Test #2 mistake is green.",
  "Beat Arcade Mode twice with zero lives lost.",
  "Clear every Boss Battle without notes.",
  "Use Formula Coach on every ugly word problem.",
  "Teach each missed-test fix out loud in under 60 seconds."
];

function clean(text) {
  return String(text).toLowerCase().trim();
}

function rankName(progress, expertProgress) {
  if (progress === 100 && expertProgress === 100) return "Final Boss Slayer";
  if (progress >= 85) return "Exam Weapon";
  if (progress >= 60) return "Physics Problem Hunter";
  if (progress >= 30) return "Formula Fighter";
  return "Physics Recruit";
}

function Stat({ icon, label, value }) {
  return <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-xl"><div className="flex items-center gap-2 text-sm text-slate-300"><span>{icon}</span>{label}</div><div className="mt-2 text-xl font-black">{value}</div></div>;
}

function Panel({ title, children, tone = "cyan" }) {
  const cls = tone === "rose" ? "border-rose-300/20 bg-rose-300/10" : tone === "amber" ? "border-amber-300/20 bg-amber-300/10" : tone === "emerald" ? "border-emerald-300/20 bg-emerald-300/10" : "border-cyan-300/20 bg-cyan-300/10";
  return <div className={`rounded-2xl border p-4 ${cls}`}><h3 className="mb-2 text-lg font-black">{title}</h3><div className="leading-7 text-slate-100/90">{children}</div></div>;
}

export default function PhysicsFinalBossStudyGame() {
  const [tab, setTab] = useState("learn");
  const [selectedId, setSelectedId] = useState("ch1");
  const [completed, setCompleted] = useState({});
  const [expert, setExpert] = useState({});
  const [mistakes, setMistakes] = useState({});
  const [search, setSearch] = useState("");
  const [bossInput, setBossInput] = useState("");
  const [bossResult, setBossResult] = useState(null);
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [coachText, setCoachText] = useState("");
  const [coachResult, setCoachResult] = useState("Paste a problem and I will tell you the first move.");
  const [rushIndex, setRushIndex] = useState(0);
  const [rushScore, setRushScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [streak, setStreak] = useState(0);
  const [coins, setCoins] = useState(0);
  const [missionIndex, setMissionIndex] = useState(0);
  const [missionResult, setMissionResult] = useState(null);
  const [missedIndex, setMissedIndex] = useState(0);
  const [missedInput, setMissedInput] = useState("");
  const [missedResult, setMissedResult] = useState(null);

  const selected = chapters.find((c) => c.id === selectedId) || chapters[0];
  const cleared = Object.values(completed).filter(Boolean).length;
  const expertCount = Object.values(expert).filter(Boolean).length;
  const progress = Math.round((cleared / chapters.length) * 100);
  const expertProgress = Math.round((expertCount / chapters.length) * 100);
  const xp = chapters.reduce((sum, c) => sum + (completed[c.id] ? c.xp : 0) + (expert[c.id] ? Math.round(c.xp * 0.5) : 0), 0) + coins;
  const redFlags = Object.values(mistakes).reduce((a, b) => a + b, 0);
  const mission = missions[missionIndex];
  const missed = missedTestBank[missedIndex];
  const examples = importantExamples[selected.id] || [];

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return chapters.filter((c) => [c.title, c.zone, c.idea, c.formulas.join(" ")].join(" ").toLowerCase().includes(q));
  }, [search]);

  function checkBoss() {
    const user = clean(bossInput);
    const answer = clean(selected.boss.a);
    const ok = user === answer || user.includes(answer) || answer.includes(user);
    if (ok) {
      setCompleted((p) => ({ ...p, [selected.id]: true }));
      setBossResult("win");
      setCoins((c) => c + 20);
      setStreak((s) => s + 1);
    } else {
      setMistakes((p) => ({ ...p, [selected.id]: (p[selected.id] || 0) + 1 }));
      setBossResult("try");
      setLives((v) => Math.max(0, v - 1));
      setStreak(0);
    }
  }

  function answerMission(choice) {
    if (choice === mission.answer) {
      setMissionResult("win");
      setCoins((c) => c + 25);
      setStreak((s) => s + 1);
    } else {
      setMissionResult("try");
      setLives((v) => Math.max(0, v - 1));
      setStreak(0);
    }
  }

  function checkMissed() {
    const user = clean(missedInput);
    const answer = clean(missed.answer);
    if (user.includes(answer) || answer.includes(user)) {
      setMissedResult("win");
      setCoins((c) => c + 30);
      setStreak((s) => s + 1);
    } else {
      setMissedResult("try");
      setLives((v) => Math.max(0, v - 1));
      setStreak(0);
    }
  }

  function runCoach() {
    const t = coachText.toLowerCase();
    if (t.includes("collide") || t.includes("stick") || t.includes("collision")) setCoachResult("Collision detected: use momentum. If they stick, kinetic energy is NOT conserved.");
    else if (t.includes("rough") || t.includes("friction")) setCoachResult("Rough patch detected: use friction work. Energy lost = mu mgd on flat ground.");
    else if (t.includes("spring")) setCoachResult("Spring detected: use energy. 1/2kx^2 equals the kinetic energy available at maximum compression.");
    else if (t.includes("beam") || t.includes("cable") || t.includes("torque")) setCoachResult("Static equilibrium detected: choose a pivot and use net torque = 0. Use only the perpendicular component of force.");
    else if (t.includes("wheel") || t.includes("pulley") || t.includes("rotate")) setCoachResult("Rotation detected: combine linear motion with torque. Use alpha = a/R and torque = I alpha.");
    else if (t.includes("sound") || t.includes("wave") || t.includes("frequency")) setCoachResult("Wave detected: start with v = f lambda or T = 1/f. For decibels, remember logarithms.");
    else setCoachResult("First move: draw the picture, list knowns, identify the event, then choose the formula. Do not start with calculator chaos.");
  }

  function reset() {
    setCompleted({}); setExpert({}); setMistakes({}); setBossInput(""); setBossResult(null); setRushIndex(0); setRushScore(0); setLives(3); setStreak(0); setCoins(0); setMissionIndex(0); setMissionResult(null); setMissedIndex(0); setMissedInput(""); setMissedResult(null);
  }

  const tabs = ["learn", "dojo", "game", "missed", "boss", "coach", "rush", "cards"];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-8">
        <section className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-5">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-cyan-400/15 px-3 py-1 text-sm text-cyan-200">🎮 Physics 1 Final RPG</span>
              <span className="rounded-full bg-amber-400/15 px-3 py-1 text-sm text-amber-200">XP: {xp}</span>
              <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-sm text-emerald-200">Coins: {coins}</span>
              <span className="rounded-full bg-rose-400/15 px-3 py-1 text-sm text-rose-200">Lives: {"❤️".repeat(lives) || "Game Over"}</span>
              <span className="rounded-full bg-orange-400/15 px-3 py-1 text-sm text-orange-200">Streak: {streak}</span>
            </div>
            <h1 className="text-4xl font-black tracking-tight md:text-6xl">Physics 1 Final Boss Study Game</h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-300">Built from Chapters 1–14.4 plus your actual Test #2 mistakes. Beat the traps until they cannot beat you on Wednesday.</p>
            <div className="grid gap-4 sm:grid-cols-4">
              <Stat icon="🏆" label="Rank" value={rankName(progress, expertProgress)} />
              <Stat icon="🎯" label="Chapters" value={`${cleared}/${chapters.length}`} />
              <Stat icon="👑" label="Expert" value={`${expertCount}/${chapters.length}`} />
              <Stat icon="⚠️" label="Misses" value={redFlags} />
            </div>
          </div>
          <div className="rounded-3xl border border-cyan-300/20 bg-slate-900/80 p-5 shadow-2xl">
            <div className="flex items-center justify-between"><div><div className="text-sm uppercase tracking-widest text-cyan-200">Final Readiness</div><div className="text-3xl font-black">{progress}% cleared</div></div><div className="text-4xl">🔥</div></div>
            <div className="mt-4 h-3 rounded-full bg-slate-800"><div className="h-3 rounded-full bg-cyan-300" style={{ width: `${progress}%` }} /></div>
            <div className="mt-5 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4"><div className="font-black text-amber-100">Wednesday Protocol</div>{finalPlan.map((p, i) => <div key={p} className="mt-2 text-sm text-amber-50/90"><b>Pass {i + 1}:</b> {p}</div>)}</div>
            <button onClick={reset} className="mt-4 w-full rounded-xl border border-white/20 bg-white/5 px-4 py-2 font-bold hover:bg-white/10">Reset Campaign</button>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <aside className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="mb-4 flex items-center gap-2"><span>🔎</span><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search chapters/formulas..." className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2 text-white" /></div>
            <div className="grid max-h-[780px] gap-3 overflow-y-auto pr-1">
              {filtered.map((c) => <button key={c.id} onClick={() => { setSelectedId(c.id); setBossInput(""); setBossResult(null); }} className={`rounded-2xl border p-4 text-left ${selectedId === c.id ? "border-cyan-300 bg-cyan-300/10" : "border-white/10 bg-slate-900/70 hover:bg-white/10"}`}><div className="flex justify-between gap-2"><div><div className="font-black">{c.title}</div><div className="text-sm text-slate-400">{c.zone}</div></div><div>{completed[c.id] ? "✅" : ""}{expert[c.id] ? "👑" : ""}</div></div><div className="mt-2 text-sm text-slate-300">{c.xp} XP</div></button>)}
            </div>
          </aside>

          <main className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 shadow-2xl">
            <div className="mb-5 grid grid-cols-4 gap-2 md:grid-cols-8">{tabs.map((t) => <button key={t} onClick={() => setTab(t)} className={`rounded-xl px-2 py-2 text-sm font-bold capitalize ${tab === t ? "bg-cyan-300 text-slate-950" : "bg-slate-950/70 text-slate-200 hover:bg-white/10"}`}>{t}</button>)}</div>

            {tab === "learn" && <div className="space-y-5"><div><div className="text-sm uppercase tracking-widest text-cyan-200">{selected.zone}</div><h2 className="text-3xl font-black">{selected.title}</h2></div><Panel title="Big Idea">{selected.idea}</Panel><Panel title="Formula Vault" tone="amber"><div className="grid gap-2 sm:grid-cols-2">{selected.formulas.map((f) => <code key={f} className="rounded-xl bg-slate-950/70 p-3">{f}</code>)}</div></Panel><Panel title="Important Examples" tone="emerald"><div className="grid gap-3">{examples.map((ex) => <div key={ex.name} className="rounded-xl bg-slate-950/60 p-4"><div className="font-black text-emerald-100">{ex.name}</div><div className="mt-1"><b>Setup:</b> {ex.setup}</div><div className="mt-1"><b>Steps:</b> {ex.steps}</div><div className="mt-1 text-amber-100"><b>Answer:</b> {ex.answer}</div></div>)}</div></Panel><Panel title="Traps to Avoid" tone="rose">{selected.traps.map((t) => <div key={t}>⚠ {t}</div>)}</Panel></div>}

            {tab === "dojo" && <div className="space-y-5"><h2 className="text-3xl font-black">📖 Worked Example Dojo</h2><Panel title="How to train this chapter"><ol className="list-decimal space-y-2 pl-5"><li>Say the big idea out loud.</li><li>Write each formula and what every symbol means.</li><li>Make up a tiny example with easy numbers.</li><li>Explain which trap would make you lose points.</li></ol></Panel><Panel title="Mastery Proof" tone="emerald"><button onClick={() => { setExpert((p) => ({ ...p, [selected.id]: true })); setCompleted((p) => ({ ...p, [selected.id]: true })); setCoins((c) => c + 15); }} className="rounded-xl bg-amber-300 px-4 py-2 font-black text-slate-950">👑 I can teach this chapter</button></Panel></div>}

            {tab === "game" && <div className="space-y-5"><h2 className="text-3xl font-black">🎮 Arcade Mode</h2><Panel title={`${mission.name} — ${mission.chapter}`} tone="emerald"><p className="mb-4 text-lg">{mission.prompt}</p><div className="grid gap-3 sm:grid-cols-2">{mission.choices.map((choice) => <button key={choice} onClick={() => answerMission(choice)} className="rounded-xl border border-white/20 bg-slate-950/60 p-3 font-bold hover:bg-white/10">{choice}</button>)}</div>{missionResult && <div className="mt-4 rounded-xl bg-slate-950/60 p-3">{missionResult === "win" ? "✅ Correct. " : "⚠️ Trap hit. "}{mission.lesson}</div>}<button onClick={() => { setMissionIndex((i) => (i + 1) % missions.length); setMissionResult(null); }} className="mt-4 rounded-xl bg-emerald-300 px-4 py-2 font-black text-slate-950">Next Mission</button></Panel></div>}

            {tab === "missed" && <div className="space-y-5"><h2 className="text-3xl font-black">⚠️ Actual Test #2 Comeback Lab</h2><p className="text-slate-300">These drills are based on your uploaded test pages.</p><Panel title={missed.topic} tone="rose"><p><b>Likely miss:</b> {missed.likelyMiss}</p><p className="mt-2"><b>Fix:</b> {missed.fix}</p><div className="mt-4 rounded-xl bg-slate-950/60 p-4"><b>Drill:</b> {missed.drill}<div className="mt-3 flex gap-2"><input value={missedInput} onChange={(e) => setMissedInput(e.target.value)} className="w-full rounded-xl bg-slate-950 px-3 py-2 text-white" placeholder="Your answer..." /><button onClick={checkMissed} className="rounded-xl bg-rose-300 px-4 py-2 font-black text-slate-950">Check</button></div>{missedResult && <div className="mt-3">{missedResult === "win" ? "✅ Fixed. That mistake is losing power." : `⚠️ Review target answer: ${missed.answer}`}</div>}</div><div className="mt-4 flex gap-2"><button onClick={() => { setMissedIndex((i) => (i + missedTestBank.length - 1) % missedTestBank.length); setMissedInput(""); setMissedResult(null); }} className="rounded-xl border border-white/20 px-4 py-2">Previous</button><button onClick={() => { setMissedIndex((i) => (i + 1) % missedTestBank.length); setMissedInput(""); setMissedResult(null); }} className="rounded-xl bg-rose-300 px-4 py-2 font-black text-slate-950">Next Weak Spot</button></div></Panel></div>}

            {tab === "boss" && <div className="space-y-5"><h2 className="text-3xl font-black">⚔️ Chapter Boss</h2><Panel title={selected.title} tone="rose"><p className="text-lg">{selected.boss.q}</p><div className="mt-4 flex gap-2"><input value={bossInput} onChange={(e) => setBossInput(e.target.value)} className="w-full rounded-xl bg-slate-950 px-3 py-2 text-white" placeholder="Type answer..." /><button onClick={checkBoss} className="rounded-xl bg-rose-300 px-4 py-2 font-black text-slate-950">Attack</button></div>{bossResult && <div className="mt-3 rounded-xl bg-slate-950/60 p-3">{bossResult === "win" ? `✅ Critical hit. +${selected.xp} XP.` : `⚠️ Try again. Hint: ${selected.boss.hint}`}</div>}</Panel></div>}

            {tab === "coach" && <div className="space-y-5"><h2 className="text-3xl font-black">💡 Formula Choice Coach</h2><Panel title="Paste a problem"><textarea value={coachText} onChange={(e) => setCoachText(e.target.value)} className="min-h-28 w-full rounded-xl bg-slate-950 p-3 text-white" placeholder="Example: A block slides over a rough patch then hits a spring..." /><button onClick={runCoach} className="mt-3 rounded-xl bg-cyan-300 px-4 py-2 font-black text-slate-950">Diagnose</button><div className="mt-4 rounded-xl bg-slate-950/60 p-4">{coachResult}</div></Panel></div>}

            {tab === "rush" && <div className="space-y-5"><h2 className="text-3xl font-black">⏲️ Boss Rush</h2><Panel title={`Question ${rushIndex + 1} / ${chapters.length}`} tone="emerald"><p>{chapters[rushIndex].boss.q}</p><div className="mt-4 flex gap-2"><button onClick={() => { setRushScore((s) => s + 1); setCoins((c) => c + 10); setStreak((s) => s + 1); setRushIndex((i) => (i + 1) % chapters.length); }} className="rounded-xl bg-emerald-300 px-4 py-2 font-black text-slate-950">I got it right</button><button onClick={() => { setLives((v) => Math.max(0, v - 1)); setStreak(0); setRushIndex((i) => (i + 1) % chapters.length); }} className="rounded-xl border border-white/20 px-4 py-2">I missed it</button></div><div className="mt-3 text-slate-300">Answer: {chapters[rushIndex].boss.a}</div><div className="mt-3 font-black">Rush Score: {rushScore}</div></Panel></div>}

            {tab === "cards" && <div className="space-y-5"><h2 className="text-3xl font-black">🏋️ Flashcard Gym</h2><button onClick={() => setFlipped((f) => !f)} className="min-h-52 w-full rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-8 text-center text-2xl font-black">{flipped ? flashcards[cardIndex][1] : flashcards[cardIndex][0]}</button><div className="flex gap-2"><button onClick={() => { setCardIndex((i) => (i + 1) % flashcards.length); setFlipped(false); }} className="flex-1 rounded-xl bg-cyan-300 px-4 py-2 font-black text-slate-950">Next Card</button><button onClick={() => setFlipped((f) => !f)} className="rounded-xl border border-white/20 px-4 py-2">Flip</button></div></div>}
          </main>
          
        </section>
      </div>
    </div>
  );

}