import type { Schedule } from './types';

export const DEFAULT_SCHEDULES: Schedule[] = [
  {
    id: 'optivision',
    title: 'OptiVision Gantt Project',
    subtitle: 'Desarrollo de App Móvil, AR & Backend',
    weeksCount: 4,
    deliverables: [
      {
        member: 'juan',
        name: 'Juan',
        avatar: 'JU',
        gradient: 'gradient-1',
        desc: 'Aplicación móvil funcional en .NET MAUI y Probador virtual AR básico.'
      },
      {
        member: 'jessica',
        name: 'Jessica',
        avatar: 'JE',
        gradient: 'gradient-2',
        desc: 'Diseño UI/UX interactivo directo en HTML/TS/CSS, utilizando Google AI Studio.'
      },
      {
        member: 'carlos',
        name: 'Carlos',
        avatar: 'CA',
        gradient: 'gradient-3',
        desc: 'API REST operativa, BD SQLite integrada y Sistema de citas funcional.'
      },
      {
        member: 'alexis',
        name: 'Alexis',
        avatar: 'AL',
        gradient: 'gradient-4',
        desc: 'QA y documentación técnica finalizada.'
      }
    ],
    groups: [
      {
        hito: 'Reunión 1',
        title: 'Kick-off del Proyecto',
        subtitle: 'Jueves (Semana 1)',
        tasks: [
          {
            id: 'r1-t1',
            text: 'Presentación del proyecto y alcance.',
            responsable: { name: 'Equipo', class: 'equipo' },
            weeks: [1],
            desc: 'Reunión de inicio oficial del proyecto OptiVision. Se presentarán los objetivos generales, los límites del sistema (alcance) y la metodología de trabajo Mobile-D que guiará el desarrollo.'
          },
          {
            id: 'r1-t2',
            text: 'Definición de historias de usuario.',
            responsable: { name: 'Alexis', class: 'alexis' },
            weeks: [1],
            desc: 'El Product Manager (Alexis) liderará la definición de las historias de usuario principales, detallando los roles, las acciones y los criterios de aceptación.'
          },
          {
            id: 'r1-t3',
            text: 'Asignación de tareas y roles.',
            responsable: { name: 'Juan', class: 'juan' },
            weeks: [1],
            desc: 'El Scrum Master (Juan) formalizará la distribución de responsabilidades en el equipo, asegurando que todos comprendan sus roles.'
          },
          {
            id: 'r1-t4',
            text: 'Evaluación de librerías AR.',
            responsable: { name: 'Juan', class: 'juan' },
            weeks: [1],
            desc: 'Juan realizará una investigación técnica de las opciones disponibles para integrar Realidad Aumentada en .NET MAUI para el probador virtual.'
          },
          {
            id: 'r1-t5',
            text: 'Prototipo inicial HTML/TS/CSS.',
            responsable: { name: 'Jessica', class: 'jessica' },
            weeks: [1],
            desc: 'Jessica comenzará el maquetado del prototipo inicial directo en HTML, TS y CSS, definiendo la estructura y distribución visual básica.'
          },
          {
            id: 'r1-t6',
            text: 'Diseño inicial SQLite.',
            responsable: { name: 'Carlos', class: 'carlos' },
            weeks: [1],
            desc: 'Carlos diseñará el modelo Entidad-Relación preliminar de la base de datos SQLite, enfocándose en las entidades principales: Usuarios, Lentes y Citas.'
          }
        ]
      },
      {
        hito: 'Reunión 2',
        title: 'Configuración Base',
        subtitle: 'Lunes (Semana 1)',
        tasks: [
          {
            id: 'r2-t1',
            text: 'Configuración del repositorio GitHub.',
            responsable: { name: 'Juan', class: 'juan' },
            weeks: [1],
            desc: 'Juan inicializará el repositorio en GitHub, configurará las ramas de trabajo (main, dev) y establecerá las políticas de commits.'
          },
          {
            id: 'r2-t2',
            text: 'Configuración arquitectura MVVM.',
            responsable: { name: 'Juan', class: 'juan' },
            weeks: [1],
            desc: 'Juan establecerá la estructura base del proyecto .NET MAUI utilizando el patrón de diseño MVVM para separar la lógica de la interfaz.'
          },
          {
            id: 'r2-t3',
            text: 'Organización del backlog.',
            responsable: { name: 'Alexis', class: 'alexis' },
            weeks: [1],
            desc: 'Alexis organizará las historias de usuario en el Product Backlog utilizando una herramienta de gestión, priorizando las tareas del primer sprint.'
          },
          {
            id: 'r2-t4',
            text: 'Configuración inicial SQLite.',
            responsable: { name: 'Carlos', class: 'carlos' },
            weeks: [1],
            desc: 'Carlos instalará y configurará la instancia de SQLite, creará la base de datos del proyecto y ejecutará los primeros scripts DDL.'
          },
          {
            id: 'r2-t5',
            text: 'Prototipado detallado con IA.',
            responsable: { name: 'Jessica', class: 'jessica' },
            weeks: [1],
            desc: 'Jessica refinará el prototipo interactivo en HTML, TS y CSS, detallando la navegación y componentes usando Google AI Studio.'
          }
        ]
      },
      {
        hito: 'Reunión 3',
        title: 'Validación Entorno',
        subtitle: 'Jueves (Semana 1)',
        tasks: [
          {
            id: 'r3-t1',
            text: 'Revisión de estructura frontend.',
            responsable: { name: 'Juan', class: 'juan' },
            weeks: [1],
            desc: 'Revisión conjunta de la arquitectura base del proyecto MAUI. Juan mostrará cómo se ha estructurado el ruteo y la inyección de dependencias.'
          },
          {
            id: 'r3-t2',
            text: 'Creación de endpoints iniciales.',
            responsable: { name: 'Carlos', class: 'carlos' },
            weeks: [1],
            desc: 'Carlos desarrollará en ASP.NET Core los primeros endpoints RESTful (ej. controladores básicos de salud y listado estático).'
          },
          {
            id: 'r3-t3',
            text: 'Validación de prototipos funcionales.',
            responsable: { name: 'Jessica', class: 'jessica' },
            weeks: [1],
            desc: 'El equipo validará la funcionalidad del prototipo directo en HTML/TS/CSS para verificar el flujo de usuario deseado.'
          },
          {
            id: 'r3-t4',
            text: 'Seguimiento de planificación.',
            responsable: { name: 'Alexis', class: 'alexis' },
            weeks: [1],
            desc: 'Alexis validará el avance frente al cronograma original, identificando posibles bloqueos y ajustando el backlog si es necesario.'
          }
        ]
      },
      {
        hito: 'Reunión 4',
        title: 'Sprint Principal',
        subtitle: 'Lunes (Semana 2)',
        tasks: [
          {
            id: 'r4-t1',
            text: 'Implementación autenticación.',
            responsable: { name: 'Juan/Carlos', class: 'carlos-juan' },
            weeks: [2],
            desc: 'Juan y Carlos integrarán el sistema de Login/Registro. Carlos expondrá el endpoint con JWT y Juan implementará los servicios y vistas.'
          },
          {
            id: 'r4-t2',
            text: 'Integración SQLite.',
            responsable: { name: 'Carlos', class: 'carlos' },
            weeks: [2],
            desc: 'Carlos conectará la API de ASP.NET Core con la base de datos SQLite mediante Entity Framework Core, aplicando las primeras migraciones.'
          },
          {
            id: 'r4-t3',
            text: 'Navegación principal mobile.',
            responsable: { name: 'Juan', class: 'juan' },
            weeks: [2],
            desc: 'Juan programará el Shell de navegación de la aplicación móvil, conectando el menú lateral o tabs con las vistas principales vacías.'
          },
          {
            id: 'r4-t4',
            text: 'Correcciones de maquetación en código.',
            responsable: { name: 'Jessica', class: 'jessica' },
            weeks: [2],
            desc: 'Jessica aplicará feedback técnico directamente sobre las hojas de estilo y la maquetación en HTML/CSS, refinando los estilos.'
          },
          {
            id: 'r4-t5',
            text: 'Seguimiento QA.',
            responsable: { name: 'Alexis', class: 'alexis' },
            weeks: [2],
            desc: 'Alexis realizará las primeras pruebas manuales de la autenticación, documentando cualquier bug encontrado en el flujo de login.'
          }
        ]
      },
      {
        hito: 'Reunión 5',
        title: 'Módulos Core',
        subtitle: 'Jueves (Semana 2)',
        tasks: [
          {
            id: 'r5-t1',
            text: 'Integración Realidad Aumentada.',
            responsable: { name: 'Juan', class: 'juan' },
            weeks: [2],
            desc: 'Juan integrará el SDK de AR en el proyecto MAUI, habilitando el acceso a la cámara e implementando un renderizado básico sobre el rostro.'
          },
          {
            id: 'r5-t2',
            text: 'Gestión de citas.',
            responsable: { name: 'Carlos', class: 'carlos' },
            weeks: [2],
            desc: 'Carlos completará el módulo backend para el agendamiento de citas médicas, incluyendo CRUD de reservaciones.'
          },
          {
            id: 'r5-t3',
            text: 'Prototipo final en HTML/TS/CSS.',
            responsable: { name: 'Jessica', class: 'jessica' },
            weeks: [2],
            desc: 'Jessica entregará el prototipo funcional de alta fidelidad completo en HTML, TS y CSS mostrando el aspecto visual final de la app.'
          },
          {
            id: 'r5-t4',
            text: 'Reporte de calidad.',
            responsable: { name: 'Alexis', class: 'alexis' },
            weeks: [2],
            desc: 'Alexis presentará un reporte consolidado sobre los bugs descubiertos hasta el momento y el estado general de estabilidad.'
          }
        ]
      },
      {
        hito: 'Reunión 6',
        title: 'Integración General',
        subtitle: 'Lunes (Semana 3)',
        tasks: [
          {
            id: 'r6-t1',
            text: 'Integración frontend + backend.',
            responsable: { name: 'Juan/Carlos', class: 'carlos-juan' },
            weeks: [3],
            desc: 'Sincronización completa: Juan conectará las vistas MAUI con todos los endpoints finales desarrollados por Carlos.'
          },
          {
            id: 'r6-t2',
            text: 'Integración catálogo de lentes.',
            responsable: { name: 'Carlos', class: 'carlos' },
            weeks: [3],
            desc: 'Carlos y Juan trabajarán juntos para obtener y renderizar dinámicamente la lista de lentes desde la base de datos.'
          },
          {
            id: 'r6-t3',
            text: 'Validación visual final.',
            responsable: { name: 'Jessica', class: 'jessica' },
            weeks: [3],
            desc: 'Jessica verificará que la maquetación del prototipo coincida con la UI integrada final en el proyecto.'
          },
          {
            id: 'r6-t4',
            text: 'Preparación de exposición.',
            responsable: { name: 'Alexis', class: 'alexis' },
            weeks: [3],
            desc: 'Alexis estructurará el guion y el orden del video de presentación final, asignando las partes correspondientes.'
          }
        ]
      },
      {
        hito: 'Reunión 7',
        title: 'QA Final',
        subtitle: 'Jueves (Semana 3)',
        tasks: [
          {
            id: 'r7-t1',
            text: 'Pruebas funcionales finales.',
            responsable: { name: 'Equipo', class: 'equipo' },
            weeks: [3],
            desc: 'Todo el equipo ejecutará pruebas End-to-End simulando un flujo completo de usuario (registro -> cita -> probador AR).'
          },
          {
            id: 'r7-t2',
            text: 'Corrección de bugs.',
            responsable: { name: 'Equipo', class: 'equipo' },
            weeks: [3],
            desc: 'Sprint intensivo de resolución de errores críticos encontrados durante las pruebas funcionales.'
          },
          {
            id: 'r7-t3',
            text: 'Optimización de rendimiento.',
            responsable: { name: 'Juan', class: 'juan' },
            weeks: [3],
            desc: 'Juan perfilará la aplicación móvil, reduciendo tiempos de carga de imágenes y optimizando la cámara AR.'
          },
          {
            id: 'r7-t4',
            text: 'Validación de base de datos.',
            responsable: { name: 'Carlos', class: 'carlos' },
            weeks: [3],
            desc: 'Carlos revisará la integridad referencial y realizará un respaldo limpio de la base de datos final.'
          },
          {
            id: 'r7-t5',
            text: 'Consolidación documentación.',
            responsable: { name: 'Alexis', class: 'alexis' },
            weeks: [3],
            desc: 'Alexis agrupará todos los artefactos de la metodología Mobile-D en un documento formal para la entrega.'
          },
          {
            id: 'r7-t6',
            text: 'Revisión visual final.',
            responsable: { name: 'Jessica', class: 'jessica' },
            weeks: [3],
            desc: 'Auditoría final de Jessica en los dispositivos físicos reales para asegurar un diseño responsivo impecable.'
          }
        ]
      },
      {
        hito: 'Semana 4',
        title: 'Lanzamiento',
        subtitle: 'Actividades Finales',
        tasks: [
          {
            id: 's4-t1',
            text: 'Ensayo de exposición.',
            responsable: { name: 'Equipo', class: 'equipo' },
            weeks: [4],
            desc: 'Reunión del equipo para practicar la defensa oral y la presentación del video, midiendo tiempos.'
          },
          {
            id: 's4-t2',
            text: 'Ajustes finales del sistema.',
            responsable: { name: 'Juan/Carlos', class: 'carlos-juan' },
            weeks: [4],
            desc: 'Pequeños retoques de código o configuración de servidor de último minuto que surgieron durante los ensayos.'
          },
          {
            id: 's4-t3',
            text: 'Exportación recursos visuales.',
            responsable: { name: 'Jessica', class: 'jessica' },
            weeks: [4],
            desc: 'Jessica generará iconos, banners y cualquier activo gráfico necesario para la documentación.'
          },
          {
            id: 's4-t4',
            text: 'Entrega documentación académica.',
            responsable: { name: 'Alexis', class: 'alexis' },
            weeks: [4],
            desc: 'Alexis subirá el informe final, actas de reuniones y enlaces al sistema de la universidad.'
          },
          {
            id: 's4-t5',
            text: 'Defensa del proyecto.',
            responsable: { name: 'Equipo', class: 'equipo' },
            weeks: [4],
            desc: 'Presentación final ante el jurado o stakeholders, demostrando la funcionalidad de OptiVision.'
          }
        ]
      }
    ]
  },
  {
    id: 'proyecto-piensa',
    title: 'PROYECTO PIENSA',
    subtitle: 'Plataforma GAD Cañar - Blockchain & IPFS',
    weeksCount: 9,
    weekNames: [
      'Mayo S3',
      'Mayo S4',
      'Junio S1',
      'Junio S2',
      'Junio S3',
      'Junio S4',
      'Julio S1',
      'Julio S2',
      'Julio S3'
    ],
    deliverables: [
      {
        member: 'juan',
        name: 'Juan Bravo',
        avatar: 'JB',
        gradient: 'gradient-1',
        desc: 'Frontend Lead: Responsable del prototipado directo en HTML/TS/CSS asistido por Google AI Studio, maquetación del Portal Ciudadano, formularios interactivos en React Vite, consumo de APIs HTTP, componentes web y la integración del widget de firmas Web3/Metamask.'
      },
      {
        member: 'alexis',
        name: 'Alexis Patiño',
        avatar: 'AP',
        gradient: 'gradient-4',
        desc: 'Backend & Blockchain Lead: Responsable de la planificación de procesos del GAD, modelado de PostgreSQL (MER), Prisma ORM, APIs seguras en NestJS, autenticación JWT, integración con Pinata IPFS y despliegue del Smart Contract.'
      }
    ],
    groups: [
      {
        hito: 'Planificación',
        title: 'Planificación y Diseño',
        subtitle: 'Estructuración, análisis de procesos GAD y diseño UI/BD',
        tasks: [
          {
            id: 'piensa-t1',
            text: 'Fundamentación científica y alcance del GAD.',
            responsable: { name: 'Juan Bravo (Front)', class: 'juan' },
            weeks: [1],
            desc: 'Investigación técnica de literatura científica indexada (2021-2026), justificación académica y redacción del alcance del sistema para el GAD Cañar. Recursos: Laptop, Artículos indexados, Google Docs.'
          },
          {
            id: 'piensa-t2',
            text: 'Diseño de diagramas de procesos de trámites GAD.',
            responsable: { name: 'Alexis Patiño (Back)', class: 'alexis' },
            weeks: [1],
            desc: 'Mapeo detallado de procesos internos actuales del GAD Cañar, diagramas de flujo de transiciones de estados (Ingreso, Revisión, Pago, Cierre) y definición de casos de uso por roles. Recursos: Draw.io, Laptop.'
          },
          {
            id: 'piensa-t3',
            text: 'Prototipado interactivo en HTML, TS y CSS con IA.',
            responsable: { name: 'Juan Bravo (Front)', class: 'juan' },
            weeks: [2],
            desc: 'Diseño y desarrollo directo en HTML, TS y CSS de la experiencia del ciudadano (carga de planos) y paneles de control, usando Google AI Studio. Recursos: HTML, CSS, TS, Google AI Studio, Laptops.'
          },
          {
            id: 'piensa-t4',
            text: 'Modelo de base de datos relacional (MER).',
            responsable: { name: 'Alexis Patiño (Back)', class: 'alexis' },
            weeks: [2],
            desc: 'Diseño lógico y físico de tablas PostgreSQL para metadatos de trámites, historial de estados, logs de firmas Web3 y CIDs de IPFS. Normalización del esquema relacional. Recursos: pgAdmin, PostgreSQL, Laptop.'
          }
        ]
      },
      {
        hito: 'Configuración',
        title: 'Configuración de Entornos y Arquitectura',
        subtitle: 'Inicialización de repositorios y estructuración del proyecto',
        tasks: [
          {
            id: 'piensa-t5',
            text: 'Inicializar workspace de React Vite.',
            responsable: { name: 'Juan Bravo (Front)', class: 'juan' },
            weeks: [3],
            desc: 'Estructuración del proyecto React Vite, configuración de estilos globales CSS, tokens del sistema de diseño e instalación de componentes UI. Recursos: Vite, React, CSS, VS Code.'
          },
          {
            id: 'piensa-t6',
            text: 'Inicializar NestJS y arquitectura por capas.',
            responsable: { name: 'Alexis Patiño (Back)', class: 'alexis' },
            weeks: [3],
            desc: 'Configuración de NestJS con TypeScript, estructura modular por capas (Controllers, Services, Repositories), y conexión inicial a PostgreSQL con Prisma ORM. Recursos: NestJS, Prisma, Node.js.'
          }
        ]
      },
      {
        hito: 'Desarrollo Core',
        title: 'Desarrollo del Core (Backend & Frontend)',
        subtitle: 'APIs seguras, gestor IPFS y formularios de planos',
        tasks: [
          {
            id: 'piensa-t7',
            text: 'Rutas REST base y seguridad JWT.',
            responsable: { name: 'Alexis Patiño (Back)', class: 'alexis' },
            weeks: [4],
            desc: 'Creación de endpoints para registro/login, guards de seguridad para autenticación JWT, y asignación de roles (Ciudadano, Técnico, Secretaría). Recursos: NestJS, Postman, JWT.'
          },
          {
            id: 'piensa-t8',
            text: 'Portal Ciudadano: Carga de planos PDF.',
            responsable: { name: 'Juan Bravo (Front)', class: 'juan' },
            weeks: [4],
            desc: 'Desarrollo del formulario web para carga interactiva de archivos PDF de planos y validaciones de formatos en el frontend. Recursos: React Vite, HTML5, TypeScript.'
          },
          {
            id: 'piensa-t9',
            text: 'Módulo de integración con IPFS (Pinata API).',
            responsable: { name: 'Alexis Patiño (Back)', class: 'alexis' },
            weeks: [5],
            desc: 'Desarrollo de servicios NestJS para encapsular planos cargados y subirlos a IPFS, capturando de vuelta el CID único de Pinata. Recursos: Pinata SDK, Node.js, Axios.'
          },
          {
            id: 'piensa-t10',
            text: 'Dashboard de Funcionarios y Estados.',
            responsable: { name: 'Juan Bravo (Front)', class: 'juan' },
            weeks: [5],
            desc: 'Implementación del panel de control de técnicos y secretarios para listar trámites entrantes, visualizar planos y gatillar cambios de estados. Recursos: React Tables, CSS Grid.'
          }
        ]
      },
      {
        hito: 'Conexión & Web3',
        title: 'Conexión e Integración Blockchain Web3',
        subtitle: 'Consumo de endpoints, Smart Contract y Metamask',
        tasks: [
          {
            id: 'piensa-t11',
            text: 'Consumo de servicios HTTP y Route Guards.',
            responsable: { name: 'Juan Bravo (Front)', class: 'juan' },
            weeks: [6],
            desc: 'Suscripción a servicios HTTP de NestJS en React Vite para operaciones de login y envío de documentos. Activación de Route Guards / Context para proteger dashboards. Recursos: Axios, React Router.'
          },
          {
            id: 'piensa-t12',
            text: 'Persistencia de trámites y transacciones Prisma.',
            responsable: { name: 'Alexis Patiño (Back)', class: 'alexis' },
            weeks: [6],
            desc: 'Implementación de lógica transaccional en PostgreSQL mediante Prisma, asegurando que cada cambio de estado registre el autor y la estampa de tiempo. Recursos: PostgreSQL, Prisma Client.'
          },
          {
            id: 'piensa-t13',
            text: 'Desarrollo de Smart Contract RegistryGAD.',
            responsable: { name: 'Alexis Patiño (Back)', class: 'alexis' },
            weeks: [7],
            desc: 'Escritura y compilación del contrato inteligente en Solidity para registrar CIDs vinculados al documento de identidad, y despliegue en Polygon Amoy Testnet. Recursos: Solidity, Remix IDE, Hardhat.'
          },
          {
            id: 'piensa-t14',
            text: 'Integración Web3 en Frontend con Metamask.',
            responsable: { name: 'Juan Bravo (Front)', class: 'juan' },
            weeks: [7],
            desc: 'Conexión de billetera Metamask en React Vite mediante ethers.js/web3.js para solicitar firma criptográfica de planos y enviar transacciones al RegistryGAD. Recursos: ethers.js, Metamask, Web3.'
          }
        ]
      },
      {
        hito: 'QA & Cierre',
        title: 'Fase Final: Pruebas, Manuales y Defensa',
        subtitle: 'QA exhaustivo, manuales técnicos y sustentación',
        tasks: [
          {
            id: 'piensa-t15',
            text: 'QA de APIs, auditoría BD y pruebas de estrés.',
            responsable: { name: 'Alexis Patiño (Back)', class: 'alexis' },
            weeks: [8],
            desc: 'Auditoría de integridad de base de datos PostgreSQL, tests unitarios con Jest en NestJS y simulación de carga concurrente de planos arquitectónicos. Recursos: Jest, Postman, k6.'
          },
          {
            id: 'piensa-t16',
            text: 'Pruebas de usabilidad frontend y manuales.',
            responsable: { name: 'Juan Bravo (Front)', class: 'juan' },
            weeks: [8],
            desc: 'Tests de usabilidad con usuarios finales, redacción del manual técnico de arquitectura y guía de usuario (Ciudadanos/Técnicos). Recursos: Google Docs, Laptops.'
          },
          {
            id: 'piensa-t17',
            text: 'Sustentación y defensa final del proyecto.',
            responsable: { name: 'Ambos', class: 'equipo' },
            weeks: [9],
            desc: 'Preparación de material visual interactivo en parejas, demostración completa del flujo integral de carga a blockchain y defensa ante tribunal. Recursos: Canva, Proyector.'
          }
        ]
      }
    ]
  }
];

export const DUMMY_JSON_TEMPLATE = `{
  "id": "mi-proyecto-inventado",
  "title": "Proyecto Creativo Personal",
  "subtitle": "Gestión de tareas de 3 semanas",
  "weeksCount": 3,
  "weekNames": ["Semana A", "Semana B", "Semana C"],
  "deliverables": [
    {
      "member": "lider",
      "name": "Pedro Lider",
      "avatar": "PL",
      "gradient": "gradient-1",
      "desc": "Planificación, coordinación y supervisión."
    }
  ],
  "groups": [
    {
      "hito": "Hito 1",
      "title": "Fase de Planeación",
      "subtitle": "Semana 1",
      "tasks": [
        {
          "id": "p-t1",
          "text": "Estructurar cronograma inicial.",
          "responsable": { "name": "Pedro", "class": "juan" },
          "weeks": [1],
          "desc": "Definir los hitos iniciales del proyecto y cargarlos en la plataforma."
        }
      ]
    }
  ]
}`;
