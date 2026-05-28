export interface Responsible {
  name: string;
  class: string; // CSS class for responsible colors (e.g., 'juan', 'jessica', 'carlos', 'alexis', 'equipo', 'carlos-juan')
}

export interface Task {
  id: string;
  text: string;
  responsable: Responsible;
  weeks: number[]; // Array of week numbers where this task is active (e.g. [1] or [1, 2])
  desc: string; // Extended description for modal details
}

export interface ScheduleGroup {
  hito: string; // e.g. "Reunión 1", "Sprint 1", "Fase A"
  title: string; // e.g. "Kick-off del Proyecto"
  subtitle: string; // e.g. "Jueves (Semana 1)"
  tasks: Task[];
}

export interface Deliverable {
  member: string; // Key, e.g. "juan", "jessica"
  name: string;
  avatar: string; // e.g. "JU"
  gradient: string; // CSS class name for card gradient, e.g. "gradient-1"
  desc: string;
}

export interface Schedule {
  id: string;
  title: string;
  subtitle: string;
  weeksCount: number; // Duration of schedule in weeks (e.g., 4 or 3)
  weekNames?: string[]; // Custom labels for each week column (e.g., ["Mayo S3", "Mayo S4", ...])
  groups: ScheduleGroup[];
  deliverables?: Deliverable[];
}
export interface UploadedSchedulesStore {
  [key: string]: Schedule;
}
