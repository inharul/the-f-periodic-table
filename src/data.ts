// Main table structure based on layout
export const mainTable = [
  // Row 1
  [
    "H",
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    "He",
  ],
  // Row 2
  [
    "Li",
    "Be",
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    "B",
    "C",
    "N",
    "O",
    "F",
    "Ne",
  ],
  // Row 3
  [
    "Na",
    "Mg",
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    "Al",
    "Si",
    "P",
    "S",
    "Cl",
    "Ar",
  ],
  // Row 4
  [
    "K",
    "Ca",
    "Sc",
    "Ti",
    "V",
    "Cr",
    "Mn",
    "Fe",
    "Co",
    "Ni",
    "Cu",
    "Zn",
    "Ga",
    "Ge",
    "As",
    "Se",
    "Br",
    "Kr",
  ],
  // Row 5
  [
    "Rb",
    "Sr",
    "Y",
    "Zr",
    "Nb",
    "Mo",
    "Tc",
    "Ru",
    "Rh",
    "Pd",
    "Ag",
    "Cd",
    "In",
    "Sn",
    "Sb",
    "Te",
    "I",
    "Xe",
  ],
  // Row 6
  [
    "Cs",
    "Ba",
    "La",
    "Hf",
    "Ta",
    "W",
    "Re",
    "Os",
    "Ir",
    "Pt",
    "Au",
    "Hg",
    "Tl",
    "Pb",
    "Bi",
    "Po",
    "At",
    "Rn",
  ],
  // Row 7
  [
    "Fr",
    "Ra",
    "Ac",
    "Rf",
    "Db",
    "Sg",
    "Bh",
    "Hs",
    "Mt",
    "Ds",
    "Rg",
    "Cn",
    "Nh",
    "Fl",
    "Mc",
    "Lv",
    "Ts",
    "Og",
  ],
];

export const correctAbbreviations = [
  "H",
  "He",
  "Li",
  "Be",
  "B",
  "C",
  "N",
  "O",
  "F",
  "Ne",
  "Na",
  "Mg",
  "Al",
  "Si",
  "P",
  "S",
  "Cl",
  "Ar",
  "K",
  "Ca",
  "Sc",
  "Ti",
  "V",
  "Cr",
  "Mn",
  "Fe",
  "Co",
  "Ni",
  "Cu",
  "Zn",
  "Ga",
  "Ge",
  "As",
  "Se",
  "Br",
  "Kr",
  "Rb",
  "Sr",
  "Y",
  "Zr",
  "Nb",
  "Mo",
  "Tc",
  "Ru",
  "Rh",
  "Pd",
  "Ag",
  "Cd",
  "In",
  "Sn",
  "Sb",
  "Te",
  "I",
  "Xe",
  "Cs",
  "Ba",
  "La",
  "Ce",
  "Pr",
  "Nd",
  "Pm",
  "Sm",
  "Eu",
  "Gd",
  "Tb",
  "Dy",
  "Ho",
  "Er",
  "Tm",
  "Yb",
  "Lu",
  "Hf",
  "Ta",
  "W",
  "Re",
  "Os",
  "Ir",
  "Pt",
  "Au",
  "Hg",
  "Tl",
  "Pb",
  "Bi",
  "Po",
  "At",
  "Rn",
  "Fr",
  "Ra",
  "Ac",
  "Th",
  "Pa",
  "U",
  "Np",
  "Pu",
  "Am",
  "Cm",
  "Bk",
  "Cf",
  "Es",
  "Fm",
  "Md",
  "No",
  "Lr",
  "Rf",
  "Db",
  "Sg",
  "Bh",
  "Hs",
  "Mt",
  "Ds",
  "Rg",
  "Cn",
  "Nh",
  "Fl",
  "Mc",
  "Lv",
  "Ts",
  "Og",
];

// Lanthanide series
export const lanthanideSeries = [
  "La",
  "Ce",
  "Pr",
  "Nd",
  "Pm",
  "Sm",
  "Eu",
  "Gd",
  "Tb",
  "Dy",
  "Ho",
  "Er",
  "Tm",
  "Yb",
  "Lu",
];

// Actinide series
export const actinideSeries = [
  "Ac",
  "Th",
  "Pa",
  "U",
  "Np",
  "Pu",
  "Am",
  "Cm",
  "Bk",
  "Cf",
  "Es",
  "Fm",
  "Md",
  "No",
  "Lr",
];

// 0: Alkali metals, 1: Alkaline earth metals, 2: Lanthanides, 3: Actinides, 4: Transition metals, 5: Post-transition metals, 6: Metalloids, 7: Nonmetals, 8: Halogens, 9: Noble gases
export const elementGroups = [
  // 1-10
  7, // 0: H - Nonmetal
  9, // 1: He - Noble gas
  0, // 2: Li - Alkali metal
  1, // 3: Be - Alkaline earth metal
  6, // 4: B - Metalloid
  7, // 5: C - Nonmetal
  7, // 6: N - Nonmetal
  7, // 7: O - Nonmetal
  8, // 8: F - Halogen
  9, // 9: Ne - Noble gas

  // 11-20
  0, // 10: Na - Alkali metal
  1, // 11: Mg - Alkaline earth metal
  5, // 12: Al - Post-transition metal
  6, // 13: Si - Metalloid
  7, // 14: P - Nonmetal
  7, // 15: S - Nonmetal
  8, // 16: Cl - Halogen
  9, // 17: Ar - Noble gas
  0, // 18: K - Alkali metal
  1, // 19: Ca - Alkaline earth metal

  // 21-30
  4, // 20: Sc - Transition metal
  4, // 21: Ti - Transition metal
  4, // 22: V - Transition metal
  4, // 23: Cr - Transition metal
  4, // 24: Mn - Transition metal
  4, // 25: Fe - Transition metal
  4, // 26: Co - Transition metal
  4, // 27: Ni - Transition metal
  4, // 28: Cu - Transition metal
  4, // 29: Zn - Transition metal

  // 31-40
  5, // 30: Ga - Post-transition metal
  6, // 31: Ge - Metalloid
  6, // 32: As - Metalloid
  7, // 33: Se - Nonmetal
  8, // 34: Br - Halogen
  9, // 35: Kr - Noble gas
  0, // 36: Rb - Alkali metal
  1, // 37: Sr - Alkaline earth metal
  4, // 38: Y - Transition metal
  4, // 39: Zr - Transition metal

  // 41-50
  4, // 40: Nb - Transition metal
  4, // 41: Mo - Transition metal
  4, // 42: Tc - Transition metal
  4, // 43: Ru - Transition metal
  4, // 44: Rh - Transition metal
  4, // 45: Pd - Transition metal
  4, // 46: Ag - Transition metal
  4, // 47: Cd - Transition metal
  5, // 48: In - Post-transition metal
  5, // 49: Sn - Post-transition metal

  // 51-60
  6, // 50: Sb - Metalloid
  6, // 51: Te - Metalloid
  8, // 52: I - Halogen
  9, // 53: Xe - Noble gas
  0, // 54: Cs - Alkali metal
  1, // 55: Ba - Alkaline earth metal
  2, // 56: La - Lanthanide
  2, // 57: Ce - Lanthanide
  2, // 58: Pr - Lanthanide
  2, // 59: Nd - Lanthanide

  // 61-70
  2, // 60: Pm - Lanthanide
  2, // 61: Sm - Lanthanide
  2, // 62: Eu - Lanthanide
  2, // 63: Gd - Lanthanide
  2, // 64: Tb - Lanthanide
  2, // 65: Dy - Lanthanide
  2, // 66: Ho - Lanthanide
  2, // 67: Er - Lanthanide
  2, // 68: Tm - Lanthanide
  2, // 69: Yb - Lanthanide

  // 71-80
  2, // 70: Lu - Lanthanide
  4, // 71: Hf - Transition metal
  4, // 72: Ta - Transition metal
  4, // 73: W - Transition metal
  4, // 74: Re - Transition metal
  4, // 75: Os - Transition metal
  4, // 76: Ir - Transition metal
  4, // 77: Pt - Transition metal
  4, // 78: Au - Transition metal
  4, // 79: Hg - Transition metal

  // 81-90
  5, // 80: Tl - Post-transition metal
  5, // 81: Pb - Post-transition metal
  5, // 82: Bi - Metalloid
  6, // 83: Po - Metalloid
  8, // 84: At - Halogen
  9, // 85: Rn - Noble gas
  0, // 86: Fr - Alkali metal
  1, // 87: Ra - Alkaline earth metal
  3, // 88: Ac - Actinide
  3, // 89: Th - Actinide

  // 91-100
  3, // 90: Pa - Actinide
  3, // 91: U - Actinide
  3, // 92: Np - Actinide
  3, // 93: Pu - Actinide
  3, // 94: Am - Actinide
  3, // 95: Cm - Actinide
  3, // 96: Bk - Actinide
  3, // 97: Cf - Actinide
  3, // 98: Es - Actinide
  3, // 99: Fm - Actinide

  // 101-110
  3, // 100: Md - Actinide
  3, // 101: No - Actinide
  3, // 102: Lr - Actinide
  4, // 103: Rf - Transition metal
  4, // 104: Db - Transition metal
  4, // 105: Sg - Transition metal
  4, // 106: Bh - Transition metal
  4, // 107: Hs - Transition metal
  4, // 108: Mt - Post-transition metal
  4, // 109: Ds - Post-transition metal

  // 111-118
  4, // 110: Rg - Post-transition metal
  4, // 111: Cn - Post-transition metal
  10, // 112: Nh - Post-transition metal
  10, // 113: Fl - Post-transition metal
  10, // 114: Mc - Post-transition metal
  10, // 115: Lv - Halogen
  10, // 116: Ts
  10, // 118: Og
];

export const groupBgColors = [
  "#fde047", // bg-yellow-300 - Alkali metals
  "#fca5a5", // bg-red-300 - Alkaline earth metals
  "#f9a8d4", // bg-pink-300 - Lanthanides
  "#fdba74", // bg-orange-300 - Actinides
  "#60a5fa", // bg-blue-400 - Transition metals
  "#14b8a6", // bg-teal-500 - Post-transition metals
  "#22c55e", // bg-green-500 - Metalloids
  "#d1d5db", // bg-gray-300 - Nonmetals
  "#7dd3fc", // bg-sky-300 - Halogens
  "#fde68a", // bg-yellow-400 - Noble gases
  "#a78bfa", // bg-purple-400 - Unknown Elements
];

export const noGroupBgColors = new Array(11).fill("#FFFFFF00");

export const groupNames = [
  "Alkali metals",
  "Alkaline earth metals",
  "Lanthanides",
  "Actinides",
  "Transition metals",
  "Post-transition metals",
  "Metalloids",
  "Nonmetals",
  "Halogens",
  "Noble gases",
  "Unknown Elements",
];
