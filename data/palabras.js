const palabras = [
  {
    id: 1,
    word: "noe",
    generalPhrase:
      "Un hombre elegido para preservar la esperanza en medio del juicio",
    lettersVisible: [{ position: 1, letter: "o" }],
    length: 3,
    maxAttempts: 5,
    category: "easy",
    type: "personaje",
    hints: [
      "Encontró gracia ante los ojos de Dios",
      "Su nombre significa 'descanso'",
      "Un proyecto de 120 años",
    ],
    availableBenefits: [
      { type: "decirLetra", quantity: 2 },
      { type: "pistaAdicional", quantity: 2 },
      { type: "revelarLetra", quantity: 1 },
    ],
    difficulty: {
      level: "easy",
      basePoints: 1,
    },
  },
  {
    id: 2,
    word: "fe",
    generalPhrase:
      "La sustancia de lo que se espera, la evidencia de lo invisible",
    lettersVisible: [{ position: 0, letter: "f" }],
    length: 2,
    maxAttempts: 5,
    category: "easy",
    type: "concepto",
    hints: [
      "Sin ella es imposible agradar al Altísimo",
      "Más pequeña que una semilla",
      "Por ella caminaron sobre el mar",
    ],
    availableBenefits: [
      { type: "decirLetra", quantity: 1 },
      { type: "pistaAdicional", quantity: 2 },
    ],
    difficulty: {
      level: "easy",
      basePoints: 1,
    },
  },
  {
    id: 3,
    word: "amor",
    generalPhrase:
      "La fuerza más poderosa del universo, descrita en un himno a los corintios",
    lettersVisible: [{ position: 1, letter: "m" }],
    length: 4,
    maxAttempts: 5,
    category: "easy",
    type: "concepto",
    hints: [
      "Nunca deja de ser",
      "Mayor que la esperanza",
      "Más fuerte que la muerte",
    ],
    availableBenefits: [
      { type: "decirLetra", quantity: 2 },
      { type: "pistaAdicional", quantity: 2 },
    ],
    difficulty: {
      level: "easy",
      basePoints: 1,
    },
  },
  {
    id: 4,
    word: "paz",
    generalPhrase: "Un regalo que el mundo no puede dar ni quitar",
    lettersVisible: [{ position: 1, letter: "a" }],
    length: 3,
    maxAttempts: 5,
    category: "easy",
    type: "concepto",
    hints: [
      "Sobrepasa todo entendimiento",
      "Un fruto del Espíritu",
      "Se encuentra en medio de la tormenta",
    ],
    availableBenefits: [
      { type: "decirLetra", quantity: 1 },
      { type: "pistaAdicional", quantity: 2 },
    ],
    difficulty: {
      level: "easy",
      basePoints: 1,
    },
  },
  {
    id: 5,
    word: "david",
    generalPhrase: "Un corazón conforme a lo divino, en un hombre imperfecto",
    lettersVisible: [{ position: 2, letter: "v" }],
    length: 5,
    maxAttempts: 5,
    category: "easy",
    type: "personaje",
    hints: [
      "El menor de ocho hermanos",
      "Músico en la corte real",
      "De pastor a monarca",
    ],
    availableBenefits: [
      { type: "decirLetra", quantity: 2 },
      { type: "pistaAdicional", quantity: 2 },
    ],
    difficulty: {
      level: "easy",
      basePoints: 1,
    },
  },
  {
    id: 6,
    word: "salomon",
    generalPhrase:
      "Bendecido con un don especial que luego se convirtió en su prueba",
    lettersVisible: [
      { position: 0, letter: "s" },
      { position: 4, letter: "m" },
    ],
    length: 7,
    maxAttempts: 7,
    category: "medium",
    type: "personaje",
    hints: [
      "Su reino fue de paz total",
      "Autor de tres mil proverbios",
      "La reina del sur lo visitó",
    ],
    availableBenefits: [
      { type: "decirLetra", quantity: 3 },
      { type: "pistaAdicional", quantity: 2 },
      { type: "revelarLetra", quantity: 1 },
    ],
    difficulty: {
      level: "medium",
      basePoints: 3,
    },
  },
  {
    id: 7,
    word: "golgota",
    generalPhrase:
      "Una colina fuera de la ciudad que cambió la historia para siempre",
    lettersVisible: [
      { position: 2, letter: "l" },
      { position: 6, letter: "a" },
    ],
    length: 7,
    maxAttempts: 7,
    category: "medium",
    type: "lugar",
    hints: [
      "Su forma recordaba a un cráneo",
      "Cerca de un huerto y una tumba nueva",
      "Lugar de tres cruces",
    ],
    availableBenefits: [
      { type: "decirLetra", quantity: 3 },
      { type: "pistaAdicional", quantity: 2 },
      { type: "revelarLetra", quantity: 1 },
    ],
    difficulty: {
      level: "medium",
      basePoints: 3,
    },
  },
  {
    id: 8,
    word: "jerusalen",
    generalPhrase:
      "Ciudad donde se entrelazan tierra y cielo, centro de tres religiones",
    lettersVisible: [
      { position: 1, letter: "e" },
      { position: 5, letter: "a" },
    ],
    length: 9,
    maxAttempts: 7,
    category: "medium",
    type: "lugar",
    hints: [
      "Antes conocida como Salem",
      "Construida sobre siete colinas",
      "Ciudad del Gran Rey",
    ],
    availableBenefits: [
      { type: "decirLetra", quantity: 3 },
      { type: "pistaAdicional", quantity: 2 },
      { type: "revelarLetra", quantity: 1 },
    ],
    difficulty: {
      level: "medium",
      basePoints: 3,
    },
  },
  {
    id: 9,
    word: "apocalipsis",
    generalPhrase:
      "Un mensaje codificado de esperanza en tiempos de persecución",
    lettersVisible: [
      { position: 0, letter: "a" },
      { position: 5, letter: "l" },
      { position: 10, letter: "s" },
    ],
    length: 11,
    maxAttempts: 7,
    category: "medium",
    type: "libro",
    hints: [
      "Escrito en una isla de exilio",
      "Menciona siete candeleros",
      "Un rollo con siete sellos",
    ],
    availableBenefits: [
      { type: "decirLetra", quantity: 3 },
      { type: "pistaAdicional", quantity: 2 },
      { type: "revelarLetra", quantity: 1 },
    ],
    difficulty: {
      level: "medium",
      basePoints: 3,
    },
  },
  {
    id: 10,
    word: "pentecostes",
    generalPhrase:
      "Una fiesta agrícola que se transformó en un momento histórico",
    lettersVisible: [
      { position: 0, letter: "p" },
      { position: 4, letter: "e" },
      { position: 9, letter: "t" },
    ],
    length: 11,
    maxAttempts: 7,
    category: "medium",
    type: "evento",
    hints: [
      "Celebración de primicias",
      "Sonido como de viento recio",
      "Cumplimiento de la profecía de Joel",
    ],
    availableBenefits: [
      { type: "decirLetra", quantity: 3 },
      { type: "pistaAdicional", quantity: 2 },
      { type: "revelarLetra", quantity: 1 },
    ],
    difficulty: {
      level: "medium",
      basePoints: 3,
    },
  },
  {
    id: 11,
    word: "nabucodonosor",
    generalPhrase: "Un poderoso que aprendió humildad de la manera más dura",
    lettersVisible: [
      { position: 1, letter: "a" },
      { position: 11, letter: "o" },
    ],
    length: 13,
    maxAttempts: 10,
    category: "hard",
    type: "personaje",
    hints: [
      "Soñó con una estatua mixta",
      "Siete tiempos sobre él pasaron",
      "Comió hierba como buey",
    ],
    availableBenefits: [
      { type: "decirLetra", quantity: 4 },
      { type: "pistaAdicional", quantity: 3 },
      { type: "revelarLetra", quantity: 1 },
    ],
    difficulty: {
      level: "hard",
      basePoints: 5,
    },
  },
  {
    id: 12,
    word: "transfiguracion",
    generalPhrase: "Un destello de gloria divina en una montaña solitaria",
    lettersVisible: [
      { position: 0, letter: "t" },
      { position: 5, letter: "i" },
      { position: 13, letter: "n" },
    ],
    length: 14,
    maxAttempts: 10,
    category: "hard",
    type: "evento",
    hints: [
      "Su rostro brilló como el sol",
      "Dos visitantes del pasado",
      "Propuesta de tres tabernáculos",
    ],
    availableBenefits: [
      { type: "decirLetra", quantity: 4 },
      { type: "pistaAdicional", quantity: 3 },
      { type: "revelarLetra", quantity: 1 },
    ],
    difficulty: {
      level: "hard",
      basePoints: 5,
    },
  },
  {
    id: 13,
    word: "eclesiastes",
    generalPhrase:
      "Reflexiones de un sabio desilusionado con la vida bajo el sol",
    lettersVisible: [
      { position: 0, letter: "e" },
      { position: 5, letter: "i" },
      { position: 10, letter: "s" },
    ],
    length: 11,
    maxAttempts: 10,
    category: "hard",
    type: "libro",
    hints: [
      "Palabras del Predicador",
      "Todo es como perseguir viento",
      "Conclusión: teme a Dios",
    ],
    availableBenefits: [
      { type: "decirLetra", quantity: 4 },
      { type: "pistaAdicional", quantity: 3 },
      { type: "revelarLetra", quantity: 1 },
    ],
    difficulty: {
      level: "hard",
      basePoints: 5,
    },
  },
  {
    id: 14,
    word: "paracletos",
    generalPhrase: "Un título griego que describe al defensor prometido",
    lettersVisible: [
      { position: 2, letter: "r" },
      { position: 6, letter: "t" },
    ],
    length: 10,
    maxAttempts: 10,
    category: "hard",
    type: "concepto",
    hints: [
      "Guía a toda verdad",
      "Otro como el que partió",
      "El que viene después",
    ],
    availableBenefits: [
      { type: "decirLetra", quantity: 4 },
      { type: "pistaAdicional", quantity: 3 },
      { type: "revelarLetra", quantity: 1 },
    ],
    difficulty: {
      level: "hard",
      basePoints: 5,
    },
  },
  {
    id: 15,
    word: "armagedon",
    generalPhrase:
      "Un valle histórico destinado a ser escenario del último conflicto",
    lettersVisible: [
      { position: 1, letter: "r" },
      { position: 7, letter: "o" },
    ],
    length: 9,
    maxAttempts: 10,
    category: "hard",
    type: "lugar",
    hints: [
      "Monte de Meguido",
      "Testigo de antiguas batallas",
      "Reunión de reyes del oriente",
    ],
    availableBenefits: [
      { type: "decirLetra", quantity: 4 },
      { type: "pistaAdicional", quantity: 3 },
      { type: "revelarLetra", quantity: 1 },
    ],
    difficulty: {
      level: "hard",
      basePoints: 5,
    },
  },
  {
    id: 16,
    word: "melquisedec",
    generalPhrase: "Una figura sin principio ni fin que prefigura algo mayor",
    lettersVisible: [
      { position: 0, letter: "m" },
      { position: 6, letter: "e" },
    ],
    length: 11,
    maxAttempts: 10,
    category: "hard",
    type: "personaje",
    hints: [
      "Rey de paz y justicia",
      "Un orden sacerdotal eterno",
      "Ofreció pan y vino al victorioso",
    ],
    availableBenefits: [
      { type: "decirLetra", quantity: 4 },
      { type: "pistaAdicional", quantity: 3 },
      { type: "revelarLetra", quantity: 1 },
    ],
    difficulty: {
      level: "hard",
      basePoints: 5,
    },
  },
  {
    id: 17,
    word: "efesios",
    generalPhrase:
      "Una carta que revela el misterio oculto desde el principio de los siglos",
    lettersVisible: [
      { position: 0, letter: "e" },
      { position: 4, letter: "i" },
    ],
    length: 7,
    maxAttempts: 7,
    category: "medium",
    type: "libro",
    hints: [
      "Diana era la diosa principal de esta ciudad",
      "Pablo permaneció dos años enseñando aquí",
      "La carta menciona una armadura completa",
    ],
    availableBenefits: [
      { type: "decirLetra", quantity: 3 },
      { type: "pistaAdicional", quantity: 2 },
      { type: "revelarLetra", quantity: 1 },
    ],
    difficulty: {
      level: "medium",
      basePoints: 3,
    },
  },
  {
    id: 18,
    word: "sinedrin",
    generalPhrase:
      "Un concilio antiguo que ejercía autoridad sobre asuntos cruciales",
    lettersVisible: [
      { position: 0, letter: "s" },
      { position: 5, letter: "r" },
    ],
    length: 8,
    maxAttempts: 7,
    category: "medium",
    type: "concepto",
    hints: [
      "Su número recordaba a los que ayudaron a Moisés",
      "Se reunían en el área del templo",
      "Caifás presidió una de sus reuniones más famosas",
    ],
    availableBenefits: [
      { type: "decirLetra", quantity: 3 },
      { type: "pistaAdicional", quantity: 2 },
      { type: "revelarLetra", quantity: 1 },
    ],
    difficulty: {
      level: "medium",
      basePoints: 3,
    },
  },
  {
    id: 19,
    word: "cedron",
    generalPhrase: "Un valle que ha sido testigo silencioso de muchas lágrimas",
    lettersVisible: [
      { position: 0, letter: "c" },
      { position: 4, letter: "n" },
    ],
    length: 6,
    maxAttempts: 6,
    category: "medium",
    type: "lugar",
    hints: [
      "Un rey lo cruzó descalzo y llorando",
      "Separa el monte del templo del Monte de los Olivos",
      "Sus aguas turbias fluían entre jardines antiguos",
    ],
    availableBenefits: [
      { type: "decirLetra", quantity: 2 },
      { type: "pistaAdicional", quantity: 2 },
      { type: "revelarLetra", quantity: 1 },
    ],
    difficulty: {
      level: "medium",
      basePoints: 3,
    },
  },
  {
    id: 20,
    word: "gehenna",
    generalPhrase:
      "Un lugar terrenal que se convirtió en símbolo de juicio eterno",
    lettersVisible: [
      { position: 0, letter: "g" },
      { position: 4, letter: "n" },
    ],
    length: 7,
    maxAttempts: 7,
    category: "hard",
    type: "lugar",
    hints: [
      "Valle donde algunos reyes ofrecieron sacrificios prohibidos",
      "El rey Josías lo convirtió en lugar inmundo",
      "Jesús usó este lugar como metáfora en sus enseñanzas",
    ],
    availableBenefits: [
      { type: "decirLetra", quantity: 3 },
      { type: "pistaAdicional", quantity: 2 },
      { type: "revelarLetra", quantity: 1 },
    ],
    difficulty: {
      level: "hard",
      basePoints: 4,
    },
  },
  {
    id: 21,
    word: "eden",
    generalPhrase: "El primer hogar de la humanidad, perdido por una decisión",
    lettersVisible: [{ position: 0, letter: "e" }],
    length: 4,
    maxAttempts: 5,
    category: "medium",
    type: "lugar",
    hints: [
      "Cuatro ríos lo regaban",
      "Contenía dos árboles especiales",
      "Un querubín guardó su entrada",
    ],
    availableBenefits: [
      { type: "decirLetra", quantity: 2 },
      { type: "pistaAdicional", quantity: 2 },
      { type: "revelarLetra", quantity: 1 },
    ],
    difficulty: {
      level: "medium",
      basePoints: 2,
    },
  },
  {
    id: 22,
    word: "filadelfia",
    generalPhrase: "Una de las siete que recibió elogios sin reproche",
    lettersVisible: [
      { position: 0, letter: "f" },
      { position: 4, letter: "d" },
    ],
    length: 10,
    maxAttempts: 8,
    category: "hard",
    type: "lugar",
    hints: [
      "Se le prometió una puerta abierta",
      "Su nombre significa amor fraternal",
      "Se le prometió protección de la hora de prueba",
    ],
    availableBenefits: [
      { type: "decirLetra", quantity: 3 },
      { type: "pistaAdicional", quantity: 2 },
      { type: "revelarLetra", quantity: 1 },
    ],
    difficulty: {
      level: "hard",
      basePoints: 4,
    },
  },
  {
    id: 23,
    word: "leviatan",
    generalPhrase: "Una criatura misteriosa que simboliza poder indomable",
    lettersVisible: [
      { position: 0, letter: "l" },
      { position: 5, letter: "a" },
    ],
    length: 8,
    maxAttempts: 7,
    category: "hard",
    type: "concepto",
    hints: [
      "Descrito en detalle en el libro de Job",
      "Se dice que respira fuego",
      "Símbolo del poder sobre el mar",
    ],
    availableBenefits: [
      { type: "decirLetra", quantity: 3 },
      { type: "pistaAdicional", quantity: 2 },
      { type: "revelarLetra", quantity: 1 },
    ],
    difficulty: {
      level: "hard",
      basePoints: 4,
    },
  },
  {
    id: 24,
    word: "carmelo",
    generalPhrase: "Monte donde el fuego respondió a un desafío",
    lettersVisible: [
      { position: 0, letter: "c" },
      { position: 4, letter: "e" },
    ],
    length: 7,
    maxAttempts: 6,
    category: "medium",
    type: "lugar",
    hints: [
      "Escenario de un duelo espiritual",
      "450 contra 1 en sus laderas",
      "Un altar reparado con 12 piedras",
    ],
    availableBenefits: [
      { type: "decirLetra", quantity: 2 },
      { type: "pistaAdicional", quantity: 2 },
      { type: "revelarLetra", quantity: 1 },
    ],
    difficulty: {
      level: "medium",
      basePoints: 3,
    },
  },
  {
    id: 25,
    word: "urim",
    generalPhrase: "Objeto sagrado usado para discernir la voluntad divina",
    lettersVisible: [{ position: 0, letter: "u" }],
    length: 4,
    maxAttempts: 5,
    category: "hard",
    type: "objeto",
    hints: [
      "Guardado en el pectoral del sumo sacerdote",
      "Tenía un compañero llamado Tumim",
      "Herramienta de decisión sacerdotal",
    ],
    availableBenefits: [
      { type: "decirLetra", quantity: 2 },
      { type: "pistaAdicional", quantity: 2 },
      { type: "revelarLetra", quantity: 1 },
    ],
    difficulty: {
      level: "hard",
      basePoints: 4,
    },
  },
];
