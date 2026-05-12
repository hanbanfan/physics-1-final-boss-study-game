import React, { useMemo, useState } from "react";

const chapters = [
  {
    id: "ch1",
    title: "Ch. 1 — Measurement & Units",
    world: "Tutorial Island",
    boss: "Unit Goblin",
    bigIdea: "Units are part of the answer. If the units are wrong, the physics is wrong.",
    mustKnow: ["SI units", "unit conversion", "scientific notation", "significant figures", "dimensional analysis"],
    learnDeep: [
      "Write units on every number before doing math.",
      "Use dimensional analysis like a spell-checker for physics.",
      "If the problem asks for speed, the final unit should be distance/time.",
      "Most unit mistakes happen because you convert mentally instead of canceling units on paper."
    ],
    formulas: ["v = d/t", "density = mass/volume", "1 km = 1000 m", "1 h = 3600 s"],
    traps: ["Dropping units", "Rounding too early", "Converting without canceling units"],
    examples: [
      { q: "Convert 72 km/h to m/s.", steps: "72 x 1000 / 3600", a: "20 m/s" },
      { q: "A 12 kg object has volume 3 m^3. Density?", steps: "density = m/V = 12/3", a: "4 kg/m^3" }
    ],
    game: { q: "A runner travels 100 m in 10 s. Speed?", choices: ["10 m/s", "1000 m/s", "0.1 m/s", "90 m/s"], a: "10 m/s", why: "speed = distance/time = 100/10 = 10 m/s." },
    card: ["Dimensional analysis", "Cancel units like algebra before calculating."]
  },
  {
    id: "ch2",
    title: "Ch. 2 — One-Dimensional Motion",
    world: "Kinematics Canyon",
    boss: "Acceleration Serpent",
    bigIdea: "Motion problems are stories about position, velocity, acceleration, and time.",
    mustKnow: ["displacement", "velocity", "acceleration", "free fall", "motion graphs"],
    learnDeep: [
      "Position tells where you are; displacement tells change in position.",
      "Velocity is how fast position changes; acceleration is how fast velocity changes.",
      "On graphs: position-time slope is velocity, velocity-time slope is acceleration, velocity-time area is displacement.",
      "Free fall is constant acceleration with g = 9.8 m/s^2."
    ],
    formulas: ["v = v0 + at", "x = x0 + v0t + 1/2at^2", "v^2 = v0^2 + 2aDx", "g = 9.8 m/s^2"],
    traps: ["Mixing velocity and acceleration", "Forgetting signs", "Confusing graph slope and area"],
    examples: [
      { q: "A car starts from rest and accelerates at 3 m/s^2 for 6 s. Final speed?", steps: "v = v0 + at = 0 + 3(6)", a: "18 m/s" },
      { q: "A rock drops from rest for 2 s. Distance?", steps: "y = 1/2gt^2 = 1/2(9.8)(4)", a: "19.6 m" }
    ],
    game: { q: "On a position-time graph, slope means what?", choices: ["Velocity", "Acceleration", "Force", "Mass"], a: "Velocity", why: "Slope of position-time is velocity. Area under velocity-time is displacement." },
    card: ["Position-time slope", "Velocity."]
  },
  {
    id: "ch3",
    title: "Ch. 3 — Vectors & 2D Motion",
    world: "Vector Valley",
    boss: "Projectile Dragon",
    bigIdea: "Two-dimensional motion becomes manageable when you split vectors into x and y components.",
    mustKnow: ["components", "resultants", "projectile motion", "trig", "independent x/y motion"],
    learnDeep: [
      "Split every angled vector into x and y pieces before solving.",
      "Projectile motion is two problems at once: horizontal constant velocity and vertical acceleration.",
      "If the angle is measured from the horizontal, x usually uses cosine and y usually uses sine.",
      "The x and y motions share time, but they do not share acceleration."
    ],
    formulas: ["Ax = A cos theta", "Ay = A sin theta", "R = sqrt(Rx^2 + Ry^2)", "tan theta = Ry/Rx"],
    traps: ["Using sine/cosine backward", "Mixing x and y equations", "Forgetting horizontal acceleration is zero"],
    examples: [
      { q: "A 50 N force acts 30 degrees above horizontal. Find components.", steps: "Fx = 50cos30, Fy = 50sin30", a: "Fx = 43.3 N, Fy = 25 N" },
      { q: "A ball rolls horizontally off a table. What is ax?", steps: "Gravity acts vertically only.", a: "ax = 0" }
    ],
    game: { q: "Projectile motion has horizontal acceleration equal to what?", choices: ["0", "9.8 m/s^2", "v/t", "mg"], a: "0", why: "Ignoring air resistance, gravity only accelerates vertically." },
    card: ["Projectile motion", "x motion is constant velocity; y motion accelerates by gravity."]
  },
  {
    id: "ch4",
    title: "Ch. 4 — Newton's Laws",
    world: "Force Forest",
    boss: "Free-Body Phantom",
    bigIdea: "Forces cause acceleration. Free-body diagrams turn chaos into equations.",
    mustKnow: ["Newton's laws", "free-body diagrams", "net force", "weight", "normal force"],
    learnDeep: [
      "Draw the free-body diagram before writing equations.",
      "Only forces go on a free-body diagram. Velocity is not a force.",
      "Net force is what is left after forces fight each other.",
      "Normal force is a support force, not automatically equal to mg in every situation."
    ],
    formulas: ["sum F = ma", "W = mg", "a = Fnet/m"],
    traps: ["Skipping the FBD", "Calling velocity a force", "Assuming normal force always equals mg"],
    examples: [
      { q: "40 N right and 10 N left act on a 10 kg box. Acceleration?", steps: "Fnet = 30 N, a = 30/10", a: "3 m/s^2 right" },
      { q: "Find weight of a 6 kg object.", steps: "W = mg = 6(9.8)", a: "58.8 N" }
    ],
    game: { q: "A 5 kg object has net force 15 N. Acceleration?", choices: ["3 m/s^2", "75 m/s^2", "10 m/s^2", "0.33 m/s^2"], a: "3 m/s^2", why: "a = F/m = 15/5 = 3 m/s^2." },
    card: ["Newton's second law", "sum F = ma."]
  },
  {
    id: "ch5",
    title: "Ch. 5 — Applying Newton's Laws",
    world: "Friction Fortress",
    boss: "Ramp Troll",
    bigIdea: "Friction, tension, inclines, and circular motion are Newton's laws in disguise.",
    mustKnow: ["friction", "tension", "inclines", "centripetal acceleration", "circular force"],
    learnDeep: [
      "For ramps, rotate your axes so one axis lies along the ramp.",
      "Friction depends on normal force, not automatically on mg.",
      "Centripetal force is not a new force. It is the net inward force making circular motion happen.",
      "Tension pulls along the rope and is usually the same through a massless ideal rope."
    ],
    formulas: ["fk = mu k N", "fs <= mu s N", "Fc = mv^2/r", "mg sin theta down ramp", "mg cos theta into ramp"],
    traps: ["Using mg instead of N on ramps", "Treating centripetal force as a separate force", "Mixing static and kinetic friction"],
    examples: [
      { q: "A block is on a 30 degree ramp. What pulls it downhill?", steps: "Use ramp axes.", a: "mg sin30" },
      { q: "1000 kg car at 20 m/s turns with radius 50 m. Centripetal force?", steps: "Fc = mv^2/r = 1000(20^2)/50", a: "8000 N" }
    ],
    game: { q: "Down-ramp gravity component is?", choices: ["mg sin theta", "mg cos theta", "mu N", "mv^2/r"], a: "mg sin theta", why: "Parallel to ramp is mg sin theta; perpendicular is mg cos theta." },
    card: ["Ramp components", "mg sin theta down ramp; mg cos theta into ramp."]
  },
  {
    id: "ch6",
    title: "Ch. 6 — Work & Energy",
    world: "Work-Energy Arena",
    boss: "Cosine Crusher",
    bigIdea: "Work transfers energy, and only the force component along displacement does work.",
    mustKnow: ["work", "kinetic energy", "potential energy", "work-energy theorem", "power"],
    learnDeep: [
      "Work is energy transfer by a force over a displacement.",
      "Only the force component along displacement does work.",
      "Positive work adds kinetic energy; negative work removes kinetic energy.",
      "Your homework tension problem is a classic W = Fd question."
    ],
    formulas: ["W = Fd cos theta", "K = 1/2mv^2", "Ug = mgh", "Wnet = delta K"],
    traps: ["Forgetting cos theta", "Thinking every force does positive work", "Confusing work and power"],
    examples: [
      { q: "100 N pulls 5 m at 60 degrees. Work?", steps: "W = Fd cos theta = 100(5)cos60", a: "250 J" },
      { q: "A 2 kg object moves at 4 m/s. Kinetic energy?", steps: "K = 1/2mv^2 = 1/2(2)(4^2)", a: "16 J" },
      { q: "Homework: table block moves 0.750 m pulled by 12.0 N tension. Work?", steps: "W = Fd = 12(0.750)", a: "9 J" }
    ],
    game: { q: "A force does max positive work when it points...", choices: ["same direction as displacement", "perpendicular", "opposite displacement", "straight up always"], a: "same direction as displacement", why: "W = Fd cos theta. Max is theta = 0 degrees." },
    card: ["Work with angle", "W = Fd cos theta."]
  },
  {
    id: "ch7",
    title: "Ch. 7 — Conservation of Energy",
    world: "Conservation Castle",
    boss: "Friction Goblin",
    bigIdea: "Energy changes form. Friction removes mechanical energy; springs store it.",
    mustKnow: ["energy conservation", "spring energy", "friction work", "mechanical energy", "air resistance"],
    learnDeep: [
      "Use energy when the problem cares about speed, height, rough patches, or springs.",
      "Friction and air resistance do negative work and reduce mechanical energy.",
      "At maximum spring compression, kinetic energy has become spring potential energy.",
      "Do not use energy conservation during a sticky collision. Use momentum there."
    ],
    formulas: ["Ki + Ui = Kf + Uf", "Us = 1/2kx^2", "Wnc = delta E mechanical", "v = sqrt(v0^2 + 2gh)"],
    traps: ["Conserving mechanical energy with friction", "Forgetting spring energy", "Using energy through sticky collisions"],
    examples: [
      { q: "Ball thrown downward at 12.0 m/s from 22.0 m. Speed before impact?", steps: "v = sqrt(12^2 + 2(9.8)(22))", a: "24 m/s" },
      { q: "With air resistance, is final speed higher or lower?", steps: "Air resistance does negative work.", a: "lower" },
      { q: "Spring k = 200 N/m compressed 0.10 m. Energy?", steps: "Us = 1/2kx^2", a: "1 J" }
    ],
    game: { q: "A rough patch does what to mechanical energy?", choices: ["removes it", "creates it", "does nothing", "turns it into momentum"], a: "removes it", why: "Friction does negative work and reduces mechanical energy." },
    card: ["Rough patch", "Friction removes energy: Wf = mu mg d on flat ground."]
  },
  {
    id: "ch8",
    title: "Ch. 8 — Momentum & Collisions",
    world: "Collision Colosseum",
    boss: "Sticky Collision Beast",
    bigIdea: "Collisions, explosions, and recoil are momentum problems first.",
    mustKnow: ["momentum", "impulse", "conservation of momentum", "elastic collisions", "inelastic collisions"],
    learnDeep: [
      "Momentum is mass times velocity, so direction matters.",
      "Collisions, explosions, and recoil are momentum-first events.",
      "Sticky collisions conserve momentum but lose kinetic energy.",
      "Same momentum and same kinetic energy are different conditions; your SUV/truck homework tests this."
    ],
    formulas: ["p = mv", "J = F delta t = delta p", "momentum before = momentum after"],
    traps: ["Conserving kinetic energy in sticky collisions", "Forgetting direction", "Using energy when the event screams collision"],
    examples: [
      { q: "10000 kg truck moves 12.0 m/s. Momentum?", steps: "p = mv = 10000(12)", a: "120000 kg m/s" },
      { q: "2000 kg SUV has same momentum. Speed?", steps: "v = p/m = 120000/2000", a: "60 m/s" },
      { q: "Same kinetic energy as truck. SUV speed?", steps: "Set kinetic energies equal.", a: "26.8 m/s" },
      { q: "2 kg at 6 m/s sticks to 4 kg at rest. Final speed?", steps: "2(6) = 6V", a: "2 m/s" }
    ],
    game: { q: "Two carts stick together after colliding. What is conserved?", choices: ["momentum", "kinetic energy", "speed", "acceleration"], a: "momentum", why: "Sticky collisions conserve momentum, not kinetic energy." },
    card: ["Sticky collision", "Momentum conserved; kinetic energy not conserved."]
  },
  {
    id: "ch9",
    title: "Ch. 9 — Rotational Motion",
    world: "Rotational Ruins",
    boss: "Inertia Ogre",
    bigIdea: "Rotation mirrors linear motion, but uses radians, torque, moment of inertia, and angular acceleration.",
    mustKnow: ["radians", "arc length", "angular speed", "torque", "moment of inertia"],
    learnDeep: [
      "Radians connect angle to arc length through s = r theta.",
      "Torque is rotational force: it depends on force, distance from pivot, and angle.",
      "Moment of inertia depends on where the mass is relative to the axis.",
      "For a disk formula, the mass is the disk's mass, not the hanging block's mass."
    ],
    formulas: ["s = r theta", "v = r omega", "a = r alpha", "torque = rF sin theta", "I = sum mr^2"],
    traps: ["Forgetting radians", "Ignoring lever arm", "Using the hanging mass as the wheel mass"],
    examples: [
      { q: "Arc length 1.50 m, radius 2.50 m. Angle?", steps: "theta = s/r = 1.50/2.50", a: "0.6 rad" },
      { q: "Convert 0.600 rad to degrees.", steps: "0.600 x 180/pi", a: "34.4 degrees" },
      { q: "Masses M at 0, L/2, L from axis. I?", steps: "I = 0 + ML^2/4 + ML^2", a: "5ML^2/4" }
    ],
    game: { q: "Moment of inertia for point masses uses...", choices: ["sum mr^2", "mv", "Fd cos theta", "mgh"], a: "sum mr^2", why: "Each mass contributes mr^2 based on distance from axis." },
    card: ["Point-mass inertia", "I = sum mr^2."]
  },
  {
    id: "ch10",
    title: "Ch. 10 — Equilibrium & Angular Momentum",
    world: "Balance Tower",
    boss: "Torque Troll",
    bigIdea: "Static equilibrium means both net force and net torque are zero.",
    mustKnow: ["static equilibrium", "torque balance", "pivot choice", "angular momentum", "parallel-axis theorem"],
    learnDeep: [
      "Static equilibrium means no acceleration and no angular acceleration.",
      "Choose the pivot at an unknown force to make that force create zero torque.",
      "Only the perpendicular component of a force creates torque.",
      "Beam and cable questions are usually torque balance questions."
    ],
    formulas: ["sum F = 0", "sum torque = 0", "L = I omega", "I = Icm + Md^2"],
    traps: ["Bad pivot choice", "Forgetting torque balance", "Using total length instead of distance from pivot"],
    examples: [
      { q: "10.0 N force acts 4.00 m from pivot at 90 degrees. Torque?", steps: "torque = rFsin90 = 4(10)", a: "40 N m" },
      { q: "Where should you choose pivot in beam/cable problem?", steps: "Place it at unknown support force.", a: "At the unknown force" },
      { q: "Static beam condition?", steps: "No linear or angular acceleration.", a: "sum F = 0 and sum torque = 0" }
    ],
    game: { q: "In static equilibrium, net torque equals...", choices: ["0", "ma", "mv", "mgh"], a: "0", why: "No angular acceleration means net torque is zero." },
    card: ["Static equilibrium", "sum F = 0 and sum torque = 0."]
  },
  {
    id: "ch11",
    title: "Ch. 11 — Gravity & Center of Gravity",
    world: "Orbital Outlands",
    boss: "Inverse-Square Hydra",
    bigIdea: "Gravity is inverse-square. Center of gravity is a weighted average.",
    mustKnow: ["universal gravitation", "inverse-square law", "orbits", "center of gravity", "center of mass"],
    learnDeep: [
      "Gravity gets weaker with the square of distance.",
      "If distance doubles, gravity becomes one fourth as strong.",
      "Center of gravity is a weighted average of positions.",
      "For circular orbits, set gravity equal to centripetal force."
    ],
    formulas: ["Fg = Gm1m2/r^2", "g = GM/r^2", "v = sqrt(GM/r)", "xcm = sum mx / sum m"],
    traps: ["Forgetting inverse square", "Using altitude instead of radius", "Forgetting center of mass is weighted"],
    examples: [
      { q: "Distance doubles. Gravity becomes?", steps: "Gravity scales as 1/r^2.", a: "1/4 as strong" },
      { q: "Rod mass 1.80 kg, clamp 2.40 kg, center at 1.20 m. Where is clamp?", steps: "1.20 = (1.80(1.00)+2.40x)/4.20", a: "1.35 m" },
      { q: "Circular orbit setup?", steps: "Set gravity equal to centripetal force.", a: "GMm/r^2 = mv^2/r" }
    ],
    game: { q: "If distance triples, gravity becomes...", choices: ["1/9", "1/3", "3 times", "9 times"], a: "1/9", why: "Inverse-square: 1/3^2 = 1/9." },
    card: ["Gravity scaling", "Gravity follows 1/r^2."]
  },
  {
    id: "ch12",
    title: "Ch. 12 — Fluids",
    world: "Fluid Dungeon",
    boss: "Buoyancy Kraken",
    bigIdea: "Fluids create pressure, buoyant forces, and flow patterns.",
    mustKnow: ["density", "pressure", "pressure with depth", "buoyancy", "continuity"],
    learnDeep: [
      "Pressure is force spread over area.",
      "Fluid pressure increases with depth because more fluid is above you.",
      "Buoyant force equals the weight of displaced fluid.",
      "Continuity means fluid speeds up when the pipe gets narrower."
    ],
    formulas: ["density = m/V", "P = F/A", "P = P0 + rho gh", "Fb = rho fluid Vg", "A1v1 = A2v2"],
    traps: ["Confusing object density and fluid density", "Forgetting pressure increases with depth", "Thinking buoyancy means gravity disappeared"],
    examples: [
      { q: "Water depth increases 2 m. Extra pressure?", steps: "rho gh = 1000(9.8)(2)", a: "19600 Pa" },
      { q: "Object displaces 0.01 m^3 water. Buoyant force?", steps: "Fb = rho Vg = 1000(0.01)(9.8)", a: "98 N" }
    ],
    game: { q: "Buoyant force equals weight of...", choices: ["displaced fluid", "the object", "air only", "normal force"], a: "displaced fluid", why: "Archimedes' principle." },
    card: ["Buoyancy", "Buoyant force equals weight of displaced fluid."]
  },
  {
    id: "ch13",
    title: "Ch. 13 — Oscillations & Waves",
    world: "Wave Temple",
    boss: "Frequency Wraith",
    bigIdea: "Oscillations repeat in time. Waves carry energy through space.",
    mustKnow: ["period", "frequency", "wave speed", "wavelength", "simple harmonic motion"],
    learnDeep: [
      "Period is seconds per cycle; frequency is cycles per second.",
      "Wave speed is frequency times wavelength.",
      "Waves carry energy, not matter all the way across.",
      "Your astronaut gravity question is an inverse-square idea: closer means stronger acceleration."
    ],
    formulas: ["T = 1/f", "v = f lambda", "spring period = 2pi sqrt(m/k)", "pendulum period = 2pi sqrt(L/g)"],
    traps: ["Confusing period and frequency", "Ignoring Hz = 1/s", "Mixing wavelength and amplitude"],
    examples: [
      { q: "f = 5 Hz and lambda = 2 m. Wave speed?", steps: "v = f lambda", a: "10 m/s" },
      { q: "Period is 0.25 s. Frequency?", steps: "f = 1/T", a: "4 Hz" },
      { q: "Two astronauts attract each other. As they get closer, acceleration?", steps: "Gravity increases as distance decreases.", a: "increases" }
    ],
    game: { q: "Wave speed equation is...", choices: ["v = f lambda", "F = ma", "p = mv", "W = Fd cos theta"], a: "v = f lambda", why: "Wave speed equals frequency times wavelength." },
    card: ["Wave speed", "v = f lambda."]
  },
  {
    id: "ch14",
    title: "Ch. 14.1–14.4 — Sound",
    world: "Soundwave Citadel",
    boss: "Decibel Wizard",
    bigIdea: "Sound is a longitudinal mechanical wave. Decibels are logarithmic, not linear.",
    mustKnow: ["sound waves", "frequency and pitch", "intensity", "decibels", "standing waves"],
    learnDeep: [
      "Sound is a mechanical longitudinal wave.",
      "Frequency relates to pitch; intensity relates to loudness.",
      "Decibels are logarithmic, not linear.",
      "Every 10x intensity increase is a 10 dB increase."
    ],
    formulas: ["beta = 10 log(I/I0)", "v = f lambda", "open pipe: fn = nv/2L", "closed pipe: fn = nv/4L for odd n"],
    traps: ["Treating dB as linear", "Confusing pitch and loudness", "Using open-pipe formula for closed pipes"],
    examples: [
      { q: "f = 440 Hz and lambda = 0.78 m. Speed?", steps: "v = f lambda = 440(0.78)", a: "343 m/s" },
      { q: "Intensity increases by factor of 100. Sound level change?", steps: "100 = 10^2", a: "20 dB" }
    ],
    game: { q: "A 100x intensity increase changes sound level by...", choices: ["20 dB", "100 dB", "10 dB", "2 dB"], a: "20 dB", why: "Each factor of 10 gives +10 dB. 100 = 10^2, so +20 dB." },
    card: ["Decibels", "Every 10x intensity change is 10 dB."]
  }
];

const homeworkBosses = [
  { chapter: "Ch. 6", boss: "Homework Work Wraith", q: "A table block moves 0.750 m at constant speed while a hanging block with weight 12.0 N pulls it. What work does tension do?", choices: ["9 J", "16 J", "0 J", "12 J"], a: "9 J", why: "T = 12 N. Work = Fd = 12(0.750) = 9 J." },
  { chapter: "Ch. 7", boss: "Building Drop Demon", q: "A ball is thrown downward at 12.0 m/s from a 22.0 m building. Ignoring air resistance, impact speed?", choices: ["24 m/s", "12 m/s", "19.6 m/s", "431 m/s"], a: "24 m/s", why: "v = sqrt(12^2 + 2(9.8)(22)) = about 24 m/s." },
  { chapter: "Ch. 8", boss: "Momentum Truck Monster", q: "A 10000 kg truck moves at 12.0 m/s. Momentum?", choices: ["120000 kg m/s", "833 kg m/s", "12000 kg m/s", "60000 kg m/s"], a: "120000 kg m/s", why: "p = mv = 10000(12.0) = 120000 kg m/s." },
  { chapter: "Ch. 8", boss: "SUV Speed Goblin", q: "A 2000 kg SUV has the same momentum as that truck. Speed?", choices: ["60 m/s", "26.8 m/s", "12 m/s", "120 m/s"], a: "60 m/s", why: "v = p/m = 120000/2000 = 60 m/s." },
  { chapter: "Ch. 8", boss: "Kinetic Energy Doppelganger", q: "A 2000 kg SUV has the same kinetic energy as a 10000 kg truck at 12.0 m/s. Speed?", choices: ["26.8 m/s", "60 m/s", "12 m/s", "5.4 m/s"], a: "26.8 m/s", why: "Set kinetic energies equal: v = sqrt(5 x 12^2) = 26.8 m/s." },
  { chapter: "Ch. 9", boss: "Radian Rat", q: "Arc length is 1.50 m on radius 2.50 m. Angle in radians?", choices: ["0.600 rad", "1.67 rad", "4.00 rad", "34.4 rad"], a: "0.600 rad", why: "theta = s/r = 1.50/2.50 = 0.600 rad." },
  { chapter: "Ch. 10", boss: "Torque Troll Homework Form", q: "A 10.0 N force acts 4.00 m from a pivot at 90 degrees. Torque?", choices: ["40 N m", "2.5 N m", "14 N m", "0 N m"], a: "40 N m", why: "Torque = rF sin theta = 4.00(10.0)sin90 = 40 N m." },
  { chapter: "Ch. 11", boss: "Center-of-Gravity Gremlin", q: "A 2.00 m rod has mass 1.80 kg. A 2.40 kg clamp makes center of gravity 1.20 m from left. Where is clamp?", choices: ["1.35 m", "1.20 m", "1.00 m", "0.85 m"], a: "1.35 m", why: "1.20 = (1.80(1.00)+2.40x)/4.20, so x = 1.35 m." },
  { chapter: "Ch. 13", boss: "Astronaut Gravity Phantom", q: "Two astronauts attract each other gravitationally. As they get closer, acceleration...", choices: ["increases", "decreases", "stays zero", "becomes friction"], a: "increases", why: "Gravity follows 1/r^2. Smaller distance means stronger force and greater acceleration." },
  { chapter: "Ch. 14", boss: "Decibel Homework Wizard", q: "Sound intensity increases by factor of 100. Sound level change?", choices: ["20 dB", "10 dB", "100 dB", "2 dB"], a: "20 dB", why: "100 = 10^2, and every factor of 10 gives +10 dB." }
];

const missedTestBank = [
  { topic: "Elastic collision", likelyMiss: "A tiny object leaves with about 2V when hit elastically by a huge mass.", drill: "Huge cart at 12 m/s elastically hits tiny cart. Tiny cart leaves at about?", answer: "24", fix: "2V = 24 m/s." },
  { topic: "Work angle", likelyMiss: "Work depends on angle, not just force and distance.", drill: "Which does more work: horizontal pull or 60 degree upward pull?", answer: "horizontal", fix: "W = Fd cos theta, and cos0 is bigger than cos60." },
  { topic: "Moment of inertia", likelyMiss: "Each mass has its own distance from the axis.", drill: "M at 0, L/2, and L gives what inertia?", answer: "5", fix: "I = 0 + ML^2/4 + ML^2 = 5ML^2/4." },
  { topic: "Wheel and hanging mass", likelyMiss: "The M in disk inertia is wheel mass, not hanging mass.", drill: "In I = 1/2MR^2 for a disk, M is what mass?", answer: "wheel", fix: "Use torque and tension to find I, then solve for the wheel's mass." },
  { topic: "Ballistic pendulum", likelyMiss: "You used energy through a sticky collision.", drill: "In a sticky collision, conserve momentum or kinetic energy?", answer: "momentum", fix: "Energy before, momentum during, energy after." },
  { topic: "Rough patch and spring", likelyMiss: "Friction removes energy; spring compression stores remaining energy.", drill: "At max spring compression, kinetic energy becomes what?", answer: "spring", fix: "Remaining KE becomes 1/2kx^2." },
  { topic: "Beam torque", likelyMiss: "You need the vertical component of cable tension.", drill: "Which component of cable tension supports torque against weight?", answer: "vertical", fix: "Use T sin theta in the torque equation." }
];

const lootItems = ["Formula Sword", "Unit Shield", "Momentum Gauntlet", "Torque Hammer", "Energy Potion", "Wave Wand", "Free-Body Armor", "Decibel Cloak", "Gravity Boots", "Spring Launcher"];
const hypeLines = ["Your calculator just saluted you.", "The physics gods saw that and nodded.", "Final exam monster took emotional damage.", "You are becoming dangerously hard to trick.", "Somewhere, Newton dropped a mixtape."];
const tabs = ["game", "learn", "missed", "cards"];

function clean(text) {
  return String(text).toLowerCase().trim();
}

function isCorrect(userText, answerText) {
  const user = clean(userText);
  const answer = clean(answerText);
  return Boolean(user) && (user.includes(answer) || answer.includes(user));
}

function Panel({ title, children, tone = "blue" }) {
  return <section className={`panel ${tone}`}><h2>{title}</h2>{children}</section>;
}

function ProgressBar({ value }) {
  return <div className="progress" aria-label={`Chapter mastery ${value}%`}><div style={{ width: `${value}%` }} /></div>;
}

const appStyles = `
  * { box-sizing: border-box; }
  body { margin: 0; background: #020617; }
  button, input { font: inherit; }
  button { cursor: pointer; }
  .app-shell { min-height: 100vh; padding: 18px; color: #f8fafc; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; background: radial-gradient(circle at top left, rgba(34,211,238,.2), transparent 30%), radial-gradient(circle at 85% 10%, rgba(192,132,252,.18), transparent 28%), radial-gradient(circle at bottom right, rgba(52,211,153,.14), transparent 30%), #020617; }
  .hero, .panel, .chapter-list { border: 1px solid rgba(255,255,255,.12); border-radius: 28px; background: rgba(15,23,42,.88); box-shadow: 0 20px 58px rgba(0,0,0,.3); }
  .hero { max-width: 1120px; margin: 0 auto 14px; padding: 22px; background: linear-gradient(135deg, rgba(15,23,42,.94), rgba(30,41,59,.76)); }
  .hero h1 { margin: 16px 0 10px; max-width: 880px; font-size: clamp(2.35rem, 8vw, 5.25rem); line-height: .88; letter-spacing: -.065em; }
  .hero p { max-width: 760px; margin: 0; color: #cbd5e1; font-size: 1.04rem; line-height: 1.65; }
  .tiny { margin-top: 10px !important; font-size: .9rem !important; color: #94a3b8 !important; }
  .pill-row { display: flex; flex-wrap: wrap; gap: 8px; }
  .pill-row span, .chapter-chip { display: inline-flex; align-items: center; width: fit-content; border: 1px solid rgba(34,211,238,.20); border-radius: 999px; padding: 7px 11px; background: rgba(8,145,178,.14); color: #a5f3fc; font-size: .85rem; font-weight: 800; }
  .lootbar { margin-top: 12px; border: 1px solid rgba(251,191,36,.20); border-radius: 18px; padding: 10px 12px; background: rgba(120,53,15,.22); color: #fde68a; line-height: 1.45; }
  .progress { height: 14px; width: 100%; margin-top: 18px; overflow: hidden; border-radius: 999px; background: rgba(15,23,42,.92); border: 1px solid rgba(255,255,255,.10); }
  .progress > div { height: 100%; border-radius: 999px; background: linear-gradient(90deg, #22d3ee, #34d399, #fbbf24); transition: width .22s ease; }
  .tabbar { position: sticky; top: 0; z-index: 20; max-width: 1120px; margin: 0 auto 14px; display: grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap: 8px; padding: 10px; border: 1px solid rgba(255,255,255,.10); border-radius: 24px; background: rgba(2,6,23,.82); backdrop-filter: blur(14px); }
  .tabbar button { min-height: 48px; border: 0; border-radius: 17px; background: rgba(30,41,59,.92); color: #e2e8f0; font-weight: 950; text-transform: capitalize; transition: transform .15s ease, background .15s ease; }
  .tabbar button:hover { transform: translateY(-1px); background: rgba(51,65,85,.94); }
  .tabbar button.active { background: linear-gradient(135deg, #22d3ee, #34d399); color: #020617; box-shadow: 0 10px 28px rgba(34,211,238,.22); }
  .single, .layout { max-width: 1120px; margin: 0 auto; display: grid; gap: 14px; }
  .layout { grid-template-columns: 340px minmax(0,1fr); align-items: start; }
  .stack { display: grid; gap: 14px; }
  .panel { padding: 18px; }
  .panel h2 { margin: 0 0 12px; font-size: clamp(1.35rem, 4vw, 2rem); line-height: 1.05; letter-spacing: -.03em; }
  .panel h3 { margin: 14px 0 12px; font-size: 1.35rem; line-height: 1.25; }
  .panel p, .panel li { color: #e2e8f0; line-height: 1.58; }
  .panel ul { margin: 8px 0 0; padding-left: 22px; }
  .panel.blue { border-color: rgba(34,211,238,.22); }
  .panel.green { border-color: rgba(52,211,153,.24); background: linear-gradient(135deg, rgba(6,78,59,.30), rgba(15,23,42,.88)); }
  .panel.amber { border-color: rgba(251,191,36,.25); background: linear-gradient(135deg, rgba(120,53,15,.30), rgba(15,23,42,.88)); }
  .panel.rose { border-color: rgba(251,113,133,.27); background: linear-gradient(135deg, rgba(127,29,29,.32), rgba(15,23,42,.88)); }
  .mode-row { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px; }
  .mode { border: 1px solid rgba(255,255,255,.14); border-radius: 999px; padding: 9px 11px; background: rgba(2,6,23,.70); color: white; font-weight: 850; }
  .mode.active { background: #22d3ee; color: #020617; }
  .choices { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 10px; margin: 14px 0; }
  .choices button, .primary, .answer-row button, .flashcard, .chapter { border: 1px solid rgba(255,255,255,.14); border-radius: 18px; padding: 13px 14px; background: rgba(2,6,23,.70); color: white; font-weight: 850; transition: transform .14s ease, border-color .14s ease, background .14s ease; }
  .choices button:hover, .answer-row button:hover, .chapter:hover, .primary:hover, .flashcard:hover { transform: translateY(-1px); border-color: rgba(34,211,238,.55); background: rgba(30,41,59,.95); }
  .primary { width: 100%; margin-top: 12px; background: linear-gradient(135deg, #22d3ee, #34d399); color: #020617; border: 0; font-weight: 950; }
  .feedback { margin-top: 12px; border-radius: 18px; padding: 14px; line-height: 1.55; font-weight: 760; }
  .feedback.win { border: 1px solid rgba(52,211,153,.30); background: rgba(6,78,59,.38); color: #d1fae5; }
  .feedback.lose { border: 1px solid rgba(251,191,36,.28); background: rgba(120,53,15,.36); color: #fef3c7; }
  .chapter-list { max-height: 72vh; overflow: auto; display: grid; gap: 9px; padding: 12px; }
  .chapter { text-align: left; display: grid; gap: 5px; }
  .chapter.selected { border-color: #22d3ee; background: rgba(8,145,178,.18); }
  .chapter small { color: #94a3b8; font-weight: 700; }
  .content { min-width: 0; }
  code { display: block; margin: 8px 0; padding: 11px 12px; border-radius: 14px; background: rgba(2,6,23,.74); color: #fef3c7; white-space: normal; }
  .card { margin-top: 10px; border: 1px solid rgba(255,255,255,.10); border-radius: 20px; padding: 14px; background: rgba(2,6,23,.52); }
  .card h3 { margin-top: 0; }
  .answer-row { display: grid; grid-template-columns: minmax(0,1fr) auto; gap: 10px; margin-top: 14px; }
  input { width: 100%; border: 1px solid rgba(255,255,255,.14); border-radius: 18px; padding: 13px 14px; background: rgba(2,6,23,.80); color: white; outline: none; }
  input:focus { border-color: #22d3ee; box-shadow: 0 0 0 3px rgba(34,211,238,.12); }
  .flashcard { width: 100%; min-height: 220px; display: grid; place-items: center; text-align: center; font-size: clamp(1.35rem, 5vw, 2.25rem); line-height: 1.18; background: linear-gradient(135deg, rgba(14,165,233,.18), rgba(168,85,247,.16)); }
  @media (max-width: 860px) { .app-shell { padding: 12px; } .hero { border-radius: 24px; padding: 18px; } .tabbar { grid-template-columns: repeat(4, minmax(92px,1fr)); overflow-x: auto; } .layout { grid-template-columns: 1fr; } .chapter-list { max-height: 250px; } .choices { grid-template-columns: 1fr; } .answer-row { grid-template-columns: 1fr; } .panel { border-radius: 22px; padding: 16px; } }
`;

export default function PhysicsFinalBossStudyGame() {
  const [tab, setTab] = useState("game");
  const [selectedId, setSelectedId] = useState("ch6");
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
  const [comboName, setComboName] = useState("Baby Physics Goblin");

  const selected = chapters.find((c) => c.id === selectedId) || chapters[0];
  const mixedBattles = useMemo(() => {
    const chapterBattles = chapters.map((chapter) => ({ source: "chapter", chapterId: chapter.id, chapter: chapter.title, boss: chapter.boss, world: chapter.world, ...chapter.game }));
    const homeworkBattles = homeworkBosses.map((boss) => ({ source: "homework", chapter: boss.chapter, boss: boss.boss, world: "Homework Dungeon", q: boss.q, choices: boss.choices, a: boss.a, why: boss.why }));
    if (gameMode === "homework") return homeworkBattles;
    if (gameMode === "chapters") return chapterBattles;
    return chapterBattles.concat(homeworkBattles);
  }, [gameMode]);
  const gameQuestion = mixedBattles[questionIndex % mixedBattles.length];
  const missed = missedTestBank[missedIndex];
  const allCards = useMemo(() => chapters.map((c) => c.card).concat([
    ["First move on any problem", "Picture, knowns, unknown, event, formula, units."],
    ["Event map", "Collision = momentum. Rough patch = friction work. Spring = spring energy. Beam = torque."],
    ["Final exam rule", "Identify the event before choosing the formula."]
  ]), []);
  const progress = Math.round((Object.keys(cleared).length / chapters.length) * 100);
  const currentLoot = inventory.slice(-5);

  function earnLoot() {
    const item = lootItems[Math.floor(Math.random() * lootItems.length)];
    setInventory((old) => [...old, item]);
    return item;
  }

  function updateCombo(nextStreak) {
    if (nextStreak >= 10) setComboName("Final Boss Menace");
    else if (nextStreak >= 7) setComboName("Formula Assassin");
    else if (nextStreak >= 4) setComboName("Physics Goblin Slayer");
    else if (nextStreak >= 2) setComboName("Concept Goblin");
    else setComboName("Baby Physics Goblin");
  }

  function choose(choice) {
    if (choice === gameQuestion.a) {
      const loot = earnLoot();
      const nextStreak = streak + 1;
      updateCombo(nextStreak);
      const hype = hypeLines[Math.floor(Math.random() * hypeLines.length)];
      setResult({ kind: "win", text: `Critical hit. ${gameQuestion.why} Loot gained: ${loot}. ${hype}` });
      setXp((v) => v + 25 + streak * 3);
      setStreak(nextStreak);
      if (gameQuestion.source === "chapter") setCleared((old) => ({ ...old, [gameQuestion.chapterId]: true }));
    } else {
      setResult({ kind: "lose", text: `Trap hit. Correct answer: ${gameQuestion.a}. ${gameQuestion.why} The boss got one hit in, but now you know its weakness.` });
      setStreak(0);
      setComboName("Baby Physics Goblin");
      setHearts((h) => Math.max(0, h - 1));
    }
  }

  function nextGame() {
    setQuestionIndex((i) => i + 1);
    setResult(null);
  }

  function checkMissed() {
    if (isCorrect(answer, missed.answer)) {
      const loot = earnLoot();
      const nextStreak = streak + 1;
      updateCombo(nextStreak);
      setResult({ kind: "win", text: `Comeback complete. ${missed.fix} Loot gained: ${loot}.` });
      setXp((v) => v + 40);
      setStreak(nextStreak);
    } else {
      setResult({ kind: "lose", text: `Target answer: ${missed.answer}. ${missed.fix} This is not failure; this is boss intel.` });
      setStreak(0);
      setComboName("Baby Physics Goblin");
      setHearts((h) => Math.max(0, h - 1));
    }
  }

  function nextMissed() {
    setMissedIndex((i) => (i + 1) % missedTestBank.length);
    setAnswer("");
    setResult(null);
  }

  function clearChapter() {
    setCleared((old) => ({ ...old, [selected.id]: true }));
    setXp((v) => v + selected.xp);
  }

  return (
    <div className="app-shell">
      <style>{appStyles}</style>
      <header className="hero">
        <div className="pill-row"><span>🎮 Physics 1 Final Boss</span><span>XP {xp}</span><span>🔥 Streak {streak}</span><span>❤️ {hearts}</span><span>🧙 {comboName}</span></div>
        <h1>Physics 1 Final Boss Study Game</h1>
        <p>Four modes. One mission: recognize the physics event, pick the right formula, and destroy the final.</p>
        <ProgressBar value={progress} />
        <p className="tiny">Chapter mastery: {Object.keys(cleared).length}/{chapters.length}</p>
        {currentLoot.length > 0 && <div className="lootbar"><b>Recent loot:</b> {currentLoot.join(" • ")}</div>}
      </header>

      <nav className="tabbar">{tabs.map((t) => <button key={t} onClick={() => { setTab(t); setResult(null); }} className={tab === t ? "active" : ""}>{t}</button>)}</nav>

      {tab === "game" && (
        <main className="single">
          <Panel title={`Battle: ${gameQuestion.boss}`} tone="green">
            <div className="mode-row">
              <button onClick={() => { setGameMode("mixed"); setQuestionIndex(0); setResult(null); }} className={gameMode === "mixed" ? "mode active" : "mode"}>Mixed Final</button>
              <button onClick={() => { setGameMode("homework"); setQuestionIndex(0); setResult(null); }} className={gameMode === "homework" ? "mode active" : "mode"}>Homework Bosses</button>
              <button onClick={() => { setGameMode("chapters"); setQuestionIndex(0); setResult(null); }} className={gameMode === "chapters" ? "mode active" : "mode"}>Chapter Battles</button>
            </div>
            <div className="chapter-chip">{gameQuestion.chapter} • {gameQuestion.world}</div>
            <h3>{gameQuestion.q}</h3>
            <div className="choices">{gameQuestion.choices.map((choice) => <button key={choice} onClick={() => choose(choice)}>{choice}</button>)}</div>
            {result && <div className={`feedback ${result.kind}`}>{result.text}</div>}
            <button className="primary" onClick={nextGame}>Next Battle</button>
          </Panel>
          <Panel title="How to win the game" tone="blue">
            <p>Do not memorize randomly. Identify the event first:</p>
            <ul>
              <li><b>Collision, explosion, recoil</b> → momentum</li>
              <li><b>Ramp, friction, free-body diagram</b> → Newton's laws</li>
              <li><b>Height, speed, spring, rough patch</b> → energy</li>
              <li><b>Beam, door, cable, pivot</b> → torque</li>
              <li><b>Frequency, wavelength, sound</b> → waves</li>
              <li><b>Arc length or spinning wheel</b> → radians and rotation</li>
            </ul>
          </Panel>
        </main>
      )}

      {tab === "learn" && (
        <main className="layout">
          <aside className="chapter-list">
            {chapters.map((c) => <button key={c.id} onClick={() => setSelectedId(c.id)} className={selected.id === c.id ? "chapter selected" : "chapter"}><strong>{c.title}</strong><small>{c.world}</small></button>)}
          </aside>
          <section className="content stack">
            <Panel title={selected.title} tone="blue"><p>{selected.bigIdea}</p><div className="chapter-chip">Boss: {selected.boss}</div></Panel>
            <Panel title="Must Know" tone="green"><ul>{selected.mustKnow.map((k) => <li key={k}>{k}</li>)}</ul></Panel>
            <Panel title="Learn Deep" tone="amber"><ul>{selected.learnDeep.map((d) => <li key={d}>{d}</li>)}</ul></Panel>
            <Panel title="Formulas" tone="rose"><ul>{selected.formulas.map((f) => <li key={f}><code>{f}</code></li>)}</ul></Panel>
            <Panel title="Traps" tone="red"><ul>{selected.traps.map((t) => <li key={t}>{t}</li>)}</ul></Panel>
            <Panel title="Examples" tone="green">{selected.examples.map((ex, i) => <div key={i} className="example"><h3>Example: {ex.q}</h3><p><em>Solution:</em> {ex.steps} <strong>{ex.a}</strong></p></div>)}</Panel>
            {selected.game && <Panel title="Game Question Explained" tone="amber"><p><strong>Question:</strong> {selected.game.q}</p><div className="choices">{selected.game.choices.map((choice) => <button key={choice} disabled>{choice}</button>)}</div><p><strong>Answer:</strong> {selected.game.a}</p><p><strong>Why:</strong> {selected.game.why}</p></Panel>}
            {selected.card && <Panel title="Flashcard" tone="blue"><div className="card"><h3>{selected.card[0]}</h3><p>{selected.card[1]}</p></div></Panel>}
          </section>
        </main>
      )}

      {tab === "missed" && (
        <main className="single">
          <Panel title={`Missed Concept: ${missed.topic}`} tone="rose">
            <h3>{missed.likelyMiss}</h3>
            <p><em>Drill:</em> {missed.drill}</p>
            <div className="answer-row">
              <input value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Your answer" />
              <button onClick={checkMissed}>Check</button>
            </div>
            {result && <div className={`feedback ${result.kind}`}>{result.text}</div>}
            <button className="primary" onClick={nextMissed}>Next Missed Concept</button>
          </Panel>
        </main>
      )}

      {tab === "cards" && (
        <main className="single">
          <Panel title="Flashcards" tone="blue">
            <div className="mode-row">
              <button onClick={() => { setCardIndex(0); setFlipped(false); }} className={cardIndex === 0 ? "mode active" : "mode"}>Chapter Cards</button>
              <button onClick={() => { setCardIndex(chapters.length); setFlipped(false); }} className={cardIndex === chapters.length ? "mode active" : "mode"}>General Strategy</button>
            </div>
            <div className="flashcard" onClick={() => setFlipped((f) => !f)}>
              {!flipped ? allCards[cardIndex][0] : allCards[cardIndex][1]}
            </div>
            <div className="choices">
              <button onClick={() => { setCardIndex((i) => Math.max(0, i - 1)); setFlipped(false); }} disabled={cardIndex === 0}>Previous</button>
              <button onClick={() => { setCardIndex((i) => Math.min(allCards.length - 1, i + 1)); setFlipped(false); }} disabled={cardIndex === allCards.length - 1}>Next</button>
            </div>
          </Panel>
        </main>
      )}
    </div>
  );
}