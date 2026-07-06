import { Injectable, signal } from '@angular/core';

export interface Student {
  id: string;
  name: string;
  studentNo: string;
  photo?: string;
  rfid: string | null;
  department: string;
  course: string;
  school: string;
}

export interface AttendanceLog {
  date: string;
  timeIn: string;
  timeOut: string | null;
}

@Injectable({ providedIn: 'root' })
export class StudentsStore {
  readonly students = signal<Student[]>([
    { id: '1', name: 'AALA, ALIYAH SOPHIA ANGELES', studentNo: '2024-10899', rfid: '0000809359', department: 'CITHM', course: 'BSIHM-CLOCA', school: 'LPL' },
    { id: '2', name: 'AALA, ANNE KATHERINE MANDAL', studentNo: '2023-10921', rfid: '0007191790', department: 'CITHM', course: 'BSICM', school: 'LPL' },
    { id: '3', name: 'AALA, JIRO RAFBERT ANILLO', studentNo: '2020-10801', rfid: '0002263808', department: 'CAS', course: 'BSBIO-MICRO', school: 'LPL' },
    { id: '4', name: 'ABAC, MA. LORREA NAVOA', studentNo: '2023-10824', rfid: null, department: 'CITHM', course: 'BSITM-AVSE', school: 'LPL' },
    { id: '5', name: 'ABACA, KRISTINA KYLE BARLITA', studentNo: '2022-10503', rfid: '0000893232', department: 'CITHM', course: 'BSIHM-CLOHS', school: 'LPL' },
    { id: '6', name: 'ABACAN, DESIREE MAE MANALO', studentNo: '2024-10994', rfid: '0007459677', department: 'CITHM', course: 'BSIHM-CLOCA', school: 'LPL' },
    { id: '7', name: 'ABAD, JETHRO MARCUS DANAO', studentNo: '2025-10149', rfid: '0002865116', department: 'LPUISJH', course: 'HS-JUNIOR', school: 'LPL' },
    { id: '8', name: 'ABADIER, CORBIN JAHNIZEL MAMONONG', studentNo: '2023-10485', rfid: '0002729616', department: 'CBA', course: 'BSA', school: 'LPL' },
  ]);

  getById(id: string): Student | undefined {
    return this.students().find((s) => s.id === id);
  }

  // Deterministic mock attendance logs, seeded by the student id.
  getLogs(id: string): AttendanceLog[] {
    let seed = Number(id) * 97 + 13;
    const rand = () => {
      seed = (seed * 1103515245 + 12345) & 0x7fffffff;
      return seed / 0x7fffffff;
    };
    const pad = (n: number) => n.toString().padStart(2, '0');
    const fmtTime = (h: number, m: number, s: number) => {
      const period = h < 12 ? 'AM' : 'PM';
      const hour = h % 12 === 0 ? 12 : h % 12;
      return `${pad(hour)}:${pad(m)}:${pad(s)} ${period}`;
    };

    const logs: AttendanceLog[] = [];
    const start = new Date(2026, 6, 3);
    for (let i = 0; i < 18; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() - Math.floor(i * 1.6 + rand() * 2));
      const inH = 6 + Math.floor(rand() * 6);
      const timeIn = fmtTime(inH, Math.floor(rand() * 60), Math.floor(rand() * 60));
      const hasOut = rand() > 0.6;
      const timeOut = hasOut
        ? fmtTime(inH + 4 + Math.floor(rand() * 4), Math.floor(rand() * 60), Math.floor(rand() * 60))
        : null;
      logs.push({
        date: `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`,
        timeIn,
        timeOut,
      });
    }
    return logs;
  }
}
