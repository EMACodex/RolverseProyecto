import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Pregunta {
  texto: string;
  opciones: { label: string; key: keyof Puntuaciones }[];
}

interface Puntuaciones {
  Hobbit: number;
  Elfo: number;
  GuerreroHumano: number;
  Enano: number;
  Mago: number;
}

@Component({
  selector: 'app-thecreator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './thecreator.component.html',
  styleUrls: ['./thecreator.component.css'],
})
export class TheCreatorComponent {
  // Índice de la pregunta actual (0…9)
  idx = 0;

  // Acumulador de puntuaciones
  scores: Puntuaciones = {
    Hobbit: 0,
    Elfo: 0,
    GuerreroHumano: 0,
    Enano: 0,
    Mago: 0,
  };

  // Una vez acabadas las 10 preguntas, aquí queda el resultado final
  resultado: keyof Puntuaciones | null = null;

  // Las 10 preguntas con sus opciones
  preguntas: Pregunta[] = [
    {
      texto: '1. ¿Qué valor consideras más importante en una aventura?',
      opciones: [
        { label: '🍺 Compañerismo y buena comida', key: 'Hobbit' },
        { label: '🧠 Conocimiento y sabiduría', key: 'Mago' },
        { label: '🏹 Precisión y armonía con la naturaleza', key: 'Elfo' },
        { label: '⚔️ Honor y valentía', key: 'GuerreroHumano' },
        { label: '⛏️ Resistencia y lealtad', key: 'Enano' },
      ],
    },
    {
      texto: '2. ¿Qué lugar prefieres para vivir?',
      opciones: [
        { label: '🏡 Una acogedora aldea en la colina', key: 'Hobbit' },
        {
          label: '📚 Una gran torre llena de libros y artefactos',
          key: 'Mago',
        },
        { label: '🌲 Un bosque antiguo lleno de secretos', key: 'Elfo' },
        {
          label: '🛡️ Una ciudadela en el centro del reino',
          key: 'GuerreroHumano',
        },
        { label: '🪓 Una fortaleza en la montaña', key: 'Enano' },
      ],
    },
    {
      texto: '3. ¿Qué arma elegirías?',
      opciones: [
        { label: '🔪 Daga o honda', key: 'Hobbit' },
        { label: '📖 Bastón mágico', key: 'Mago' },
        { label: '🏹 Arco largo', key: 'Elfo' },
        { label: '🗡️ Espada o lanza', key: 'GuerreroHumano' },
        { label: '🔨 Hacha de guerra', key: 'Enano' },
      ],
    },
    {
      texto: '4. ¿Cómo resuelves los conflictos?',
      opciones: [
        { label: '😅 Evitándolos con sentido del humor', key: 'Hobbit' },
        { label: '🧩 Pensando con lógica y estrategia', key: 'Mago' },
        { label: '🎯 Con precisión y palabras suaves', key: 'Elfo' },
        { label: '💥 Enfrentándolos con determinación', key: 'GuerreroHumano' },
        { label: '😠 Con fuerza bruta y determinación', key: 'Enano' },
      ],
    },
    {
      texto: '5. ¿Cuál es tu relación con la magia?',
      opciones: [
        { label: '🤔 “Me suena, pero prefiero el té”', key: 'Hobbit' },
        { label: '🌿 “Es parte de mí, la estudio y domino”', key: 'Mago' },
        { label: '✨ “La respeto como una fuerza natural”', key: 'Elfo' },
        { label: '🙄 “Solo si es útil en combate”', key: 'GuerreroHumano' },
        { label: '😡 “Desconfío de ella”', key: 'Enano' },
      ],
    },
    {
      texto: '6. ¿Qué te motiva a salir de aventura?',
      opciones: [
        { label: '🧁 Curiosidad... y buenos pasteles', key: 'Hobbit' },
        { label: '🔎 Descubrir antiguos secretos', key: 'Mago' },
        { label: '🌿 Proteger la armonía natural', key: 'Elfo' },
        { label: '🛡️ Defender a los inocentes', key: 'GuerreroHumano' },
        { label: '💰 Honor, gloria y riqueza', key: 'Enano' },
      ],
    },
    {
      texto: '7. ¿Qué tipo de aliados prefieres?',
      opciones: [
        { label: '👨‍👩‍👦 Amigos leales, aunque no sean fuertes', key: 'Hobbit' },
        { label: '📚 Sabios, estudiosos o místicos', key: 'Mago' },
        { label: '🦌 Elegantes, tranquilos y equilibrados', key: 'Elfo' },
        { label: '⚔️ Valientes y decididos a luchar', key: 'GuerreroHumano' },
        { label: '🍻 Rudos, fuertes y constantes', key: 'Enano' },
      ],
    },
    {
      texto: '8. ¿Qué bebida elegirías en una taberna?',
      opciones: [
        { label: '🍻 Cerveza casera', key: 'Enano' },
        { label: '🍷 Vino de frutos silvestres', key: 'Elfo' },
        { label: '🍵 Infusión con hierbas raras', key: 'Mago' },
        { label: '🥛 Leche y un trozo de pastel', key: 'Hobbit' },
        { label: '🥃 Grog o cualquier cosa fuerte', key: 'GuerreroHumano' },
      ],
    },
    {
      texto: '9. ¿Cómo vistes normalmente?',
      opciones: [
        { label: '👣 Pies descalzos, camisa cómoda', key: 'Hobbit' },
        { label: '🧥 Túnica con runas y bolsillos secretos', key: 'Mago' },
        { label: '🌿 Atuendo ligero, verde y natural', key: 'Elfo' },
        { label: '🛡️ Armadura ligera o de cuero', key: 'GuerreroHumano' },
        { label: '🪓 Armadura pesada, casco, y botas firmes', key: 'Enano' },
      ],
    },
    {
      texto: '10. ¿Cómo te gustaría ser recordado?',
      opciones: [
        { label: '😄 Como alguien que hizo reír y compartió', key: 'Hobbit' },
        {
          label: '🧙 Como una mente brillante que dejó sabiduría',
          key: 'Mago',
        },
        {
          label: '🌟 Como un espíritu noble y protector de la belleza',
          key: 'Elfo',
        },
        {
          label: '🛡️ Como un héroe que defendió a su pueblo',
          key: 'GuerreroHumano',
        },
        {
          label: '⛏️ Como un luchador duro y leal hasta el final',
          key: 'Enano',
        },
      ],
    },
  ];

  /**
   * Se llama al hacer clic en cualquiera de las opciones.
   * Suma +1 al arquetipo correspondiente y pasa a la siguiente pregunta
   * o, si era la última, calcula resultado.
   */
  elegir(key: keyof Puntuaciones) {
    this.scores[key]++;
    if (this.idx < this.preguntas.length - 1) {
      this.idx++;
    } else {
      this.calcularResultado();
    }
  }

  /**
   * Ordena las puntuaciones y elige la clave con mayor valor.
   */
  calcularResultado() {
    const sorted = Object.entries(this.scores) as [
      keyof Puntuaciones,
      number
    ][];
    sorted.sort((a, b) => b[1] - a[1]);
    this.resultado = sorted[0][0];
  }
}
